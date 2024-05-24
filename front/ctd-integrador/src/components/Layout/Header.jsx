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
import { useHeaderVisibility } from '../utils/context/HeaderVisibilityGlobal'
import background from '../../assets/background.svg'
import '../styles/header.styles.css'
import { useAuthContext } from '../utils/context/AuthGlobal'

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
  const { toggleHeaderVisibility } = useHeaderVisibility()
  const [isMenuOpen, setIsMenuopen] = useState(false)
  const [anchorElNav, setAnchorElNav] = useState(null)
  const { pathname } = useLocation()
  const showButtonsAndSearch = pathname === '/'
  const navigate = useNavigate()
  const [authGlobal, setAuthGlobal] = useState(false)
  const {toggleAuthGlobal} = useAuthContext();


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
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthGlobal(false);
    console.log('Estado de autenticación después de cerrar sesión:', authGlobal); // Agrega un console.log para verificar el estado después de cerrar sesión
    navigationTo('/autentificacion');
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setAuthGlobal(true);
      console.log('Estado de autenticación al cargar el componente:', authGlobal); // Agrega un console.log para verificar el estado al cargar el componente
    }
  }, []);



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
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ fill: 'white' }} fontSize="large" />
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
            {
              authGlobal ? (
                <Tooltip title="Cerrar sesión">
                <Button
                  variant="contained"
                  sx={{ borderRadius: '1rem', padding: '.5rem .5rem' }}
                  onClick={logOut}
                >
                  <Typography textAlign="center" sx={{ fontWeight: 'bold' }}>
                    Cerrar sesión
                  </Typography>
                </Button>
              </Tooltip>
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

              
              )
            }
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
