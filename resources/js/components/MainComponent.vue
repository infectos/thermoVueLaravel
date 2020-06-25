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
        {'tension':6.3,'average':0.472},
        {'tension':5.9,'average':0.842},
        {'tension':5.6,'average':1.526},
        {'tension':5.3,'average':2.54},
        {'tension':5.0,'average':3.656}
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