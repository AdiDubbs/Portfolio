import React from "react";
import "./App.css";
import { profile } from "./data/profile";
import Background from "./components/Background";
import Chatbot from "./components/Chatbot";
import ExperienceGallery from "./components/ExperienceGallery";
import Navbar from "./components/Navbar";
import SkillsBento from "./components/SkillsBento";
import ProjectAccordion from "./components/ProjectAccordion";
import uwMadisonLogo from "./assets/uw_madison.png";

function App() {
  const fullName = profile.personal.name.split(" ");
  const firstName = fullName[0];
  const lastName = fullName[1];

  return (
    <div className="app-container">
      {/* 0. Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero" id="home">
        <Background />
        <div className="hero-content">
          {/* Main Name */}
          <div className="hero-name-container">
            <h1 className="hero-name">
              <span className="name-first">{firstName}</span>
              <span className="name-last">{lastName}</span>
            </h1>
            <span className="hero-title">
              {profile.personal.tagline || profile.personal.title}
            </span>
          </div>

          {/* Stats Row */}
          <div className="hero-stats">
            <div className="stat-block">
              <span className="stat-num">4</span>
              <span className="stat-txt">Projects</span>
            </div>
            <span className="stat-divider" aria-hidden="true" />
            <div className="stat-block">
              <span className="stat-num">2</span>
              <span className="stat-txt">Internships</span>
            </div>
            <span className="stat-divider" aria-hidden="true" />
            <div className="stat-block">
              <span className="stat-num">2</span>
              <span className="stat-txt">Research Roles</span>
            </div>
          </div>

          {/* Footer */}
          <div className="hero-footer">
            <p className="hero-summary">{profile.personal.summary}</p>
            <div className="hero-contact">
              <span className="location-text">
                Currently in {profile.personal.location}
              </span>
              <span className="contact-sep">•</span>
              <a className="contact-link" href={`mailto:${profile.personal.email}`}>
                {profile.personal.email}
              </a>
              <span className="contact-sep">•</span>
              <a
                className="contact-link"
                href={profile.personal.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <span className="contact-sep">•</span>
              <a
                className="contact-link"
                href={profile.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              {profile.personal.wikipedia && (
                <>
                  <span className="contact-sep">•</span>
                  <a
                    className="contact-link"
                    href={profile.personal.wikipedia}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Wikipedia
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Education Section */}
      <section className="education" id="education">
        <div className="cloud-card cloud-card--soft">
          <div className="education-grid">
            <div className="education-item">
              <div className="education-crest-wrap">
                <img
                  src={uwMadisonLogo}
                  alt="University of Wisconsin–Madison crest"
                  className="education-crest"
                />
              </div>
              <div className="education-info">
                <h2 className="section-title">Education</h2>
                <span className="project-meta">{profile.education.degree}</span>
                <h3>{profile.education.university}</h3>
                <span className="education-submeta">
                  {profile.education.location} • {profile.education.graduation}
                </span>
                <p className="project-description education-coursework">
                  <span className="education-label">Coursework</span>
                  {profile.education.coursework.join(", ")}.
                </p>
                <p className="project-description education-involvement">
                  <span className="education-label">Extracurricular</span>
                  {profile.education.involvement}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Projects Section */}
      <section className="projects" id="projects">
        <div className="projects-inner">
          <h2 className="section-title">Projects</h2>
          <ProjectAccordion items={profile.projects} />
        </div>
      </section>

      {/* 6. Experience Section */}
      <section className="experience" id="experience">
        <div className="experience-inner">
          <h2 className="section-title">Experience</h2>
          <ExperienceGallery items={profile.experiences} />
        </div>
      </section>

      {/* 7. Skills Section */}
      <section className="skills-section" id="skills">
        <div className="cloud-card cloud-card--soft">
          <h2 className="section-title">Technical Skills</h2>
          <SkillsBento />
        </div>
      </section>

      {/* 8. Volunteer Work & Impact Section */}
      <section className="leadership-section" id="leadership">
        <h2 className="section-title">Volunteer Work</h2>
        <div className="leadership-content">
          <div className="advocacy-grid">
            <div className="advocacy-main">
              <div className="advocacy-groups">
                {profile.leadership.map((group, i) => (
                  <div className="advocacy-group" key={i}>
                    <div className="advocacy-group-label">{group.label}</div>
                    <ul className="bento-list">
                      {group.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="advocacy-sidebar">
              <h3 className="subsection-label">Featured In</h3>
              <div className="media-links">
                {profile.advocacyLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="media-link-pill"
                  >
                    {link.name}
                    <span className="pill-arrow">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="social-links">
          <a
            href={profile.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <span className="social-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.3 6.84 9.65.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.39-3.37-1.39-.46-1.2-1.12-1.52-1.12-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05a9.2 9.2 0 0 1 5 0c1.9-1.32 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.05 10.05 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
              </svg>
            </span>
            <span className="social-text">GitHub</span>
          </a>
          <a
            href={profile.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <span className="social-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.98 1.83-2.02 3.77-2.02 4.03 0 4.78 2.66 4.78 6.12V21h-4v-5.2c0-1.24-.02-2.83-1.73-2.83-1.73 0-2 1.35-2 2.74V21H9z" />
              </svg>
            </span>
            <span className="social-text">LinkedIn</span>
          </a>
          <a href={`mailto:${profile.personal.email}`} className="social-link">
            <span className="social-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.2l8 5 8-5V6H4zm16 12V9.5l-7.47 4.67a1 1 0 0 1-1.06 0L4 9.5V18h16z" />
              </svg>
            </span>
            <span className="social-text">Email</span>
          </a>
        </div>
        <div className="micro-context" aria-label="Location details">
          <span className="social-link micro-badge">Currently in Madison, WI, USA</span>
          <span className="social-link micro-badge">Originally from Noida, India</span>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
}

export default App;
