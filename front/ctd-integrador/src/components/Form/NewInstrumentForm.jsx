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
    imageUrls: [],
    characteristics: {
      instrumentCase: false,
      support: false,
      tuner: false,
      microphone: false,
      phoneHolder: false
    }
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
