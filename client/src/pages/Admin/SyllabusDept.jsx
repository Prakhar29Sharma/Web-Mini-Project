import { React, useEffect, useState } from 'react'
import PageTitle from '../../components/PageTitle'
import { Form } from "react-router-dom";
import axios from 'axios';
import { getToken } from '../../utils/auth';

function SyllabusDept() {

  const [department, setDepartmentsList] = useState([])
  const [yearList, setYearsList] = useState([])

  const [selectedYear, setSelectedYear] = useState("");
  const [semester, setSemester] = useState("");

  const [semesterSelected, setSemesterSelected] = useState(false); // Track if a semester has been selected



  const [isLoading, setIsLoading] = useState(true)
  // fetches departments
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
    const fetchYears = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await axios.get(`http://localhost:5000/api/subjects/yearEnum`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken(),
          },
        });
        const years = response.data.yearEnum;
        const yearList = years.map((year) => ({
          value: year,
          label: year,
        }));
        setYearsList(yearList);
      } catch (err) {
        console.log("Error fetching years:", err);
      }
      setIsLoading(false); // Stop loading when done
    };
    fetchYears();
  }, []);
  // selects sem based on year
  const semSelector = (selectedYear) => {
    const yearToSemesters = {
      "FE": [1, 2],
      "SE": [3, 4],
      "TE": [5, 6],
      "BE": [7, 8]
    };
    return yearToSemesters[selectedYear] || [];
  }

  // Handle year selection change
  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setSelectedYear(selectedYear);
    // Reset the selected semester when the year changes
    setSemester("");
  };

  // Handle semester selection change
  const handleSemesterChange = (e) => {
    const selectedSemester = e.target.value;
    setSemester(selectedSemester);
    setSemesterSelected(true);
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
                          required pattern="[a-zA-Z]{2,}" onChange={handleYearChange} >
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
                    {/* semester selection */}
                    <div className="row mb-3">
                      <label htmlFor="semester" className="col-sm-2 col-form-label">Semester</label>
                      <div className="col-sm-10">
                        <select name="semester" id="semester"
                          type="semester" className="form-select" onChange={handleSemesterChange} required>
                          <option value="">select semester</option>
                          {
                            semSelector(selectedYear).map((semester, index) => {
                              return <option key={index} value={semester}>{semester}</option>
                            })
                          }
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

export default SyllabusDept;

export async function action({ request }) {
  const form = await request.formData();
  const formToJSON = {};

  for (const [key, value] of [...form.entries()]) {
    formToJSON[key] = value;
  }
  const department = formToJSON.department;
  const year = formToJSON.year;
  const semester = formToJSON.semester;
  // redirect 
  window.location.href=`/admin/syllabus/${department}/${year}/${semester}`;
  console.log(formToJSON)
  return null;
}