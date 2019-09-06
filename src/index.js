// 用于移动端调试使用 

// preset 
import './tabs/console/console.js';
import './tabs/network/network.js';
import './tabs/routes/routes.js';
import './tabs/storage/storage.js';


import vmc from "./vmc.vue";
export default function(Vue,router,store){
  let div = document.createElement("div")
  div.id = '_vmc'
  document.body.appendChild(div);
  let options = { render: h=>h(vmc), }
  if ( router ) { 
    options.router = router; 
    options._unRouter = false;
  }
  else {
    // 解决未传入 router 时, 使用 this.$router 判断报错的 bug 
    options._unRouter = true; 
  }
  if ( store ) { options.store = store; }
  new Vue(options).$mount('#_vmc');
}













