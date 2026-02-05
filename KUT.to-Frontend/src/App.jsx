import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { getApps } from './Utils/helper'
import { Toaster } from 'react-hot-toast'

function App() {

  const CurrentApp = getApps();

  return (
    <BrowserRouter>
      <CurrentApp />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '10px',
            border: '1px solid #374151',
          },
          success: {
            iconTheme: {
              primary: '#a855f7',
              secondary: '#fff',
            },
          },
        }}
      />
    </BrowserRouter>
  )
}

export default App
