import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const BookAppointment: React.FC = () => {
  const { user } = useUser();
  const [consultantID, setConsultantID] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/api/appointments/book',
        {
          userID: user?.id,
          consultantID: parseInt(consultantID),
          appointmentDate,
          startTime: `${startTime}:00`,
          endTime: `${endTime}:00`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage(response.data.message || 'Appointment booked successfully!');
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
              <label className="block text-lg font-medium mb-1">Consultant ID</label>
              <input
                type="number"
                value={consultantID}
                onChange={(e) => setConsultantID(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
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
            <div>
              <label className="block text-lg font-medium mb-1">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
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
          <div className="mt-6 text-center text-lg font-medium text-red-600">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;

