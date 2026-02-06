import React from "react";
import "./ExperienceGallery.css";
import aionosLogo from "../assets/aionos_watermark.png";
import rsystemsLogo from "../assets/r_systems_watermark.jpeg";
import uwLogo from "../assets/uw_madison.png";

const ExperienceGallery = ({ items }) => {
  const getWatermark = (company) => {
    if (!company) return null;
    const co = company.toLowerCase();
    if (co.includes("aionos")) return aionosLogo;
    if (co.includes("r systems")) return rsystemsLogo;
    if (co.includes("university of wisconsin") || co.includes("madcse") || co.includes("speech processing") || co.includes("auditory neuroscience")) return uwLogo;
    return null;
  };

  const formatUrl = (url) => {
    if (!url) return "";
    try {
      const parsed = new URL(url);
      const path = parsed.pathname.replace(/\/$/, "");
      return `${parsed.host}${path}`;
    } catch (err) {
      return url.replace(/^https?:\/\//, "");
    }
  };

  return (
    <div className="projects-grid">
      {items.map((item, idx) => {
        const title = item.title || item.role;
        const subtitle = item.company || item.period;
        const tags = item.technologies || item.skills || [];
        
        return (
          <div key={idx} className="project-card">
            <div className="timeline-dot"></div>
            
            <div className="project-visual-column">
              {item.company && (
                <div className="experience-company-header">
                  <div className="exp-company-info">
                    <span className="exp-company-name">{item.company}</span>
                    {item.type === 'research' && <span className="exp-location-label">University of Wisconsin–Madison</span>}
                  </div>
                  {item.type === 'research' && <span className="exp-type-label">Academic Research</span>}
                </div>
              )}
              <div className={`project-visual project-card-visual ${item.type === 'research' ? 'visual-research' : ''}`}>
                <div className="visual-media-wrap">
                  {getWatermark(item.company) && (
                    <img 
                      src={getWatermark(item.company)} 
                      alt={`${item.company} watermark`} 
                      className={`experience-watermark 
                        ${item.company.toLowerCase().includes('aionos') ? 'aionos-logo-fit' : ''}
                        ${item.company.toLowerCase().includes('r systems') ? 'rsystems-logo-fit' : ''}
                        ${item.company.toLowerCase().includes('university') ? 'uw-logo-fit' : ''}
                        ${item.company.toLowerCase().includes('madcse') ? 'uw-logo-fit' : ''}
                        ${item.company.toLowerCase().includes('speech') ? 'uw-logo-fit' : ''}
                      `} 
                    />
                  )}
                  <div className="project-number">0{idx + 1}</div>
                </div>
              </div>

              {(item.link || item.projectLink) && (
                <div className="exp-links exp-links--column">
                  {item.link && (
                    <a
                      className="exp-link"
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="exp-link-label">{item.linkLabel || "Company"}</span>
                      <span className="exp-link-url">{formatUrl(item.link)}</span>
                    </a>
                  )}
                  {item.projectLink && (
                    <a
                      className="exp-link"
                      href={item.projectLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="exp-link-label">{item.projectLinkLabel || "Project"}</span>
                      <span className="exp-link-url">{formatUrl(item.projectLink)}</span>
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="project-content">
              <span className="project-meta">{item.period}</span>
              <h3>{title}</h3>
              {item.type && <span className="exp-type-tag">{item.type}</span>}
              
              <ul className="project-bullets">
                {item.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
              <div className="project-tags">
                {tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExperienceGallery;
