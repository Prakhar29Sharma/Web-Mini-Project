import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../utils/auth';
import BasicRating from './BasicRating';

export default function RateCourseCard(props) {

    const [authorName, setAuthorName] = useState('');

    useEffect(() => {
      const fetchUsersName = async () => {
        const response = await axios.get('http://localhost:5000/api/contributor/' + props.authorName, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken(), 
          },
        });
        setAuthorName(response.data.data.firstName + ' ' + response.data.data.lastName);
      }
      fetchUsersName();
    }, [props.authorName])
    
    return (
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4" style={{ backgroundSize: 'cover' }}>
              <img src={ 'http://localhost:5000/' + props.imagePath.replace('\\', '/').replace('public/', '').replace(/\\/g, '/') } className="img-fluid rounded-start" alt="course" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{ props.unitName }</h5>
                <hr />
                <p style={{ fontSize: '15px', textAlign: 'left' }} className="card-text"><span>{props.subjectName}</span></p>
                <p className="card-text" style={{ fontSize: "15px", textAlign: 'left' }}>{props.unitDescription}</p>
                <p className="card-text" style={{ fontSize: "15px", textAlign: 'left' }}><span>Author: </span> {authorName}</p>
                <p style={{ fontSize: '13px', textAlign: 'left' }}><span style={{ fontWeight: 'bold' }}>Status: </span>{props.status}</p>
                <BasicRating type='read' size='medium' rating={props.rating !== undefined ? props.rating : 0 } />
                <Link to={`/contributor/rate_and_review/${props.courseId}`}>Review and Rate</Link>
              </div>
            </div>
          </div>
        </div>
    );
}