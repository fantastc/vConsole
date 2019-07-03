<!--  
  
-->
<template lang="html"> 
<section class="Location"> 
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
  <!-- <div class="footer"> </div> -->
</section> 
</template> 

<script> 
export default {
  data(){ 
    return {
      currentPageURL: location.href,
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
  @import "./common.css";
  .Location {
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
</style> 
<style > 
</style> 
