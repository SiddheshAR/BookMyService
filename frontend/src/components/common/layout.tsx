import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'

function Layout({children}) {
  return (
    <div>
        <Navbar/>
            {children}
        <Footer/>
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
            />
    </div>
  )
}

export default Layout