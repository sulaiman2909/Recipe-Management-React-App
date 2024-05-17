import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Grid, IconButton } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import RecipeForm, { RecipeFormValues } from './RecipeForm'

const style = {
  position: 'relative' as const,
  justifyContent: 'center',
  alignItems: 'center',
  outline: 'none',
  height: '100%',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  overflow: 'auto',
  
}

interface IProps {
  open: boolean
  mode: string
  setOpen: (open: boolean) => void
  setMode: (mode: string) => void
}

export default function FormModal({ open, mode, setOpen, setMode }: IProps) {
  console.log('Check Modal', mode)

  const [selectedRecipe, setSelectedRecipe] = React.useState<RecipeFormValues | null>(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Grid container my={5} textAlign='center'>
      <Grid item xs={12}>
        <Button
          variant='contained'
          onClick={() => {
            handleOpen()
            setMode('add')
            setSelectedRecipe(null)
          }}
        >
          Add your Recipe
        </Button>
      </Grid>
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box style={style}>
          <IconButton sx={{ position: 'absolute', top: 80, right: 365 }} size='large' onClick={handleClose}>
            <HighlightOffIcon />
          </IconButton>
          <RecipeForm mode={mode} selectedRecipe={selectedRecipe} />
        </Box>
      </Modal>
    </Grid>
  )
}
