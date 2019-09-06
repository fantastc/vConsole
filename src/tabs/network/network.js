/* Network ---------------------------------------------------------------- */
import { dealResponse, } from "../../util.js";

window._netList = [ // AJAX请求 
  // {
  //  type: 'xhr', // xhr js 
  //  
  //   url: '',
  //   method: '',
  //   status: '',
  //   time: '',
  //   headers: '',
  //   req: '',
  //   res: '',
  // 
  //   _xhr: <obj>,
  // },
  // 
];

// xhr连接 
window.XMLHttpRequest.prototype.open = new Proxy(window.XMLHttpRequest.prototype.open,{
  apply(target,context,args){   
    let _xhrItem = {
      type: 'xhr',
      url: args[1],
      method: args[0],
      status: `${context.status} ${context.statusText}`, 
      time: Date.now(),
      headers: '',
      req: '',
      res: 'pending',
      
      _xhr: context, 
    }
    window._netList.push(_xhrItem)
    // console.log('url', args[1]);
    
    context.addEventListener("readystatechange",(evt)=>{
      if (context.readyState!==4) { return ; }
      
      // if (context.status===200) {
      //   // console.log('success',context.response);
      // }
      // else {
      //   // console.log('err',context.response);
      // }
      
      // 未出错[包括访问成功及访问失败] 
      if (context.status!==0) {
        // console.log('xhr readystatechange1');
        _xhrItem.res = dealResponse(context.responseType,context.response);
        _xhrItem.headers = context.getAllResponseHeaders(); 
        _xhrItem.status = `${context.status} ${context.statusText}`; 
        _xhrItem.time = Date.now() - _xhrItem.time; 
      }
    })
    // context.addEventListener("load",(evt)=>{ })
    context.addEventListener("error",(evt)=>{
      // console.log('xhr error1');
      _xhrItem.res = '请求错误!';
      _xhrItem.headers = ''; 
      _xhrItem.status = `${context.status} ${context.statusText}`; 
      _xhrItem.time = Date.now() - _xhrItem.time; 
    })
    // context.addEventListener("loadend",(evt)=>{
    //   console.log('xhr loadend1');
    // })
    
    return target.call(context,...args );
  },
})
// xhr发送请求 
// let _send = XMLHttpRequest.prototype.send 
// XMLHttpRequest.prototype.send = function(...args){
//   // ...
//   _send(...args);
// }
window.XMLHttpRequest.prototype.send = new Proxy(window.XMLHttpRequest.prototype.send,{
  apply(target,context,args){       
    let _req = '';
    if ( args[0] === null ) {
      _req = 'null'; 
    }
    else if (typeof args[0] === 'object') {
      _req = JSON.stringify(args[0], null, 2);
    }
    else {
      _req += args[0];
    }
    
    let mb = window._netList.find((itm,idx)=>{ 
      return itm._xhr === context;    
    })
    if (mb) { mb.req = _req; }
    

    return target.call(context,...args );
  },
})


