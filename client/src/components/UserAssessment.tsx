import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';

interface Assessment {
    userAssessmentID: number;
    assessmentID: number;
    completionDate: string;
    riskLevel: string;
    totalScore: number;
    recommendationProvided: boolean;
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
    sidebar: {
        width: '16rem',
        backgroundColor: '#F9F9F9',
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '2rem',
        paddingLeft: '100px'
    },
    logoImg: {
        height: '4rem',
        width: '4rem',
        margin: '0 auto',
    },
    navLink: {
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem',
        borderRadius: '0.375rem',
        marginBottom: '0.5rem',
        width: '80%',
        gap: '0.5rem',
        paddingLeft: '1.5rem',
        textDecoration: 'none',
        color: 'black',
    },
    activeLink: {
        backgroundColor: '#0891b2',
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
    inputContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '1.5rem',
        textAlign: 'left'
    },
    inputField: {
        width: '90%',
        padding: '0.5rem',
        backgroundColor: '#f3f4f6',
        border: '1px solid #d1d5db',
        borderRadius: '0.375rem',
    },
    button: {
        backgroundColor: '#003b5b',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        marginTop: '1rem',
    },
};

const UserAssessment = () => {
    const [assessments, setAssessments] = useState<Assessment[]>([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const userID = localStorage.getItem("userID");

    useEffect(() => {
        axios.get(`http://localhost:8080/api/user-assessments/${userID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log("Response:", res.data);
                setAssessments(res.data);
            })

            .catch(err => console.error("Error fetching assessments", err));
    }, []);

    return (
        <div style={styles.container}>
            {/* Sidebar */}
            <Sidebar /> 

            {/* Main Content */}
            <main style={styles.main}>
                <section style={styles.profileCard}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Assessment History</h2>
                    {assessments.length === 0 ? (
                        <p>No assessments taken.</p>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'center', borderBottom: '2px solid #ccc' }}>
                                    <th>ID</th>
                                    <th>Assessment</th>
                                    <th>Completion Date</th>
                                    <th>Risk Level</th>
                                    <th>Total Score</th>
                                    <th>Recommendation</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assessments.map(assess => (
                                    <tr key={assess.userAssessmentID} style={{ borderBottom: '1px solid #eee' }}>
                                        <td>{assess.userAssessmentID}</td>
                                        <td>{assess.assessmentID}</td>
                                        <td>{new Date(assess.completionDate).toLocaleDateString()}</td>
                                        <td>{assess.riskLevel}</td>
                                        <td>{assess.totalScore}</td>
                                        <td>{assess.recommendationProvided}</td>
                                        <td>  <a
                                            style={{ color: '#0891b2', cursor: 'pointer', textDecoration: 'underline' }}
                                            onClick={() => navigate(`/assessments/${assess.userAssessmentID}/assist/result`)}
                                        >
                                            View
                                        </a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </section>
            </main>
        </div>
    );
};

export default UserAssessment;
