/* Console ---------------------------------------------------------------- */
window._logList = [ // 控制台输出 
  // {
  //   type: '', // log warn error 
  //   msgs: [ '', ],
  // },
];

let _log = console.log;
let _warn = console.warn; 
let _err = console.error;
console.log = (...args)=>{
  _log('~',...args);
  window._logList.push({ type: 'log', msgs: args, })
}
console.warn = (...args)=>{
  _warn('~',...args);
  window._logList.push({ type: 'warn', msgs: args, })
}
console.error = (...args)=>{
  _err('~',...args);
  window._logList.push({ type: 'error', msgs: args, })
}

