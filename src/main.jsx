import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./reset.css";
import './index.css';
import AuthWrapper from './Auth/AuthWrapper.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthWrapper />
  </StrictMode>,
)
