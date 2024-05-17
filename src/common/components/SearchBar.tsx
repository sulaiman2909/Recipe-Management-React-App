import { TextField, IconButton, InputAdornment, Container, Grid } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'

const SearchBar = () => {
  return (
    <>
      <Grid >
        <input
          name='searchRecipes'
          placeholder='Search Recipes'
          style={{
            backgroundColor: '#f2f2f2',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '8px 12px',
            fontSize: '16px',
            width: '300px',
          }}
        />
      </Grid>
    </>
  )
}

export default SearchBar


