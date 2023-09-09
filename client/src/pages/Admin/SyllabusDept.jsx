import { React, useEffect, useState } from 'react'
import PageTitle from '../../components/PageTitle'
import { Form } from "react-router-dom";
import axios from 'axios';
import { getToken } from '../../utils/auth';



function SyllabusDept() {

  const [department, setDepartmentsList] = useState([])
  const [yearList, setYearsList] = useState([])
  const [semester, setSemester] = useState([])
  const [availableSemesters, setAvailableSemesters] = useState([])
  const [subjectCode, setSubjectCode] = useState([])
  const [unit, setUnit] = useState([])

  useEffect(() => {
    try {
      const department = axios.get('http://localhost:5000/api/subjects/deptEnum', {
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + getToken(),
        }
      })
        .then((response) => {
          const departments = response.data.deptEnum;
          const departmentList = []
          for (const department of departments) {
            departmentList.push({
              value: department,
              label: department
            });
          }
          setDepartmentsList(departmentList);
        })
    }
    catch (err) {
      console.log(err);
    }
  }, []);
  // fetch years
  useEffect(() => {
    const year = axios
      .get(`http://localhost:5000/api/subjects/yearEnum`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + getToken(),
        },
      })
      .then((response) => {
        const years = response.data.yearEnum;
        const yearList = years.map((years) => ({
          value: year,
          label: year,
        }));
        setYearsList(yearList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // fetch all semesters
  useEffect(() => {
    const semester = axios.get("http://localhost:5000/api/subjects/semList", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + getToken(),
      }
    })
      .then(response => {
        const semesters = response.data.semList;
        setSemester(semesters);
      })
      .catch(err => {
        console.log("error fetching semesters:", err);
      });
  }, []);

  const yearToSemesters = {
    "1st Year": ["1st", "2nd"],
    "2nd Year": ["3rd", "4th"],
    "3rd Year": ["5th", "6th"],
    "4th Year": ["7th", "8th"],
  };



  // Fetch available semesters whenever the selected year changes
  useEffect(() => {
    const updatedAvailableSemesters = yearToSemesters[yearList] || [];
    setAvailableSemesters(updatedAvailableSemesters);

    // Reset the selected semester when the year changes
    setSemester("");
  }, [yearList]);
  // Handle year selection change
  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYearsList(selectedYear);
  };

  // Handle semester selection change
  const handleSemesterChange = (e) => {
    const selectedSemester = e.target.value;
    setSemester(selectedSemester);
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
                  <h5 className="card-title">Set Course</h5>
                  <Form method="post" action="" encType="multipart/form-data">

                    <div className="row mb-3">
                      <label htmlFor="department" className="col-sm-2 col-form-label">Department</label>
                      <div className="col-sm-10">
                        <select name="department" id="department" type="text" className="form-select" required pattern="[a-zA-Z]{2,}" >
                          <option default={true}>Select Department</option>
                          {
                            department.map((department, index) => {
                              return <option key={index} value={department.value}>
                                {department.label}</option>
                            })
                          }
                        </select>

                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="year" className="col-sm-2 col-form-label">Year</label>
                      <div className="col-sm-10">
                        <select name="year" id="year" type="text" className="form-select"
                          onChange={handleYearChange} required pattern="[a-zA-Z]{2,}" >
                          <option default={true}>Select year</option>
                          {
                            yearList.map((year, index) => {
                              return <option key={index} value={year.value}>
                                {year.label}</option>
                            })
                          }
                        </select>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="semester" className="col-sm-2 col-form-label">Semester</label>
                      <div className="col-sm-10">
                        <select name="semester" id="semester" value={semester}
                          onChange={handleSemesterChange} type="semester" className="form-select"  >

                          <option default={true}>Semester</option>
                          {availableSemesters.map((semester, index) => {
                            <option key={index} value={semester.value}>
                              {semester.label}</option>

                          })
                          }


                        </select>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="subjectCode" className="col-sm-2 col-form-label">subject</label>
                      <div className="col-sm-10">
                        <select name="subjectCode" id="subjectCode" type="date" max="2005-04-23" className="form-select" required >
                          <option default={true}>Open this select menu</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="unit" className="col-sm-2 col-form-label">Unit</label>
                      <div className="col-sm-10">
                        <select name="unit" id="unit" type="text" className="form-select" pattern="^[+]?[0-9]{6,15}$" required >
                          <option default={true}>Open this select menu</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="city" className="col-sm-2 col-form-label">City</label>
                      <div className="col-sm-10">
                        <select name="city" id="city" type="text" className="form-select" pattern="[A-Za-z ]{1,50}" required >
                          <option default={true}>Open this select menu</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">College</label>
                      <div className="col-sm-10">
                        <select name="college" className="form-select" aria-label="Default select example" required>
                          <option default={true}>Open this select menu</option>

                        </select>
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
  )
}

export default SyllabusDept
