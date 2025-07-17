import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Assessment from './components/Assessment'
import Team from './components/Team'
import Articles from './components/Articles'
import Courses from './components/Courses'
import About from './components/About'
import ArticlesPage from './components/ArticlesPage'
import CoursesPage from './components/CoursesPage'
import Login from './components/Login'
import SignUp from './components/SignUp'
import AdminDashboard from './components/AdminDashboard'
import CourseManage from './components/CourseManage'
import ModuleManage from './components/ModuleManage'
import AppointmentManage from './components/AppointmentManage'
import CoursesInfo from './components/CoursesInfo'
import LearningPage from './components/LearningPage'
import CreateUser from './components/CreateUser'
import CreateCourse from './components/CreateCourse'
import CreateModule from './components/CreateModule'
import UpdateUser from './components/UpdateUser'
import UpdateCourse from './components/UpdateCourse'
import UpdateModule from './components/UpdateModule'

import AssessmentPage from './components/AssessmentPage'
import AssistPage from './components/AssistPage'
import QuestionPage from './components/QuestionPage'
import ResultPage from './components/ResultPage'
import ResultAssist from './components/ResultAssist'

import BookAppointment from './components/BookAppointment'
import MyAppointments from './components/MyAppointments'

import ProfilePage from './components/ProfilePage'
import UserAssessment from './components/UserAssessment'
import UserCourse from './components/UserCourse'
import UserAppointment from './components/UserAppointment'

import ArticleDetails from './components/ArticleDetails';

import ArticlesAdmin from './components/ArticlesAdmin';

import './App.css'

const AppContent = () => {
  const location = useLocation();
  
  const noLayoutRoutes = [
    '/admin',
    '/admin/users/create',
    '/admin/users/:userId',
    "/consultant/appointments"
  ];

  const hideLayout = noLayoutRoutes.some((path) =>
    location.pathname.startsWith(path.replace(/:\w+/, ''))
  );

  return (
    <div className="app">
      {!hideLayout && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Assessment />
              <Team />
              <Articles />
              <Courses />
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin/users" element={<AdminDashboard />} />
          <Route path="/admin/courses" element={<CourseManage />} />
          <Route path="/consultant/appointments" element={<AppointmentManage />} />
          <Route path="/admin/users/create" element={<CreateUser />} />
          <Route path="/admin/courses/create" element={<CreateCourse />} />
          <Route path="/admin/courses/:courseID/modules/create" element={<CreateModule />} />
          <Route path="/admin/users/:userId" element={<UpdateUser />} />
          <Route path="/admin/courses/:courseId" element={<UpdateCourse />} />
          <Route path="/admin/modules/:moduleID/edit" element={<UpdateModule />} />
          <Route path="/admin/courses/:courseID/modules" element={<ModuleManage />} />
          <Route path="/courses/:id" element={<CoursesInfo />} />
          <Route path="/learning/:courseId" element={<LearningPage />} />
          <Route path="/assessments" element={<AssessmentPage />} />
          <Route path="/assessments/:assessmentID/assist" element={<AssistPage />} />
          <Route path="/assessments/:assessmentID/result" element={<ResultPage />} />
          <Route path="/assessments/:assessmentID/assist/result" element={<ResultAssist />} />
          <Route path="/assessments/:assessmentID" element={<QuestionPage />} />
          <Route path="/appointments/book" element={<BookAppointment />} />
          <Route path="/appointments/my" element={<MyAppointments />} />
          <Route path="/member/profile" element={<ProfilePage />} />
          <Route path="/member/assessment" element={<UserAssessment />} />
          <Route path="/member/appointment" element={<UserAppointment />} />
          <Route path="/member/courses" element={<UserCourse />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />
          <Route path="/admin/articles" element={<ArticlesAdmin />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
};

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

export default App;
