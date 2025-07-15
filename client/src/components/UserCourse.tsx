import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const styles = {
    container: {
        display: 'flex',
        backgroundColor: '#f3f4f6',
        color: '#374151',
        minHeight: '100vh',
        fontFamily: 'sans-serif',
        marginTop: '74px'
    },
    main: {
        flex: 1,
        padding: '2.5rem',
        backgroundColor: '#F9F9F9',
    },
    profileCard: {
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        maxWidth: '100%',
        margin: '0 auto',
    },
    courseCard: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        padding: '1rem',
        marginBottom: '1.5rem',
        justifyContent: 'space-between',
    },
    courseImage: {
        width: '120px',
        height: '80px',
        objectFit: 'cover',
        borderRadius: '4px',
        marginRight: '1.5rem'
    },
    courseInfo: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    progressBarContainer: {
        height: '8px',
        backgroundColor: '#e5e7eb',
        borderRadius: '4px',
        marginTop: '0.5rem',
        width: '60%'
    },
    progressBar: (percent) => ({
        height: '100%',
        width: `${percent}%`,
        backgroundColor: percent === 100 ? '#10b981' : '#3b82f6',
        borderRadius: '4px'
    }),
    rightButton: {
        marginLeft: '1rem',
    },
    certificateLink: {
        color: '#2563eb',
        textDecoration: 'underline',
        marginTop: '0.25rem',
        cursor: 'pointer'
    },
    completedText: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#10b981',
        fontWeight: 'bold',
        marginTop: '0.25rem'
    }
};

const UserCourse = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:8080/api/enroll/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCourses(res.data);
            } catch (error) {
                console.error('Failed to fetch enrolled courses:', error);
            }
        };

        fetchEnrolledCourses();
    }, []);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div style={styles.container}>
            <Sidebar />
            <main style={styles.main}>
                <section style={styles.profileCard}>
                    <h2>Your Enrolled Courses</h2>
                    {courses.length === 0 ? (
                        <p>No courses enrolled yet.</p>
                    ) : (
                        courses.map((course) => (
                            <div key={course.courseID} style={styles.courseCard}>
                                <img
                                    src={course.imageCover || 'https://via.placeholder.com/120x80'}
                                    alt={course.courseName}
                                    style={styles.courseImage}
                                />
                                <div style={styles.courseInfo}>
                                    <h3 style = {{textAlign: 'left'}}>{course.courseName}</h3>
                                    {course.completeDate ? (
                                        <>
                                            <div style={styles.completedText}>
                                                Completed on {formatDate(course.completeDate)}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div style={styles.progressBarContainer}>
                                                <div style={styles.progressBar(course.progressPercentage)}></div>
                                            </div>
                                            <span style = {{textAlign: 'left'}}>{course.progressPercentage}% completed</span>
                                        </>
                                    )}
                                </div>
                                <div style={styles.rightButton}>
                                    <button
                                        style={{
                                            backgroundColor: '#2563eb',
                                            color: 'white',
                                            border: 'none',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '6px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Review
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </section>
            </main>
        </div>
    );
};

export default UserCourse;
