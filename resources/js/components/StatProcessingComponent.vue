<template>
  <div class="col">
    <div class='input'>
      <ol>
        <input v-model.number='tension' type='number' step='any'> Напряжение,[МПа]
        <hr>
        <li v-for="(point, index) in rawPoints">
        <input v-model.number='point.time' type='number'> Время,[с]
        <button type="button" class="btn btn-outline-light btn-sm" v-if="rawPoints.length > 8"
          v-on:click="removePoint(index)">X</button>
        </li>
        <hr>
        <button type="button" class="btn btn-primary" v-on:click="addNewPoint">Добавить новую точку</button>
      </ol>
    </div>
    <div class="processControl">
      <div class="mb-3">
        <label for="inputGroupSelect01">Уровень значимости q для критерия Граббса:</label>
        <select class="custom-select " id="inputGroupSelect01" v-model="selectGrabbs">
          <option>Свыше 1%</option>
          <option>Свыше 5%</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="inputGroupSelect02">Доверительная вероятность P для критерия Стьюдента:</label>
        <select class="custom-select " id="inputGroupSelect02" v-model="selectStudent">
          <option>0.95</option>
          <option>0.99</option>
        </select>
      </div>
      <button type="button" class="btn btn-primary" v-on:click="processData">Обработать данные</button>
    </div>
    <div class="grabbs" v-if="grabbs">
      <h6>Массив десятичных логарифмов: {{grabbs.array}}</h6>
      <h6>Среднее значение: {{grabbs.average}}</h6>
      <h6>S: {{grabbs.s}}</h6>
      <h6>G1: {{grabbs.g1}}</h6>
      <h6>G2: {{grabbs.g2}}</h6>
      <h6>Коэффициент Граббса: {{grabbs.grabbs}}</h6>
      <h6 v-bind:class="grabbs.grabbsError ? 'text-danger' : 'text-success'">{{grabbs.errorMessage}}</h6>
      <button class="btn btn-danger" v-if='grabbs.grabbsError' v-on:click="deleteError(grabbs)">Удалить ошибку</button>
    </div>
    <div class="stat" v-if="grabbs && !grabbs.grabbsError">
      <h6>Массив десятичных логарифмов: {{stat.array}}</h6>
      <h6>Среднее значение: {{stat.average}}</h6>
      <h6>S: {{stat.s}}</h6>
      <h6>Sx: {{stat.sx}}</h6>
      <h6>Коэффициент Стьюдента: {{stat.student}}</h6>
      <h6>Дельта: {{stat.delta}}</h6>
      <h6>Интервал: {{stat.range}}</h6>
      <h6 v-bind:class="stat.cutArray.length > 0 ? 'text-danger' : 'text-success'">{{stat.message}}</h6>
      <button class="btn btn-warning" v-if='stat.cutArray.length > 0 && !isConfirmed' v-on:click="confirmPoint">Подтвердить точку</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rawPoints: [{
          "time": 3
        }, {
          "time": 4
        }, {
          "time": 42
        }, {
          "time": 1
        }, {
          "time": 1
        }, {
          "time": 2
        }, {
          "time": 2
        }, {
          "time": 1
        }],
      tension: 7.82,
      grabbs: null,
      isConfirmed: false,
      selectGrabbs:"Свыше 1%",
      selectStudent:"0.95",
    }
  },
  computed: {
    stat() {
      let givenArray = this.grabbs.array;
      let average = givenArray.reduce((a, b) => (a + b), 0) / givenArray.length;
      let upper = givenArray.map(item => {
        return Math.pow((item - average), 2)
      });
      let lower = givenArray.length - 1;
      let s = Math.sqrt((upper.reduce((a, b) => (a + b), 0) / lower));

      let sx = s / Math.sqrt(givenArray.length);

      const studentsTable95 = [null, null, null, 3.182, 2.776, 2.571, 2.447, 2.365, 2.306, 2.262, 2.228, 2.228, 2.179];
      const studentsTable99 = [null, null, null, 5.841, 4.604, 4.032, 3.707, 2.998, 3.355, 3.25, 3.169, 3.169, 3.055];
      let studentsTable;
            
      if (this.selectStudent == "0.95") {
        studentsTable = studentsTable95;
      } else {
        studentsTable = studentsTable99;
      }

      let delta = sx * studentsTable[lower];
      let range = (average - delta).toFixed(3) + '...' + (average + delta).toFixed(3);
      let cutArray = givenArray.filter((el)=>{
        return (el < average - delta) || (el > average + delta) 
      });
      let message;
      if (cutArray.length > 0) {
        message = `Значение(ия) ${cutArray} не лежит(ат) в доверительном интервале! Добавьте больше точек в выборку или подтвертите текущее значение.`;
      } else {
        message = `Все значения лежат в доверительном интервале`;
      }
      return {
        'array': givenArray,
        'average': average,
        's': s,
        "sx": sx,
        'student': studentsTable[lower],
        'delta': delta,
        'range': range,
        'upper': upper,
        'cutArray': cutArray,
        'message': message,
      };
    }
  },
  methods: {
    addNewPoint() {
      this.rawPoints.push({'time':0});
    },
    removePoint: function (index) {
      this.rawPoints.splice(index,1);
    },
    processData(){
      this.isConfirmed = false;
      let arraySec = this.rawPoints.filter(e => e.time > 0).map(e => e.time);
      let arrayLog10 = arraySec.map(e => Number(Math.log10(e).toFixed(3)));
      this.grabbs = this.findGrabbsError(arrayLog10);
    },
    findGrabbsError(array) {
      const grabbsTable1 = [null, null, null, 1.155, 1.496, 1.764, 1.973, 2.139, 2.274, 2.387, 2.482, 2.564, 2.636];
      const grabbsTable5 = [null, null, null, 1.155, 1.481, 1.715, 1.887, 2.02, 2.126, 2.215, 2.290, 2.355, 2.412];

      let average = array.reduce((a, b) => (a + b), 0) / array.length;
      let upper = array.map(item => Math.pow((item - average), 2));
      let lower = array.length - 1;
      let s = Math.sqrt((upper.reduce((a, b) => (a + b), 0) / lower));

      let max = Math.max(...array);
      let min = Math.min(...array);
      let g1 = Math.abs(max - average) / s;
      let g2 = Math.abs(average - min) / s;

      let grabbsCriterion;
      if (this.selectGrabbs == "Свыше 1%") {
        grabbsCriterion = grabbsTable1[array.length];
      } else {
        grabbsCriterion = grabbsTable5[array.length];
      }

      let grabbsError = null;
      let errorMessage = `Грубых ошибок не обнаружено.`;
      if (g1 > grabbsCriterion) {
        grabbsError = "max";
        errorMessage = `Значение "${max.toFixed(3)}" является грубой ошибкой!`
      }
      if (g2 > grabbsCriterion) {
        grabbsError = "min";
        errorMessage = `Значение "${min.toFixed(3)}" является грубой ошибкой!`
      }

      return {
        'array': array,
        'average': average,
        's': s,
        "g1": g1,
        'g2': g2,
        'grabbs': grabbsCriterion,
        'grabbsError': grabbsError,
        'errorMessage': errorMessage,
      };
    },
    deleteError(grabbsObj) {
      let array = grabbsObj.array;
      if (grabbsObj.grabbsError === 'max') {
        array = array.filter(item => item != Math.max(...array));
      } else {
        array = array.filter(item => item != Math.min(...array));
      }
      this.grabbs = this.findGrabbsError(array);
    },
    confirmPoint() {
      let point = _.cloneDeep(this.stat);
      point.tension = this.tension;
      this.isConfirmed = true;
      this.$emit('confirmPoint', point);
    }
  },
}
</script>