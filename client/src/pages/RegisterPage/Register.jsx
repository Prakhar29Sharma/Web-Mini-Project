import React, { useState } from "react";
import './Register.css';

function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

    const handleSubmit = (e) => {

        e.preventDefault();

        const data = { username, email, password, selectedRole };

        console.log(data);

        // fetch('/api/register', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data),
        // });
        
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
                    <select style={{backgroundColor: '#141e30', color: 'white', fontSize: 16, border: '0'}} className="form-select" aria-label="Default select example" onChange={(e) => { setSelectedRole(e.target.value) }}>
                        <option defaultValue>Select Role</option>
                        <option value="Student">Student</option>
                        <option value="Contributor">Contributor</option>
                        <option value="Evaluator">Evaluator</option>
                    </select>
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}

export default Register;