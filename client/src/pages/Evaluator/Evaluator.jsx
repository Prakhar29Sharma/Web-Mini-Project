import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { getToken } from "../../utils/auth";
import { useRouteLoaderData } from "react-router-dom";
import axios from "axios";
import SubmissionCourseCard from "../../components/SubmissionCourseCard";
import PageTitle from "../../components/PageTitle";

function Evaluator() {
    const [myCourses, setMyCourses] = useState([]);

    useEffect(() => {

        const user = localStorage.getItem('user');
        const username = JSON.parse(user).username;

        const fetchCourses = async () => {
            const response = await axios.get('http://localhost:5000/api/courses', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken(),
                },
            });
            const profileData = localStorage.getItem("profileData");
            const profile = JSON.parse(profileData);
            const allowedCourseToRate = profile.subjectsOfInterest + profile.subjectsToContribute;
            setMyCourses(response.data.data.filter((course) => course.status === 'UnderReview' ));
        };
        fetchCourses();
    }, [])

    const { isAuthenticated } = useRouteLoaderData('evaluator');

    if (!isAuthenticated) {
        return (<div></div>);
    }

    return (
        <div>
            
            <main id="main" className="main">
            <h1>Evaluator Page</h1>
           
            <div className="col-lg-8">
                            <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Submitted For review</h5>
                                        {
                                            myCourses.length > 0 ? myCourses.map((course, index) => {
                                                if (course.unitData === undefined) return null;
                                                return <SubmissionCourseCard
                                                    key={index} 
                                                    courseId={course._id} 
                                                    unitName={course.unitData.unitName} 
                                                    subjectName={course.subjectData.subjectName} 
                                                    unitDescription={course.unitData.unitDescription} 
                                                    imagePath={course.unitData.unitImagePath}
                                                    authorName={course.authorName}
                                                    status={course.status}
                                                />
                                            }) : <p>No contributions yet</p>
                                        }
                                    </div>
                            </div>
                </div>
    
            </main>
               
        </div>
    );
}

export default Evaluator;

export async function loader({ request }) {
    const token = await getToken();
    // console.log('token:', token);

    if (token === 'EXPIRED') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('expiration');
        window.location.href = '/login';
        return { isAuthenticated: false };
    }

    if (token !== null && token !== undefined) {
        const user = jwtDecode(token);
        // console.log('user:', user);
        if (user) {
            if (user.role === 'EVALUATOR') {
                return { isAuthenticated: true };
            }
        }
    }
    window.location.href = '/login';
    return { isAuthenticated: false };
}
