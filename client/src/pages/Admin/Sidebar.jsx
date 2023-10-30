import React from 'react';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import VerifiedIcon from '@mui/icons-material/Verified';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Sidebar() {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link to="/admin" className="nav-link">
            <DashboardIcon />
            &nbsp;
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="users" className="nav-link">
            <PeopleIcon />
            &nbsp;
            <span>Manage Users</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="courses" className="nav-link">
            <VerifiedIcon />
            &nbsp;
            <span>View Approved Courses</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="add_subject" className="nav-link">
            <AddCircleIcon />
            &nbsp;
            <span>Add Subject</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="add_unit" className="nav-link">
            <AddCircleIcon />
            &nbsp;
            <span>Add Units</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
