import { useState, useEffect } from "react";
import { getAllCountries } from "../services/countryService";
import Question from "./Question";
import Congratulations from "./Congratulations";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAndGenerateQuiz = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const allCountries = await getAllCountries();
      
      // Filtrar países que tienen capital y nombre
      const validCountries = allCountries.filter(
        (c) => c.capital && c.capital.length > 0 && c.name && c.name.common
      );

      // Mezclar y tomar 10 países
      const shuffledCountries = [...validCountries].sort(() => 0.5 - Math.random());
      const selectedCountries = shuffledCountries.slice(0, 10);

      // Generar opciones para cada pregunta
      const generatedQuestions = selectedCountries.map((country) => {
        const correctCapital = country.capital[0];
        
        // Obtener 3 capitales incorrectas de otros países al azar
        const otherCountries = validCountries.filter(c => c.name.common !== country.name.common);
        const shuffledOthers = [...otherCountries].sort(() => 0.5 - Math.random());
        const incorrectCapitals = shuffledOthers.slice(0, 3).map(c => c.capital[0]);

        // Unir opciones y mezclar
        const options = [correctCapital, ...incorrectCapitals].sort(() => 0.5 - Math.random());

        return {
          countryName: country.name.common,
          flagUrl: country.flags?.png,
          options,
          correctAnswer: correctCapital
        };
      });

      setQuestions(generatedQuestions);
      setCurrentQuestion(0);
      setScore(0);
      setShowResult(false);
    } catch (err) {
      setError("Error al cargar los datos. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndGenerateQuiz();
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQ = currentQuestion + 1;
    if (nextQ < questions.length) {
      setCurrentQuestion(nextQ);
    } else {
      setShowResult(true);
    }
  };

  const handlePlayAgain = () => {
    fetchAndGenerateQuiz();
  };

  if (loading) {
    return (
      <div className="quiz-container loading-container">
        <div className="loader"></div>
        <p>Cargando preguntas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-container error-container">
        <p>{error}</p>
        <button onClick={fetchAndGenerateQuiz} className="btn-primary">Reintentar</button>
      </div>
    );
  }

  return (
    <div className="quiz-container fade-in">
      {!showResult ? (
        <Question
          questionData={questions[currentQuestion]}
          currentIndex={currentQuestion}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          onNext={handleNextQuestion}
        />
      ) : (
        <Congratulations
          score={score}
          totalQuestions={questions.length}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}

export default Quiz;
