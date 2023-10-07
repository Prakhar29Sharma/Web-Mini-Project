import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { getToken } from "../../utils/auth";

function SubjectList() {

    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/api/subjects', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            }
        })
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
         <main id="main" className="main">
            <h2>Subject List</h2>
            <ul>
                {
                    subjects.map((subject) => {
                        return <li key={subject.subjectCode}> {subject.subjectName} </li>
                    })
                }
            </ul>
         </main>
        </>
    );
}

export default SubjectList;