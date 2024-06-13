import { useState, useEffect } from 'react'
import { UsersApi } from '../../../api/users'
import { UserForm } from './UserForm'
import { Box, Typography } from '@mui/material'
import { MessageDialog } from '../../common/MessageDialog'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { MainCrearUsuario } from '../../common/crearUsuario/MainCrearUsuario'
import BoxLogoSuperior from '../../common/crearUsuario/BoxLogoSuperior'
import BoxFormUnder from '../../common/crearUsuario/BoxFormUnder'
import { Logo } from '../../Images/Logo'
import { Code } from '../../../api/constants'
import { roleById } from '../../utils/roles/constants'
import { useAuthContext } from '../../utils/context/AuthGlobal'

const EditUser = ({ onSwitch }) => {
  const { id } = useParams()
  const [user, code] = UsersApi.getUserById(id)
  const [formData, setFormData] = useState()
  const [showMessage, setShowMessage] = useState(false)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState()
  const [isUserUpdated, setIsUserUpdated] = useState()
  const [isNewRoleAdded, setIsNewRoleAdded] = useState()
  const [isOldRoleDeleted, setIsOldRoleDeleted] = useState()
  const { user: loggedUser, isUserAdmin } = useAuthContext()
  const navigate = useNavigate()
  const isLoggedUser = loggedUser?.idUser && loggedUser.idUser === Number(id)
  const canEditUser = !(isUserAdmin && !isLoggedUser)

  useEffect(() => {
    if (!(user || code)) return

    if (code === Code.SUCCESS) {
      const initialFormData = {
        idUser: id,
        name: user.data.name,
        lastName: user.data.lastName,
        email: user.data.email,
        addresses: user.data.addresses,
        phones: user.data.phones,
        idRol: user.data.roles.length && user.data.roles[0].idRol
      }
      setFormData(initialFormData)
    }
    if (code === Code.NOT_FOUND) {
      setMessage('Usuario no encontrado')
      setShowMessage(true)
    }

    setLoading(false)
  }, [user, code])

  useEffect(() => {
    if (
      isUserUpdated === undefined ||
      isNewRoleAdded === undefined ||
      isOldRoleDeleted === undefined
    )
      return

    if (
      (isLoggedUser && isUserUpdated === true) ||
      (isUserAdmin &&
        isUserUpdated === true &&
        isNewRoleAdded === true &&
        isOldRoleDeleted === true)
    ) {
      setMessage('Usuario guardado exitosamente')
    } else {
      setMessage(
        'No fue posible guardar el usuario. Por favor, inténtalo nuevamente'
      )
    }
    setIsNewRoleAdded(undefined)
    setIsOldRoleDeleted(undefined)
    setShowMessage(true)
  }, [isUserUpdated, isNewRoleAdded, isOldRoleDeleted])

  const onClose = () => {
    setShowMessage(false)

    if (isUserUpdated) {
      setIsUserUpdated(undefined)
      navigate(-1)
    }
  }

  const handleSubmit = (formData) => {
    const formDataToSend = { ...formData }
    const oldRol =
      (user.data.roles.length && user.data.roles[0].rol) || undefined
    const newRol = roleById(formDataToSend.idRol)
    // Aquí puedes enviar los datos del formulario a través de una función prop o realizar otras acciones
    UsersApi.updateUser(formDataToSend)
      .then((response) => {
        console.log('respuesta del servidor: ', response.data)
        setIsUserUpdated(true)
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error)
        setMessage(
          'No fue posible guardar usuario. Por favor, vuelve a intentarlo'
        )
        setIsUserUpdated(false)
      })

    if (!isUserAdmin || oldRol === undefined) setIsOldRoleDeleted(true)
    if (!isUserAdmin || newRol === undefined) setIsNewRoleAdded(true)

    if (oldRol === newRol) {
      setIsOldRoleDeleted(true)
      setIsNewRoleAdded(true)
    }

    if (isUserAdmin && oldRol !== undefined && oldRol !== newRol) {
      UsersApi.deleteUserRole(user.data, oldRol)
        .then(() => setIsOldRoleDeleted(true))
        .catch(() => setIsOldRoleDeleted(false))
    }

    if (isUserAdmin && oldRol !== newRol) {
      UsersApi.addUserRole(user.data, newRol)
        .then(() => setIsNewRoleAdded(true))
        .catch(() => setIsNewRoleAdded(false))
    }
  }

  if (!(isLoggedUser || isUserAdmin)) {
    navigate('/')
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <MainCrearUsuario>
      <>
        <BoxLogoSuperior>
          <Link to="/">
            <Logo />
          </Link>
        </BoxLogoSuperior>
        {formData && (
          <BoxFormUnder
            sx={{ display: { xs: canEditUser ? 'flex' : 'none', lg: 'flex' } }}
          >
            <UserForm
              onSwitch={onSwitch}
              initialFormData={formData}
              onSubmit={handleSubmit}
            />
            <MessageDialog
              title="Editar Usuario"
              message={message}
              isOpen={showMessage}
              buttonText="Ok"
              onClose={onClose}
            />
          </BoxFormUnder>
        )}
      </>
      {!canEditUser && (
        <Box
          sx={{
            display: {
              xs: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              lg: 'none'
            },
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh'
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="h6"
            textAlign="center"
            sx={{
              paddingTop: 30,
              fontWeight: 'bold'
            }}
          >
            Funcionalidad no disponible en esta resolución
          </Typography>
        </Box>
      )}
    </MainCrearUsuario>
  )
}

export default EditUser
