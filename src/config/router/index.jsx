import React from "react";
import Home from "../../pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import Quiz from "../../pages/Quiz";
import QuizResult from "../../pages/QuizResult";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace="true" />} />
          <Route path="/home" element={<Home />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/quiz' element={<Quiz />}/>
          <Route path="/result" element={<QuizResult />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
