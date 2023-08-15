import React from "react";
import jwtDecode from "jwt-decode";
import { getToken } from "../../utils/auth";

function Evaluator() {
    return (
        <div>
            <h1>Evaluator Page</h1>
        </div>
    );
}

export default Evaluator;

export async function loader({ request }) {
    const token = await getToken();
    // console.log('token:', token);
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
