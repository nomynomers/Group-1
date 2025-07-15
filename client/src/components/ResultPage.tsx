import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

interface AssessmentSummary {
  assessmentId: number;
  assessmentName: string;
  completionDate: string;
  riskLevel: string;
  totalScore: number;
  recommendation: string;
}

export default function ResultPage() {
  const [summary, setSummary] = useState<AssessmentSummary | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userAssessmentId");
    if (!id) {
      console.warn("No userAssessmentId in localStorage");
      return;
    }
    fetch(`http://localhost:8080/api/assessments/crafft/result/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("API error: " + res.status);
        return res.json();
      })
      .then(data => {
        setSummary(data);
      })
      .catch(err => {
        console.error("Error fetching result:", err);
      });
  }, []);

  if (!summary) return <p>Loading...</p>;

  return (
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
        <h3 style={{ marginBottom: '0.5rem' }}>{summary.assessmentName}</h3>
        <p style={{ color: '#888', marginBottom: '1.5rem' }}>Completed on: {new Date(summary.completionDate).toLocaleString()}</p>
        <div style={{
          background: summary.riskLevel === 'High' ? '#ffeaea' : summary.riskLevel === 'Moderate' ? '#fffbe6' : '#eaffea',
          color: summary.riskLevel === 'High' ? '#d32f2f' : summary.riskLevel === 'Moderate' ? '#bfa100' : '#388e3c',
          borderRadius: 8,
          padding: '1rem',
          marginBottom: '1.5rem',
          fontWeight: 600,
          fontSize: '1.2rem',
        }}>
          Risk Level: {summary.riskLevel}
        </div>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.2rem' }}><strong>Total Score:</strong> {summary.totalScore}</p>
        <div style={{
          background: '#f0f1ff',
          borderRadius: 8,
          padding: '1.2rem',
          marginBottom: '1.5rem',
          color: '#272b69',
          fontWeight: 500
        }}>
          {summary.recommendation}
        </div>
        {summary.riskLevel === "Moderate" && (
          <Link to="/courses" style={{ color: "#272b69", textDecoration: "underline", fontWeight: 600 }}>
            → View recommended online course
          </Link>
        )}
        {summary.riskLevel === "High" && (
          <Link to="/appointments/book" style={{ color: "#d32f2f", textDecoration: "underline", fontWeight: 600 }}>
            → Book a specialist appointment
          </Link>
        )}
      </div>
    </div>
  );
}