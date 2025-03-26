import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PopXApp from './components/PopXApp'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PopXApp/>
  </StrictMode>,
)
