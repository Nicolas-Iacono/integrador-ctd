import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  Grid
} from '@mui/material'
import Link from '@mui/material/Link'
import { styled } from '@mui/material/styles'
import { CustomButton, InputCustom } from './CustomComponents'

import * as Yup from 'yup'
import { useFormik } from 'formik'
import { UsersApi } from '../../../api/users'
import swal from 'sweetalert'
import loginValidationSchema from './LoginValidation'
import { useNavigate } from 'react-router-dom'


const ContainerForm = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
  height: '80vh',
  marginTop: '30px',
  justifyContent: 'center',
  alignItems: 'flex-end',
  padding: '0px',


  [theme.breakpoints.down('md')]: {
    flexDirection: 'row'
  }

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
    marginLeft: '0px'
  }
}))

const Login = ({ theme, onSwitch }) => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''

    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Llama a la función de autenticación aquí

        const response = await UsersApi.loginUser(values)
        console.log('Server response:', response)
        // Si la autenticación es exitosa, muestra la alerta
        if (response && response.token && response.roles) {
          const user = {
            roles: response.roles,
            email: response.email
          }
          localStorage.setItem('user', JSON.stringify(user))
          localStorage.setItem('token', response.token)
          swal(
            '¡Inicio de sesión exitoso!',
            'Has iniciado sesion correctamente'
          )
          setTimeout(() => {
            navigate('/')
          }, 1000)
        } else {
          console.error('Inicio de sesión fallido:', response)
          swal(
            'Error al iniciar sesión',
            response.message || 'Credenciales incorrectas',
            'error'
          )
        }

        // navigate('/')
      } catch (error) {
        // Si ocurre un error, muestra una alerta de error
        console.error('Error durante el inicio de sesión:', error)
        swal(
          'Error al iniciar sesión',
          error.message || 'Ocurrió un error',
          'error'
        )
      } finally {
        // Establece isSubmitting en false para permitir que el formulario se envíe nuevamente
        setSubmitting(false)
      }
    }

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
            gap: '20px'
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'light' }}>
            Iniciar Sesión
          </Typography>

          <Grid
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <FormControl fullWidth margin="normal">
              <InputCustom
                placeholder="Email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                color="primary"
                errorMessage={
                  formik.touched.email && Boolean(formik.errors.email)
                }
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
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </FormControl>
          </Grid>
          <ContainerBottom>
            <CustomButton
              variant="contained"
              color="primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Iniciar Sesión
            </CustomButton>
            <Link
              href="#"
              underline="always"
              sx={{ color: 'white', marginTop: '10px' }}
              onClick={onSwitch}
            >
              {'¿No tienes una cuenta? Regístrate'}
            </Link>
          </ContainerBottom>

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
