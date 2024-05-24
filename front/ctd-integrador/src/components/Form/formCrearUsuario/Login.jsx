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
import { CustomButton, InputCustom } from './CustomComponents'
import * as Yup from "yup"
import { useFormik } from "formik"
import {UsersApi} from '../../../api/users'
import swal from 'sweetalert';
import loginValidationSchema from './LoginValidation'
import {useNavigate} from 'react-router-dom'

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
      }
    
    }))

 

const Login = ({theme, onSwitch}) => {
const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Llama a la función de autenticación aquí
        const response = await UsersApi.loginUser(values);
        // Si la autenticación es exitosa, muestra la alerta
        if(response.success) {
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
        }
        swal('¡Inicio de sesión exitoso!', 'Has iniciado sesion correctamente');
        navigate('/')
      } catch (error) {
        // Si ocurre un error, muestra una alerta de error
        swal('Error al iniciar sesión', error.message, 'error');
      } finally {
        // Establece isSubmitting en false para permitir que el formulario se envíe nuevamente
        setSubmitting(false);
      }
    },

  // const initialFormData = {
  //   email: '',
  //   password: ''
  // }

  // const initialErrorState = {
  //   email: '',
  //   password: ''
  // }

  // const [formData, setFormData] = useState(initialFormData)
  // const [errors, setErrors] = useState(initialErrorState)

  // const handleChange = (event) => {
  //   const { name, value } = event.target
  //   setFormData({ ...formData, [name]: value })
  //   setErrors({ ...errors, [name]: '' })
  // }

  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   let formIsValid = true
  //   let newErrors = { ...initialErrorState }
  //   if (!formData.email) {
  //     newErrors.email = 'El email es requerido'
  //     formIsValid = false
  //   }
  //   if (!formData.password) {
  //     newErrors.password = 'La contraseña es requerida'
  //     formIsValid = false
  //   }
  //   if (!formIsValid) {
  //     setErrors(newErrors)
  //   } else {
  //     console.log(formData)
  //     // Aquí puedes enviar los datos del formulario a través de una función prop o realizar otras acciones
  //   }

    
  // const handleSwitch = () => {
  //   e.preventDefault();
  //   onSwitch();
  // };


  })

  return (
    <form onSubmit={formik.handleSubmit}>
    <ContainerForm>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          padding: 3,
          width: { md: '40%', xs: '70%' },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'light' }}>
          Iniciar Sesión
        </Typography>

        <Grid sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <FormControl fullWidth margin="normal">
            <InputCustom
              placeholder="Email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              color="primary"
              errorMessage={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputCustom
              placeholder="Password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              color="primary"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </FormControl>
        </Grid>
        <ContainerBottom>
          <CustomButton variant="contained" color="primary" type="submit" disabled={formik.isSubmitting}>
            Iniciar Sesión
          </CustomButton>
          <Link href="#" underline="always" sx={{ color: 'white', marginTop: '10px' }} onClick={onSwitch}>
            {'¿No tienes una cuenta? Regístrate'}
          </Link>
        </ContainerBottom>
      </Grid>
    </ContainerForm>
  </form>
);
}

export default Login
