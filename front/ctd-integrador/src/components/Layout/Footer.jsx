import React from 'react'
import { FooterWrapper } from './FooterWrapper'
import Copyright from './Copyright'
import { Typography } from '@mui/material'

export const Footer = () => {
  return (
    <FooterWrapper>
      <Copyright>
        <Typography
          sx={{ fontSize: { md: '40px', xs: '50px' }, color: 'white' }}
        >
          ©
        </Typography>
        <Typography
          sx={{ fontSize: { md: '40px', xs: '20px' }, color: 'white' }}
        >
          2024 MusicHouse
        </Typography>
      </Copyright>
    </FooterWrapper>
  )
}

export default Footer
