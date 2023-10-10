import axios from "axios";
import React, { useEffect, useState } from "react";
import { getToken } from "../../utils/auth";
import { Link } from "react-router-dom";

export default function Notifications() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const user = localStorage.getItem('user');
        const username = JSON.parse(user).username;
        axios.get(`http://localhost:5000/api/notifications/${username}`,{
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
            }
        })
        .then((response) => {
            console.log(response.data.notifications);
            setNotifications(response.data.notifications);
        })
        .catch((error) => { 
            console.log(error);
        });
    }, [])

    return (
        <main id="main" className="main">
            <section class="section dashboard">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="row">
                        <div className="card">
                            <div className="filter">
                            <Link className="icon" to="" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                <li className="dropdown-header text-start">
                                <h6>Filter</h6>
                                </li>
                                <li><Link className="dropdown-item" to="">Today</Link></li>
                                <li><Link className="dropdown-item" to="">This Month</Link></li>
                                <li><Link className="dropdown-item" to="">This Year</Link></li>
                            </ul>
                            </div>

                            <div className="card-body pb-0">
                            <h5 className="card-title">Notifications</h5>

                            <div className="news">
                                {
                                    notifications.map((notification, index) => {
                                        return (
                                            <div style={{ marginBottom: '25px' }} key={index} className="post-item clearfix">
                                                <img src="http://localhost:5000/assets/notification.jpeg" alt="notification"/>
                                                <h4><Link to="">{notification.title}</Link></h4>
                                                <p style={{ textAlign: 'left' }}>{notification.message}</p>
                                                <p style={{ textAlign: 'left' }}>{notification.time}</p>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}