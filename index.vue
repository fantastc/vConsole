<!-- 移动端控制台调试 
  
-->
<template lang="html"> 
<section class="_vmc_"> 
  <div class="wrap" v-show="isShow">
    <div class="header"> 
      <div :class="['cardItm',activTabIdx===idx?'activeCard':'']" 
        @click="switchTab(idx)"
        v-for="(tab,idx) in tabList" :key="idx" > 
        {{tab}}
      </div>
    </div>
    <div class="tabWp">
      <LogPrint v-show="activTabIdx===0"></LogPrint>
      <Network v-show="activTabIdx===1"></Network>
      <Location v-show="activTabIdx===2"></Location>
    </div>
  </div>
  
  <div class="switchBtn" @click="switchConsole"> VMC </div>
</section> 
</template> 

<script> 
export default {
  data(){ 
    return {
      isShow: false, 
      
      tabList: [
        'Console',
        'Network',
        'Location',
      ],
      activTabIdx: 0, 
    };
  },
  methods: {
    switchConsole(){ 
      this.isShow = !this.isShow
    },
    
    switchTab(idx){
      this.activTabIdx = idx; 
    },
  },
  beforeCreate(){ },
  created(){ },
  components: {
    LogPrint: ()=>import('./tabs/Console.vue'),
    Network: ()=>import('./tabs/Network.vue'),
    Location: ()=>import('./tabs/Location.vue'),
  },
};
</script> 

<style scoped> 
  ._vmc_ { }
  .wrap {
    background-color: rgba(0, 0, 0, 0.6);
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 10000;
    top: 0; 
    left: 0;
    display: flex;
    flex-direction: column;
  }
  .header {
    background-color: #ccc;
    height: 3.5vh;
    display: flex;
    justify-content: space-between;
    flex-grow: 0;
  }
  .cardItm {
    box-sizing: border-box;
    cursor: pointer;
    font-weight: bold;
    line-height: 1.6;
    text-align: center;
    border-bottom: 1.5px solid #ccc;
    flex-grow: 1; 
  }
  .activeCard {
    border-bottom: 1.5px solid #3399da;
    /* border-left: 1px solid #000;
    border-right: 1px solid #000; */
  }
  .tabWp {
    color: #fff;
    height: 96.5vh;
    /* padding-top: 3.5vh;
    margin-top: -3.5vh; */
    box-sizing: border-box;
    position: relative;
  }
  
  .switchBtn {
    background-color: #fff;
    position: fixed;
    z-index: 10000;
    right: 1vw;
    bottom: 1vw;
    padding: 0.5vw;
    outline: 1px solid #ccc;
  }
</style> 
<style > 
@import "./styles/style.css";
</style> 


