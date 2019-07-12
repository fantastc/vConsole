<!-- 对象打印组件 
  
-->
<template lang="html"> 
<section class="_vmc_ObjLog" v-if="objVal" > 
  <div class="_vmc_objItm" v-for="(prop,idx) in objMap" > 
    <div v-if="objValCheck(prop)==='待处理'" class="_vcm_obj_obj">
      <div class="_vmc_obj_objKey ft0" @click="showObjKeys(prop)"> 
        <span class="_vmc_objTlIcon" :data-rotate="showMap[prop+'--']">▶</span> 
        <span class="color1"> {{prop}}: </span>
        <span> {{dealObjType(prop)}} </span>
      </div>
      <VMCObjLog v-if="showMap[prop+'--']" :objVal="objVal[prop]" ></VMCObjLog>
    </div>
    <div v-else-if="objValCheck(prop)!=='删除'" class="_vcm_obj_prop ft0"> 
      <span class="_vcm_obj_prop_key color1">{{prop}} :</span>
      <span> {{objValCheck(prop)}} </span>
    </div>
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
    Object.getOwnPropertyNames(this.objVal).forEach( prop=>{
      _map[prop+'--'] = false; // 解决bug: prop和vue自定义的属性冲突
    })
    return {
      showMap: _map, 
    }
  },
  computed: {
    objMap(){
      return Object.getOwnPropertyNames(this.objVal).sort( (itm1,itm2)=>{
        return itm1>itm2 ? 1 : -1;
      })
    },
  },
  methods: {
    objValCheck(prop){
      let val = '';
      try { val = this.objVal[prop]; } 
      catch (e) { return '删除' } 
      
      if ( val===undefined ) { return 'undefined'; }
      else if ( val===null ) { return 'null'; }
      else if ( typeof val==='number' ) { return val+''; }
      else if ( typeof val==='string' ) { return val; }
      else if ( typeof val==='boolean' ) { return val+''; }
      else if ( typeof val==='function' ) { return val.toString(); }
      
      return '待处理';
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
      this.showMap[prop+'--']= !this.showMap[prop+'--'];
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
  ._vmc_objTlIcon[data-rotate] {
    display: inline-block;
    transform: rotate(90deg);
  }
</style> 
<style > 
</style> 
