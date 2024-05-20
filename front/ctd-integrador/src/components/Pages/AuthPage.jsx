import React, { useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Login from '../Form/formCrearUsuario/Login'
import '../styles/transitions.css'
import MainCrearUsuario from '../common/crearUsuario/MainCrearUsuario'
import BoxLogoSuperior from '../common/crearUsuario/BoxLogoSuperior'
import { Logo } from '../Images/Logo'
import NewUser from '../Form/formCrearUsuario/NewUser'
import BoxFormUnder from '../common/crearUsuario/BoxFormUnder'
import { useNavigate, Link } from 'react-router-dom'
const AuthPage = () => {
  const navigate = useNavigate()

  const [showLogin, setShowLogin] = useState(true)
  const handleSwitch = (e) => {
    e.preventDefault()
    setShowLogin(!showLogin)
  }

  const homeNavigate = () => {
    navigate('/')
  }

  return (
    <MainCrearUsuario>
      <BoxLogoSuperior>
        <Link to='/' onClick={homeNavigate}>
          <Logo />
        </Link>
      </BoxLogoSuperior>
      <TransitionGroup>
        <CSSTransition
          key={showLogin ? 'Login' : 'NewUser'}
          timeout={500}
          classNames="fade"
        >
          <BoxFormUnder className="auth-container">
            {showLogin ? (
              <Login onSwitch={handleSwitch} />
            ) : (
              <NewUser onSwitch={handleSwitch} />
            )}
          </BoxFormUnder>
        </CSSTransition>
      </TransitionGroup>
    </MainCrearUsuario>
  )
}

export default AuthPage
