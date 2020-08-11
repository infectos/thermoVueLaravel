<template>
 <div>
  <div class="input-group mb-3">
    <input type="text" class="form-control" placeholder="Название" aria-label="Поиск по названию" aria-describedby="basic-addon2" v-model="search">
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="button" @click="sortByName">Найти</button>
    </div>
  </div>
  <ul class="list-group">
   <li class="list-group-item list-group-item-action" v-for="(constant, index) in savedList" @click="loadConstants(index)" v-bind:class="{active: activeTab === index}">
    <button type="button" class="btn btn-outline-light  deleteBtn" v-on:click="deleteFromServer(constant.id)">X</button>
    <h5>{{constant.name}}</h5>
    <h6>{{JSON.parse(constant.body).function}}</h6>
    <h6>{{findDate(constant.created_at)}}</h6>
    <h6>{{constant.authorEmail}}</h6>      
   </li>
  </ul>
 </div>
</template>

<script>
export default {
 name: 'ConstantListComponent',
 props: {
  originList: Array,
 },
 data(){
  return {
    search: null,
    activeTab: null,
    savedList: this.originList,
  }
 },
 methods: {
  deleteFromServer(id) {
   this.$emit('deleteFromServer', id);
  },
  sortByName() {
   this.savedList = this.originList.filter(item => {
    return item.name.toLowerCase().includes(this.search.toLowerCase());
   });
   this.activeTab = null;
  },
  findDate(stringDate) {
    let date = Date.parse(stringDate);
    date = new Date(date);
    /*
    let curr_date = date.getDate();
    let curr_month = date.getMonth();
    let curr_year = date.getFullYear();
    */
    
    return date.toLocaleString('ru',{day:'numeric',month:'long',year:'numeric'});
  },
  loadConstants(index) {
    this.activeTab = index;
    let constants = this.savedList[index];
    constants = JSON.parse(constants.body);
    this.$emit('loadConstants', constants);
  }
 },
}
</script>

<style scoped>
.list-group {
  height: 100%;
  max-height: 80vh;
  overflow: auto;
  margin-bottom: 15px;
}
</style>