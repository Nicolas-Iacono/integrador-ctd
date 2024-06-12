import React from 'react'
import { Typography } from '@mui/material'
import CreateWrapper from '../../common/crearProd/createWrapper'
import { useHeaderVisibility } from '../../utils/context/HeaderVisibilityGlobal'
import NewInstrumentForm from '../../Form/NewInstrumentForm'

import '../../styles/crearInstrumento.styles.css'

export const AgregarInstrumento = () => {
  const { isHeaderVisible } = useHeaderVisibility()

  return (
    <main>
      <CreateWrapper isHeaderVisible={isHeaderVisible}>
        <Typography sx={{ fontSize: '35px' }}>Crear Instrumento</Typography>
        <NewInstrumentForm />
      </CreateWrapper>
    </main>
  )
}
