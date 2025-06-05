import type { FC } from 'react';

const Navbar: FC = () => {
  return (
    <nav style={{
      backgroundColor: '#272b69', // Updated blue
      padding: '1rem 2rem',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Subtle shadow for depth
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        fontSize: '1.5rem', 
        fontWeight: 'bold',
        letterSpacing: '0.5px'
      }}>
        Medical Portal
      </div>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <a href="/" style={{ 
          color: 'white', 
          textDecoration: 'none',
          transition: 'opacity 0.2s ease'
        }}>Home</a>
        <a href="/about" style={{ 
          color: 'white', 
          textDecoration: 'none',
          transition: 'opacity 0.2s ease'
        }}>About</a>
        <a href="/assessments" style={{ 
          color: 'white', 
          textDecoration: 'none',
          transition: 'opacity 0.2s ease'
        }}>Assessments</a>
        <a href="/courses" style={{ 
          color: 'white', 
          textDecoration: 'none',
          transition: 'opacity 0.2s ease'
        }}>Courses</a>
        <a href="/appointment" style={{ 
          color: 'white', 
          textDecoration: 'none',
          transition: 'opacity 0.2s ease'
        }}>Appointment</a>
        <button 
          className="login-button"
          style={{
            backgroundColor: 'white',
            color: '#272b69',
            border: 'none',
            padding: '0.5rem 1.5rem',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 