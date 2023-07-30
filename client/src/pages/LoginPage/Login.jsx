import React, { useState } from "react";
import './Login.css';
import axios from 'axios';

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
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                if (response.data.user.role === 'ADMIN') {
                    window.location.href = '/admin';
                } else if (response.data.user.role === 'CONTRIBUTOR') {
                    window.location.href = '/contributor';
                } else if (response.data.user.role === 'EVALUATOR') {
                    window.location.href = '/evaluator';
                } else if (response.data.user.role === 'STUDENT') {
                    window.location.href = '/student';
                } else {
                    window.location.href = '/';
                }
            } else {
                console.log(response.data);
                setMessage(response.data.message);
            }  
        })
        .catch(function (error) {
            console.log(error);
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
                <input type="password" name="password" onChange={(e) => {setPassword(e.target.value)}} required autoComplete="false" />
                <label>Password</label>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <p className="message">{message}</p>
            </form>
        </div>
    );
};

export default Login;