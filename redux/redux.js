function compose (...funcs) {
	if(funcs.length === 0) return arg => arg
	if(funcs.length === 1) return funcs[0]
	return funcs.reduce((x,y)=>(...args) => x(y(...args)))
}

function createStore (reducer, preState, enhancer) {
  //TODO
}


export {
  compose
}