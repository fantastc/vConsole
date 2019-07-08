/* Network ---------------------------------------------------------------- */
import { dealResponse, } from "./tool.js";

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
    window._netList.push({
      type: 'xhr',
      url: args[1],
      method: args[0],
      status: `${context.status} ${context.statusText}`, 
      time: Date.now(),
      headers: '',
      req: '',
      res: 'pending',
      
      _xhr: context, 
    })
    // console.log('url', args[1]);

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
    if (mb) { 
      mb.req = _req; 
      // console.log('req', _req);
    }
    

    return target.call(context,...args );
  },
})
// xhr响应 
Object.defineProperty(window.XMLHttpRequest.prototype,'onreadystatechange',{
  // get(){
  //   console.log('get ', this);
  //   return this._onreadystatechange
  // },
  set(fn){
    // console.log('xhr readystatechange');
    this.addEventListener("readystatechange",(...args)=>{
      if (this.readyState===4) {
        if (this.status===200) {
          // console.log('success',this.response);
        }
        else {
          // console.log('err',this.response);
        }
        
        let mb = window._netList.find((itm,idx)=>{ 
          return itm._xhr === this;    
        })
        if (mb) { 
          // console.log('response', this.responseText, this.response);
          // console.log('response', this.responseText, this.response);
          mb.res = dealResponse(this.responseType,this.response);
          mb.headers = this.getAllResponseHeaders(); 
          mb.status = `${this.status} ${this.statusText}`; 
          mb.time = Date.now() - mb.time; 
        }
      }
      fn(...args);
    });
  },
})
Object.defineProperty(window.XMLHttpRequest.prototype,'onload',{
  // get(){
  // },
  set(fn){
    // console.log('xhr load1');
    this.__loadIsWatched__ = true; // 
    this.addEventListener("load",(...args)=>{
      if (this.status===200) {
        // console.log('success',this.response);
      }
      else {
        // console.log('err',this.response);
      }
      
      let mb = window._netList.find((itm,idx)=>{ 
        return itm._xhr === this;    
      })
      if (mb) { 
        // console.log('response', this.responseText, this.response);
        // console.log('response', this.responseText, this.response);
        mb.res = dealResponse(this.responseType,this.response);
        mb.headers = this.getAllResponseHeaders(); 
        mb.status = `${this.status} ${this.statusText}`; 
        mb.time = Date.now() - mb.time; 
      }
      fn(...args);
    });
  },
})
// todo: onerror
XMLHttpRequestEventTarget.prototype.addEventListener = new Proxy(
  XMLHttpRequestEventTarget.prototype.addEventListener,
  {
    apply(target,context,args){ 
      if (context.constructor===XMLHttpRequest && args[0]==='load' && !context.__loadIsWatched__) {
        // console.log('xhr load2');
        return target.call(context,args[0],function(...args1){
          let mb = window._netList.find((itm,idx)=>{ 
            return itm._xhr === context;    
          })
          if (mb) { 
            mb.res = dealResponse(context.responseType,context.response);
          }
          
          args[1](...args1);
        });
      }
      
      return target.call(context,...args);
    },
  }
)
// 报错.不可重写 window.XMLHttpRequest.prototype 
// window.XMLHttpRequest.prototype = new Proxy(window.XMLHttpRequest.prototype,{
//   set(target,prop,val,receiver){ 
//     // 写代理对象的某属性值时触发 
//     console.log( prop );
//     return true; 
//   }, 
// })


