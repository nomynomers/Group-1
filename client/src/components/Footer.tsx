import type { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer style={{
      backgroundColor: '#272b69',
      color: 'white',
      padding: '2rem',
      marginTop: 'auto',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '2rem'
      }}>
        <div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Medical Portal</h3>
          <p style={{ color: '#e0e0e0', fontSize: '0.9rem' }}>
            Providing quality healthcare solutions
          </p>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="/privacy" style={{ color: '#e0e0e0', textDecoration: 'none', fontSize: '0.9rem' }}>
                Privacy Policy
              </a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="/terms" style={{ color: '#e0e0e0', textDecoration: 'none', fontSize: '0.9rem' }}>
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/contact" style={{ color: '#e0e0e0', textDecoration: 'none', fontSize: '0.9rem' }}>
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Contact</h4>
          <p style={{ color: '#e0e0e0', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            Email: support@medicalportal.com
          </p>
          <p style={{ color: '#e0e0e0', fontSize: '0.9rem' }}>
            Phone: (555) 123-4567
          </p>
        </div>
      </div>
      <div style={{
        marginTop: '2rem',
        paddingTop: '1rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        textAlign: 'center',
        fontSize: '0.9rem',
        color: '#e0e0e0'
      }}>
        © {new Date().getFullYear()} Medical Portal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer; 