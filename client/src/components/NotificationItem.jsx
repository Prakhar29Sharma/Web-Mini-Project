import React from "react";

export default function NotificationItem(props) {
    return (
        <li className="notification-item">
            {/* <i className="bi bi-check-circle text-success"></i> */}
            <img src="http://localhost:5000/assets/notification.jpeg" alt="notification" width={"75px"}/>
            <div>
            <h4 style={{ textAlign: 'left' }} >{props.title}</h4>
            <p style={{ textAlign: 'left' }} >{props.message}</p>
            <p style={{ textAlign: 'left' }} >{props.time}</p>
            </div>
        </li>
    );
}