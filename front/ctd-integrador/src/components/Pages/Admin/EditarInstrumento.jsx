import React from 'react'
import { useParams } from 'react-router-dom'
import CreateWrapper from '../../common/crearProd/createWrapper'
import { Typography } from '@mui/material'
import { useHeaderVisibility } from '../../utils/context/HeaderVisibilityGlobal'
import EditInstrumentForm from '../../Form/EditInstrumentForm'

import '../../styles/crearInstrumento.styles.css'

export const EditarInstrumento = () => {
  const { isHeaderVisible } = useHeaderVisibility()
  const { id } = useParams()

  return (
    <main>
      <CreateWrapper isHeaderVisible={isHeaderVisible}>
        <Typography sx={{ fontSize: '35px' }}>Editar Instrumento</Typography>
        <EditInstrumentForm id={id} />
      </CreateWrapper>
    </main>
  )
}
