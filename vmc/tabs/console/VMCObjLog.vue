<!-- 对象打印组件 
  
-->
<template lang="html"> 
<section class="_vmc_ObjLog" v-if="objVal" > 
  <div class="_vmc_objItm" v-for="(itm,key) in objVal" > 
    <div v-if="objValCheck(itm)===true" class="_vcm_obj_obj">
      <div class="_vmc_obj_objKey" @click="showObjKeys(key)"> 
        <span class="_vmc_objTlIcon" :data-rotate="isShowMap[key]">▶</span> 
        {{key}}: {{Object.prototype.toString.call(itm).slice(8,-1)}} 
      </div>
      <VMCObjLog v-if="isShowMap[key]" :objVal="itm" ></VMCObjLog>
    </div>
    <div v-else class="_vcm_obj_prop"> {{key}}: {{itm}}</div>
  </div>
</section> 
</template> 

<script> 
export default {
  name: 'VMCObjLog',
  props: {
    objVal: {
      default(){ return '';},
    },
  },
  data(){
    let _map = {}
    for(var key in this.objVal){ _map[key] = false; };
    return {
      isShowMap: _map, 
    }
  },
  methods: {
    objValCheck(val){
      if ( val===undefined ) { return 'undefined'; }
      else if ( val===null ) { return 'null'; }
      else if ( typeof val==='number' ) { return val+''; }
      else if ( typeof val==='string' ) { return val; }
      else if ( typeof val==='boolean' ) { return val+''; }
      else if ( typeof val==='function' ) { return val.toString(); }
      
      return true;
    },
    showObjKeys(key){
      this.isShowMap[key]= !this.isShowMap[key];
    },
  },
};
</script> 

<style scoped> 
  ._vmc_ObjLog {
    margin-left: 1em;
  }
  ._vmc_objTlIcon[data-rotate] {
    display: inline-block;
    transform: rotate(90deg);
  }

</style> 
<style > 
</style> 
