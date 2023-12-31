import React, { useState } from "react";
import axios from 'axios';
import { setToken } from "../../utils/auth";

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = { username, password };

        axios({
            method: 'post', 
            url: 'http://localhost:5000/api/auth/login',
            data: data,
            headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
            if (response.data.status === 'ok') {

                console.log(response.data);
                
                setToken(response.data.token);

                localStorage.setItem('user', JSON.stringify(response.data.user));

                const expiration = new Date();
                
                expiration.setHours(expiration.getHours() + 1);

                localStorage.setItem('expiration', expiration.toISOString());

                const role = response.data.user.role;
                
                switch (role) {
                    case 'ADMIN':
                        window.location.href = '/admin';
                        break;
                    case 'CONTRIBUTOR':
                        window.location.href = '/contributor';
                        break;
                    case 'EVALUATOR':
                        window.location.href = '/evaluator';
                        break;
                    case 'STUDENT':
                        window.location.href = '/student';
                        break;
                    default:
                        window.location.href = '/';
                }
            } else {
                console.log(response.data);
                setMessage(response.data.message);
            }  
        })
        .catch(function (error) {
            console.log(error);
            setMessage(error.response.data.message);
        });
    }

    return (
        <div className="login-box">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="user-box">
                <input type="text" name="username" onChange={(e) => {setUsername(e.target.value)}} required autoComplete="off"/>
                <label>Username</label>
                </div>
                <div className="user-box">
                <input type="password" name="password" onChange={(e) => {setPassword(e.target.value)}} required autoComplete="off" />
                <label>Password</label>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <p style={{ textAlign: 'left', fontSize: '15px', fontWeight: 'bold', color: 'red', marginTop: '10px' }} className="message">{message}</p>
            </form>
        </div>
    );
};

export default Login;