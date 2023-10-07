import React, { useEffect, useState } from "react";
import { getToken } from "../../utils/auth";
import axios from "axios";
import { Form } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import CourseCard from "../../components/CourseCard";
import AlertDialog from "../../components/AlertDialog";
import CustomizedSnackbars from "../../components/CustomizedSnackbar";

export default function CreateCourse() {

    const [subjects, setSubjects] = useState([]);
    const [units, setUnits] = useState([]);
    const [courseDrafts, setCourseDrafts] = useState([{}]);
    const [showSubmitAlertDialog, setShowSubmitAlertDialog] = useState(false);
    const [showDeleteAlertDialog, setShowDeleteAlertDialog] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [submitCourseId, setSubmitCourseId] = useState('');
    const [deleteCourseId, setDeleteCourseId] = useState('');

    useEffect(() => {
        const profileData = localStorage.getItem("profileData");
        const profile = JSON.parse(profileData);
        const subjectToContrib = profile.subjectsToContribute;
        // console.log(subjectToContrib);
        setSubjects(subjectToContrib.split(","));
        const authorName = profile.username;

        const fetchCourses = async () => {
            const response = await axios.get('http://localhost:5000/api/courses', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken(),
                },
                params: {
                    authorName: authorName,
                    status: "Draft"
                },
            });
            setCourseDrafts(response.data.data);
        };
        fetchCourses();
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

    const handleDelete = (courseId) => {
        setShowDeleteAlertDialog(true);
        setDeleteCourseId(courseId);
    }

    const handleCourseDelete = (courseId) => {
        console.log("proceeding to delete : ", courseId);
        axios.delete(`http://localhost:5000/api/courses/${courseId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            },
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
        setShowDeleteAlertDialog(false);
        setSnackbarMessage("Course deleted successfully!");
        setShowSnackbar(true);
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }

    const handleDeleteDialogClose = () => {
        setShowDeleteAlertDialog(false);
    }

    const handleSubmit = (courseId) => {
        setShowSubmitAlertDialog(true);
        setSubmitCourseId(courseId);
    }

    const handleCourseSubmit = (courseId) => {
        console.log("proceeding to submit : ", courseId);
        axios.patch(`http://localhost:5000/api/courses/${courseId}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            },
            params: {
                status: "UnderReview"
            }
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
        setShowSubmitAlertDialog(false);
        setSnackbarMessage("Course submitted successfully!");
        setShowSnackbar(true);
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }

    const handleDialogClose = () => {
        setShowSubmitAlertDialog(false);
    }

    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    }

    return (
        <>
        { showSubmitAlertDialog ? <AlertDialog title={"Do you want to continue?"} description={"Do you want to submit this course for review?"} handleDialogClose={handleDialogClose} handleCourseSubmit={handleCourseSubmit} courseId={submitCourseId}/> : null }
        { showDeleteAlertDialog ? <AlertDialog title={"Do you want to continue?"} description={"Do you want to delete this draft course?"} handleDialogClose={handleDeleteDialogClose} handleCourseSubmit={handleCourseDelete} courseId={deleteCourseId}/> : null }
        { showSnackbar ? <CustomizedSnackbars message={snackbarMessage} handleSnackbarClose={handleSnackbarClose}/> : null }
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

                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Drafts</h5>
                            {
                                courseDrafts.length > 0 ? courseDrafts.map((course, index) => {
                                    if (course.unitData === undefined) return null;
                                    return <CourseCard 
                                        key={index} 
                                        courseId={course._id} 
                                        unitName={course.unitData.unitName} 
                                        subjectName={course.subjectData.subjectName} 
                                        unitDescription={course.unitData.unitDescription} 
                                        imagePath={course.unitData.unitImagePath}
                                        handleCourseSubmit={handleSubmit}
                                        handleCourseDelete={handleDelete}
                                        cardType="Draft"
                                        status={course.status}
                                    />
                                }) : <p>No drafts available</p>
                            }
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
    const subject = formToJSON.subject;
    const unit = formToJSON.unit;
    // console.log(subject, unit);
    window.location.href = `/contributor/create_content/${subject}/${unit}`;
    return null;
}

