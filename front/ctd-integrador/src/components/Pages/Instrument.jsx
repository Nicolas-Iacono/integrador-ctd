import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getInstrumentById } from '../../api/instruments'
import { Typography } from '@mui/material'
import { MainWrapper } from '../common/MainWrapper'
import { InstrumentDetailWrapper } from '../common/InstrumentDetailWrapper'
import { Box, Divider, Tooltip, Button } from '@mui/material'
import { ArrowNext } from '../Images/ArrowNext'
import { FullScreenModal } from '../common/FullScreenModal'
import { InstrumentGallery } from '../common/InstrumentGallery'

import '../styles/instrument.styles.css'

export const Instrument = () => {
  const { id } = useParams()
  const [instrumentSelected, setInstrumentSelected] = useState({})
  const [instrument] = getInstrumentById(id)
  const [showGallery, setShowGallery] = useState(false)

  useEffect(() => {
    setInstrumentSelected(instrument)
  }, [instrument])

  const onClose = () => {
    setShowGallery(false)
  }

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
          <Box sx={{ width: { xs: '100%', md: '45%' }, cursor: 'pointer' }}>
            <Tooltip title="Ver más imágenes">
              <Button onClick={() => setShowGallery(true)}>
                <img
                  className="instrument-image"
                  src={
                    instrumentSelected?.imageUrls?.length &&
                    instrumentSelected.imageUrls[0].imageUrl
                  }
                  alt={instrumentSelected?.name}
                />
              </Button>
            </Tooltip>
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
            width: '100%',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row-reverse',
              cursor: 'pointer'
            }}
          >
            <Tooltip title="Reservar">
              <Button
                variant="contained"
                sx={{
                  borderRadius: '1rem',
                  padding: '1.3rem',
                  maxHeight: '4.5rem'
                }}
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
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row-reverse',
              cursor: 'pointer'
            }}
          >
            <ArrowNext />
          </Box>
        </Box>
      </MainWrapper>
      <FullScreenModal isOpen={showGallery} onClose={onClose}>
        <InstrumentGallery itemData={instrumentSelected?.imageUrls} />
      </FullScreenModal>
    </main>
  )
}
