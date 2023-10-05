import { Form } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { useEffect, useState } from "react";
import { getToken } from "../../utils/auth";
import axios from "axios";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

// const colourOptions = [
//     { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
//     { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
//     { value: 'purple', label: 'Purple', color: '#5243AA' },
//     { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
//     { value: 'orange', label: 'Orange', color: '#FF8B00' },
//     { value: 'yellow', label: 'Yellow', color: '#FFC400' },
//     { value: 'green', label: 'Green', color: '#36B37E' },
//     { value: 'forest', label: 'Forest', color: '#00875A' },
//     { value: 'slate', label: 'Slate', color: '#253858' },
//     { value: 'silver', label: 'Silver', color: '#666666' },
// ];

const college = [
    { value: "College 1", label: "College 1" },
    { value: "College 2", label: "College 2" },
    { value: "College 3", label: "College 3" },
]

const university = [
    { value: "University 1", label: "University 1", color: '#0052CC' },
    { value: "University 2", label: "University 2", color: '#FF5630' },
    { value: "University 3", label: "University 3", color: '#FF5630' },
]

export default function CreateProfile() {

    const [subjects, setSubjects] = useState([]);
    const [selectedSubjectToContrib, setSelectedSubjectToContrib] = useState([]);
    const [selectedSubjectOfInterest, setSelectedSubjectOfInterest] = useState([]);


    function MultipleSelect(props) {
        const animatedComponents = makeAnimated();
        const subjectToContrib = props.type;
        return <Select
        name={props.name}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti 
        options={props.list}
        onChange={subjectToContrib ? (selectedValues) => {setSelectedSubjectToContrib(selectedValues)} : (selectedValues) => setSelectedSubjectOfInterest(selectedValues) }
        value={subjectToContrib ? selectedSubjectToContrib : selectedSubjectOfInterest}
        isSearchable= {true}
        />
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/subjects', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            }
        })
        .then((response) => {
            // console.log(response.data);
            const subjects = response.data.subjects;
            const subjectList = []
            for (const subject of subjects) {
                // subjectList.push({ value: subject.subjectCode, label: subject.subjectName });
                subjectList.push({ value: subject.subjectName, label: subject.subjectName });
            }
            setSubjects(subjectList);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const user = localStorage.getItem('user');  
    const username = JSON.parse(user).username;
    const userEmail = JSON.parse(user).email;

    return (
        <main id="main" className="main">

        <PageTitle title="Create profile" />

        <section className="section">
            <div className="row">
                <div className="col-lg-10 col-md-10 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Create Profile</h5>
                            <Form method="post" action="" encType="multipart/form-data">
                                <div className="row mb-3">
                                  <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                                  <div className="col-sm-10">
                                    <input name="username" id="username" type="text" className="form-control" value={username} disabled />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name</label>
                                  <div className="col-sm-10">
                                    <input name="firstName" id="firstName" type="text" className="form-control" required pattern="[a-zA-Z]{2,}" />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label htmlFor="lastName" className="col-sm-2 col-form-label">Last Name</label>
                                  <div className="col-sm-10">
                                    <input name="lastName" id="lastName" type="text" className="form-control" required pattern="[a-zA-Z]{2,}" />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                                  <div className="col-sm-10">
                                    <input name="email" id="email" type="email" className="form-control" value={userEmail} disabled />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label htmlFor="dob" className="col-sm-2 col-form-label">DOB</label>
                                  <div className="col-sm-10">
                                    <input name="dob" id="dob" type="date" max="2005-04-23" className="form-control" required />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label htmlFor="phone" className="col-sm-2 col-form-label">Phone Number</label>
                                  <div className="col-sm-10">
                                    <input name="phone" id="phone" type="text" className="form-control" pattern="^[+]?[0-9]{6,15}$" required />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label htmlFor="city" className="col-sm-2 col-form-label">City</label>
                                  <div className="col-sm-10">
                                    <input name="city" id="city" type="text" className="form-control" pattern="[A-Za-z ]{1,50}" required />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label className="col-sm-2 col-form-label">College</label>
                                  <div className="col-sm-10">
                                    <select name="college" className="form-select" aria-label="Default select example" required>
                                      <option default={true}>Open this select menu</option>
                                      {
                                        college.map((college, index) => {
                                            return <option key={index} value={college.value}>{college.label}</option>
                                        })
                                      }
                                    </select>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label className="col-sm-2 col-form-label">University</label>
                                  <div className="col-sm-10">
                                    <select name="university" className="form-select" aria-label="Default select example" required>
                                      <option default={true}>Open this select menu</option>
                                      {
                                        university.map((university, index) => {
                                            return <option key={index} value={university.value}>{university.label}</option>
                                        })
                                      }
                                    </select>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label htmlFor="qualification" className="col-sm-2 col-form-label">Qualification</label>
                                  <div className="col-sm-10">
                                    <input name="qualification" id="qualification" type="text" className="form-control" pattern="[A-Za-z0-9 ]{1,50}" required />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label htmlFor="yearsOfExperience" className="col-sm-2 col-form-label">Years of Experience</label>
                                  <div className="col-sm-10">
                                    <input name="yearsOfExperience" id="yearsOfExperience" type="number" className="form-control" min="0" max="50" step="1" required />
                                  </div>
                                </div>

                                <div className="row mb-3">
                                  <label className="col-sm-2 col-form-label">Subjects to Contribute</label>
                                  <div className="col-sm-10">

                                    {/* <select name="subjects_to_contrib" className="form-select" multiple aria-label="multiple select example" required>
                                        {
                                            subjects.map((subject, index) => {
                                                return <option key={index} value={subject.subjectCode}>{subject.subjectName}</option>
                                            })
                                        }
                                    </select> */}
                                    <MultipleSelect list={subjects} type={true} />
                                    <input type="hidden" name="subjectsToContribute" value={selectedSubjectToContrib.map((subject) => subject.value)} />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label className="col-sm-2 col-form-label">Subjects of Interest</label>
                                  <div className="col-sm-10">
                                    {/* <select name="subjects_of_interest" className="form-select" multiple aria-label="multiple select example" required>
                                        {
                                            subjects.map((subject, index) => {
                                                return <option key={index} value={subject.subjectCode}>{subject.subjectName}</option>
                                            })
                                        }
                                    </select> */}
                                    <MultipleSelect list={subjects} type={false} />
                                    <input type="hidden" name="subjectsOfInterest" value={selectedSubjectOfInterest.map((subject) => subject.value)} />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label htmlFor="linkedIn" className="col-sm-2 col-form-label">Linked Profile</label>
                                  <div className="col-sm-10">
                                    <input name="linkedIn" id="linkedIn" type="text" className="form-control" required />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label htmlFor="github" className="col-sm-2 col-form-label">Github Profile</label>
                                  <div className="col-sm-10">
                                    <input name="github" id="github" type="text" className="form-control" />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label htmlFor="portfolio" className="col-sm-2 col-form-label">Portfolio Website</label>
                                  <div className="col-sm-10">
                                    <input name="portfolio" id="portfolio" type="text" className="form-control" />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="profileImage" className="col-sm-2 col-form-label">Upload profile image</label>
                                    <div className="col-sm-10">
                                        <input name="profileImage" id="profileImage" type="file" accept="image/*" className="form-control" />
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
    )
}

export async function loader() {
    const user = localStorage.getItem('user');
    const username = JSON.parse(user).username;
    axios.get(`http://localhost:5000/api/contributor/${username}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        }
    })
    .then((response) => {
        // console.log(response.data);
        const data = response.data;
        if (data.status !== 'error') {
          window.location.href = '/contributor';   
        }
    })
    .catch((error) => {
        console.log(error);
    });
    return null;
}

export async function action({request}) {
    
    const user = localStorage.getItem('user');  
    const username = JSON.parse(user).username;
    const userEmail = JSON.parse(user).email;

    const form = await request.formData();
    const formToJSON = {};
    for (const [key, value] of [...form.entries()]) {
        formToJSON[key] = value;
    }
    formToJSON['username'] = username;
    formToJSON['email'] = userEmail;

    console.log(formToJSON);
    axios.post('http://localhost:5000/api/contributor/', formToJSON, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + getToken(),
      }
    })
    .then((response) => {
      console.log(response);
      window.location.href = '/contributor';
    })
    .catch((error) => {
      console.log(error);
    })
    return null;
}
