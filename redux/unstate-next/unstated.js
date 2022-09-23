import React from 'react'

export function createContainer(useHook) {
  const Context = React.createContext(null)
  function Provider(props){
    let value = useHook(props.initialState)
    return <Context.Provider value={value}>{props.children}</Context.Provider>
  }
  function useContainer(){
    let value = React.useContext(Context)
    return value
  }
  return { Provider, useContainer}
}

