import React, { useEffect, useState } from "react";
import isScreenResizeHook from "../../customHooks/useScreenChange";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";
import { IoHomeOutline } from "react-icons/io5";
import { MdInfoOutline, MdOutlineWorkOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { RiContactsLine } from "react-icons/ri";

const routes = [
  {
    name: "Home",
    path: "/",
    icon: <IoHomeOutline />,
  },
  {
    name: "About",
    path: "/about",
    icon: <MdInfoOutline />,
  },
  {
    name: "Find Jobs",
    path: "/jobs",
    icon: <MdOutlineWorkOutline />,
  },
  {
    name: "Employers",
    path: "/employers",
    icon: <FaRegUser />,
  },
];
const buttonLinks = [
  {
    name: "Contact Us",
    path: "/contact-us",
    icon: <RiContactsLine />,
    variant: "secondary",
  },
  {
    name: "Login",
    path: "/login",
    icon: <CiLogin />,
    variant: "primary",
  },
];
const Header = ({ headerClassName }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = typeof window !== undefined && window.pageYOffset;
    setScrollPosition(position);
  };
  useEffect(() => {
    isScreenResizeHook(setIsMobile, 991);
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [typeof window !== "undefined" && window.innerWidth]);
  console.log(isMobile);

  return (
    <>
      <style>{`
        .stickyHeader{
          position: fixed;
          left: 0;
          right: 0;
          z-index: 10;
          background-color: var(--white-color);
          box-shadow: 0 0 10px rgba(0 0 0/ 0.2);
          animation: headerIn 0.2s ease-in forwards;
        }
        .headerHeader{
          position: absolute;
          left: 0;
          right: 0;
          z-index: 10;
        }    
    `}</style>
      <header
        className={`${headerClassName} ${
          scrollPosition >= 70 ? "stickyHeader" : "headerHeader"
        }`}
      >
        {isMobile ? (
          <MobileHeader routes={routes} buttonLinks={buttonLinks} />
        ) : (
          <DesktopHeader routes={routes} buttonLinks={buttonLinks} />
        )}
      </header>
    </>
  );
};

export default Header;
