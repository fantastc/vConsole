// 用于移动端调试使用 
import './scripts/preset.js';
import Vue from "vue";
import index from "./index.vue";

export default function(router){
  // console.log('router',router);
  let div = document.createElement("div")
  div.id = '_vConsole'
  document.body.appendChild(div);
  new Vue({
    router,
    render: h=>h(index),
  }).$mount('#_vConsole');
}













