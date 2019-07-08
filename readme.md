<h1>VMConsole</h1>
<h1>Vue Mobile Console: Vue项目的移动端调试控制台</h1>


<h2>使用</h2>
<pre>
// 安装: 
$ npm i -D vmconsole;

// 使用: 
// import Vue from 'vue'; // 依赖项目中的Vue  
// import router from './router/index.js'; // 依赖项目中的路由 
import VMC from "vmconsole/vmc/index.js"; // 引入 VMConsole  
new VMC(Vue,router);                      // 初始化 VMConsole  

// 或按需引入,非生产环境引入 
// if ( process.env.NODE_ENV!=='production' ) {
//   const VMC = require("vmconsole/vmc/index.js").default; 
//   new VMC(Vue,router);
// }
</pre>

<img src="./doc/console.png" > 
<img src="./doc/element.png" > 
<img src="./doc/network.png" > 
<img src="./doc/routes.png" > 
<img src="./doc/storage.png" > 





 



















