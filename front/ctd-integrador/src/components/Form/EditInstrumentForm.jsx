import { useState, useEffect } from 'react'
import InstrumentForm from './InstrumentForm'
import { getInstrumentById, updateInstrument } from '../../api/instruments'
import {
  characteristicsToFormData,
  formDataToCharacteristics
} from '../utils/editInstrument'
import { MessageDialog } from '../common/MessageDialog'

const EditInstrumentForm = ({ id }) => {
  const [instrument] = getInstrumentById(id)
  const [initialFormData, setInitialFormData] = useState()
  const [loading, setLoading] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState()

  const onClose = () => {
    setShowMessage(false)
  }

  useEffect(() => {
    if (!(instrument && instrument.data?.idInstrument)) return

    const data = {
      idInstrument: instrument.data.idInstrument,
      name: instrument.data.name,
      description: instrument.data.description,
      measures: instrument.data.measures,
      weight: instrument.data.weight,
      rentalPrice: instrument.data.rentalPrice,
      idCategory: instrument.data.category?.idCategory,
      idTheme: instrument.data.theme?.idTheme,
      imageUrlsText: instrument.data?.imageUrls
        .map((image) => image.imageUrl)
        .join('\n'),
      characteristics: characteristicsToFormData(instrument)
    }
    setInitialFormData(data)
    setLoading(false)
  }, [instrument])

  const onSubmit = (formData) => {
    if (!formData) return

    const data = {
      ...formData,
      characteristic: formDataToCharacteristics(formData)
    }

    updateInstrument(data)
      .then((response) => {
        console.log(response)
        setMessage('Instrumento guardado exitosamente')
      })
      .catch((error) => {
        console.log(error)
        setMessage('No se pudo guardar instrumento')
      })
      .finally(() => setShowMessage(true))
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <InstrumentForm initialFormData={initialFormData} onSubmit={onSubmit} />
      <MessageDialog
        title="Editar Instrumento"
        message={message}
        isOpen={showMessage}
        buttonText="Ok"
        onClose={onClose}
      />
    </>
  )
}

export default EditInstrumentForm
