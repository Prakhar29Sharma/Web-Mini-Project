import React from 'react';
import { Link } from 'react-router-dom';

export default function CourseCard(props) {
    
    const editCourse = () => {     
      console.log(props.courseId);
      window.location.href = `/contributor/edit_course/${props.courseId}`;
    }

    const submitCourse = () => {
      // console.log('submit course : ', props.courseId);
      props.handleCourseSubmit(props.courseId);
      // window.location.href = `/contributor/create_course/`;
    }

    const deleteCourse = () => {
      props.handleCourseDelete(props.courseId)
    }

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
                  <Link to="" onClick={editCourse}>Edit</Link>
                  &nbsp;&nbsp;&nbsp;
                  <Link to="" onClick={deleteCourse}>Delete</Link>
                  &nbsp;&nbsp;
                  <Link to="" onClick={submitCourse}>Submit</Link>
              </div>
            </div>
          </div>
        </div>
    );
}