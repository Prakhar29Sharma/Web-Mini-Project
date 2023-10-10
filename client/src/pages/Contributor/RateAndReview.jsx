import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getToken } from '../../utils/auth';
import axios from 'axios';
import PageTitle from '../../components/PageTitle';
import "./ViewCourse.modules.css";
import TinyMCEViewer from '../../components/TinyMCEViewer';
import ReviewForm from '../../components/ReviewForm';
import { Button, Snackbar } from '@mui/material';
import createNotification from '../../utils/notification';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ViewCourse() {

    const params = useParams();

    const { courseId } = params;

    const [course, setCourse] = useState('');
    const [unitData, setUnitData] = useState({});
    const [authorName, setAuthorName] = useState('');
    const [viewRateAndReview, setViewRateAndReview] = useState(false);
    const [viewRateAndReviewButton, setViewRateAndReviewButton] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await axios.get('http://localhost:5000/api/courses', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken(),
                },
                params: {
                    id: courseId,
                },
            });
            await setCourse(response.data.data);
            await setUnitData(response.data.data.unitData);
        };
        fetchCourses();
        const fetchUsersName = async () => {
          const response = await axios.get('http://localhost:5000/api/contributor/' + course.authorName, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + getToken(), 
            },
          });
          if (response.data.data !== undefined) {
            setAuthorName(response.data.data.firstName + ' ' + response.data.data.lastName);
          }
        }
        fetchUsersName();
    }, [courseId, course.authorName]);

    function handleReviewFormSubmit (rating, review) {
      // courseId, authorId, authorName, authorRole, rating, review
      const profileData = JSON.parse(localStorage.getItem('profileData'));
      const user = JSON.parse(localStorage.getItem('user'));
      const author = profileData.firstName + ' ' + profileData.lastName;
      const authorId = profileData._id;
      const authorRole = user.role;
      const courseId = course._id;
      const data = {
        "courseId": courseId,
        "authorId": authorId,
        "authorName": author,
        "authorRole": authorRole,
        "rating": rating,
        "review": review,
      }
      console.log(data);
      axios.post('http://localhost:5000/api/reviews', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getToken(), 
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === 'ok') {
          setViewRateAndReviewButton(false);
          createNotification(course.authorName, 'Course Review', 'A new review has been submitted for your course. Please check your dashboard.')
          setTimeout(() => {
            window.location.href = '/contributor/view_others_contribution';
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
      setViewRateAndReview(false);
    }

    function handleReviewFormClose () {
      setViewRateAndReview(false);
    }

    return (
      <>
        { viewRateAndReview ? <ReviewForm open={true} onSubmit={handleReviewFormSubmit} onClose={handleReviewFormClose} /> : null }
        <main id="main" className="main">

        <PageTitle title="Rate and Review Course" />

        <section className="section">
            <div className="row">
                <div className="col-lg-10">
                    <div className="card">
                        <div className="card-body">

                                <h5 className="card-title" style={{fontSize:'30px'}}>{ unitData.unitName !== undefined ? course.unitData.unitName : null }</h5>

                                <div style={{height:'25px'}} className="row"></div>

                                <p style={{ textAlign: 'left', fontSize: '15px' }} ><span style={{ fontWeight: 'bold' }}>Author: </span> {authorName !== undefined ? authorName : null }</p>

                                <div style={{height:'25px'}} className="row"></div>

                                <div className="row mb-3">
                                  <label htmlFor="subject" className="col-sm-2 col-form-label">Subject</label>
                                  <div className="col-sm-10">
                                    {course.subjectData !== undefined ? course.subjectData.subjectName : "" }
                                  </div>
                                </div>

                                <div style={{height:'25px'}} className="row"></div>

                                <div className="row mb-3">
                                  <label htmlFor="unit" className="col-sm-2 col-form-label">Unit</label>
                                  <div className="col-sm-10">
                                    { unitData.unitName !== undefined ? unitData.unitName : null }
                                  </div>
                                </div>

                                <div style={{height:'25px'}} className="row"></div>

                                <div className="row mb-3">
                                  <label htmlFor="course_desc" className="col-sm-2 col-form-label">Course Description</label>
                                  <div className="col-sm-10">
                                    {unitData.unitDescription !== undefined ? unitData.unitDescription : null }
                                  </div>
                                </div>

                                <div style={{height:'25px'}} className="row"></div>

                                <div className="row mb-3">
                                  <label htmlFor="course_objectives" className="col-sm-2 col-form-label">Course Objectives</label>
                                  <div className="col-sm-10">
                                    <ul>
                                      {
                                        unitData.unitObjectives !== undefined ? unitData.unitObjectives.map((objective, index) => {
                                          return (
                                            <li key={index}>
                                              {objective}
                                            </li>
                                          );
                                        }) : ""
                                      }
                                    </ul>
                                  </div>
                                </div>

                                <div className="row mb-3">
                                  <label htmlFor="course_prerequisites" className="col-sm-2 col-form-label">Course Prerequisites</label>
                                  <div className="col-sm-10">
                                    <ul>
                                      {
                                        unitData.unitPrerequisites !== undefined ? unitData.unitPrerequisites.map((prereq, index) => {
                                          return (
                                            <li key={index}>
                                              {prereq}
                                            </li>
                                          );
                                        }) : ""
                                      }
                                    </ul>
                                  </div>
                                </div>

                                <div style={{height:'25px'}} className="row"></div>

                                <hr />

                                {
                                    course.courseVideoPath !== undefined && course.courseVideoPath !== '' ? (
                                        <>
                                        <video width="800px" height="500px" controls="controls">
                                            <source src={'http://localhost:5000/' + course.courseVideoPath.replace(/\\/g, '/').replace('public/', '').replace(/ /g, '%20')} type="video/mp4" />
                                        </video>
                                        </>
                                    ) : null
                                }

                                <hr />

                                {
                                    course.coursePdfPath !== undefined && course.coursePdfPath[0] !== undefined  ? (
                                        <>
                                        <iframe title='course_pdf' src={'http://localhost:5000/' + course.coursePdfPath[0].replace(/\\/g, '/').replace('public/', '').replace(/ /g, '%20')} 
                                        width="800"
                                        height="500">
                                        </iframe>
                                        </>
                                    ) : null
                                }

                                <hr />

                                <div className="row">
                                    <div className="col-lg-3 col-md-4 label" style={{fontSize: '20px'}}>Notes</div>
                                    <div className="col-lg-9 col-md-8">
                                    {/* <SafeHTML className={"space-y-2 sm:space-y-4"} >
                                    { course.courseContent !== undefined ? course.courseContent : null }
                                    </SafeHTML> */}
                                    </div>
                                </div>
                                <br />

                                <TinyMCEViewer initialContent={course.courseContent !== undefined ? course.courseContent : null} />

                                <div style={{height:'25px'}} className="row"></div>

                                <div className="row">
                                <div className="col-lg-3 col-md-4 label" style={{fontSize: '20px'}}>Rate and review this content</div>
                                    <div className="col-lg-9 col-md-8">
                                      {
                                        viewRateAndReviewButton ? (
                                          <Button variant="contained" onClick={() => {setViewRateAndReview(true)}} >Rate and Review</Button>
                                        ) : (
                                          <Snackbar open={true} autoHideDuration={2000} onClose={() => {}}>
                                            <Alert onClose={() => {}} severity="success" sx={{ width: '100%' }}>
                                              Course Review Submitted Successfully!
                                            </Alert>
                                          </Snackbar>
                                        )
                                      }
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    </>
    );
}