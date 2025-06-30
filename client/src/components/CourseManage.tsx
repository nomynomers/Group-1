import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const CourseManage: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUser();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Users data:', data);
        console.log('First user:', data[0]);
        setUsers(data);
      } else if (response.status === 403) {
        console.log('Access forbidden');
        navigate('/');
      } else {
        console.log('Failed to fetch users:', response.status);
        setError('Failed to fetch users');
      }
    } catch (err) {
      setError('An error occurred while fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setUsers(users.filter(user => user.userId !== userId));
      } else {
        setError('Failed to delete user');
      }
    } catch (err) {
      setError('An error occurred while deleting user');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div
        style={{
          width: '220px',
          backgroundColor: '#272b69',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 2rem 2rem',
        }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '40px',
        }}>DRUG PREVENT</h2>
        <nav>
          <ul style={{
            listStyle: 'none',
            textAlign: 'left',
          }}>
            <li style={{
              margin: '10px 0',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '8px',
              width: '70%',
            }}
              onClick={() => navigate('/admin')}>
              Dashboard</li>

            <li style={{
              margin: '10px 0',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '8px',
              width: '70%',
              backgroundColor: location.pathname === '/admin/courses' ? 'white' : 'transparent',
              color: location.pathname === '/admin/courses' ? '#272b69' : 'white',
              fontWeight: location.pathname === '/admin/courses' ? 'bold' : 'normal',
            }}
              onClick={() => navigate('/admin/courses')}>
              Courses</li>

            <li style={{
              margin: '10px 0',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '8px',
              width: '70%',
              backgroundColor: location.pathname === '/admin/users' ? 'white' : 'transparent',
              color: location.pathname === '/admin/users' ? '#272b69' : 'white',
              fontWeight: location.pathname === '/admin/users' ? 'bold' : 'normal',
            }}
              onClick={() => navigate('/admin/users')}
            >Users</li>

            <li style={{
              margin: '10px 0',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '8px',
              width: '70%',
            }}>Settings</li>
          </ul>
        </nav>
      </div>

      <div style={{ padding: '20px 2rem 2rem', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={() => navigate('/admin/users/create')}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              marginTop: '1rem',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Create New Course
          </button>
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
          >
            Logout
          </button>
        </div>
        <h1 style={{ color: '#272b69', marginBottom: '2rem' }}>Course Management</h1>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          marginTop: '2rem'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            color: '#333' // Ensure text is visible
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Name</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Description</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Target Audience</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Duration</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Image Cover</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Author</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map(user => {
                  console.log('Rendering user:', user);
                  return (
                    <tr key={user.userId} style={{ borderBottom: '1px solid #dee2e6', backgroundColor: 'white' }}>
                      <td style={{ padding: '1rem', color: '#333' }}>{user.firstName} {user.lastName}</td>
                      <td style={{ padding: '1rem', color: '#333' }}>{user.email}</td>
                      <td style={{ padding: '1rem', color: '#333' }}>{user.phoneNumber || 'N/A'}</td>
                      <td style={{ padding: '1rem', color: '#333' }}>{user.roleName || 'N/A'}</td>
                      <td style={{ padding: '1rem' }}>
                        <button
                          onClick={() => navigate(`/admin/users/${user.userId}`)}
                          style={{
                            backgroundColor: '#272b69',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            marginRight: '0.5rem',
                            cursor: 'pointer'
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.userId)}
                          style={{
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} style={{ padding: '1rem', textAlign: 'center', color: '#333' }}>
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CourseManage; 