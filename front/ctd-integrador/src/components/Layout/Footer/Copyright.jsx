import {styled} from '@mui/material/styles'
import { Box } from '@mui/material'


export const Copyright = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: 40,
  gap:20,
  alignItems:'center',
  justifyContent:"flex-end",
  paddingRight:'20px',
  backgroundColor:'red',
  marginLeft:20,
  [theme.breakpoints.up('md')]: {
    marginLeft:40
  },

  
}
))
export default Copyright