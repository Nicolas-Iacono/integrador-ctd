import { styled } from '@mui/material/styles'
import { Grid } from '@mui/material'

export const BoxLogoSuperior = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingRight:'50px',
  justifyContent:'center',
  alignItems:'flex-end',
  paddingTop: '10px',
  height:'100px',
  width:'100%',
  position: 'fixed', 
  top: '0',   
  

}))

export default BoxLogoSuperior