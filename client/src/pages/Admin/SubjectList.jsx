import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouteLoaderData } from "react-router-dom";

function SubjectList() {

    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/api/subjects')
        .then((response) => {
            // console.log(response.data);
            setSubjects(response.data.subjects);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const { isAuthenticated } = useRouteLoaderData('admin');

    if (!isAuthenticated) {
        return (<div></div>);
    }

    return (
        <>
         <h2 style={{color: 'white'}}>Subject List</h2>
         <ul>
            {
                subjects.map((subject) => {
                    return <li key={subject.subjectCode}> {subject.subjectName} </li>
                })
            }
         </ul>
        </>
    );
}

export default SubjectList;