import React from "react";
import { Form, Link } from "react-router-dom";
import Notifications from "../../components/Notifications";

export default function Navbar() {

    const user = localStorage.getItem('user');
    const userRole = JSON.parse(user).role;  
    const username = JSON.parse(user).username;

    return (
  <header id="header" className="header fixed-top d-flex align-items-center">

    <div className="d-flex align-items-center justify-content-between">
      <Link to="index.html" className="logo d-flex align-items-center">
        <img src="../../assets/img/logo.png" alt="" />
        <span className="d-none d-lg-block">Edulib</span>
      </Link>
      <i className="bi bi-list toggle-sidebar-btn"></i>
    </div>

    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">

        <li className="nav-item d-block d-lg-none">
          <Link className="nav-link nav-icon search-bar-toggle " to="">
            <i className="bi bi-search"></i>
          </Link>
        </li>

        <Notifications />

        <li className="nav-item dropdown pe-3">

          <Link className="nav-link nav-profile d-flex align-items-center pe-0" to="" data-bs-toggle="dropdown">
            <img src="http://localhost:5000/assets/profile-image.jpg" alt="Profile" className="rounded-circle" />
            <span className="d-none d-md-block dropdown-toggle ps-2">{username}</span>
          </Link>

          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
            <li className="dropdown-header">
              <h6>{ username }</h6>
              <span>{ userRole }</span>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>

            <li>
              <Link className="dropdown-item d-flex align-items-center" to="profile">
                <i className="bi bi-person"></i>
                <span>My Profile</span>
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>

            <li>
              <Link className="dropdown-item d-flex align-items-center" to="">
                <i className="bi bi-gear"></i>
                <span>Account Settings</span>
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>

            <li>
              <Link className="dropdown-item d-flex align-items-center" to="">
                <i className="bi bi-question-circle"></i>
                <span>Need Help?</span>
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider"/>
            </li>

            <li>
                <Form className="dropdown-item d-flex align-items-center" action="/logout" method="post">
                <span>Sign Out</span>
                </Form>
            </li>

          </ul>
        </li>

      </ul>
    </nav>

  </header>
    );
}
