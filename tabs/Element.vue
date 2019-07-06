<!--  
  
-->
<template lang="html"> 
<section class="Element"> 
  <div class="options">
    <button type="button" @click="refresh">刷新</button>
    <button type="button" @click="isFold">展开/折叠</button>
  </div>
  <div class="body">
    <div class="root">
      <Tag :node="rootEl"></Tag>
    </div>
  </div>
</section> 
</template> 

<script> 
import Tag from "./tags/Tag.vue";
export default {
  name: 'Element',
  data(){ 
    return {
      rootEl: {},
    };
  },
  created(){ 
    let el = window.document.firstElementChild
    el.normalize();
    this.rootEl = el;
  },
  mounted(){ 
    this.$el.addEventListener("click",function(evt){
      let klass1 = evt.target.getAttribute("class");
      let kalss2 = evt.target.parentElement.getAttribute("class");
      let _endTag = null; 
      let _unfold = null;  
      if (klass1==='_vmc_tagTitle') {
        _endTag = evt.target.lastElementChild; 
        _unfold = evt.target.nextElementSibling;
      }
      else if (kalss2==='_vmc_tagTitle') {
        _endTag = evt.target.parentElement.lastElementChild; 
        _unfold = evt.target.parentElement.nextElementSibling
      }
      if ( !_unfold || !_endTag) { return ; }
      
      if ( _unfold.style.display === 'none' ) {
        _unfold.style.display = 'block';
        _endTag.style.display = 'none';
      }
      else {
        _unfold.style.display = 'none';
        _endTag.style.display = 'inline';
      }
      
    })
    
    Array.prototype.forEach.call(
      this.$el.querySelectorAll("._vmc_tagContent"),
      function(itm){
        if ( !itm.querySelector("div") ) {
          itm.style.display = 'inline';
          let tagTitle = itm.previousElementSibling;
          tagTitle.setAttribute("class","_vmc_tagTitle_1");
          tagTitle.removeChild(tagTitle.lastElementChild);
        }
      }
    )
  },
  methods: {
    refresh(){ 
      let el = window.document.firstElementChild
      el.normalize();
      this.rootEl = el;
    },
    isFold(){ 
      
    },
  },
  components: {
    Tag,
  },
};
</script> 

<style scoped> 
  @import "./common.css";
  .root {
    margin-left: -1em;
    font-size: 12px;
    user-select: none;
  }
  .body {
    bottom: 0; 
  }
</style> 
<style> 
</style> 
