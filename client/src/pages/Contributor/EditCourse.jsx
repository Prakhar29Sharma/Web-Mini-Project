import React, { useEffect, useState } from 'react';
import { Form, useParams } from 'react-router-dom';
import { getToken } from '../../utils/auth';
import axios from 'axios';
import TinyEditor from '../../components/TinyEditor';

export default function EditCourse() {

    const params = useParams();

    const [content, setContent] = useState('');

    const [unitData, setUnitData] = useState({});

    const [course, setCourse] = useState({});

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await axios.get('http://localhost:5000/api/courses', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken(),
                },
                params: {
                    id: params.courseId,
                },
            });
            await setCourse(response.data.data);
            await setUnitData(response.data.data.unitData);
        };
        fetchCourses();
    }, [params])

    return (
        <main className='main' id='main'>
            <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Edit Course</h5>
                            <br />
                            <div className="row mb-3">
                                { 
                                course.unitData !== undefined ? (
                                    <img src={ 'http://localhost:5000/' + course.unitData.unitImagePath.replace(/\\/g, '/').replace('public/', '').replace(/ /g, '%20') } style={{ width: '600px' }} alt='course thumbnail'/>
                                ) : null 
                                }
                                
                            </div>

                            <Form method="post" action="" encType="multipart/form-data">
                                <input type='hidden' name='courseId' value={course._id}/>
                                <div className="row mb-3">
                                  <label htmlFor="subject" className="col-sm-2 col-form-label">Subject</label>
                                  <div className="col-sm-10">
                                    {course.subjectData !== undefined ? course.subjectData.subjectName : "" }
                                  </div>
                                  {/* <input type='hidden' name='subjectCode' value={subjectCodeHiddenField} onChange={(e) => {setSubjectCodeHiddenField(e.target.value)}}/> */}
                                </div>

                                <div className="row mb-3">
                                  <label htmlFor="unit" className="col-sm-2 col-form-label">Unit</label>
                                  <div className="col-sm-10">
                                    { course.unitData ? course.unitData.unitName : "" }
                                  </div>
                                  {/* <input type='hidden' name='unitNumber' value={unitNumberHiddenField} onChange={(e) => {setUnitNumberHiddenField(e.target.value)}}/> */}
                                </div>

                                <div className="row mb-3">
                                  <label htmlFor="course_desc" className="col-sm-2 col-form-label">Course Description</label>
                                  <div className="col-sm-10">
                                    {course.unitData ? course.unitData.unitDescription : "" }
                                  </div>
                                </div>

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

                                
                                <div className="row mb-3">
                                  <div className="col-sm-10">
                                  <TinyEditor initialContent={course.courseContent !== undefined ? course.courseContent : "" } buttonText="Update Content" fetchContent={(content) => {setContent(content)}} />
                                  <input type="hidden" name="courseContent" value={content} />
                                  </div>
                                </div>

                                {/* <div className="row mb-3">
                                  <label htmlFor="courseVideo" className="col-sm-2 col-form-label">Upload course video</label>
                                  <div className="col-sm-10">
                                    <input name="courseVideo" id="courseVideo" type="file" accept="video/*" className="form-control" />
                                  </div>
                                </div> */}

                                <hr />

                                {
                                    course.courseVideoPath !== undefined ? (
                                        <>
                                        <video width="800px" height="500px" controls="controls">
                                            <source src={'http://localhost:5000/' + course.courseVideoPath.replace(/\\/g, '/').replace('public/', '').replace(/ /g, '%20')} type="video/mp4" />
                                        </video>
                                        </>
                                    ) : null
                                }

                                <hr />

                                {
                                    course.coursePdfPath !== undefined ? (
                                        <>
                                        <iframe title='course_pdf' src={'http://localhost:5000/' + course.coursePdfPath[0].replace(/\\/g, '/').replace('public/', '').replace(/ /g, '%20')} 
                                        width="800"
                                        height="500">
                                        </iframe>
                                        </>
                                    ) : null
                                }

                                <hr />

                                <br />

                                {/* <div className="row mb-3">
                                  <label htmlFor="coursePDFs" className="col-sm-2 col-form-label">Upload course PDFs</label>
                                  <div className="col-sm-10">
                                    <input name="coursePDFs" id="coursePDFs" type="file" accept=".pdf" multiple className="form-control" />
                                  </div>
                                </div> */}
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </main>
    );
}

export async function action({request}) {
    const form = await request.formData();
    const formToJSON = {};
    for (const [key, value] of [...form.entries()]) {
        formToJSON[key] = value;
    }
    console.log(formToJSON);
    axios.patch(`http://localhost:5000/api/courses/${formToJSON.courseId}`, {}, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + getToken(),
      },
      params: {
        courseContent: formToJSON.courseContent,
      }
    })
    .then((response) => {
      console.log(response);
      window.location.href = '/contributor/edit_course/' + formToJSON.courseId;
    })
    .catch((error) => {
      console.log(error);
    })
    return null;
  }