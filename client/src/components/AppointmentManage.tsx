import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useEffect } from 'react';
import axios from 'axios';
import SidebarConsultant from './SidebarConsultant';

interface Appointment {
  appointmentID: number;
  name: string;
  meetingLink: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  note: string;
  userID: number;
}

interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
}

interface UserAssessment {
  userAssessmentID: number;
  assessmentID: number;
  completionDate: string;
  riskLevel: string;
  totalScore: number;
  recommendationProvided: boolean;
}


const AppointmentManage: FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUser();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelNote, setCancelNote] = useState('');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [userAssessments, setUserAssessments] = useState<UserAssessment[]>([]);
  const [showAssessmentsModal, setShowAssessmentsModal] = useState(false);

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

        const consultantRes = await axios.get(
          `http://localhost:8080/api/consultants/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const consultantId = consultantRes.data;

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

  const fetchUserProfile = async (userID: number) => {
    try {
      const token = localStorage.getItem('token');

      const [userRes, assessmentsRes] = await Promise.all([
        axios.get(`http://localhost:8080/api/consultants/user-info/${userID}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`http://localhost:8080/api/user-assessments/${userID}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setSelectedUser(userRes.data);
      setUserAssessments(assessmentsRes.data); // store assessment list
      setShowUserModal(true);
    } catch (error) {
      console.error("Failed to fetch user profile or assessments", error);
    }
  };

  const handleCancel = (appointmentId: number) => {
    setSelectedAppointmentId(appointmentId);
    setCancelNote('');
    setShowCancelModal(true);
  };

  const submitCancelNote = async () => {
    if (!cancelNote.trim()) {
      alert('Please enter a note for cancellation.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:8080/api/appointments/${selectedAppointmentId}/cancel`,
        { note: cancelNote },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Update status locally
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.appointmentID === selectedAppointmentId
            ? { ...appt, status: 'Canceled', note: cancelNote }
            : appt
        )
      );

      setShowCancelModal(false);
    } catch (err) {
      console.error('Failed to cancel appointment:', err);
      alert('Error cancelling appointment.');
    }
  };


  const updateStatus = async (appointmentId: number, status: string) => {
    const token = localStorage.getItem('token');

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

      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;

      const consultantRes = await axios.get(
        `http://localhost:8080/api/consultants/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const consultantId = consultantRes.data;

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
      <SidebarConsultant />

      <div style={{ padding: '20px 2rem 2rem', width: '100%', marginLeft: '300px' }}>
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
                  <tr key={index} style={{ borderBottom: '1px solid #dee2e6', backgroundColor: 'white' }}>
                    <td style={{ padding: '1rem' }}>
                      <span
                        onClick={() => fetchUserProfile(appt.userID)}
                        style={{
                          color: '#007bff',
                          cursor: 'pointer'
                        }}
                      >
                        {appt.name}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>{appt.date}</td>
                    <td style={{ padding: '1rem' }}>{appt.startTime}-{appt.endTime}</td>
                    <td style={{ padding: '1rem' }}>
                      {appt.status === "Confirmed" ? (
                        <a href={appt.meetingLink} target="_blank" rel="noopener noreferrer">
                          {appt.meetingLink}
                        </a>
                      ) : (
                        <span style={{ color: '#9CA3AF', fontStyle: 'italic' }}>Accept to get meeting link</span>
                      )}
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
                            onClick={() => handleCancel(appt.appointmentID)}
                            style={{
                              backgroundColor: '#dc3545',
                              color: 'white',
                              border: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '4px',
                              cursor: 'pointer',
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
      {showCancelModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white', padding: '2rem', borderRadius: '8px',
            width: '400px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#272b69' }}>Cancel Appointment</h3>
            <textarea
              rows={4}
              value={cancelNote}
              onChange={(e) => setCancelNote(e.target.value)}
              placeholder="Enter reason for cancellation..."
              style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', color: 'black', backgroundColor: 'white' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowCancelModal(false)}
                style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}
              >
                Cancel
              </button>
              <button
                onClick={submitCancelNote}
                style={{ backgroundColor: '#dc3545', color: 'white', padding: '0.5rem 1rem', border: 'none' }}
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      {showUserModal && selectedUser && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              width: '600px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}
          >
            <h3 style={{ marginBottom: '1rem', color: '#272b69' }}>User Profile</h3>
            <p><strong>First Name:</strong> {selectedUser.firstName}</p>
            <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phoneNumber}</p>
            <p><strong>Date of Birth:</strong> {selectedUser.dateOfBirth}</p>

            {selectedUser && (
              <div style={{ padding: '1rem 0' }}>
                <h3 style={{ marginBottom: '0.5rem', color: '#272b69' }}>Assessment History</h3>
                {userAssessments.length > 0 ? (
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc'}}>
                    <thead>
                      <tr style={{ backgroundColor: '#272b69' }}>
                        <th style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>Assessment ID</th>
                        <th style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>Completion Date</th>
                        <th style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>Risk Level</th>
                        <th style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>Total Score</th>
                        <th style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>Recommendation</th>
                        <th style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userAssessments.map((a) => (
                        <tr key={a.userAssessmentID} style={{color: '#272b69'}}>
                          <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{a.assessmentID}</td>
                          <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                            {new Date(a.completionDate).toLocaleDateString()}
                          </td>
                          <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{a.riskLevel}</td>
                          <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{a.totalScore}</td>
                          <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                            {a.recommendationProvided}
                          </td>
                          <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                            <a onClick={() => navigate(`/assessments/${a.userAssessmentID}/assist/result`)}>View</a >
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p style={{ fontStyle: 'italic' }}>No assessments found.</p>
                )}
              </div>
            )}



            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button
                onClick={() => setShowUserModal(false)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#272b69',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>

  );
};

export default AppointmentManage; 