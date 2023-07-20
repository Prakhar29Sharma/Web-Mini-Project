import React from 'react'
import Sidebar2 from '../components/Sidebar2'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function Dashboard() {
  return (
    <div>
      <Box sx={{ display: 'flex',padding:3 }}>
        <Sidebar2/>
        
        <h3>Settings</h3>
        <Box component='main' sx = {{ flexGrow:1,p:3}}>
        
        </Box>
        
      </Box>
    
    </div>
  )
}
