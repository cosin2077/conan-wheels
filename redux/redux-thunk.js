export const reduxThunk = ({dispatch,getState}) => next => action => {
  console.log(`redux-thunk: next`,next)
  console.log(`redux-thunk: action`,action)
  if(typeof action === 'function'){
    return action(dispatch,getState)
  }
  return next(action)
} 
