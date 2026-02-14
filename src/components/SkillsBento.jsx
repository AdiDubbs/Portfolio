import { profile } from "../data/profile";
import "./SkillsBento.css";

const SkillsBento = () => {
  const categoryDisplayNames = {
    "AI and ML": "Artificial Intelligence and Machine Learning",
  };

  const categoryClasses = {
    "Programming Languages": "bento-lang",
    "AI and ML": "bento-ai",
    "Computer Vision": "bento-cv",
    "Full-Stack Development": "bento-backend",
    "Automation and Testing": "bento-automation",
    "Data and Infrastructure": "bento-infra",
  };

  const categorySizeClasses = {
    "AI and ML": "bento-span-2",
    "Automation and Testing": "bento-span-2",
  };

  const categoryIcons = {
    "Programming Languages": (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="bento-icon">
        <path
          d="M9 7L4 12l5 5M15 7l5 5-5 5"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    "AI and ML": (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="bento-icon">
        <path
          d="M7 9h10v6H7z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M3 12h4M17 12h4M12 3v4M12 17v4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
    "Computer Vision": (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="bento-icon">
        <path
          d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="12"
          cy="12"
          r="3"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
    "Full-Stack Development": (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="bento-icon">
        <rect
          x="4"
          y="4"
          width="16"
          height="6"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <rect
          x="4"
          y="14"
          width="16"
          height="6"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="8" cy="7" r="1" fill="currentColor" />
        <circle cx="8" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
    "Automation and Testing": (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="bento-icon">
        <path
          d="M5 7h14M7 11h10M9 15h6M4 4h16v16H4z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    "Data and Infrastructure": (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="bento-icon">
        <ellipse
          cx="12"
          cy="6"
          rx="7"
          ry="3"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M5 6v8c0 1.7 3.1 3 7 3s7-1.3 7-3V6"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
  };

  const categoryOrder = [
    "AI and ML",
    "Programming Languages",
    "Computer Vision",
    "Full-Stack Development",
    "Data and Infrastructure",
    "Automation and Testing",
  ];

  const orderIndex = new Map(
    categoryOrder.map((category, index) => [category, index]),
  );
  const orderedSkills = [...profile.skills].sort((a, b) => {
    const aIndex = orderIndex.has(a.category)
      ? orderIndex.get(a.category)
      : Number.MAX_SAFE_INTEGER;
    const bIndex = orderIndex.has(b.category)
      ? orderIndex.get(b.category)
      : Number.MAX_SAFE_INTEGER;
    return aIndex - bIndex;
  });

  return (
    <div className="skills-bento-grid">
      {/* Skill Categories */}
      {orderedSkills.map((skillGroup) => {
        const gridClass = [
          "bento-card",
          categoryClasses[skillGroup.category] || "",
          categorySizeClasses[skillGroup.category] || "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div key={skillGroup.category} className={gridClass}>
            <div className="bento-header">
              <span className="bento-icon-wrap">
                {categoryIcons[skillGroup.category]}
              </span>
              <h3 className="bento-category">
                {categoryDisplayNames[skillGroup.category] || skillGroup.category}
              </h3>
            </div>
            <div className="bento-tags">
              {skillGroup.items.map((item) => (
                <div key={item} className="bento-tag">
                  {item}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillsBento;
