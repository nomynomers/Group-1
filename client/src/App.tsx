import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Assessment from './components/Assessment'
import Team from './components/Team'
import Articles from './components/Articles'
import Courses from './components/Courses'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Assessment />
        <Team />
        <Articles />
        <Courses />
      </main>
      <Footer />
    </div>
  )
}

export default App
