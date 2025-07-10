import type { FC, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar: FC = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
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
        <Link to="/appointments/book" style={{
          color: 'white',
          textDecoration: 'none',
          transition: 'opacity 0.2s ease'
        }}>Appointment</Link>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {(user.roleName === 'ADMIN' || user.roleName === 'ROLE_ADMIN') && (
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
            <span
              style={{
                color: 'white',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease'
              }}
              onClick={() => navigate('/profile')}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
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