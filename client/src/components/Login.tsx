import type { FC } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login: FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{
      padding: '120px 0 60px',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          color: '#272b69',
          fontSize: '2rem',
          marginBottom: '1.5rem',
          textAlign: 'center',
          fontWeight: '700'
        }}>
          Welcome Back
        </h1>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label 
              htmlFor="email"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#272b69',
                fontWeight: '500'
              }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                backgroundColor: 'white'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#272b69';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#ddd';
              }}
            />
          </div>

          <div>
            <label 
              htmlFor="password"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#272b69',
                fontWeight: '500'
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                backgroundColor: 'white'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#272b69';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#ddd';
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.9rem'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#666',
              cursor: 'pointer'
            }}>
              <input type="checkbox" style={{ cursor: 'pointer', backgroundColor: 'white' }} />
              Remember me
            </label>
            <a href="#" style={{
              color: '#272b69',
              textDecoration: 'none',
              fontWeight: '500'
            }}>
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: '#272b69',
              color: 'white',
              border: 'none',
              padding: '0.75rem',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#1f2254';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#272b69';
            }}
          >
            Sign In
          </button>
        </form>

        <div style={{
          marginTop: '1.5rem',
          textAlign: 'center',
          color: '#666',
          fontSize: '0.9rem'
        }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{
            color: '#272b69',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 