import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  let [dataUser, setDataUser] = useState({
    user_fullname: "",
    user_email: "",
    user_password: "",
  });

  let handleRegister = (e) => {
    e.preventDefault();

    if (
        dataUser.user_fullname.trim() === "" ||
        dataUser.user_email.trim() === "" ||
        dataUser.user_password.trim() === "" ||
        dataUser.user_password.length < 6
      ) {
        return Swal.fire({
          title: "Invalid Input",
          text: "Please fill out all fields and ensure password is at least 6 characters long.",
          icon: "error",
        });
      }
      
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/register`, dataUser)
      .then((res) => {
        if (res.data.statusCode === 201) {
          Toast.fire({
            title:
              "Congratulations! Your account has been successfully created!",
            icon: "success",
          }).then(function () {
            window.location.href = "/login";
          });
        } else {
          Toast.fire({
            title: "Sorry, this email is already registered.",
            icon: "error",
          }).then(function () {
            window.location.href = "/register";
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    timerProgressBar: true,
    showConfirmButton: false,
    timer: 2000,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  let handleChange = (e) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
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
              <a
                href="/src/pages/Home.jsx"
                className="text-[#27374D] font-extrabold text-4xl"
              >
                {" "}
                Quiz App!{" "}
              </a>
            </Link>
          </div>
          <div className="my-3">
            <p className="text-lg">
              Please provide all necessary information on the registration page.
            </p>
          </div>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                name="user_fullname"
                type="name"
                className="bg-slate-200 py-2 px-4 my-2 w-[300px] rounded-sm"
                placeholder="Username"
                value={dataUser.user_fullname}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                name="user_email"
                type="email"
                className="bg-slate-200 py-2 px-4 my-2 w-[300px] rounded-sm"
                placeholder="Email"
                value={dataUser.user_email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                name="user_password"
                type="password"
                className="bg-slate-200 py-2 px-4 my-2 w-[300px] rounded-sm"
                placeholder="Password"
                value={dataUser.user_password}
                onChange={handleChange}
              />
            </div>
            <button className="w-[300px] p-2 my-2 bg-[#40BFFF] text-white font-semibold rounded-md hover:bg-blue-500 tracking-wider">
              Register
            </button>
          </form>
          <div className="font-medium">
            <p className="text-regis">
              Already have an account ?
              <Link to="/login">
                <a
                  href="/src/pages/Auth/Register.jsx"
                  className='text-blue-400'
                >
                  {" "}
                  Login Here{" "}
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
