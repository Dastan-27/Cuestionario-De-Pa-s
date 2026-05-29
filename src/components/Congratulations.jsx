function Congratulations({ score, totalQuestions, onPlayAgain }) {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let message = "";
  let emoji = "";

  if (percentage === 100) {
    message = "¡Excelente! Eres un maestro de la geografía.";
    emoji = "🏆";
  } else if (percentage >= 70) {
    message = "¡Muy buen trabajo! Conoces muchos países.";
    emoji = "🌟";
  } else if (percentage >= 40) {
    message = "Buen intento, pero puedes mejorar.";
    emoji = "👍";
  } else {
    message = "Necesitas estudiar un poco más de geografía.";
    emoji = "📚";
  }

  return (
    <div className="congratulations-card fade-in">
      <div className="result-header">
        <span className="result-emoji">{emoji}</span>
        <h2>¡Cuestionario Completado!</h2>
      </div>

      <div className="score-container">
        <div className="score-circle">
          <span className="score-text">{score}</span>
          <span className="score-divider">/</span>
          <span className="total-text">{totalQuestions}</span>
        </div>
      </div>

      <div className="result-message">
        <h3>{percentage}% Correcto</h3>
        <p>{message}</p>
      </div>

      <button className="btn-primary play-again-btn" onClick={onPlayAgain}>
        Jugar de Nuevo
      </button>
    </div>
  );
}

export default Congratulations;
