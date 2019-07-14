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


