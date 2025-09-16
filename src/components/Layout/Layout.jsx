import React from 'react'
import style from "./Layout.module.css"
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import ScrollToTopButton from '../ScrollTop/ScrollToTopButton'
export default function Layout() {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
      <ScrollToTopButton />
    </>
  )
}
