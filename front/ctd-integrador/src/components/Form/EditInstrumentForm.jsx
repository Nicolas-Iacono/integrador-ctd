import { useState, useEffect } from 'react'
import InstrumentForm from './InstrumentForm'
import { getInstrumentById, updateInstrument } from '../../api/instruments'

const EditInstrumentForm = ({ id }) => {
  const [instrument] = getInstrumentById(id)
  const [initialFormData, setInitialFormData] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!(instrument && instrument.idInstrument)) return

    const data = {
      idInstrument: instrument.idInstrument,
      name: instrument.name,
      description: instrument.description,
      measures: instrument.measures,
      weight: instrument.weight,
      rentalPrice: instrument.rentalPrice,
      idCategory: instrument.category?.idCategory,
      idTheme: instrument.theme?.idTheme,
      imageUrlsText: instrument?.imageUrls
        .map((image) => image.imageUrl)
        .join('\n')
    }
    setInitialFormData(data)
    setLoading(false)
  }, [instrument])

  const onSubmit = (data) => {
    if (!data) return

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
