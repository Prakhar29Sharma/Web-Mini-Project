import { React, useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Form, useParams } from 'react-router-dom';
import { getToken } from '../../utils/auth';
import axios from 'axios';

export default function SetSubject() {
  const {dept, year, sem}=useParams()
  const [subject, setSubject] = useState('');
  const [subjectcode, setSubjectcode] = useState('');
  const [subjecttype, setSubjecttype] = useState('');
  

  // console.log('Department:', department);
  // console.log('Year:', year);
  // console.log('Semester:', sem);

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };
  const handleSubjectCodeChange = (e) => {
    setSubjectcode(e.target.value);
  };
  const handleSubjectTypeChange = (e) => {
    setSubjecttype(e.target.value);
  };
  
  
  return (
    <div>
      <main id="main" className="main">
        <PageTitle title="Create profile" />
        <section className="section">
          <div className="row">
            <div className="col-lg-10 col-md-10 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Set Syllabus</h5>
                  <Form method="post" action="" encType="multipart/form-data">
                    
                  <input type="hidden" name="dept" value={dept} />
                  <input type="hidden" name="year" value={year} />
                  <input type="hidden" name="sem" value={sem} />


                    <div className="row mb-3">
                      <label htmlFor="subject" className="col-sm-2 col-form-label">
                        Subject
                      </label>
                      <div className="col-sm-10">
                        <input
                          name="subject"
                          id="subject"
                          type="text"
                          className="form-control"
                          onChange={handleSubjectChange}
                          value={subject}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="subjectcode"
                       className="col-sm-2 col-form-label"
                       >
                        Subject-Code
                      </label>
                      <div className="col-sm-10">
                        <input
                          name="subjectcode"
                          id="subjectcode"
                          type="text"
                          className="form-control"
                          value={subjectcode}
                          onChange={handleSubjectCodeChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="subjecttype"  
                      className="col-sm-2 col-form-label">
                        Subject-Type
                      </label>
                      <div className="col-sm-10">
                        <input
                          name="subjecttype"
                          id="subjecttype"
                          type="text"
                          className="form-control"
                          value={subjecttype}
                          onChange={handleSubjectTypeChange}
                        />
                      </div>
                    </div>
                    
                    <div className="row mb-3">
                      <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Submit Form</button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export async function action({ request }) {
  const form = await request.formData();
  const formToJSON = {};
 

  for (const [key, value] of [...form.entries()]) {
    formToJSON[key] = value;
  }

  const subject = formToJSON.subject;
  
  console.log(formToJSON)
  // apicall post method
  axios.post('http://localhost:5000/api/subjects/createSubject',formToJSON,{
    headers:{
      'Content-Type':'application/json',
      'Authorization':'Bearer'+getToken(),
    }
  })
  // redirect 
  .then((response)=>{
    const { department, year, sem, subject } = formToJSON
    console.log(response)
  window.location.href=`/admin/syllabus/{department}/${subject}`;
 })
 .catch((error) => {
  console.log(error);
})
  return null;
}