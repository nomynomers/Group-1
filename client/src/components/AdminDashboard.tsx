import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  registrationDate: string;
  roleName: string;
}

const AdminDashboard: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
        console.log('First user:', data[0]); // Debug log for first user
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ padding: '120px 2rem 2rem' }}>
      <h1 style={{ color: '#272b69', marginBottom: '2rem' }}>User Management</h1>
      
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
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Name</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Email</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Phone</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Role</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Actions</th>
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
          fontSize: '1rem'
        }}
      >
        Create New User
      </button>
    </div>
  );
};

export default AdminDashboard; 