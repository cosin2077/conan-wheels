import React, { Component } from 'react';
import { connect } from 'react-redux';
// import proptypes from 'proptypes';
const state = {
  a:1,
  b:1,
}
const Context = React.createContext(state)

class App extends Component {
  // static contextTypes = {
  //   store: proptypes.object.isRequired
  // }
  // react-redux 5 以下版本 使用的是原始Context API

  update = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'FEATCH_LIST'
    })
  }
  componentDidMount(){
    this.props.dispatch({
      type: 'FEATCH_LIST'
    })
  }
  clear = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'CLEAR'
    })
  }
  toggleDetail = (idx) => {
    const { dispatch, statusList = [] } = this.props
    let newList = [...statusList]
    newList[idx] = !newList[idx]
    console.log(newList)
    dispatch({
      type: 'UPDATE_LIST_STATUS',
      payload: {
        statusList: newList
      }
    })
  }
  render() {
    const { list = [], loading, statusList = [] } = this.props;
    const { update, clear } = this;
    console.log(this.props)
    return (
      <div  className="item-container">
        <p>
          <button style={{marginRight: "20px"}} onClick={update}>更新</button>
          <button onClick={clear}>清除</button>
        </p>
        {
          loading ? 'loading...': null
        }
        {/* {
          <Context.Provider value={state}>
            <Context.Consumer>
              {(context)=>{
                return context.a + context.b
              }}
            </Context.Consumer>
          </Context.Provider>
        } */}
        <ul>
          {
            list.map((item, idx) => <li key={idx}>
              <p className="title"> <strong>{item.title}</strong>
              <span onClick={this.toggleDetail.bind(this,idx)}>
                {
                  !statusList[idx]?'更多↓↓':'收起↑↑'
                }
              </span>
              <span title={item.visit_count}>
              👁 {item.visit_count}
              </span>
              <span title={item.reply_count}>
              💬 {item.reply_count}
              </span>
              <span>
                <a href={`https://cnodejs.org/topic/${item.id}`} target="_blank">🔗</a>
              </span>
              </p>
              {
                statusList[idx]? 
                <div className="content" dangerouslySetInnerHTML={{__html:item.content}}></div> : null
              }
            </li>)
          } 
        </ul>
      </div>
    );
  }
}

export default connect(state => ({
  list: state.list,
  loading: state.loading,
  statusList: state.statusList,
}))(App);
