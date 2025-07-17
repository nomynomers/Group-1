import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const styles = {
  container: {
    display: 'flex',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
    marginTop: '74px'
  },
  main: {
    flex: 1,
    padding: '2.5rem',
    backgroundColor: '#F9F9F9',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2rem',
    textAlign: 'left'
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    maxWidth: '100%',
    margin: '0 auto',
  },
  inputContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
    gap: '1.5rem',
    textAlign: 'left'
  },
  inputField: {
    width: '90%',
    padding: '0.5rem',
    backgroundColor: '#f3f4f6',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
  },
  button: {
    backgroundColor: '#003b5b',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    marginTop: '1rem',
  },
};

const ProfilePage = () => {
  interface UserProfile {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phoneNumber: string;
    registrationDate: string;
    roleName: string;
  }

  const [user, setUser] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/user/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUser(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : prev);
  };

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:8080/api/user/profile', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUser(formData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert('Failed to update profile');
    }
  };

  const formatDate = (isoDate: string) => {
    if (!isoDate) return '';
    const d = new Date(isoDate);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`; // For input type="date"
  };

  if (!formData) return <div style={{ padding: '2rem' }}>Loading...</div>;

  return (
    <div style={styles.container}>
      <Sidebar />

      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>
              Welcome, {formData.firstName || 'User'}
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              {new Date().toDateString()}
            </p>
          </div>
        </header>

        <section style={styles.profileCard}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
            <img
              src="https://res.cloudinary.com/ddtm7dvwo/image/upload/v1752736201/627904ad-4c92-4dd4-a659-b55e7a6a55f8.png"
              alt="avatar"
              style={{ borderRadius: '9999px', width: '4rem', height: '4rem' }}
            />
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: '0px', textAlign: 'left' }}>
                {formData.firstName} {formData.lastName}
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0px' }}>
                {formData.email}
              </p>
            </div>
          </div>

          <form style={styles.inputContainer}>
            <div>
              <label style={{ fontSize: '0.875rem' }}>First Name</label>
              <input
                type="text"
                name="firstName"
                style={{
                  ...styles.inputField,
                  color: isEditing ? 'black' : '#6b7280'
                }}
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.875rem' }}>Last Name</label>
              <input
                type="text"
                name="lastName"
                style={{
                  ...styles.inputField,
                  color: isEditing ? 'black' : '#6b7280'
                }}
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.875rem' }}>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                style={{
                  ...styles.inputField,
                  color: isEditing ? 'black' : '#6b7280'
                }}
                value={formatDate(formData.dateOfBirth)}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.875rem' }}>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                style={{
                  ...styles.inputField,
                  color: isEditing ? 'black' : '#6b7280'
                }}
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              {isEditing ? (
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="button" style={styles.button} onClick={handleSave}>Save</button>
                  <button
                    type="button"
                    style={{ ...styles.button, backgroundColor: '#6b7280' }}
                    onClick={() => {
                      setFormData(user);
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button type="button" style={styles.button} onClick={() => setIsEditing(true)}>Edit</button>
              )}
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
