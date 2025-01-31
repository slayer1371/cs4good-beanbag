import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ScoreScreen from './pages/record-score.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ScoreScreen />
  </StrictMode>,
)
