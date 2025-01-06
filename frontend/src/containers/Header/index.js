import React, { useEffect, useState } from "react";
import isScreenResizeHook from "../../customHooks/useScreenChange";
import { headerButtons, headerRoutes } from "../../helper/contants";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

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
          <MobileHeader routes={headerRoutes} buttonLinks={headerButtons} />
        ) : (
          <DesktopHeader routes={headerRoutes} buttonLinks={headerButtons} />
        )}
      </header>
    </>
  );
};

export default Header;
