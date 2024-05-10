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
import TextField from '@mui/material/TextField'

import { HeaderWrapper } from './HeaderWrapper'
import {
  UpperStyledToolbar,
  MiddleStyledToolbar,
  LowerStyledToolbar,
} from './StyledToolbar'
import { Logo } from '../Images/Logo'
import { LogoWrapper } from './LogoWrapper'
import { MenuWrapper } from './MenuWrapper'
import { ContrastInput } from './ContrastInput'

const pages = ['Inicio', 'Instrumentos', 'Acerca de', 'Contáctanos']
const settings = ['Crear Cuenta', 'Iniciar sesión']

export const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
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
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </MenuWrapper>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  padding: '0 .6rem',
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <LogoWrapper variant="h5" noWrap component="a" href="">
            <Logo />
          </LogoWrapper>
        </UpperStyledToolbar>
        <MiddleStyledToolbar>
          <Box
            sx={{
              flexGrow: 0,
              padding: '.5rem .5rem',
              display: { xs: 'none', md: 'block' },
            }}
          >
            <Tooltip title="Crear cuenta">
              <Button
                onClick={handleOpenUserMenu}
                variant="contained"
                sx={{ borderRadius: '1rem' }}
              >
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
              display: { xs: 'none', md: 'block' },
            }}
          >
            <Tooltip title="Iniciar sesión">
              <Button
                onClick={handleOpenUserMenu}
                variant="contained"
                sx={{ borderRadius: '1rem' }}
              >
                <Typography textAlign="center" sx={{ fontWeight: 'bold' }}>
                  Iniciar sesión
                </Typography>
              </Button>
            </Tooltip>
          </Box>
        </MiddleStyledToolbar>
        <LowerStyledToolbar>
          <ContrastInput label="Encuentra tu instrumento favorito" />
        </LowerStyledToolbar>
      </Container>
    </HeaderWrapper>
  )
}
