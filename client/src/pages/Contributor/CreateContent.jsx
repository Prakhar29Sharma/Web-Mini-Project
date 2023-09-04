import React, { useState } from 'react';
import { Form, useParams } from 'react-router-dom';

export default function CreateContent() {
    
    const params = useParams();
    
    const { subject, unit } = params;

    const [prerequisites, setPrerequisites] = useState(['']); // Initialize with one empty prerequisite field

    const addPrerequisiteField = () => {
        setPrerequisites([...prerequisites, '']); // Add a new empty prerequisite field
    };

    const removePrerequisiteField = (index) => {
        const updatedPrerequisites = [...prerequisites];
        updatedPrerequisites.splice(index, 1);
        setPrerequisites(updatedPrerequisites);
    };

    const [objectives, setObjectives] = useState(['']); // Initialize with one empty objective field

    const addObjectiveField = () => {
        setObjectives([...objectives, '']); // Add a new empty objective field
    };

    const removeObjectiveField = (index) => {
        const updatedObjectives = [...objectives];
        updatedObjectives.splice(index, 1);
        setObjectives(updatedObjectives);
    };

    return (
        <main className='main' id='main'>
            <section className="section">
            <div className="row">
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Create Course</h5>
                            <Form method="post" encType="multipart/form-data">
                                <div className="row mb-3">
                                  <label htmlFor="course_title" className="col-sm-2 col-form-label">Course Title</label>
                                  <div className="col-sm-10">
                                    <input name="course_title" id="course_title" type="text" className="form-control" placeholder="Course Title, Ex: Python OOPs Concepts" required />
                                  </div>
                                </div>

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
                                    <textarea name="course_description" id="course_desc" className="form-control" style={{height: "100px"}} placeholder="Course Description, Ex: This course will help you build foundation in DSA"></textarea>
                                  </div>
                                </div>

                                {/* <div className="row mb-3">
                                  <label htmlFor="course_objectives" className="col-sm-2 col-form-label">Course Objectives</label>
                                    <div className="field_wrapper ">
                                      <div className="input-group mb-3">
                                          <a className="add_button btn btn-outline-success" title="Add field">
                                          <span className="bi bi-plus-lg"></span></a>
                                          <input id="course_objectives" type="text" name="objectives" value="" className="form-control " placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                    </div>
                                  </div>
                                 </div> */}

                                <div className="row mb-3">
                                    <label htmlFor="course_objectives" className="col-sm-2 col-form-label">Course Objectives</label>
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
                                            id={`course_objectives_${index}`}
                                            type="text"
                                            name={`objectives[${index}]`}
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

                                {/* <div className="row mb-3">
                                  <label htmlFor="course_prerequisite" className="col-sm-2 col-form-label">Course Prerequisite</label>
                                    <div className="field_wrapper2">
                                      <div className="input-group mb-3">
                                          <a className="add_button btn btn-outline-success" title="Add field">
                                          <span className="bi bi-plus-lg"></span></a>
                                          <input id="course_prerequisite" type="text" name="prerequisites" value="" className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                    </div>
                                  </div>
                                </div> */}
                                <div className="row mb-3">
                                    <label htmlFor="course_prerequisite" className="col-sm-2 col-form-label">Course Prerequisite</label>
                                    <div className="field_wrapper2">
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
                                            id={`course_prerequisite_${index}`}
                                            type="text"
                                            name={`prerequisites[${index}]`}
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

                                <div className="row mb-3">
                                  <label htmlFor="course_image" className="col-sm-2 col-form-label">Course Image</label>
                                  <div className="col-sm-10">
                                    <input name="course_image" id="course_image" type="file" accept=".jpg,.jpeg,.png" className="form-control" required />
                                  </div>
                                </div>

                                <div className="row mb-3">
                                  <label htmlFor="course_video" className="col-sm-2 col-form-label">Course Video</label>
                                  <div className="col-sm-10">
                                    <input name="course_video" id="course_video" type="file" accept="video/*" className="form-control" />
                                  </div>
                                </div>

                                <div className="row mb-3">
                                  <div className="col-sm-10">
                                    {
                                     // rich text editor 
                                    }
                                  </div>
                                </div>

                                <div className="row mb-3">
                                  <div className="col-sm-10">
                                    <button type="submit" className="btn btn-primary">Save as a draft</button>
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
