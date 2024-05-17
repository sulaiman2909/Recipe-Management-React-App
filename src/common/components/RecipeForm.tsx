import React, { useEffect, useState } from 'react'
import { Formik, Field, ErrorMessage, FormikHelpers, Form } from 'formik'
import { Grid, Paper, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import * as Yup from 'yup'
import axios from 'axios'

export interface RecipeFormValues {
  id?: number
  recipeName: string
  category?: string
  ingredients: string
  measurement: string
  timeTaken: number
  difficultyLevel: string
  instruction: string
  servingSize: string
  nutritionalInformation: string
  recipeImage?: string
  additionalNotes: string
  categoryId: number
}

const validationSchema = Yup.object().shape({
  recipeName: Yup.string().required('Recipe Name is required'),
  // category: Yup.string().required('Category is required'),
  ingredients: Yup.string().required('Ingredients are required'),
  measurement: Yup.string().required('Measurement is required'),
  timeTaken: Yup.number().required('Time Taken is required'),
  difficultyLevel: Yup.string().required('Difficulty Level is required'),
  instruction: Yup.string().required('Instruction is required'),
  servingSize: Yup.string().required('Serving Size is required'),
  nutritionalInformation: Yup.string().required('Nutritional Information is required'),
  // recipeImage: Yup.mixed().required('Recipe Image is required'),
  additionalNotes: Yup.string(),
})

interface ICategory {
  categoryId: string 
  category: string
}

export const RecipeForm = ({ mode, selectedRecipe }: { mode: string; selectedRecipe: RecipeFormValues | null }) => {
  const [categories, setCategories] = useState<ICategory[]>([] as ICategory[])
 

  const initialValues: RecipeFormValues = {
    recipeName: '',
    category: '',
    ingredients: '',
    measurement: '',
    timeTaken: 0,
    difficultyLevel: '',
    instruction: '',
    servingSize: '',
    nutritionalInformation: '',
    recipeImage: '',
    additionalNotes: '',
    categoryId: 1,
  }
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const handleSubmit = async (values: RecipeFormValues, { resetForm }: { resetForm: () => void }) => {
    alert(JSON.stringify(values))
    console.log('Selected Category', selectedCategory)
    try {
      values.categoryId= Number(values.categoryId)
      axios.post('http://127.0.0.1:3001/recipes', values).then(() => {
        alert('Submitted Succesfully')
      })

      resetForm()
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  useEffect(() => {
    axios
      .get('http://127.0.0.1:3001/categories')
      .then((response) => {
        setCategories(response.data), console.log(response, 'categories')
      })
      .catch((error) => console.log(error))
  }, [])
  return (
    <Grid container justifyContent='center' alignItems='center' mt={10} mb={10}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={4} sx={{ padding: 3 }}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {({ setFieldValue, errors, touched, handleChange, values }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant='h3' fontWeight='bold' mt={2} mb={4}>
                      Recipe Form
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label='Recipe Name:'
                      value={values.recipeName}
                      onChange={handleChange}
                      variant='outlined'
                      type='text'
                      fullWidth
                      id='recipeName'
                      name='recipeName'
                      helperText={touched.recipeName && errors.recipeName}
                      error={touched.recipeName && Boolean(errors.recipeName)}
                      disabled={mode === 'view'}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id='categoryId'>Category Name</InputLabel>
                      <Field
                        as={Select}
                        labelId='categoryId'
                        label='Category Name'
                        id='categoryId'
                        name='categoryId'
                        value={values.categoryId}
                        onChange={handleChange}
                        helperText={touched.categoryId && errors.categoryId}
                        error={touched.categoryId && Boolean(errors.categoryId)}
                        disabled={mode === 'view'}
                      >
                        <MenuItem value={0}>----Select----</MenuItem>
                        {console.log('categories', categories)}
                        {categories.map((category, index) => (
                          <MenuItem key={index} value={category.categoryId}>
                            {category.category}
                          </MenuItem>
                        ))}
                        disabled={mode === 'view'}
                      </Field>
                    </FormControl>
                    {/* <FormControl fullWidth>
                      <InputLabel id='category'>Category Name</InputLabel>
                      <Field
                        as={Select}
                        labelId='category'
                        id='categoryId'
                        name='category'
                        value={selectedCategory}
                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => setSelectedCategory(event.target.value as string)}
                        helperText={touched.category && errors.category}
                        error={touched.category && Boolean(errors.category)}
                      >
                        <MenuItem value=''>----Select----</MenuItem>
                        {db1.json.categories.map((category) => (
                          <MenuItem key={category.categoryId} value={category.category}>
                            {category.category}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl> */}
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label='Ingredients'
                      value={values.ingredients}
                      onChange={handleChange}
                      variant='outlined'
                      type='text'
                      fullWidth
                      id='ingredients'
                      name='ingredients'
                      helperText={touched.ingredients && errors.ingredients}
                      error={touched.ingredients && Boolean(errors.ingredients)}
                      disabled={mode === 'view'}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label='Measurement'
                      value={values.measurement}
                      onChange={handleChange}
                      variant='outlined'
                      type='text'
                      fullWidth
                      id='measurement'
                      name='measurement'
                      helperText={touched.measurement && errors.measurement}
                      error={touched.measurement && Boolean(errors.measurement)}
                      disabled={mode === 'view'}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label='Time Taken'
                      value={values.timeTaken}
                      onChange={handleChange}
                      variant='outlined'
                      type='text'
                      fullWidth
                      id='timeTaken'
                      name='timeTaken'
                      helperText={touched.timeTaken && errors.timeTaken}
                      error={touched.timeTaken && Boolean(errors.timeTaken)}
                      disabled={mode === 'view'}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id='difficultyLevel'>Difficulty Level</InputLabel>
                      <Field
                        as={Select}
                        label='Difficulty Level'
                        labelId='difficultyLevel'
                        id='difficultyLevel'
                        name='difficultyLevel'
                        value={values.difficultyLevel}
                        onChange={handleChange}
                        helperText={touched.timeTaken && errors.timeTaken}
                        error={touched.timeTaken && Boolean(errors.timeTaken)}
                        disabled={mode === 'view'}
                      >
                        <MenuItem value='beginner'>Beginner</MenuItem>
                        <MenuItem value='intermediate'>Intermediate</MenuItem>
                        <MenuItem value='expert'>Expert</MenuItem>
                        disabled={mode === 'view'}
                      </Field>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label='Instructions'
                      value={values.instruction}
                      onChange={handleChange}
                      variant='outlined'
                      type='text'
                      fullWidth
                      id='instruction'
                      name='instruction'
                      helperText={touched.instruction && errors.instruction}
                      error={touched.instruction && Boolean(errors.instruction)}
                      disabled={mode === 'view'}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label='Serving Size'
                      value={values.servingSize}
                      onChange={handleChange}
                      variant='outlined'
                      type='text'
                      fullWidth
                      id='servingSize'
                      name='servingSize'
                      helperText={touched.servingSize && errors.servingSize}
                      error={touched.servingSize && Boolean(errors.servingSize)}
                      disabled={mode === 'view'}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label='Nutritional Information'
                      value={values.nutritionalInformation}
                      onChange={handleChange}
                      variant='outlined'
                      type='text'
                      fullWidth
                      id='nutritionalInformation'
                      name='nutritionalInformation'
                      helperText={touched.nutritionalInformation && errors.nutritionalInformation}
                      error={touched.nutritionalInformation && Boolean(errors.nutritionalInformation)}
                      disabled={mode === 'view'}
                    />
                  </Grid>

                  {/* <Grid item xs={12}>
                    <label htmlFor='recipeImage'>Recipe Image:</label>
                    <Field
                      type='file'
                      id='recipeImage'
                      name='recipeImage'
                      accept='image/*'
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFieldValue('recipeImage', event.currentTarget.files?.[0] || null)}
                    />
                    <ErrorMessage name='recipeImage' component='div' />
                  </Grid> */}

                  <Grid item xs={12}>
                    <TextField
                      label='Additional Notes'
                      value={values.additionalNotes}
                      onChange={handleChange}
                      variant='outlined'
                      type='text'
                      fullWidth
                      id='additionalNotes'
                      name='additionalNotes'
                      helperText={touched.additionalNotes && errors.additionalNotes}
                      error={touched.additionalNotes && Boolean(errors.additionalNotes)}
                      disabled={mode === 'view'}
                    />
                  </Grid>

                  <Grid item xs={12} mt={2}>
                    <Button type='submit' variant='contained' color='primary'>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default RecipeForm