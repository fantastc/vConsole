<!-- Store tab页 
  
-->
<template lang="html"> 
<section class="_vmc_Storage"> 
  <div class="_vmc_options"> 
    <div class="_vmc_optItm pointer" v-for="(itm,key) in optionList" :key="key"
      @click="activOpt=itm.id"
      :data-active="itm.id===activOpt"> 
      {{itm.id}} 
    </div>
  </div>
  <div class="_vmc_body"> 
    <div class="_vmc_handleBtns" >  
      <span class="btn pointer _vmc_refresh" @click="refreshFn">刷新</span>
    </div>
    <div class="_vmc_opItem" v-show="activOpt===itm.id"
      v-for="(itm,key) in optionList" :key="key"> 
      <div class="_vmc_mapItm" v-for="(itm1,key1) in itm.map" :key="key1"> 
        <span class="_vmc_mapKey colorMain">{{key1}}</span> 
        <span class="_vmc_mapVal"> {{itm1}} </span>
      </div>
    </div>
  </div>
  <!-- <div class="footer"> </div> -->
</section> 
</template> 

<script> 
export default {
  data(){ 
    return {
      optionList: [
        { id: 'Cookies', map: {} },
        { id: 'LocalStorage', map: {} },
        { id: 'SessionStorage', map: {} },
        { id: 'VuexStore', map: {} },
      ],
      activOpt: 'Cookies',
    };
  },
  created(){
    // console.log(this.$store);
    this.optionList.forEach( itm=>{
      itm.map = this['fill'+itm.id]();
    })
  },
  methods: {
    fillCookies(){
      let _map = {};
      window.document.cookie.split('; ').forEach((itm,idx)=>{
        let arr = itm.split('=')
        _map[arr[0]] = arr.slice(1).join('=');
      })
      return _map;
    },
    fillLocalStorage(){
      return window.localStorage;
    },
    fillSessionStorage(){
      return window.sessionStorage;
    },
    fillVuexStore(){
      return this.$store.state;
    },
    
    refreshFn(){ 
      this.$forceUpdate();
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
  }
  ._vmc_handleBtns {
    border-bottom: 1px solid #fff;
    display: flex;
    justify-content: flex-end;
  }
  ._vmc_mapItm {
    word-break: break-all;
    border-bottom: 1px solid #ccc;
    display: flex;
  }
  ._vmc_mapKey {
    border-right: 1px solid #ccc;
    flex-basis: 6em;
    flex-shrink: 0; 
  }
</style> 
<style> 
</style> 
