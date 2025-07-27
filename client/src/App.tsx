/**
 * @file This file is the root of the React application.
 * It sets up the main routing and layout of the application.
 */
// Import necessary modules from react-router-dom for routing.
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// Import the UserProvider from the UserContext to provide user data throughout the app.
import { UserProvider } from './context/UserContext';
// Import various components used in the application's routes and layout.
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Assessment from './components/Assessment';
import Team from './components/Team';
import Articles from './components/Articles';
import Courses from './components/Courses';
import About from './components/About';
import ArticlesPage from './components/ArticlesPage';
import CoursesPage from './components/CoursesPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AdminDashboard from './components/AdminDashboard';
import CourseManage from './components/CourseManage';
import ModuleManage from './components/ModuleManage';
import AppointmentManage from './components/AppointmentManage';
import CoursesInfo from './components/CoursesInfo';
import LearningPage from './components/LearningPage';
import CreateUser from './components/CreateUser';
import CreateCourse from './components/CreateCourse';
import CreateModule from './components/CreateModule';
import UpdateUser from './components/UpdateUser';
import UpdateCourse from './components/UpdateCourse';
import UpdateModule from './components/UpdateModule';
import AssessmentPage from './components/AssessmentPage';
import AssistPage from './components/AssistPage';
import QuestionPage from './components/QuestionPage';
import ResultPage from './components/ResultPage';
import ResultAssist from './components/ResultAssist';
import BookAppointment from './components/BookAppointment';
import MyAppointments from './components/MyAppointments';
import ProfilePage from './components/ProfilePage';
import ProfileConsultant from './components/ProfileConsultant';
import UserAssessment from './components/UserAssessment';
import UserCourse from './components/UserCourse';
import UserAppointment from './components/UserAppointment';
import ArticleDetails from './components/ArticleDetails';
import ArticlesAdmin from './components/ArticlesAdmin';
// Import the main application CSS for styling.
import './App.css';

/**
 * The main content of the application, including the navbar, footer, and routing logic.
 * The navbar and footer are hidden for certain routes (e.g., admin and consultant pages).
 */
const AppContent = () => {
  // useLocation hook provides access to the current URL location object.
  const location = useLocation();

  // An array of routes where the standard layout (Navbar and Footer) should be hidden.
  const noLayoutRoutes = [
    '/admin',
    '/admin/users/create',
    '/admin/users/:userId',
    "/consultant"
  ];

  // Determines if the current route matches any of the routes that should not have the standard layout.
  // It checks if the current pathname starts with any of the noLayoutRoutes, after removing dynamic segments like ':userId'.
  const hideLayout = noLayoutRoutes.some((path) =>
    location.pathname.startsWith(path.replace(/:\w+/, ''))
  );

  return (
    <div className="app">
      {/* Conditionally render the Navbar if the route is not in noLayoutRoutes */}
      {!hideLayout && <Navbar />}
      <main>
        {/* Defines all the application routes using React Router's Routes component. */}
        <Routes>
          {/* The home page route, which renders several components */}
          <Route path="/" element={
            <>
              <Hero />
              <Assessment />
              <Team />
              <Articles />
              <Courses />
            </>
          } />
          {/* Other application routes */}
          <Route path="/about" element={<About />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Admin-specific routes */}
          <Route path="/admin/users" element={<AdminDashboard />} />
          <Route path="/admin/courses" element={<CourseManage />} />
          <Route path="/consultant/appointments" element={<AppointmentManage />} />
          <Route path="/consultant/profile" element={<ProfileConsultant />} />
          <Route path="/admin/users/create" element={<CreateUser />} />
          <Route path="/admin/courses/create" element={<CreateCourse />} />
          <Route path="/admin/courses/:courseID/modules/create" element={<CreateModule />} />
          <Route path="/admin/users/:userId" element={<UpdateUser />} />
          <Route path="/admin/courses/:courseId" element={<UpdateCourse />} />
          <Route path="/admin/modules/:moduleID/edit" element={<UpdateModule />} />
          <Route path="/admin/courses/:courseID/modules" element={<ModuleManage />} />
          {/* Course and learning routes */}
          <Route path="/courses/:id" element={<CoursesInfo />} />
          <Route path="/learning/:courseId" element={<LearningPage />} />
          {/* Assessment routes */}
          <Route path="/assessments" element={<AssessmentPage />} />
          <Route path="/assessments/:assessmentID/assist" element={<AssistPage />} />
          <Route path="/assessments/:assessmentID/result" element={<ResultPage />} />
          <Route path="/assessments/:assessmentID/assist/result" element={<ResultAssist />} />
          <Route path="/assessments/:assessmentID" element={<QuestionPage />} />
          {/* Appointment routes */}
          <Route path="/appointments/book" element={<BookAppointment />} />
          <Route path="/appointments/my" element={<MyAppointments />} />
          {/* User-specific routes */}
          <Route path="/member/profile" element={<ProfilePage />} />
          <Route path="/member/assessment" element={<UserAssessment />} />
          <Route path="/member/appointment" element={<UserAppointment />} />
          <Route path="/member/courses" element={<UserCourse />} />
          {/* Article routes */}
          <Route path="/articles/:id" element={<ArticleDetails />} />
          <Route path="/admin/articles" element={<ArticlesAdmin />} />
        </Routes>
      </main>
      {/* Conditionally render the Footer if the route is not in noLayoutRoutes */}
      {!hideLayout && <Footer />}
    </div>
  );
};

/**
 * The root component of the application.
 * It sets up the router and the user context provider.
 */
function App() {
  return (
    // The UserProvider makes user data available to all components in the application.
    <UserProvider>
      {/* The Router component enables routing in the application. */}
      <Router>
        {/* AppContent component contains the main layout and routing logic. */}
        <AppContent />
      </Router>
    </UserProvider>
  );
}

export default App;