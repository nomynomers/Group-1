// src/components/AdminSidebar.tsx
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
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
              backgroundColor: location.pathname === '/admin' ? 'white' : 'transparent',
              color: location.pathname === '/admin' ? '#272b69' : 'white',
              fontWeight: location.pathname === '/admin' ? 'bold' : 'normal',
            }}
            onClick={() => navigate('/admin')}
          >
            Dashboard
          </li>
          <li
            style={{
              margin: '10px 0',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '8px',
              width: '70%',
              backgroundColor: location.pathname.startsWith('/admin/courses') ? 'white' : 'transparent',
              color: location.pathname.startsWith('/admin/courses') ? '#272b69' : 'white',
              fontWeight: location.pathname.startsWith('/admin/courses') ? 'bold' : 'normal',

            }}
            onClick={() => navigate('/admin/courses')}
          >
            Courses
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
          <li
            style={{
              margin: '10px 0',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '8px',
              width: '70%',
              backgroundColor: location.pathname === '/admin/articles' ? 'white' : 'transparent',
              color: location.pathname === '/admin/articles' ? '#272b69' : 'white',
              fontWeight: location.pathname === '/admin/articles' ? 'bold' : 'normal',
            }}
            onClick={() => navigate('/admin/articles')}
          >
            Articles
          </li>
          <li style={{ margin: '10px 0', cursor: 'pointer', padding: '10px', borderRadius: '8px', width: '70%' }}>
            Settings
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
