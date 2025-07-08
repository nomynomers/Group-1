import type { FC } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Assessment {
    assessmentID: number;
    assessmentName: string;
    estimatedTimeMinutes: string;
    targetAudience: string;
    description: string;
    imageCover: string;
}

const AssessmentPage: FC = () => {
    const navigate = useNavigate();
    const [assessments, setAssessments] = useState<Assessment[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        axios.get<Assessment[]>('http://localhost:8080/api/assessments')
            .then(res => {
                setAssessments(res.data);
            })
            .catch(err => {
                console.error("Error fetching assessments:", err);
            });
    }, []);

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
                    Our Assessment
                </h1>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '2rem'
                }}>
                    {assessments.map((assessment, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/assessments/${assessment.assessmentID}`)}
                            style={{
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
                                src={assessment.imageCover}
                                alt={assessment.assessmentName}
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
                                        {assessment.targetAudience}
                                    </span>
                                    <span style={{
                                        fontSize: '0.9rem',
                                        color: '#666'
                                    }}>
                                        {assessment.estimatedTimeMinutes} minutes
                                    </span>
                                </div>
                                <h3 style={{
                                    fontSize: '1.3rem',
                                    color: '#272b69',
                                    margin: '0 0 0.75rem',
                                    fontWeight: '600',
                                    lineHeight: '1.4'
                                }}>
                                    {assessment.assessmentName}
                                </h3>
                                <div style={{ flex: 1 }}>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: '#666',
                                        margin: '0 0 1rem',
                                        lineHeight: '1.5'
                                    }}>
                                        {assessment.description}
                                    </p>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent card click
                                            navigate(`/assessments/${assessment.assessmentID}`);
                                        }}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            backgroundColor: '#272b69',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            fontSize: '0.95rem',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.2s ease'
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.backgroundColor = '#1d1f5a';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.backgroundColor = '#272b69';
                                        }}
                                    >
                                        Take Assessment
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AssessmentPage; 