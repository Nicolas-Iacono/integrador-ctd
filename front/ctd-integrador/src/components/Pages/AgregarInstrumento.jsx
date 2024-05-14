import React from 'react'
import styles from '../styles/crearInstrumento.module.css'
import MainWrapper from '../common/MainWrapper'
import FormWrapper from '../common/crearProd/FormWrapper'
import { Grid, Box, Typography } from '@mui/material'
import CreateWrapper from '../common/crearProd/createWrapper'
import { useHeaderVisibility } from '../utils/context/HeaderVisibilityGlobal'
import NewInstrumentForm from '../Form/NewInstrumentForm'

export const AgregarInstrumento = () => {
  const { isHeaderVisible } = useHeaderVisibility()

  return (
    <CreateWrapper isHeaderVisible={isHeaderVisible}>
      <FormWrapper>
        <Typography sx={{ fontSize: '35px' }}>Crear Instrumento</Typography>
        <Grid
          sx={{
            width: '80%',
            height: '70%',
            border: '3px solid black',
            borderRadius: '10px',
          }}
        >
          <NewInstrumentForm />
        </Grid>
      </FormWrapper>
    </CreateWrapper>
  )
}

export default AgregarInstrumento
