import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { call, takeEvery, put } from './tiny-redux-saga';
import { fetchCNNodeJS } from './api';

const initState = {
  list: [],
  loading: false,
  statusList: []
}

function reducer(state = initState, action) {
  switch (action.type) {
    case 'UPDATE':
      return {
        ...state,
        list: action.payload.list
      }
    case 'CLEAR': 
      return {
        ...state,
        list: []
      }
    case 'UPDATE_STATUS': 
      return {
        ...state,
        loading: action.payload.loading
      }
    case 'UPDATE_LIST_STATUS': 
      return {
        ...state,
        statusList: action.payload.statusList
      }
    default:
      return state  
  }
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

function *saga() {
  yield takeEvery('FEATCH_LIST', function *() {
    try {
      yield put({
        type: 'UPDATE_STATUS',
        payload: {  loading: true }
      })
      yield put({ type: 'CLEAR' })
      const response = yield call(fetchCNNodeJS);
      console.log(response)
      if (response.success == true) { // eslint-disable-line
        yield put({
          type: 'UPDATE',
          payload: { list: response.data }
        })
      } else {
        alert('获取错误')
      }
    } catch(err) {
      alert('获取错误')
    } finally {
      yield put({
        type: 'UPDATE_STATUS',
        payload: { 
          loading: false
        }
      })
    }
  })
}
sagaMiddleware.run(saga);

export default store;