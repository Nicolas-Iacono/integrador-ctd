import { useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { MainWrapper } from '../Common/MainWrapper'
import { TematicCard } from '../Common/TematicCard'
import { ProductsWrapper } from '../Common/ProductsWrapper'
import { ProductCard } from '../Common/ProductCard'
import { useAppStates } from '../utils/global.context'
import { getInstruments } from '../../api/instruments'
import { actions } from '../utils/actions'

import '../styles/home.styles.css'

export const Home = () => {
  const { state, dispatch } = useAppStates()
  const [instruments] = getInstruments()

  useEffect(() => {
    dispatch({ type: actions.UPDATE_INSTRUMENTS, payload: instruments })
  }, [instruments])

  return (
    <main>
      <CssBaseline />
      <MainWrapper>
        {state.tematics?.map((tematic, index) => (
          <TematicCard
            key={`tematic-card-${index}`}
            title={tematic.name}
            imageUrl={tematic.image}
          />
        ))}
      </MainWrapper>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 5,
          paddingBottom: 5
        }}
      >
        <Box>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            textAlign="center"
            sx={{ paddingBottom: 1, fontWeight: 'bold' }}
          >
            Best Sellers
          </Typography>
        </Box>
        <ProductsWrapper>
          {state.instruments?.map((instrument, index) => (
            <ProductCard
              key={`product-card-${index}`}
              name={instrument.name}
              imageUrl={instrument.imageUrls[0].imageUrl}
              id={instrument.idInstrument}
            />
          ))}
        </ProductsWrapper>
      </Container>
    </main>
  )
}
