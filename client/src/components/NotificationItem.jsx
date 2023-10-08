import React from "react";

export default function NotificationItem(props) {
    return (
        <li className="notification-item">
            <i className="bi bi-check-circle text-success"></i>
            <div>
            <h4>{props.title}</h4>
            <p>{props.message}</p>
            <p>{props.time}</p>
            </div>
        </li>
    );
}