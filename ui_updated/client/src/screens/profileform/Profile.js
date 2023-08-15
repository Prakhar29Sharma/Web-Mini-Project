import React from 'react'
import Box from '@mui/material/Box';


export default function Dashboard() {
  return (
    <div>
    
    <Box height={80}/>
    <Box sx={{ display: 'flex' }}>
      
      
      <h3>Profile</h3>
      <Box component='main' sx = {{ flexGrow:1,p:3}}>
      hello add content here
      </Box>
      
    </Box>
   
  </div>
  )
}
