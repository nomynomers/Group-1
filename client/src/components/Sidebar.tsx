import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const styles = {
  sidebar: {
    width: '16rem',
    backgroundColor: '#F9F9F9',
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '2rem',
    paddingLeft: '100px'
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    marginBottom: '0.5rem',
    width: '80%',
    gap: '0.5rem',
    paddingLeft: '1.5rem',
    textDecoration: 'none',
    color: 'black',
  },
  activeLink: {
    backgroundColor: '#0891b2',
    color: 'white'
  },
};

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside style={styles.sidebar}>
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <img
          src="https://i.pravatar.cc/80?img=12"
          style={{ borderRadius: '9999px', width: '4rem', height: '4rem' }}
          alt="Avatar"
        />
        <h1 style={{ fontWeight: 'bold', fontSize: '0.875rem', marginTop: '1rem' }}>
          DRUG PREVENT
        </h1>
      </div>
      <nav style={{ width: '100%', paddingLeft: '1.5rem' }}>
        <Link to="/member/profile" style={{ ...styles.navLink, ...(isActive('/member/profile') && styles.activeLink) }}>
          <span className="material-icons">person</span>
          <span>Profile</span>
        </Link>
        <Link to="/member/courses" style={styles.navLink}>
          <span className="material-icons">school</span>
          <span>Courses</span>
        </Link>
        <Link to="/member/appointment" style={{ ...styles.navLink, ...(isActive('/member/appointment') && styles.activeLink) }}>
          <span className="material-icons">event</span>
          <span>Appointment</span>
        </Link>
        <Link to="/member/assessment" style={{ ...styles.navLink, ...(isActive('/member/assessment') && styles.activeLink) }}>
          <span className="material-icons">assignment</span>
          <span>Assessment</span>
        </Link>
        <Link to="/member/settings" style={styles.navLink}>
          <span className="material-icons">settings</span>
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
