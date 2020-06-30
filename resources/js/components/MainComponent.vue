<template>
  <div class="row justify-content-center">
    <div class="col-2" v-if="savedList.length > 0">
      <constant-list-component v-bind:savedList="savedList" @deleteFromServer="deleteFromServer" @loadConstants="loadConstants"></constant-list-component>
    </div>
    <div class="col-10">
      <div class="card">
        <div class="card-header">Расчет</div>
        <div class="card-body">
          <div class="row">
            <div class="col">
              <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                  <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true" @click="currentTab = 'line'">Прямая</a>
                  <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false" @click="currentTab = 'point'">Точка</a>
                </div>
              </nav>
              <div class="tab-content" id="nav-tabContent">
                <keep-alive>
                <stat-processing-component v-if="currentTabComponent == 'line'" @confirmPoint="getPoint" v-bind:minPointQuantity="8" v-bind:rawPoints="rawPointsLine" key="line"></stat-processing-component>
                <stat-processing-component v-else @confirmPoint="getAdditionalPoint" v-bind:minPointQuantity="12" v-bind:rawPoints="rawPointsAdditionalPoint" key="point"></stat-processing-component>
                </keep-alive>
              </div>
            </div>
            <constant-processing-component 
              v-bind:points="loadedConstatns.points" 
              v-bind:additionalPoint="loadedConstatns.additionalPoint"
              v-bind:currentTemperature="loadedConstatns.currentTemperature"
              v-bind:maxTemperature="loadedConstatns.maxTemperature"
              v-bind:currentTemperatureAdditionalPoint="loadedConstatns.currentTemperatureAdditionalPoint" 
              @refreshList="getFromServer">
            </constant-processing-component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatProcessingComponent from "./StatProcessingComponent.vue";
import ConstantProcessingComponent from "./ConstantProcessingComponent.vue";
import ConstantListComponent from "./ConstantListComponent.vue";

export default {
  name: "MainComponent",
  components: {
    StatProcessingComponent,
    ConstantProcessingComponent,
    ConstantListComponent
  },
  data() {
    return {
      rawPointsLine: [{
          "time": null
        }, {
          "time": null
        }, {
          "time": null
        }, {
          "time": null
        }, {
          "time": null
        }, {
          "time": null
        }, {
          "time": null
        }, {
          "time": null
        }],
      rawPointsAdditionalPoint: [{
          "time": null
        }, {
          "time": null
        }, {
          "time": null
        }, {
          "time": null
        }, {
          "time": null
        }, {
          "time": null
        }, {
          "time": null
        }, {
          "time": null
        }, {
          "time": null
        }, {
          "time": null
        }, {
          "time": null
        }, {
          "time": null
        }],
      loadedConstatns: {
        points: [
          {'tension':6.3,'average':0.472},
          {'tension':5.9,'average':0.842},
          {'tension':5.6,'average':1.526},
          {'tension':5.3,'average':2.54},
          {'tension':5.0,'average':3.656}
        ],
        additionalPoint: {'tension':5.8,'average':0.7984},
        currentTemperature: null,
        maxTemperature: null,
        currentTemperatureAdditionalPoint: null,
      },
      savedList: [],
      currentTab: 'line',
    }
  },
  methods: {
    getPoint(point) {
      this.loadedConstatns.points.push(point);
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
    },
    getAdditionalPoint(point) {
      this.loadedConstatns.additionalPoint = point;
    },
    loadConstants(constants) {
      let newConstants = {
        points: constants.linePoints,
        additionalPoint: constants.additionalPoint,
        currentTemperature: constants.lineTemperature,
        maxTemperature: constants.maxTemperature,
        currentTemperatureAdditionalPoint: constants.additionalPointTemperature,
      };
      this.loadedConstatns = newConstants;
    }
  },
  computed: {
    currentTabComponent() {
      return this.currentTab;
    }
  },
  created() {
    this.getFromServer();
  }
    
}
</script>