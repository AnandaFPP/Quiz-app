import React from "react";
import Navbar from "../components/Navbar";
import UserNavbar from '../components/UserNavbar'
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Home = () => {
  const isAuth = localStorage.getItem("user_token");

  return (
    <>
      {!isAuth ? <Navbar /> : <UserNavbar />}
      <Hero />
      <Footer />
    </>
  );
};

export default Home;
