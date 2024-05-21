import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  Grid
} from '@mui/material'
import CategorySelect from './CategorySelect'
import ThemeSelect from './ThemeSelect'

import '../styles/crearInstrumento.styles.css'

const InstrumentForm = ({ initialFormData, onSubmit }) => {
  const [formData, setFormData] = useState({ ...initialFormData })
  const [submitData, setSubmitData] = useState(false)
  const title = formData.idInstrument
    ? 'Editar Instrumento'
    : 'Registrar Instrumento'

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = {
      idInstrument: formData.idInstrument,
      name: formData.name,
      description: formData.description,
      measures: formData.measures,
      weight: formData.weight,
      rentalPrice: formData.rentalPrice,
      idCategory: formData.idCategory,
      idTheme: formData.idTheme,
      imageUrls: formData.imageUrlsText.split(/[\n,\s]/)
    }

    setFormData(data)
    setSubmitData(true)
  }

  useEffect(() => {
    if (!submitData) return

    if (typeof onSubmit === 'function') onSubmit(formData)
  }, [submitData])

  return (
    <Grid
      sx={{
        width: '80%',
        border: '3px solid black',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <form onSubmit={handleSubmit} className="formulario">
        <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ padding: 2, width: '60%', height: '100%' }}
          >
            <Typography variant="h6">{title}</Typography>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Nombre"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                type="text"
                color="secondary"
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
                color="secondary"
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Medidas"
                name="measures"
                onChange={handleChange}
                value={formData.measures}
                type="text"
                color="secondary"
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Peso"
                name="weight"
                onChange={handleChange}
                value={formData.weight}
                type="number"
                color="secondary"
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Precio"
                name="rentalPrice"
                onChange={handleChange}
                value={formData.rentalPrice}
                type="number"
                color="secondary"
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
              <CategorySelect
                onChange={handleChange}
                selectedCategoryId={formData?.idCategory}
              />
            </FormControl>
            <Typography variant="h6">Asignar Tema</Typography>
            <FormControl fullWidth margin="normal">
              <ThemeSelect
                onChange={handleChange}
                selectedThemeId={formData?.idTheme}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ padding: 2, width: '100%', height: '100%' }}
        >
          <FormControl fullWidth margin="normal">
            <TextField
              label="Agregue las urls de las imágenes separadas mediante espacios"
              name="imageUrlsText"
              multiline
              rows={5}
              onChange={handleChange}
              value={formData.imageUrlsText}
              color="secondary"
            />
          </FormControl>
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

export default InstrumentForm
