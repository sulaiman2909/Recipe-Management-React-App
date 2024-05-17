import React from 'react'
import NavBar from 'common/components/NavBar'
import HomePage from 'pages/Dashboard/HomePage'
import { CssBaseline } from '@mui/material'
import Footer from 'common/components/Footer';

function App() {
  return (
    <>
    <CssBaseline />
      <NavBar />
      <HomePage />
      <Footer/>
    </>
  )
}

export default App
