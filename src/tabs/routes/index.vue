<!-- Routes tab页 
  
-->
<template lang="html"> 
<section class="_vmc_Routes"> 
  <div class="_vmc_options">
    <button type="button" class="_vmc_optBtn" @click="refresh">刷新</button>
    <textarea class="_vmc_urlInput flexgrow" v-model="currentPageURL"></textarea>
    <button type="button" class="_vmc_optBtn" @click="clearURL">清空</button>
    <button type="button" class="_vmc_optBtn" @click="enterURL">访问</button>
  </div>
  <div class="_vmc_body" > 
    <div class="_vmc_listWrap _vmc_LW1">
      <div class="_vmc_listTl">
        地址记录: 
        <span class="_vmc_listTlRit" @click="clearHistory">清空</span>
      </div>
      <div class="_vmc_listBd">
        <div class="_vmc_LBItm" v-for="(itm,key) in historyList" :key="key"> 
          <span class="_vmc_LBITl">
            <span> {{key}} </span>
            <span class="colorMain"> {{itm.type}}: </span>
          </span>
          <span class="">{{itm.url}} </span>
        </div>
      </div>
    </div>
    <div class="_vmc_listWrap _vmc_LW2">
      <div class="_vmc_listTl"> 
        项目目录: 
        <span v-if="$root.$options._unRouter">未传入参数 router,无路由数据</span>
      </div>
      <div class="_vmc_listBd" v-if="!$root.$options._unRouter">
        <CatalogItem class="_vmc_catalogItm" :paths="routesList"></CatalogItem>
      </div>
    </div>
  </div>
  <div class="_vmc_footer indent1"> 
    <div class=""> 
      <span class="colorMain">navigator.appVersion:</span>
      {{appVersion}}
    </div>
    <div class=""> 
      <span class="colorMain">navigator.userAgent:</span>
      {{userAgent}}
    </div>
  </div>
</section> 
</template> 

<script> 
export default {
  data(){ 
    return {
      currentPageURL: location.href,
      
      historyList: [
        // { type: 'KW', url: '', },
      ], 
      // todo: 使用 localStorage 记录 
      
      routesList: [
        // {
        //   name: '',
        //   path: '',
        //   children: [],
        // }
      ],
      
      appVersion: '',
      userAgent: '',
    };
  },
  created(){
    this.updateURL({ type: 'pageLoad', });
    window.addEventListener("hashchange",this.updateURL);
    window.addEventListener("popstate",this.updateURL);
    window.addEventListener("pushState",this.updateURL);
    window.addEventListener("replaceState",this.updateURL);
    
    if ( !this.$root.$options._unRouter ) {
      this.routesList = this.$router.options.routes;
    }
    // this.addGlobalLink();
    
    this.appVersion = window.navigator.appVersion;
    this.userAgent = window.navigator.userAgent;
  },
  methods: {
    updateURL(evt){
      this.$nextTick(()=>{
        this.currentPageURL = location.href;  
        this.historyList.push({
          type: evt.type,
          url: location.href,
        })
      })
    },
    clearURL(){
      this.currentPageURL = '';
    },
    refresh(){
      location.reload();
    },
    enterURL(){
      location.href = this.currentPageURL; 
    },
    
    clearHistory(){
      this.historyList = [];
    },
    
    addGlobalLink(){
      let anhor = document.getElementById("catalogLink");
      if ( !anhor ) {
        anhor = document.createElement("a");
        anhor.textContent = '目录'
        anhor.setAttribute("href","#/catalog")
        anhor.setAttribute("id","catalogLink")
        anhor.setAttribute("style",` position: fixed; right: 0; top: 0; `)
        document.body.appendChild(anhor); 
      }
    },
  },
  components: {
    CatalogItem: ()=>import('./CatalogItem.vue'),
  },
};
</script> 

<style scoped> 
  @import "../common.css";
  ._vmc_Routes { }
  ._vmc_options {
    height: 4.5vh;
    align-items: center;
  }
  ._vmc_optBtn {
    flex-shrink: 0;
    height: 100%;
  }
  ._vmc_urlInput {
    height: 100%;
  }
  
  ._vmc_body {
    top: 4.5vh;
    display: flex;
    flex-direction: column;
  }
  ._vmc_listWrap {
    box-sizing: border-box;
    flex-shrink: 0;
    position: relative;
  }
  ._vmc_LW1 {
    flex-basis: 40%;
    border-bottom: 2px solid #fff;
  }
  ._vmc_LW2 {
    flex-basis: 60%;
  }
  ._vmc_listTl { 
    margin: 0.1em 0; 
    font-size: 16px;
  }
  ._vmc_listTlRit {
    float: right;
    cursor: pointer;
  }
  ._vmc_listBd {
    overflow: scroll;
    border-top: 1px dashed #aaa;
    position: absolute;
    top: 2em;
    left: 0; 
    bottom: 0;
    width: 100%;
  }
  ._vmc_LBItm {
    display: flex;
    flex-wrap: wrap;
    word-break: break-all;
    margin-left: 1em;
  }
  ._vmc_LBITl {
    text-indent: -1em;
    margin-right: 0.5em;
  }
  ._vmc_catalogItm { margin-left: -1em; }
  
  ._vmc_footer {
    border-top: 2px solid #fff;
    padding: 0 0.5em 0.5em 1em;
    box-sizing: border-box;
    font-size: 12px;
  }
</style> 
<style > 
</style> 
