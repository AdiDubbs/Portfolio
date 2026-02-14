import { useEffect, useRef } from "react";

const SETTINGS = {
  dprCap: 2,
  heroField: {
    maxHeight: 1050,
  },
  loadPulse: {
    durationMs: 850,
    band: 40,
    force: 0.28,
  },
  textFade: {
    selectors: [
      ".hero-name",
      ".hero-title",
      ".hero-stats",
      ".hero-summary",
      ".hero-contact",
    ],
    paddingX: 0,
    paddingY: 22,
    feather: 140,
    mergeGapY: 90,
    cornerRadius: 44,
    innerSoftness: 26,
    minFade: 0.08,
  },
  colorBase: { r: 128, g: 154, b: 186 },
  colorActive: { r: 0, g: 245, b: 255 },
  baseAlpha: 0.8,
  alphaRange: 0.55,
  motion: {
    gridSpacing: 22,
    pointSize: 2,
    interactionRadius: 130,
    mouseInfluence: 0.42,
    springStiffness: 0.028,
    damping: 0.915,
    heatDecay: 0.95,
    enablePointer: true,
  },
  reducedMotion: {
    gridSpacing: 18,
    pointSize: 1.4,
    interactionRadius: 0,
    mouseInfluence: 0,
    springStiffness: 0.024,
    damping: 0.92,
    heatDecay: 0.97,
    enablePointer: false,
  },
};

const clamp01 = (value) => Math.max(0, Math.min(1, value));
const smoothstep = (edge0, edge1, x) => {
  const t = clamp01((x - edge0) / Math.max(1e-6, edge1 - edge0));
  return t * t * (3 - 2 * t);
};

const buildTextFadeZones = (container, canvas, textFade) => {
  const canvasRect = canvas.getBoundingClientRect();
  const selectors = textFade.selectors;
  const zones = [];

  for (let i = 0; i < selectors.length; i += 1) {
    const target = container.querySelector(selectors[i]);
    if (!target) continue;
    const rect = target.getBoundingClientRect();
    zones.push({
      left: rect.left - canvasRect.left - textFade.paddingX,
      right: rect.right - canvasRect.left + textFade.paddingX,
      top: rect.top - canvasRect.top - textFade.paddingY,
      bottom: rect.bottom - canvasRect.top + textFade.paddingY,
    });
  }

  zones.sort((a, b) => a.top - b.top);
  const mergedZones = [];
  const mergeGap = textFade.mergeGapY;
  for (let i = 0; i < zones.length; i += 1) {
    const zone = zones[i];
    const last = mergedZones[mergedZones.length - 1];
    if (!last || zone.top > last.bottom + mergeGap) {
      mergedZones.push({ ...zone });
      continue;
    }
    last.left = Math.min(last.left, zone.left);
    last.right = Math.max(last.right, zone.right);
    last.top = Math.min(last.top, zone.top);
    last.bottom = Math.max(last.bottom, zone.bottom);
  }
  return mergedZones;
};

