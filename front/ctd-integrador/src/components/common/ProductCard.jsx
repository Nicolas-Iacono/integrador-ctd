import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { ProductWrapper } from './ProductWrapper'
import { Link } from 'react-router-dom'
import { Button, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import '../styles/product.styles.css'

const ProductCard = ({
  name,
  imageUrl,
  id,
  isFavorite = false,
  onClickTrash
}) => {
  return (
    <ProductWrapper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: { md: '13rem' },
        flexGrow: 1
      }}
    >
      <Link to={`/instrument/${id}`} className="product-link">
        <CardMedia
          sx={{
            height: 300,
            cursor: 'pointer',
            backgroundSize: 'contain !important'
          }}
          image={imageUrl}
          alt={name}
        />
        <CardContent
          sx={{
            paddingBottom: isFavorite ? '0rem !important' : '1.5rem !important'
          }}
        >
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
      </Link>
      {isFavorite && (
        <Tooltip title="Eliminar de favoritos">
          <Button sx={{ height: '3rem' }} onClick={onClickTrash}>
            <DeleteIcon fontSize="large" sx={{ fill: '#000000 !important' }} />
          </Button>
        </Tooltip>
      )}
    </ProductWrapper>
  )
}

export default ProductCard
