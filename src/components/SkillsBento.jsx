import { profile } from "../data/profile";
import "./SkillsBento.css";

const SkillsBento = () => {
  const categoryDisplayNames = {
    "AI and ML": "Machine Learning",
  };

  const categoryOrder = {
    "Programming Languages": 0,
    "AI and ML": 1,
    "Computer Vision": 2,
    "Full-Stack Development": 3,
    "Data and Infrastructure": 4,
    "Automation and Testing": 5,
  };

  const orderedSkills = [...profile.skills].sort(
    (a, b) => (categoryOrder[a.category] ?? 99) - (categoryOrder[b.category] ?? 99)
  );

  return (
    <div className="skills-rows">
      {orderedSkills.map((skillGroup) => (
        <div key={skillGroup.category} className="skills-row">
          <div className="skills-row-label">
            <h3 className="skills-row-category">
              {categoryDisplayNames[skillGroup.category] || skillGroup.category}
            </h3>
          </div>
          <div className="skills-row-tags">
            {skillGroup.items.map((item) => (
              <span key={item} className="simple-tag">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsBento;
