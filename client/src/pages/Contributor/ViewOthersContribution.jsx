import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getToken } from '../../utils/auth';
import PageTitle from '../../components/PageTitle';
import RateCourseCard from '../../components/RateCourseCard';

export default function ViewOthersContribution() {

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
            setMyCourses(response.data.data.filter((course) => course.authorName !== username).filter((course) => course.status === 'UnderReview' || course.status === 'Approved').filter((course) => allowedCourseToRate.includes(course.subjectData.subjectName)));
        };
        fetchCourses();
    }, [])

    return (
        <>
            <main id="main" className="main">
                <PageTitle title="Dashboard" />
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Others Contributions</h5>
                            {
                                myCourses.length > 0 ? myCourses.map((course, index) => {
                                    if (course.unitData === undefined) return null;
                                    return <RateCourseCard 
                                        key={index} 
                                        courseId={course._id} 
                                        unitName={course.unitData.unitName} 
                                        subjectName={course.subjectData.subjectName} 
                                        unitDescription={course.unitData.unitDescription} 
                                        imagePath={course.unitData.unitImagePath}
                                        authorName={course.authorName}
                                        status={course.status}
                                        rating={course.rating}
                                    />
                                }) : <p>No contributions yet</p>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}