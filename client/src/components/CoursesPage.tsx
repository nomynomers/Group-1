import type { FC } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Course {
  courseId: number;
  courseName: string;
  durationMinutes: string;
  targetAudience: string;
  description: string;
  imageCover: string;
  author: string;
}

const CoursesPage: FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    axios.get<Course[]>('http://localhost:8080/api/courses')
      .then(res => {
        setCourses(res.data);
      })
      .catch(err => {
        console.error("Error fetching courses:", err);
      });
  }, []);

  // const CoursesPage: FC = () => {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  // const courses = [
  //   {
  //     courseName: "Advanced Cardiac Life Support (ACLS)",
  //     author: "Dr. Sarah Johnson",
  //     duration: "16 hours",
  //     level: "Advanced",
  //     category: "Emergency Medicine",
  //     image: "https://placehold.co/600x400",
  //     description: "Comprehensive training in advanced cardiac life support techniques, including airway management, pharmacology, and team dynamics in emergency situations."
  //   },
  //   {
  //     courseName: "Pediatric Emergency Care",
  //     author: "Dr. Michael Chen",
  //     duration: "12 hours",
  //     level: "Intermediate",
  //     category: "Pediatrics",
  //     image: "https://placehold.co/600x400",
  //     description: "Essential skills and knowledge for managing pediatric emergencies, from assessment to treatment protocols."
  //   },
  //   {
  //     courseName: "Medical Ethics and Professionalism",
  //     author: "Prof. Elizabeth Brown",
  //     duration: "8 hours",
  //     level: "All Levels",
  //     category: "Ethics",
  //     image: "https://placehold.co/600x400",
  //     description: "Explore ethical dilemmas in healthcare, patient rights, and professional conduct in medical practice."
  //   },
  //   {
  //     courseName: "Advanced Trauma Life Support",
  //     author: "Dr. Robert Wilson",
  //     duration: "20 hours",
  //     level: "Advanced",
  //     category: "Trauma",
  //     image: "https://placehold.co/600x400",
  //     description: "Comprehensive training in trauma assessment and management, including critical decision-making in emergency situations."
  //   },
  //   {
  //     courseName: "Clinical Research Methodology",
  //     author: "Dr. James Martinez",
  //     duration: "15 hours",
  //     level: "Intermediate",
  //     category: "Research",
  //     image: "https://placehold.co/600x400",
  //     description: "Learn the fundamentals of clinical research design, data collection, and analysis methods."
  //   },
  //   {
  //     courseName: "Medical Imaging Interpretation",
  //     author: "Dr. Lisa Thompson",
  //     duration: "10 hours",
  //     level: "Intermediate",
  //     category: "Radiology",
  //     image: "https://placehold.co/600x400",
  //     description: "Master the interpretation of various medical imaging modalities including X-rays, CT scans, and MRIs."
  //   }
  // ];

  const categories = ["All", "Emergency Medicine", "Pediatrics", "Ethics", "Trauma", "Research", "Radiology"];
  const levels = ["All", "All Levels", "Intermediate", "Advanced"];

  return (
    <div style={{
      padding: '120px 0 60px',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#272b69',
          marginBottom: '2rem',
          fontWeight: '700',
          textAlign: 'center'
        }}>
          Medical Courses
        </h1>

        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%'
          }}>
            <div style={{ width: '100%', textAlign: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: '#272b69', marginBottom: '0.5rem' }}>Categories</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {categories.map((category, index) => (
                  <button
                    key={index}
                    style={{
                      backgroundColor: category === 'All' ? '#272b69' : 'white',
                      color: category === 'All' ? 'white' : '#272b69',
                      border: '1px solid #272b69',
                      padding: '0.5rem 1rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      if (category !== 'All') {
                        e.currentTarget.style.backgroundColor = '#f0f1ff';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (category !== 'All') {
                        e.currentTarget.style.backgroundColor = 'white';
                      }
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h3 style={{ color: '#272b69', marginBottom: '0.5rem' }}>Level</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {levels.map((level, index) => (
                  <button
                    key={index}
                    style={{
                      backgroundColor: level === 'All' ? '#272b69' : 'white',
                      color: level === 'All' ? 'white' : '#272b69',
                      border: '1px solid #272b69',
                      padding: '0.5rem 1rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      if (level !== 'All') {
                        e.currentTarget.style.backgroundColor = '#f0f1ff';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (level !== 'All') {
                        e.currentTarget.style.backgroundColor = 'white';
                      }
                    }}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
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
                src={course.imageCover} 
                alt={course.courseName}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '300px'
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
                    {course.targetAudience}
                  </span>
                  <span style={{
                    fontSize: '0.9rem',
                    color: '#666'
                  }}>
                    {course.durationMinutes} weeks
                  </span>
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  color: '#272b69',
                  margin: '0 0 0.75rem',
                  fontWeight: '600',
                  lineHeight: '1.4'
                }}>
                  {course.courseName}
                </h3>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: '1rem',
                    color: '#666',
                    margin: '0 0 1rem',
                    lineHeight: '1.5'
                  }}>
                    {course.description}
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '1rem'
                }}>
                  <span style={{
                    fontSize: '0.9rem',
                    color: '#666'
                  }}>
                    Instructor: {course.author}
                  </span>
                  <span style={{
                    fontSize: '0.9rem',
                    color: '#272b69',
                    fontWeight: '500',
                    backgroundColor: '#f0f1ff',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '4px'
                  }}>
                    {course.targetAudience}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage; 