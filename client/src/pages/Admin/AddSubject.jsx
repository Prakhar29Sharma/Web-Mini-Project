import React, { useState } from 'react';
import { Form } from 'react-router-dom';
import { getToken } from '../../utils/auth';
import axios from 'axios';

export default function AddSubject() {

    const [semester, setSemester] = useState('');
    const [year, setYear] = useState('');
    const [department, setDepartment] = useState('');
    const [subjectType, setSubjectType] = useState('');
    const [semesterList, setSemesterList] = useState([1,2,3,4,5,6,7,8]);

    const onYearChange = (e) => {
        setYear(e.target.value);
        const year = e.target.value;
        if (year === "FE") {
            setSemesterList([1,2]);
        } else if (year === "SE") {
            setSemesterList([3,4]);
        } else if (year === "TE") {
            setSemesterList([5,6]);
        } else if (year === "BE") {
            setSemesterList([7,8]);
        }
    }

    return (
        <>
        <main className='main' id='main'>
        <section className="section">
            <div className="row">
                <div className="col-lg-10">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Add Subject</h5>
                            <Form method="post" encType="multipart/form-data" action=''>
                                <div className="row mb-3">
                                  <label htmlFor="subjectCode" className="col-sm-2 col-form-label">Subject code</label>
                                  <div className="col-sm-10">
                                    <input name="subjectCode" id="subjectCode" type="text" className="form-control" required />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label htmlFor="subjectName" className="col-sm-2 col-form-label">Subject name</label>
                                  <div className="col-sm-10">
                                    <input name="subjectName" id="subjectName" type="text" className="form-control" required />
                                  </div>
                                </div>
                                
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label">Year</label>
                                    <div className="col-sm-10">
                                        <select name="year" type="text" id="year" className="form-select" aria-label="Default select example" onChange={onYearChange} value={year} required>
                                        <option>Select year</option>
                                            {
                                                ["FE", "SE", "TE", "BE"].map((year, index) => {
                                                    return <option key={index} value={year}>{year}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label">Semester</label>
                                    <div className="col-sm-10">
                                        <select name="semester" type="number" id="semester" className="form-select" aria-label="Default select example" onChange={(e) => {
                                            setSemester(e.target.value);
                                        }} value={semester} required>
                                        <option>Select semester</option>
                                            {
                                                semesterList.map((sem, index) => {
                                                    return <option key={index} value={sem}>{sem}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label">Branch</label>
                                    <div className="col-sm-10">
                                        <select name="department" type="text" id="department" className="form-select" aria-label="Default select example" onChange={(e) => {
                                            setDepartment(e.target.value);
                                        }} value={department} required>
                                        <option>Select branch</option>
                                            {
                                                ["COMP", "IT", "EXTC", "MECH"].map((department, index) => {
                                                    return <option key={index} value={department}>{department}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label">Subject Type</label>
                                    <div className="col-sm-10">
                                        <select name="subjectType" type="text" id="subjectType" className="form-select" aria-label="Default select example" onChange={(e) => {
                                            setSubjectType(e.target.value);
                                        }} value={subjectType} required>
                                        <option>Select subject type</option>
                                            {
                                                ["Theory", "Practical"].map((subjectType, index) => {
                                                    return <option key={index} value={subjectType}>{subjectType}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-10">
                                    <br />
                                    <button type="submit" className="btn btn-primary">Add Subject</button>
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

export async function action({request}) {

    const form = await request.formData();
    const formToJSON = {};
    for (const [key, value] of [...form.entries()]) {
        formToJSON[key] = value;
    }
    console.log(formToJSON);
    axios.post('http://localhost:5000/api/subjects/', {}, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + getToken(),
        },
        params: formToJSON
    })
    .then((response) => {
        console.log(response);
        if (response.status === "ok") {
            alert("Subject added successfully");
            window.location.href = "/admin";
        }
    })
    .catch((error) => {
        console.log(error);
    });

    return null;
}
