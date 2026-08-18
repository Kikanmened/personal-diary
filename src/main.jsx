import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import EntriesState from './context/EntriesState.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EntriesState>
      <App />
    </EntriesState>
  </StrictMode>,
)
