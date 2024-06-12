import { styled, alpha } from '@mui/material/styles'
import { IconButton } from '@mui/material'

export const FavoriteIconWrapper = styled(IconButton)(
  ({ theme, isFavorite }) => ({
    backgroundColor: isFavorite ? theme.palette.primary.main : '#FFFFFF',
    '&:hover': {
      backgroundColor: isFavorite
        ? alpha(theme.palette.primary.main, 0.7)
        : '#FFFFFF',
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)'
    },
    border: '1px solid black'
  })
)
