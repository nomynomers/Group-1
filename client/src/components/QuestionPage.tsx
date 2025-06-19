// src/pages/QuestionPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface QuestionOption {
  optionID: number;
  optionValue: string;
  score: number;
}

interface AssessmentQuestion {
  questionID: number;
  questionText: string;
  options: QuestionOption[];
}

const QuestionPage: React.FC = () => {
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [totalScore, setTotalScore] = useState<number | null>(null);
  const { assessmentID } = useParams();

useEffect(() => {
  if (!assessmentID) return;

  axios.get(`http://localhost:8080/api/assessments/${assessmentID}/questions`)
    .then(res => {
      console.log("Raw API response:", res.data);
      res.data.forEach((q: any, i: number) => {
        console.log(`Question ${i}`, q, 'Options:', q.options);
      });
      setQuestions(res.data);
    })
    .catch(err => console.error("Error fetching questions:", err));
}, []);



  const handleOptionChange = (questionID: number, optionID: number) => {
    setAnswers({ ...answers, [questionID]: optionID });
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach(q => {
      const selectedOption = q.options.find(o => o.optionID === answers[q.questionID]);
      if (selectedOption) score += selectedOption.score;
    });
    setTotalScore(score);
  };

  return (
    <div
      style={{
        padding: '24px',
        maxWidth: '768px',
        margin: '80px auto 0',
      }}
    >
      <h1
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '32px',
        }}
      >
        Assessment
      </h1>

      {questions.map(q => (
        <div key={q.questionID} style={{ marginBottom: '24px',  textAlign: 'left'}}>
          <p style={{ fontWeight: '500', marginBottom: '8px' }}>{q.questionText}</p>
          {Array.isArray(q.options) && q.options.map(o => (
            <label key={o.optionID} style={{ display: 'block', marginBottom: '6px', color: 'black'}}>
              <input
                type="radio"
                name={`q_${q.questionID}`}
                value={o.optionID}
                checked={answers[q.questionID] === o.optionID}
                onChange={() => handleOptionChange(q.questionID, o.optionID)}
                style={{ marginRight: '8px', width: '15px', height: '15px', accentColor: '#2563eb', marginTop: '22px'}}
              />
              {o.optionValue}
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        style={{
          padding: '10px 16px',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Submit
      </button>

      {totalScore !== null && (
        <div style={{ marginTop: '16px', fontSize: '1.125rem', color: 'black' }}>
          <strong>Total Score:</strong> {totalScore}
        </div>
      )}
    </div>
  );
};

export default QuestionPage;
