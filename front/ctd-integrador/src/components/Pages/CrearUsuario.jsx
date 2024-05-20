import React from 'react'
import MainCrearUsuario from '../common/crearUsuario/MainCrearUsuario'
import BoxLogoSuperior from '../common/crearUsuario/BoxLogoSuperior'
import {Logo} from '../Images/Logo'
import NewUser from '../Form/formCrearUsuario/NewUser'
import BoxFormUnder from '../common/crearUsuario/BoxFormUnder'
import Login from '../Form/formCrearUsuario/Login'
export const CrearUsuario = () => {
  return (
    <MainCrearUsuario>

        <BoxLogoSuperior>
              <Logo/>
        </BoxLogoSuperior>
        <BoxFormUnder>
              
              {/* <NewUser/> */}

              <Login/>

        </BoxFormUnder>
     
    </MainCrearUsuario>
  )
}
export default CrearUsuario