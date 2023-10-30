import React, { useContext, useEffect, useMemo, useState } from "react";
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
// import SearchIcon from '@mui/icons-material/Search';
import Fuse from 'fuse.js';

const quotes = [
    { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
    { text: "The roots of education are bitter, but the fruit is sweet.", author: "Aristotle" },
    { text: "Education is not the filling of a pail, but the lighting of a fire.", author: "William Butler Yeats" },
    { text: "Education is the kindling of a flame, not the filling of a vessel.", author: "Socrates" },
    { text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", author: "Dr. Seuss" },
    { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
    { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
    { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
    { text: "Education is not preparation for life; education is life itself.", author: "John Dewey" },
    { text: "The only real mistake is the one from which we learn nothing.", author: "Henry Ford" },
    { text: "In learning, you will teach, and in teaching, you will learn.", author: "Phil Collins" },
    { text: "The mind is not a vessel to be filled, but a fire to be kindled.", author: "Plutarch" },
    { text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.", author: "Malcolm X" },
    { text: "Education is the foundation upon which we build our future.", author: "Christine Gregoire" },
    { text: "What we learn with pleasure, we never forget.", author: "Alfred Mercier" },
    { text: "Education's responsibility is to replace an empty mind with an open one.", author: "Malcolm Forbes" },
    { text: "The best way to predict your future is to create it.", author: "Abraham Lincoln" },
    { text: "Education is the key to unlock the golden door of freedom.", author: "George Washington Carver" },
    { text: "Learning is a treasure that will follow its owner everywhere.", author: "Chinese Proverb" },
    { text: "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family.", author: "Kofi Annan" }
];
  

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}
  

function Student() {

    const ctx = useContext(ProfileContext);

    const [courses, setCourses] = useState([]);
    const [profileData, setProfileData] = useState({});
    const [quote, setQuote] = useState({ text: '', author: '' });
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
                setProfileData(data.data);
                const randomQuote = getRandomQuote();
                setQuote(randomQuote);
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
        <main id="main" className="main" style={{ backgroundColor: 'white' }}>
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
                                <div className="gradient-section">
                                    <h1> Hola, {profileData.firstName} {profileData.lastName} </h1>
                                    <div>
                                        <blockquote>
                                            <p>{quote.text}</p>
                                            <cite>{quote.author}</cite>
                                        </blockquote>
                                    </div>
                                </div>
                                </>
                            ) : null
                        }
                        <Box sx={{ flexGrow: 1 }}>
                        
                        {
                            courses.length > 0 ? (
                                <>
                                <h5 className="card-title" style={{ fontWeight: 'bold' }}>Courses</h5>
                                <div class="search-container">
                                    <input type="text" id="search-bar" onChange={(e) => { setSearchQuery(e.target.value);}} placeholder="Search" autoComplete="off" />
                                    {/* <div className="search-icon" onClick={filterCourses}><SearchIcon /></div> */}
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
                        <br />
                        <hr />
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