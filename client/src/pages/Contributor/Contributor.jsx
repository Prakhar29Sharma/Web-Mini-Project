import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { getToken } from "../../utils/auth";
import { useRouteLoaderData } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import Alert from "../../components/Alert";
import axios from "axios";

function Contributor() {

    const [displayAlert, setDisplayAlert] = useState(false);

    useEffect(() => {

        const user = localStorage.getItem('user');
        const username = JSON.parse(user).username;
        
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
        </main>
        </>
    );
}

export default Contributor;

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
            if (user.role === 'CONTRIBUTOR') {
                return { isAuthenticated: true };
            }
        }
    }
    window.location.href = '/login';
    return { isAuthenticated: false };
}