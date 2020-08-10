<template>
  <div class="col-md">
    <div class="card">
        <div class="card-body">
          <h5 class="card-title">Набор точек прямой</h5>
          <ul class="list-group">
            <li class="list-group-item" v-for="(point, index) in points" v-if="points">
              <b>{{point.average.toFixed(3)}}</b>, [lg]
              <button type="button" class="btn btn-outline-light  deleteBtn" v-on:click="removePoint(index)">X</button>
              <h6>Напряжение: {{point.tension}}, [МПа]</h6>
            </li>
          </ul>
          <div>
            <div v-if="points.length > 4">
              <h5 v-if='validateData.message !== null'>{{validateData.message}}</h5>
              <h5 v-else>{{getFunction}}</h5>
              <h5 v-else>r = {{getFunction.r.toFixed(3)}}</h5>
            </div>
            <div v-else>
              <h5>{{howMuch}}</h5>
            </div>

            <div class="input-group" v-if="points.length > 4">
              <div class="input-group-prepend">
                <span class="input-group-text">Температура, [°C]</span>
              </div>
              <input type="number" class="form-control" v-model.number="currentTemperature">
            </div>
            <div class="input-group" v-if="points.length > 4">
              <div class="input-group-prepend">
                <span class="input-group-text">Максимальная температура Tm, [°C]</span>
              </div>
              <input type="number" class="form-control" v-model.number="maxTemperature">
            </div>
          </div>
        </div>
    </div>
    <div class="card">
      <div class="card-body" v-if="additionalPoint">
        <h5 class="card-title">Дополнительная точка</h5>
        <b>{{additionalPoint.average.toFixed(3)}}</b>, [lg]
        <h6>Напряжение: {{additionalPoint.tension}}, [МПа]</h6>
        <div class="input-group" >
          <div class="input-group-prepend">
            <span class="input-group-text">Температура, [°C]</span>
          </div>
          <input type="number" class="form-control" v-model.number="currentTemperatureAdditionalPoint">
        </div>
      </div>
      <div class="card-body" v-else>
        <h5>Для расчета необходимо добавить дополнительную точку.</h5>
      </div>
    </div>
    <table class="table table-sm" v-if="additionalPoint && points.length > 4">
      <thead>
        <tr>
          <th scope="col">t0</th>
          <th scope="col">Tm</th>
          <th scope="col">U0</th>
          <th scope="col">γ</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{this.getConstants.t0}}</td>
          <td>{{this.maxTemperature + 273}}</td>
          <td>{{this.getConstants.u0.toFixed(3)}}</td>
          <td>{{this.getConstants.gamma.toFixed(3)}}</td>
        </tr>
      </tbody>
    </table>

    <!-- Button trigger modal -->
    <button v-if="additionalPoint && points.length > 4 && getConstants !== null && getConstants.isAll " type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Сохранить в системе</button>
    
    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Введите название материала</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control" v-model="materialName">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
            <button type="button" class="btn btn-primary" v-on:click="saveConstants">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import leastSquares from "../../leastSquares.js";
