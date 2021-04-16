import React from 'react'
import { render } from 'react-dom'
import MainScreen from './vistas/menuprincipal/MainScreen';

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {
  return (
    <>
      <MainScreen />
    </>
  )
}

render(<App />, mainElement)
