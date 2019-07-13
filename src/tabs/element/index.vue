<!-- Element tab页 
  
-->
<template lang="html"> 
<section class="_vmc_Element"> 
  <div class="_vmc_options">
    <span class="btn pointer" @click="isFold">展开/折叠</span>
    <span class="btn pointer" @click="refresh">刷新</span>
  </div>
  <div class="_vmc_body">
    <div class="_vmc_root">
      <VMCElemTag :node="rootEl" @updated="updatedCb"></VMCElemTag>
    </div>
  </div>
</section> 
</template> 

<script> 
import VMCElemTag from "./ElemTag.vue";
export default {
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
    // 元素展开/折叠 
    this.$el.addEventListener("click",function(evt){
      let klass1 = evt.target.getAttribute("class");
      let kalss2 = evt.target.parentElement.getAttribute("class");
      let _line = null; 
      if (klass1.includes("_vmc_tagTitle")) {
        _line = evt.target;
      }
      else if (kalss2.includes('_vmc_tagTitle')) {
        _line = evt.target.parentElement;
      }
      if ( !_line ) { return ; }
      
      let _arrow = _line.firstElementChild;  
      let _endTag = _line.lastElementChild; 
      let _unfold = _line.nextElementSibling;  
      if ( _unfold.style.display === 'none' ) {
        _arrow.setAttribute("class","rotate90");
        _endTag.style.display = 'none';
        _unfold.style.display = 'block';
      }
      else {
        _arrow.setAttribute("class","");
        _endTag.style.display = 'inline-block';
        _unfold.style.display = 'none';
      }
      
    })
    
    // this.adjustStyle();
  },
  methods: {
    // 样式调整 
    // adjustStyle(){
    //   Array.prototype.forEach.call(
    //     this.$el.querySelectorAll("._vmc_tagContent"),
    //     function(itm){
    //       if ( !itm.querySelector("div") && itm.innerText.length<100 ) {
    //         let tagTitle = itm.previousElementSibling;
    //         tagTitle.setAttribute("class","_vmc_tagTitle_1");
    //         tagTitle.removeChild(tagTitle.firstElementChild);
    //         tagTitle.removeChild(tagTitle.lastElementChild);
    // 
    //         itm.style.display = 'inline';
    //         let text = itm.querySelector("._vmc_text");
    //         let comment = itm.querySelector("._vmc_comment");
    //         if ( text ) { text.style.margin = '0'; }
    //         if ( comment ) { comment.style.margin = '0'; }
    //       }
    //     }
    //   )
    // },
    refresh(){ 
      this.rootEl = {};
      setTimeout(()=>{
        let el = window.document.firstElementChild
        el.normalize();
        this.rootEl = el;
      })
    },
    isFold(){ },
    
    updatedCb(){
      // console.log('components updated');
      // this.adjustStyle();
    },
  },
  components: {
    VMCElemTag,
  },
};
</script> 

<style scoped> 
  @import "../common.css";
  ._vmc_options {
    justify-content: flex-end;
  }
  ._vmc_body {
    bottom: 0; 
  }
  ._vmc_root {
    margin-left: -1em;
    font-size: 12px;
    user-select: none;
  }
</style> 
<style> 
</style> 
