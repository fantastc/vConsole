<!-- Vue组件 
  
-->
<template lang="html"> 
<section class="_vmc_cpnt"> 
  <div v-if="cpnt" class="_vmc_cpntParent" >
    <span v-if="children.length>0" class="unfoldIcon" 
      :data-rotate="isShow"  
      @click="showChildren()">▶
    </span> 
    <span class="_vmc_cpntPN" @click="chooseCurrent($event)">{{cpntName}} </span>
  </div>
  <div v-if="isShow && children.length>0" class="_vmc_cpnt_children" >
    <VMCCpnt v-for="(itm,key) in children" :key="key" 
      @choosed="cpntChoosed"
      :elem="itm"> 
    </VMCCpnt>
  </div>
</section> 
</template> 

<script> 
export default {
  name: 'VMCCpnt',
  props: {
    elem: {
      default(){ return {}; },
    },
  },
  data(){ 
    return {
      isShow: false,
      children: [], 
    };
  },
  computed: {
    cpnt(){
      return this.elem.__vue__?this.elem.__vue__:false;
    },
    cpntName(){
      if (!this.cpnt) { return false; }
      // 待优化 
      return this.cpnt.$options.name || 
        this.cpnt.$options._componentTag || 
        this.elem.classList[0] || 
        this.elem.tagName;
    },
  },
  created(){
    this.children = this.findElems(this.elem.children);
  },
  methods: {
    findElems(list){
      let res = [];
      Array.prototype.map.call(list, itm=>{
        if ( itm.__vue__ ) { 
          res.push(itm);
          return true; 
        }
        
        let list1 = itm.children;
        if ( list1 && list1.length>0 ) {
          let arr1 = this.findElems(list1);
          if (arr1.length>0) {
            res.push(...arr1);
            return true;
          }
        }
        
        return false;
      })
      .filter( itm=>itm );
      
      return res;
    },
    showChildren(){ this.isShow = !this.isShow; },
    chooseCurrent(evt){
      this.$emit('choosed',this.elem);
      this.$nextTick(()=>{
        evt.currentTarget.setAttribute("data-active",'')
      })
    },
    cpntChoosed(elem){
      this.$emit('choosed',elem);
    },
  },
};
</script> 

<style scoped> 
  ._vmc_cpntPN[data-active] { color: #28ecda; }
  
  ._vmc_cpnt_children {
    margin-left: 1em;
  }
</style> 
<style > 
</style> 
