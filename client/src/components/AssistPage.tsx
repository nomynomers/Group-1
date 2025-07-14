import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AssistForm() {
    const [q1, setQ1] = useState(null);
    const [q8, setQ8] = useState(null);
    const [q8Answer, setQ8Answer] = useState(null);

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

        fetch(`http://localhost:8080/api/assessments/${assessmentID}/q2to7`)
            .then(res => res.json())
            .then(setTemplates);

        fetch(`http://localhost:8080/api/assessments/q8`)
            .then(res => res.json())
            .then(setQ8);
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
                questionID,
                optionID: option.optionID
            }];
        });
    };

    const handleNextQuestion = () => {
        const currentTemplate = templates[currentStep - 1];
        const currentQuestionText = currentTemplate.questionText;

        const hasAllAnswers = selectedSubstances.every(sub => {
            if (sub === "Tobacco products" && currentTemplate.questionOrder === 5) {
                return true;
            }
            return answers.some(ans =>
                ans.substance === sub && ans.questionText === currentQuestionText.replace("[SUBSTANCE]", sub)
            );
        });

        if (!hasAllAnswers) {
            alert("Please answer for all substances.");
            return;
        }

        if (currentStep === 1) {
            const currentQuestionTextWithSub = (sub: string) =>
                currentTemplate.questionText.replace("[SUBSTANCE]", sub);

            const allScoreZero = selectedSubstances.every(sub => {
                const answer = answers.find(
                    ans =>
                        ans.substance === sub &&
                        ans.questionText === currentQuestionTextWithSub(sub)
                );
                return answer?.score === 0;
            });

            if (allScoreZero) {
                setCurrentStep(5); 
                return;
            }
        }
        if (currentStep === templates.length) {
            setCurrentStep(currentStep + 1);
            return;
        }

        setCurrentStep(currentStep + 1);
    };


    const handleSubmitAssessment = () => {
        const rawAnswers = [
            ...answers.map(ans => ({
                questionID: ans.questionID,
                optionID: ans.optionID,
                substance: ans.substance,
            })),
            ...(q8Answer ? [q8Answer] : [])
        ];

        const submission = {
            assessmentID: Number(assessmentID),
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
    };

    if (!q1 || templates.length === 0 || !q8) return <p>Loading...</p>;

    if (currentStep === 0) {
        return (
            <div style={{ marginTop: '100px', color: 'black' }}>
                <h3>{q1.questionText}</h3>
                {q1.options.filter(opt => opt.optionText.includes("Q1")).map(opt => {
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

    if (currentStep === templates.length + 1) {
        return (
            <div style={{ marginTop: "100px", color: "black" }}>
                <h3>{q8.questionText}</h3>
                <div style={{ marginBottom: "20px" }}>
                    {q8.options.map(opt => (
                        <button
                            key={opt.optionID}
                            style={{
                                marginRight: "10px",
                                backgroundColor: q8Answer?.optionID === opt.optionID ? "#444" : "#eee",
                                color: q8Answer?.optionID === opt.optionID ? "white" : "black",
                                padding: "5px 10px",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                cursor: "pointer"
                            }}
                            onClick={() => setQ8Answer({
                                questionID: q8.questionID,
                                optionID: opt.optionID,
                                substance: "Injection Drug Use"
                            })}
                        >
                            {opt.optionText}
                        </button>
                    ))}
                </div>
                <button onClick={handleSubmitAssessment}>Finish</button>
            </div>
        );
    }


    const currentTemplate = templates[currentStep - 1];
    const isQ5 = currentTemplate.questionOrder === 5;
    const isTobaccoOnly = selectedSubstances.every(s => s === "Tobacco products");

    if (isQ5 && isTobaccoOnly) {
        setTimeout(() => setCurrentStep(currentStep + 1), 0);
        return null;
    }

    return (
        <div style={{ marginTop: '100px', color: 'black' }}>
            <h3>{currentTemplate.questionText}</h3>
            {selectedSubstances.map(substance => {
                if (isQ5 && substance === "Tobacco products") return null;

                const questionText = currentTemplate.questionText.replace("[SUBSTANCE]", substance);
                const selected = answers.find(ans => ans.substance === substance && ans.questionText === questionText);

                return (
                    <div key={substance + currentTemplate.questionID} style={{ marginBottom: "10px" }}>
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
