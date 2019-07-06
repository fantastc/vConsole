<!--  
  
-->
<template> 
<section class="catalogItem"> 
  <div class="path" v-for="(val,key) in pathArr" :key="key" >
    <div class="">
      <span class="routeName" @click="clickPreIcon(val)">
        {{ val.children.length ? '▶' : '▷'}}
        {{ val.meta ? (val.meta.pageName||'未定义') : (val.name||'未命名') }} : 
      </span>
      <RouterLink class="link colorMain" :to="currentPath(val)" > 
        {{ currentPath(val) }} 
      </RouterLink>
      <span class="pointer" @click="routerReplace(val)"> ◆◆◆ </span>
    </div>
    <CatalogItem v-if="isShowMore(val)" v-show="val.showChild" 
      :paths="val.children" 
      :prePath="currentPath(val)">
    </CatalogItem>
  </div>
</section> 
</template> 


<script> 
export default {
  name: 'CatalogItem',
  props: {
    paths: {
      default(){ return [] }
    },
    prePath: {
      default(){ return '' }
    },
  },
  data(){ 
    return {
      pathArr: []
    }
  },
  computed: {
  },
  created(){
    // console.log( this.paths );
    this.pathArr = this.paths.map(function(val,idx){
      return {
        name: val.name,
        path: val.path,
        meta: val.meta, 
        children: val.children || [] , 
        showChild: false, 
      }
    } )

  },
  methods: {
    clickPreIcon(val){
      val.showChild = !val.showChild 
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
    isShowMore(val){
      return val.children && val.children.length>0
    },
  },
}
</script> 

<style scoped> 
  .routeName {
    cursor: default;
    /*user-select: none;*/
  }
  .path {
    margin: 4px 0 4px 1em;
  }
  .link {
    display: inline-block;
    min-width: 5em;
    cursor: pointer;
    text-decoration: none;
    border-bottom: 1px solid ;
  }
</style> 
