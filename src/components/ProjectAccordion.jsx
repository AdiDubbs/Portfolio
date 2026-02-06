import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '../data/profile';
import concierge1 from '../assets/concierge_1.png';
import concierge2 from '../assets/concierge_2.png';
import concierge3 from '../assets/concierge_3.png';
import vitalis1 from '../assets/vitalis_1.png';
import vitalis2 from '../assets/vitalis_2.png';
import vitalis3 from '../assets/vitalis_3.png';
import './ProjectAccordion.css';

const ProjectBentoGrid = ({ images, imageMap, title, onImageClick }) => {
  if (!images || images.length === 0) return null;

  const isConcierge = title.toLowerCase() === 'concierge';

  return (
    <div className={`project-bento-grid count-${Math.min(images.length, 3)} ${isConcierge ? 'variant-reverse' : ''}`}>
      {images.slice(0, 3).map((key, i) => (
        imageMap[key] ? (
          <button
            type="button"
            className={`bento-item item-${i}`}
            key={`${key}-${i}`}
            onClick={() => onImageClick({ src: imageMap[key], alt: `${title} screenshot ${i + 1}` })}
          >
            <img
              src={imageMap[key]}
              alt={`${title} screenshot ${i + 1}`}
              loading="lazy"
            />
            <div className="bento-hover-overlay">
              <span className="view-label">View</span>
            </div>
          </button>
        ) : null
      ))}
    </div>
  );
};

const ProjectAccordion = ({ items = profile.projects }) => {

  const [expandedIdx, setExpandedIdx] = useState(0);

  const [activeImage, setActiveImage] = useState(null);

  const imageMap = {


    concierge_1: concierge1,
    concierge_2: concierge2,
    concierge_3: concierge3,
    vitalis_1: vitalis1,
    vitalis_2: vitalis2,
    vitalis_3: vitalis3
  };

  const getRepoName = (url) => {
    if (!url) return "";
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes('github.com')) {
        return parsed.pathname.replace(/^\//, "").replace(/\/$/, "");
      }
      return parsed.hostname + parsed.pathname.replace(/\/$/, "");
    } catch (err) {
      return url.replace(/^https?:\/\//, "");
    }
  };

  return (
    <div className="project-accordion-list">
      {activeImage && (
        <div className="media-modal" onClick={() => setActiveImage(null)}>
          <div className="media-modal-inner" onClick={(e) => e.stopPropagation()}>
            <img src={activeImage.src} alt={activeImage.alt} />
            <button
              className="media-modal-close"
              onClick={() => setActiveImage(null)}
              aria-label="Close image"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {items.map((project, idx) => {
        const isExpanded = expandedIdx === idx;
        const isExperience = Boolean(project.company || project.role);
        const title = project.title || project.company || project.role;
        const subtitle = isExperience ? (project.role || project.company) : null;
        const period = project.period;
        const tags = project.technologies || project.skills || [];
        
        return (
          <div 
            key={idx} 
            className={`accordion-item ${isExpanded ? 'active' : ''}`}
          >
            <button 
              className="accordion-header"
              onClick={() => setExpandedIdx(isExpanded ? null : idx)}
            >
              <div className="header-left">
                <span className="project-index">0{idx + 1}</span>
                <div className="accordion-title-block">
                  <h3 className="project-title">{title}</h3>
                  {subtitle && <span className="project-subtitle">{subtitle}</span>}
                </div>
              </div>
              <div className="header-right">
                <span className="project-year">{period}</span>
                <span className={`toggle-icon ${isExpanded ? 'open' : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </span>
              </div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div 
                  className="accordion-content"
                  initial={{ height: 0, opacity: 0, y: -8 }}
                  animate={{ height: 'auto', opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="content-inner-grid">
                    <div className="project-details">
                      {project.imageKeys && project.imageKeys.length > 0 && (
                        <ProjectBentoGrid 
                          images={project.imageKeys} 
                          imageMap={imageMap} 
                          title={title} 
                          onImageClick={setActiveImage} 
                        />
                      )}
                      {project.link && (
                        <div className="project-links">
                          <a
                            className="project-github-pill"
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <svg className="github-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                            </svg>
                            <span className="pill-text">View Source</span>
                            <span className="pill-repo">{getRepoName(project.link)}</span>
                          </a>
                        </div>
                      )}
                      <ul className="accordion-bullets">
                        {project.bullets.map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>
                      <div className="accordion-tags">
                        {tags.map(tech => (
                          <span key={tech} className="simple-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectAccordion;
