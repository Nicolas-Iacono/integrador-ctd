import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import InstrumentForm from './InstrumentForm'
import { getInstrumentById, updateInstrument } from '../../api/instruments'
import { addImage, removeImage } from '../../api/images'
import {
  characteristicsToFormData,
  formDataToCharacteristics
} from '../utils/editInstrument'
import { MessageDialog } from '../common/MessageDialog'

const EditInstrumentForm = ({ id, onSaved }) => {
  const [instrument] = getInstrumentById(id)
  const [initialFormData, setInitialFormData] = useState()
  const [loading, setLoading] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState()
  const imagesToUpdate = []

  const onClose = () => {
    setShowMessage(false)
    if (typeof onSaved === 'function') onSaved()
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

  const isSameImages = (newImageUrls) => {
    const actualImageUrls = instrument.data?.imageUrls

    if (!(actualImageUrls instanceof Array && newImageUrls instanceof Array))
      return true

    if (actualImageUrls.length === newImageUrls.length) {
      const isSame = actualImageUrls.reduce(
        (accumulator, currentImage) =>
          (accumulator =
            accumulator && newImageUrls.includes(currentImage.imageUrl)),
        true
      )
      return isSame
    } else {
      return false
    }
  }

  const onSubmit = (formData) => {
    if (!formData) return

    const data = {
      ...formData,
      characteristic: formDataToCharacteristics(formData)
    }
    const isSame = isSameImages(formData.imageUrls)

    updateInstrument(data)
      .then(() => {
        if (!isSame) {
          const idInstrument = instrument.data?.idInstrument
          const actualImages = instrument.data?.imageUrls
          const newImages = formData.imageUrls
          const totalImagesToUpdate = actualImages.length + newImages.length

          newImages.forEach((image) => {
            addImage(idInstrument, image)
              .then(() => {
                imagesToUpdate.push('ok')
              })
              .catch(() => {
                imagesToUpdate.push('nok')
              })
              .finally(() => {
                if (imagesToUpdate.length === totalImagesToUpdate) {
                  if (imagesToUpdate.some((image) => image === 'nok')) {
                    setMessage(
                      'Se guardó el instrumento, pero algunas imágenes no pudieron ser actualizadas'
                    )
                  }
                  setShowMessage(true)
                }
              })
          })

          actualImages.forEach((image) => {
            removeImage(image.idImage, idInstrument)
              .then(() => {
                imagesToUpdate.push('ok')
              })
              .catch(() => {
                imagesToUpdate.push('nok')
              })
              .finally(() => {
                if (imagesToUpdate.length === totalImagesToUpdate) {
                  if (imagesToUpdate.some((image) => image === 'nok')) {
                    setMessage(
                      'Se guardó el instrumento, pero algunas imágenes no pudieron ser actualizadas'
                    )
                  }
                  setShowMessage(true)
                }
              })
          })
        }

        setMessage('Instrumento guardado exitosamente')
      })
      .catch(() => {
        setMessage('No se pudo guardar instrumento')
      })
      .finally(() => {
        if (isSame) setShowMessage(true)
      })
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <InstrumentForm initialFormData={initialFormData} onSubmit={onSubmit} />
      <MessageDialog
        title="Editar Instrumento"
        message={message}
        isOpen={showMessage}
        buttonText="Ok"
        onClose={onClose}
      />
    </Box>
  )
}

export default EditInstrumentForm
