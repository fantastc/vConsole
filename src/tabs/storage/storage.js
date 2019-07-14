





// window.onerror = function(message, source, lineno, colno, error){
//   console.log('window.onerror',message, source, lineno, colno, error);
// }
if (!sessionStorage._vmc_error__) {
  sessionStorage._vmc_error__ = JSON.stringify({
    num: 0,
    msg: 'VMConsole用于记录JS错误的sessionStorage',
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






