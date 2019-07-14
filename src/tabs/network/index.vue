<!-- Nwtwork tab页 
  
-->
<template lang="html"> 
<section class="_vmc_Network"> 
  <div class="_vmc_options">
    <div class="_vmc_optFlts">
      <label class="_vmc_optFlt" v-for="(itm,key) in filter" :key="key"> 
        <input type="checkbox" v-model="itm.value">{{itm.label}} 
      </label>
    </div>
    <div class="_vmc_optTl pointer" @click="clearLogs"> 清空 </div>
  </div>
  
  <div class="_vmc_body" > 
    <div class="_vmc_bdItm" 
      v-for="(itm,idx) in netList" :key="idx" 
      v-show="filter[itm.type].value">
      <div class="_vmc_url">
        <span class="_vmc_lineTl ">{{idx}}: </span>
        <div class="_vmc_reqUrl"> {{itm.method}}: {{itm.url}} </div>
       </div>
      <div class="_vmc_lineWp" style="display:none;">
        <div class="_vmc_line _vmc_lineItems"> 
          <span class="_vmc_lineItm"> Status: {{itm.status}} </span>
          <span class="_vmc_lineItm"> Time: {{itm.time}} ms</span>
        </div>
        <div class="_vmc_line "> 
          <!-- <span class="_vmc_lineTl ">Req: </span> -->
          <div class="_vmc_lineCt ">
            <pre>{{itm.req}}</pre> 
          </div>
        </div>
        <div class="_vmc_line "> 
          <!-- <span class="_vmc_lineTl ">Hds: </span> -->
          <div class="_vmc_lineCt ">
            <div class="_vmc_hd_itm" 
              v-for="(itm1,key1) in dealReqHeaders(itm.headers)" :key="key1">
              <span class="_vmc_hd_itm_key">{{key1}}: </span>  
              <span class="_vmc_hd_itm_val">{{itm1}}</span>
            </div>
          </div>
        </div>
        <div class="_vmc_line "> 
          <!-- <span class="_vmc_lineTl ">Res: </span> -->
          <div class="_vmc_lineCt ">
            <pre>{{itm.res}}</pre> 
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="_vmc_footer">
    <div class="_vmc_ftLine _vmc_ftl1">
      <select v-model="ajax.typ">
        <option value="POST">POST</option>
        <option value="GET">GET</option>
      </select>
      <button class="_vmc_ftBtn"  type="button" @click="ajaxSend">提交</button>
      <textarea name="name" v-model="ajax.url" placeholder="here is request url"></textarea>
      <button class="_vmc_ftBtn" type="button" @click="clearAjaxURL">清空</button>
    </div>
    <div class="_vmc_ftLine ftl2">
      <!-- 优化: 可选择请求数据类型 -->
      <textarea name="name" row="2" v-model="ajax.req" placeholder="here is request data"></textarea>
      <button class="_vmc_ftBtn"  type="button" @click="clearAjaxReq">清空</button>
    </div>
    <div class="_vmc_ftLine _vmc_ftl3">
      <textarea name="name" disabled v-model="ajax.res" placeholder="here will show response"></textarea>
    </div>
  </div>
</section> 
</template> 

<script> 
import {dealResponse,} from "../../scripts/tool.js";
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
    let klass = '_vmc_url'
    this.$el.addEventListener("click",(evt)=>{
      let _title = null; 
      if (evt.target.getAttribute("class")===klass) {
        _title = evt.target;
      }
      else if (evt.target.parentElement.getAttribute("class")===klass) {
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
    dealReqHeaders(headers){
      let _map = {}; 
      headers.split(/\n/).filter( itm=>itm).forEach((itm,idx)=>{
        let arr = itm.split(': ')
        _map[arr[0]] = arr.slice(1).join(': ');
      })
      return _map; 
    },
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
};
</script> 

<style scoped> 
  @import "../common.css";
  ._vmc_Network {
    display: flex;
    flex-direction: column;
  }
  
  ._vmc_optTl {
    font-size: 14px;
  }
  
  ._vmc_bdItm {
    padding-left: 0;
    padding-bottom: 0;
    border-bottom: 1px solid #ccc;
  }
  ._vmc_url {
    color: #2ab7fc;
    text-decoration: underline;
    padding-left: 1.5em;
    padding-bottom: 0.5em;
    box-sizing: border-box;
    position: relative;
  }
  ._vmc_line {
    box-sizing: border-box;
    margin: 0.1em 1.5em 0.1em;
    position: relative;
  }
  ._vmc_lineItems {
    padding: 0 3em;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
  ._vmc_lineItm { }
  ._vmc_lineTl {
    color: gold;
    position: absolute;
    top: 0; left: 0em; 
  }
  ._vmc_reqUrl {
    word-break: break-all;
  }
  ._vmc_lineCt {
    min-height: 1em;
    overflow-x: auto;
    border: 1px solid #ccc;
    margin: 1em 0;
  }
  ._vmc_hd_itm {
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: flex-start;
  }
  ._vmc_hd_itm:last-child {
    border-bottom: none;
  }
  ._vmc_hd_itm_key {
    padding: 1px 3px;
    flex-basis: 33%;
    flex-shrink: 0;
    border-right: 1px solid #ccc;
  }
  ._vmc_hd_itm_val {
    padding: 1px 3px;
    flex-basis: 66%;
    word-break: break-all;
  }
  
  ._vmc_ftLine {
    display: flex;
  }
  ._vmc_ftBtn {
    flex-shrink: 0;
  }
  ._vmc_ftl1 {
    height: 1.5em;
  }
  ._vmc_ftl3 {
    flex-grow: 1;
  }
</style> 
<style > 
</style> 
