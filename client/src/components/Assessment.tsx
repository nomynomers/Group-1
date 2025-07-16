import type { FC } from 'react';
import assessmentImage from '../assets/images/assessment.jpg';
import { useNavigate } from "react-router-dom";

const Assessment: FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      padding: '4rem 2rem',
      backgroundColor: 'white',
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: '3.5rem'
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            color: '#272b69',
            margin: 0,
            fontWeight: '600'
          }}>
            Health Assessment
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#4a4a4a',
            lineHeight: '1.6',
            margin: 0
          }}>
            Take our comprehensive health assessment to get personalized insights about your well-being.
            Our advanced system will help identify potential health concerns and provide recommendations
            for maintaining optimal health.
          </p>
          <button
            onClick={() => navigate('/assessments')}
            style={{
              backgroundColor: '#272b69',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '4px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              alignSelf: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#1f2254';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#272b69';
            }}>
            Take Assessment
          </button>
        </div>
        <div style={{
          flex: 1,
          position: 'relative'
        }}>
          <img
            src={assessmentImage}
            alt="Health Assessment"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Assessment; 