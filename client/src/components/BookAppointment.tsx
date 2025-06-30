import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

const BookAppointment: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [appointmentDate, setAppointmentDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const token = localStorage.getItem('token');
    if (!token || !user?.id) {
      setMessage('Please log in to book an appointment.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/appointments/book',
        {
          userID: parseInt(user.id, 10),
          appointmentDate,
          startTime: startTime.length === 5 ? `${startTime}:00` : startTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setMessage(response.data.message || 'Appointment booked successfully!');
      setTimeout(() => {
        navigate('/appointments/my');
      }, 1500);
    } catch (error: any) {
      const errMsg = error.response?.data?.message || 'Booking failed.';
      setMessage(errMsg);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '3rem 1.5rem' }}>
      <div style={{ backgroundColor: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', borderRadius: '1rem', padding: '2.5rem', width: '100%', maxWidth: '768px', margin: '100px auto' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: '700', textAlign: 'center', color: '#1e3a8a', marginBottom: '2rem' }}>
          Book a Consultation Appointment
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.25rem', color: 'black' }}>Appointment Date</label>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                style={{ width: '90%', padding: '0.75rem', paddingRight: '2.5rem', border: '1px solid #d1d5db', borderRadius: '0.75rem', backgroundColor: 'white', color: '#1f2937', fontSize: '1rem', marginBottom: '1rem' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.25rem', color: 'black' }}>Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                style={{ width: '90%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.75rem', backgroundColor: 'white', color: '#1f2937', fontSize: '1rem' }}
                required
              />
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              type="submit"
              style={{ backgroundColor: '#2563eb', color: 'white', fontSize: '1.125rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', transition: 'background-color 0.3s', border: 'none', cursor: 'pointer' }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
            >
              Book Appointment
            </button>
          </div>
        </form>

        {message && (
          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '1.125rem', fontWeight: '500', color: 'black' }}>
            {message}
          </div>
        )}

        {user && (
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <Link to="/appointments/my">View My Appointments</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
