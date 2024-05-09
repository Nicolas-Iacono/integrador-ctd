import Navbar from "./Navbar"
import { Outlet } from 'react-router-dom'
import  Footer from './Footer';
import styles from '../styles/layout.module.css'


const Layout = () => {
  return (
    <div className={styles.container}>
        <Navbar className={styles.nav}/>
        <Outlet className={styles.contenido}/>
        <Footer className={styles.footer}/>
    </div>
  )
}

export default Layout