import React from "react";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import {useNavigate} from 'react-router-dom';

function Admin() {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = jwtDecode(token);
            console.log(user);
            if (!user) {
                localStorage.removeItem("token");
                navigate('/login');
            } else {
                if (user.role !== 'ADMIN') {
                    localStorage.removeItem("token");
                    navigate('/login');
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    return (
        <div>
            <h1>Admin Page</h1>
        </div>
    );
}

export default Admin;