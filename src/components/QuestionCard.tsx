import React from 'react';

interface QuestionCardProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
  currentQuestion: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  onAnswer,
  currentQuestion,
  totalQuestions
}) => {
  return (
    <div className="question-card">
      <div className="question-header">
        <span>Pregunta {currentQuestion} de {totalQuestions}</span>
      </div>
      <h2 className="question-text">{question}</h2>
      <div className="options-container">
        {options.map((option, index) => (
          <button
            key={index}
            className="option-button"
            onClick={() => onAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
