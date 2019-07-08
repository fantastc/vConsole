<!--  
  
-->
<template lang="html"> 
<section class="VMCObjLog" v-if="objVal"> 
  <div class="_vmc_objItm" v-for="(itm,key) in objVal" > 
    <span class="_vmc_objItmKey">{{key}}: </span>
    <VMCLog :logVal="itm"></VMCLog>
  </div>
</section> 
</template> 

<script> 
export default {
  name: 'VMCObjLog',
  props: {
    objVal: {
      default(){ return {}; },
    },
  },
  computed: {
    // objLog(){
    //   return dealObject(this.objVal);
    // },
  },
  // beforeCreate(){
  //   this.$options.components.VMCLog = require('./Log.vue').default
  // },
  components: { 
    VMCLog: ()=>import('./VMCLog.vue'), 
  },
};
</script> 

<style scoped> 
  .VMCObjLog {
    margin-left: 1em;
  }
  ._vmc_objItmKey {
    display: inline-block;
  }
</style> 
<style > 
</style> 
