<!-- Element tab页 
  
-->
<template lang="html"> 
<section class="_vmc_Element"> 
  <div class="_vmc_options">
    <!-- <span class="btn pointer" @click="isFold">展开/折叠</span> -->
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
    this.$el.addEventListener("click",(evt)=>{
      let _class = '_vmc_tagS';
      
      let elem1 = evt.target;
      let klass1 = elem1.getAttribute("class") || '';
      if (klass1.includes(_class)) { 
        this.foldHandle(elem1)
        return ; 
      }
      
      let elem11 = elem1.previousElementSibling || elem1; 
      let klass11 = elem11.getAttribute("class") || '';
      if (klass11.includes(_class)) { 
        this.foldHandle(elem11)
        return ; 
      }
      
      let elem2 = elem1.parentElement || elem1; 
      let klass2 = elem2.getAttribute("class") || '';
      if (klass2.includes(_class)) { 
        this.foldHandle(elem2)
        return ; 
      }
      
      let elem3 = elem2.parentElement || elem1; 
      let klass3 = elem3.getAttribute("class") || '';
      if (klass3.includes(_class)) { 
        this.foldHandle(elem3)
        return ; 
      }
      
      
      let klass9 = elem1.getAttribute("class") || '';
      if (klass9.includes('_vmc_tagE')) { 
        this.foldHandle(elem2.firstElementChild);
        return ; 
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
    foldHandle(tag){
      let _arrow = tag.firstElementChild;  
      let _content1 = tag.nextElementSibling;  
      let _content2 = _content1.nextElementSibling;  
      let _tagEnd = _content2.nextElementSibling;  
      if ( _content2.style.display==='none' ) {
        _arrow.setAttribute("class","rotate90");
        _content1.style.display = 'none';
        _content2.style.display = 'block';
        _tagEnd.setAttribute("data-unfold","");
      }
      else {
        _arrow.setAttribute("class","");
        _content1.style.display = 'inline';
        _content2.style.display = 'none';
        _tagEnd.removeAttribute("data-unfold");
      }
    },
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
