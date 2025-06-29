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
    <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">My Appointments</h2>

      {loading ? (
        <p>Loading...</p>
      ) : appointments.length === 0 ? (
        <p className="text-gray-500">You have no appointments.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((a, idx) => (
            <li key={idx} className="border p-4 rounded">
              <p><strong>Consultant:</strong> {a.consultantName}</p>
              <p>
                <strong>Meeting Link:</strong>{' '}
                {a.meetingLink ? (
                  <a href={a.meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {a.meetingLink}
                  </a>
                ) : (
                  <span className="text-gray-400 italic">No link</span>
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