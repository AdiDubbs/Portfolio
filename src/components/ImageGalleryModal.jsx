import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const clampScale = (value) => Math.min(4, Math.max(1, value));

export const ImageGalleryModal = ({ activeGallery, closeModal, goToImage }) => {
  const [zoom, setZoom] = useState({ scale: 1, originX: 50, originY: 50 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const touchStartX = useRef(null);
  const pinchStartDistance = useRef(null);
  const pinchStartScale = useRef(1);
  const isPortraitGallery = activeGallery?.title?.toLowerCase() === 'carbon';

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (activeGallery && activeGallery.images) {
      const nextIndex = (activeGallery.index + 1) % activeGallery.images.length;
      const prevIndex = (activeGallery.index - 1 + activeGallery.images.length) % activeGallery.images.length;

      const preloadNext = new Image();
      preloadNext.src = activeGallery.images[nextIndex].src;

      const preloadPrev = new Image();
      preloadPrev.src = activeGallery.images[prevIndex].src;
    }
  }, [activeGallery]);

  useEffect(() => {
    setZoom({ scale: 1, originX: 50, originY: 50 });
    pinchStartDistance.current = null;
    pinchStartScale.current = 1;
    touchStartX.current = null;
  }, [activeGallery?.title, activeGallery?.index]);

  const resetZoom = () => {
    setZoom({ scale: 1, originX: 50, originY: 50 });
    pinchStartDistance.current = null;
    pinchStartScale.current = 1;
  };

  const handleGoToImage = (direction) => {
    resetZoom();
    goToImage(direction);
  };

  const handleModalTouchStart = (event) => {
    if (event.touches.length === 2) {
      const [a, b] = event.touches;
      const distance = Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
      pinchStartDistance.current = distance;
      pinchStartScale.current = zoom.scale;
      touchStartX.current = null;
      return;
    }

    pinchStartDistance.current = null;
    pinchStartScale.current = zoom.scale;
    if (zoom.scale > 1 || event.touches.length !== 1) {
      touchStartX.current = null;
      return;
    }
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleModalTouchMove = (event) => {
    if (event.touches.length !== 2 || pinchStartDistance.current === null) return;
    event.preventDefault();
    const [a, b] = event.touches;
    const distance = Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
    const nextScale = clampScale((distance / pinchStartDistance.current) * pinchStartScale.current);
    setZoom((prev) => ({ ...prev, scale: nextScale }));
  };

  const handleModalTouchEnd = (event) => {
    if (event.touches.length < 2) {
      pinchStartDistance.current = null;
      pinchStartScale.current = zoom.scale;
    }
    if (zoom.scale > 1.02) return;
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 48) return;
    handleGoToImage(delta < 0 ? 1 : -1);
  };

  const handleModalDoubleClick = (event) => {
    const viewport = event.currentTarget;
    if (zoom.scale > 1) {
      resetZoom();
      return;
    }
    const rect = viewport.getBoundingClientRect();
    const originX = ((event.clientX - rect.left) / rect.width) * 100;
    const originY = ((event.clientY - rect.top) / rect.height) * 100;
    setZoom({
      scale: 2.2,
      originX: Math.min(90, Math.max(10, originX)),
      originY: Math.min(90, Math.max(10, originY)),
    });
  };

  useEffect(() => {
    if (!activeGallery) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeys = (event) => {
      if (event.key === "Escape") {
        closeModal();
      } else if (event.key === "ArrowRight") {
        if (zoom.scale <= 1.02) handleGoToImage(1);
      } else if (event.key === "ArrowLeft") {
        if (zoom.scale <= 1.02) handleGoToImage(-1);
      }
    };

    window.addEventListener("keydown", handleKeys);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeys);
    };
  }, [activeGallery, zoom.scale]);

  return (
    <AnimatePresence>
      {activeGallery && (
        <motion.div
          className="media-modal"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeGallery.title} image gallery`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.26, ease: "easeOut" }}
        >
          <motion.div
            className={`media-modal-inner ${isPortraitGallery ? 'portrait-mode' : ''}`}
            onTouchStart={handleModalTouchStart}
            onTouchMove={handleModalTouchMove}
            onTouchEnd={handleModalTouchEnd}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="media-modal-header" onClick={(e) => e.stopPropagation()}>
              <div className="media-modal-context" aria-live="polite">
                <span className="media-modal-project">{activeGallery.title}</span>
                <span className="media-modal-caption">{activeGallery.images[activeGallery.index].label}</span>
              </div>
              <div className="media-modal-header-right">
                <span className="media-modal-counter">
                  {activeGallery.index + 1} / {activeGallery.images.length}
                </span>
                <div className="media-modal-controls">
                  <button
                    type="button"
                    className="media-modal-nav"
                    onClick={(e) => { e.stopPropagation(); handleGoToImage(-1); }}
                    aria-label="Previous image"
                    disabled={zoom.scale > 1.02}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="media-modal-nav"
                    onClick={(e) => { e.stopPropagation(); handleGoToImage(1); }}
                    aria-label="Next image"
                    disabled={zoom.scale > 1.02}
                  >
                    ›
                  </button>
                  <button
                    type="button"
                    className="media-modal-close"
                    onClick={closeModal}
                    aria-label="Close image"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
            <div className="media-modal-edge media-modal-edge-left" aria-hidden="true" />
            <div className="media-modal-edge media-modal-edge-right" aria-hidden="true" />

            <motion.div
              className={`media-modal-viewport ${zoom.scale > 1 ? "is-zoomed" : ""} ${isPortraitGallery ? 'portrait-mode' : ''}`}
              onDoubleClick={handleModalDoubleClick}
            >
              <img
                src={activeGallery.images[activeGallery.index].src}
                alt={activeGallery.images[activeGallery.index].alt}
                onClick={(e) => e.stopPropagation()}
                style={{
                  transform: `scale(${zoom.scale})`,
                  transformOrigin: `${zoom.originX}% ${zoom.originY}%`,
                }}
              />
            </motion.div>

            <span className="media-modal-zoom-hint">
              {isTouchDevice ? "Pinch to zoom" : "Double-click to zoom"}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
