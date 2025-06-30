import type { FC, FormEvent, ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CreateUserForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: string;
  roleName: string;
}

const CreateUser: FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateUserForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    dateOfBirth: '',
    roleName: 'USER'
  });
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/admin/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/admin');
      } else {
        const error = await response.json();
        setMessage(error.message || 'Failed to create user');
      }
    } catch (err) {
      setMessage('An error occurred while creating the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      padding: '120px 2rem 2rem',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          color: '#272b69',
          marginBottom: '2rem',
          fontSize: '2rem',
          fontWeight: '600'
        }}>
          Create New User
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label htmlFor="firstName" style={{ display: 'block', marginBottom: '0.5rem', color: '#272b69' }}>
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                backgroundColor: 'white',
                color: 'black',
              }}
            />
          </div>

          <div>
            <label htmlFor="lastName" style={{ display: 'block', marginBottom: '0.5rem', color: '#272b69' }}>
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                backgroundColor: 'white',
                color: 'black',
              }}
            />
          </div>

          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: '#272b69' }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                backgroundColor: 'white',
                color: 'black',
              }}
            />
          </div>

          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', color: '#272b69' }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                backgroundColor: 'white',
                color: 'black',
              }}
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" style={{ display: 'block', marginBottom: '0.5rem', color: '#272b69' }}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                backgroundColor: 'white',
                color: 'black',
              }}
            />
          </div>

          <div>
            <label htmlFor="dateOfBirth" style={{ display: 'block', marginBottom: '0.5rem', color: '#272b69' }}>
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
                backgroundColor: 'white',
                color: 'black',
              }}
            />
          </div>

          <div>
            <label htmlFor="roleName" style={{ display: 'block', marginBottom: '0.5rem', color: '#272b69' }}>
              Role
            </label>
            <select
              id="roleName"
              value={formData.roleName}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                backgroundColor: 'white',
                color: '#333'
              }}
            >
              <option value="USER" style={{ color: '#333' }}>User</option>
              <option value="ADMIN" style={{ color: '#333' }}>Admin</option>
            </select>
          </div>

          {message && (
            <div style={{ color: 'red', marginBottom: '1rem' }}>
              {message}
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: '#272b69',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
                flex: 1
              }}
            >
              {loading ? 'Creating...' : 'Create User'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
                flex: 1
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser; 