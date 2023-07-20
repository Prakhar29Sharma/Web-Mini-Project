import React from 'react'
import Sidebar2 from '../components/Sidebar2'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function Dashboard() {
  return (
    <div>
      <Box sx={{ display: 'flex',padding:3 }}>
        <Sidebar2/>
        
        <h3>Dashboard</h3>
        <Box component='main' sx = {{ flexGrow:1,p:3}}>
        <Typography paragraph >
        Temporary navigation drawers can toggle open or closed. Closed by default, the drawer opens temporarily above all other content until a section is selected.

The Drawer can be cancelled by clicking the overlay or pressing the Esc key. It closes when an item is selected, handled by controlling the open prop.
        </Typography >
        </Box>
        
      </Box>
    
    </div>
  )
}
