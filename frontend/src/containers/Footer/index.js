import React from "react";
import { Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MainLogo from "../../components/MainLogo";
import {
  address,
  candidateLinks,
  credits,
  employerLinks,
  phone,
  quickLinks,
} from "../../helper/contants";
import classes from "./Footer.module.css";
import { FaFacebookF, FaYoutube } from "react-icons/fa6";
const Footer = () => {
  const navigate = useNavigate();

  const Menu = ({ heading, links }) => {
    return (
      <div className={classes.menuDiv}>
        <h6>{heading}</h6>
        <div className={classes.menuItems}>
          {links?.map((link, index) => (
            <MenuItem key={index} path={link?.path} label={link?.name} />
          ))}
        </div>
      </div>
    );
  };
  const MenuItem = ({ path, label, customClass }) => {
    const active = useLocation()?.pathname === path;
    return (
      <div
        className={[
          classes.menuItem,
          active && classes.menuActive,
          customClass,
        ].join(" ")}
        onClick={() => {
          navigate(path);
        }}
      >
        <span className={classes.link}>{label}</span>
      </div>
    );
  };
  return (
    <>
      <div className={classes.mainFooter}>
        <Container>
          <div className={classes.footerContainer}>
            <div className={classes.footer_wrapper}>
              <div className={classes.logoFooter}>
                <MainLogo />
                <div className={classes.contactInfo}>
                  <p className={classes.phone}>
                    Call now: <Link to={`tel:${phone}`}>{phone}</Link>
                  </p>
                  <p className={classes.address}>{address}</p>
                </div>
              </div>
              <div className={classes.menuContainer}>
                <Menu heading={"Quick Links"} links={quickLinks} />
                <Menu heading={"Candidate"} links={candidateLinks} />
                <Menu heading={"Employers"} links={employerLinks} />
              </div>
            </div>
            <div className={classes.bottomFooter}>
              <p className={classes.creditsReserved}>{credits}</p>
              <div className={classes.socialLinks}>
                <FaFacebookF />
                <FaYoutube />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;
