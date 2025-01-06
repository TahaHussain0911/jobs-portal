import React from "react";
import classes from "./DesktopHeader.module.css";
import { Container } from "react-bootstrap";
import { Logo } from "../../../helper/imagePath";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import MainLogo from "../../../components/MainLogo";
const DesktopHeader = ({ routes, buttonLinks }) => {
  const navigate = useNavigate();
  const LinkItem = ({ label, path }) => {
    const active = useLocation()?.pathname === path;
    return (
      <>
        <Link
          to={path}
          className={[classes.linkItem, active && classes.active].join(" ")}
        >
          {label}
        </Link>
      </>
    );
  };
  return (
    <>
      <div className={classes.desktopHeader}>
        <Container>
          <div className={classes.header_wrapper}>
            <MainLogo />

            <div className={classes.menuItems}>
              {routes?.map((link, index) => (
                <LinkItem key={index} path={link?.path} label={link?.name} />
              ))}
            </div>
            <div className={classes.authBtns}>
              {buttonLinks?.map((btn, index) => (
                <Button
                  key={index}
                  label={btn?.name}
                  variant={btn?.variant}
                  onClick={() => {
                    navigate(btn?.path);
                  }}
                />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default DesktopHeader;
