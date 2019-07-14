

// 处理xhr响应为字符串 
export function dealResponse(type,response){
  let rst = '';
  if ( type==='' ) { // 默认 JSON 格式 ? 
    try {
      rst = JSON.stringify(JSON.parse(response), null, 2); 
    } 
    catch (e) {
      rst = response; 
    } 
    finally {
    
    }
  }
  else {
    rst = '处理xhr响应为字符串';
    console.warn('Todo: 处理xhr响应为字符串', type, response )
  }
  return rst; 

}

// // 格式化对象 
// // {
// //   type: 'Object',
// //   kvMap: {
// //     key1: {
// //       type: 'Array',
// //       kvMap: {
// //         1: '1',
// //       },
// //     },
// //     key2: '123', 
// //     key3: {
// //       type: 'Element',
// //       kvMap: {
// //         xx: xxx, 
// //       },
// //     },
// //     key4: { type: 'Element', },
// //   },
// // }
// export function dealObject(obj,valArr){
//   let objValArr = [];
//   if ( valArr ) { objValArr = valArr }
// 
// 
//   let _kvMap = {};
//   for(let key in obj){
//     let val = obj[key];
//     if ( val===null ) { _kvMap[key] = null; }
//     else if (typeof val==='object' ) {
//       let idx = objValArr.findIndex( itm=>{ 
//         return val===itm  
//       } )
//       if (idx===-1) { 
//         objValArr.push(val); 
//         _kvMap[key] = dealObject(val,objValArr);
//       }
//       else { 
//         // _arr1.push({
//         //   type: Object.prototype.toString.call(val).slice(8,-1), 
//         // })
//         _kvMap[key] = {
//           // type: Object.prototype.toString.call(val).slice(8,-1)
//           type: '循环引用 不展示', 
//         }
//         continue; 
//       }
//     }
//     else {
//       _kvMap[key] = val;
//     }
//   };
// 
//   return {
//     type: Object.prototype.toString.call(obj).slice(8,-1),
//     kvMap: _kvMap,
//   };
// }


// 自定义cookie增删查的方法 
export let Cookie = (function(){
  let cookies = { 
    _list: [
      // { name: '', value: '', },
    ],
    all(isForce){
      if (!isForce && this._list.length>0) {return this._list; }
      
      this._list = [];
      // window.document.cookie.split(/; (?!expires=|path=|domain=|secure)/)
      window.document.cookie.split('; ').forEach( (itm,idx)=>{
        if (itm==='') { return ; }
        
        let arr = itm.split('=')
        this._list.push({
          name: arr[0],
          value: arr.slice(1).join('='), // decodeURIComponent(arr.slice(1).join('='));
        })
      })
      return this._list;
    },
    get(name){
      // // 方法1: 
      // let cookieName = encodeURIComponent(name) + "=";
      // let cookieStart = document.cookie.indexOf(cookieName);
      // let cookieValue = null;
      // if ( cookieStart>-1 ){ // 存在该cookie 
      //   let cookieEnd = document.cookie.indexOf(";", cookieStart);
      //   if (cookieEnd == -1){ // 最后一个cookie 
      //     cookieEnd = document.cookie.length;
      //   }
      //   cookieValue = decodeURIComponent(document.cookie.substring(
      //     cookieStart + cookieName.length
      //     ,cookieEnd
      //   ));
      // }
      // return cookieValue;
      
      // 方法2: 
      return this._list.filter( itm=>{ return itm.name===name }) 
      .map( itm=>{ return itm.value })
    },
    set(name,value,option){
      // option <=>  { // 可选 
      //   expires: obj,   // Date
      //   path: str,
      //   domain: str,
      //   secure: bol, // 安全, 默认:false 
      // }
      let _name = encodeURIComponent(name);
      let _value = encodeURIComponent(value);
      let cookieText = _name + "=" + _value;
      if (option) {
        if (option.expires instanceof Date) {
          cookieText += "; expires=" + option.expires.toGMTString();
        }
        if (option.path) {
          cookieText += "; path=" + option.path;
        }
        if (option.domain) {
          cookieText += "; domain=" + option.domain;
        }
        if (option.secure) { 
          cookieText += "; secure";
        }
      }
      document.cookie = cookieText;
      this._list.push({ name: _name, value: _value, })
      return cookieText;
    },
    del(name,path,domain,secure){
      this.set(name,"", {
        expires: new Date(0),
        path: path || '/', 
        domain: domain || document.domain, 
        secure: secure || false,  
      });
      this.all(true);
    },
    // 提升 del 性能, 当批量删除后手动执行 this.all(true);
    mutilDel(name,path,domain,secure){
      this.set(name,"", {
        expires: new Date(0),
        path: path || '/', 
        domain: domain || document.domain, 
        secure: secure || false,  
      });
    },
  };
  cookies.all(true);
  return cookies;
})();

// 检测是否为可查看的对象 
export function checkObjVal(obj,prop){
  let val = '';
  try { val = obj[prop]; } 
  catch (e) { return '无法显示的属性值' } 
  
  if ( val==='' ) { return '\"\"'; }
  else if ( val===null ) { return 'null'; }
  else if ( typeof val==='undefined' ) { return 'undefined'; }
  else if ( typeof val==='boolean' ) { return val+''; }
  else if ( typeof val==='number' ) { return val+''; }
  else if ( typeof val==='string' ) { return val; }
  else if ( typeof val==='function' ) { return val.toString(); }
  else if ( Object.getOwnPropertyNames(val).length===0 ) { return '{empty}'; }
  
  return '待处理的对象';
}