/* xhr响应 -------------------------------------------------------------------------------- */
// Object.defineProperty(window.XMLHttpRequest.prototype,'onreadystatechange',{
//   // get(){
//   //   console.log('get ', this);
//   //   return this._onreadystatechange
//   // },
//   set(fn){
//     this.__readystatechangeIsWatched__ = true; // 
//     this.addEventListener("readystatechange",(...args)=>{
//       if (this.readyState===4) {
//         if (this.status===200) {
//           // console.log('success',this.response);
//         }
//         else {
//           // console.log('err',this.response);
//         }
// 
//         // 未出错[包括访问成功及访问失败] 
//         if (this.status!==0) {
//           console.log('xhr readystatechange1');
//           let mb = window._netList.find((itm,idx)=>{ 
//             return itm._xhr === this;    
//           })
//           if (mb) { 
//             // console.log('response', this.responseText, this.response);
//             // console.log('response', this.responseText, this.response);
//             mb.res = dealResponse(this.responseType,this.response);
//             mb.headers = this.getAllResponseHeaders(); 
//             mb.status = `${this.status} ${this.statusText}`; 
//             mb.time = Date.now() - mb.time; 
//           }
//         }
//       }
//       fn(...args);
//     });
//   },
// })
// Object.defineProperty(window.XMLHttpRequest.prototype,'onload',{
//   set(fn){
//     this.__loadIsWatched__ = true; // 
//     this.addEventListener("load",(...args)=>{
//       console.log('xhr load1');
//       // if (this.status===200) {
//       //   console.log('success',this.response);
//       // }
//       // else {
//       //   console.log('err',this.response);
//       // }
// 
//       let mb = window._netList.find((itm,idx)=>{ 
//         return itm._xhr === this;    
//       })
//       if (mb) { 
//         // console.log('response', this.responseText, this.response);
//         // console.log('response', this.responseText, this.response);
//         mb.res = dealResponse(this.responseType,this.response);
//         mb.headers = this.getAllResponseHeaders(); 
//         mb.status = `${this.status} ${this.statusText}`; 
//         mb.time = Date.now() - mb.time; 
//       }
//       fn(...args);
//     });
//   },
// })
// Object.defineProperty(window.XMLHttpRequest.prototype,'onerror',{
//   set(fn){
//     this.__errorIsWatched__ = true; // 
//     this.addEventListener("error",(...args)=>{
//       console.log('xhr error1');
//       let mb = window._netList.find((itm,idx)=>{ 
//         return itm._xhr === this;    
//       })
//       if (mb) { 
//         mb.res = '请求出错!';
//         // mb.headers = this.getAllResponseHeaders(); 
//         mb.status = `${this.status} ${this.statusText}`; 
//         mb.time = Date.now() - mb.time; 
//       }
//       fn(...args);
//     });
//   },
// })
// Object.defineProperty(window.XMLHttpRequest.prototype,'onloadend',{
//   set(fn){
//     this.__loadendIsWatched__ = true; // 
//     this.addEventListener("loadend",(...args)=>{
//       console.log('xhr loadend1');
//       let mb = window._netList.find((itm,idx)=>{ 
//         return itm._xhr === this;    
//       })
//       if (mb) { 
//         console.log(this);
//         // mb.res = '!';
//         // mb.headers = this.getAllResponseHeaders(); 
//         // mb.status = `${this.status} ${this.statusText}`; 
//         // mb.time = Date.now() - mb.time; 
//       }
//       fn(...args);
//     });
//   },
// })
// XMLHttpRequestEventTarget.prototype.addEventListener = new Proxy(
//   XMLHttpRequestEventTarget.prototype.addEventListener,
//   {
//     apply(target,context,args){ 
//       if (context.constructor===XMLHttpRequest && args[0]==='readystatechange' && !context.__readystatechangeIsWatched__) {
//         console.log('xhr readystatechange2');
//         return target.call(context,args[0],function(...args1){
//           let mb = window._netList.find((itm,idx)=>{ 
//             return itm._xhr === context;    
//           })
//           if (mb) { 
//             mb.res = dealResponse(context.responseType,context.response);
//             mb.headers = context.getAllResponseHeaders(); 
//             mb.status = `${context.status} ${context.statusText}`; 
//             mb.time = Date.now() - mb.time; 
//           }
// 
//           args[1](...args1);
//         });
//       }
//       if (context.constructor===XMLHttpRequest && args[0]==='load' && !context.__loadIsWatched__) {
//         console.log('xhr load2');
//         return target.call(context,args[0],function(...args1){
//           let mb = window._netList.find((itm,idx)=>{ 
//             return itm._xhr === context;    
//           })
//           if (mb) { 
//             mb.res = dealResponse(context.responseType,context.response);
//             mb.headers = context.getAllResponseHeaders(); 
//             mb.status = `${context.status} ${context.statusText}`; 
//             mb.time = Date.now() - mb.time; 
//           }
// 
//           args[1](...args1);
//         });
//       }
// 
//       return target.call(context,...args);
//     },
//   }
// )
// 报错.不可重写 window.XMLHttpRequest.prototype 
// window.XMLHttpRequest.prototype = new Proxy(window.XMLHttpRequest.prototype,{
//   set(target,prop,val,receiver){ 
//     // 写代理对象的某属性值时触发 
//     console.log( prop );
//     return true; 
//   }, 
// })
/* -------------------------------------------------------------------------------- */

