import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'

export const HeaderWrapper = styled(AppBar)(
  ({ theme, backgroundImageUrl }) => ({
    display: 'flex',
    height: 130,
    position: 'fixed',
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',

    [theme.breakpoints.up('md')]: {
      height: 300
    }
  })
)
