export interface Metric {
  value: string;
  label: string;
  color: string;
}

export interface TechBadge {
  name: string;
  color: string;
}

export interface Project {
  id: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  category: string;
  tags: string[];
  tagColor: string;
  dotColor: string;
  metrics: Metric[];
  features: string[];
  architecture: string;
  techStack: TechBadge[];
  github: string;
  demo: string | null;
  filters: string[];
}

export interface Skill {
  name: string;
  projects: string[];
}

export interface SkillCategory {
  name: string;
  color: string;
  skills: Skill[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
  color: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  stack: TechBadge[];
}
