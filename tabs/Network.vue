<!--  
  
-->
<template lang="html"> 
<section class="Network"> 
  <div class="options">
    <div class="optFlts">
      <label class="optFlt" v-for="(itm,key) in filter" :key="key"> 
        <input type="checkbox" v-model="itm.value">{{itm.label}} 
      </label>
    </div>
    <div class="optTl pointer" @click="clearLogs"> 清空 </div>
  </div>
  
  <div class="body" > 
    <div class="bdItm" v-for="(itm,idx) in netList" :key="idx" v-show="filter[itm.type].value">
      <div class="line url">
        <span class="lineTl ">{{idx}}: </span>
        <div class="lineCt"> {{itm.method}}: {{itm.url}} </div>
       </div>
      <div class="lineWp" style="display:block;">
        <div class="line lineItems"> 
          <span class="lineItm"> Status: {{itm.status}} </span>
          <span class="lineItm"> Time: {{itm.time}} </span>
        </div>
        <div class="line "> 
          <span class="lineTl ">Req: </span>
          <div class="lineCt lCt1">
            <pre>{{itm.req}}</pre> 
          </div>
        </div>
        <div class="line "> 
          <span class="lineTl ">Hds: </span>
          <div class="lineCt lCt1">
            <pre>{{itm.headers}}</pre> 
          </div>
        </div>
        <div class="line "> 
          <span class="lineTl ">Res: </span>
          <div class="lineCt lCt2">
            <pre>{{itm.res}}</pre> 
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="footer">
    <div class="ftLine ftl1">
      <select v-model="ajax.typ">
        <option value="POST">POST</option>
        <option value="GET">GET</option>
      </select>
      <button class="ftBtn"  type="button" @click="ajaxSend">提交</button>
      <textarea name="name" v-model="ajax.url"></textarea>
      <button class="ftBtn" type="button" @click="clearAjaxURL">清空</button>
    </div>
    <div class="ftLine ftl2">
      <!-- 优化: 可选择请求数据类型 -->
      <textarea name="name" row="2" v-model="ajax.req"></textarea>
      <button class="ftBtn"  type="button" @click="clearAjaxReq">清空</button>
    </div>
    <div class="ftLine ftl3">
      <textarea name="name" disabled v-model="ajax.res"></textarea>
    </div>
  </div>
</section> 
</template> 

<script> 
import {dealResponse,} from "../scripts/tool.js";
export default {
  data(){ 
    return {
      filter: {
        xhr: { value: true, label: 'XHR', }, 
        js: { value: false, label: 'JS', }, 
      },
      
      netList: window._netList, 
      
      ajax: {
        typ: 'POST',
        url: '',
        req: '',
        res: '',
      },
    };
  },
  mounted(){
    this.$el.addEventListener("click",(evt)=>{
      let _title = null; 
      if (evt.target.getAttribute("class")==='line url') {
        _title = evt.target;
      }
      else if (evt.target.parentElement.getAttribute("class")==='line url') {
        _title = evt.target.parentElement;
      }
      if (!_title) { return ; }
      
      let _content = _title.nextElementSibling; 
      if (_content.style.display==='none') {
        _content.style.display = 'block';
      }
      else {
        _content.style.display = 'none';
      }
      
    })
  },
  methods: {
    clearLogs(){
      window._netList = []
      this.netList = window._netList; 
    },
    
    clearAjaxURL(){
      this.ajax.url = '';
    },
    clearAjaxReq(){
      this.ajax.req = '';
    },
    ajaxSend(){
      this.ajax.res = '';
      let xhr = new XMLHttpRequest();
      xhr.open(this.ajax.typ,this.ajax.url.trim(),true)
      xhr.setRequestHeader('Content-Type', 'application/json'); 
      // xhr.onload = (evt)=>{
      //   this.ajax.res = dealResponse(xhr.responseType,xhr.response); 
      // };
      xhr.addEventListener("load",(evt)=>{
        console.log('xhr load',xhr.response);
        this.ajax.res = dealResponse(xhr.responseType,xhr.response); 
      })
      // xhr.addEventListener("loadend",(evt)=>{
      //   console.log('xhr loadend',xhr.response);
      // })
      // xhr.addEventListener("error",(evt)=>{
      //   console.log('xhr error',xhr.response);
      // })
      xhr.send(this.ajax.req || null);
    },
  },
  components: {
    // XxxXxx: ()=>import('./xxx.vue'),  
  },
};
</script> 

<style scoped> 
  @import "./common.css";
  .Network {
    font-size: 12px;
    display: flex;
    flex-direction: column;
  }
  
  .options {
    font-size: 14px;
  }
  
  .bdItm {
    padding-left: 0;
    border-bottom: 1px solid #ccc;
  }
  .url {
    color: #2ab7fc;
    text-decoration: underline;
    overflow: scroll;
  }
  .line {
    box-sizing: border-box;
    padding-left: 2.5em;
    margin-bottom: 0.5em;
    position: relative;
  }
  .lineItems {
    padding: 0 3em;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
  .lineItm { }
  .lineTl {
    color: gold;
    position: absolute;
    top: 0; left: 0; 
    z-index: -1;
  }
  .lineCt {
    overflow: scroll;
    max-height: 3em;
    min-height: 1.3em;
  }
  .lCt1 {
    max-height: 8em;
  }
  .lCt2 {
    max-height: 15em;
  }
  
  .ftLine {
    display: flex;
  }
  .ftBtn {
    flex-shrink: 0;
  }
  .ftl1 {
    height: 1.5em;
  }
  .ftl3 {
    flex-grow: 1;
  }
</style> 
<style > 
</style> 
