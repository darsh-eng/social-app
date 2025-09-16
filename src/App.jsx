import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import Login from './components/Login/Login'
import Notfound from './components/Notfound/Notfound'
import Register from './components/Register/Register'
import UserContextProvider from './context/userContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import PostContextProvider from './context/PostContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Postdetails from './components/Postdetails/Postdetails'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {path:"" , element:<Layout/> , children:[
      {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:"profile",element:<ProtectedRoute><Profile/></ProtectedRoute>},
      {path:"postdetails/:id",element:<ProtectedRoute><Postdetails/></ProtectedRoute>},
      {path:"register",element:<Register/>},
      {path:"login",element:<Login/>},
      {path:"*",element:<Notfound/>},
    ] }
  ])
  return (
    <>
    <Toaster position="top-center" />
      <UserContextProvider>
        <PostContextProvider>
          <QueryClientProvider client={queryClient}>
              <RouterProvider router={router}>
              </RouterProvider>
          </QueryClientProvider>
        </PostContextProvider>
      </UserContextProvider>
    </>
  )
}

export default App
