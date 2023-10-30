import React, { useEffect, useMemo, useState, useContext } from "react";
import { getToken } from "../../utils/auth";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import CourseCard from "./CourseCard";
import { Box, Grid } from "@mui/material";
import Alert from "../../components/Alert";
import "./Student.css"
import SearchIcon from '@mui/icons-material/Search';
import Fuse from 'fuse.js';
import ProfileContext from "../../store/ProfileContext";


export default function ViewAllCourses() {
    const ctx = useContext(ProfileContext);
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // Store the search query
    const [filteredCourses, setFilteredCourses] = useState([]); // Store the filtered courses

    const fuse = useMemo(() => {
        // Create an index of keywords using Fuse.js
        const options = {
          includeScore: true,
          keys: ['subjectData.subjectName', 'unitData.unitName'],
        };
        return new Fuse(courses, options);
      }, [courses]);
    
      useEffect(() => {
        if (searchQuery) {
          // Perform a fuzzy search
          const results = fuse.search(searchQuery);
          const filtered = results.map((result) => result.item);
          setFilteredCourses(filtered);
        } else {
          setFilteredCourses([]);
        }
      }, [searchQuery, fuse]);

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

    return (
        <>
            <main id="main" className="main" style={{ backgroundColor: 'white' }}>
            <PageTitle title="Explore Courses" />
            {
                ctx.isProfileCreated === false ? (
                    <>
                        <Alert message="complete your profile!" link="create_profile" link_text="click here to create profile" />
                    </>
                ) : null
            }
            <section className="section dashboard">
                        <Box sx={{ flexGrow: 1 }}>
                        
                        {
                            courses.length > 0 ? (
                                <>
                                <h5 className="card-title" style={{ fontWeight: 'bold' }}>Courses</h5>
                                <div class="search-container">
                                    <input type="text" id="search-bar" onChange={(e) => { setSearchQuery(e.target.value);}} placeholder="Search courses" autoComplete="off" />
                                    <div className="search-icon"><SearchIcon /></div>
                                </div>
                                </>
                            ) : null
                        }
                        {
                            filteredCourses.length > 0 ? (
                                <>
                                <h5 className="card-title">Search Results</h5>
                                </>
                            ) : null
                        }
                        <Grid container spacing={2}>
                            {
                                filteredCourses.length > 0 ? filteredCourses.map((course, index) => {
                                    if (course.unitData === undefined) return null;
                                    return <Grid item xs={12} sm={6} md={4} lg={3} key={index}><CourseCard 
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
                                }) : null
                            }
                            
                            
                        </Grid>

                        {
                            courses.length > 0 ? (
                                <>
                                <h5 className="card-title">All Courses</h5>
                                </>
                            ) : null
                        }
                        <Grid container spacing={2}>
                            {
                                courses.length > 0 ? courses.map((course, index) => {
                                    if (course.unitData === undefined) return null;
                                    return <Grid item xs={12} sm={6} md={4} lg={3} key={index}><CourseCard 
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
    )
}