const getRoundedRectSignedDistance = (x, y, zone, cornerRadius) => {
  const cx = (zone.left + zone.right) * 0.5;
  const cy = (zone.top + zone.bottom) * 0.5;
  const halfWidth = Math.max(1, (zone.right - zone.left) * 0.5);
  const halfHeight = Math.max(1, (zone.bottom - zone.top) * 0.5);
  const radius = Math.max(
    0,
    Math.min(cornerRadius, halfWidth - 1, halfHeight - 1),
  );
  const qx = Math.abs(x - cx) - (halfWidth - radius);
  const qy = Math.abs(y - cy) - (halfHeight - radius);
  const ox = Math.max(qx, 0);
  const oy = Math.max(qy, 0);
  const outside = Math.hypot(ox, oy);
  const inside = Math.min(Math.max(qx, qy), 0);
  return outside + inside - radius;
};

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Canvas + container bootstrap.
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const container = canvas.parentElement;
    if (!container) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let reducedMotion = false;
    let points = [];
    const pointer = { x: -1000, y: -1000, active: false };
    const loadPulse = {
      active: false,
      startMs: 0,
      radius: 0,
      x: 0,
      y: 0,
      maxRadius: 0,
    };
    let textFadeZones = [];

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion = motionQuery.matches;

    const getMotionSettings = () =>
      reducedMotion ? SETTINGS.reducedMotion : SETTINGS.motion;

    const getCutoutFade = (x, y) => {
      if (!textFadeZones.length) return 1;
      let signedDistance = Number.POSITIVE_INFINITY;
      for (let i = 0; i < textFadeZones.length; i += 1) {
        signedDistance = Math.min(
          signedDistance,
          getRoundedRectSignedDistance(
            x,
            y,
            textFadeZones[i],
            SETTINGS.textFade.cornerRadius,
          ),
        );
      }
      const ramp = smoothstep(
        -SETTINGS.textFade.innerSoftness,
        SETTINGS.textFade.feather,
        signedDistance,
      );
      return SETTINGS.textFade.minFade + (1 - SETTINGS.textFade.minFade) * ramp;
    };

    const createPoint = (x, y) => ({
      x0: x,
      y0: y,
      x,
      y,
      vx: 0,
      vy: 0,
      heat: 0,
      cutoutFade: getCutoutFade(x, y),
      update(currentPointer, viewportHeight, motion) {
        if (this.y < -120 || this.y > viewportHeight + 120) return false;

        // Pointer-driven repulsion.
        if (motion.enablePointer) {
          const dxToPointer = currentPointer.x - this.x;
          const dyToPointer = currentPointer.y - this.y;
          const pointerDistSq =
            dxToPointer * dxToPointer + dyToPointer * dyToPointer;
          const pointerRadius = motion.interactionRadius;

          if (
            currentPointer.active &&
            pointerDistSq < pointerRadius * pointerRadius
          ) {
            const pointerDist = Math.sqrt(pointerDistSq) || 1;
            const force = (pointerRadius - pointerDist) / pointerRadius;
            this.vx -=
              (dxToPointer / pointerDist) * 14 * force * motion.mouseInfluence;
            this.vy -=
              (dyToPointer / pointerDist) * 14 * force * motion.mouseInfluence;
            this.heat = Math.max(this.heat, force * 3);
          }
        }

        // One-shot load ripple.
        if (loadPulse.active) {
          const dxToPulse = this.x - loadPulse.x;
          const dyToPulse = this.y - loadPulse.y;
          const pulseDist =
            Math.sqrt(dxToPulse * dxToPulse + dyToPulse * dyToPulse) || 1;
          if (Math.abs(pulseDist - loadPulse.radius) < SETTINGS.loadPulse.band) {
            const pulseForce = Math.max(
              0,
              1 - Math.abs(pulseDist - loadPulse.radius) / SETTINGS.loadPulse.band,
            );
            this.vx += (dxToPulse / pulseDist) * pulseForce * SETTINGS.loadPulse.force;
            this.vy += (dyToPulse / pulseDist) * pulseForce * SETTINGS.loadPulse.force;
            this.heat = Math.max(this.heat, pulseForce * 1.8);
          }
        }

        // Heat decay + spring integration.
        this.heat *= motion.heatDecay;
        this.vx += (this.x0 - this.x) * motion.springStiffness;
        this.vy += (this.y0 - this.y) * motion.springStiffness;
        this.vx *= motion.damping;
        this.vy *= motion.damping;
        this.x += this.vx;
        this.y += this.vy;
        return true;
      },
      draw(context, motion) {
        const intensity = clamp01(this.heat);
        const alpha =
          clamp01(SETTINGS.baseAlpha + intensity * SETTINGS.alphaRange) *
          this.cutoutFade;
        const r = Math.round(
          SETTINGS.colorBase.r +
            (SETTINGS.colorActive.r - SETTINGS.colorBase.r) * intensity,
        );
        const g = Math.round(
          SETTINGS.colorBase.g +
            (SETTINGS.colorActive.g - SETTINGS.colorBase.g) * intensity,
        );
        const b = Math.round(
          SETTINGS.colorBase.b +
            (SETTINGS.colorActive.b - SETTINGS.colorBase.b) * intensity,
        );

        context.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        context.fillRect(this.x, this.y, motion.pointSize, motion.pointSize);
      },
    });

    const initClassicPoints = () => {
      // Rebuild point grid for current hero bounds.
      const motion = getMotionSettings();
      const newPoints = [];
      const maxY = Math.min(height, SETTINGS.heroField.maxHeight);
      for (let y = 0; y < maxY; y += motion.gridSpacing) {
        for (let x = 0; x < width; x += motion.gridSpacing) {
          newPoints.push(createPoint(x, y));
        }
      }
      points = newPoints;
    };

    const getContainerSize = () => {
      const rect = container.getBoundingClientRect();
      return {
        width: Math.max(1, Math.round(rect.width)),
        height: Math.max(1, Math.round(container.clientHeight || rect.height)),
      };
    };

    const runFullRebuild = () => {
      // Sync canvas size + derived effect geometry.
      const size = getContainerSize();
      width = size.width;
      height = size.height;

      const dpr = Math.min(window.devicePixelRatio || 1, SETTINGS.dprCap);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      textFadeZones = buildTextFadeZones(container, canvas, SETTINGS.textFade);
      initClassicPoints();
      loadPulse.x = width * 0.5;
      loadPulse.y = height * 0.5;
      loadPulse.maxRadius = Math.hypot(width * 0.5, height * 0.5) + 140;
    };

    const handleResize = () => {
      runFullRebuild();
    };

    const handlePointerMove = (event) => {
      if (reducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      const insideX = event.clientX >= rect.left && event.clientX <= rect.right;
      const insideY = event.clientY >= rect.top && event.clientY <= rect.bottom;
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = insideX && insideY;
    };

    const handlePointerOut = () => {
      pointer.active = false;
    };

    const handleMotionChange = (event) => {
      reducedMotion = event.matches;
      pointer.active = false;
      runFullRebuild();
    };

    const animate = () => {
      // Main frame loop: resize check -> pulse update -> points update/draw.
      const size = getContainerSize();
      if (
        Math.abs(size.width - width) > 1 ||
        Math.abs(size.height - height) > 1
      ) {
        runFullRebuild();
      }
      ctx.clearRect(0, 0, width, height);

      const motion = getMotionSettings();
      if (loadPulse.active) {
        const progress = clamp01(
          (performance.now() - loadPulse.startMs) / SETTINGS.loadPulse.durationMs,
        );
        loadPulse.radius = loadPulse.maxRadius * progress;
        if (progress >= 1) loadPulse.active = false;
      }

      const len = points.length;
      for (let i = 0; i < len; i += 1) {
        const point = points[i];
        if (point.update(pointer, height, motion)) {
          point.draw(ctx, motion);
        }
      }

      animationFrameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerout", handlePointerOut);

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener("change", handleMotionChange);
    } else {
      motionQuery.addListener(handleMotionChange);
    }

    runFullRebuild();
    if (!reducedMotion) {
      window.requestAnimationFrame(() => {
        loadPulse.active = true;
        loadPulse.startMs = performance.now();
      });
    }
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);

      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener("change", handleMotionChange);
      } else {
        motionQuery.removeListener(handleMotionChange);
      }

      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        background: "transparent",
        pointerEvents: "none",
        width: "100%",
        height: "100%",
      }}
    />
  );
}
