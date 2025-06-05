import type { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Courses: FC = () => {
  const navigate = useNavigate();

  const handleViewAllClick = () => {
    navigate('/courses');
  };

  const courses = [
    {
      title: "Introduction to Health & Wellness",
      instructor: "Dr. Sarah Johnson",
      duration: "8 weeks",
      level: "Beginner",
      image: "https://placehold.co/600x400",
      description: "Learn the fundamentals of maintaining a healthy lifestyle and preventing common health issues."
    },
    {
      title: "Advanced Nutrition Planning",
      instructor: "Dr. Michael Chen",
      duration: "6 weeks",
      level: "Intermediate",
      image: "https://placehold.co/600x400",
      description: "Master the art of creating personalized nutrition plans for optimal health and performance."
    },
    {
      title: "Mental Health First Aid",
      instructor: "Dr. Emily Rodriguez",
      duration: "4 weeks",
      level: "All Levels",
      image: "https://placehold.co/600x400",
      description: "Essential skills for recognizing and responding to mental health challenges in yourself and others."
    }
  ];

  return (
    <div style={{
      padding: '3rem 2rem',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          color: '#272b69',
          marginBottom: '1.5rem',
          fontWeight: '600',
          textAlign: 'center'
        }}>
          Featured Courses
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem',
          marginTop: '0.5rem'
        }}>
          {courses.map((course, index) => (
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
                src={course.image} 
                alt={course.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                padding: '1.25rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.75rem'
                }}>
                  <span style={{
                    fontSize: '0.9rem',
                    color: '#272b69',
                    fontWeight: '500',
                    backgroundColor: '#f0f1ff',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '4px'
                  }}>
                    {course.level}
                  </span>
                  <span style={{
                    fontSize: '0.9rem',
                    color: '#666'
                  }}>
                    {course.duration}
                  </span>
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  color: '#272b69',
                  margin: '0 0 0.75rem',
                  fontWeight: '600',
                  lineHeight: '1.4'
                }}>
                  {course.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#666',
                  margin: '0 0 1rem',
                  lineHeight: '1.5'
                }}>
                  {course.description}
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#272b69',
                  margin: 0,
                  fontWeight: '500'
                }}>
                  Instructor: {course.instructor}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '3rem'
        }}>
          <Link 
            to="/courses" 
            onClick={handleViewAllClick}
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
              textDecoration: 'none',
              display: 'inline-block'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#1f2254';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#272b69';
            }}>
            View All Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Courses; 