import React from "react";
import classes from "./Home.module.css";
import HeroSection from "../../containers/HeroSection";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
import { Container } from "react-bootstrap";
import JobCard from "../../containers/JobCard";
import Button from "../../components/Button";
import { jobsData } from "../../helper/dummyData";
const Home = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <div className={classes.featuredContainer}>
        <Container>
          <div className={classes.featuredHeading}>
            <h1>Featured Jobs</h1>
            <p>Choose jobs from the top employers and apply for the same.</p>
          </div>
          <div className={classes.job_wrapper}>
            {jobsData?.map((job, index) => (
              <JobCard job={job} key={index} />
            ))}
          </div>
          <div className={classes.viewAllBtn}>
            <span>View all</span>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Home;
