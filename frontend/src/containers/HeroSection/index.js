import React from "react";
import classes from "./HeroSection.module.css";
import { HeroImage } from "../../helper/imagePath";
import { Container } from "react-bootstrap";
import HomeSearch from "../HomeSearch";
const HeroSection = () => {
  return (
    <>
      <div className={classes.heroSection}>
        <Container>
          <div className={classes.hero_wrapper}>
            <div className={classes.sectionContent}>
              <h1 className={classes.mainHeading}>
                Find a job that aligns with your interests and skills
              </h1>
              <p>
                Thousands of jobs in all the leading sector are waiting for you.
              </p>
              <div className={classes.searchFilters}>
                <HomeSearch />
              </div>
              <p className={classes.suggestions}>
                <span>Suggestion: </span>
                UI/UX Designer, Programming,{" "}
                <span className={classes.activeSuggestion}>
                  Digital Marketing
                </span>
                , Video, Animation
              </p>
            </div>
            <div className={classes.heroImg}>
              <img src={HeroImage} />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HeroSection;
