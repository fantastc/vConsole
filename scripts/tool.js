

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

// 格式化对象 
// {
//   type: 'Object',
//   kvMap: {
//     key1: {
//       type: 'Array',
//       kvMap: {
//         1: '1',
//       },
//     },
//     key2: '123', 
//     key3: {
//       type: 'Element',
//       kvMap: {
//         xx: xxx, 
//       },
//     },
//     key4: { type: 'Element', },
//   },
// }
export function dealObject(obj,valArr){
  let objValArr = [];
  if ( valArr ) { objValArr = valArr }
  
  
  let _kvMap = {};
  for(var key in obj){
    let val = obj[key];
    if ( val===null ) { _kvMap[key] = null; }
    else if (typeof val==='object' ) {
      let idx = objValArr.findIndex( itm=>{ 
        return val===itm  
      } )
      if (idx===-1) { 
        objValArr.push(val); 
        _kvMap[key] = dealObject(val,objValArr);
      }
      else { 
        // _arr1.push({
        //   type: Object.prototype.toString.call(val).slice(8,-1), 
        // })
        _kvMap[key] = {
          // type: Object.prototype.toString.call(val).slice(8,-1)
          type: '循环引用 不展示', 
        }
        continue; 
      }
    }
    else {
      _kvMap[key] = val;
    }
  };
  
  return {
    type: Object.prototype.toString.call(obj).slice(8,-1),
    kvMap: _kvMap,
  };
}
















