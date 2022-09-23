import { createStore, applyMiddleware, combineReducers } from './redux'
import { reduxThunk, reduxLogger } from './redux-thunk'
import './initConsole'
// reducer的组合
// middleware的应用
// dispatch 一个函数？


window.debugMiddleware = true

const reducer = ( state = {count: 0,html: ''}, action) => {
  switch(action.type){
    case "add":
      return {
        ...state,
        count: state.count + action.payload
      }
    case "minus":
      return {
        ...state,
        count: state.count - action.payload
      }
    case 'multiple':
      return {
        ...state,
        count: state.count * action.payload
      }
    case 'divided':
      return {
        ...state,
        count: state.count / action.payload
      }
    case 'html':
      return {
        ...state,
        html: action.payload
      }
    default:
      return state
  }
}
const reducer2 = (state={},action) => {
  return state
}
const reducer3 = (state = { reducer3, count: 3 }, action) => {
  switch(action.type) {
    case 'add':
      return {
        ...state,
        count: state.count + action.payload
      }
    default:
      return state
  }
}

const state = {
  reducer:{
    count: 10,
    html: 'abc'
  },
  reducer2: {
    '666':666
  }
}

const store = createStore(
  // 模块化
  combineReducers({reducer,reducer2}),
  // 不传则用默认
  state,
  // 中间件
  applyMiddleware(reduxThunk,reduxLogger))

const reduxLog = () => console.log(store.getState())

store.dispatch({type:'add',payload: 2})
store.dispatch({type:'add',payload: 3})
store.dispatch({type:'minus',payload: 5})

store.replaceReducer(
  combineReducers({
    reducer,
    reducer2,
    reducer3,
  }))
store.dispatch({type:'add',payload: 4})

reduxLog()

const fetchAction = (url) => 
  dispatch => fetch(url)
              .then(res=>res.text())
              .then(res=>dispatch({ type:'html', payload: res}))
              .catch(console.error)

store.dispatch(fetchAction('/'))
.then(_=>{
  reduxLog()
})