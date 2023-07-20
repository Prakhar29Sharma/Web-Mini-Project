
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  } from "react-router-dom";

import Dashboard from './screens/Dashboard';
import Profile from './screens/Profile';
import Settings from './screens/Settings';

function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/Profile" element={<Profile/>} />
            <Route path="/Settings" element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
