import CssBaseline from '@mui/material/CssBaseline'
import TematicCard from "../Common/TematicCard"
import { useAppStates } from '../utils/global.context'
import TematicsWrapper from '../Common/TematicsWrapper'
import styles from  '../styles/home.module.css'

export const Home = () => {
  const { state } = useAppStates()

  return (
    <main className={styles.cuerpoMain}>
      <CssBaseline />
      <TematicsWrapper> 
        {state.tematics?.map((tematic, index) => (
          <TematicCard
            key={`tematic-card-${index}`}
            title={tematic.name}
            imageUrl={tematic.image}
          />
        ))}
      </TematicsWrapper>
    </main>
  )
}
