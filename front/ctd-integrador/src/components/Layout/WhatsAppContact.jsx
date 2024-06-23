import { Grid, Box } from '@mui/material'
import React from 'react'
import logo from "../../assets/whatsAppLogo.png"
export const WhatsAppContact = () => {
  const phoneNumber = '+541169366955'; // 
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  return (
    <Box 
    sx={{
      position: 'fixed',
      bottom: 16,
      right: 16,
      backgroundColor: '#00c853',
      borderRadius: "40px 40px 40px 10px",
      boxShadow: 3,
      p: 2,
      zIndex: 1000,
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      cursor:"pointer",
      "&:hover":{
        backgroundColor:"#00e676"
        }
    }}
  >
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
    <img src={logo} alt="logo de whatsapp" style={{ width: 35, height: 35 }} />
    </a>
  </Box>
)
}

export default WhatsAppContact