import React from 'react'
import { Form, Link } from 'react-router-dom'
import PageTitle from '../../components/PageTitle'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getToken } from '../../utils/auth';

export default function CreateCourse() {
    const [subjectNames, setSubjectNames] = useState([]); // Store only subject names
    const [selectedSubject, setSelectedSubject] = useState('');
//   const [units, setUnits] = useState([]);
//   const [selectedUnit, setSelectedUnit] = useState('');

  useEffect(() => {
    // Fetch subjects and units from the database
    fetchSubjects();
    //fetchUnits();
  }, []);


  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/subjects', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getToken(),
        }
      });
      console.log(response.data)
  
      const subjectNames = response.data.map(subject => subject.name);
      console.log(response.data)
  
      console.log(subjectNames);
      setSubjectNames(subjectNames);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };
//       setSubjects(response.data);
//     } catch (error) {
//       console.error('Error fetching subjects:', error);
//     }
//   };

  // const fetchUnits = async () => {
  //   try {
  //     const response = await axios.get('/api/units'); // Replace with your API endpoint
  //     setUnits(response.data);
  //   } catch (error) {
  //     console.error('Error fetching units:', error);
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedSubject) {
    // Handle form submission and selected values
    console.log('Selected subject:', selectedSubject);
    //console.log('Selected unit:', selectedUnit);
    // Add your logic for form submission here
    navigator.push('/create-course');
  } 
  else {
    // Alert the user that both fields need to be selected
    alert('Please select both subject and unit.');
  }
  };
  return (
    <>
      <main id="main" className="main">
        <PageTitle title="Create Course" />

        <section className="section">
          <div className="row">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Create Course</h5>

                  <Form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Subject</label>
                      <div className="col-sm-10">
                      <select
                          name="subject"
                          id="subject"
                          className="form-select"
                          aria-label="Default select example"
                          value={selectedSubject}
                          onChange={(e) => setSelectedSubject(e.target.value)}
                          required
                      >
                         <option value="">Select Subject</option>
                          {subjectNames.map((name) => (
                            <option key={name} value={name}>
                              {name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Unit</label>
                      <div className="col-sm-10">
                        {/* <select
                          name="unit"
                          id="unit"
                          className="form-select"
                          aria-label="Default select example"
                          value={selectedUnit}
                          onChange={(e) => setSelectedUnit(e.target.value)}
                          required
                        > */}
                          {/* <option value="">Select Unit</option>
                          {units.map((unit) => (
                            <option key={unit.id} value={unit.id}>
                              {unit.name}
                            </option>
                          ))}
                        </select> */}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">
                          Continue
                        </button>
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
    );}