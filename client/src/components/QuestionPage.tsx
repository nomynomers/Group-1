import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Option {
  optionID: number;
  optionText: string;
  nextQuestionID?: number | null;
}

interface Question {
  questionID: number;
  questionText: string;
  options: Option[];
  questionOrder: number;
  isInitialQuestion: boolean;
}

export default function InitialQuestionsPage() {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [displayedQuestions, setDisplayedQuestions] = useState<Question[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<{ [questionID: number]: number }>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { assessmentID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!assessmentID) {
      setError("No assessment selected.");
      setLoading(false);
      return;
    }
    fetch(`http://localhost:8080/api/assessments/${assessmentID}/questions`)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data: Question[]) => {
        setAllQuestions(data);
        // Show only initial questions at first
        setDisplayedQuestions(data.filter(q => q.isInitialQuestion).sort((a, b) => a.questionOrder - b.questionOrder));
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load assessment questions. Please try again.");
        setLoading(false);
      });
  }, [assessmentID]);

  const handleOptionChange = (questionID: number, optionID: number, nextQuestionID?: number | null) => {
    setSelectedOptions(prev => ({ ...prev, [questionID]: optionID }));
    if (nextQuestionID && !displayedQuestions.some(q => q.questionID === nextQuestionID)) {
      const nextQ = allQuestions.find(q => q.questionID === nextQuestionID);
      if (nextQ) {
        setDisplayedQuestions(prev => {
          const updated = [...prev, nextQ];
          // Reorder by questionOrder
          return updated.sort((a, b) => a.questionOrder - b.questionOrder);
        });
      }
    }
  };

  const allAnswered = displayedQuestions.length > 0 && displayedQuestions.every(q => selectedOptions[q.questionID]);

  if (loading) return <p>Loading...</p>;
  if (error) return <div style={{marginTop: '100px', color: 'red', textAlign: 'center'}}>{error}</div>;

  return (
    <div style={{ marginTop: '100px', color: 'black', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Assessment Questions</h2>
      {displayedQuestions.length === 0 ? (
        <p>No questions found for this assessment.</p>
      ) : (
        displayedQuestions.map(q => (
          <div key={q.questionID} style={{
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            padding: '1.5rem',
            marginBottom: '2rem',
            border: '1px solid #e0e0e0'
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#272b69' }}>{q.questionText}</h3>
            {q.options && q.options.length > 0 ? (
              <div>
                {q.options.map(opt => (
                  <label key={opt.optionID} style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    padding: '0.5rem 1rem',
                    borderRadius: 6,
                    background: selectedOptions[q.questionID] === opt.optionID ? '#f0f1ff' : '#f8f9fa',
                    border: selectedOptions[q.questionID] === opt.optionID ? '1.5px solid #272b69' : '1px solid #ccc',
                    cursor: 'pointer',
                    fontWeight: selectedOptions[q.questionID] === opt.optionID ? 600 : 400,
                    position: 'relative',
                    transition: 'background 0.2s, border 0.2s'
                  }}>
                    <input
                      type="radio"
                      name={`question-${q.questionID}`}
                      value={opt.optionID}
                      checked={selectedOptions[q.questionID] === opt.optionID}
                      onChange={() => handleOptionChange(q.questionID, opt.optionID, opt.nextQuestionID)}
                      style={{
                        position: 'absolute',
                        opacity: 0,
                        width: 0,
                        height: 0,
                        pointerEvents: 'none',
                        margin: 0
                      }}
                    />
                    {opt.optionText}
                  </label>
                ))}
              </div>
            ) : (
              <p>No options available.</p>
            )}
          </div>
        ))
      )}
      <button
        style={{
          width: '100%',
          padding: '0.75rem',
          background: allAnswered ? '#272b69' : '#aaa',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          fontSize: '1.1rem',
          fontWeight: 600,
          cursor: allAnswered ? 'pointer' : 'not-allowed',
          marginTop: '1rem',
          marginBottom: '2rem',
          transition: 'background 0.2s'
        }}
        disabled={!allAnswered}
        onClick={() => alert('Submit logic goes here!')}
      >
        Submit
      </button>
    </div>
  );
}
