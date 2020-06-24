<template>
  <div class="col">
    <ul class="list-group">
      <li class="list-group-item" v-for="(point, index) in points" v-if="points">
        <b>{{point.average.toFixed(3)}}</b>, [lg]
        <button type="button" class="btn btn-outline-light  deleteBtn" v-on:click="removePoint(index)">X</button>
        <h6>Напряжение: {{point.tension}}, [МПа]</h6>
      </li>
    </ul>
    <div>
      <h5 v-if="points.length > 4">{{getFunction}}</h5>
      <h5 v-else>{{howMuch}}</h5>
      <div class="input-group" >
        <div class="input-group-prepend">
          <span class="input-group-text">Температура, [°C]</span>
        </div>
        <input type="number" class="form-control" v-model="currentTemperature">
      </div>
      <div class="input-group" >
        <div class="input-group-prepend">
          <span class="input-group-text">Максимальная температура Tm, [°C]</span>
        </div>
        <input type="number" class="form-control" v-model="maxTemperature">
      </div>
      {{getConstants}}
    </div>
  </div>
</template>

<script>
import leastSquares from "../leastSquares.js";
export default {
  props:{
    points: Array
  },
  data(){
    return {
      currentTemperature: null,
      maxTemperature: null,
    }
  },
  methods: {
    removePoint(index) {
      this.points.splice(index,1);
    }
  },
  computed: {
    getFunction() {
      let tensions = this.points.map(d => Number(d.tension));
      let times = this.points.map(d => Number(d.average));
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
    getConstants() {
      let temperature = this.currentTemperature + 273;
      let maxTemperature = this.maxTemperature + 273;
      let c = this.getFunction.m / (temperature - maxTemperature);
      let d = (-maxTemperature * this.getFunction.m) / (temperature - maxTemperature);
      let k = this.getFunction.b / (temperature - maxTemperature);
      let mu = (-maxTemperature * this.getFunction.b) / (temperature - maxTemperature);
      let lgt0 = k*maxTemperature + mu;
      let t0 = Math.pow(10,lgt0);
      return {
        'c': c,
        'd': d,
        'k': k,
        'mu': mu,
        't0': t0,
      };
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