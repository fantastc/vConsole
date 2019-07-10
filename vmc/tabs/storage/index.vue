<!--  
  
-->
<template lang="html"> 
<section class="Storage"> 
  <div class="options"> 
    <div class="optItm" v-for="(itm,key) in optionList" :key="key"
      @click="activOpt=itm.id"
      :data-active="itm.id===activOpt"> 
      {{itm.id}} 
    </div>
  </div>
  <div class="body"> 
    <div class="" v-show="activOpt===itm.id"
      v-for="(itm,key) in optionList" :key="key"> 
      <div class="mapItm" v-for="(itm1,key1) in itm.map" :key="key1"> 
        <span class="mapKey">{{key1}}</span> 
        <span class="mapVal">
          {{itm1}}
        </span>
      </div>
    </div>
  </div>
  <!-- <div class="footer"> </div> -->
</section> 
</template> 

<script> 
export default {
  data(){ 
    return {
      optionList: [
        { id: 'Cookie', map: {
          
        }},
        { id: 'localStorage', map: window.localStorage},
        { id: 'sessionStorage', map: window.sessionStorage},
      ],
      activOpt: 'Cookie',
      
    };
  },
  created(){
    window.document.cookie.split('; ').forEach((itm,idx)=>{
      let arr = itm.split('=')
      this.optionList[0].map[arr[0]] = arr.slice(1).join('=');
    })
  },
  methods: {
    fn(){ },
  },
};
</script> 

<style scoped> 
  @import "../common.css";
  .options {
    justify-content: space-between;
  }
  .optItm {
    flex-grow: 1;
    display: flex;
    justify-content: center;
  }
  .optItm[data-active] {
    color: #2ab7fc;
  }
  .body { 
    bottom: 0; 
  }
  .mapItm {
    font-size: 14px;
    word-break: break-all;
    border-bottom: 1px solid #ccc;
    display: flex;
  }
  .mapKey {
    border-right: 1px solid #ccc;
    flex-basis: 6em;
    flex-shrink: 0; 
  }
</style> 
<style> 
</style> 
