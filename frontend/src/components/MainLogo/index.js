import React from "react";
import classes from "./MainLogo.module.css";
import { Logo } from "../../helper/imagePath";
import { useNavigate } from "react-router-dom";
const MainLogo = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.imageLogo} onClick={() => navigate("/")}>
      <img src={Logo} alt="Apply Always" />
    </div>
  );
};

export default MainLogo;
