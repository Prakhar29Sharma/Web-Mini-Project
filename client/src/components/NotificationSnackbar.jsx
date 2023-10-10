import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PositionedSnackbar(props) {

    const [open, setOpen] = React.useState(props.open);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar
        autoHideDuration={5000}
        anchorOrigin={{ vertical:'bottom', horizontal:'right' }}
        open={open}
        onClose={handleClose}
        key={'bottomright'}
        >
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>{props.message}</Alert>
        </Snackbar>
    );
}
