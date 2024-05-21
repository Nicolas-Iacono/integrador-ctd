import { Header } from './Header'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#F7E434'
    },
    secondary: {
      main: '#347bf7'
    }
  }
})

export const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Outlet />
      <Footer />
    </ThemeProvider>
  )
}
