import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getToken } from '../../utils/auth';
import axios from 'axios';
import PageTitle from '../../components/PageTitle';
// import { SafeHTML } from '../../components/SafeHTML';
import "./ViewCourse.modules.css";
import TinyMCEViewer from '../../components/TinyMCEViewer';
import ImageAvatar from '../../components/ImageAvatar';

export default function ViewCourse() {

    const params = useParams();

    const { courseId } = params;

    const [course, setCourse] = useState('');
    const [unitData, setUnitData] = useState({});
    const [authorName, setAuthorName] = useState('');
    const [ImagePath, setImagePath] = useState('');
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
            const profileImagePath = response.data.data.profileImagePath;
            if (profileImagePath === null) {
            setImagePath('http://localhost:5000/assets/profile-image.jpg');
            } else {
            setImagePath('http://localhost:5000/' + profileImagePath.replace('\\', '/').replace('public/', ''));
            return;
            }
          }
        }
        fetchUsersName();
    }, [courseId, course.authorName]);

    return (
        <main id="main" className="main">

        <PageTitle title="View Course" />

        <section className="section">
            <div className="row">
                <div className="col-lg-10">
                    <div className="card">
                        <div className="card-body">

                                <h5 className="card-title" style={{fontSize:'30px'}}>{ unitData.unitName !== undefined ? course.unitData.unitName : null }</h5>
                                <ImageAvatar imagePath={ ImagePath } username="avatar" size="80px" />
                                <p style={{ textAlign: 'left', fontSize: '15px', marginTop: '10px' }}><Link to={`/contributor/${course.authorName}`} target='_blank'>Go to author's profile</Link></p>
                                <p style={{ textAlign: 'left', fontSize: '15px', marginTop: '10px' }} ><span style={{ fontWeight: 'bold' }}>Author: </span> {authorName !== undefined ? authorName : null }</p>

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

                                {
                                    course.courseVideoPath !== undefined && course.courseVideoPath !== '' ? (
                                        <>
                                        <hr />
                                        <video width="800px" height="500px" controls="controls">
                                            <source src={'http://localhost:5000/' + course.courseVideoPath.replace(/\\/g, '/').replace('public/', '').replace(/ /g, '%20')} type="video/mp4" />
                                        </video>
                                        </>
                                    ) : null
                                }


                                {
                                    course.coursePdfPath !== undefined && course.coursePdfPath[0] !== undefined  ? (
                                        <>
                                        <hr />
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    );
}