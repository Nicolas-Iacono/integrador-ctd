import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getInstrumentById } from '../../api/instruments'
import { MainWrapper } from '../common/MainWrapper'
import { InstrumentDetailWrapper } from '../common/InstrumentDetailWrapper'
import { Box, Divider, Tooltip, Button, Typography } from '@mui/material'
import { ScreenModal } from '../common/ScreenModal'
import { InstrumentGallery } from '../common/InstrumentGallery'
import { InstrumentAvailability } from '../common/availability/InstrumentAvailability'
import { useAppStates } from '../utils/global.context'
import { useAuthContext } from '../utils/context/AuthGlobal'
import { ArrowLeft } from '../Images/ArrowLeft'
import { Si } from '../Images/Si'
import { No } from '../Images/No'
import { Favorite } from '@mui/icons-material'
import { FavoriteIconWrapper } from '../common/favorito/FavoriteIcon'
import {
  addFavorite,
  removeFavorite,
  getAllFavorites
} from '../../api/favorites'
import { Code } from '../../api/constants'

import '../styles/instrument.styles.css'

export const Instrument = () => {
  const { id } = useParams()
  const { state } = useAppStates()
  const [instrumentSelected, setInstrumentSelected] = useState({
    characteristics: {}
  })
  const [instrument] = getInstrumentById(id)
  const [showGallery, setShowGallery] = useState(false)
  const { user, isUserAdmin } = useAuthContext()
  const [favorites] = getAllFavorites(user?.idUser)
  const [idFavorite, setIdFavorite] = useState()

  useEffect(() => {
    if (!instrument?.data) return

    setInstrumentSelected(instrument.data)
  }, [instrument])

  useEffect(() => {
    if (favorites && favorites.data) {
      const favorite = favorites.data.filter(
        (favorite) => favorite.instrument.idInstrument === Number(id)
      )

      setIdFavorite(favorite && favorite.length > 0 && favorite[0].idFavorite)
    }
  }, [favorites])

  const onClose = () => {
    setShowGallery(false)
  }

  const handleFavoriteClick = () => {
    addFavorite(user.idUser, id)
      .then((response) => {
        setIdFavorite(response.data.idFavorite)
      })
      .catch(([error, code]) => {
        if (code === Code.ALREADY_EXISTS) {
          removeFromFavorites()
        }
      })
  }

  const removeFromFavorites = () => {
    if (!idFavorite) return

    removeFavorite(idFavorite, user.idUser, id)
      .then((response) => {
        console.log(response)
        setIdFavorite(undefined)
      })
      .catch((error) => console.log(error))
  }

  return (
    <main>
      <MainWrapper sx={{ alignItems: 'center', position: 'relative' }}>
        {user && (
          <Box
            sx={{
              position: 'absolute',
              top: '27%',
              left: '95%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <Tooltip
              title={
                !!idFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'
              }
            >
              <FavoriteIconWrapper
                aria-label="Agregar a favoritos"
                onClick={handleFavoriteClick}
                isFavorite={!!idFavorite}
              >
                <Favorite sx={{ color: '#000000 !important' }} />
              </FavoriteIconWrapper>
            </Tooltip>
          </Box>
        )}
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
        </InstrumentDetailWrapper>
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
                  key={characteristic.id}
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
            Disponibilidad
          </Typography>
          <Box
            sx={{
              display: 'flex',
              paddingBottom: '1rem',
              width: '100%',
              justifyContent: 'center'
            }}
          >
            <InstrumentAvailability id={id} />
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <Divider sx={{ width: '100%' }} />
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
          {user && !isUserAdmin && (
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
          )}
        </Box>
      </MainWrapper>
      <ScreenModal isOpen={showGallery} onClose={onClose} fullScreen>
        <InstrumentGallery itemData={instrumentSelected?.imageUrls} />
      </ScreenModal>
    </main>
  )
}
