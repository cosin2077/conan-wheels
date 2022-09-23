function compose(middleware){
  if(!Array.isArray(middleware)) return new Error('middleware must be an array!')

  return function(context,next){
    function dispatch(i){
      let fn = middleware[i]
      if(i === middleware.length) fn = next
      if(!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return dispatch(0)
  }
}

var middleware = [
  async(ctx,next) => {
    console.log('start 1')
    return 1
    await next()
    console.log('end 1')
  },
  (ctx,next) => {
    console.log('start 2')
    next()
    console.log('end 2')
  },
]
compose(middleware)({},()=>{})