import { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { Typography, Box, Container } from '@mui/material'
import ProductsWrapper from '../common/ProductsWrapper'
import ProductCard from '../common/ProductCard'
import { MainWrapper } from '../common/MainWrapper'
import { getAllFavorites } from '../../api/favorites'
import { useAuthContext } from '../utils/context/AuthGlobal'
import { removeFavorite } from '../../api/favorites'
import { Code } from '../../api/constants'

export const Favorites = () => {
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState()
  const { user } = useAuthContext()
  const [data, code] = getAllFavorites(user?.idUser)

  useEffect(() => {
    if (code === Code.SUCCESS) {
      setFavorites(data.data)
      setLoading(false)
    } else if (code === Code.NOT_FOUND) {
      setFavorites([])
      setLoading(false)
    }
  }, [data])

  const handleRemoveFavorite = (favorite) => {
    removeFavorite(
      favorite.idFavorite,
      favorite.idUser,
      favorite.instrument.idInstrument
    ).then((response) => {
      const favs = favorites.filter(
        (fav) => fav.idFavorite !== favorite.idFavorite
      )
      setFavorites(favs)
    })
  }

  return (
    <>
      {!loading && (
        <main>
          <MainWrapper>
            <CssBaseline />
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
                  Favoritos
                </Typography>
              </Box>
              <ProductsWrapper>
                {favorites?.map((favorite, index) => (
                  <ProductCard
                    key={`favorite-card-${index}`}
                    name={favorite.instrument.name}
                    imageUrl={favorite.imageUrl}
                    id={favorite.instrument.idInstrument}
                    isFavorite={true}
                    onClickTrash={() => handleRemoveFavorite(favorite)}
                  />
                ))}
              </ProductsWrapper>
            </Container>
          </MainWrapper>
        </main>
      )}
    </>
  )
}
