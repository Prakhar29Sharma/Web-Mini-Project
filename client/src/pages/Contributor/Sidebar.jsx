import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link to="/admin" className="nav-link">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="subjects" className="nav-link">
            <i className="bi bi-grid"></i>
            <span>Create Course</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="courses" className="nav-link">
            <i className="bi bi-grid"></i>
            <span>View Courses</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="rate_course" className="nav-link">
            <i className="bi bi-grid"></i>
            <span>Rate and review other courses</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;