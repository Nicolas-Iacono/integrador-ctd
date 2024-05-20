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

const ContainerForm = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
  height:'80vh',
  marginTop: '30px',
  justifyContent: 'center',
  alignItems:'flex-end',
  padding:'0px',

  
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
    },
  
    // [theme.breakpoints.up('md')]: {
    //   paddingTop: 320
    // }
  }))
  const ContainerBottom = styled(Grid)(({ theme }) => ({
     width: '100%',
      height: '100px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
  
    
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
     width: '100%',
     marginLeft: '0px',
      },
    
      // [theme.breakpoints.up('md')]: {
      //   paddingTop: 320
      // }
    }))

 

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
  const initialSuccessState = {
    repeatPassword : ''
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
  const [success, setSuccess] = useState(initialSuccessState)
  
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: '', general: '' })


      if(name === 'repeatPassword' && formData.password === value ){
        setSuccess({ ...success, repeatPassword:'Las password son identicas'})
      }else{
        setSuccess({ ...success, repeatPassword: '' });
      }
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
   <ContainerForm>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            padding: 3,
            width:{md:'40%',xs:'70%'},
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent:'center',
            gap: '20px',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'light' }}>
            Crear una cuenta
          </Typography>

          <Grid sx={{ width: '100%',display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center' }}>
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
                helperText={errors.password  || (success.repeatPassword  &&<span style={{ color: 'green'}}>{success.repeatPassword}</span>)}
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
                helperText={errors.repeatPassword  || (success.repeatPassword  &&<span style={{ color: 'green' }}>{success.repeatPassword}</span>)}
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
          <ContainerBottom>
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
          </ContainerBottom>
        </Grid>
   </ContainerForm>
      
    </form>
  )
}

export default NewUser
