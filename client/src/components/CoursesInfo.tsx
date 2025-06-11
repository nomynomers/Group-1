import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Course {
  courseID: number;
  courseName: string;
  durationMinutes: string;
  targetAudience: string;
  description: string;
  imageCover: string;
  author: string;
}

const CourseInfo: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (id) {
      axios.get<Course>(`http://localhost:8080/api/courses/${id}`)
        .then(res => {
          setCourse(res.data);
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to fetch course details.');
          setLoading(false);
          console.error(err);
        });
    }
  }, [id]);

  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>;
  if (!course) return null;

  return (
    <div style={{ padding: '3rem 2rem', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <img
          src={course.imageCover}
          alt={course.courseName}
          style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '6px', marginBottom: '2rem' }}
        />
        <h1 style={{ fontSize: '2.2rem', color: '#272b69', marginBottom: '1rem' }}>{course.courseName}</h1>
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.25rem', justifyContent: 'space-between'}}>
          <span style={{ backgroundColor: '#f0f1ff', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: '500', color: '#272b69' }}>
            {course.targetAudience}
          </span>
          <span style={{ color: '#555', fontSize: '1rem' }}>{course.durationMinutes} weeks</span>
        </div>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#444', marginBottom: '2rem' }}>
          {course.description}
        </p>
        <p style={{ fontWeight: '600', color: '#272b69' }}>Instructor: {course.author}</p>
        <button
          style={{
            marginTop: '2rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#272b69',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseInfo;
