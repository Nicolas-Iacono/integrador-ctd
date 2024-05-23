import { useState, useEffect } from 'react'
import InstrumentForm from './InstrumentForm'
import { getInstrumentById, updateInstrument } from '../../api/instruments'
import {
  characteristicsToFormData,
  formDataToCharacteristics
} from '../utils/editInstrument'

const EditInstrumentForm = ({ id }) => {
  const [instrument] = getInstrumentById(id)
  const [initialFormData, setInitialFormData] = useState()
  const [loading, setLoading] = useState(true)

  console.log('EDIT')

  useEffect(() => {
    console.log('INSTRUMENT', instrument)

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
      characteristics: formDataToCharacteristics(formData)
    }

    console.log('DATA', data)

    updateInstrument(data).then((response) => {
      console.log(response)
    })
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <InstrumentForm initialFormData={initialFormData} onSubmit={onSubmit} />
  )
}

export default EditInstrumentForm
