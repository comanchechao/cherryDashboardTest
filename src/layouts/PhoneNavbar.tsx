import React from "react";
import { Link } from "react-router-dom";

const PhoneNavbar: React.FC = () => {
  return (
    <div className="section_menu">
      <a href="#home" className="menu_nav w-button">
        HOME
      </a>
      <a id="aboutBtn" className="menu_nav w-button">
        ABOUT
      </a>
      <Link to="/features" className="menu_nav w-button" id="featuresBtn">
        FEATURES
      </Link>
      <a id="partnersBtn" className="menu_nav w-button">
        PARTNERS
      </a>
      <a
        href="https://pad.cherrybot.ai/"
        target="_blank"
        rel="noreferrer"
        className="menu_nav w-button"
      >
        IDO
      </a>
      <Link to="/cherry" className="menu_nav w-button">
        $AIBOT
      </Link>
      <a
        href="https://docs.cherrybot.co/"
        target="_blank"
        rel="noreferrer"
        className="menu_nav w-button"
      >
        docs
      </a>
      <Link to="/careers" className="menu_nav w-button">
        CAREERS
      </Link>
      <a href="#" className="back w-button">
        BACK
      </a>
    </div>
  );
};

export default PhoneNavbar;
