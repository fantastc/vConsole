<!-- 移动端控制台调试 
  
-->
<template lang="html"> 
<section class="_vmc_"> 
  <div class="_vmc_wrap" v-show="isShow">
    <div class="_vmc_header"> 
      <div :class="['_vmc_cardItm',activTabIdx===idx?'_vmc_activeCard':'']" 
        @click="switchTab(idx)"
        v-for="(tab,idx) in tabList" :key="idx" > 
        {{tab}}
      </div>
    </div>
    <div class="_vmc_tabWp">
      <component v-for="(itm,key) in tabList" :key="key" 
        :is="itm" v-show="key===activTabIdx">
      </component>
    </div>
  </div>
  
  <div class="_vmc_switchBtn" @click="isShowConsole"> VMC </div>
</section> 
</template> 

<script> 
import Console from "./tabs/console/index.vue";
import Element from './tabs/element/index.vue';
import Network from './tabs/network/index.vue';
import Routes from './tabs/routes/index.vue';
import Storage from './tabs/storage/index.vue';
export default {
  name: 'VMConsole',
  components: { Console, Element, Network, Routes, Storage, },
  data(){ 
    return {
      isShow: false, 
      
      tabList: [ 'Console', 'Element', 'Network', 'Routes', 'Storage', ],
      activTabIdx: 0, 
    };
  },
  methods: {
    isShowConsole(){ 
      this.isShow = !this.isShow
    },
    
    switchTab(idx){
      this.activTabIdx = idx; 
    },
  },
};
</script> 

<style scoped> 
  ._vmc_ { 
    font-size: 0;
  }
  ._vmc_wrap {
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
  ._vmc_header {
    background-color: #ccc;
    height: 4.6vh;
    display: flex;
    justify-content: space-between;
    flex-grow: 0;
  }
  ._vmc_cardItm {
    font-size: 16px;
    box-sizing: border-box;
    cursor: pointer;
    font-weight: bold;
    text-align: center;
    border-bottom: 1.5px solid #ccc;
    flex-grow: 1; 
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ._vmc_activeCard {
    border-bottom: 1.5px solid #3399da;
    /* border-left: 1px solid #000;
    border-right: 1px solid #000; */
  }
  ._vmc_tabWp {
    color: #fff;
    height: 96.5vh;
    /* padding-top: 3.5vh;
    margin-top: -3.5vh; */
    box-sizing: border-box;
    position: relative;
  }
  
  ._vmc_switchBtn {
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


