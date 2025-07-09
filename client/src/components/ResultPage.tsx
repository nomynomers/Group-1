import { useEffect, useState } from "react";

export default function ResultPage() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("assessmentId");

    if (!id) {
      console.warn("No assessmentId in localStorage");
      return;
    }

    fetch(`http://localhost:8080/api/assessments/result/${id}`, {
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
      <ul style={{textAlign: 'left'}}>
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

        <hr />
        <h3>Recommendation</h3>
        <p>
          Based on your highest scoring substance:
          <strong> {maxScoredSubstance.substance}</strong>
        </p>
        <p><strong>Risk Level:</strong> {maxScoredSubstance.riskLevel}</p>
        <p><strong>Recommendation:</strong> {maxScoredSubstance.recommendation}</p>
      </ul>
    </div>
  );
}
