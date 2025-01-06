import React from "react";
import classes from "./Home.module.css";
import HeroSection from "../../containers/HeroSection";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
const Home = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <Footer />
    </>
  );
};

export default Home;
