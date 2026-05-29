import { useState, useEffect } from "react";

function Question({ questionData, currentIndex, totalQuestions, onAnswer, onNext }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
  }, [questionData]);

  const { countryName, flagUrl, options, correctAnswer } = questionData;

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    
    setSelectedOption(option);
    setIsAnswered(true);
    
    const isCorrect = option === correctAnswer;
    onAnswer(isCorrect);
  };

  const getOptionClass = (option) => {
    if (!isAnswered) return "option-btn";
    
    if (option === correctAnswer) {
      return "option-btn correct";
    }
    
    if (option === selectedOption && option !== correctAnswer) {
      return "option-btn incorrect";
    }
    
    return "option-btn disabled";
  };

  return (
    <div className="question-card fade-in">
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        ></div>
      </div>
      
      <div className="question-header">
        <span className="question-counter">
          Pregunta {currentIndex + 1} de {totalQuestions}
        </span>
      </div>

      <div className="question-content">
        <h2>¿Cuál es la capital de <span className="highlight-country">{countryName}</span>?</h2>
        
        {flagUrl && (
          <div className="flag-container">
            <img src={flagUrl} alt={`Bandera de ${countryName}`} className="country-flag" />
          </div>
        )}
      </div>

      <div className="options-grid">
        {options.map((option, index) => (
          <button
            key={index}
            className={getOptionClass(option)}
            onClick={() => handleOptionClick(option)}
            disabled={isAnswered}
          >
            {option}
          </button>
        ))}
      </div>

      {isAnswered && (
        <div className="action-container fade-in">
          <button className="btn-primary next-btn" onClick={onNext}>
            {currentIndex === totalQuestions - 1 ? "Ver Resultados" : "Siguiente Pregunta"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Question;
