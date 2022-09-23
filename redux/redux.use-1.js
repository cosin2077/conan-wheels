import { createStore } from './redux'
import './initConsole'

/*createStore 说明
 *@createStore 接受一个reducer, 返回一个store对象, store具有的方法: subscribe, dispatch, getState
 *@param{Object} state 初始化的state
 *@param{Object} action 需要dispatch的action
 *@return {Object} 更新后的state
*/

// state changer
// 传入 action 改变 state
const reducer = (state = { count:0, html:''}, action) => {
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

// 传入reducer 生成 store
// store 提供的方法
// dispatch 触发action
// getState() 获取当前store的state
// subscribe 订阅, 当store进行dispatch的时候, 调用subscribe订阅的函数
const store = createStore(reducer)
const reduxLog = () => console.log(store.getState())

// subscribe 订阅
store.subscribe(reduxLog)

store.dispatch({type:'add', payload: 2})
store.dispatch({type:'add', payload: 3})
store.dispatch({type:'minus',payload: 4})

