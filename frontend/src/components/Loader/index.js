import React from "react";
import classes from "./Loader.module.css";
import { mergeClass } from "../../helper/mergeClass";
import { Spinner } from "react-bootstrap";
const Loader = ({ className = "" }) => {
  return (
    <div className={mergeClass(classes.loaderContainer, className)}>
      <div className={classes.loaderWrapper}>
        <Spinner animation="grow" className={classes.growDot} />
        <Spinner animation="grow" className={classes.growDot} />
        <Spinner animation="grow" className={classes.growDot} />
      </div>
    </div>
  );
};

export default Loader;
