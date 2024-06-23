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
      width:"70px",
      height:"70px",
      backgroundColor: '#00c853',
      borderRadius: "70px 70px 70px 20px",
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
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ display:"flex",}}>
    <img src={logo} alt="logo de whatsapp" style={{ width: 45, height: 45 }} />
    </a>
  </Box>
)
}

export default WhatsAppContact