import React from 'react'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'; // Grid version 1
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Footer from '../global/Footer';

export default function Dashboard() {
  return (
    <div>
      
     
      <Box sx={{ display: 'flex' }}>
       

        <Box component='main' sx={{ flexGrow: 1, p: 5 }}>
          <h3>Dashboard</h3>
          <Box height={30} />
          <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
        
         
          <Grid container spacing={10}>
            
              <Grid item xs={8}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                     Contributors 
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Display number of contributors
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>



              <Grid item xs={8}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Evaluators
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Display number of Evaluators
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={8}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Students
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Display number of Students
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            
          </Grid>
          </Stack>
        </Box>

      </Box>
      <Footer/>

    </div>
  )
}
