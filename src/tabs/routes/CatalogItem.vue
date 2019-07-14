<!-- 目录项 
  
-->
<template> 
<section class="_vmc_catalogItem"> 
  <div class="_vmc_pathWp" v-for="(val,key) in pathArr" :key="key" >
    <div class="_vmc_pathItm">
      <span class="_vmc_routeName " @click="isShowChildren(val)">
        <span v-if="val.children.length===0" class="unfoldIcon">▷</span>
        <span v-else class="unfoldIcon" :data-rotate="val.isShow" >▶</span>
        <span class="colorMain"> {{ (val.meta&&val.meta.pageName) ? val.meta.pageName : (val.name||'未命名') }} : </span>
      </span>
      <RouterLink class="_vmc_link " :to="currentPath(val)" > 
        {{ currentPath(val) }} 
      </RouterLink>
      <span class="pointer" @click="routerReplace(val)"> ◆◆◆ </span>
    </div>
    <VMCCatalogItem v-if="val.children && val.children.length>0" v-show="val.isShow" 
      :paths="val.children" 
      :prePath="currentPath(val)">
    </VMCCatalogItem>
  </div>
</section> 
</template> 

<script> 
export default {
  name: 'VMCCatalogItem',
  props: {
    paths: {
      default(){ return []; }
    },
    prePath: {
      default(){ return ''; }
    },
  },
  data(){ 
    return {
      pathArr: [], 
    }
  },
  created(){
    // console.log( this.paths );
    this.pathArr = this.paths.map(function(val,idx){
      return {
        name: val.name,
        path: val.path,
        meta: val.meta, 
        children: val.children || [] , 
        isShow: false, 
      }
    } )
  },
  methods: {
    isShowChildren(val){
      val.isShow = !val.isShow 
    },
    currentPath(val){
      // console.log( val.path, this.prePath, val.path,  );
      if ( /^\/.*/.test( val.path ) ) {
        return val.path 
      }
      else {
        return this.prePath+'/'+val.path
      }
    },
    routerReplace(val){
      let path = this.currentPath(val);
      this.$router.replace(path);
    },
  },
}
</script> 

<style scoped> 
  ._vmc_catalogItem { }
  ._vmc_pathWp {
    margin: 4px 0 4px 1em;
  }
  ._vmc_pathItm {
    display: flex;
    flex-wrap: wrap;
    word-break: break-all;
  }
  ._vmc_routeName {
    /* flex-shrink: 0; */
    /* cursor: default; */
    /*user-select: none;*/
  }
  ._vmc_link {
    display: inline-block;
    min-width: 5em;
    cursor: pointer;
    color: #fff;
    /* text-decoration: underline; */
  }
</style> 
