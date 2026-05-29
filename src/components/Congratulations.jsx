function Congratulations({ score, totalQuestions, onPlayAgain }) {
  return (
    <div className="congratulations-modal fade-in">
      <div className="confetti-container">
        <img 
          src="https://raw.githubusercontent.com/devchallenges-io/curriculum/master/4-frontend-libaries/challenges/country-quiz/winner.svg" 
          alt="winner" 
          className="confetti-img"
          onError={(e) => {
             // Fallback emoji si falla la imagen
             e.target.style.display = 'none';
             e.target.nextSibling.style.display = 'block';
          }}
        />
        <span className="confetti-emoji" style={{display: 'none', fontSize: '4rem'}}>🎉</span>
      </div>
      
      <h2 className="congrats-title">Congrats! You completed the quiz.</h2>
      <p className="congrats-score">You answer {score}/{totalQuestions} correctly</p>
      
      <button className="btn-play-again" onClick={onPlayAgain}>
        Play again
      </button>
    </div>
  );
}

export default Congratulations;
