import { useEffect, useState } from 'react';
import axios from 'axios';

interface TeamMember {
  name: string;
  specialization: string;
  imageCover: string;
  description: string;
}

const Team: FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/consultants/top3')
      .then(res => setTeamMembers(res.data))
      .catch(err => console.error("Error fetching team members:", err));
  }, []);

  return (
    <div style={{ padding: '4rem 2rem', backgroundColor: '#f8f9fa' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#272b69', marginBottom: '2rem', fontWeight: '600' }}>
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
                src={member.imageCover}
                alt={member.name}
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#272b69', margin: '0 0 0.5rem', fontWeight: '600' }}>
                  {member.name}
                </h3>
                <p style={{ fontSize: '1rem', color: '#4a4a4a', margin: '0 0 1rem', fontWeight: '500' }}>
                  {member.specialization}
                </p>
                <p style={{ fontSize: '0.95rem', color: '#666', margin: 0, lineHeight: '1.5' }}>
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
