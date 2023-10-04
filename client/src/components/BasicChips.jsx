import * as React from 'react';
import Chip from '@mui/material/Chip';

export default function BasicChips(props) {
  return (
    <>
      <Chip label={props.label} /> &nbsp;
    </>
  );
}