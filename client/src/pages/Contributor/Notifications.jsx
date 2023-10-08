import axios from "axios";
import React, { useEffect, useState } from "react";
import { getToken } from "../../utils/auth";
import NotificationItem from "../../components/NotificationItem";

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
            <ul className="notifications">
                            {
              notifications.map((notification, index) => {
                return (
                  <NotificationItem key={index} title={notification.title} message={notification.message} time={notification.time} />
                );
              })
            }
            </ul>
        </main>
    )
}