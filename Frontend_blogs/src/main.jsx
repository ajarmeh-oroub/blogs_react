import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ContextProvider } from './contexts/ContextProvider.jsx';
import App from './App.jsx';
import { RouterProvider } from 'react-router-dom';
import router from './router'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
    </BrowserRouter>
  </StrictMode>
);
