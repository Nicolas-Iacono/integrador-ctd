import { styled } from '@mui/material/styles'
import { Grid } from '@mui/material'
import background from '../../../assets/CrearUsuarioBackGround.png'
export const MainCrearUsuario = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems:'center',
  gap: '.5rem',
  // paddingTop: 150,
  // paddingBottom: '3rem',
  backgroundImage: `url(${background})`,
  backgroundPosition:'center bottom',
  backgroundSize:'cover',
  backgroundRepeat:'no-repeat',
  height:'100vh',

  [theme.breakpoints.down('md')]: {
  backgroundPosition:'left bottom',
    
  },

  // [theme.breakpoints.up('md')]: {
  //   paddingTop: 320
  // }
}))

export default MainCrearUsuario
