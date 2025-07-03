import { useEffect, useState } from 'react';
import axios from 'axios';

interface Appointment {
  consultantName: string;
  meetingLink: string | null;
  date: string;
  startTime: string;
}

const MyAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found. Please login.');
      setLoading(false);
      return;
    }

    axios.get('http://localhost:8080/api/appointments/my', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setAppointments(res.data);
    })
    .catch(err => {
      console.error('Error fetching appointments', err);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ maxWidth: '768px', margin: '2rem auto', backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
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
              <p><strong>Date:</strong> {a.date}</p>
              <p><strong>Time:</strong> {a.startTime}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAppointments;
