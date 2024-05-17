import React from 'react'
import { Typography } from '@mui/material'

const HomePageHead = () => {
  return (
    <div className='HomePage-head'>
      <Typography variant='h1' fontSize={75} fontFamily={'Roboto'} sx={{ ml:20, mr:20, color: 'white' }}>
        Tantalize Your Taste Buds: Explore an Array of Irresistible Recipes
      </Typography>
      
    </div>
  )
}

export default HomePageHead
