import React from 'react';

interface ResultsPageProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="results-page">
      <h1>¡Felicidades!</h1>
      <p>Has completado el cuestionario.</p>
      <div className="score-container">
        <span className="score-text">Tu puntaje: {score} / {totalQuestions}</span>
        <span className="percentage-text">({percentage}%)</span>
      </div>
      <button className="restart-button" onClick={onRestart}>
        Volver a jugar
      </button>
    </div>
  );
};

export default ResultsPage;
