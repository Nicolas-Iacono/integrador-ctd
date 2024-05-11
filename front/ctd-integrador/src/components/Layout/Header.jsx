import { useState } from 'react'
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

import { Link, useLocation } from 'react-router-dom'

import '../styles/header.styles.css'

const pages = [
  { to: '/', text: 'Inicio' },
  { to: '/instruments', text: 'Instrumentos' },
  { to: '/about', text: 'Acerca de' },
  { to: '/contact', text: 'Contáctanos' }
]
const settings = ['Crear Cuenta', 'Iniciar sesión']

export const Header = () => {
  const [isMenuOpen, setIsMenuopen] = useState(false)
  const [anchorElNav, setAnchorElNav] = useState(null)
  const { pathname } = useLocation()
  const showButtonsAndSearch = pathname === '/'

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

  return (
    <HeaderWrapper>
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
              padding: '.5rem .5rem',
              display: { xs: 'none', md: 'block' }
            }}
          >
            <Tooltip title="Crear cuenta">
              <Button variant="contained" sx={{ borderRadius: '1rem' }}>
                <Typography textAlign="center" sx={{ fontWeight: 'bold' }}>
                  Crear cuenta
                </Typography>
              </Button>
            </Tooltip>
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              padding: '.5rem .5rem',
              display: { xs: 'none', md: 'block' }
            }}
          >
            <Tooltip title="Iniciar sesión">
              <Button variant="contained" sx={{ borderRadius: '1rem' }}>
                <Typography textAlign="center" sx={{ fontWeight: 'bold' }}>
                  Iniciar sesión
                </Typography>
              </Button>
            </Tooltip>
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
