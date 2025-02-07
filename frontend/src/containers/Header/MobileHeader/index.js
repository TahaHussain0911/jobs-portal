import React, { useState } from "react";
import classes from "./MobileHeader.module.css";
import { Container } from "react-bootstrap";
import { Logo } from "../../../helper/imagePath";
import { Drawer } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { CiLogout } from "react-icons/ci";
import { logoutUser } from "../../../store/auth/authSlice";
const MobileHeader = ({ routes, buttonLinks }) => {
  const { isLogin } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleDrawer = () => {
    setMenuOpen(!menuOpen);
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  const MenuItem = ({ path, icon, label, customClass }) => {
    const active = useLocation()?.pathname === path;
    return (
      <div
        className={[
          classes.menuItem,
          active && classes.menuActive,
          customClass,
        ].join(" ")}
        onClick={() => {
          if (path === "logout") {
            handleLogout();
          } else {
            navigate(path);
          }
        }}
      >
        {icon}
        <span className={classes.link}>{label}</span>
      </div>
    );
  };
  return (
    <>
      <div className={classes.mobileHeader}>
        <Container>
          <div className={classes.mobile_wrapper}>
            <div className={classes.imageLogo}>
              <img src={Logo} />
            </div>
            <div className={classes.hamMenu}>
              <GiHamburgerMenu
                className={classes.hamburger}
                onClick={() => {
                  toggleDrawer();
                }}
                fill={"var(--heading-color)"}
              />
            </div>
          </div>
          <Drawer open={menuOpen} onClose={toggleDrawer} anchor="right">
            <div className={classes.drawerContainer}>
              <div className={classes.userSection}>
                <div className={classes.userLogo}>
                  <img src={Logo} />
                </div>
              </div>
              <div className={classes.menuItems}>
                {routes?.map((route, index) => (
                  <MenuItem
                    path={route?.path}
                    label={route?.name}
                    key={index}
                    icon={route?.icon}
                  />
                ))}
              </div>
              <div className={classes.bottomLinks}>
                {buttonLinks?.flatMap((route, index) => {
                  if (route?.path === "/login" && isLogin) {
                    return [];
                  }
                  return (
                    <MenuItem
                      path={route?.path}
                      label={route?.name}
                      key={index}
                      icon={route?.icon}
                    />
                  );
                })}
                {isLogin && (
                  <MenuItem
                    path={"logout"}
                    label={"Logout"}
                    icon={<CiLogout />}
                  />
                )}
              </div>
            </div>
          </Drawer>
        </Container>
      </div>
    </>
  );
};

export default MobileHeader;
