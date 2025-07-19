import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

interface Appointment {
  name: string;
  meetingLink: string | null;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  note?: string;
}

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
  profileCard: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    maxWidth: '100%',
    margin: '0 auto',
  },
};

const UserAssessment = () => {
  const token = localStorage.getItem("token");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      console.error("Token not found");
      setLoading(false);
      return;
    }

    axios.get("http://localhost:8080/api/appointments/my", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setAppointments(res.data);
      })
      .catch(err => {
        console.error("Error fetching appointments:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  return (
    <div style={styles.container}>
      <Sidebar />

      <main style={styles.main}>
        <section style={styles.profileCard}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>My Appointments</h2>

          {loading ? (
            <p>Loading...</p>
          ) : appointments.length === 0 ? (
            <p style={{ color: '#6B7280' }}>You have no appointments.</p>
          ) : (
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {appointments.map((a, idx) => (
                <li key={idx} style={{ border: '1px solid #E5E7EB', padding: '1rem', borderRadius: '0.5rem' }}>
                  <p><strong>Consultant:</strong> {a.name}</p>
                  {a.status === "Confirmed" && (
                    <p>
                      <strong>Meeting Link:</strong>{' '}
                      {a.meetingLink ? (
                        <a href={a.meetingLink} target="_blank" rel="noopener noreferrer" style={{ color: '#2563EB', textDecoration: 'underline' }}>
                          {a.meetingLink}
                        </a>
                      ) : (
                        <span style={{ color: '#9CA3AF', fontStyle: 'italic' }}>No link</span>
                      )}
                    </p>
                  )}
                  <p><strong>Date:</strong> {a.date}</p>
                  <p><strong>Time:</strong> {a.startTime} - {a.endTime}</p>
                  <p><strong>Status:</strong> {a.status}</p>
                  {a.note && (
                    <p><strong>Response from Consultant:</strong> {a.note}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default UserAssessment;
