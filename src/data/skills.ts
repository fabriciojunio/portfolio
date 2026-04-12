import type { SkillCategory } from "../types";

export const skillCategories: SkillCategory[] = [
  {
    name: "linguagens",
    color: "#818cf8",
    skills: [
      { name: "Python", projects: ["QuantBot ML", "DataPulse", "SentinelCV", "NexusHub"] },
      { name: "Java", projects: ["SentinelCV", "CodeReview AI", "NexusHub", "Nexum"] },
      { name: "JavaScript", projects: ["EventFlow", "MyCondPets", "QuantBot ML"] },
      { name: "TypeScript", projects: ["EventFlow", "ConectAgente", "MyCondPets", "NexusHub"] },
      { name: "SQL", projects: ["Todos os projetos"] },
    ],
  },
  {
    name: "frameworks",
    color: "#4ade80",
    skills: [
      { name: "React", projects: ["QuantBot ML", "NexusHub", "MyCondPets"] },
      { name: "Angular", projects: ["EventFlow"] },
      { name: "Next.js", projects: ["MyCondPets"] },
      { name: "Spring Boot", projects: ["SentinelCV", "CodeReview AI", "NexusHub"] },
      { name: "FastAPI", projects: ["QuantBot ML", "DataPulse", "SentinelCV", "NexusHub"] },
      { name: "Express", projects: ["EventFlow"] },
      { name: "React Native", projects: ["ConectAgente"] },
    ],
  },
  {
    name: "data_science",
    color: "#f59e0b",
    skills: [
      { name: "Scikit-learn", projects: ["QuantBot ML", "DataPulse", "SentinelCV"] },
      { name: "XGBoost", projects: ["QuantBot ML", "DataPulse"] },
      { name: "Pandas", projects: ["QuantBot ML", "DataPulse"] },
      { name: "NLP / spaCy", projects: ["SentinelCV", "MyCondPets"] },
      { name: "FinBERT", projects: ["QuantBot ML"] },
      { name: "SHAP", projects: ["DataPulse"] },
      { name: "MLflow", projects: ["DataPulse"] },
      { name: "LightGBM", projects: ["DataPulse"] },
    ],
  },
  {
    name: "infra",
    color: "#06b6d4",
    skills: [
      { name: "PostgreSQL", projects: ["Quase todos"] },
      { name: "Redis", projects: ["CodeReview AI", "NexusHub"] },
      { name: "Docker", projects: ["Todos os novos"] },
      { name: "Elasticsearch", projects: ["NexusHub"] },
      { name: "RabbitMQ", projects: ["CodeReview AI"] },
      { name: "Supabase", projects: ["ConectAgente"] },
      { name: "Git", projects: ["Todos"] },
    ],
  },
];
