import React from "react";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import {useNavigate} from 'react-router-dom';

function Evaluator() {

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
                if (user.role !== 'EVALUATOR') {
                    localStorage.removeItem("token");
                    navigate('/login');
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    return (
        <div>
            <h1>Evaluator Page</h1>
        </div>
    );
}

export default Evaluator;