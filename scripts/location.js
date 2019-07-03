
/* Location ---------------------------------------------------------------- */
history.pushState = new Proxy(history.pushState,{
  apply(target,context,args){   
    // console.log('pushState');
    window.dispatchEvent(new Event('pushState'));

    return target.call(context,...args );
  },
});
history.replaceState = new Proxy(history.replaceState,{
  apply(target,context,args){       
    // console.log('replaceState');
    window.dispatchEvent(new Event('replaceState'));

    return target.call(context,...args );
  },
});


