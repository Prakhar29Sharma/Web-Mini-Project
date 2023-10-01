import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getToken } from '../../utils/auth';
import axios from 'axios';
import PageTitle from '../../components/PageTitle';
// import { SafeHTML } from '../../components/SafeHTML';
import "./ViewCourse.modules.css";
import TinyMCEViewer from '../../components/TinyMCEViewer';

export default function ViewCourse() {

    const params = useParams();

    const { courseId } = params;

    const [course, setCourse] = useState('');
    const [unitData, setUnitData] = useState({});

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
    });

    return (
        <main id="main" className="main">

        <PageTitle title="View Course" />

        <section className="section">
            <div className="row">
                <div className="col-lg-10">
                    <div className="card">
                        <div className="card-body">

                                <h5 className="card-title" style={{fontSize:'30px'}}>{ unitData.unitName !== undefined ? course.unitData.unitName : null }</h5>

                                <div style={{height:'25px'}} className="row"></div>

                                <p>Author: {course.authorName !== undefined ? course.authorName : null }</p>

                                <div style={{height:'25px'}} className="row"></div>

                                <div classNameName="row mb-3">
                                  <label htmlFor="subject" classNameName="col-sm-2 col-form-label">Subject</label>
                                  <div classNameName="col-sm-10">
                                    {course.subjectData !== undefined ? course.subjectData.subjectName : "" }
                                  </div>
                                </div>

                                <div style={{height:'25px'}} className="row"></div>

                                <div classNameName="row mb-3">
                                  <label htmlFor="unit" classNameName="col-sm-2 col-form-label">Unit</label>
                                  <div classNameName="col-sm-10">
                                    { unitData.unitName !== undefined ? unitData.unitName : null }
                                  </div>
                                </div>

                                <div style={{height:'25px'}} className="row"></div>

                                <div classNameName="row mb-3">
                                  <label htmlFor="course_desc" classNameName="col-sm-2 col-form-label">Course Description</label>
                                  <div classNameName="col-sm-10">
                                    {unitData.unitDescription !== undefined ? unitData.unitDescription : null }
                                  </div>
                                </div>

                                <div style={{height:'25px'}} className="row"></div>

                                <div classNameName="row mb-3">
                                  <label htmlFor="course_objectives" classNameName="col-sm-2 col-form-label">Course Objectives</label>
                                  <div classNameName="col-sm-10">
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

                                <div classNameName="row mb-3">
                                  <label htmlFor="course_prerequisites" classNameName="col-sm-2 col-form-label">Course Prerequisites</label>
                                  <div classNameName="col-sm-10">
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    );
}