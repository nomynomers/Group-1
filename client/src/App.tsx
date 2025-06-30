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
import CoursesInfo from './components/CoursesInfo'
import LearningPage from './components/LearningPage'
import CreateUser from './components/CreateUser'
import UpdateUser from './components/UpdateUser'
import AssessmentPage from './components/AssessmentPage'
import QuestionPage from './components/QuestionPage'

import BookAppointment from './components/BookAppointment'
import MyAppointments from './components/MyAppointments'
import './App.css'

const AppContent = () => {
  const location = useLocation();
  
  // List of routes that should not display Navbar or Footer
  const noLayoutRoutes = [
    '/admin',
    '/admin/users/create',
    '/admin/users/:userId' // you may handle dynamic routes differently
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
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users/create" element={<CreateUser />} />
          <Route path="/admin/users/:userId" element={<UpdateUser />} />
          <Route path="/courses/:id" element={<CoursesInfo />} />
          <Route path="/learning/:courseId" element={<LearningPage />} />
          <Route path="/assessments" element={<AssessmentPage />} />
          <Route path="/assessments/:assessmentID" element={<QuestionPage />} />
          <Route path="/appointments/book" element={<BookAppointment />} />
          <Route path="/appointments/my" element={<MyAppointments />} />
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
