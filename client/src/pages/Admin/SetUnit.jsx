

import React from 'react'
import { useState } from 'react';
import DynamicFields from '../../components/DynamicFields';
import { Form } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
export default function SetUnit() {
  const [unit, setUnit] = useState([""]);
  const [unitnumber, setUnitnumber] = useState([""]);
  const [unitname, setUnitname] = useState([""]);
  const [description, setDescription] = useState([""]);

  const [objectives, setObjectives] = useState([""]);
  const [prerequisites, setPrerequisites] = useState([""]);
  const addField = (fieldType) => {
    if (fieldType === 'prerequisites') {
      setPrerequisites([...prerequisites, '']);
    } else if (fieldType === 'objectives') {
      setObjectives([...objectives, '']);
    }

  };

  const removeField = (fieldType, index) => {
    if (fieldType === 'prerequisites') {
      const updatedPrerequisites = [...prerequisites];
      updatedPrerequisites.splice(index, 1);
      setPrerequisites(updatedPrerequisites);
    } else if (fieldType === 'objectives') {
      const updatedObjectives = [...objectives];
      updatedObjectives.splice(index, 1);
      setObjectives(updatedObjectives);
    }
  };
  const handleFieldChange = (fieldType, index, value) => {
    if (fieldType === 'prerequisites') {
      const updatedPrerequisites = [...prerequisites];
      updatedPrerequisites[index] = value;
      setPrerequisites(updatedPrerequisites);
    } else if (fieldType === 'objectives') {
      const updatedObjectives = [...objectives];
      updatedObjectives[index] = value;
      setObjectives(updatedObjectives);
    }

  };

  return (
    <>
      <main id="main" className="main">
        <PageTitle title="Set Units" />
        <section className="section">
          <div className="row">
            <div className="col-lg-10 col-md-10 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Set Syllabus</h5>
                  <Form method="post" action="" encType="multipart/form-data">
                    {/* unit : number */}
                    <div className="row mb-3">
                      <label htmlFor="unitnumber" className="col-sm-2 col-form-label">Unit-Number</label>
                      <div className="col-sm-10">
                        <input name="unitnumber" id="unitnumber" type="text" accept=".jpg,.jpeg,.png" className="form-control" required />
                      </div>
                    </div>
                    {/*  unit : name*/}
                    <div className="row mb-3">
                      <label htmlFor="unitname" className="col-sm-2 col-form-label">Unit-Name</label>
                      <div className="col-sm-10">
                        <input name="unitname" id="unitname" type="text" accept=".jpg,.jpeg,.png" className="form-control" required />
                      </div>
                    </div>


                    {/* description: text area */}
                    <div className="row mb-3">
                      <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                      <div className="col-sm-10">
                        <input name="description" id="description" type="text-area" accept=".jpg,.jpeg,.png" className="form-control" required />
                      </div>
                    </div>
                    {/* objectives: dynamic */}

                    <div className="row mb-3">
                      <label htmlFor="objectives" className="col-sm-2 col-form-label">Objectives</label>
                      <DynamicFields
                        fields={objectives}
                        addField={() => addField('objectives')}
                        removeField={(index) => removeField('objectives', index)}
                        onChange={(index, value) => handleFieldChange('objectives', index, value)}
                      />
                    </div>
                    {/* prerequisites:  dynamic*/}
                    <div className="row mb-3">
                      <label htmlFor="prerequisites" className="col-sm-2 col-form-label">Prerequisites</label>
                      <DynamicFields
                        fields={prerequisites}
                        addField={() => addField('prerequisites')}
                        removeField={(index) => removeField('prerequisites', index)}
                        onChange={(index, value) => handleFieldChange('prerequisites', index, value)}
                      />
                    </div>
                    {/* cover image */}
                    <div className="row mb-3">
                      <label htmlFor="course_image" className="col-sm-2 col-form-label">
                        Cover Image
                      </label>
                      <div className="col-sm-10">
                        <input
                          name="course_image"
                          id="course_image"
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          className="form-control"
                          // value={course_image}
                          required
                        />
                      </div>
                    </div>
                    {/* submit button */}
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
    </>
  )
}


