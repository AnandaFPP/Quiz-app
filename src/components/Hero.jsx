import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";

const Hero = () => {
  const [amount, setAmount] = useState(10);
  const [category, setCategory] = useState("any");
  const [difficulty, setDifficulty] = useState("any");

  const handleAmountChange = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  return (
    <div className="text-white">
      <div className="max-w-[800px] w-full h-[80vh] mx-auto flex flex-col justify-center items-center gap-6">
        <h1 className="text-6xl font-medium ">Welcome to the <span className="text-[#66FcF1]"> Quiz App!</span></h1>
        <div className="flex justify-center items-center">
            <p className="text-xl font-medium">Test your knowledge with our interactive quizzes about</p>
            <ReactTyped strings={['Movies', 'Sports', 'Geography', 'Entertaiment']} typeSpeed={120} backSpeed={140} loop className="pl-2 md:text-4xl sm:text-3xl text-xl font-bold text-[#66FcF1]"/>
        </div>

        <div className="filters">
          <label className="text-lg font-medium tracking-wide">
            Amount of Questions:
            <input
              type="number"
              min="1"
              max="50"
              value={amount}
              className="text-black py-1 mx-2 rounded-md text-center"
              onChange={handleAmountChange}
            />
          </label>

          <label className="text-lg font-medium tracking-wide">
            Category:
            <select value={category} onChange={handleCategoryChange} className="text-black p-1 mx-2 rounded-md">
              <option value="any">Any Category</option>
              <option value="science">Science</option>
              <option value="history">History</option>
              <option value="sports">Sports</option>
            </select>
          </label>

          <label className="text-lg font-medium tracking-wide">
            Difficulty:
            <select value={difficulty} onChange={handleDifficultyChange} className="text-black p-1 mx-2 rounded-md">
              <option value="any">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
        </div>

        <Link
          to={{
            pathname: "/quiz",
            state: { amount, category, difficulty },
          }}
          className="start-button w-[200px] p-2 my-2 bg-[#40BFFF] text-white font-semibold rounded-md hover:bg-blue-500 text-center"
        >
          Start Quiz
        </Link>
      </div>
    </div>
  );
};

export default Hero;
