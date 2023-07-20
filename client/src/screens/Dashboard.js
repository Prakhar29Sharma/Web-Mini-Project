import React from 'react'
import Sidebar2 from '../components/Sidebar2'
import Navbars from '../components/Navbars'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function Dashboard() {
  return (
    <div>
      <Navbars/>
      <Box sx={{ display: 'flex',padding:3 }}>
        <Sidebar2/>
        
        <h3>Dashboard</h3>
        <Box component='main' sx = {{ flexGrow:1,p:3}}>
        hello add content here
        </Box>
        
      </Box>
    
    </div>
  )
}
