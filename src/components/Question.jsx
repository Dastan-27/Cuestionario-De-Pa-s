function Question({ questionData, userAnswer, onAnswer }) {
  const { flagUrl, options, correctAnswer } = questionData;
  const isAnswered = userAnswer !== undefined;

  const handleOptionClick = (option) => {
    if (!isAnswered) {
      onAnswer(option);
    }
  };

  const getOptionState = (option) => {
    if (!isAnswered) return { className: "option-btn", icon: null };
    
    if (option === correctAnswer) {
      // Siempre mostrar la correcta con check si ya se respondió
      return { className: "option-btn correct", icon: "✓" };
    }
    
    if (option === userAnswer && option !== correctAnswer) {
      // Fue la seleccionada por el usuario y es incorrecta
      return { className: "option-btn incorrect", icon: "⊗" };
    }
    
    return { className: "option-btn disabled", icon: null };
  };

  return (
    <div className="question-container fade-in" key={flagUrl}>
      <h2 className="question-text">
        Which country does this flag <img src={flagUrl} alt="flag" className="inline-flag" /> belong to?
      </h2>

      <div className="options-grid">
        {options.map((option, index) => {
          const { className, icon } = getOptionState(option);
          return (
            <button
              key={index}
              className={className}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswered}
            >
              <span className="option-text">{option}</span>
              {icon && <span className="option-icon">{icon}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Question;
