import React, { useState } from "react";
import './Login.css';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = { username, password };

        console.log(data);

        // fetch('/api/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data),
        // });
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
            </form>
        </div>
    );
};

export default Login;