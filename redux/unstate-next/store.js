import { useState } from "react"
import { createContainer } from "./unstated"

function useCounter(initialState = 0) {
  let [count, setCount] = useState(initialState)
  let decrement = () => setCount(count - 1)
  let increment = () => setCount(count + 1)
  let asyncIncrement = () => {
    console.log('asyncIncrement')
    setTimeout(()=>{
      setCount(count + 1)
    },2000)
  }
  return { count, decrement, increment, asyncIncrement }
}

export let Counter = createContainer(useCounter)