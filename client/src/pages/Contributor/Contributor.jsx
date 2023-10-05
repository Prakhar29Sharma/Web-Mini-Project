import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { getToken } from "../../utils/auth";
import { Link, useRouteLoaderData } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import Alert from "../../components/Alert";
import axios from "axios";
import CourseCard from "../../components/CourseCard";

function Contributor() {

    const [displayAlert, setDisplayAlert] = useState(false);
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
                params: {
                    authorName: username,
                },
            });
            setMyCourses(response.data.data);
        };
        
        axios.get(`http://localhost:5000/api/contributor/${username}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            }
        })
        .then((response) => {
            // console.log(response.data);
            const data = response.data;
            if (data.status === 'error' && data.message === 'Contributor not found') {
                setDisplayAlert(true);
                localStorage.setItem('isProfileComplete', false);
            } else if (data.status === 'ok') {
                setDisplayAlert(false);
                localStorage.setItem('isProfileComplete', true);
                localStorage.setItem('profileData', JSON.stringify(data.data));
                fetchCourses();
            }
        })
        .catch((error) => {
            console.log(error);
        });

    }, [])

    const { isAuthenticated } = useRouteLoaderData('contributor');

    if (!isAuthenticated) {
        return (<div></div>);
    }

    return (
        <>
        <main id="main" className="main">
            <PageTitle title="Dashboard" />
            { displayAlert && <Alert message="complete your profile!" link="create_profile" link_text="click here to create profile" /> }
            {
                !displayAlert && (
                <>
                    <section className="section dashboard">
                        <div className="row">
                            
                        <div className="col-lg-8">
                            <div className="row">

                            <div className="col-xxl-20 col-md-">
                            <div className="card info-card sales-card">

                                <div className="card-body"><Link to="">
                                <h5 className="card-title">Get started with contributions</h5>

                                <div className="d-flex align-items-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                    <Link to="create_course"><i className='fas fa-plus' style={{fontSize:'36px'}}></i></Link>
                                    </div>
                                    <div className="ps-3">
                                    <h6>  </h6>
                                    <span className="text-success small pt-1 fw-bold"></span> <span className="text-muted small pt-2 ps-1"></span>

                                    </div>
                                </div></Link>
                                </div>

                            </div>
                            </div>


                        <div className="col-xxl-20 col-md-">
                        <div className="card info-card sales-card">

                            <div className="card-body"><Link to="/contributor/view_others_contribution">
                            <h5 className="card-title">Review and rate others contribution </h5>

                            <div className="d-flex align-items-center">
                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">

                                <i className="fa fa-star checked"></i>
                                <span ></span>


                                </div>
                                <div className="ps-3">
                                <h6>  </h6>
                                <span className="text-success small pt-1 fw-bold"></span> <span className="text-muted small pt-2 ps-1"></span>

                                </div>
                            </div></Link>
                            </div>

                        </div>
                        </div>
                        </div>

                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">My Contributions</h5>
                                    {
                                        myCourses.length > 0 ? myCourses.map((course, index) => {
                                            if (course.unitData === undefined) return null;
                                            return <CourseCard 
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
                                            />
                                        }) : <p>No contributions yet</p>
                                    }
                                </div>
                            </div>
                        </div>

                        </div>

                        </div>
                        </section>
                </>
                )
            }
        </main>
        </>
    );
}

export default Contributor;

export async function loader({ request }) {
    const token = await getToken();
    // console.log('token:', token);

    if (token === 'EXPIRED') {
        localStorage.clear();
        window.location.href = '/login';
        return { isAuthenticated: false };
    }

    if (token !== null && token !== undefined) {
        const user = jwtDecode(token);
        // console.log('user:', user);
        if (user) {
            if (user.role === 'CONTRIBUTOR') {
                return { isAuthenticated: true };
            }
        }
    }
    window.location.href = '/login';
    return { isAuthenticated: false };
}