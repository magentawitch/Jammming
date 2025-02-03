import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./reset.css"
import AuthWrapper from './Auth/AuthWrapper.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthWrapper />
  </StrictMode>,
)
