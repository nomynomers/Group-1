// src/components/SidebarConsultant.tsx
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarConsultant = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      style={{
        width: '220px',
        backgroundColor: '#272b69',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 2rem 2rem',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        height: '100vh',
        overflowY: 'auto',
        zIndex: 1000,
      }}
    >

      <h2
        onClick={() => navigate('/')}
        style={{ textAlign: 'center', marginBottom: '40px' }}>DRUG PREVENT</h2>
      <nav>
        <ul style={{ listStyle: 'none', textAlign: 'left' }}>
          <li
            style={{
              margin: '10px 0',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '8px',
              width: '70%',
              backgroundColor: location.pathname === '/consultant/profile' ? 'white' : 'transparent',
              color: location.pathname === '/consultant/profile' ? '#272b69' : 'white',
              fontWeight: location.pathname === '/consultant/profile' ? 'bold' : 'normal',
            }}
            onClick={() => navigate('/consultant/profile')}
          >
            Profile
          </li>
          <li
            style={{
              margin: '10px 0',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '8px',
              width: '70%',
              backgroundColor: location.pathname === '/consultant/appointments' ? 'white' : 'transparent',
              color: location.pathname === '/consultant/appointments' ? '#272b69' : 'white',
              fontWeight: location.pathname === '/consultant/appointments' ? 'bold' : 'normal',

            }}
            onClick={() => navigate('/consultant/appointments')}
          >
            Appointments
          </li>
          <li
            style={{
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
          >
            Users
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarConsultant;
