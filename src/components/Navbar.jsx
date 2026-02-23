import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

const NAV_SECTIONS = ["home", "about", "education", "projects", "experience", "skills", "leadership"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const faviconHref = `${import.meta.env.BASE_URL}favicon.svg`;
  const navRef = useRef(null);

  useEffect(() => {
    const observers = [];
    NAV_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close mobile nav on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [isOpen]);

  const handleToggle = () => setIsOpen((open) => !open);
  const handleLinkClick = () => setIsOpen(false);

  return (
    <header className="navbar" ref={navRef}>
      <div className="nav-inner">
        <Magnetic>
          <a className="nav-logo" href="#home" aria-label="Go to home">
            <img src={faviconHref} alt="" className="nav-logo-mark" aria-hidden="true" />
          </a>
        </Magnetic>
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
          {NAV_SECTIONS.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={activeSection === section ? "nav-active" : ""}
              style={{ position: "relative" }}
            >
              {section === "about" ? "Identity" : section === "leadership" ? "Activism" : section.charAt(0).toUpperCase() + section.slice(1)}
              {activeSection === section && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="nav-active-bg"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{
                    position: "absolute",
                    inset: "-6px -14px",
                    background: "rgba(56, 189, 248, 0.08)",
                    border: "1px solid rgba(56, 189, 248, 0.15)",
                    boxShadow: "0 2px 10px rgba(56, 189, 248, 0.05)",
                    borderRadius: "999px",
                    zIndex: -1
                  }}
                />
              )}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
