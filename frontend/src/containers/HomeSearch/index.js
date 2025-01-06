import React from "react";
import classes from "./HomeSearch.module.css";
import { IoSearch } from "react-icons/io5";
import Button from "../../components/Button";
import { CiLocationOn, CiSearch } from "react-icons/ci";
const HomeSearch = () => {
  return (
    <>
      <div className={classes.searchContainer}>
        <div className={classes.searchBox}>
          <div className={classes.search}>
            <CiSearch />
            <input placeholder="Job tittle, Keyword..." />
          </div>
          <div className={classes.search}>
            <CiLocationOn />
            <input placeholder="Location" />
          </div>
        </div>
        <Button label={"Find a Job"} />
      </div>
    </>
  );
};

export default HomeSearch;
