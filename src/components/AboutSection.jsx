import AboutNeural from "./AboutNeural";
import "./AboutSection.css";

function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-header">
        <h2 className="section-title">Identity</h2>
      </div>

      <div className="about-content-area single-layout">
        <AboutNeural />
      </div>
    </section>
  );
}

export default AboutSection;
