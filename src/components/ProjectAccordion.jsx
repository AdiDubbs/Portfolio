import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { profile } from '../data/profile';
import { imageMap } from '../assets/index.js';
import { ImageGalleryModal } from './ImageGalleryModal';
import './ProjectAccordion.css';

const DEFAULT_IMAGE_LABELS = ["Dashboard", "Results", "Mobile View"];

// Subtle 3D tilt blur-reveal animation for the bento items
const tiltVariants = {
  hidden: { opacity: 0, y: 16, rotateX: 12, scale: 0.95, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", bounce: 0.25, duration: 0.8 }
  }
};

const ProjectBentoGrid = ({ images, title, onImageClick, reduceMotion }) => {
  if (!images || images.length === 0) return null;

  const isConcierge = title.toLowerCase() === 'concierge';
  const isPortraitPair = title.toLowerCase() === 'carbon';
  const isDrift = title.toLowerCase() === 'drift shield';

  return (
    <div className={`project-bento-grid count-${Math.min(images.length, 3)} ${isConcierge ? 'variant-reverse' : ''} ${isPortraitPair ? 'portrait-pair' : ''} ${isDrift ? 'drift-fit' : ''}`}>
      {images.slice(0, 3).map((image, i) => (
        image?.src ? (
          <motion.button
            type="button"
            className={`bento-item item-${i}`}
            key={`${image.key}-${i}`}
            onClick={() => onImageClick(i)}
            variants={reduceMotion ? {} : tiltVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
            />
            <span className="bento-caption-chip">{image.label}</span>
            <div className="bento-hover-overlay">
              <span className="view-label">Open full size</span>
            </div>
          </motion.button>
        ) : null
      ))}
    </div>
  );
};

const contentStaggerVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.06,
      delayChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    y: 4,
    transition: { duration: 0.12, ease: [0.4, 0, 1, 1] },
  },
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: 4, transition: { duration: 0.12 } },
};

// Memoized AccordionItem to prevent re-renders of unrelated project cards
const AccordionItem = React.memo(({ project, idx, isExpanded, onToggle, openGallery, reduceMotion }) => {
  const isExperience = Boolean(project.company || project.role);
  const title = project.title || project.company || project.role;
  const subtitle = isExperience ? (project.role || project.company) : null;
  const period = project.period;
  const tags = project.technologies || project.skills || [];
  const imageEntries = (project.imageKeys || []).slice(0, 3)
    .map((key, imageIdx) => (
      imageMap[key]
        ? {
            key,
            src: imageMap[key],
            alt: `${title} screenshot ${imageIdx + 1}`,
            label: project.imageLabels?.[imageIdx] || DEFAULT_IMAGE_LABELS[imageIdx] || `Screenshot ${imageIdx + 1}`,
          }
        : null
    ))
    .filter(Boolean);

  return (
    <motion.div
      layout
      initial={false}
      className={`accordion-item ${isExpanded ? 'active' : ''}`}
    >
      <motion.button
        className="accordion-header"
        onClick={() => onToggle(idx)}
        whileHover={reduceMotion ? undefined : { y: -2, x: 2 }}
        whileTap={reduceMotion ? undefined : { y: 0, x: 0, scale: 0.997 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="header-left">
          <span className="accordion-chevron" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </span>
          <div className="accordion-title-block">
            <div className="title-row">
              <h3 className="project-title">{title}</h3>
              {project.category && (
                <span className="project-category-inline">
                  {project.category}
                </span>
              )}
            </div>
            {subtitle && <span className="project-subtitle">{subtitle}</span>}
          </div>
        </div>
        <div className="header-right">
          <span className="project-year">{period}</span>
          <span className={`toggle-icon ${isExpanded ? 'open' : ''}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line className="toggle-line toggle-line-vertical" x1="12" y1="5" x2="12" y2="19"></line>
                  <line className="toggle-line toggle-line-horizontal" x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
          </span>
        </div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            layout
            className="accordion-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
              opacity: { duration: 0.25, ease: "easeOut" },
            }}
          >
            <motion.div
              className="content-inner-grid"
              variants={contentStaggerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="project-details">
                {imageEntries.length > 0 && (
                  <motion.div variants={staggerItemVariants}>
                    <ProjectBentoGrid
                      images={imageEntries}
                      title={title}
                      onImageClick={(index) => openGallery(title, imageEntries, index)}
                      reduceMotion={reduceMotion}
                    />
                  </motion.div>
                )}
                {project.link && (
                  <motion.div className="project-links" variants={staggerItemVariants}>
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
                    </a>
                  </motion.div>
                )}
                <motion.ul className="accordion-bullets" variants={staggerItemVariants}>
                  {project.bullets.map((bullet, i) => (
                    <motion.li key={i} variants={staggerItemVariants}>
                      {bullet}
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.div className="accordion-tags" variants={staggerItemVariants}>
                  {tags.map(tech => (
                    <motion.span key={tech} className="simple-tag" variants={staggerItemVariants}>
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  return prevProps.isExpanded === nextProps.isExpanded && prevProps.project === nextProps.project;
});

const ProjectAccordion = ({ items = profile.projects }) => {
  const [expandedItems, setExpandedItems] = useState(new Set([0]));
  const [activeGallery, setActiveGallery] = useState(null);
  const reduceMotion = useReducedMotion();

  const handleAccordionClick = (idx) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(idx)) {
        newSet.delete(idx);
      } else {
        newSet.add(idx);
      }
      return newSet;
    });
  };

  const closeModal = () => {
    setActiveGallery(null);
  };

  const goToImage = (direction) => {
    setActiveGallery((prev) => {
      if (!prev || !prev.images?.length) return prev;
      const count = prev.images.length;
      const nextIndex = (prev.index + direction + count) % count;
      return { ...prev, index: nextIndex };
    });
  };

  const openGallery = (projectTitle, images, index) => {
    if (!images?.length) return;
    setActiveGallery({ title: projectTitle, images, index });
  };

  return (
    <div className="project-accordion-list">
      <ImageGalleryModal
        activeGallery={activeGallery}
        closeModal={closeModal}
        goToImage={goToImage}
      />

      {items.map((project, idx) => {
        const isExpanded = expandedItems.has(idx);

        return (
          <AccordionItem
            key={idx}
            project={project}
            idx={idx}
            isExpanded={isExpanded}
            onToggle={handleAccordionClick}
            openGallery={openGallery}
            reduceMotion={reduceMotion}
          />
        );
      })}
    </div>
  );
};

export default ProjectAccordion;
