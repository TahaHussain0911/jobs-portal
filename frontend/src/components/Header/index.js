import React, { useEffect, useState } from "react";
import isScreenResizeHook from "../../customHooks/useScreenChange";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";

const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Find Jobs",
    path: "/jobs",
  },
  {
    name: "Employers",
    path: "/employers",
  },
];

const Header = ({ headerClassName }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    isScreenResizeHook(setIsMobile, 991);
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        const position = typeof window !== undefined && window.pageYOffset;
        setScrollPosition(position);
      });
      return () => {
        window.removeEventListener("scroll");
      };
    }
  }, [typeof window !== "undefined" && window.innerWidth]);

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
          <MobileHeader routes={routes} />
        ) : (
          <DesktopHeader routes={routes} />
        )}
      </header>
    </>
  );
};

export default Header;
