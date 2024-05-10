import { Header } from './Header'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import styles from '../styles/layout.module.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#F7E434',
    },
    secondary: {
      main: '#E0C2FF',
      light: '#F5EBFF',
      contrastText: '#47008F',
    },
  },
})

export const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header className={styles.header} />
      <Outlet className={styles.contenido} />
      <Footer className={styles.footer} />
    </ThemeProvider>
  )
}
