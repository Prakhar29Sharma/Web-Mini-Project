import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getToken } from '../../utils/auth';
import axios from 'axios';
import TinyMCEViewer from '../../components/TinyMCEViewer';
import ReviewForm from '../../components/ReviewForm';
import { Button, Snackbar } from '@mui/material';
import createNotification from '../../utils/notification';
import MuiAlert from '@mui/material/Alert';
import ImageAvatar from '../../components/ImageAvatar';
import BasicRating from '../../components/BasicRating';
import { formatDistance } from 'date-fns'
import './ViewCourse.css';
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

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
    const [ImagePath, setImagePath] = useState('');
    const [courseReviews, setCourseReviews] = useState([]);
    const [sentimentResult, setSentimentResult] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch course details
          const courseResponse = await axios.get('http://localhost:5000/api/courses', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + getToken(),
            },
            params: {
              id: courseId,
            },
          });
    
          setCourse(courseResponse.data.data);
          setUnitData(courseResponse.data.data.unitData);
    
          // Fetch and set author details
          const user = localStorage.getItem('user');
          const username = JSON.parse(user).username;
          await axios.patch('http://localhost:5000/api/student/add_course/' + username, {}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + getToken(),
            },
            params: {
              courseId: courseId,
            },
          });
    
          const authorResponse = await axios.get('http://localhost:5000/api/contributor/' + courseResponse.data.data.authorName, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + getToken(),
            },
          });
    
          if (authorResponse.data.data !== undefined) {
            setAuthorName(authorResponse.data.data.firstName + ' ' + authorResponse.data.data.lastName);
            const profileImagePath = authorResponse.data.data.profileImagePath;
    
            if (profileImagePath === null) {
              setImagePath('http://localhost:5000/assets/profile-image.jpg');
            } else {
              setImagePath('http://localhost:5000/' + profileImagePath.replace('\\', '/').replace('public/', ''));
            }
          }
    
          // Fetch reviews
          const reviewsResponse = await axios.get('http://localhost:5000/api/reviews/' + courseId, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + getToken(),
            },
          });
    
          setCourseReviews(reviewsResponse.data.data);
    
          // Perform sentiment analysis
          const reviewsForAnalysis = reviewsResponse.data.data.map((review) => {
            return { text: review.review, rating: review.rating };
          });
    
          let positiveCount = 0;
          let neutralCount = 0;
          let negativeCount = 0;
    
          reviewsForAnalysis.forEach((review) => {
            const textAnalysis = sentiment.analyze(review.text);
    
            if (review.rating >= 4 || textAnalysis.score > 0.2) {
              positiveCount++;
            } else if (review.rating === 3 || (textAnalysis.score >= -0.2 && textAnalysis.score <= 0.2)) {
              neutralCount++;
            } else {
              negativeCount++;
            }
          });
    
          const totalReviews = reviewsForAnalysis.length;
          const positivePercentage = (positiveCount / totalReviews) * 100;
          const neutralPercentage = (neutralCount / totalReviews) * 100;
          const negativePercentage = (negativeCount / totalReviews) * 100;
    
          setSentimentResult({
            "positives": {
              "count": positiveCount,
              "percentage": positivePercentage.toFixed(2),
            },
            "neutrals": {
              "count": neutralCount,
              "percentage": neutralPercentage.toFixed(2),
            },
            "negatives": {
              "count": negativeCount,
              "percentage": negativePercentage.toFixed(2),
            },
          });
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchData();
    }, [courseId]);
    

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
          createNotification(course.authorName, 'Course Review', `Student ${user.username} has reviewed your course ${course.unitData.unitName}.`)
          setTimeout(() => {
            window.location.href = '/student';
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
        <section className="section">
            <div className="row">
                <div className="col-lg-10">
                    <div className="card">
                        <div className="card-body">

                                <h5 className="card-title" style={{fontSize:'30px'}}>{ unitData.unitName !== undefined ? course.unitData.unitName : null }</h5>

                                <ImageAvatar imagePath={ ImagePath } username="avatar" size="80px" />
                                <p style={{ textAlign: 'left', fontSize: '15px', marginTop: '10px' }}><Link to={`/contributor/${course.authorName}`} target='_blank'>Go to author's profile</Link></p>

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

                                <div style={{height:'25px'}} className="row"></div>

                                {
                                  courseReviews.length > 0 ? (
                                    <>
                                      <hr />
                                      <div className="row">
                                        <h3>Reviews</h3>
                                        {
                                          courseReviews.map((review, index) => {
                                            return (
                                              <div className="review_card" key={index}>
                                                <div className='author_rating'>
                                                  <div className='author_name'>
                                                    <ImageAvatar imagePath={null} username={review.authorName} size='36px' />
                                                    &nbsp;&nbsp;
                                                    <h4>{review.authorName}</h4>
                                                  </div>
                                                  <div className='course_rating'>
                                                    <BasicRating type='read' size='medium' rating={review.rating} />
                                                  </div>
                                                </div>
                                                <div className='author_role'>
                                                    <p style={{ textAlign: 'left' }} >{formatDistance(new Date(review.createdAt), new Date(), {
                                                        addSuffix: true
                                                    })}</p>
                                                    <p>{review.authorRole}</p>
                                                </div>
                                                <div className='course_review'>
                                                  {review.review}
                                                </div>
                                              </div>
                                            );
                                          })
                                        }
                                      </div>
                                      <hr />
                                      <h3>Reviews Sentiment Analysis</h3>
                                      <div className='sentiment-card'>
                                          <p>Positive Reviews: {sentimentResult !== null ? sentimentResult.positives.count + ' (' + sentimentResult.positives.percentage + '%)' : null}</p>
                                          <p>Neutral Reviews: {sentimentResult !== null ? sentimentResult.neutrals.count + ' (' + sentimentResult.neutrals.percentage + '%)' : null}</p>
                                          <p>Negative Reviews: {sentimentResult !== null ? sentimentResult.negatives.count + ' (' + sentimentResult.negatives.percentage + '%)' : null}</p>
                                      </div>
                                    </>
                                  ) : null
                                }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    </>
    );
}