import CssBaseline from '@mui/material/CssBaseline'
import { TematicsWrapper } from '../common/TematicsWrapper'
import { TematicCard } from '../common/TematicCard'
import { useAppStates } from '../utils/global.context'

import '../styles/home.styles.css'

export const Home = () => {
  const { state } = useAppStates()

  return (
    <main>
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
