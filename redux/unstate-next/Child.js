import React from 'react'
import { Counter } from './store'

export function Child(){
  let counter = Counter.useContainer()
  return <h2>{counter.count}</h2>
}