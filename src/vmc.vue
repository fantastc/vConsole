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
  
  <div class="_vmc_switchBtn" ref="_vmc_switchBtn" 
    @touchmove="touchmoveFn" 
    :style="{ left:btn.x, top:btn.y}"
    @touchstart="touchstartFn"
    @touchend="touchendFn"
    @click="isShowConsole" > 
    VMC 
  </div>
</section> 
</template> 

<script> 
import {getObjKeys, } from "./util.js";
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
      
      btn: { 
        w: 20, 
        h: 20, 
        
        x: 0,
        y: 0,
        
        maxX: 100,
        maxY: 100, 
      },
    };
  },
  mounted(){
    this.$nextTick(()=>{
      this.btn.w = this.$refs._vmc_switchBtn.clientWidth;
      this.btn.h = this.$refs._vmc_switchBtn.clientHeight;
      
      this.btn.maxX = window.innerWidth - this.btn.w;
      this.btn.maxY = window.innerHeight - this.btn.h;
      
      if ( localStorage.btnPosX && localStorage.btnPosY ) {
        this.btn.x = localStorage.btnPosX + 'px'
        this.btn.y = localStorage.btnPosY + 'px'
      }
      else {
        this.btn.x = this.btn.maxX - 10 + 'px';
        this.btn.y = this.btn.maxY -10 +'px';
      }
      
    })
    
  },
  methods: {
    isShowConsole(evt){ 
      this.isShow = !this.isShow
    },
    touchstartFn(evt){ 
      // let pos = evt.touches[0];
      // console.log(pos); 
    },
    touchendFn(evt){ 
      // let pos = evt.changedTouches[0];
      // let x = pos.clientX-this.btn.w/2;
      // let y = pos.clientY-this.btn.h/2;
    },
    touchmoveFn(evt){ 
      let position = evt.touches[0];
      let x = position.clientX-this.btn.w/2;
      let y = position.clientY-this.btn.h/2;
      if (x>0 && x < this.btn.maxX && y>0 && y < this.btn.maxY ) {
        this.btn.x = x + 'px';
        this.btn.y = y + 'px';
        
        this.throttle(()=>{
          localStorage.btnPosX = x;
          localStorage.btnPosY = y;
        })
      }
      
      
    },
    throttle(fn){
      clearTimeout(this.throttle.id);
      this.throttle.id = setTimeout(()=>{
        fn();
      },800)
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
    background-color: #2ab7fc;
    color: #fff;
    position: fixed;
    z-index: 10000;
    /* padding: 0.8vw 1.2vw; */
    width: 12vw;
    height: 8vw;
    border: 1px solid #fff;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style> 
<style > 
  ._vmc_ * {
    font-size: 12px;
  }
  ._vmc_ *[data-rotate] {
    display: inline-block;
    transform: rotate(90deg);
  }
  ._vmc_ textarea {
    box-sizing: border-box;
    width: 100%;
    display: inline-block;
  }
  ._vmc_ pre {
    margin: 0.2em 0; 
    padding: 0;
  }
  ._vmc_ .ft0 {
    font-size: 0;
  }
  ._vmc_ .colorRed {
    color: #f66565;
  }
  ._vmc_ .colorMain {
    color: #2ab7fc;
  }
  ._vmc_ .pointer {
    cursor: pointer;
  }
  ._vmc_ ._vmc_border {
    border: 1px solid #ccc;
  }
  ._vmc_ .indent {
    text-indent: -2em;
  }
  ._vmc_ .indent1 {
    text-indent: -1em;
  }
  ._vmc_ .inline {
    display: inline;
  }
  ._vmc_ .btn {
    display: inline-block;
    padding: 0.5em 1em;
  }
  ._vmc_ .rotate90 {
    display: inline-block;
    transform: rotate(90deg);
  }
  ._vmc_ .unfoldIcon {
    display: inline-block;
    width: 1em;
  }

  ._vmc_ .flexgrow {
    flex-grow: 1; 
  }
  ._vmc_ .alignCenter {
    align-items: center;
  }
  ._vmc_ .justifyCenter {
    justify-content: center;
  }
</style> 


