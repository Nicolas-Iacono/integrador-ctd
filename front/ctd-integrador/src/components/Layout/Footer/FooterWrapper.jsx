import {styled} from '@mui/material/styles'
import { Grid } from '@mui/material'

export const FooterWrapper = styled(Grid)(({ theme }) => ({
  display: 'flex',
  height: 100,
  backgroundImage: 'url("/src/assets/backgroundFooter.svg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center bottom',
  backgroundRepeat: 'no-repeat',
  justifyContent:'flex-start',
  alignItems:"flex-end",
  width:'100vw',
  marginTop:10,


  [theme.breakpoints.up('md')]: {
    height: 150,
  },

}))
