import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useEffect } from 'react';
import axios from 'axios';

interface Appointment {
  name: string;
  meetingLink: string;
  date: string;
  startTime: string;
}

const AppointmentManage: FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUser();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const consultantId = user?.consultantID; // hoặc user?.id nếu đó là id của consultant
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:8080/api/appointments/consultant/1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);


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
              backgroundColor: location.pathname === '/consultant/appointments' ? 'white' : 'transparent',
              color: location.pathname === '/consultant/appointments' ? '#272b69' : 'white',
              fontWeight: location.pathname === '/consultant/appointments' ? 'bold' : 'normal',
            }}
              onClick={() => navigate('/consultant/appointments')}>
              Appointment</li>

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
        <h1 style={{ color: '#272b69', marginBottom: '2rem' }}>Appointment Management</h1>

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
            color: '#333'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Patient Name</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Date</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Start Time</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Meeting Link</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appt, index) => (
                  <tr key={index}>
                    <td style={{ padding: '1rem' }}>{appt.name}</td>
                    <td style={{ padding: '1rem' }}>{appt.date}</td>
                    <td style={{ padding: '1rem' }}>{appt.startTime}</td>
                    <td style={{ padding: '1rem' }}>
                      <a href={appt.meetingLink} target="_blank" rel="noopener noreferrer">
                        {appt.meetingLink}
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ padding: '1rem', textAlign: 'center', color: '#333' }}>
                    No appointments found.
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

export default AppointmentManage; 