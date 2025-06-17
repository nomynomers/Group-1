import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import { UserProvider } from './context/UserContext'

import './App.css'

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Navbar />
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
              <Route path="/courses/:id" element={<CoursesInfo />} />
              <Route path="/learning/:courseId" element={<LearningPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  )
}

export default App
