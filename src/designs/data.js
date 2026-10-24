import { profile } from "../data/profile";
import { media } from "./media";

export { profile };

export const person = profile.personal;
export const [firstName, lastName] = person.name.split(" ");
export const photo = media.profile;

export const projects = profile.projects.map((p) => ({
  ...p,
  slug: p.title.toLowerCase().replace(/\s+/g, "-"),
  images: p.imageKeys.map((k) => media[k]),
}));

export const experiences = profile.experiences;
export const skills = profile.skills;
export const education = profile.education;
export const leadership = profile.leadership;
export const press = profile.advocacyLinks;

export const links = [
  { label: "GitHub", href: person.github },
  { label: "LinkedIn", href: person.linkedin },
  { label: "Wikipedia", href: person.wikipedia },
];

// "September 2025 - Present" -> { start: "Sep 2025", end: "Present" }
export function splitPeriod(period) {
  const [start, end] = period.split(" - ");
  const short = (s) => s.replace(/^(\w{3})\w*/, "$1");
  return { start: short(start), end: short(end) };
}

export const stats = {
  projects: profile.projects.length,
  internships: profile.experiences.filter((e) => e.type === "internship").length,
  research: profile.experiences.filter((e) => e.type === "research").length,
};

export const ext = { target: "_blank", rel: "noopener noreferrer" };
