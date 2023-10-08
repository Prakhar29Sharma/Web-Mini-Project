import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
// import Typography from '@mui/material/Typography';

export default function BasicRating(props) {
  const [value, setValue] = React.useState(3);

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    > {
        props.type === 'read' ? (
          <>
            <Rating
              precision={0.5}
              name="simple-controlled"
              readOnly
              value={props.rating}
              size={props.size}
            />
          </>
        ) : (
          <>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              size={props.size}
            />
          </>
        )
      }
      
      {/* <Typography component="legend">Read only</Typography>
      <Rating name="read-only" size='large' value={value} readOnly />
      <Typography component="legend">Disabled</Typography>
      <Rating name="disabled" size='large' value={value} disabled />
      <Typography component="legend">No rating given</Typography>
      <Rating name="no-value" size='large' value={null} /> */}
    </Box>
  );
}