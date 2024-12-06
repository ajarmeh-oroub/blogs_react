import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './router'
import { ContextProvider } from './contexts/ContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
    <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>,
)
