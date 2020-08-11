<template>
  <svg 
  class="circle-chart"
  :viewBox="viewBox">

    
    <circle cx="95" cy="95" r="75" fill="transparent" stroke="gray"  stroke-width='1'/>

    <g class="chord-btn" v-for="(chord, index) in majChords" @click="chooseChord(index)" v-bind:class="{active: activeChord === index}">
      <line x1='95' y1='30' x2='95' y2='20' stroke='rgba(0, 0, 0, 0.5)' stroke-width='0.5' :transform="rotate30(index)"/>
      <text text-anchor="middle" x='95' y='100' :transform="placeChords(85, index)">{{chord}}</text>
      <text font-size="0.6em" text-anchor="middle" x='95' y='98' :transform="placeChords(55, index)">{{minChords[index]+'m'}}</text>
    </g>
    
  </svg>
</template>

<script>
import * as d3 from 'd3'

export default {
 name: 'CircleChart',
 props: {
  width: {
   default: 250,
   type: Number,
  },
  height: {
   default: 250,
   type: Number,
  },
 },
 data() {
   return {
     padding: 60,
     majChords: ['C','G','D','A','E','B','F#','Db','Ab','Eb','Bb','F'],
     minChords: ['A','E','B','F#','C#','G#','Eb','Bb','F','C','G','D'],
     activeChord: 0,
   }
 },
 computed: {
   viewBox() {
     return `0 0 ${this.width} ${this.height}`;
   },

 },
 methods: {
   rotate30(index) {
     return `rotate(${(index)*30} 95 95)`;
   },
   placeChords(radius,index) {
     let angle = (30 * index ) * (Math.PI/180);
     let newX = radius * Math.sin(angle);
     let newY = - radius * Math.cos(angle);
     let pos = newX + ' ' + newY;
     return `translate(${pos})`;
   },
   chooseChord(index) {
     this.activeChord = index;
   }
 }
 
};
</script>

<style scoped>
.chord-btn {
  fill: rgba(0, 0, 0, 0.5);
  font-weight: bold;
  transition-duration: .5s;
}
.chord-btn:hover {
  cursor: pointer;
  fill: rgba(0, 0, 0, 0.9);
}

.active {
  fill: rgba(0, 0, 0, 0.9);
}
</style>