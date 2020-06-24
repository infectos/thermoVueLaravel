<template>
    <div>
      <div>
        <ol>
          <input v-model.number='rawPoints.tension' type='number'> Напряжение,[МПа]
          <hr>
          <li v-for="(point, index) in rawPoints">
            <input v-model.number='point.time' type='number'> Время,[с] 
            <button type="button" class="btn btn-outline-light btn-sm" v-if="rawPoints.length > 8" v-on:click="removePoint(index)">X</button>
          </li>
          <hr>
          <button type="button" class="btn btn-primary" v-on:click="addNewPoint">Добавить новую точку</button>
        </ol>
      </div>
      <div class="processControl">
        <div class="mb-3">
          <label for="inputGroupSelect01">Уровень значимости q для критерия Граббса:</label>
            <select class="custom-select " id="inputGroupSelect01">
            <option >Свыше 1%</option>
            <option>Свыше 5%</option>
            </select>
        </div>
        <div class="mb-3">
          <label  for="inputGroupSelect01">Доверительная вероятность P для критерия Стьюдента:</label>
          <select class="custom-select " id="inputGroupSelect01">
            <option >0.95</option>
            <option>0.99</option>
          </select>
        </div>
        <button type="button" class="btn btn-primary" v-on:click="processPoints">Обработать данные</button>
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
      tensiom: 7.82,
    }
  },
  methods: {
    addNewPoint() {
      this.rawPoints.push({'time':0});
    },
    removePoint: function (index) {
      this.rawPoints.splice(index,1);
    },
  },
}
</script>