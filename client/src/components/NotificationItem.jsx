import React from "react";
import { formatDistance } from 'date-fns'

export default function NotificationItem(props) {
    return (
        <li className="notification-item">
            {/* <i className="bi bi-check-circle text-success"></i> */}
            <img src="http://localhost:5000/assets/notification.jpeg" alt="notification" width={"75px"}/>
            <div>
            <h4 style={{ textAlign: 'left' }} >{props.title}</h4>
            <p style={{ textAlign: 'left' }} >{props.message}</p>
            <p style={{ textAlign: 'left' }} >{formatDistance(new Date(props.date), new Date(), {
                addSuffix: true
            })}</p>
            </div>
        </li>
    );
}