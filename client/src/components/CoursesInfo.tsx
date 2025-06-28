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

interface Evaluation {
  evaluationID: number;
  courseID: number;
  userID: number;
  rating: number;
  comments: string;
  submissionDate: string;
  username: string;
}


const CourseInfo: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [enrolled, setEnrolled] = useState<boolean>(false);
  const navigate = useNavigate();
  const [courseCompleted, setCourseCompleted] = useState<boolean>(false);

  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const userID = localStorage.getItem("userId");
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState<number>(5);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get<Course>(`http://localhost:8080/api/courses/${id}`)
        .then(res => {
          setCourse(res.data);
          setLoading(false);

          checkEnrollment(res.data.courseID);

          axios.get<Evaluation[]>(`http://localhost:8080/api/evaluations/by-course/${res.data.courseID}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then(evaluationRes => {
              setEvaluations(evaluationRes.data);
            })
            .catch(err => {
              console.error("Failed to fetch evaluations:", err);
            });
        })
    }
  }, [id]);

  useEffect(() => {
    if (courseCompleted) {
      alert("Course Completed!");
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

  const handleEvaluationSubmit = async () => {
    try {
      setSubmitting(true);

      const res = await axios.post("http://localhost:8080/api/evaluations/create", {
        courseID: course.courseID,
        rating: newRating,
        comments: newComment
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const updated = await axios.get<Evaluation[]>(`http://localhost:8080/api/evaluations/by-course/${course.courseID}`);
      setEvaluations(updated.data);

      setNewComment('');
      setNewRating(5);
      alert("Evaluation submitted!");

    } catch (err) {
      console.error("Error submitting evaluation:", err);
      alert("Failed to submit evaluation.");
    } finally {
      setSubmitting(false);
    }
  };


  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>;
  if (!course) return null;

  return (
    <div style={{ padding: '3rem 2rem', backgroundColor: '#f9f9f9', minHeight: '100vh', marginTop: '50px' }}>
      <div style={{
        display: 'flex',
        backgroundImage: 'url("https://res.cloudinary.com/ddtm7dvwo/image/upload/v1751007609/Group_239212_kc5kos.png")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        maxWidth: '100%',
        margin: '0 auto',
        backgroundPosition: 'center',
      }}>
        <div style={{
          padding: '2rem',
          textAlign: 'left',
        }}>
          <img
            src={course.imageCover}
            alt={course.courseName}
            style={{ height: '300px', objectFit: 'cover', borderRadius: '6px', marginBottom: '2rem' }}
          />
          <h1 style={{ fontSize: '2.2rem', color: '#272b69', marginBottom: '1rem' }}>{course.courseName}</h1>
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.25rem' }}>
            <span style={{ backgroundColor: '#f0f1ff', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: '500', color: '#272b69' }}>
              {course.targetAudience}
            </span>
            <span style={{ color: '#555', fontSize: '1rem', marginTop: '5px' }}>{course.durationMinutes} minutes</span>
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
                ? 'Review Course'
                : 'Start Learning'
              : 'Enroll Now'}

          </button>
        </div>
      </div>
      {enrolled && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#fff', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '1rem', color: '#272b69' }}>Leave your evaluation</h3>

          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'black' }}>Rating:</label>
          <select
            value={newRating}
            onChange={e => setNewRating(Number(e.target.value))}
            style={{ padding: '0.5rem', marginBottom: '1rem', backgroundColor: 'white', color: 'black' }}
          >
            {[5, 4, 3, 2, 1].map(num => (
              <option key={num} value={num}>{num} ⭐</option>
            ))}
          </select>


          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            rows={4}
            placeholder="Leave your comments here..."
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '1rem', backgroundColor: 'white', color: 'black' }}
          />


          <button
            onClick={handleEvaluationSubmit}
            disabled={submitting}
            style={{
              backgroundColor: '#272b69',
              color: 'white',
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {submitting ? 'Submitting...' : 'Submit Evaluation'}
          </button>

        </div>
      )}

      {evaluations.length > 0 && (
        <div style={{ marginTop: '3rem', backgroundColor: 'white', padding: '2rem', borderRadius: '8px' }}>
          <h2 style={{ color: '#272b69', marginBottom: '1.5rem' }}>Course Evaluations</h2>
          {evaluations.map((evalItem) => (
            <div key={evalItem.evaluationID} style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'black', alignItems: 'left', display: 'flex' }}>
                {evalItem.username || 'Anonymous'} — {'⭐'.repeat(evalItem.rating)}
              </div>
              <div style={{ fontStyle: 'italic', color: '#555', alignItems: 'left', display: 'flex' }}>{evalItem.comments}</div>
              <div style={{ fontSize: '0.85rem', color: '#999', alignItems: 'left', display: 'flex', marginTop: '0.5rem' }}>
                Submitted on {new Date(evalItem.submissionDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseInfo;
