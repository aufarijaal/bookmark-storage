import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/index.css'
import { CommonProvider } from '@/context/commonContext.tsx'
import App from '@/App'
import { AuthProvider } from '@/context/authContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <CommonProvider>
        <App />
      </CommonProvider>
    </AuthProvider>
  </React.StrictMode>
)
