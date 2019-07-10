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
    <!-- 待嵌入vue路由 -->
    <Catalog></Catalog>
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
      
      appVersion: '',
      userAgent: '',
    };
  },
  computed: { },
  created(){
    window.addEventListener("hashchange",(evt)=>{
      // this.currentPageURL = evt.newURL; 
      this.updateURL();
    });
    window.addEventListener("popstate",this.updateURL);
    window.addEventListener("pushState",this.updateURL);
    window.addEventListener("replaceState",this.updateURL);
    
    this.appVersion = window.navigator.appVersion;
    this.userAgent = window.navigator.userAgent;
  },
  methods: {
    updateURL(){
      this.$nextTick(()=>{
        this.currentPageURL = location.href;  
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
  },
  components: {
    Catalog: ()=>import('./catalog/Catalog.vue'),
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
    bottom: 0;
  }
  .footer {
    border-top: 1px solid #ccc;
    padding: 0 0.5em 0.5em 2em;
    box-sizing: border-box;
    font-size: 12px;
  }
</style> 
<style > 
</style> 
