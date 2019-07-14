<!-- Element tab页 
  
-->
<template lang="html"> 
<section class="_vmc_Element"> 
  <div class="_vmc_options">
    <span class="_vmc_opt" :data-active="activeOpt===key"
      @click="changeOption(key)"
      v-for="(itm,key) in options" :key="key">{{key}} </span>
  </div>
  <div class="_vmc_body">
    <div v-if="activeOpt==='ElementTags'" class="_vmc_elems" ref="elemRoot">
      <div class="_vmc_elem_options">
        <!-- <span class="btn pointer" @click="isFold">展开/折叠</span> -->
        <span class="btn pointer" @click="refresh">刷新</span>
      </div>
      <div class="_vmc_elem_root">
        <VMCElemTag :node="rootEl" @updated="updatedCb"></VMCElemTag>
      </div>
    </div>
    <div v-else class="_vmc_cpntWp">
      <div class="_vmc_cpnts"> 
        <VMCCpnt ref="VMCCpnt" :elem="rootEl" @choosed="cpntChoosed"></VMCCpnt>
      </div>
      <div class="_vmc_cpntDt"> 
        <div class="_vmc_cpnt_dataTypes" v-for="(itm,key) in cpntKeys" :key="key">
          <div v-if="choosedCpnt && checkObjVal(choosedCpnt,itm.key)==='待处理的对象'"
            class="_vmc_cpnt_dataType">
            <span @click="showData(itm)">
              <span class="unfoldIcon">▶</span>
              {{itm.name}}
            </span>
            <div v-if="itm.isShow" class="_vmc_cpnt_dataTypeItms">
              <VMCObjLog :objVal="choosedCpnt[itm.key]"></VMCObjLog>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> 
</template> 

<script> 
import {checkObjVal, } from "../../scripts/tool.js";
import VMCElemTag from "./ElemTag.vue";
import VMCCpnt from "./Cpnt.vue";
export default {
  data(){ 
    return {
      options: {
        ElementTags: {
          
        },
        VueComponents: {
          
        },
      },
      activeOpt: 'ElementTags', 
      
      rootEl: {},
      
      choosedCpnt: null, 
      cpntKeys: [
        { name: 'props', key:'$props', isShow:true, },
        { name: 'data', key:'$data', isShow:true, },
        { name: 'computed', key:'_computedWatchers', isShow:true, },
        { name: '$refs', key:'$refs', isShow:true, },
      ],
    };
  },
  created(){ 
    let el = window.document.firstElementChild
    el.normalize();
    this.rootEl = el;
    
  },
  mounted(){ 
    // 元素展开/折叠 
    this.$nextTick(()=>{
      this.$refs.elemRoot.addEventListener("click",(evt)=>{
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
    })
    
    // this.adjustStyle();
  },
  methods: {
    changeOption(key){
      this.activeOpt = key;
      if (key==='VueComponents') {
        this.$nextTick(arg=>{
          this.$refs.VMCCpnt.showChildren();
        })
      }
    },
    
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
    
    cpntChoosed(elem){
      this.choosedCpnt = elem.__vue__;
      
      let active1 = this.$el.querySelector("._vmc_cpntPN[data-active]");
      if (active1) {
        active1.removeAttribute('data-active');
      }
    },
    checkObjVal(obj,prop){
      return checkObjVal(obj,prop)
    },
    showData(itm){
      itm.isShow = !itm.isShow; 
    },
  },
  components: {
    VMCElemTag,
    VMCCpnt,
    VMCObjLog: ()=>import('../../components/VMCObjLog.vue'),
  },
};
</script> 

<style scoped> 
  @import "../common.css";
  ._vmc_options {
    justify-content: space-around;
  }
  ._vmc_opt {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  ._vmc_opt[data-active] {
    color: gold;
  }
  
  ._vmc_body {
    bottom: 0; 
  }
  ._vmc_elems {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  ._vmc_elem_options {
    flex-basis: 20px;
    flex-shrink: 0; 
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px dashed #aaa;
  }
  ._vmc_elem_root {
    flex-grow: 1;
    box-sizing: border-box;
    overflow-y: auto;
    margin-left: -1em;
    font-size: 12px;
    user-select: none;
  }
  ._vmc_cpntWp {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  ._vmc_cpnts {
    flex-basis: 60%;
    flex-shrink: 0;
    overflow: auto;
    border-bottom: 1.5px solid #ccc;
    box-sizing: border-box;
  }
  ._vmc_cpntDt {
    flex-basis: 40%;
    flex-shrink: 0;
    overflow: auto;
  }
  ._vmc_cpnt_dataTypeItms {
    margin-left: 1em;
  }
</style> 
<style> 
</style> 
