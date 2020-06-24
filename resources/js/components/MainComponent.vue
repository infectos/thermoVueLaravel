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
      points: [],
    }
  },
  methods: {
    getPoint(point) {
      this.points.push(point);
    }
  }
}
</script>