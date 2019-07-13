<!-- Console tab页 
  
-->
<template lang="html"> 
<section class="_vmc_Console"> 
  <div class="_vmc_options">
    <div class="_vmc_optFlts">
      <label class="_vmc_optFlt" 
        v-if="itm.label"
        v-for="(itm,key) in filter" :key="key"> 
        <input type="checkbox" v-model="itm.value">{{itm.label}} 
      </label>
    </div>
    <div class="_vmc_optTl pointer" @click="clearLogs"> 清空 </div>
  </div>
  
  <div class="_vmc_body" > 
    <div class="_vmc_link" v-for="(itm,key) in linkList" >
      <a :href="itm.link" target="_blank">{{itm.msg}}</a>
    </div>
    <div class="_vmc_bdItm" 
      v-for="(itm,key) in logList" :key="key" 
      v-show="filter[itm.type].value">
      <span class="_vmc_bdItmTl"> {{key}}: </span>
      <div :class="['_vmc_bdItmCt','_vmc_'+itm.type]">
        <VMCLog v-for="(val,key1) in itm.msgs" :key="key1" :logVal="val"></VMCLog>
      </div>
    </div>
  </div>
  
  <div class="_vmc_footer">
    <textarea class="_vmc_codeArea" v-model="jsStrCode" placeholder="here input js code to run"></textarea>
    <div class="_vmc_btns">
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
      linkList: [
        // { msg: '', link: '', },
      ],
      
      filter: {
        log: { value: true, label: 'Log', }, 
        info: { value: true, label: 'Info', }, 
        warn: { value: true, label: 'Warn', }, 
        error: { value: true, label: 'Error', }, 
      },
      
      logList: window._logList, 
      
      jsStrCode: '',
    };
  },
  created(){
    // 首次使用 
    if (localStorage && !localStorage._vmc_) {
      this.linkList.push({
        msg: '觉得好用的话, 来点个★吧! ╰(*´︶`*)╯',
        link: 'https://github.com/fntst/VMConsole',
      })
      this.linkList.push({
        msg: '或者来提issues, 解决bug或增加所需功能',
        link: 'https://github.com/fntst/VMConsole/issues',
      })
      localStorage._vmc_ = '1';
    }
  },
  methods: {
    clearLogs(){
      window._logList = []; 
      this.logList = window._logList; 
      this.linkList = [];
    },
    
    clearCode(){
      this.jsStrCode = '';
    },
    codeRun(){
      console.log( '执行结果:', window.eval( this.jsStrCode ) );
    },
  },
  components: {
    VMCLog: ()=>import('./VMCLog.vue'),
  },
};
</script> 

<style scoped> 
  @import "../common.css";
  ._vmc_Console {
    font-size: 13px;
  }
  
  ._vmc_link {
    padding: 5px 8px;
  }
  ._vmc_link a{
    color: #fff;
    font-size: 13px;
  }
  
  ._vmc_bdItm {
    border-bottom: 1px solid #ccc;
  }
  ._vmc_bdItmTl {
    color: #a0c7b6;
    position: absolute;
    top: 0; 
    left: 0; 
  }
  ._vmc_bdItmCt { }
  
  ._vmc_codeArea {
    flex-grow: 1;
  }
  
  /* .log { color: #2ab7fc; } */
  ._vmc_info { color: #ccc; }
  ._vmc_warn { color: yellow; }
  ._vmc_error { color: #fe6868; }
</style> 
<style > 
</style> 
