import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProfileContext from '../../store/ProfileContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RateReviewIcon from '@mui/icons-material/RateReview';

function Sidebar() {
  const ctx = useContext(ProfileContext);
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link to="/contributor" className="nav-link">
            <DashboardIcon />
            &nbsp;
            <span>Dashboard</span>
          </Link>
        </li>
        {
          ctx.isProfileCreated && (
            <>
            <li className="nav-item">
              <Link to="create_course" className="nav-link">
                <AddCircleIcon />
                &nbsp;
                <span>Contribute</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contributor/view_others_contribution" className="nav-link">
                <RateReviewIcon />
                &nbsp;
                <span>Rate and review other contributions</span>
              </Link>
            </li>
            </>
          )
        }
      </ul>
    </aside>
  );
}

export default Sidebar;
