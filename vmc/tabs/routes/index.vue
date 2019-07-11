<!--  
  
-->
<template lang="html"> 
<section class="Routes"> 
  <div class="options">
    <button type="button" class="optBtn" @click="refresh">刷新</button>
    <textarea class="flexgrow" rows="2" v-model="currentPageURL"></textarea>
    <button type="button" class="optBtn" @click="clearURL">清空</button>
    <button type="button" class="optBtn" @click="enterURL">访问</button>
  </div>
  <div class="body" > 
    <div class="listWrap LW1">
      <div class="listTl">
        地址记录: 
        <span class="listTlRit" @click="clearHistory">清空</span>
      </div>
      <div class="listBd">
        <div class="" v-for="(itm,key) in historyList" :key="key"> 
          {{key}} <span class="">{{itm.type}}:</span>
          <span class="">{{itm.url}} </span>
        </div>
      </div>
    </div>
    <div class="listWrap LW2">
      <div class="listTl"> 
        项目目录: 
      </div>
      <div class="listBd">
        <CatalogItem class="catalogItm" :paths="routesList"></CatalogItem>
      </div>
    </div>
  </div>
  <div class="footer indent"> 
    <div class=""> navigator.appVersion: {{appVersion}}</div>
    <div class=""> navigator.userAgent: {{userAgent}}</div>
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
      // 使用 localStorage 记录 
      
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
  computed: { },
  created(){
    this.updateURL({ type: 'pageLoad', });
    window.addEventListener("hashchange",this.updateURL);
    window.addEventListener("popstate",this.updateURL);
    window.addEventListener("pushState",this.updateURL);
    window.addEventListener("replaceState",this.updateURL);
    
    this.routesList = this.$router.options.routes;
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
  .Routes {
  }
  .options {
    height: 4.5vh;
  }
  .optBtn {
    flex-shrink: 0;
  }
  
  .body {
    top: 4.5vh;
    display: flex;
    flex-direction: column;
  }
  .listWrap {
    flex-shrink: 0;
    position: relative;
  }
  .LW1 {
    flex-basis: 40%;
    border-bottom: 2px solid #ccc;
  }
  .LW2 {
    flex-basis: 60%;
  }
  .listTl { 
    margin: 0.1em 0; 
  }
  .listTlRit {
    float: right;
    cursor: pointer;
  }
  .listBd {
    overflow: scroll;
    border-top: 1px dashed #ccc;
    position: absolute;
    top: 2em;
    left: 0; 
    bottom: 0;
    width: 100%;
  }
  .catalogItm { margin-left: -1em; }
  
  .footer {
    border-top: 1px solid #ccc;
    padding: 0 0.5em 0.5em 2em;
    box-sizing: border-box;
    font-size: 12px;
  }
</style> 
<style > 
</style> 
