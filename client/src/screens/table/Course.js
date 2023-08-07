import React from 'react'

import Box from '@mui/material/Box';
import Footer from '../global/Footer';

import { Container } from '@mui/material';

export default function Dashboard() {
  return (
    <div>
   
    <Container>
    <Box height={80}/>
    <Box sx={{ display: 'flex' }}>
      
      
      <h3>Course</h3>
      <Box component='main' sx = {{ flexGrow:1,p:3}}>
      hello add content here
      </Box>
      
    </Box>
    
    </Container>
    <Footer/>
  </div>
  )
}
