import { useState, useEffect } from 'react'
import { UsersApi } from '../../../api/users'
import { UserForm } from './UserForm'
import { MessageDialog } from '../../common/MessageDialog'
import { useNavigate, useParams } from 'react-router-dom'
import MainCrearUsuario from '../../common/crearUsuario/MainCrearUsuario'
import BoxLogoSuperior from '../../common/crearUsuario/BoxLogoSuperior'
import { Logo } from '../../Images/Logo'

const EditUser = ({ onSwitch }) => {
  const { id } = useParams()
  const [user] = UsersApi.getUserById(id)
  const [formData, setFormData] = useState()
  const [showMessage, setShowMessage] = useState(false)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState()
  const [isUserUpdated, setIsUserUpdated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return

    const initialFormData = {
      idUser: id,
      name: user.data.name,
      lastName: user.data.lastName,
      email: user.data.email,
      password: '',
      repeatPassword: '',
      addresses: user.data.addresses,
      phones: user.data.phones
    }
    setFormData(initialFormData)
    setLoading(false)
  }, [user])

  const onClose = () => {
    setShowMessage(false)

    if (isUserUpdated) {
      navigate(-1)
    }
  }

  const handleSubmit = (formData) => {
    console.log(formData)
    const formDataToSend = { ...formData }
    delete formDataToSend.repeatPassword
    console.log(formDataToSend)
    // Aquí puedes enviar los datos del formulario a través de una función prop o realizar otras acciones
    UsersApi.updateUser(formDataToSend)
      .then((response) => {
        console.log('respuesta del servidor: ', response.data)
        setMessage('Usuario guardado exitosamente')
        setIsUserUpdated(true)
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error)
        setMessage(
          'No fue posible guardar usuario\nPor favor, vuelve a intentarlo'
        )
        setIsUserUpdated(false)
      })
      .finally(() => setShowMessage(true))
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <MainCrearUsuario>
      <BoxLogoSuperior>
        <Logo />
      </BoxLogoSuperior>
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
    </MainCrearUsuario>
  )
}

export default EditUser
