<!-- 对象打印组件 
  
-->
<template lang="html"> 
<section v-if="objVal" class="_vmc_ObjLog" > 
  <div class="_vmc_objItm" v-for="(prop,idx) in objKeysMap" > 
    <div v-if="objValCheck(prop)==='待处理的对象'" class="_vcm_obj_obj">
      <div class="_vmc_obj_objKey ft0" @click="showObjKeys(prop+'--')"> 
        <span v-if="objVal[prop]" class="unfoldIcon" 
          :data-rotate="showMap[prop+'--']">▶
        </span> 
        <span class="color1"> {{prop}}: </span>
        <span> {{dealObjType(prop)}} </span>
      </div>
      <VMCObjLog v-if="showMap[prop+'--']" :objVal="objVal[prop]" ></VMCObjLog>
    </div>
    <div v-else-if="objValCheck(prop)!=='无法显示的属性值'" class="_vcm_obj_prop ft0"> 
      <span class="_vcm_obj_prop_key color1">{{prop}} :</span>
      <span> {{objValCheck(prop)}} </span>
    </div>
  </div>
</section> 
</template> 

<script> 
import {checkObjVal, getObjKeys } from "../util.js";
export default {
  name: 'VMCObjLog',
  props: {
    objVal: {
      default(){ return '';},
    },
  },
  data(){
    let _map = {};
    getObjKeys(this.objVal).forEach( prop=>{
      _map[prop+'--'] = false; // 解决bug: prop和vue自定义的属性冲突
    });
    return {
      showMap: _map, 
    };
  },
  computed: {
    objKeysMap(){
      return getObjKeys(this.objVal);
      // .sort( (itm1,itm2)=> (itm1>itm2 ? 1 : -1) )
    },
  },
  watch: {
    objVal(val){
      this.showMap = {}; 
      getObjKeys(this.objVal).forEach( prop=>{
        this.showMap[prop+'--'] = false; 
      });
    },
  },
  methods: {
    objValCheck(prop){
      return checkObjVal(this.objVal,prop)
    },
    dealObjType(prop){
      try {
        return Object.prototype.toString.call(this.objVal[prop]).slice(8,-1);
      } 
      catch (e) {
        return 'todo'
      } 
    },
    showObjKeys(prop){
      this.showMap[prop]= !this.showMap[prop];
      this.$forceUpdate(); // 修复bug: 状态已改变,但未更新视图 
    },
  },
};
</script> 

<style scoped> 
  .color1 { color: #f687ff; }
  ._vmc_ObjLog {
    margin-left: 1em;
  }
  ._vcm_obj_prop {
    /* margin-left: 10px;
    text-indent: -10px; */
    word-break: break-all;
    display: flex;
    flex-wrap: wrap;
  }
  ._vcm_obj_prop_key {
    margin-right: 0.5em;
  }
</style> 
<style > 
</style> 
