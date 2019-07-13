/* Console ---------------------------------------------------------------- */
window._logList = [ // 控制台输出 
  // {
  //   type: '', // log warn error 
  //   msgs: [ '', ],
  // },
];


let _log = console.log;
let _info = console.info;
let _warn = console.warn; 
let _error = console.error;
console.log = (...args)=>{
  _log('~',...args);
  window._logList.push({ type: 'log', msgs: args, })
}
console.info = (...args)=>{
  _info('~',...args);
  window._logList.push({ type: 'info', msgs: args, })
}
console.warn = (...args)=>{
  _warn('~',...args);
  window._logList.push({ type: 'warn', msgs: args, })
}
// console.error = new Proxy(console.error,{
//   apply(target,context,args){       
//     window._logList.push({ type: 'error', msgs: args, })
// 
//     return target.call(context,...args);
//   },
// })
console.error = (...args)=>{
  _error('~',...args);
  window._logList.push({ type: 'error', msgs: args, })
}


// window.onerror = function(message, source, lineno, colno, error){
//   console.log('window.onerror',message, source, lineno, colno, error);
// }
if (!sessionStorage._vmc_error__) {
  sessionStorage._vmc_error__ = JSON.stringify({
    num: 0,
    message: 'VMConsole用于记录JS错误的sessionStorage',
  }, null, 2);
}
window.addEventListener("error",function(evt){
  // console.log('window.onerror',evt);
  let _msg = JSON.parse(sessionStorage._vmc_error__);
  sessionStorage[`_vmc_error_${_msg.num}_`] = JSON.stringify({
    error: evt.error.stack,
    message: evt.message,
    filename: evt.filename,
    lineno: evt.lineno,
    colno: evt.colno,
  }, null, 2)
  _msg.num++;
  sessionStorage._vmc_error__ = JSON.stringify(_msg, null, 2);
})


