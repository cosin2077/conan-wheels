export function sagaMiddleware(saga) {
  // saga must be a generator function
  return ({getState,dispatch}) => next => action => {
    const result = next(action)
    const generator = saga(getState,dispatch,action)
    iterate(generator)
    return result
    function iterate(generator){
      step()
      function step(arg,isError){
        const { value: effect, done } = isError ? generator.throw(arg): generator.next(arg) 
        if(!done) {
          let response 
          if(typeof effect === 'function'){
            response = effect()
          } else if(Array.isArray(effect) && typeof effect[0] === 'function'){
            response = effect[0](...effect.slice(1))
          } else {
            response = dispatch(effect)
          }
          Promise.resolve(response).then(step,err=>step(err,true))
        }
      }
    }
  }
}