<template>
  <div class="row">
    <stat-processing-component @confirmPoint="getPoint"></stat-processing-component>
    <constant-processing-component v-bind:points="points"></constant-processing-component>
  </div>
</template>

<script>
import StatProcessingComponent from "./StatProcessingComponent.vue";
import ConstantProcessingComponent from "./ConstantProcessingComponent.vue";

export default {
  name: "MainComponent",
  components: {
    StatProcessingComponent,
    ConstantProcessingComponent
  },
  data() {
    return {
      points: [
        {'tension':7.82,'average':0.15},
        {'tension':7.4,'average':0.3},
        {'tension':7,'average':0.76},
        {'tension':6.6,'average':0.86},
        {'tension':6.2,'average':3}
      ],
    }
  },
  methods: {
    getPoint(point) {
      this.points.push(point);
    }
  }
}
</script>