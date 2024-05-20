import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  TextField,
  Typography,
  Grid
} from '@mui/material'
import styles from '../styles/crearInstrumento.module.css'
import CategorySelect from './CategorySelect'
import ThemeSelect from './ThemeSelect'

const NewInstrumentForm = () => {
  const initialFormData = {
    idInstrument: '',
    name: '',
    description: '',
    measures: '',
    weight: '',
    rentalPrice: '',
    idCategory: '',
    idTheme: ''
  }

  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Aquí puedes enviar los datos del formulario a través de una función prop o realizar otras acciones
    console.log(formData)
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{ padding: 2, width: '60%', height: '100%', overflow: 'hidden' }}
    >
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ padding: 2, width: '60%', height: '100%' }}
          >
            <Typography variant="h6">Registrar Instrumento</Typography>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Nombre"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                type="text"
                color="primary"
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Descripción"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                type="text"
                color="primary"
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Medidas"
                name="measures"
                onChange={handleChange}
                value={formData.measures}
                type="text"
                color="primary"
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Peso"
                name="weight"
                onChange={handleChange}
                value={formData.weight}
                type="number"
                color="primary"
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Precio"
                name="rentalPrice"
                onChange={handleChange}
                value={formData.rentalPrice}
                type="number"
                color="primary"
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ padding: 2, width: '50%', height: '100%' }}
          >
            <Typography variant="h6">Asignar Categoría</Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel id="category-label">Categoría</InputLabel>
              <CategorySelect onChange={handleChange} />
            </FormControl>
            <Typography variant="h6">Asignar Tema</Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel id="theme-label">Tema</InputLabel>
              <ThemeSelect onChange={handleChange} />
            </FormControl>
          </Grid>
        </Grid>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: '16px'
          }}
        >
          <Button variant="contained" color="primary" type="submit">
            Enviar
          </Button>
        </Box>
      </form>
    </Grid>
  )
}

export default NewInstrumentForm
