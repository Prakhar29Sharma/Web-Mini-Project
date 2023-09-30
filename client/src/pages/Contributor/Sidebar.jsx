import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link to="/contributor" className="nav-link">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="create_course" className="nav-link">
            <i className="bi bi-grid"></i>
            <span>Contribute</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="" className="nav-link">
            <i className="bi bi-grid"></i>
            <span>View your contributions</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="" className="nav-link">
            <i className="bi bi-grid"></i>
            <span>Rate and review other contributions</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
