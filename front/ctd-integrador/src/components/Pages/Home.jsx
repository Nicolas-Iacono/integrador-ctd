import { useEffect, useState } from 'react'
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
  const { searchPattern } = state
  const [selectedInstruments, setSelectedInstruments] = useState([])
  const [loading, setLoading] = useState(true)
  const [instruments] = getInstruments()

  useEffect(() => {
    if (instruments && instruments.data) {
      dispatch({ type: actions.UPDATE_INSTRUMENTS, payload: instruments })
      setSelectedInstruments(instruments.data)
      setLoading(false)
    }
  }, [instruments])

  useEffect(() => {
    if (instruments && instruments.data) {
      const found =
        searchPattern.length > 0
          ? instruments?.data?.filter((instrument) =>
              instrument.name
                .toLowerCase()
                .includes(searchPattern.toLowerCase())
            )
          : instruments.data
      setSelectedInstruments(found)
    }
  }, [searchPattern])

  if (loading) return <p>Loading...</p>

  return (
    <>
      {!loading && (
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
              {selectedInstruments?.map((instrument, index) => (
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
      )}
    </>
  )
}
