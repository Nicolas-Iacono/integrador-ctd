import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import TematicTitle from './TematicTitle'

export const TematicCard = ({ title, imageUrl }) => {
  return (
    <Card sx={{ flex: 1 }}>
      <CardMedia
        sx={{ height: 300, cursor: 'pointer' }}
        image={imageUrl}
        title={title}
      >
        <TematicTitle gutterBottom variant="h5" component="div">
          {title}
        </TematicTitle>
      </CardMedia>
    </Card>
  )
}
export default TematicCard
