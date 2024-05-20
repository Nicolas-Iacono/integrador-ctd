import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { ProductWrapper } from './ProductWrapper'
import { Link } from 'react-router-dom'

import '../styles/product.styles.css'

const ProductCard = ({ name, imageUrl, id }) => {
  return (
    <ProductWrapper sx={{ width: { md: '13rem' }, flexGrow: 1 }}>
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
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
      </Link>
    </ProductWrapper>
  )
}

export default ProductCard
