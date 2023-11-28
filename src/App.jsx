import { useState } from 'react'
import {useRoutes } from "react-router-dom"
import { Index } from './components/routers/Index'
function App() {
    const Router=useRoutes(Index())
  return Router
}

export default App
