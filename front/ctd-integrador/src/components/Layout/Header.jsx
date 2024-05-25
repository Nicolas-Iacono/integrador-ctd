import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import { Divider } from '@mui/material'

import { HeaderWrapper } from './HeaderWrapper'
import {
  UpperStyledToolbar,
  MiddleStyledToolbar,
  LowerStyledToolbar
} from './StyledToolbar'
import { Logo } from '../Images/Logo'
import { LogoWrapper } from './LogoWrapper'
import { MenuWrapper } from './MenuWrapper'
import { ContrastInput } from './ContrastInput'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../utils/context/AuthGlobal'
import { useHeaderVisibility } from '../utils/context/HeaderVisibilityGlobal'

import '../styles/header.styles.css'
import background from '../../assets/background.svg'

const pages = [
  { to: '/', text: 'Inicio' },
  { to: '/instruments', text: 'Instrumentos' },
  { to: '/about', text: 'Acerca de' },
  { to: '/contact', text: 'Contáctanos' }
]
const settings = ['Crear Cuenta', 'Iniciar sesión']

export const Header = () => {
  const [prevScroll, setPrevScroll] = useState(0)
  const [visible, setVisible] = useState(true)
  const [isMenuOpen, setIsMenuopen] = useState(false)
  const [anchorElNav, setAnchorElNav] = useState(null)
  const { authGlobal, setAuthGlobal, user, setUser } = useAuthContext()
  const { toggleHeaderVisibility } = useHeaderVisibility()
  const { pathname } = useLocation()
  const showButtonsAndSearch = pathname === '/'
  const navigate = useNavigate()

  const navigationTo = (location) => {
    navigate(location)
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
    setIsMenuopen(!isMenuOpen)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = (event) => {
    setIsMenuopen(!isMenuOpen)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setAuthGlobal(false)
    setUser(undefined)
    console.log('Estado de autenticación después de cerrar sesión:', authGlobal) // Agrega un console.log para verificar el estado después de cerrar sesión
    navigationTo('/autentificacion')
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      const isHeaderVisible = prevScroll > currentScroll
      setVisible(
        (prevScroll > currentScroll && prevScroll - currentScroll > 70) ||
          currentScroll < 10
      )
      toggleHeaderVisibility(isHeaderVisible)
      setPrevScroll(currentScroll)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScroll, toggleHeaderVisibility])

  return (
    <HeaderWrapper
      backgroundImageUrl={background}
      sx={{ transition: 'top 1.2s', top: visible ? '0' : '-300px' }}
    >
      <Container maxWidth="xl">
        <UpperStyledToolbar disableGutters>
          <MenuWrapper>
            <IconButton
              size="large"
              aria-label="Menu navegación"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              {authGlobal ? (
                <Avatar
                  sx={{
                    height: '2.5rem !important',
                    width: '2.5rem !important'
                  }}
                >
                  {user && user.avatar}
                </Avatar>
              ) : (
                <MenuIcon sx={{ fill: 'white' }} fontSize="large" />
              )}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              anchorEl={anchorElNav}
              keepMounted
              open={isMenuOpen}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={`menu-nav-${index}`}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">
                    <Link to={page.to} className="option-link">
                      {page.text}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
              {authGlobal ? (
                <>
                  <Divider
                    sx={{
                      width: '80%',
                      marginLeft: 'auto',
                      marginRight: 'auto'
                    }}
                  />
                  <MenuItem key={`menu-nav-close-session`} onClick={logOut}>
                    <Typography textAlign="center">Cerrar sesión</Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <Divider
                    sx={{
                      width: '80%',
                      marginLeft: 'auto',
                      marginRight: 'auto'
                    }}
                  />
                  <MenuItem
                    key={`menu-nav-close-session`}
                    onClick={() => navigationTo('/autentificacion')}
                  >
                    <Typography textAlign="center">Iniciar sesión</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </MenuWrapper>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={`menu-option-${index}`}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  padding: '0 .6rem'
                }}
              >
                <Link to={page.to} className="nav-link">
                  {page.text}
                </Link>
              </Button>
            ))}
          </Box>
          <LogoWrapper variant="h5" noWrap component="a" href="">
            <Logo />
          </LogoWrapper>
        </UpperStyledToolbar>
        <MiddleStyledToolbar
          sx={{ display: `${showButtonsAndSearch ? 'flex' : 'none'}` }}
        >
          <Box
            sx={{
              flexGrow: 0,
              padding: '.5rem',
              display: { xs: 'none', md: 'block' }
            }}
          ></Box>
          <Box
            sx={{
              flexGrow: 0,
              padding: '.5rem',
              display: { xs: 'none', md: 'block' }
            }}
          >
            {authGlobal ? (
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <Tooltip title="Cerrar sesión">
                  <Chip
                    avatar={
                      <Avatar
                        sx={{
                          height: '2rem !important',
                          width: '2rem !important'
                        }}
                      >
                        {user && user.avatar}
                      </Avatar>
                    }
                    label="Cerrar sesión"
                    color="primary"
                    sx={{
                      borderRadius: '1rem',
                      height: '2.5rem'
                    }}
                    onClick={logOut}
                  />
                </Tooltip>
              </IconButton>
            ) : (
              <Tooltip title="Iniciar sesión">
                <Button
                  variant="contained"
                  sx={{ borderRadius: '1rem', padding: '.5rem .5rem' }}
                  onClick={() => navigationTo('/autentificacion')}
                >
                  <Typography textAlign="center" sx={{ fontWeight: 'bold' }}>
                    Iniciar sesión
                  </Typography>
                </Button>
              </Tooltip>
            )}
          </Box>
        </MiddleStyledToolbar>
        <LowerStyledToolbar
          sx={{ display: `${showButtonsAndSearch ? 'flex' : 'none'}` }}
        >
          <ContrastInput label="Encuentra tu instrumento favorito" />
        </LowerStyledToolbar>
      </Container>
    </HeaderWrapper>
  )
}
