import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { getToken } from "../../utils/auth";
import { useRouteLoaderData } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import CourseCard from "./CourseCard";
import { Box, Grid } from "@mui/material";

function Student() {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
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
    }, []);

    const { isAuthenticated } = useRouteLoaderData('student');

    if (!isAuthenticated) {
        return (<div></div>);
    }

    return (
        <>
        <main id="main" className="main">
        <PageTitle title="Dashboard" />
            <section className="section dashboard">
                        <Box sx={{ flexGrow: 1 }}>
                        <h5 className="card-title">Courses</h5>
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
                                }) : <p>No courses available</p>
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