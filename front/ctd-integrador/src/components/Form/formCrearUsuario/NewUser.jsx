import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel
} from '@mui/material'
import Link from '@mui/material/Link'

import { styled } from '@mui/material/styles'
import { blue } from '@mui/material/colors'

const NewUser = () => {
  const initialFormData = {
    name: '',
    username: '',
    email: '',
    password: '',
    repeatPassword: ''
  }

  const initialErrorState = {
    name: '',
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    general: ''
  }

  const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    color: blue[100],
    '&.Mui-checked': {
      color: blue[50]
    },
    '& .MuiSvgIcon-root': {
      fontSize: 24
    }
  }))

  const [formData, setFormData] = useState(initialFormData)
  const [accept, setAccept] = useState(false)
  const [errors, setErrors] = useState(initialErrorState)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: '', general: '' })
  }

  const handleCheckBoxChange = (e) => {
    setAccept(e.target.checked)
    if (e.target.checked) {
      setErrors({ ...errors, general: '' })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let formIsValid = true
    let newErrors = { ...initialErrorState }

    if (!formData.name) {
      newErrors.name = 'El nombre es requerido'
      formIsValid = false
    }
    if (!formData.username) {
      newErrors.username = 'El apellido es requerido'
      formIsValid = false
    }
    if (!formData.email) {
      newErrors.email = 'El email es requerido'
      formIsValid = false
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
      formIsValid = false
    }
    if (!formData.repeatPassword) {
      newErrors.repeatPassword = 'Repetir la contraseña es requerido'
      formIsValid = false
    } else if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = 'Las contraseñas no coinciden'
      formIsValid = false
    }
    if (!accept) {
      newErrors.general = 'Debe aceptar los términos y condiciones'
      formIsValid = false
    }

    if (!formIsValid) {
      setErrors(newErrors)
    } else {
      console.log(formData)
      // Aquí puedes enviar los datos del formulario a través de una función prop o realizar otras acciones
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100vw',
          marginTop: '30px',
          justifyContent: 'flex-end'
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            padding: 3,
            width: '45%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            backgroundColor:'red'
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'light' }}>
            Crear una cuenta
          </Typography>

          <Grid sx={{ width: '80%', marginLeft: '100px' }}>
            <FormControl fullWidth margin="normal">
              <TextField
                placeholder="Nombre"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                type="text"
                color="primary"
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                placeholder="Apellido"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                type="text"
                color="primary"
                error={Boolean(errors.username)}
                helperText={errors.username}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                type="email"
                color="primary"
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                type="password"
                color="primary"
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                placeholder="Repeat password"
                name="repeatPassword"
                onChange={handleChange}
                value={formData.repeatPassword}
                type="password"
                color="primary"
                error={Boolean(errors.repeatPassword)}
                helperText={errors.repeatPassword}
              />
            </FormControl>
            <FormControlLabel
              control={
                <CustomCheckbox
                  checked={accept}
                  onChange={handleCheckBoxChange}
                />
              }
              label="Acepto los términos y condiciones del servicio"
              sx={{ color: blue[50], marginTop: '30px' }}
            />
            {errors.general && (
              <Typography color="error" sx={{ marginTop: '10px' }}>
                {errors.general}
              </Typography>
            )}
          </Grid>
          <Box
            sx={{
              width: '80%',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '100px',
              flexDirection: 'column'
            }}
          >
            <Button variant="contained" color="primary" type="submit">
              Registrar
            </Button>
            <Link
              href="#"
              underline="always"
              sx={{ color: 'white', marginTop: '10px' }}
            >
              {'Ya tengo una cuenta'}
            </Link>
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}

export default NewUser
