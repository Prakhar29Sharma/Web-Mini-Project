import React from "react";
import { Link } from "react-router-dom";
import NotificationItem from "./NotificationItem";

export default function Notifications(props) {

    const notifications = props.notifications;

    return (
        <li className="nav-item dropdown">

          <Link className="nav-link nav-icon" to="" data-bs-toggle="dropdown">
            <i className="bi bi-bell"></i>
            <span className="badge bg-primary badge-number">{props.count}</span>
          </Link>

          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
            <li className="dropdown-header">
              You have {props.count} new notifications
              <Link to="notifications"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>

            {
              notifications.map((notification, index) => {
                if (index >= 4) { // limit number of notifications to 4 on dropdown
                  return null;
                }
                return (
                  <NotificationItem key={index} title={notification.title} message={notification.message} date={notification.date} />
                );
              })
            }

            {/* <li className="notification-item">
              <i className="bi bi-exclamation-circle text-warning"></i>
              <div>
                <h4>Lorem Ipsum</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>30 min. ago</p>
              </div>
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>

            <li className="notification-item">
              <i className="bi bi-x-circle text-danger"></i>
              <div>
                <h4>Atque rerum nesciunt</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>1 hr. ago</p>
              </div>
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>

            <li className="notification-item">
              <i className="bi bi-check-circle text-success"></i>
              <div>
                <h4>Sit rerum fuga</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>2 hrs. ago</p>
              </div>
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>

            <li className="notification-item">
              <i className="bi bi-info-circle text-primary"></i>
              <div>
                <h4>Dicta reprehenderit</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>4 hrs. ago</p>
              </div>
            </li> */}

            <li>
              <hr className="dropdown-divider" />
            </li>
            <li className="dropdown-footer">
              <Link to="notifications">Show all notifications</Link>
            </li>

          </ul>

        </li>
    );
}