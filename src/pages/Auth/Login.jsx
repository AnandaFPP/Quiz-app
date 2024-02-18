import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [data, setData] = useState({
    user_email: "",
    user_password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/login`, data)
      .then((res) => {
        if (res.data.statusCode === 201) {
          Toast.fire({
            title: "You are now logged in.",
            icon: "success",
          }).then(function () {
            localStorage.setItem("user_token", res.data.data.token);
            localStorage.setItem("user_id", res.data.data.user_id);
            window.location.href = "/";
          });
        } else {
          Toast.fire({
            title: "Sorry, your email or password is incorrect.",
            icon: "error",
          }).then(function () {
            window.location.href = "/login";
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
        alert("gagal register");
      });
  };

  return (
    <>
      <div
        id="container"
        className="fixed inset-0 flex justify-center items-center"
      >
        <div className="flex flex-col items-center bg-white p-20 w-[50%] text-center rounded">
            <div className="flex gap-2">
                <h1 className="font-extrabold text-4xl">Welcome to</h1>
                <Link to="/home">
                <a href="/src/pages/Home.jsx" className='text-[#27374D] font-extrabold text-4xl'>
                  {" "}
                  Quiz App!{" "}
                </a>
              </Link>
            </div>
          <div className="my-3">
            <p className="text-lg">
              First of all, you must login with your account if you want to take
              a quiz.
            </p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="">
              <input
                name="user_email"
                type="email"
                className="bg-slate-200 py-2 px-4 my-2 w-[300px] rounded-sm"
                placeholder="Email"
                value={data.user_email}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <input
                name="user_password"
                type="password"
                className="bg-slate-200 py-2 px-4 my-2 w-[300px] rounded-sm"
                placeholder="Password"
                value={data.user_password}
                onChange={handleChange}
              />
            </div>
            <button className="w-[300px] p-2 my-2 bg-[#40BFFF] text-white font-semibold rounded-md hover:bg-blue-500">
                Confirm
            </button>
          </form>
          <div className='font-medium'>
            <p className="text-regis">
              Don't have an account yet ?
              <Link to="/register">
                <a href="/src/pages/Auth/Register.jsx" className='text-blue-400'>
                  {" "}
                  Register Here{" "}
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
