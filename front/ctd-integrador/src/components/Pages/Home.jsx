import { useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useAppStates } from '../utils/global.context'
import { getInstruments } from '../../api/instruments'
import { actions } from '../utils/actions'
import MainWrapper from '../common/MainWrapper'
import TematicCard from '../common/TematicCard'
import ProductsWrapper from '../common/ProductsWrapper'
import ProductCard from '../common/ProductCard'
import { useHeaderVisibility } from '../utils/context/HeaderVisibilityGlobal'

import '../styles/home.styles.css'

export const Home = () => {
  const { isHeaderVisible } = useHeaderVisibility()
  const { state, dispatch } = useAppStates()
  const [instruments] = getInstruments()

  useEffect(() => {
    dispatch({ type: actions.UPDATE_INSTRUMENTS, payload: instruments })
  }, [instruments])

  return (
    <main>
      <CssBaseline />
      <MainWrapper isHeaderVisible={isHeaderVisible}>
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
