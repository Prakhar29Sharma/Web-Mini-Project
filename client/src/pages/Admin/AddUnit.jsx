import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getToken } from '../../utils/auth';
import { Form } from 'react-router-dom';

export default function AddUnit() {

    const [subjects, setSubjects] = useState([]);
    const [subjectCode, setSubjectCode] = useState('');

    const [objectives, setObjectives] = useState(['']);
    const [prerequisites, setPrerequisites] = useState(['']);

    const addObjectiveField = () => {
      setObjectives([...objectives, '']);
    };

    const removeObjectiveField = (index) => {
      const updatedObjectives = [...objectives];
      updatedObjectives.splice(index, 1);
      setObjectives(updatedObjectives);
    };

    const addPrerequisiteField = () => {
      setPrerequisites([...prerequisites, '']);
    };

    const removePrerequisiteField = (index) => {
      const updatedPrerequisites = [...prerequisites];
      updatedPrerequisites.splice(index, 1);
      setPrerequisites(updatedPrerequisites);
    };

    useEffect(() => {
        axios.get('http://localhost:5000/api/subjects', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            }
        })
        .then((response) => {
            // console.log(response.data);
            setSubjects(response.data.subjects);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const changeSubjectCode = async (e) => {
        const subjectName = e.target.value;
        const subjectCode = await subjects.find(subject => subject.subjectName === subjectName).subjectCode;
        setSubjectCode(subjectCode);
    }

    return (
        <>
        <main className='main' id='main'>
        <section className="section">
            <div className="row">
                <div className="col-lg-10">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Add Unit</h5>
                            <Form method="post" encType="multipart/form-data" action=''>
                                <div className="row mb-3">
                                  <label htmlFor="unitNumber" className="col-sm-2 col-form-label">Unit Number</label>
                                  <div className="col-sm-10">
                                    <input name="unitNumber" id="unitNumber" type="text" className="form-control" required />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label htmlFor="unitName" className="col-sm-2 col-form-label">Unit Name</label>
                                  <div className="col-sm-10">
                                    <input name="unitName" id="unitName" type="text" className="form-control" required />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label">Subject</label>
                                    <div className="col-sm-10">
                                        <select name="subjectName" id="subjectName" className="form-select" aria-label="Default select example" onChange={changeSubjectCode} required>
                                        <option>Select Subject</option>
                                            {
                                                subjects.map((subject, index) => {
                                                    return <option key={index} value={subject.subjectName}>{subject.subjectName}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <input type='hidden' name='subjectCode' id='subjectCode' value={subjectCode} />
                                <div className="row mb-3">
                                  <label htmlFor="unitDescription" className="col-sm-2 col-form-label">Unit Description</label>
                                  <div className="col-sm-10">
                                    <textarea name="unitDescription" id="unitDescription" className="form-control" style={{height: "100px"}} placeholder="Unit Description, Ex: This course will help you build foundation in DSA"></textarea>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                        <label htmlFor="course_objectives" className="col-sm-2 col-form-label">Unit Objectives</label>
                                        <div className="field_wrapper">
                                          {objectives.map((objective, index) => (
                                            <div className="input-group mb-3" key={index}>
                                              <div
                                                className="remove_button btn btn-outline-danger"
                                                title="Remove field"
                                                onClick={() => removeObjectiveField(index)}
                                              >
                                                <span className="bi bi-x-lg"></span>
                                              </div>
                                              <input
                                                type="text"
                                                value={objective}
                                                className="form-control"
                                                placeholder=""
                                                aria-label="Example text with button addon"
                                                aria-describedby="button-addon1"
                                                onChange={(e) => {
                                                  const updatedObjectives = [...objectives];
                                                  updatedObjectives[index] = e.target.value;
                                                  setObjectives(updatedObjectives);
                                                }}
                                              />
                                            </div>
                                          ))}
                                          <div
                                            className="add_button btn btn-outline-success"
                                            title="Add field"
                                            onClick={addObjectiveField}
                                          >
                                            <span className="bi bi-plus-lg"></span>
                                          </div>
                                        </div>
                                      </div>
                                <input type="hidden" name="unitObjectives" value={objectives} />
                                <div className="row mb-3">
                                  <label htmlFor="course_prerequisites" className="col-sm-2 col-form-label">Unit Prerequisites</label>
                                  <div className="field_wrapper">
                                    {prerequisites.map((prerequisite, index) => (
                                      <div className="input-group mb-3" key={index}>
                                        <div
                                          className="remove_button btn btn-outline-danger"
                                          title="Remove field"
                                          onClick={() => removePrerequisiteField(index)}
                                        >
                                          <span className="bi bi-x-lg"></span>
                                        </div>
                                        <input
                                          type="text"
                                          value={prerequisite}
                                          className="form-control"
                                          placeholder=""
                                          aria-label="Example text with button addon"
                                          aria-describedby="button-addon1"
                                          onChange={(e) => {
                                            const updatedPrerequisites = [...prerequisites];
                                            updatedPrerequisites[index] = e.target.value;
                                            setPrerequisites(updatedPrerequisites);
                                          }}
                                        />
                                      </div>
                                    ))}
                                    <div
                                      className="add_button btn btn-outline-success"
                                      title="Add field"
                                      onClick={addPrerequisiteField}
                                    >
                                      <span className="bi bi-plus-lg"></span>
                                    </div>
                                  </div>
                                </div>
                                <input type="hidden" name="unitPrerequisites" value={prerequisites} />
                                <div className="row mb-3">
                                  <label htmlFor="unitImage" className="col-sm-2 col-form-label">Unit Thumbnail Image</label>
                                  <div className="col-sm-10">
                                    <input name="unitImage" id="unitImage" type="file" accept=".jpg,.jpeg,.png" className="form-control" required />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-10">
                                    <br />
                                    <button type="submit" className="btn btn-primary">Add Unit</button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </main>
        </>
    );
}

export async function action({request}) {

    const form = await request.formData();
    const formToJSON = {};
    for (const [key, value] of [...form.entries()]) {
        formToJSON[key] = value;
    }
    // console.log(formToJSON);
    axios.post('http://localhost:5000/api/units/', formToJSON, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + getToken(),
        }
    })
    .then((response) => {
        console.log(response);
        alert("Unit added successfully");
        // reload
        window.location.reload();
    })
    .catch((error) => {
        console.log(error);
    });

    return null;
}
