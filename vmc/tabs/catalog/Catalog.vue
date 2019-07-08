<!--  
  catalog 目录  
-->
<template > 
<section class="catalog"> 
  <h1>项目目录: </h1>
  
  <CatalogItem class="catalogItemCpt" :paths="routesList"> </CatalogItem>
  
  <div class="bottom"> </div>
</section>
</template> 

<script> 
export default {
  data(){
    return {
      routesList: [
        // {
        //   name: '',
        //   path: '',
        //   children: [],
        // }
      ],
    }
  },
  methods: {
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
  created(){
    this.routesList = this.$router.options.routes
    // console.log( '路由:', this.routesList );
    
    // this.addGlobalLink();
  },
  components: {
    CatalogItem: () => import('./CatalogItem.vue')
  }
}
</script> 

<style scoped> 
  h1 {
    margin: 0.5em 0; 
  }
  .catalogItemCpt {
    margin-left: -1em;
  }
  .bottom {
    height: 10vh;
  }
</style> 
