import React, { useEffect, useState } from "react";
import { getToken } from "../../utils/auth";
import axios from "axios";
import { Form } from "react-router-dom";
import PageTitle from "../../components/PageTitle";

export default function CreateCourse() {

    const [subjects, setSubjects] = useState([]);
    const [units, setUnits] = useState([]);

    useEffect(() => {
        const profileData = localStorage.getItem("profileData");
        const profile = JSON.parse(profileData);
        // console.log(profile);
        const subjectToContrib = JSON.parse(profile.subjectsToContribute);
        // console.log(subjectToContrib);
        setSubjects(subjectToContrib);
    }, []); 

    const fetchUnits = (e) => {
        const subject = e.target.value;
        // console.log(subject);
        axios.get('http://localhost:5000/api/units/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            }
        })
        .then((response) => {
            const data = response.data.units;
            const units = data.filter((unit) => unit.subjectName === subject);
            // console.log(units);
            // setUnits(units.map((unit) => unit.unitName));
            setUnits(units.map((unit) => { return {"unitName":unit.unitName, "unitNumber": unit.unitNumber} }));
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <main className="main" id="main">
            <PageTitle title="Create Course" />
             <section className="section">
            <div className="row">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Create Course</h5>
                            <Form method="post" action="">
                                <div className="row mb-3">
                                  <label className="col-sm-2 col-form-label">Subject</label>
                                  <div className="col-sm-10">
                                    <select name="subject" id="subject" className="form-select" aria-label="Default select example" onChange={fetchUnits} required>
                                      <option>Select Subject</option>
                                        {
                                            subjects.map((subject, index) => {
                                                return <option key={index} value={subject}>{subject}</option>
                                            })
                                        }
                                    </select>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label className="col-sm-2 col-form-label">Unit</label>
                                  <div className="col-sm-10">
                                    <select name="unit" id="unit" className="form-select" aria-label="Default select example" disabled={ units.length === 0 ? true : false } required>
                                        {
                                            units.map((unit, index) => {
                                                return <option key={index} value={unit.unitNumber}>{unit.unitName}</option>
                                            })
                                        }
                                    </select>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-sm-10">
                                    <button type="submit" className="btn btn-primary" disabled={units.length === 0 ? true: false}>Continue</button>
                                  </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </main>
    )
}

export async function action({request}) {

    const form = await request.formData();
    const formToJSON = {};
    for (const [key, value] of [...form.entries()]) {
        formToJSON[key] = value;
    }
    const subject = formToJSON.subject;
    const unit = formToJSON.unit;
    // console.log(subject, unit);
    window.location.href = `/contributor/create_content/${subject}/${unit}`;
    return null;
}

