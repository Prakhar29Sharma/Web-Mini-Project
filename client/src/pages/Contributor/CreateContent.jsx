import React, { useEffect, useState } from 'react';
import { Form, useParams } from 'react-router-dom';
import TinyEditor from '../../components/TinyEditor';
import axios from 'axios';
import { getToken } from '../../utils/auth';

export default function CreateContent() {
    
    const params = useParams();
    
    const { subject, unit } = params;

    const [content, setContent] = useState('');

    // useEffect(() => {
    //   axios.get('http://localhost:5000/api/units/', {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': 'Bearer ' + getToken(),
    //     } 
    //   })
    //   .then((response) => {
    //     const units = response.data.units;
    //     const unit = units.find((unit) => unit.unitName === params.unit);
    //     // console.log(unit);
    //     if (unitData == "") {
    //       setUnitData(unit);
    //       console.log(unitData);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    // }, []);
    
    return (
        <main className='main' id='main'>
            <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Create Course</h5>

                            <Form method="post" encType="multipart/form-data" action=''>
                                <div className="row mb-3">
                                  <label htmlFor="subject" className="col-sm-2 col-form-label">Subject</label>
                                  <div className="col-sm-10">
                                    <input name="subject" id="subject" type="text" className="form-control" value={subject} disabled />
                                  </div>
                                </div>

                                <div className="row mb-3">
                                  <label htmlFor="unit" className="col-sm-2 col-form-label">Unit</label>
                                  <div className="col-sm-10">
                                    <input name="unit" id="unit" type="text" className="form-control" value={unit} disabled />
                                  </div>
                                </div>

                                <div className="row mb-3">
                                  <label htmlFor="course_desc" className="col-sm-2 col-form-label">Course Description</label>
                                  <div className="col-sm-10">
                                    <textarea className="form-control" style={{height: "100px"}} disabled>{"hi this is description section"}</textarea>
                                  </div>
                                </div>

                                <div className="row mb-3">
                                  <label htmlFor="course_objectives" className="col-sm-2 col-form-label">Course Objectives</label>
                                  <div className="col-sm-10">
                                    <ul>
                                      {
                                        // unitData.unitObjectives.map((objective, index) => {
                                        //   return (
                                        //     <li key={index}>
                                        //       {objective}
                                        //     </li>
                                        //   );
                                        // })
                                      }
                                    </ul>
                                  </div>
                                </div>

                                <div className="row mb-3">
                                  <label htmlFor="course_prerequisites" className="col-sm-2 col-form-label">Course Prerequisites</label>
                                  <div className="col-sm-10">
                                    <ul>
                                      {
                                        // unitData.unitPrerequisites.map((objective, index) => {
                                        //   return (
                                        //     <li key={index}>
                                        //       {objective}
                                        //     </li>
                                        //   );
                                        // })
                                      }
                                    </ul>
                                  </div>
                                </div>

                                <div className="row mb-3">
                                  <label htmlFor="course_video" className="col-sm-2 col-form-label">Course Video</label>
                                  <div className="col-sm-10">
                                    <input name="course_video" id="course_video" type="file" accept="video/*" className="form-control" />
                                  </div>
                                </div>

                                <div className="row mb-3">
                                  <label htmlFor="course_pdf" className="col-sm-2 col-form-label">Course PDF</label>
                                  <div className="col-sm-10">
                                    <input name="course_pdf" id="course_pdf" type="file" accept="pdf/*" className="form-control" />
                                  </div>
                                </div>

                                <div className="row mb-3">
                                  <div className="col-sm-10">
                                  <TinyEditor fetchContent={(content) => {setContent(content)}} />
                                  <input type="hidden" name="course_content" value={content} />
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

export async function action({request}) {
  const form = await request.formData();
  const formToJSON = {};
  for (const [key, value] of [...form.entries()]) {
      formToJSON[key] = value;
  }
  console.log(formToJSON);
  console.log(formToJSON['objectives[0]']);
  return null;
}