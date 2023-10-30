import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProfileContext from '../../store/ProfileContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChecklistIcon from '@mui/icons-material/Checklist';

function Sidebar() {
  const ctx = useContext(ProfileContext);
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link to="/evaluator" className="nav-link">
            <DashboardIcon />
            &nbsp;
            <span>Dashboard</span>
          </Link>
        </li>
        {
          ctx.isProfileCreated && (
            <>
            <li className="nav-item">
              <Link to="evaluate" className="nav-link">
                <ChecklistIcon />
                &nbsp;
                <span>Evaluate</span>
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
