import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

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
  const [enrolled, setEnrolled] = useState<boolean>(false);
  const navigate = useNavigate();
  const [courseCompleted, setCourseCompleted] = useState<boolean>(false);

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

  useEffect(() => {
    if (courseCompleted) {
      alert("🎉 Course Completed!");
    }
  }, [courseCompleted]);


  const checkIfCourseCompleted = async (courseID: number) => {
    const enrollId = localStorage.getItem("enrollId");
    if (!enrollId) return;

    try {
      const res = await axios.get("http://localhost:8080/api/progress/course-complete", {
        params: {
          enrollId,
          courseId: courseID
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (res.data.courseCompleted) {
        setCourseCompleted(true);
        navigate(`/courses/${courseID}`);
      }
    } catch (err) {
      console.error("Failed to check course completion:", err);
    }
  };

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
        await checkIfCourseCompleted(courseID);
      }

    } catch (err) {
      console.error("Failed to check enrollment:", err);
    }
  };

  const handleEnroll = async () => {
    try {
      if (!course?.courseID) {
        alert("Course ID missing.");
        return;
      }

      const res = await axios.post(`http://localhost:8080/api/enroll`, {
        courseID: course.courseID
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const enrollId = res.data;
      localStorage.setItem("enrollId", enrollId);
      console.log("Enrollment ID:", enrollId);

      alert("Successfully enrolled!");
      setEnrolled(true);
      navigate(`/learning/${course.courseID}`);

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
        <button
          onClick={enrolled ? () => navigate(`/learning/${course.courseID}`) : handleEnroll}
          style={{
            marginTop: '2rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#272b69',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          {enrolled
            ? courseCompleted
              ? 'Course Completed!'
              : 'Start Learning'
            : 'Enroll Now'}

        </button>
      </div>
    </div>
  );
};

export default CourseInfo;
