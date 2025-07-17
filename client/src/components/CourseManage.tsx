import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import AdminSidebar from './AdminSidebar';

interface Course {
  courseID: number;
  courseName: string;
  description: string;
  targetAudience: string;
  durationMinutes: string;
  imageCover: string;
  author: string;
}


const CourseManage: FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUser();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchCourses();
  }, [navigate]);


  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/courses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Courses data:', data);
        setCourses(data);
      } else {
        setError('Failed to fetch courses');
      }
    } catch (err) {
      setError('An error occurred while fetching courses');
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteCourse = async (courseID: number) => {
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/admin/courses/${courseID}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setCourses(courses.filter(course => course.courseID !== courseID));
      } else {
        setError('Failed to delete course');
      }
    } catch (err) {
      setError('An error occurred while deleting course');
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <AdminSidebar />
      
      <div style={{ padding: '20px 2rem 2rem', width: '100%', marginLeft: '300px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={() => navigate('/admin/courses/create')}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              marginTop: '1rem',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Create New Course
          </button>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: 'white',
              color: '#272b69',
              border: 'none',
              padding: '0.5rem 1.5rem',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Logout
          </button>
        </div>
        <h1 style={{ color: '#272b69', marginBottom: '2rem' }}>Course Management</h1>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          marginTop: '2rem'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            color: '#333'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Name</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Description</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Target Audience</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Duration Minutes</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Image Cover</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Author</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6', color: '#272b69' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses && courses.length > 0 ? (
                courses.map(course => (
                  <tr key={course.courseID} style={{ borderBottom: '1px solid #dee2e6', backgroundColor: 'white' }}>
                    <td style={{ padding: '1rem' }}>{course.courseName}</td>
                    <td style={{ padding: '1rem' }}>{course.description}</td>
                    <td style={{ padding: '1rem' }}>{course.targetAudience}</td>
                    <td style={{ padding: '1rem' }}>{course.durationMinutes}</td>
                    <td style={{ padding: '1rem' }}>
                      <img src={course.imageCover} alt="cover" style={{ width: '80px', height: '50px', objectFit: 'cover' }} />
                    </td>
                    <td style={{ padding: '1rem' }}>{course.author}</td>
                    <td style={{ padding: '1rem', display: 'flex' }}>
                      <button
                        onClick={() => navigate(`/admin/courses/${course.courseID}/modules`)}
                        style={{
                          backgroundColor: 'red',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '4px',
                          marginRight: '0.5rem',
                          cursor: 'pointer'
                        }}
                      >
                        Modules
                      </button>
                      <button
                        onClick={() => navigate(`/admin/courses/${course.courseID}`)}
                        style={{
                          backgroundColor: '#272b69',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '4px',
                          marginRight: '0.5rem',
                          cursor: 'pointer'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.courseID)}
                        style={{
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={{ padding: '1rem', textAlign: 'center', color: '#333' }}>
                    No courses found
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CourseManage; 