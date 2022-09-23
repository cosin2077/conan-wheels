import React, { useState } from "react"
import { render } from "react-dom"
import { Child } from './Child'
import { Counter } from './store'


function CounterDisplay() {
  let counter = Counter.useContainer()
  return (
    <div>
      <button onClick={counter.decrement}>-</button>
      <span style={{margin: 10}}>{counter.count}</span>
      <button onClick={counter.increment}>+</button>
      <button onClick={counter.asyncIncrement}>async+</button>
    </div>
  )
}

function App() {
  return (
    <Counter.Provider initialState={2}>
      <div>
        <div>
          <CounterDisplay />
        </div>
        <Child />
      </div>
    </Counter.Provider>
  )
}

render(<App />, document.querySelector(".app"))