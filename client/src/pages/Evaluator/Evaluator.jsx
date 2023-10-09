import React, { useContext, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { getToken } from "../../utils/auth";
import { useRouteLoaderData } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import ProfileContext from "../../store/ProfileContext";
import axios from "axios";
import Alert from "../../components/Alert";

function Evaluator() {

    const ctx = useContext(ProfileContext);

    useEffect(() => {

        const user = localStorage.getItem('user');
        const username = JSON.parse(user).username;

        axios.get(`http://localhost:5000/api/evaluator/${username}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            }
        })
        .then((response) => {
            const data = response.data;
            if (data.status === 'error' && data.message === 'Evaluator not found') {
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

    }, [ctx])

    const { isAuthenticated } = useRouteLoaderData('evaluator');

    if (!isAuthenticated) {
        return (<div></div>);
    }

    return (
        <main id="main" className="main">
            <PageTitle title="Dashboard" />
            {
                ctx.isProfileCreated ? (
                    <>
                        Hello, Evaluator!
                    </>
                ):(
                    <Alert message="complete your profile!" link="create_profile" link_text="click here to create profile" />
                )
            }
        </main>
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
