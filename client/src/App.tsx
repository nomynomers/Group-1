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
import './App.css'

function App() {
  return (
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
