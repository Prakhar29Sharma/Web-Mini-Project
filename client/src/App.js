import './App.modules.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from './pages/LoginPage/Login';
import Register from './pages/RegisterPage/Register';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Admin from './pages/Admin/Admin';
import Evaluator from './pages/Evaluator/Evaluator';
import Contributor from './pages/Contributor/Contributor';
import Student from './pages/Student/Student';
import Navbar from './components/Navbar';
import SubjectList from './pages/Admin/SubjectList';
import { loader as adminLoader } from './pages/Admin/Admin';
import { loader as evaluatorLoader } from './pages/Evaluator/Evaluator';
import { loader as contributorLoader } from './pages/Contributor/Contributor';
import { loader as studentLoader } from './pages/Student/Student';
import { loader as CreateProfileLoader } from './pages/Contributor/CreateProfile';
import { RootLayout as AdminRootLayout } from './pages/Admin/RootLayout';
import { RootLayout as ContributorRootLayout } from './pages/Contributor/RootLayout';
import { action as CreateProfileAction } from './pages/Contributor/CreateProfile';
import { action as CreateCourseAction } from './pages/Contributor/CreateCourse';
import logoutAction from "./pages/Logout";
import CreateProfile from './pages/Contributor/CreateProfile';
import Profile from './pages/Contributor/Profile';
import CreateCourse from './pages/Contributor/CreateCourse';
import CreateContent from './pages/Contributor/CreateContent';



function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      errorElement: <NotFound />,
      children: [
        { path: '', element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> }
      ]
    },
    {
      path: '/admin',
      loader: adminLoader,
      id: 'admin',
      element: <AdminRootLayout />,
      children: [
        { path: '', element: <Admin />, index: true},
        { path: 'subjects', element: <SubjectList /> }
      ]
    },
    {
      path: '/evaluator',
      id: 'evaluator',
      loader: evaluatorLoader,
      children: [
        { path: '', element: <Evaluator /> },
      ],
    },
    {
      path: '/contributor',
      id: 'contributor',
      loader: contributorLoader,
      element: <ContributorRootLayout />,
      children: [
        { path: '', element: <Contributor /> },
        { path: 'create_profile', element: <CreateProfile />, action: CreateProfileAction, loader: CreateProfileLoader},
        { path: 'profile', element: <Profile /> },
        { path: 'create_course', element: <CreateCourse />, action: CreateCourseAction },
        { path: 'create_content/:subject/:unit', element: <CreateContent /> },
      ]
    },
    {
      path: '/student',
      id: 'student',
      loader: studentLoader,
      children: [
        { path: '', element: <Student /> },
      ]
    }, 
    { 
      path: '/logout',
      action: logoutAction,
      children: [],
    }
  ]);

  return <RouterProvider router={router} />
}

export default App;
