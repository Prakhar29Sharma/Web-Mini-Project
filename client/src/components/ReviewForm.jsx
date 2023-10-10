import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Rating } from '@mui/material';

export default function ReviewForm(props) {

    const [open, setOpen] = React.useState(props.open);
    const [review, setReview] = React.useState('');
    const [rating, setRating] = React.useState(0);

    const handleClose = () => {
        props.onClose();
        setOpen(false);
    }

    const handleSubmit = () => {
        props.onSubmit(rating, review);
        setOpen(false);
    }

  return (
    <div>
      <Dialog 
      fullWidth={"md"}
      maxWidth={"md"}
      open={open} 
      onClose={handleClose}
      >
        <DialogTitle>Rate and Review Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Leave a rating and review for this course.
          </DialogContentText>
          <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              size={"large"}
            />
          <TextField
            autoFocus
            value={review}
            margin="dense"
            id="name"
            label="Course Review"
            placeholder='Tell us about your experience with the course, would you recommend it?'
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setReview(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
