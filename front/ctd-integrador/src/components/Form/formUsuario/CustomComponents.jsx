import React from 'react'
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export const InputCustom = styled(TextField)({
  
  '& .MuiInputBase-root': {
    color: 'black',
    backgroundColor:"rgba(255, 255, 255, 0.4)"
    
  },
  
  '& .MuiOutlinedInput-root': {
  
    '&.Mui-focused fieldset': {
      borderColor: '#F7E434',
    },
  },
});

export const CustomButton = styled(Button)({
  
  color: 'black',
  backgroundColor: "#F7E434",
  '&:hover': {
    backgroundColor: '#D6C327', // Color cuando el botón está en hover
  },
  '&:active': {
    backgroundColor: '#B8A421', // Color cuando el botón está activo
  },
  
});
