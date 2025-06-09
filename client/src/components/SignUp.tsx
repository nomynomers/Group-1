import type { FC, FormEvent, ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  dateOfBirth: string;
}

const SignUp: FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    dateOfBirth: ''
  });
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          dateOfBirth: formData.dateOfBirth
        }),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const error = await response.json();
        setMessage(error.message || "Sign up failed.");
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.");
    }
  };

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
          Create Account
        </h1>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label 
                htmlFor="firstName"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#272b69',
                  fontWeight: '500'
                }}
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  backgroundColor: 'white',
                  color: '#333'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#272b69';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#ddd';
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label 
                htmlFor="lastName"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#272b69',
                  fontWeight: '500'
                }}
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  backgroundColor: 'white',
                  color: '#333'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#272b69';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#ddd';
                }}
              />
            </div>
          </div>

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
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                backgroundColor: 'white',
                color: '#333'
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
              htmlFor="phoneNumber"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#272b69',
                fontWeight: '500'
              }}
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                backgroundColor: 'white',
                color: '#333'
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
              htmlFor="dateOfBirth"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#272b69',
                fontWeight: '500'
              }}
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                backgroundColor: 'white',
                color: '#333'
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                backgroundColor: 'white',
                color: '#333'
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
              htmlFor="confirmPassword"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#272b69',
                fontWeight: '500'
              }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                backgroundColor: 'white',
                color: '#333'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#272b69';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#ddd';
              }}
            />
          </div>

          {message && <p style={{ color: 'red', margin: 0 }}>{message}</p>}

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            color: '#666'
          }}>
            <input 
              type="checkbox" 
              id="terms"
              required
              style={{ cursor: 'pointer', backgroundColor: 'white' }}
            />
            <label htmlFor="terms" style={{ cursor: 'pointer' }}>
              I agree to the{' '}
              <a href="#" style={{
                color: '#272b69',
                textDecoration: 'none',
                fontWeight: '500'
              }}>
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="#" style={{
                color: '#272b69',
                textDecoration: 'none',
                fontWeight: '500'
              }}>
                Privacy Policy
              </a>
            </label>
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
            Create Account
          </button>
        </form>

        <div style={{
          marginTop: '1.5rem',
          textAlign: 'center',
          color: '#666',
          fontSize: '0.9rem'
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{
            color: '#272b69',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp; 