import { styled } from '@mui/material/styles'
import { Container } from '@mui/material'

export const CreateWrapper = styled(Container)(
  ({ theme, isHeaderVisible }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '1rem',
    paddingBottom: '2rem',
    width: '100%',
    height: '110vh',

    [theme.breakpoints.up('md')]: {
      paddingTop: isHeaderVisible ? 320 : 50,

      transition: 'padding-top 1s ease-in-out'
    }
  })
)

export default CreateWrapper
