import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import BasicRating from '../../components/BasicRating';

export default function ActionAreaCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
        <Link to={`/${props.role}/course/${props.courseId}`}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={ 'http://localhost:5000/' + props.imagePath.replace('\\', '/').replace('public/', '').replace(/\\/g, '/') }
          alt="course card"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          { `${props.unitName} | ${props.subjectName}` }
          </Typography>
          <Typography style={{ textAlign: 'left' }} variant="body2" color="text.secondary">
          {props.unitDescription}
          </Typography>
          <hr />
          <BasicRating type='read' size='medium' rating={props.rating !== undefined ? props.rating : 0 } />
        </CardContent>
      </CardActionArea>
      </Link>
    </Card>
  );
}