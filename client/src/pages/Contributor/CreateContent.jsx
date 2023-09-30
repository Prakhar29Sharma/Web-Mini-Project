import React, { useEffect, useState } from 'react';
import { Form, useParams } from 'react-router-dom';
import TinyEditor from '../../components/TinyEditor';
import axios from 'axios';
import { getToken } from '../../utils/auth';

export default function CreateContent() {
    
    const params = useParams();
    
    //eslint-disable-next-line
    const { subject, unit } = params;

    const [content, setContent] = useState('');

    const [unitData, setUnitData] = useState({});

    // eslint-disable-next-line
    const [subjectCode, setSubjectCode] = useState('');

    const [subjectCodeHiddenField, setSubjectCodeHiddenField] = useState('');
    const [unitNumberHiddenField, setUnitNumberHiddenField] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        try {
          const subjectName = params.subject.replace(' ', '%20');
          const subjectResponse = await axios.get(`http://localhost:5000/api/subjects/name/${subjectName}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + getToken(),
            }
          });

          const subjectData = subjectResponse.data.subject;

          setSubjectCode(subjectData.subjectCode);
          setSubjectCodeHiddenField(subjectData.subjectCode);

          if (subjectData.subjectCode) {
            const unitResponse = await axios.get(`http://localhost:5000/api/units/${subjectData.subjectCode}/${params.unit}`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
              }
            });

            setUnitData(unitResponse.data.unit);
            setUnitNumberHiddenField(unitResponse.data.unit.unitNumber);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }, [params.subject, params.unit]);
    
    return (
        <main className='main' id='main'>
            <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Create Course</h5>

                            <Form method="post" action="" encType="multipart/form-data">
                                <div className="row mb-3">
                                  <label htmlFor="subject" className="col-sm-2 col-form-label">Subject</label>
                                  <div className="col-sm-10">
                                    {subject}
                                  </div>
                                  <input type='hidden' name='subjectCode' value={subjectCodeHiddenField} onChange={(e) => {setSubjectCodeHiddenField(e.target.value)}}/>
                                </div>

                                <div className="row mb-3">
                                  <label htmlFor="unit" className="col-sm-2 col-form-label">Unit</label>
                                  <div className="col-sm-10">
                                    {unitData.unitName}
                                  </div>
                                  <input type='hidden' name='unitNumber' value={unitNumberHiddenField} onChange={(e) => {setUnitNumberHiddenField(e.target.value)}}/>
                                </div>

                                <div className="row mb-3">
                                  <label htmlFor="course_desc" className="col-sm-2 col-form-label">Course Description</label>
                                  <div className="col-sm-10">
                                    {unitData.unitDescription}
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
                                  <label htmlFor="courseVideo" className="col-sm-2 col-form-label">Upload course video</label>
                                  <div className="col-sm-10">
                                    <input name="courseVideo" id="courseVideo" type="file" accept="video/*" className="form-control" />
                                  </div>
                                </div>

                                <div className="row mb-3">
                                  <label htmlFor="coursePDFs" className="col-sm-2 col-form-label">Upload course PDFs</label>
                                  <div className="col-sm-10">
                                    <input name="coursePDFs" id="coursePDFs" type="file" accept=".pdf" multiple className="form-control" />
                                  </div>
                                </div>

                                <div className="row mb-3">
                                  <div className="col-sm-10">
                                  <TinyEditor initialContent="<p>This is initial content</p>" fetchContent={(content) => {setContent(content)}} />
                                  <input type="hidden" name="courseContent" value={content} />
                                  </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </main>
    );
}

export async function loader() {
  return null;
}

export async function action({request}) {
  const user = localStorage.getItem('user');
  const username = JSON.parse(user).username;
  const form = await request.formData();
  const formToJSON = {};
  for (const [key, value] of [...form.entries()]) {
      formToJSON[key] = value;
  }
  formToJSON['authorName'] = username;
  console.log(formToJSON);
  axios.post('http://localhost:5000/api/courses/', formToJSON, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": 'Bearer ' + getToken(),
    }
  })
  .then((response) => {
    console.log(response);
    if (response.status === 'ok') {
      window.location.href = '/contributor';
    }
  })
  .catch((error) => {
    console.log(error);
  })
  return null;
}