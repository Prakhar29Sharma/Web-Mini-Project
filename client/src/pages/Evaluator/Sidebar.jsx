import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProfileContext from '../../store/ProfileContext';

function Sidebar() {
  const ctx = useContext(ProfileContext);
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link to="/evaluator" className="nav-link">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="analysis" className="nav-link">
            <i className="bi bi-grid"></i>
            <span>Analysis</span>
          </Link>
        </li>
        
        {/* {
          ctx.isProfileCreated && (
            <>
            <li className="nav-item">
              <Link to="create_course" className="nav-link">
                <i className="bi bi-grid"></i>
                <span>Contribute</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contributor" className="nav-link">
                <i className="bi bi-grid"></i>
                <span>View your contributions</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contributor/view_others_contribution" className="nav-link">
                <i className="bi bi-grid"></i>
                <span>Rate and review other contributions</span>
              </Link>
            </li>
            </>
          )
        } */}
      </ul>
    </aside>
  );
}

export default Sidebar;
