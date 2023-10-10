import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

export default function ImageAvatar(props) {
  return (
        <Avatar 
        alt={'profile' + props.username} 
        src={props.imagePath} 
        sx={{ width: props.size, height: props.size, bgcolor: deepOrange[500] }}
        >
            {props.username.charAt(0).toUpperCase()}
        </Avatar>
  );
}
