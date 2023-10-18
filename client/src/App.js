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
import { loader as adminLoader } from './pages/Admin/Admin';
import { loader as evaluatorLoader } from './pages/Evaluator/Evaluator';
import { loader as contributorLoader } from './pages/Contributor/Contributor';
import { loader as studentLoader } from './pages/Student/Student';
import { loader as CreateContributorProfileLoader } from './pages/Contributor/CreateProfile';
import { loader as CreateContentLoader } from './pages/Contributor/CreateContent';
import { loader as CreateEvaluatorProfileLoader} from './pages/Evaluator/CreateProfile';
import { RootLayout as AdminRootLayout } from './pages/Admin/RootLayout';
import { RootLayout as ContributorRootLayout } from './pages/Contributor/RootLayout';
import { RootLayout as EvaluatorRootLayout } from './pages/Evaluator/RootLayout';
import { RootLayout as StudentRootLayout } from './pages/Student/RootLayout';
import { action as CreateContributorProfileAction } from './pages/Contributor/CreateProfile';
import { action as CreateEvaluatorProfileAction } from './pages/Evaluator/CreateProfile';
import { action as CreateCourseAction } from './pages/Contributor/CreateCourse';
import { action as CreateContentAction } from './pages/Contributor/CreateContent';
import { action as AddUnitAction } from './pages/Admin/AddUnit';
import { action as EditCourseAction } from './pages/Contributor/EditCourse';
import { action as AddSubjectAction } from './pages/Admin/AddSubject';
import logoutAction from "./pages/Logout";
import CreateContributorProfile from './pages/Contributor/CreateProfile';
import CreateEvaluatorProfile from './pages/Evaluator/CreateProfile';
import ContributorProfile from './pages/Contributor/Profile';
import EvaluatorProfile from './pages/Evaluator/Profile';
import CreateCourse from './pages/Contributor/CreateCourse';
import CreateContent from './pages/Contributor/CreateContent';
import AddUnit from './pages/Admin/AddUnit';
import AddSubject from './pages/Admin/AddSubject';
import EditCourse from './pages/Contributor/EditCourse';
import ViewCourse from './pages/Contributor/ViewCourse';
import ViewApprovedCourse from './pages/Admin/Courses';
import ViewStudentCourse from './pages/Student/ViewCourse';
import RateAndReview from './pages/Contributor/RateAndReview';
import EvaluatorRateAndReview from './pages/Evaluator/RateAndReview';
import AdminViewCourse from './pages/Admin/ViewCourse';
import ManageUsers from './pages/Admin/ManageUsers';
import ViewOthersContribution from './pages/Contributor/ViewOthersContribution';
import Notifications from './pages/Contributor/Notifications';
import PublicProfile from './pages/Home/PublicProfile';
import Evaluate from './pages/Evaluator/Evaluate';
import AboutUs from './pages/Home/AboutUs';
import ContactUs from './pages/Home/ContactUs';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      errorElement: <NotFound />,
      children: [
        { path: '', element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'contributor/:username', element: <PublicProfile /> },
        { path: 'aboutus', element: <AboutUs /> },
        { path: 'contact', element: <ContactUs /> }
      ]
    },
    {
      path: '/admin',
      loader: adminLoader,
      id: 'admin',
      element: <AdminRootLayout />,
      children: [
        { path: '', element: <Admin />, index: true},
        { path: 'add_subject', element: <AddSubject />, action: AddSubjectAction },
        { path: 'add_unit', element: <AddUnit />, action: AddUnitAction },
        { path: 'courses', element: <ViewApprovedCourse /> },
        { path: 'review/course/:courseId', element: <AdminViewCourse /> },
        { path: 'users', element: <ManageUsers /> }
      ]
    },
    {
      path: '/evaluator',
      id: 'evaluator',
      loader: evaluatorLoader,
      element: <EvaluatorRootLayout />,
      children: [
        { path: '', element: <Evaluator /> },
        { path: 'create_profile', element: <CreateEvaluatorProfile />, action: CreateEvaluatorProfileAction, loader: CreateEvaluatorProfileLoader},
        { path: 'profile', element: <EvaluatorProfile />},
        { path: 'evaluate', element: <Evaluate /> },
        { path: 'evaluate/review/course/:courseId', element: <EvaluatorRateAndReview /> }
      ],
    },
    {
      path: '/contributor',
      id: 'contributor',
      loader: contributorLoader,
      element: <ContributorRootLayout />,
      children: [
        { path: '', element: <Contributor /> },
        { path: 'create_profile', element: <CreateContributorProfile />, action: CreateContributorProfileAction, loader: CreateContributorProfileLoader},
        { path: 'profile', element: <ContributorProfile /> },
        { path: 'create_course', element: <CreateCourse />, action: CreateCourseAction },
        { path: 'create_content/:subject/:unit', element: <CreateContent />, action: CreateContentAction, loader: CreateContentLoader },
        { path: 'edit_course/:courseId', element: <EditCourse />, action: EditCourseAction },
        { path: 'course/:courseId', element: <ViewCourse /> },
        { path: 'view_others_contribution', element: <ViewOthersContribution /> },
        { path: 'rate_and_review/:courseId', element: <RateAndReview /> },
        { path: 'notifications', element: <Notifications /> }
      ]
    },
    {
      path: '/student',
      id: 'student',
      loader: studentLoader,
      element: <StudentRootLayout />,
      children: [
        { path: '', element: <Student /> },
        { path: 'course/:courseId', element: <ViewStudentCourse /> }
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
