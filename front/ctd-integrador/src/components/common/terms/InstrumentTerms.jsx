import { Box, Typography, List, ListItem } from '@mui/material'

export const InstrumentTerms = () => {
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            fontWeight: 'lighter',
            paddingTop: '1rem'
          }}
        >
          Políticas del producto
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '2rem'
          }}
        >
          <List
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              width: '50%'
            }}
          >
            <ListItem>
              <Typography variant="body1" sx={{ fontWeight: '300' }}>
                Debe ser entregado en buen estado.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1" sx={{ fontWeight: '300' }}>
                Los daños ocacionados deben ser asumidos por el usuario.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1" sx={{ fontWeight: '300' }}>
                El instrumento debe ser devueltos en la misma hora que se
                retiró.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1" sx={{ fontWeight: '300' }}>
                El instrumento debe ser entregado junto con sus accesorios en
                buen estado.
              </Typography>
            </ListItem>
          </List>
          <List
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              width: '50%'
            }}
          >
            <ListItem>
              <Typography variant="body1" sx={{ fontWeight: '300' }}>
                Los instrumentos deben ser probados antes de su retiro.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1" sx={{ fontWeight: '300' }}>
                Puede adquirir una póliza de seguro que lo cubre de los
                accidentes que se pueden presentar.
              </Typography>
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  )
}
