<!-- 控制台打印 
  
-->
<template lang="html"> 
<section class="Console"> 
  <div class="options">
    <div class="optTl pointer" @click="clearLogs"> 清空 </div>
    <div class="optFlts">
      <label class="optFlt" v-for="(itm,key) in filter" :key="key"> 
        <input type="checkbox" v-model="itm.value">{{itm.label}} 
      </label>
    </div>
  </div>
  
  <div class="body" > 
    <div class="bdItm" v-for="(itm,key) in logList" :key="key" 
      v-show="filter[itm.type].value">
      <span class="bdItmTl"> {{key}}: </span>
      <div :class="['bdItmCt',itm.type]">
        <pre><span class="part" v-for="(itm1,key1) in itm.msgs" :key="key1" >~{{itm1}} </span></pre>
      </div>
    </div>
  </div>
  
  <div class="footer">
    <textarea class="codeArea" v-model="jsStrCode"></textarea>
    <div class="btns">
      <button type="button" @click="clearCode">清空</button>
      <button type="button" @click="codeRun">执行</button>
    </div>
  </div>
</section> 
</template> 

<script> 
export default {
  data(){ 
    return {
      filter: {
        log: { value: true, label: 'Log', }, 
        warn: { value: true, label: 'Warn', }, 
        error: { value: true, label: 'Error', }, 
      },
      
      logList: window._logList, 
      
      jsStrCode: '',
    };
  },
  methods: {
    clearLogs(){
      window._logList = []; 
      this.logList = window._logList; 
    },
    
    clearCode(){
      this.jsStrCode = '';
    },
    codeRun(){
      console.log( '执行结果:', window.eval( this.jsStrCode ) );
    },
  },
};
</script> 

<style scoped> 
  @import "./common.css";
  .Console {
  }
  
  .bdItmTl {
    color: #a0c7b6;
    position: absolute;
    top: 0; 
    left: 0; 
  }
  .bdItmCt {
    overflow: scroll;
    max-height: 5em;
  }
  
  .codeArea {
    flex-grow: 1;
  }
  
  .log:first-line { color: #2ab7fc; }
  .warn:first-line { color: yellow; }
  .err:first-line { color: red; }
  .part {
    margin-right: 0.2em; 
  }
</style> 
<style > 
</style> 
