import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './Providers/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SearchProvider } from './Providers/SearchContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SearchProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster />
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </SearchProvider>
  </React.StrictMode>
);
