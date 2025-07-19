import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Answer {
    question: string;
    answer: string;
    score: number;
}

interface SubstanceResult {
    substance: string;
    totalScore: number;
    riskLevel: string;
    recommendation: string;
    answers: Answer[];
}

interface AssessmentResult {
    results: SubstanceResult[];
}
export default function ResultAssist() {
    const [result, setResult] = useState<AssessmentResult | null>(null);
    const { assessmentID } = useParams();
    useEffect(() => {
        // const id = localStorage.getItem("assessmentId");

        if (!assessmentID) {
            console.warn("No assessmentId in localStorage");
            return;
        }

        fetch(`http://localhost:8080/api/assessments/result/${assessmentID}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(res => {
                if (!res.ok) throw new Error("API error: " + res.status);
                return res.json();
            })
            .then(data => {
                setResult(data);
            })
            .catch(err => {
                console.error("Error fetching result:", err);
            });
    }, []);

    if (!result) return <p>Loading...</p>;

    const maxScoredSubstance = result.results.reduce((prev, current) =>
        (current.totalScore > prev.totalScore) ? current : prev
    );
    return (
        <div style={{ marginTop: "80px", color: "black" }}>
            <h2>Assessment Completed</h2>

            <h3 style={{ marginTop: "40px" }}>Your Responses</h3>
            <ul style={{ textAlign: 'left' }}>
                {result.results.map((res, index) => (
                    <div key={index} style={{ marginBottom: "30px" }}>
                        <h3>Substance: {res.substance}</h3>
                        <p><strong>Total Score:</strong> {res.totalScore}</p>
                        <ul>
                            {res.answers.map((a, i) => (
                                <li key={i}>
                                    <p><strong>Q:</strong> {a.question}</p>
                                    <p><strong>Answer:</strong> {a.answer}</p>
                                    <p><strong>Score:</strong> {a.score}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <div style={{ marginTop: "80px", color: "black", display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                        background: '#fff',
                        borderRadius: 12,
                        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                        padding: '2.5rem 2rem',
                        maxWidth: 420,
                        width: '100%',
                        textAlign: 'center',
                        border: '1px solid #e0e0e0'
                    }}>
                        <h2 style={{ color: '#272b69', marginBottom: '1.5rem' }}>Assessment Result</h2>
                        <p style={{ color: '#888', marginBottom: '1.5rem' }}>Base on your most substance used: {maxScoredSubstance.substance}</p>
                        <div style={{
                            background: maxScoredSubstance.riskLevel === 'High' ? '#ffeaea' : maxScoredSubstance.riskLevel === 'Moderate' ? '#fffbe6' : '#eaffea',
                            color: maxScoredSubstance.riskLevel === 'High' ? '#d32f2f' : maxScoredSubstance.riskLevel === 'Moderate' ? '#bfa100' : '#388e3c',
                            borderRadius: 8,
                            padding: '1rem',
                            marginBottom: '1.5rem',
                            fontWeight: 600,
                            fontSize: '1.2rem',
                        }}>
                            Risk Level: {maxScoredSubstance.riskLevel}
                        </div>
                        <p style={{ fontSize: '1.1rem', marginBottom: '1.2rem' }}><strong>Total Score:</strong> {maxScoredSubstance.totalScore}</p>
                        <div style={{
                            background: '#f0f1ff',
                            borderRadius: 8,
                            padding: '1.2rem',
                            marginBottom: '1.5rem',
                            color: '#272b69',
                            fontWeight: 500
                        }}>
                            {maxScoredSubstance.recommendation}
                        </div>
                        {maxScoredSubstance.riskLevel === "Moderate" && (
                            <Link to="/courses" style={{ color: "#272b69", textDecoration: "underline", fontWeight: 600 }}>
                                → View recommended online course
                            </Link>
                        )}
                        {maxScoredSubstance.riskLevel === "High" && (
                            <Link to="/appointments/book" style={{ color: "#d32f2f", textDecoration: "underline", fontWeight: 600 }}>
                                → Book a specialist appointment
                            </Link>
                        )}
                    </div>
                </div>
            </ul>
        </div>
    );
}