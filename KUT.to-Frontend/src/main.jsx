import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ContextProvider } from './api/ContextApi.jsx'
import { BrowserRouter } from 'react-router-dom'
import { getApps } from './Utils/helper.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <BrowserRouter>
          {getApps()}
        </BrowserRouter>
      </ContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
