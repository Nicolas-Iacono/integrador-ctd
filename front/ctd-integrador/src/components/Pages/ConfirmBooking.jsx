import { useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  CssBaseline,
  Container,
  Divider,
  Tooltip,
  Typography
} from '@mui/material'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import MainWrapper from '../common/MainWrapper'
import { MessageDialog } from '../common/MessageDialog'
import { useAppStates } from '../utils/global.context'
import { useAuthContext } from '../utils/context/AuthGlobal'
import { Loader } from '../common/loader/Loader'
import { UsersApi } from '../../api/users'
import { Code } from '../../api/constants'
import { createReservation } from '../../api/reservations'

dayjs.extend(duration)

export const ConfirmBooking = () => {
  const [loadingTitle, setLoadingTitle] = useState('Un momento por favor')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState()
  const [duration, setDuration] = useState()
  const [message, setMessage] = useState()
  const [showMessage, setShowMessage] = useState(false)
  const [disableSubmit, setDisableSubmit] = useState(false)
  const onButtonPressed = useRef()
  const { state } = useAppStates()
  const { bookingInfo } = state
  const { user: loggedUser } = useAuthContext()

  useEffect(() => {
    if (loggedUser) getUserInfo(loggedUser.idUser)
  }, [loggedUser])

  useEffect(() => {
    if (bookingInfo && user) {
      const duration = dayjs.duration(
        bookingInfo.bookingDateTo.diff(bookingInfo.bookingDateFrom)
      )
      setDuration(duration.days())
      setLoading(false)
      if (window) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }, [bookingInfo, user])

  const getUserInfo = (id) => {
    UsersApi.getUserById(id)
      .then(([user, code]) => {
        if (code === Code.SUCCESS) {
          setUser(user.data)
        }
      })
      .catch(([_, code]) => {
        if (code === Code.NOT_FOUND) {
          setUser({ idUser: id, name: 'Usuario no encontrado' })
        }
      })
  }

  const getUserAddress = () => {
    if (!(user?.addresses?.addresses?.length > 0))
      return 'Dirección no especificada'

    const address = user.addresses[0]
    return `${address?.street} ${address?.number}`
  }

  const getUserAddressLocation = () => {
    if (!(user?.addresses?.addresses?.length > 0)) return ''

    const address = user.addresses[0]
    return `${address?.city}, ${address?.state} - ${address?.country}`
  }

  const handleConfirmReservation = () => {
    setMessage('¿Confirmar la reserva del instrumento?')
    onButtonPressed.current = submitReservation
    setShowMessage(true)
  }

  const submitReservation = () => {
    setLoadingTitle('Creando reserva, un momento por favor')
    setLoading(true)
    createReservation(
      user.idUser,
      bookingInfo.instrument.idInstrument,
      bookingInfo.bookingDateFrom.format('YYYY-MM-DD'),
      bookingInfo.bookingDateTo.format('YYYY-MM-DD')
    )
      .then(() => {
        setMessage('Reserva Creada exitosamente!')
        setDisableSubmit(true)
      })
      .catch(([_, code]) => {
        if (code === Code.ALREADY_EXISTS) {
          setMessage(
            'No fue posible crear la reserva. Ya hay una reserva tuya para este instrumento'
          )
          setDisableSubmit(true)
        } else {
          setMessage('No fue posible crear la reserva.')
        }
      })
      .finally(() => {
        setLoading(false)
        onButtonPressed.current = handleClose
        setShowMessage(true)
      })
  }

  const handleClose = () => {
    setShowMessage(false)
  }

  if (loading) return <Loader title={loadingTitle} />

  return (
    <main>
      <MainWrapper>
        <CssBaseline />
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: 5,
            paddingLeft: { xs: '0' },
            paddingRight: { xs: '0' }
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
              Confirmación de reserva
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-evenly',
              padding: { xs: '0', md: '1rem 5rem' },
              gap: '4rem'
            }}
          >
            <Box
              sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: 'left',
                    fontWeight: '400',
                    padding: '1rem'
                  }}
                >
                  En las fechas
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: 'left',
                      fontWeight: '300',
                      padding: '.2rem 1rem .2rem 2rem',
                      width: '40%'
                    }}
                  >
                    Inicio:
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: 'left',
                      fontWeight: '300',
                      padding: '.2rem 1rem .2rem 2rem',
                      width: '40%'
                    }}
                  >
                    {dayjs(bookingInfo.bookingDateFrom).format('DD-MM-YYYY')}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: 'left',
                      fontWeight: '300',
                      padding: '.2rem 1rem .2rem 2rem',
                      width: '40%'
                    }}
                  >
                    Entrega:
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: 'left',
                      fontWeight: '300',
                      padding: '.2rem 1rem .2rem 2rem',
                      width: '40%'
                    }}
                  >
                    {dayjs(bookingInfo.bookingDateTo).format('DD-MM-YYYY')}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: 'left',
                    fontWeight: '400',
                    padding: '1rem'
                  }}
                >
                  A nombre de
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: 'left',
                    fontWeight: '300',
                    padding: '.2rem 1rem .2rem 2rem',
                    width: '100%'
                  }}
                >
                  {`${user?.name} ${user?.lastName}`}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: 'left',
                    fontWeight: '300',
                    padding: '.2rem 1rem .2rem 2rem',
                    width: '100%'
                  }}
                >
                  {user?.email}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: 'left',
                    fontWeight: '300',
                    padding: '.2rem 1rem .2rem 2rem',
                    width: '100%'
                  }}
                >
                  {getUserAddress()}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: 'left',
                    fontWeight: '300',
                    padding: '.2rem 1rem .2rem 2rem',
                    width: '100%'
                  }}
                >
                  {getUserAddressLocation()}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: '50%' }}>
              <Box
                sx={{
                  border: '1px solid black',
                  borderRadius: '1rem',
                  width: '100%',
                  height: '100% !important',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '1rem'
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: 'center',
                    fontWeight: '400',
                    padding: '1rem'
                  }}
                >
                  {bookingInfo.instrument.name}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Box sx={{ width: '30%' }}>
                    <img
                      className="instrument-image"
                      src={
                        bookingInfo.instrument.imageUrls?.length &&
                        bookingInfo.instrument.imageUrls[0].imageUrl
                      }
                      alt={bookingInfo.instrument.name}
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: '70%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%'
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: 'left',
                          fontWeight: '300',
                          padding: '.2rem 1rem .2rem 2rem',
                          width: '35%'
                        }}
                      >
                        Medidas:
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: 'left',
                          fontWeight: '300',
                          padding: '.2rem 1rem .2rem 2rem',
                          width: '60%'
                        }}
                      >
                        {bookingInfo.instrument.measures}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%'
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: 'left',
                          fontWeight: '300',
                          padding: '.2rem 1rem .2rem 2rem',
                          width: '35%'
                        }}
                      >
                        Peso:
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: 'left',
                          fontWeight: '300',
                          padding: '.2rem 1rem .2rem 2rem',
                          width: '60%'
                        }}
                      >
                        {bookingInfo.instrument.weight}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%'
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: 'left',
                          fontWeight: '300',
                          padding: '.2rem 1rem .2rem 2rem',
                          width: '35%'
                        }}
                      >
                        Tipo:
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: 'left',
                          fontWeight: '300',
                          padding: '.2rem 1rem .2rem 2rem',
                          width: '60%'
                        }}
                      >
                        {bookingInfo.instrument.category.categoryName}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%'
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: 'left',
                          fontWeight: '300',
                          padding: '.2rem 1rem .2rem 2rem',
                          width: '35%'
                        }}
                      >
                        Temática:
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: 'left',
                          fontWeight: '300',
                          padding: '.2rem 1rem .2rem 2rem',
                          width: '60%'
                        }}
                      >
                        {bookingInfo.instrument.theme.themeName}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Divider sx={{ width: '100%' }} />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: 'center',
                      fontWeight: '400',
                      padding: '1rem'
                    }}
                  >
                    Valor:
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: 'center',
                      fontWeight: '400',
                      padding: '1rem'
                    }}
                  >
                    $ {bookingInfo.instrument.rentalPrice * duration}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              cursor: 'pointer',
              padding: '1rem',
              width: '100%',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Tooltip title="Confirmar reserva">
              <Button
                variant="contained"
                disabled={disableSubmit}
                sx={{
                  borderRadius: '1rem',
                  padding: '1.3rem',
                  maxHeight: '4.5rem'
                }}
                onClick={handleConfirmReservation}
              >
                <Typography
                  textAlign="center"
                  sx={{ fontWeight: 'bold' }}
                  variant="h6"
                >
                  Confirmar
                </Typography>
              </Button>
            </Tooltip>
          </Box>
        </Container>
        <MessageDialog
          title="Reservar instrumento"
          message={message}
          isOpen={showMessage}
          buttonText="Ok"
          onClose={handleClose}
          onButtonPressed={onButtonPressed?.current}
          showCancelButton
        />
      </MainWrapper>
    </main>
  )
}
