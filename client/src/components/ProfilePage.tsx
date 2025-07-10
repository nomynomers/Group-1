import React from 'react';

const styles = {
  container: {
    display: 'flex',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
    marginTop: '74px'
  },
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
  logoImg: {
    height: '4rem',
    width: '4rem',
    margin: '0 auto',
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
  },
  main: {
    flex: 1,
    padding: '2.5rem',
    backgroundColor: '#F9F9F9',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2rem',
    textAlign: 'left'
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    maxWidth: '100%',
    margin: '0 auto',
  },
  inputContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
    gap: '1.5rem',
    textAlign: 'left'
  },
  inputField: {
    width: '90%',
    padding: '0.5rem',
    backgroundColor: '#f3f4f6',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
  },
  button: {
    backgroundColor: '#003b5b',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    marginTop: '1rem',
  },
};

const ProfilePage = () => {
  return (
    <div style={styles.container}>
      {/* Sidebar */}

      <aside style={styles.sidebar}>
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <img src="https://i.pravatar.cc/80?img=12" style={{ borderRadius: '9999px', width: '4rem', height: '4rem' }} />
          <h1 style={{ fontWeight: 'bold', fontSize: '0.875rem', marginTop: '1rem' }}>DRUG PREVENT</h1>
        </div>
        <nav style={{ width: '100%', paddingLeft: '1.5rem' }}>
          <a href="#" style={{ ...styles.navLink, ...styles.activeLink }}>
            <span className="material-icons">person</span>
            <span>Profile</span>
          </a>
          <a href="#" style={styles.navLink}>
            <span className="material-icons">school</span>
            <span>Courses</span>
          </a>
          <a href="#" style={styles.navLink}>
            <span className="material-icons">event</span>
            <span>Appointment</span>
          </a>
          <a href="#" style={styles.navLink}>
            <span className="material-icons">settings</span>
            <span>Settings</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Welcome, Alexa</h2>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Tue, 07 June 2022</p>
          </div>
        </header>

        <section style={styles.profileCard}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
            <img src="https://i.pravatar.cc/80?img=12" style={{ borderRadius: '9999px', width: '4rem', height: '4rem' }} />
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, textAlign: 'left', margin: '0px' }}>Alexa Rawles</h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0px' }}>alexarawles@gmail.com</p>
            </div>
          </div>

          <form style={styles.inputContainer}>
            <div>
              <label style={{ fontSize: '0.875rem' }}>First Name</label>
              <input type="text" style={styles.inputField} value="Alexa" disabled />
            </div>
            <div>
              <label style={{ fontSize: '0.875rem' }}>Last Name</label>
              <input type="text" style={styles.inputField} value="Rawles" disabled />
            </div>
            <div>
              <label style={{ fontSize: '0.875rem' }}>Date of Birth</label>
              <input type="text" style={styles.inputField} value="20/06/2005" disabled />
            </div>
            <div>
              <label style={{ fontSize: '0.875rem' }}>Phone Number</label>
              <input type="text" style={styles.inputField} value="0987654321" disabled />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <button type="button" style={styles.button}>Edit</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
