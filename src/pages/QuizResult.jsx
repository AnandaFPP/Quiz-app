import { Link, useLocation } from "react-router-dom";

const QuizResult = () => {
  const location = useLocation();
  const { currentPoints, totalQuestions } = location.state || {
    currentPoints: 0,
    totalQuestions: 0,
  };

  const totalCorrectAnswers = currentPoints;
  const totalIncorrectAnswers = totalQuestions - currentPoints;

  return (
    <div
      id="container"
      className="fixed inset-0 flex flex-col bg-white p-8 w-[80%] h-[80%] m-auto rounded-md justify-center items-center gap-y-3"
    >
      <h1 className="text-5xl font-semibold">Quiz Result</h1>
      <p className="text-3xl font-semibold">
        Total Questions: {totalQuestions}
      </p>
      <p className="text-3xl font-semibold text-green-600">
        Total Correct Answers: {totalCorrectAnswers}
      </p>
      <p className="text-3xl font-semibold text-red-600">
        Total Incorrect Answers: {totalIncorrectAnswers}
      </p>
      <p className="text-3xl font-semibold text-blue-500">
        You scored: {currentPoints * 10} points
      </p>
      {/* Display additional result details or actions */}
      <div className="flex">
        <Link to="/home">
          <button className="bg-[#27374D] px-10 py-2 mx-2 rounded text-white">HOME</button>
        </Link>
        <Link to="/quiz">
          <button className="bg-[#27374D] px-10 py-2 mx-2 rounded text-white">TRY AGAIN</button>
        </Link>
      </div>
    </div>
  );
};

export default QuizResult;