export default {
  props:{
    points: Array,
    additionalPoint: Object,
    currentTemperature: [Number,null],
    maxTemperature: [Number,null],
    currentTemperatureAdditionalPoint: [Number,null]
  },
  data(){
    return {
      materialName: null,
    }
  },
  methods: {
    removePoint(index) {
      this.points.splice(index,1);
    },
    saveConstants(){
        let ret = {};
        ret.linePoints = this.points;
        ret.additionalPoint = this.additionalPoint;
        ret.name = this.materialName;
        ret.function = this.getFunction.toString();
        ret.lineTemperature = this.currentTemperature;
        ret.maxTemperature = this.maxTemperature;
        ret.additionalPointTemperature = this.currentTemperatureAdditionalPoint;

        let jsonConstants = JSON.stringify(ret);
        axios.post('constants',{
          'constantBody': jsonConstants,
          'materialName': this.materialName,
        }).then((response) => {
          console.log(response);
          this.$emit('refreshList');
        }).catch(function (error) {
          console.log(error);
        }).then(function (){
          $('#exampleModalCenter').modal('hide');
        });
      
    },
    getFromServer() {
    axios.get('constants')
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    },
  },
  computed: {
    getFunction() {
      let tensions = this.points.map(d => Number(d.tension));
      let times = this.points.map(d => Number(d.average));
      if (tensions.length == 0) {
        return null;
      }

      let func = leastSquares(tensions, times);
      return func;
    },
    howMuch() {
      let endOfMessage;
      let difference = 5 - this.points.length;
      if (difference == 1) {
        endOfMessage = 'значение.';
      } else if (difference == 5) {
        endOfMessage = 'значений.';
      } else {
        endOfMessage = 'значения.';
      }
      return `Для расчета констант добавьте еще ${difference} ` + endOfMessage;
    },
    validateData(){
      let arr = this.points;

      let resultReduce = arr.reduce(function(acc, cur) {
        if (!acc.hash[cur.tension]) {
          acc.hash[cur.tension] = { [cur.tension]: 1 };
          acc.map.set(acc.hash[cur.tension], 1);
          acc.result.push(acc.hash[cur.tension]);
        } else {
          acc.hash[cur.tension][cur.tension] += 1;
          acc.map.set(acc.hash[cur.tension], acc.hash[cur.tension][cur.tension]);
        }
        return acc;
      }, {
        hash: {},
        map: new Map(),
        result: []
      });

      let result = resultReduce.result.sort(function(a, b) {
        return resultReduce.map.get(b) - resultReduce.map.get(a);
      });
      let output = {
        array: result,
        message: null,
      };
      if (result.some(e=> Object.values(e) > 1)) {
        output.message = 'Удалите точки с одинаковым напряжением!';
      }
      return output;
    },

    getConstants() {
      if (this.getFunction === null || this.getFunction.b === NaN || this.getFunction.m === NaN) {
        return null;
      }
      let temperature = this.currentTemperature + 273;
      let maxTemperature = this.maxTemperature + 273;
      
      let c = this.getFunction.m / (temperature - maxTemperature);
      let d = (-maxTemperature * this.getFunction.m) / (temperature - maxTemperature);

      let a1 = this.getFunction.m;
      let b1 = this.getFunction.b;

      let a2 = c * (this.currentTemperatureAdditionalPoint + 273) + d;
      let b2 = this.additionalPoint.average - a2 * this.additionalPoint.tension;

      let sigma0 = (b1-b2)/(a2-a1);
      let lgt0 = a1 * sigma0 + b1;
      let t0 = Math.pow(10, lgt0);

      let sigma1 = Math.max(...this.points.map(e => e.tension));
      let sigma2 = Math.min(...this.points.map(e => e.tension));
      let t1 = Math.pow(10, this.getFunction.calculate(sigma1));
      let t2 = Math.pow(10, this.getFunction.calculate(sigma2));
      let r = 8.314/1000;
      let s1 = (r * Math.log(t1/t0)) / (Math.pow(temperature, -1) - Math.pow(maxTemperature, -1));
      let s2 = (r * Math.log(t2/t0)) / (Math.pow(temperature, -1) - Math.pow(maxTemperature, -1));
      let gamma = (s1 - s2)/(sigma2 - sigma1); 
      let u0 = (s1*sigma2 - s2*sigma1)/(sigma2 - sigma1); 
      
      return {
        'temperature': temperature,
        'maxTemperature':maxTemperature,
        'c': c,
        'd': d,
        'a1': a1,
        'b1': b1,
        'a2': a2,
        'b2': b2,
        'sigma0':sigma0,
        'lgt0':lgt0,
        't0': t0,
        'sigma1': sigma1,
        'sigma2': sigma2,
        't1': t1,
        't2': t2,
        'b1': b1,
        'b2': b2,
        'gamma': gamma,
        'u0': u0,
        'isAll': !Number.isNaN(u0) && !Number.isNaN(gamma) && !Number.isNaN(lgt0),
      };
    },
    isDone(){
      return (this.materialName 
        && !Number.isNaN(this.getConstants.t0)
        && !Number.isNaN(this.getConstants.u0)
        && !Number.isNaN(this.getConstants.gamma))
    }
  },

}
</script>

<style>
.deleteBtn {
  float: right;
}
.list-group {
	list-style: decimal inside;
}

.list-group-item {
	display: list-item;
}
</style>