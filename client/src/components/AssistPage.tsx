import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AssistForm() {
    const [q1, setQ1] = useState(null);
    const [templates, setTemplates] = useState([]);
    const [selectedSubstances, setSelectedSubstances] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState([]);
    const { assessmentID } = useParams();

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/api/assessments/${assessmentID}/q1`)
            .then(res => res.json())
            .then(setQ1);
    }, [assessmentID]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/assessments/${assessmentID}/q2to7`)
            .then(res => res.json())
            .then(setTemplates);
    }, [assessmentID]);


    const handleQ1Answer = (substance, isChecked) => {
        setSelectedSubstances(prev => {
            if (isChecked) {
                return [...new Set([...prev, substance])];
            } else {
                return prev.filter(item => item !== substance);
            }
        });
    };

    const handleQ1Submit = () => {
        if (selectedSubstances.length === 0) {
            alert("Please select at least one substance.");
            return;
        }
        setCurrentStep(1);
    };

    const handleAnswer = (substance, questionText, option, questionID) => {
        setAnswers(prev => {
            const filtered = prev.filter(
                a => !(a.substance === substance && a.questionText === questionText)
            );
            return [...filtered, {
                substance,
                questionText,
                answer: option.optionText,
                score: option.score,
                questionID: questionID,
                optionID: option.optionID
            }];
        });
    };


    const handleNextQuestion = () => {
        const currentTemplate = templates[currentStep - 1];
        const currentQuestionText = currentTemplate.questionText;

        const hasAllAnswers = selectedSubstances.every(sub =>
            answers.some(ans => ans.substance === sub && ans.questionText === currentQuestionText.replace("[SUBSTANCE]", sub))
        );

        if (!hasAllAnswers) {
            alert("Please answer for all substances.");
            return;
        }

        if (currentStep === templates.length) {
            alert("Assessment complete!");

            const rawAnswers = answers.map(ans => ({
                questionID: ans.questionID,
                optionID: ans.optionID,
                substance: ans.substance,
            }));

            const submission = {
                assessmentID: 1,
                answers: rawAnswers
            };

            fetch("http://localhost:8080/api/assessments/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(submission)
            })
                .then(res => res.json())
                .then(data => {
                    console.log("Submitted:", data);
                    localStorage.setItem("assessmentId", data.assessmentId);
                    navigate(`/assessments/${assessmentID}/result`);
                })



                .catch(err => {
                    console.error("Submit failed", err);
                    alert("Something went wrong.");
                });

        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    if (!q1 || templates.length === 0) return <p>Loading...</p>;

    if (currentStep === 0) {
        return (
            <div style={{ marginTop: '100px', color: 'black' }}>
                <h3>{q1.questionText}</h3>
                {q1.options
                    .filter(opt => opt.optionText.includes("Q1"))
                    .map(opt => {
                        const substance = opt.optionText.split(" - ")[0];
                        return (
                            <div key={opt.optionID} style={{ display: 'flex', marginLeft: '33vw' }}>
                                <label>
                                    <input
                                        type="checkbox"
                                        onChange={e => handleQ1Answer(substance, e.target.checked)}
                                    />
                                    {substance}
                                </label>
                            </div>
                        );
                    })}

                <button onClick={handleQ1Submit}>Continue</button>
            </div>
        );
    }

    const currentTemplate = templates[currentStep - 1];

    return (
        <div style={{ marginTop: '100px', color: 'black' }}>
            <h3>{currentTemplate.questionText}</h3>
            {selectedSubstances.map(substance => {
                const questionText = currentTemplate.questionText.replace("[SUBSTANCE]", substance);
                const selected = answers.find(ans => ans.substance === substance && ans.questionText === questionText);
                return (
                    <div key={substance} style={{ marginBottom: "10px" }}>
                        <p><strong>{substance}</strong></p>
                        {currentTemplate.options.map(opt => (
                            <button
                                key={opt.optionID + substance}
                                style={{
                                    marginRight: "10px",
                                    backgroundColor: selected?.answer === opt.optionText ? "#444" : "#eee",
                                    color: selected?.answer === opt.optionText ? "white" : "black",
                                    padding: "5px 10px",
                                    borderRadius: "8px",
                                    border: "1px solid #ccc",
                                    cursor: "pointer"
                                }}
                                onClick={() => handleAnswer(substance, questionText, opt, currentTemplate.questionID)}
                            >
                                {opt.optionText}
                            </button>
                        ))}
                    </div>
                );
            })}
            <button onClick={handleNextQuestion}>Next</button>
        </div>
    );
}