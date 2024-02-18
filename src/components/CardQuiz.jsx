import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { MdOutlineTimer } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const CardQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [timer, setTimer] = useState(120);
  const [timeIsUp, setTimeIsUp] = useState(false);
  const navigate = useNavigate();
  const timerRef = useRef(null);
  
  const totalQuestions = questions.length;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=10"
        );
        setQuestions(response.data.results);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(timerRef.current);
      setTimeIsUp(true);
      navigate("/result");
    }
  }, [timer, navigate]);

    useEffect(() => {
      timerRef.current = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(timerRef.current);
    }, []);

  useEffect(() => {
    if (timer === 0 || currentQuestionIndex === questions.length - 1) {
      clearInterval(timerRef.current);
      navigate("/result", { state: { currentPoints, totalQuestions } });
    }
  }, [timer, currentQuestionIndex, questions.length, currentPoints, navigate, totalQuestions]);

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const verifyAnswer = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!timeIsUp && selectedAnswer === currentQuestion.correct_answer) {
      setCurrentPoints(currentPoints + 1);
    }
    handleNext();
  };

  if (questions.length === 0) {
    return <div className="fixed inset-0 flex flex-col bg-white p-8 w-[80%] h-[80%] m-auto rounded-md justify-center items-center">
        <h1 className="text-4xl">Loading...</h1>
    </div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  const removeHTMLChars = (str) => {
    return str.replace(/(&quot;|&#039;|&rsquo;|&amp;|&eacute;)/g, "");
  };

  return (
    <div
      id="container"
      className="fixed inset-0 flex flex-col bg-white p-8 w-[80%] h-[80%] m-auto rounded-md justify-between"
    >
      <div className="flex rounded justify-between w-full items-center">
        <div>
          <h1 className="text-5xl font-semibold">
            Question {currentQuestionIndex + 1}/{questions.length}
          </h1>
        </div>
        <div className="flex gap-2">
          <MdOutlineTimer className="text-4xl" />
          <h1 className="text-3xl">{formatTime(timer)}</h1>
        </div>
      </div>
      <div className="text-center text-2xl">
        <p>{removeHTMLChars(currentQuestion.question)}</p>
      </div>
      <div className="grid grid-cols-2 text-white gap-8">
        {currentQuestion.incorrect_answers
          .concat(currentQuestion.correct_answer)
          .map((answer, index) => (
            <button
              key={index}
              onClick={() => verifyAnswer(answer)}
              disabled={timeIsUp}
              className="bg-blue-400 hover:bg-blue-600 p-3 rounded-full"
            >
              {removeHTMLChars(answer)}
            </button>
          ))}
      </div>
      <div className="flex p-2 text-white justify-between items-center">
        <Link to={"/home"}>
          <button className="bg-red-400 hover:bg-red-600 p-3 rounded-xl">
            QUIT
          </button>
        </Link>
        <div className="flex gap-4">
          <button
            className={
              currentQuestionIndex === 0 || timeIsUp
                ? "hidden"
                : "bg-blue-400 hover:bg-blue-600 p-3 rounded-xl"
            }
            onClick={handlePrevious}
          >
            PREVIOUS
          </button>
          <button
            className={
              currentQuestionIndex === questions.length - 1 || timeIsUp
                ? "hidden"
                : "bg-blue-400 hover:bg-blue-600 p-3 rounded-xl"
            }
            onClick={handleNext}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardQuiz;
