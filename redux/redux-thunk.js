export const reduxThunk = ({dispatch,getState}) => next => action => {
  window.debugMiddleware && console.black(`redux-thunk: next`,next)
  window.debugMiddleware && console.black(`redux-thunk: action`,action)
  if(typeof action === 'function'){
    return action(dispatch,getState)
  }
  return next(action)
} 
export const reduxLogger = ({dispatch,getState}) => next => action => {
  window.debugMiddleware && console.red('logger: next: ', next)
  window.debugMiddleware && console.red('logger: dispatch: ', dispatch)
  window.debugMiddleware && console.red(`logger: action:${action.type? action.type: action } start:`,getState())
  next(action)
  window.debugMiddleware && console.red(`logger: action:${action.type? action.type: action } end:`,getState())
  return action
}