import { useState } from 'react'
import { UsersApi } from '../../../api/users'
import { UserForm } from './UserForm'
import { MessageDialog } from '../../common/MessageDialog'
import { useNavigate } from 'react-router-dom'

const NewUser = ({ onSwitch }) => {
  const initialFormData = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    addresses: [
      {
        street: '',
        number: 0,
        city: '',
        state: '',
        country: ''
      }
    ],
    phones: [
      {
        phoneNumber: ''
      }
    ]
  }
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState()
  const [isUserCreated, setIsUserCreated] = useState(false)
  const navigate = useNavigate()

  const onClose = () => {
    setShowMessage(false)

    if (isUserCreated) {
      navigate(0)
    }
  }

  const handleSubmit = (formData) => {
    console.log(formData)
    const formDataToSend = { ...formData }
    delete formDataToSend.repeatPassword
    console.log(formDataToSend)
    // Aquí puedes enviar los datos del formulario a través de una función prop o realizar otras acciones
    UsersApi.registerUser(formDataToSend)
      .then((response) => {
        console.log('respuesta del servidor: ', response.data)
        setMessage('Usuario registrado exitosamente\nYa puedes iniciar sesión')
        setIsUserCreated(true)
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error)
        setMessage(
          'No se pudo registrar usuario\nPor favor, vuelve a intentarlo'
        )
        setIsUserCreated(false)
      })
      .finally(() => setShowMessage(true))
  }

  return (
    <>
      <UserForm
        onSwitch={onSwitch}
        initialFormData={initialFormData}
        onSubmit={handleSubmit}
      />
      <MessageDialog
        title="Registrar Usuario"
        message={message}
        isOpen={showMessage}
        buttonText="Ok"
        onClose={onClose}
      />
    </>
  )
}

export default NewUser
