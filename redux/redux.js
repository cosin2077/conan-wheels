function compose (...funcs) {
	if(funcs.length === 0) return arg => arg
	if(funcs.length === 1) return funcs[0]
	return funcs.reduce((x,y)=>(...args) => x(y(...args)))
}

function combineReducers(reducers) {
	let reducerKeys = Object.keys(reducers)

	return function combination(state = {}, action) {
		let hasChanged = false
		let nextStateMap = {}

		for(let i = 0; i < reducerKeys.length; i++){
			let key = reducerKeys[i]
			let reducer = reducers[key]
			let prevState = state[key]
			let nextState = reducer(prevState,action)
			nextStateMap[key] = nextState
			hasChanged = hasChanged || prevState !== nextState // 一次不同则全不同
		}
		return hasChanged ? nextStateMap : state 
	}
}

function applyMiddleware (...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = store.dispatch
    const middlewareApi = {
      dispatch,
      getState: store.getState
    }
    // 修改了dispatch
    const chain = middlewares.map(middleware=>middleware(middlewareApi))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}

function createStore (reducer, preState, enhancer) {
  if(typeof preState === 'function' && !enhancer){
    enhancer = preState
    preState = undefined // 这里的undefined可以是null吗？
  }
  if(enhancer && typeof enhancer === 'function') {
    return enhancer(createStore)(reducer,preState)
  }
  // core start
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
  // core end
  const replaceReducer = (nextReducer) => {
    if(nextReducer)
      reducer = nextReducer
  }
  const getReducer = () => reducer
  return {
    subscribe,
    getState,
    dispatch,
    replaceReducer,
    getReducer
  }
}

export {
  compose,
  createStore,
  applyMiddleware,
  combineReducers
}