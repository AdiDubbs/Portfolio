import { clamp01 } from "./config";

export default class Point {
  constructor(x, y, visibility = 1) {
    this.baseX = x;
    this.baseY = y;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.visibility = visibility;
    this.heat = 0;
    this.scanBoost = 0;
  }

  update({
    currentPointer,
    scrollY,
    viewportHeight,
    motion,
    navPulse,
    monitorActive,
    monitorPos,
    monitorTime,
  }) {
    const returnStrength = motion.returnStrength ?? 0.02;
    const damping = motion.damping ?? 0.9;
    const maxSpeed = motion.maxSpeed ?? 4;

    const backDx = this.baseX - this.x;
    const backDy = this.baseY - this.y;
    this.vx += backDx * returnStrength;
    this.vy += backDy * returnStrength;

    if (currentPointer?.active && (motion.pointerRadius ?? 0) > 0) {
      const dx = this.x - currentPointer.x;
      const dy = this.y - (currentPointer.y + scrollY);
      const distSq = dx * dx + dy * dy;
      const radius = motion.pointerRadius;
      const radiusSq = radius * radius;

      if (distSq > 0.001 && distSq < radiusSq) {
        const dist = Math.sqrt(distSq);
        const t = 1 - dist / radius;
        const force = t * (motion.pointerForce ?? 0.6);
        this.vx += (dx / dist) * force;
        this.vy += (dy / dist) * force;
        this.heat = Math.max(this.heat, t * 0.9);
      }
    }

    if (navPulse?.active && (motion.navPulseBand ?? 0) > 0) {
      const dx = this.x - navPulse.x;
      const dy = this.y - navPulse.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const bandDistance = Math.abs(dist - navPulse.radius);

      if (bandDistance < motion.navPulseBand) {
        const t = 1 - bandDistance / motion.navPulseBand;
        const force = t * (motion.navPulseForce ?? 0.4);
        this.vx += (dx / dist) * force;
        this.vy += (dy / dist) * force;
        this.heat = Math.max(this.heat, t * 0.7);
      }
    }

    if (monitorActive && motion.enableAura && (motion.auraRadius ?? 0) > 0) {
      const dx = monitorPos.x - this.x;
      const dy = monitorPos.y + scrollY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      if (dist < motion.auraRadius) {
        const t = 1 - dist / motion.auraRadius;
        const wobble =
          Math.sin((monitorTime ?? 0) * 0.05 + this.baseX * 0.03 + this.baseY * 0.03) *
          (motion.auraWobble ?? 0.2);
        const pull = t * (motion.auraPull ?? 0.01);
        this.vx += (dx / dist) * pull - (dy / dist) * wobble;
        this.vy += (dy / dist) * pull + (dx / dist) * wobble;
        this.heat = Math.max(this.heat, t * 0.45);
      }
    }

    this.vx *= damping;
    this.vy *= damping;

    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > maxSpeed && speed > 0) {
      const scale = maxSpeed / speed;
      this.vx *= scale;
      this.vy *= scale;
    }

    this.x += this.vx;
    this.y += this.vy;

    this.heat *= motion.heatDecay ?? 0.94;
    this.scanBoost *= motion.scanDecay ?? 0.88;

    const screenY = this.y - scrollY;
    const margin = motion.visibleMargin ?? 120;
    return screenY > -margin && screenY < viewportHeight + margin;
  }

  draw({ context, scrollY, motion, timeSeconds }) {
    const screenY = this.y - scrollY;
    const shimmer = 0.06 * Math.sin(timeSeconds * 1.2 + this.baseX * 0.017 + this.baseY * 0.011);
    const alpha = clamp01(
      this.visibility * ((motion.baseAlpha ?? 0.25) + shimmer + this.heat * 0.55 + this.scanBoost * 0.7),
    );

    if (alpha <= 0.01) return;

    const radius = (motion.pointSize ?? 1.2) * (1 + this.heat * 0.65 + this.scanBoost * 0.45);

    context.beginPath();
    context.fillStyle = `rgba(255,255,255,${alpha.toFixed(4)})`;
    context.arc(this.x, screenY, radius, 0, Math.PI * 2);
    context.fill();
  }
}
