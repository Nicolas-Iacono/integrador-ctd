import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getInstrumentById } from '../../api/instruments'
import { Typography } from '@mui/material'
import { MainWrapper } from '../common/MainWrapper'
import { InstrumentDetailWrapper } from '../common/InstrumentDetailWrapper'
import { Box, Divider, Tooltip, Button } from '@mui/material'
import { ArrowNext } from '../Images/ArrowNext'
import { ScreenModal } from '../common/ScreenModal'
import { InstrumentGallery } from '../common/InstrumentGallery'
import { useAppStates } from '../utils/global.context'

import '../styles/instrument.styles.css'
import { ArrowLeft } from '../Images/ArrowLeft'
import { Si } from '../Images/Si'
import { No } from '../Images/No'

export const Instrument = () => {
  const { id } = useParams()
  const { state } = useAppStates()
  const [instrumentSelected, setInstrumentSelected] = useState({
    characteristics: {}
  })
  const [instrument] = getInstrumentById(id)
  const [showGallery, setShowGallery] = useState(false)

  useEffect(() => {
    if (!instrument?.data) return

    setInstrumentSelected(instrument.data)
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
              width: { xs: '100%', md: '40%' },
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
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
              Medida: {instrumentSelected?.measures}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'left',
                fontWeight: 'lighter'
              }}
            >
              Peso: {instrumentSelected?.weight}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'left',
                fontWeight: 'lighter'
              }}
            >
              Tipo: {instrumentSelected?.category?.categoryName}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'left',
                fontWeight: 'lighter'
              }}
            >
              Temática: {instrumentSelected?.theme?.themeName}
            </Typography>
            <Divider />
          </Box>
          <Box sx={{ width: { xs: '100%', md: '40%' }, cursor: 'pointer' }}>
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
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Divider />
          <Typography
            variant="h5"
            sx={{ textAlign: 'center', fontWeight: '300', padding: '1rem' }}
          >
            Características
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              paddingBottom: '1rem',
              width: '100%',
              justifyContent: 'space-evenly'
            }}
          >
            {state?.characteristics?.map((characteristic) => {
              return (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Tooltip title={characteristic.name}>
                    <img
                      src={characteristic.image}
                      className="instrument-characteristic-image"
                    />
                  </Tooltip>
                  <ArrowLeft className="instrument-characteristic-arrow" />
                  {instrumentSelected?.characteristics[characteristic.id] ===
                  'si' ? (
                    <Si className="instrument-characteristic-text" />
                  ) : (
                    <No className="instrument-characteristic-text" />
                  )}
                </Box>
              )
            })}
          </Box>
        </Box>
      </MainWrapper>
      <ScreenModal isOpen={showGallery} onClose={onClose} fullScreen>
        <InstrumentGallery itemData={instrumentSelected?.imageUrls} />
      </ScreenModal>
    </main>
  )
}
