import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

interface Course {
    courseID: number;
    courseName: string;
    description: string;
    imageCover: string;
}

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
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        backgroundColor: '#fff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    courseImage: {
        width: '100%',
        height: '180px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginBottom: '1rem'
    }
};

const UserCourse = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            const userID = localStorage.getItem("userID");
            const token = localStorage.getItem("token");

            if (!userID || !token) {
                setError("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
                return;
            }

            try {
                const res = await axios.get("http://localhost:8080/api/enroll/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCourses(res.data);
            } catch (err: any) {
                if (err.response?.status === 401) {
                    setError("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
                } else {
                    setError("Lỗi khi tải khóa học. Vui lòng thử lại sau.");
                }
                console.error("Failed to fetch enrolled courses", err);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div style={styles.container}>
            <Sidebar />
            <main style={styles.main}>
                <section style={styles.profileCard}>
                    <h2 style={{ marginBottom: '1rem' }}>Khóa học đã ghi danh</h2>

                    {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1rem'
                    }}>
                        {courses.map(course => (
                            <div key={course.courseID} style={styles.courseCard}>
                                <img
                                    src={course.imageCover}
                                    alt={course.courseName}
                                    style={styles.courseImage}
                                />
                                <h3>{course.courseName}</h3>
                                <p>{course.description}</p>
                            </div>
                        ))}
                        {courses.length === 0 && !error && <p>Không có khóa học nào.</p>}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default UserCourse;
