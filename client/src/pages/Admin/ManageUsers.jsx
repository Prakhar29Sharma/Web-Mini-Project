import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { getToken } from '../../utils/auth';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ManageUsers() {

    const [inactiveUsers, setInactiveUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/users/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            },
        })
        .then(function (response) {
            if (response.data.status === 'ok') {
                // console.log(response.data.users);
                setInactiveUsers(response.data.users.filter(user => user.isActive === false));
            } else {
                console.log(response.data.message);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []); // Empty dependency array to run the effect only once

    // Function to handle user activation
    const handleActivateUser = (userId) => {
        // Implement user activation logic here and update the user's status
        axios.patch('http://localhost:5000/api/users/' + userId, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            },
            params : {
                isActive : true
            }
        }, {})
        .then((response) => {
            console.log(response.data);
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <main className='main' id='main'>
            <PageTitle title="Manage Users" />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Role Wanted</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Portfolio</TableCell>
                            <TableCell>Experience</TableCell>
                            <TableCell>Activate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inactiveUsers.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell><Link to={user.portfolio} target='_blank'>view portfolio</Link></TableCell>
                                <TableCell>{user.experience}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleActivateUser(user._id)}
                                    >
                                        Activate
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </main>
    );
}
