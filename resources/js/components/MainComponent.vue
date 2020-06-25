<template>
  <div class="row justify-content-center">
    <div class="col-2" v-if="savedList.length > 0">
      <ul class="list-group">
        <li class="list-group-item" v-for="(constant, index) in savedList">
          {{JSON.parse(constant.body)}}
          <button type="button" class="btn btn-outline-light  deleteBtn" v-on:click="deleteFromServer(constant.id)">X</button>
        </li>
      </ul>
    </div>
    <div class="col-10">
      <div class="card">
        <div class="card-header">Расчет</div>
        <div class="card-body">
          <div class="row">
            <stat-processing-component @confirmPoint="getPoint"></stat-processing-component>
            <constant-processing-component v-bind:points="points"></constant-processing-component>
          </div>
        </div>
      </div>
    </div>
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
      savedList: [],
    }
  },
  methods: {
    getPoint(point) {
      this.points.push(point);
    },
    getFromServer() {
      axios.get('constants')
        .then((response) => {
          // handle success
          console.log(response);
          this.savedList = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
    deleteFromServer(id) {
      axios.delete(`constants/${id}`)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error)
        });
      this.getFromServer();
    }
  },
  created() {
    this.getFromServer();
  }
    
}
</script>