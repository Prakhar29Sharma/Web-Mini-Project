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
          <Link to="courses" className="nav-link">
            <i className="bi bi-grid"></i>
            <span>View Approved Courses</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="add_subject" className="nav-link">
            <i className="bi bi-grid"></i>
            <span>Add Subject</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="add_unit" className="nav-link">
            <i className="bi bi-grid"></i>
            <span>Add Units</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
