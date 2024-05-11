import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'

export const HeaderWrapper = styled(AppBar)(({ theme }) => ({
  display: 'flex',
  height: 130,
  position: 'fixed',
  backgroundImage: 'url("/src/assets/background.svg")',
  backgroundSize: 'cover',

  [theme.breakpoints.up('md')]: {
    height: 300,
  },
}))
