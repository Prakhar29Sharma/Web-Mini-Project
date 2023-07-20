
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  } from "react-router-dom";

import Dashboard from './screens/Dashboard';
import Profile from './screens/Profile';
import Course from './screens/Course';

function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/Profile" element={<Profile/>} />
            <Route path="/Course" element={<Course/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
