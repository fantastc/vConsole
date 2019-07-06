// 用于移动端调试使用 
import './scripts/preset.js';
import index from "./index.vue";

export default function(Vue,router){
  let div = document.createElement("div")
  div.id = '_vmc'
  document.body.appendChild(div);
  new Vue({
    router,
    render: h=>h(index),
  }).$mount('#_vmc');
}













