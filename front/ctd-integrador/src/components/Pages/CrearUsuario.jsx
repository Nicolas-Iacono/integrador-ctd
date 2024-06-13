import React from 'react'
import { Box, Typography } from '@mui/material'
import { MainCrearUsuario } from '../common/crearUsuario/MainCrearUsuario'
import BoxLogoSuperior from '../common/crearUsuario/BoxLogoSuperior'
import { Logo } from '../Images/Logo'
import NewUser from '../Form/formUsuario/NewUser'
import BoxFormUnder from '../common/crearUsuario/BoxFormUnder'
import { useAuthContext } from '../utils/context/AuthGlobal'

export const CrearUsuario = () => {
  const { isUserAdmin } = useAuthContext()

  return (
    <MainCrearUsuario>
      <Box
        sx={{
          display: { xs: isUserAdmin ? 'none' : 'inherit', lg: 'inherit' }
        }}
      >
        <BoxLogoSuperior>
          <Logo />
        </BoxLogoSuperior>
        <BoxFormUnder>
          <NewUser />
        </BoxFormUnder>
      </Box>
      <Box
        sx={{
          display: { xs: 'flex', lg: 'none' },
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh'
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="h6"
          textAlign="center"
          sx={{
            paddingTop: 30,
            fontWeight: 'bold'
          }}
        >
          Funcionalidad no disponible en esta resolución
        </Typography>
      </Box>
    </MainCrearUsuario>
  )
}
export default CrearUsuario
