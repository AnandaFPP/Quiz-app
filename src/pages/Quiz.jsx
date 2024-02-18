import React, { useState } from 'react';
import CardQuiz from '../components/CardQuiz';
import QuizResult from './QuizResult';

const Quiz = () => {
  const [quizEnded, setQuizEnded] = useState(false);
  const [quizResult, setQuizResult] = useState(0);

  const handleQuizEnd = (result) => {
    setQuizResult(result);
    setQuizEnded(true);
  };

  return (
    <>
      {!quizEnded ? (
        <CardQuiz onQuizEnd={handleQuizEnd} />
      ) : (
        <QuizResult result={quizResult} />
      )}
    </>
  );
};

export default Quiz;
