import React from 'react'
import { useAuthContext } from '../utils/context/AuthGlobal'
import { Typography, Box, Button } from '@mui/material'
import { InstrumentDetailWrapper } from '../common/InstrumentDetailWrapper'
import { useHistory } from 'react-router-dom'

const Favorite = () => {
  const { favorites } = useAuthContext()
  const history = useHistory()

  return (
    <main>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
          textAlign: 'center',
          fontWeight: 'lighter',
          paddingTop: '2rem',
          paddingBottom: '3rem',
        }}
      >
        Favoritos
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        {favorites.length === 0 ? (
          <Typography variant="h6">No tienes instrumentos favoritos.</Typography>
        ) : (
          favorites.map((instrument) => (
            <InstrumentDetailWrapper key={instrument.id}>
              <Typography variant="h5">{instrument.name}</Typography>
              <Button
                onClick={() => history.push(`/instrument/${instrument.id}`)}
                variant="contained"
              >
                Ver detalles
              </Button>
            </InstrumentDetailWrapper>
          ))
        )}
      </Box>
    </main>
  )
}

export default Favorite

