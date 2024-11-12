import { useState } from 'react'
import './index.css'
import Player from './assets/components/Player';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Hello</h1>
      <Player></Player>
    </div>
    
  )
}

export default App
