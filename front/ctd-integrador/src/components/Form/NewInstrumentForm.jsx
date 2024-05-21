import InstrumentForm from './InstrumentForm'
import { createInstrument } from '../../api/instruments'

const NewInstrumentForm = () => {
  const initialFormData = {
    idInstrument: '',
    name: '',
    description: '',
    measures: '',
    weight: '',
    rentalPrice: '',
    idCategory: '',
    idTheme: '',
    imageUrlsText: '',
    imageUrls: []
  }

  const onSubmit = (data) => {
    if (!data) return

    createInstrument(data).then((response) => {
      console.log(response)
    })
  }

  return (
    <InstrumentForm initialFormData={initialFormData} onSubmit={onSubmit} />
  )
}

export default NewInstrumentForm
