import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getInstrumentById } from '../../api/instruments'
import { Typography } from '@mui/material'
import { MainWrapper } from '../Common/MainWrapper'
import { InstrumentDetailWrapper } from '../Common/InstrumentDetailWrapper'
import { Box, Divider, Tooltip, Button } from '@mui/material'

import '../styles/instrument.styles.css'

export const Instrument = () => {
  const { id } = useParams()
  const [instrumentSelected, setInstrumentSelected] = useState({})
  const [instrument] = getInstrumentById(id)

  useEffect(() => {
    setInstrumentSelected(instrument)
  }, [instrument])

  return (
    <main>
      <MainWrapper sx={{ alignItems: 'center' }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
            textAlign: 'center',
            fontWeight: 'lighter',
            paddingTop: '2rem',
            paddingBottom: '3rem'
          }}
        >
          {instrumentSelected?.name}
        </Typography>
        <InstrumentDetailWrapper>
          <Box
            sx={{
              width: { xs: '100%', md: '45%' },
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              minHeight: '15rem'
            }}
          >
            <Typography
              variant="h6"
              sx={{
                textAlign: 'left',
                fontWeight: 'lighter'
              }}
            >
              {instrumentSelected?.description}
            </Typography>
            <Divider />
            <Typography
              variant="h6"
              sx={{
                textAlign: 'left',
                fontWeight: 'lighter'
              }}
            >
              Tipo: {instrumentSelected?.category?.name}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'left',
                fontWeight: 'lighter'
              }}
            >
              Temática: {instrumentSelected?.tematic}
            </Typography>
            <Divider />
          </Box>
          <Box sx={{ width: { xs: '100%', md: '45%' } }}>
            <img
              src={
                instrumentSelected?.imageUrls?.length &&
                instrumentSelected.imageUrls[0].imageUrl
              }
              alt={instrumentSelected?.name}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="h4"
              sx={{
                textAlign: 'center',
                fontWeight: 'lighter'
              }}
            >
              Valor día: $ {instrumentSelected?.rentalPrice}
            </Typography>
          </Box>
        </InstrumentDetailWrapper>
        <Box
          sx={{
            flexGrow: 0,
            padding: '1rem'
          }}
        >
          <Tooltip title="Crear cuenta">
            <Button
              variant="contained"
              sx={{ borderRadius: '1rem', padding: '1.3rem' }}
            >
              <Typography
                textAlign="center"
                sx={{ fontWeight: 'bold' }}
                variant="h6"
              >
                Reservar
              </Typography>
            </Button>
          </Tooltip>
        </Box>
      </MainWrapper>
    </main>
  )
}
