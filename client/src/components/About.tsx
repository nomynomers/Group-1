import type { FC } from 'react';

const About: FC = () => {
  return (
    <div style={{
      padding: '120px 0 60px',
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '40px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{
            color: '#272b69',
            fontSize: '2.5rem',
            marginBottom: '30px',
            textAlign: 'center',
            fontWeight: '700'
          }}>
            About Us
          </h1>
          
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#272b69', fontSize: '1.8rem', marginBottom: '20px' }}>
              Our Mission
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#333' }}>
              We are dedicated to revolutionizing medical education and assessment through innovative technology. 
              Our platform provides comprehensive tools and resources for medical professionals and students to 
              enhance their knowledge and skills in a dynamic, interactive environment.
            </p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#272b69', fontSize: '1.8rem', marginBottom: '20px' }}>
              What We Offer
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <h3 style={{ color: '#272b69', marginBottom: '15px' }}>Comprehensive Assessments</h3>
                <p style={{ color: '#333' }}>Advanced assessment tools to evaluate and track medical knowledge and skills.</p>
              </div>
              <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <h3 style={{ color: '#272b69', marginBottom: '15px' }}>Expert-Led Courses</h3>
                <p style={{ color: '#333' }}>High-quality courses designed by experienced medical professionals.</p>
              </div>
              <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <h3 style={{ color: '#272b69', marginBottom: '15px' }}>Research Articles</h3>
                <p style={{ color: '#333' }}>Access to the latest medical research and developments in the field.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 style={{ color: '#272b69', fontSize: '1.8rem', marginBottom: '20px' }}>
              Our Team
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#333' }}>
              Our team consists of experienced medical professionals, educators, and technology experts 
              working together to create the best possible learning experience. We are committed to 
              continuous improvement and innovation in medical education.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 