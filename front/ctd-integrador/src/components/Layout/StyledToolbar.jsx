import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'

export const UpperStyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  flexDirection: 'row-reverse',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}))

export const MiddleStyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  flexDirection: 'row-reverse',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}))

export const LowerStyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}))
