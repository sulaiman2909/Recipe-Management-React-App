import { Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'

const SearchButton = () => {
  return (
    <>
    <Button style={{margin:15, width:120}} variant="contained" startIcon={<SearchIcon />}>Search</Button>
    </>
  )
}

export default SearchButton