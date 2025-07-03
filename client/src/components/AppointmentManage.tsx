import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useEffect } from 'react';
import axios from 'axios';

interface Appointment {
  appointmentID: number;
  name: string;
  meetingLink: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
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
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id;

        if (!userId) {
          console.error("Missing userId");
          return;
        }

        // 1. Gọi API lấy consultantId dựa vào userId
        const consultantRes = await axios.get(
          `http://localhost:8080/api/consultants/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const consultantId = consultantRes.data;

        // 2. Dùng consultantId để lấy lịch hẹn
        const appointmentRes = await axios.get(
          `http://localhost:8080/api/appointments/consultant/${consultantId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAppointments(appointmentRes.data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to fetch appointments');
      } finally {
        setLoading(false);
      }
    };


    fetchAppointments();
  }, [user]);


  const updateStatus = async (appointmentId: number, status: string) => {
    const token = localStorage.getItem('token');
    console.log("Token", localStorage.getItem("token"));

    try {
      await axios.put(
        `http://localhost:8080/api/appointments/${appointmentId}/status?status=${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Sau khi cập nhật, làm mới danh sách
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.appointmentID === appointmentId ? { ...appt, status } : appt
        )
      );
    } catch (err: any) {
      console.error('Update failed', err);
      alert('Failed to update appointment status.');
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
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Time Slot</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Meeting Link</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appt, index) => (
                  <tr key={index}>
                    <td style={{ padding: '1rem' }}>{appt.name}</td>
                    <td style={{ padding: '1rem' }}>{appt.date}</td>
                    <td style={{ padding: '1rem' }}>{appt.startTime}-{appt.endTime}</td>
                    <td style={{ padding: '1rem' }}>
                      <a href={appt.meetingLink} target="_blank" rel="noopener noreferrer">
                        {appt.meetingLink}
                      </a>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {appt.status === 'Confirmed' ? (
                        <button
                          disabled
                          style={{
                            backgroundColor: '#ccc',
                            color: '#666',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            cursor: 'not-allowed'
                          }}
                        >
                          Accepted
                        </button>
                      ) : appt.status === 'Canceled' ? (
                        <button
                          disabled
                          style={{
                            backgroundColor: '#f5c6cb',
                            color: '#721c24',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            cursor: 'not-allowed'
                          }}
                        >
                          Canceled
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              if (window.confirm('Are you sure you want to accept this appointment?')) {
                                updateStatus(appt.appointmentID, 'Confirmed');
                              }
                            }}

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
                            Accept
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('Are you sure you want to cancel this appointment?')) {
                                updateStatus(appt.appointmentID, 'Canceled');
                              }
                            }}

                            style={{
                              backgroundColor: '#dc3545',
                              color: 'white',
                              border: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            Cancel
                          </button>
                        </>
                      )}
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