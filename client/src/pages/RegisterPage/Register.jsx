import React, { useState } from "react";
import axios from "axios";

function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {

        e.preventDefault();

        const data = { username, email, password, role: role.toUpperCase() };

        console.log(data);

        axios({
            method: 'post',
            url: 'http://localhost:5000/api/auth/register',
            data: data,
            headers: {'Content-Type': 'application/json' },
        })
        .then(function (response) {
            if (response.data.status === 'ok') {
                console.log(response.data);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                window.location.href = '/';
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
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="user-box">
                <input type="text" name="username" onChange={(e) => {setUsername(e.target.value)}} required autoComplete="off"/>
                <label>Username</label>
                </div>
                <div className="user-box">
                <input type="email" name="email" onChange={(e) => {setEmail(e.target.value)}} required autoComplete="false" />
                <label>Email</label>
                </div>
                <div className="user-box">
                <input type="password" name="password" onChange={(e) => {setPassword(e.target.value)}} required autoComplete="false" />
                <label>Password</label>
                </div>
                <div className="user-box">
                    <select name="role" className="form-select" aria-label="Default select example" onChange={(e) => { setRole(e.target.value) }}>
                        <option defaultValue>Select Role</option>
                        <option value="Student">Student</option>
                        <option value="Contributor">Contributor</option>
                        <option value="Evaluator">Evaluator</option>
                    </select>
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Register</button>
                <p className="message">{message}</p>
            </form>
        </div>
    );
}

export default Register;