import {styled} from '@mui/material/styles'
import { Box } from '@mui/material'


export const Copyright = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: 40,
  gap:30,
  paddingRight:'20px',
  backgroundColor:'withe',
  alignItems:'center',
  marginLeft:20,
  justifyContent:"flex-end",
  [theme.breakpoints.up('md')]: {
    marginLeft:30
  },

  
}
))
export default Copyright