import React from "react";
import jwtDecode from "jwt-decode";
import { getToken } from "../../utils/auth";
import { useRouteLoaderData } from "react-router-dom";

function Contributor() {

    const { isAuthenticated } = useRouteLoaderData('contributor');

    if (!isAuthenticated) {
        return (<div></div>);
    }

    return (
        <div>
            <h1>Contributor Page</h1>
        </div>
    );
}

export default Contributor;

export async function loader({ request }) {
    const token = await getToken();
    // console.log('token:', token);
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