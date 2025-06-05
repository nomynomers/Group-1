import type { FC } from 'react';

const Team: FC = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      image: "https://placehold.co/400x400",
      description: "With over 15 years of experience in healthcare management and patient care."
    },
    {
      name: "Dr. Michael Chen",
      role: "Senior Consultant",
      image: "https://placehold.co/400x400",
      description: "Specialized in preventive medicine and health optimization strategies."
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Health Assessment Specialist",
      image: "https://placehold.co/400x400",
      description: "Expert in comprehensive health evaluations and personalized care plans."
    }
  ];

  return (
    <div style={{
      padding: '4rem 2rem',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          color: '#272b69',
          marginBottom: '2rem',
          fontWeight: '600'
        }}>
          Meet Our Team of Professional Consultants
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginTop: '1rem'
        }}>
          {teamMembers.map((member, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <img 
                src={member.image} 
                alt={member.name}
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                padding: '1.5rem'
              }}>
                <h3 style={{
                  fontSize: '1.4rem',
                  color: '#272b69',
                  margin: '0 0 0.5rem',
                  fontWeight: '600'
                }}>
                  {member.name}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#4a4a4a',
                  margin: '0 0 1rem',
                  fontWeight: '500'
                }}>
                  {member.role}
                </p>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#666',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team; 