<!-- 元素标签组件 
  
-->
<template lang="html"> 
<!-- 元素节点 -->
<div v-if="node.nodeType===1" class="_vmc_elem ft0"> 
  <div v-if="node.childNodes && node.childNodes.length>0" class="_vcm_tag">
    <div class="_vmc_tagS ft0">
      <span class="unfoldIcon">▶</span>
      <span class="_vmc_tagNameSS color0">&lt;{{node.tagName | toLower}}</span> 
      <template v-if="node.attributes"> 
        <span class="_vmc_tagAttr ft0" v-for="(itm,key) in node.attributes">
          <span>&nbsp;</span>
          <span class="color1">{{itm.nodeName}}</span> 
          <template v-if="itm.nodeValue">
            <span>=</span> 
            <span class="color2">{{'"'+itm.nodeValue+'"'}}</span>
          </template>
        </span>
      </template> 
      <span class="_vmc_tagNameSE color0">&gt;</span> 
    </div>
    <span class="_vmc_tagCt1 color0">...</span> 
    <div class="_vmc_tagCt2" style="display:none;" >
      <VMCElemTag v-for="(itm,key) in node.childNodes" :key="key" :node="itm" ></VMCElemTag>
    </div>
    <span class="_vmc_tagE color0">&lt;/{{node.tagName | toLower}}&gt; </span>
  </div>
  <div v-else class="_vcm_outerHTML color9"> {{node.outerHTML}} </div>
</div> 
<!-- 文本节点 -->
<span v-else-if="node.nodeType===3&&node.nodeValue.trim()" class="_vmc_text" >{{node.nodeValue}}</span>
<!-- 注释节点 -->
<span v-else-if="node.nodeType===8" class="_vmc_comment" >&lt;!-- {{node.nodeValue}} --&gt;</span>
</template> 

<script> 
export default {
  name: 'VMCElemTag',
  props: {
    node: {
      default(){ return {};},
    },
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
  updated(){
    // this.$emit('updated','');
  },
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
  .color0 { color: #ff8ffc; }
  .color1 { color: #ffa066; }
  .color2 { color: #bcc1ec; }
  .color9 { color: #e0e0e0; }
  
  ._vmc_elem {
    margin-left: 10px;
  }
  ._vmc_tagE[data-unfold] { 
    margin-left: 1em;
  }
  ._vmc_text, ._vmc_comment {
    margin-left: 2em;
    max-width: 100vw;
    /* max-height: 50vh; */
    overflow: auto;
    display: inline-block;
  }
  ._vmc_tagS {
    display: inline;
    word-break: break-all;
    /* white-space: nowrap; */
  }
  ._vmc_tagCt2 {
    /* white-space: nowrap; */
    /* max-width: 100vw;
    max-height: 100vh;
    overflow: scroll; */
  }
  ._vcm_outerHTML {
    word-break: break-all;
  }
  ._vmc_tagAttr { }
</style> 
<style> 
</style> 
