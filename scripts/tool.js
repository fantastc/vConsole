

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