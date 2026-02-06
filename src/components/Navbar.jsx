import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const faviconHref = `${import.meta.env.BASE_URL}favicon.svg`;

  const handleToggle = () => setIsOpen((open) => !open);
  const handleLinkClick = () => setIsOpen(false);

  return (
    <header className="navbar">
      <div className="nav-inner">
        <a className="nav-logo" href="#home" aria-label="Go to home">
          <img src={faviconHref} alt="" className="nav-logo-mark" aria-hidden="true" />
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-controls="site-nav-links"
          aria-expanded={isOpen}
          onClick={handleToggle}
        >
          Menu
          <span className={`nav-toggle-icon ${isOpen ? "open" : ""}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
        <nav
          id="site-nav-links"
          className={`nav-links ${isOpen ? "open" : ""}`}
          onClick={handleLinkClick}
        >
          <a href="#home">Home</a>
          <a href="#education">Education</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#leadership">Volunteer Work</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
