import React, { useState, useEffect } from 'react'
import { Typography, Grid, Divider, Button, Paper } from '@mui/material'
import SearchButton from 'common/components/SearchButton'
import FormModal from 'common/components/FormModal'
import axios from 'axios'
import { RecipeFormValues } from 'common/components/RecipeForm'

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeFormValues[]>([]);
  const [recipes, setRecipes] = useState<RecipeFormValues[]>([])
  useEffect(() => {
    const fetchRecipeData = async () => {
      const response = await axios.get('http://127.0.0.1:3000/recipes')
      console.log(response) 
      setRecipes(response.data)
    }

    fetchRecipeData()
  }, [selectedCategory])

  

  const handleDeleteRecipe = async (recipeId: number | undefined) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/recipes/${recipeId}`)
      setRecipes(recipes.filter((recipe) => recipe.id == recipeId))
      console.log('Recipe deleted successfully!')
    } catch (error) {
      console.error('Error deleting recipe:', error)
    }
  }

  const [open, setOpen] = React.useState(false)
  const [mode, setMode] = React.useState('')
  const [selectedRecipe, setSelectedRecipe] = React.useState<RecipeFormValues | null>(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleEditRecipe = (recipe: RecipeFormValues) => {
    console.log('Check Handle')
    handleOpen()
    setMode('edit')
    setSelectedRecipe(recipe)
  }

  const handleViewRecipe = (recipe: RecipeFormValues) => {
    handleOpen()
    setMode('view')
    setSelectedRecipe(recipe)
  }
  return (
    <Grid container>
      <Grid item xs={12} sx={{ backgroundImage: 'url(recipe-background.jpg)', backgroundSize: '100% 100%' }} height='100vh'>
        <Grid item xs={12}>
          <Typography variant='h1' fontSize={90} fontFamily={'Roboto'} sx={{ mt: 10, textAlign: 'center', mr: 10, ml: 10, color: 'white' }}>
            Tantalize Your Taste Buds: Explore an Array of Irresistible Recipes
          </Typography>
        </Grid>
        <Grid sx={{ mt: '60px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <input
            name='searchRecipes'
            placeholder='Search Recipes'
            style={{
              backgroundColor: '#f2f2f2',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '8px 12px',
              fontSize: '16px',
              width: '600px',
            }}
          />
          <SearchButton />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ textAlign: 'center', fontSize: 50, fontWeight: 'bold', mt: 5 }}>Recipes</Typography>
        <Divider variant='middle' />
      </Grid>

      <Grid>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value=''>All</option>
          <option value='Appetizer'>Appetizer</option>
          <option value='Soup'>Soup</option>
          <option value='Salad'>Salad</option>
          <option value='Main Course'>Main Course</option>
          <option value='Pasta'>Pasta</option>
          <option value='Vegetarian'>Vegetarian</option>
        </select>
      </Grid>

      <Grid container sx={{ mt: 2, pr: 4, pl: 4 }}>
        {recipes.length > 0 &&
          filteredRecipes.map((recipe, index) => {
            return (
              <Grid item xs={12} sm={4} key={recipe.id} sx={{ textAlign: 'center', pr: 2, pl: 2, pb: 4 }}>
                <Paper elevation={3}>
                  <img
                    src={recipe.recipeImage ? recipe.recipeImage : 'burger.jpg'}
                    alt='burgers'
                    style={{ width: '100%', height: '450px', borderRadius: '5px' }}
                  />

                  <Typography variant='h6' sx={{ mt: 2, textAlign: 'center', mb: 1, fontWeight: '' }}>
                    {recipe.recipeName}
                  </Typography>

                  <Grid container>
                    <Grid item xs={6}>
                      <Button
                        sx={{ width: '96%', mb: '2%', mr: '1%', ml: '1%' }}
                        variant='contained'
                        onClick={() => {
                          handleEditRecipe(recipe)
                        }}
                      >
                        Update
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        sx={{ width: '96%', mb: '2%', mr: '1%', ml: '1%' }}
                        onClick={() => {
                          handleViewRecipe(recipe)
                        }}
                        variant='contained'
                      >
                        View
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={12}>
                      <Button
                        sx={{ width: '98%', ml: '1%', mr: '1%', mb: '1%' }}
                        variant='outlined'
                        color='error'
                        onClick={() => handleDeleteRecipe(recipe.id)}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            )
          })}
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ textAlign: 'center', fontSize: 50, fontWeight: 'bold', mt: 5 }}>Add Your Recipe Here</Typography>
        <Divider />
        <FormModal open={open} mode={mode} setOpen={setOpen} setMode={setMode} />
      </Grid>
    </Grid>
  )
}
