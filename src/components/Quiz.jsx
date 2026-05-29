import { useState, useEffect } from "react";
import { getAllCountries } from "../services/countryService";
import Question from "./Question";
import Congratulations from "./Congratulations";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { questionIndex: selectedOption }
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAndGenerateQuiz = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const allCountries = await getAllCountries();
      
      // Filtrar países que tienen bandera y nombre
      const validCountries = allCountries.filter(
        (c) => c.flags && c.flags.png && c.name && c.name.common
      );

      // Mezclar y tomar 10 países
      const shuffledCountries = [...validCountries].sort(() => 0.5 - Math.random());
      const selectedCountries = shuffledCountries.slice(0, 10);

      // Generar opciones para cada pregunta
      const generatedQuestions = selectedCountries.map((country) => {
        const correctCountryName = country.name.common;
        
        // Obtener 3 nombres de países incorrectos al azar
        const otherCountries = validCountries.filter(c => c.name.common !== correctCountryName);
        const shuffledOthers = [...otherCountries].sort(() => 0.5 - Math.random());
        const incorrectNames = shuffledOthers.slice(0, 3).map(c => c.name.common);

        // Unir opciones y mezclar
        const options = [correctCountryName, ...incorrectNames].sort(() => 0.5 - Math.random());

        return {
          flagUrl: country.flags.png,
          options,
          correctAnswer: correctCountryName
        };
      });

      setQuestions(generatedQuestions);
      setCurrentQuestion(0);
      setUserAnswers({});
      setShowResult(false);
    } catch (err) {
      setError("Error loading data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndGenerateQuiz();
  }, []);

  const handleAnswer = (option) => {
    if (userAnswers[currentQuestion]) return; // Ya respondida

    const newAnswers = { ...userAnswers, [currentQuestion]: option };
    setUserAnswers(newAnswers);

    // Revisar si ya respondió todas
    if (Object.keys(newAnswers).length === 10) {
      // Esperar 1.5 segundos para mostrar el resultado para que el usuario vea si acertó la última
      setTimeout(() => {
        setShowResult(true);
      }, 1500);
    }
  };

  const handlePlayAgain = () => {
    fetchAndGenerateQuiz();
  };

  if (loading) {
    return (
      <div className="quiz-card loading-container">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-card error-container">
        <p>{error}</p>
        <button onClick={fetchAndGenerateQuiz} className="btn-play-again">Retry</button>
      </div>
    );
  }

  // Calcular puntaje
  let score = 0;
  Object.keys(userAnswers).forEach((index) => {
    if (userAnswers[index] === questions[index].correctAnswer) {
      score++;
    }
  });

  return (
    <div className="quiz-wrapper">
      <div className="quiz-card fade-in">
        {/* Navigation Bar */}
        <div className="navigation-bar">
          {questions.map((_, index) => {
            const isCurrent = currentQuestion === index;
            const isAnswered = userAnswers[index] !== undefined;
            
            let navClass = "nav-circle";
            if (isCurrent) navClass += " active";
            else if (isAnswered) navClass += " answered";

            return (
              <button 
                key={index} 
                className={navClass}
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        <Question
          questionData={questions[currentQuestion]}
          userAnswer={userAnswers[currentQuestion]}
          onAnswer={handleAnswer}
        />
      </div>

      {showResult && (
        <div className="modal-overlay fade-in">
          <Congratulations
            score={score}
            totalQuestions={questions.length}
            onPlayAgain={handlePlayAgain}
          />
        </div>
      )}
    </div>
  );
}

export default Quiz;
