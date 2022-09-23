import { createStore, compose, applyMiddleware,combineReducers } from './redux'
import 'regenerator-runtime/runtime'

import { reduxLogger } from './redux-thunk'
import { sagaMiddleware } from './redux-saga'
import './initConsole'
const baseUrl = `https://hacker-news.firebaseio.com/v0/topstories.json`
const itemUrl = (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`

const reducer = ( state = {count:0,html:''}, action) => {
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
    default:
      return state
  }
}
const reducer2 = (state={},action) => {
  return state
}

const sageState = (state={},action) => {
  switch(action.type){
    case 'SET_STORIES':
      return {
        ...state,
        stories: action.payload
      }
    case 'ADD_ITEM':
      return {
        ...state,
        items: [
          ...items,
          action.payload
        ]
      }
    default:
      return state
  }
}
const state = {
  reducer:{
    count: 0,
    html: ''
  },
  reducer2: {
    '666':666
  },
  sageState:{
    fetching: false,
    stories: [],
    items:[]
  }
}
function* rootSaga(getState, dispatch, action) {
  switch (action.type) {
    case 'GET_TOP_STORIES':
      yield* getTopStories(dispatch, getState)
      break
    case 'GET_ITEM':
      yield* getItem(dispatch, getState, action)
      break
  }
}
// ... actions.js
function* getItem(dispatch, getState, action) {
  const item = yield fetch(itemUrl(action.payload)).then(res=>res.json())
  yield dispatch({
    type: 'ADD_ITEM',
    payload: stories
  })
}
function* getTopStories(dispatch, getState) {
  // you can also yield thunks
  const stories = yield fetch(baseUrl).then(res=>res.json())
  yield dispatch({
    type: 'SET_STORIES',
    payload: stories
  })
}

const store = createStore(
  combineReducers({reducer,reducer2,sageState}),
  state,
  applyMiddleware(reduxLogger,sagaMiddleware(rootSaga)))

store.dispatch({
  type: 'GET_TOP_STORIES'
})


