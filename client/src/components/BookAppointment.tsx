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
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-10">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Book a Consultation Appointment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium mb-1">Appointment Date</label>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-1">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white text-lg px-6 py-3 rounded-xl hover:bg-blue-700 transition duration-300"
            >
              Book Appointment
            </button>
          </div>
        </form>

        {message && (
          <div className="mt-6 text-center text-lg font-medium text-green-600">
            {message}
          </div>
        )}

        {user && (
          <div className="mt-6 text-center">
            <Link to="/appointments/my">View My Appointments</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
