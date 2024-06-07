import { createTheme, ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000'
    },
    secondary: {
      main: '#E0C2FF',
      light: '#F5EBFF',
      contrastText: '#47008F'
    }
  }
})

export const ContrastInput = ({ label }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          padding: '.5rem',
          display: {
            xs: 'none',
            md: 'flex'
          },
          justifyContent: { md: 'center' },
          width: '100%'
        }}
      >
        <Tooltip title={label}>
          <TextField
            id="outlined-contrast-input"
            label={label}
            variant="filled"
            sx={{
              backgroundColor: '#F7E434',
              borderRadius: '1rem',
              fontWeight: 'bold',
              width: '40%',
              padding: '.5rem .5rem',
              alignSelf: 'center'
            }}
          />
        </Tooltip>
      </Box>
    </ThemeProvider>
  )
}