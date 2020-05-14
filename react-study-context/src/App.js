import React from 'react'
import HomePage from './pages/HomePage'
import HomePage2 from './pages/HomePage2'
import HomePage3 from './pages/HomePage3'
import {UseProvider} from './UseContext'

export default function App(){
  const user = {
    name: 'Larry',
    loginedIn: true,
  }
  return (
    <UseProvider value={user}>
      <h1>访问Context</h1>
      <h2>Class中两种方式访问</h2>
      <h3>Style 1</h3>
      <HomePage />
      <h3>Style 2</h3>
      <HomePage2 />
      <h2>Function访问</h2>
      <HomePage3 />
      
    </UseProvider>
  )
}