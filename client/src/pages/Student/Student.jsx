import React, { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { getToken } from "../../utils/auth";
import { useRouteLoaderData } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import CourseCard from "./CourseCard";
import { Box, Grid } from "@mui/material";
import Alert from "../../components/Alert";
import ProfileContext from "../../store/ProfileContext";
import "./Student.css"

function Student() {

    const ctx = useContext(ProfileContext);

    const [courses, setCourses] = useState([]);
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        const user = localStorage.getItem('user');
        const username = JSON.parse(user).username;

        axios.get(`http://localhost:5000/api/student/${username}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            }
        })
        .then((response) => {
            // console.log(response.data);
            const data = response.data;
            if (data.status === 'error' && data.message === 'Student not found') {
                localStorage.setItem('isProfileComplete', false);
                ctx.setIsProfileCreated(false);
            } else if (data.status === 'ok') {
                localStorage.setItem('isProfileComplete', true);
                ctx.setIsProfileCreated(true);
                localStorage.setItem('profileData', JSON.stringify(data.data));
                setProfileData(data.data);
            }
        })
        .catch((error) => {
            console.log(error);
        });
        const fetchCourses = async () => {
            const response = await axios.get('http://localhost:5000/api/courses', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken(),
                },
            });
            await setCourses(response.data.data.filter((course) => course.isPublic === true));
        };
        fetchCourses();
    }, [ctx]);

    const { isAuthenticated } = useRouteLoaderData('student');

    if (!isAuthenticated) {
        return (<div></div>);
    }

    return (
        <>
        <main id="main" className="main">
        <PageTitle title="Dashboard" />
            {
                ctx.isProfileCreated === false ? (
                    <>
                        <Alert message="complete your profile!" link="create_profile" link_text="click here to create profile" />
                    </>
                ) : null
            }
            <section className="section dashboard">
                        {
                            ctx.isProfileCreated ? (
                                <>
                                    <h1 className="gradient-header"> Hello, {profileData.firstName} {profileData.lastName} </h1>
                                </>
                            ) : null
                        }
                        <Box sx={{ flexGrow: 1 }}>
                        
                        {
                            courses.length > 0 ? (
                                <h5 className="card-title">Courses</h5>
                            ) : null
                        }
                        <Grid container spacing={2}>
                            {
                                courses.length > 0 ? courses.map((course, index) => {
                                    if (course.unitData === undefined) return null;
                                    return <Grid item xs={3}><CourseCard 
                                        key={index} 
                                        courseId={course._id} 
                                        unitName={course.unitData.unitName} 
                                        subjectName={course.subjectData.subjectName} 
                                        unitDescription={course.unitData.unitDescription} 
                                        imagePath={course.unitData.unitImagePath}
                                        handleCourseSubmit={() => null}
                                        handleCourseDelete={() => null}
                                        cardType="View"
                                        status={course.status}
                                        role="student"
                                        rating={course.rating}
                                    />
                                    </Grid>
                                }) : <p style={{ textAlign: 'left', margin: '20px' }}>No courses available</p>
                            }
                            
                            
                        </Grid>
                        </Box>
            </section>
        </main>
        </>
    );
}

export default Student;

export async function loader({ request }) {
    const token = await getToken();

    if (token === 'EXPIRED') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('expiration');
        window.location.href = '/login';
        return { isAuthenticated: false };
    }

    // console.log('token:', token);
    if (token !== null && token !== undefined) {
        const user = jwtDecode(token);
        // console.log('user:', user);
        if (user) {
            if (user.role === 'STUDENT') {
                return { isAuthenticated: true };
            }
        }
    }
    window.location.href = '/login';
    return { isAuthenticated: false };
}