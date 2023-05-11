import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import router from './Routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './providers/AuthProvider'



ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='max-w-7xl mx-auto'>
    <AuthProvider>
      <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
      </React.StrictMode>,
    </AuthProvider>
  </div>
)
