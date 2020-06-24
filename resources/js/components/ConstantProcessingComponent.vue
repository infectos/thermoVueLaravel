<template>
  <div class="col">
    <ul class="list-group">
      <li class="list-group-item" v-for="(point, index) in points" v-if="points">
        <b>{{point.average.toFixed(3)}}</b>, [lg]
        <button type="button" class="btn btn-outline-light  deleteBtn" v-on:click="removePoint(index)">X</button>
        <h6>Напряжение: {{point.tension}}, [МПа]</h6>
        
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    points: Array
  },
  data(){
    return {

    }
  },
  methods: {
    removePoint(index) {
      this.points.splice(index,1);
    }
  }

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