// import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import ProfileContext from '../../store/ProfileContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PageviewIcon from '@mui/icons-material/Pageview';

function Sidebar() {
  // const ctx = useContext(ProfileContext);
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link to="/student" className="nav-link">
            <DashboardIcon />
            &nbsp;
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="all_courses" className="nav-link">
            <PageviewIcon />
            &nbsp;
            <span>Explore Courses</span>
          </Link>
        </li>
        {
          // ctx.isProfileCreated && (
          //   <>
          //   <li className="nav-item">
          //     <Link to="courses" className="nav-link">
          //       <i className="bi bi-grid"></i>
          //       <span>View Courses</span>
          //     </Link>
          //   </li>
          //   </>
          // )
        }
      </ul>
    </aside>
  );
}

export default Sidebar;
