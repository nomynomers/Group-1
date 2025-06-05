import type { FC } from 'react';
import heroImage from '../assets/images/hero.jpg';

const Hero: FC = () => {
  return (
    <div style={{
      backgroundImage: `url(${heroImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      {/* Dark overlay for better text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }} />
      
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '2.5rem',
        padding: '0 2rem',
        transform: 'translateY(-2rem)',
        position: 'relative', // This ensures content stays above the overlay
        zIndex: 1
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          color: 'white',
          margin: 0,
          fontWeight: '600',
          lineHeight: '1.2',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          Your Health, Our Priority
        </h1>
        <p style={{
          fontSize: '1.4rem',
          color: 'white',
          maxWidth: '700px',
          lineHeight: '1.6',
          margin: 0,
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
        }}>
          Experience world-class healthcare services with our team of expert medical professionals. 
          We're committed to providing you with the best care possible.
        </p>
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          marginTop: '1rem'
        }}>
          <button style={{
            backgroundColor: '#272b69',
            color: 'white',
            border: 'none',
            padding: '1rem 2.5rem',
            borderRadius: '4px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}>
            Book Appointment
          </button>
          <button style={{
            backgroundColor: 'white',
            color: '#272b69',
            border: '2px solid #272b69',
            padding: '1rem 2.5rem',
            borderRadius: '4px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}>
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero; 