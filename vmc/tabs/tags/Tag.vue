<!--  
  
-->
<template lang="html"> 
<!-- 元素节点 -->
<div class="_vmc_elem" v-if="node.nodeType===1"> 
  <template v-if="node.childNodes && node.childNodes.length>0">
    <span class="_vmc_tagTitle"><span class="">▶</span>&lt;{{node.tagName | toLower}} 
      <template v-if="node.attributes"> 
        <span class="_vmc_tagAttr" v-for="(itm,key) in node.attributes">
          {{itm.nodeName}}{{itm.nodeValue?'="'+itm.nodeValue+'"':''}} 
        </span>
      </template> &gt; 
      <span class="_vmc_tagTitle_sub">... &lt;/{{node.tagName | toLower}}&gt;</span> 
    </span>
    <div class="_vmc_tagContent" style="display:none;" >
      <VMCElemTag v-for="(itm,key) in node.childNodes" :key="key" :node="itm" > </VMCElemTag>
      &lt;/{{node.tagName | toLower}}&gt;
    </div>
  </template>
  <div class="_vcm_outerHTML" v-else> {{node.outerHTML}} </div>
</div> 
<!-- 文本节点 -->
<span class="_vmc_text" v-else-if="node.nodeType===3&&node.nodeValue.trim()">{{node.nodeValue}}</span>
<!-- 注释节点 -->
<span class="_vmc_comment" v-else-if="node.nodeType===8"> &lt;!-- {{node.nodeValue}} --&gt; </span>
</template> 

<script> 
export default {
  name: 'VMCElemTag',
  props: {
    node: {
      default(){ return {};},
    },
  },
  data(){ 
    return {
    };
  },
  computed: {
    isFold(){
      let allIsTextNode = Array.prototype.every.call(this.node.childNodes, (itm,idx)=>{
        return itm.nodeType===3;
      })
      // 所有子节点为文本节点则不折叠  
      if ( allIsTextNode ) { return false; }
      
      return true;
    },
  },
  watch: { },
  updated(){
    this.$emit('updated','');
  },
  methods: { },
  filters: {
    toLower(val){
      if (val && val.length>0) {
        return val.toLowerCase()
      }
      else {
        console.log('val',val);
        return '';
      }
    }
  },
};
</script> 

<style scoped> 
  ._vmc_elem {
    margin-left: 1em;
  }
  ._vmc_text, ._vmc_comment {
    max-width: 100vw;
    max-height: 50vh;
    overflow: scroll;
    display: inline-block;
    margin-left: 1em;
  }
  ._vmc_tagTitle {
    white-space: nowrap;
  }
  ._vmc_tagContent {
    /* white-space: nowrap; */
    /* max-width: 100vw;
    max-height: 100vh;
    overflow: scroll; */
  }
  ._vcm_outerHTML {
    white-space: nowrap;
  }
</style> 
<style> 
</style> 
