import "./ExperienceGallery.css";
import aionosLogo from "../assets/aionos_watermark.png";
import rsystemsLogo from "../assets/r_systems_watermark.jpeg";
import uwLogo from "../assets/uw_madison.png";

const ExperienceGallery = ({ items }) => {
  const getWatermarkInfo = (company) => {
    if (!company) return null;
    const co = company.toLowerCase();
    if (co.includes("aionos")) return { src: aionosLogo, cls: "aionos-logo-fit" };
    if (co.includes("r systems")) return { src: rsystemsLogo, cls: "rsystems-logo-fit" };
    if (co.includes("university of wisconsin") || co.includes("madcse") || co.includes("speech processing") || co.includes("auditory neuroscience")) return { src: uwLogo, cls: "uw-logo-fit" };
    return null;
  };

  const formatUrl = (url) => {
    if (!url) return "";
    try {
      const parsed = new URL(url);
      const path = parsed.pathname.replace(/\/$/, "");
      return `${parsed.host}${path}`;
    } catch {
      return url.replace(/^https?:\/\//, "");
    }
  };

  return (
    <div className="experience-gallery-grid">
      {items.map((item, idx) => {
        const title = item.title || item.role;
        const tags = item.technologies || item.skills || [];

        const watermark = getWatermarkInfo(item.company);
        const visualBgClass = watermark ? `visual-bg-${watermark.cls.split('-')[0]}` : '';
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
                  {item.type && <span className="exp-type-tag">{item.type}</span>}
                </div>
              )}
              <div className={`project-visual project-card-visual ${visualBgClass}`}>
                <div className="visual-media-wrap">
                  {watermark && (
                    <img
                      src={watermark.src}
                      alt={`${item.company} logo`}
                      className={`experience-watermark ${watermark.cls}`}
                    />
                  )}
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
                      <span className="exp-link-label">{item.linkLabel || "Company"} ↗</span>
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
                      <span className="exp-link-label">{item.projectLinkLabel || "Project"} ↗</span>
                      <span className="exp-link-url">{formatUrl(item.projectLink)}</span>
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="project-content">
              <div className="exp-meta-row">
                <span className="project-meta">{item.period}</span>
                {item.location && (
                  <span className="exp-location-meta">• {item.location}</span>
                )}
              </div>
              <h3>{title}</h3>

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
