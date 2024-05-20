import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  Grid,

} from '@mui/material'
import Link from '@mui/material/Link'
import { styled } from '@mui/material/styles'

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

 

const Login = ({theme, onSwitch}) => {
  const initialFormData = {
    email: '',
    password: ''
  }

  const initialErrorState = {
    email: '',
    password: ''
  }

  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState(initialErrorState)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let formIsValid = true
    let newErrors = { ...initialErrorState }
    if (!formData.email) {
      newErrors.email = 'El email es requerido'
      formIsValid = false
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
      formIsValid = false
    }
    if (!formIsValid) {
      setErrors(newErrors)
    } else {
      console.log(formData)
      // Aquí puedes enviar los datos del formulario a través de una función prop o realizar otras acciones
    }

    
  const handleSwitch = () => {
    e.preventDefault();
    onSwitch();
  };


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
            width:{md:'40%',xs:'70%'} ,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent:'center',
            gap: '20px',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'light' }}>
            Iniciar Sesion
          </Typography>

          <Grid sx={{ width: '100%', display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
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
          </Grid>
          <ContainerBottom>
            <Button variant="contained" color="primary" type="submit">
              Inciar Sesion
            </Button>
            <Link
              href="#"
              underline="always"
              sx={{ color: 'white', marginTop: '10px' }}
              onClick={onSwitch}
            >
              {'Todavia no tengo una cuenta'}
            </Link>
          </ContainerBottom>
        </Grid>
      </ContainerForm>
    </form>
  )
}

export default Login
