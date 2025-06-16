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

interface Module {
  moduleID: number;
  courseID: number;
  moduleName: string;
  description: string;
  durationMinutes: number;
}

const CourseInfo: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [enrolled, setEnrolled] = useState<boolean>(false);
  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    if (id) {
      axios.get<Course>(`http://localhost:8080/api/courses/${id}`)
        .then(res => {
          setCourse(res.data);
          setLoading(false);

          checkEnrollment(res.data.courseID);
        })
        .catch(err => {
          setError('Failed to fetch course details.');
          setLoading(false);
          console.error(err);
        });
    }
  }, [id]);


  const checkEnrollment = async (courseID: number) => {
    try {
      const res = await axios.get<boolean>(`http://localhost:8080/api/enroll/check`, {
        params: { courseID },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setEnrolled(res.data);

      if (res.data) {
        fetchModules();
      }

    } catch (err) {
      console.error("Failed to check enrollment:", err);
    }
  };



  const fetchModules = async () => {
    try {
      const res = await axios.get<Module[]>(`http://localhost:8080/api/modules/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

      setModules(res.data);
    } catch (error) {
      console.error("Failed to load modules:", error);
    }
  };

  const handleEnroll = async () => {
    try {

      if (!course?.courseID) {
        alert("Course ID missing.");
        return;
      }

      await axios.post(`http://localhost:8080/api/enroll`, {
        courseID: course.courseID
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      alert("Successfully enrolled!");
      setEnrolled(true);
      fetchModules();
    } catch (error) {
      console.error("Enrollment failed:", error);
      alert("Failed to enroll.");
    }
  };


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
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.25rem', justifyContent: 'space-between' }}>
          <span style={{ backgroundColor: '#f0f1ff', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: '500', color: '#272b69' }}>
            {course.targetAudience}
          </span>
          <span style={{ color: '#555', fontSize: '1rem' }}>{course.durationMinutes} weeks</span>
        </div>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#444', marginBottom: '2rem' }}>
          {course.description}
        </p>
        <p style={{ fontWeight: '600', color: '#272b69' }}>Instructor: {course.author}</p>

        {!enrolled && (
          <button
            onClick={handleEnroll}
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
        )}

        {enrolled && (
          <div style={{ marginTop: '3rem' }}>
            <h2 style={{ fontSize: '1.6rem', color: '#272b69', marginBottom: '1rem' }}>Course Modules</h2>
            {modules.length === 0 ? (
              <p>No modules available.</p>
            ) : (
              <ul style={{ paddingLeft: '1rem' }}>
                {modules.map(mod => (
                  <li key={mod.moduleID} style={{ marginBottom: '1.2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', color: 'black' }}>{mod.moduleName}</h3>
                    <p style={{ color: '#555', marginBottom: '0.2rem' }}>{mod.description}</p>
                    <p style={{ fontStyle: 'italic', color: '#777' }}>Duration: {mod.durationMinutes} hours</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseInfo;
