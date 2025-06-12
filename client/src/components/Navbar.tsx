import type { FC, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roleName?: string;
}

const Navbar: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    // Initial check
    updateUser();

    // Listen for storage changes
    window.addEventListener('storage', updateUser);

    // Cleanup
    return () => {
      window.removeEventListener('storage', updateUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleMouseOver = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#f0f1ff';
  };

  const handleMouseOut = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = 'white';
  };

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
        <Link to="/" style={{ 
          color: 'white', 
          textDecoration: 'none',
          transition: 'opacity 0.2s ease'
        }}>Home</Link>
        <Link to="/about" style={{ 
          color: 'white', 
          textDecoration: 'none',
          transition: 'opacity 0.2s ease'
        }}>About</Link>
        <Link to="/assessments" style={{ 
          color: 'white', 
          textDecoration: 'none',
          transition: 'opacity 0.2s ease'
        }}>Assessments</Link>
        <Link to="/articles" style={{ 
          color: 'white', 
          textDecoration: 'none',
          transition: 'opacity 0.2s ease'
        }}>Articles</Link>
        <Link to="/courses" style={{ 
          color: 'white', 
          textDecoration: 'none',
          transition: 'opacity 0.2s ease'
        }}>Courses</Link>
        <Link to="/appointment" style={{ 
          color: 'white', 
          textDecoration: 'none',
          transition: 'opacity 0.2s ease'
        }}>Appointment</Link>
        
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {user.roleName === 'ADMIN' && (
              <Link
                to="/admin"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                Admin Dashboard
              </Link>
            )}
            <span style={{ color: 'white' }}>
              {user.firstName} {user.lastName}
            </span>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: 'white',
                color: '#272b69',
                border: 'none',
                padding: '0.5rem 1.5rem',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            style={{
              backgroundColor: 'white',
              color: '#272b69',
              border: 'none',
              padding: '0.5rem 1.5rem',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e: MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.backgroundColor = '#f0f1ff';
            }}
            onMouseOut={(e: MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 