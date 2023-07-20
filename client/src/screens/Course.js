import React from 'react'
import Sidebar2 from '../components/Sidebar2'
import Box from '@mui/material/Box';

import Navbars from '../components/Navbars';

export default function Dashboard() {
  return (
    <div>
    <Navbars/>
    <Box height={80}/>
    <Box sx={{ display: 'flex' }}>
      <Sidebar2/>
      
      <h3>Course</h3>
      <Box component='main' sx = {{ flexGrow:1,p:3}}>
      hello add content here
      </Box>
      
    </Box>
  
  </div>
  )
}
