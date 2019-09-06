<!-- Store tab页 
  
-->
<template lang="html"> 
<section class="_vmc_Storage"> 
  <div class="_vmc_options"> 
    <div class="_vmc_optItm pointer" v-for="(itm,key) in optionList" :key="key"
      @click="activIdx=key"
      :data-active="key===activIdx"> 
      {{itm.id}} 
    </div>
  </div>
  <div class="_vmc_body"> 
    <div class="_vmc_handleBtns" >  
      <span v-if="!optionList[activIdx].isHideClear" 
        class="btn pointer _vmc_refresh" @click="clearSS">清空
      </span>
      <span class="btn pointer _vmc_refresh" @click="refreshFn">刷新</span>
    </div>
    <div class="_vmc_opItms">
      <div class="_vmc_opItem" v-show="activIdx===key"
        v-for="(itm,key) in optionList" :key="key"> 
        <template v-if="itm.map" >
          <div class="_vmc_mapItm" v-for="(itm1,key1) in itm.map" :key="key1"> 
            <span class="_vmc_mapKey colorMain">{{key1}}</span> 
            <pre v-if="itm.preShow" class="_vmc_mapVal">{{itm1}} </pre>
            <div v-else class="_vmc_mapVal">{{itm1}} </div>
          </div>
        </template>
        <template v-else-if="itm.list">
          <div  class="_vmc_mapItm" v-for="(itm1,key1) in itm.list" :key="key1"> 
            <span class="_vmc_mapKey colorMain">{{itm1.name}}</span> 
            <div class="_vmc_mapVal">{{itm1.value}} </div>
          </div>
        </template>
      </div>
    </div>
  </div>
  <!-- <div class="footer"> </div> -->
</section> 
</template> 

<script> 
import {Cookie, } from "../../scripts/tool.js";
export default {
  data(){ 
    return {
      optionList: [
        { id: 'Cookies', list: [
          // { name: '', value:'', }
        ], },
        { id: 'Local', preShow: true, map: {} },
        { id: 'Session', preShow: true, map: {} },
        { id: 'VuexStore', isHideClear:true, preShow: true, map: {
          'VMConsole提示': '未传入参数 store, 导致无法获取 VuexStore 数据',
        },},
        { id: 'OtherMsg', isHideClear:true, map: {
          'navigator.appName': window.navigator.appName,
          'navigator.appVersion': window.navigator.appVersion,
          'navigator.userAgent': window.navigator.userAgent,
        } },
      ],
      activIdx: 0,
    };
  },
  created(){
    // 初始化 
    this.optionList.forEach( itm=>{
      this[ `fill${itm.id}` ](); 
    })
  },
  methods: {
    fillCookies(){
      this.optionList[0].list = Cookie.all();
    },
    fillLocal(){
      this.optionList[1].map = window.localStorage;
    },
    fillSession(){
      this.optionList[2].map = window.sessionStorage;
    },
    fillVuexStore(){
      if (this.$store) {
        this.optionList[3].map = {
          ...this.$store.state,
          ...this.$store.getters,
        };
      }
    },
    fillOtherMsg(){
      // console.log('todo');
    },
    clearCookies(){
      Cookie.all().forEach( itm=>{
        Cookie.mutilDel(itm.name);
        Cookie.mutilDel(itm.name,location.pathname);
      })
      Cookie.all(true); 
    },
    clearLocal(){
      window.localStorage.clear();
    },
    clearSession(){
      window.sessionStorage.clear();
    },
    
    refreshFn(){ 
      this[ `fill${this.optionList[this.activIdx].id}` ](); 
      this.$forceUpdate();
    },
    clearSS(){ 
      this[ `clear${this.optionList[this.activIdx].id}` ](); 
      this.refreshFn();
    },
  },
};
</script> 

<style scoped> 
  @import "../common.css";
  ._vmc_options {
    justify-content: space-between;
  }
  ._vmc_optItm {
    font-size: 14px;
    flex-grow: 1;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ._vmc_optItm[data-active] {
    color: gold;
  }
  ._vmc_body { 
    bottom: 0; 
    display: flex;
    flex-direction: column;
  }
  ._vmc_handleBtns {
    flex-shrink: 0;
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid #fff;
  }
  ._vmc_opItms {
    flex-grow: 1;
    overflow-y: auto;
  }
  ._vmc_mapItm {
    word-break: break-all;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    display: flex;
  }
  ._vmc_mapKey {
    padding: 5px 0 5px 4px;
    box-sizing: border-box;
    border-right: 1px solid #ccc;
    flex-basis: 20%;
    flex-shrink: 0; 
  }
  ._vmc_mapVal {
    flex-basis: 80%;
    flex-shrink: 0;
    padding: 5px ;
    overflow: auto;
    word-break: break-all;
    box-sizing: border-box;
  }
</style> 
<style> 
</style> 
