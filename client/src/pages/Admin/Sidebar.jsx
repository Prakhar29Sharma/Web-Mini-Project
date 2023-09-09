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
            <span>Subjects and Units</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="courses" className="nav-link">
            <i className="bi bi-grid"></i>
            <span>View Courses</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="syllabus" className="nav-link">
            <i className="bi bi-grid"></i>
            <span>Syllabus</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
