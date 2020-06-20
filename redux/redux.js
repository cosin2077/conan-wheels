function compose (...funcs) {
	if(funcs.length === 0) return arg => arg
	if(funcs.length === 1) return funcs[0]
	return funcs.reduce((x,y)=>(...args) => x(y(...args)))
}
function applyMiddleware (...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = store.dispatch
    const middlewareApi = {
      dispatch,
      getState: store.getState
    }
    const chain = middlewares.map(middleware=>middleware(middlewareApi))
    dispatch = compose(...chain)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}
function createStore (reducer, preState, enhancer) {
  if(enhancer && typeof enhancer === 'function') {
    return enhancer(createStore)(reducer,preState)
  }
  let currentState = preState
  const listeners = []
  const getState = () => currentState
  const subscribe = (fn) => {
    listeners.push(fn)
    return function subscribe() {
      listeners.splice(listeners.indexOf(fn),1)
    }
  }
  const dispatch = (action) => {
    currentState = reducer(currentState,action)
    listeners.forEach(listener=>listener())
    return action
  }
  return {
    subscribe,
    getState,
    dispatch
  }
}

export {
  compose,
  createStore,
  applyMiddleware
}