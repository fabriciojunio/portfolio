import type { SkillCategory } from "../types";

export const skillCategories: SkillCategory[] = [
  {
    name: "linguagens",
    color: "#818cf8",
    skills: [
      { name: "Python", projects: ["GolData — Robô de Sinais", "GolData", "Quantbot ML", "JIS"] },
      { name: "Java", projects: ["CodeReview AI", "JIS"] },
      { name: "TypeScript", projects: ["GolData — Robô de Sinais", "ConectAgente", "Apontamento de Horas", "Paiol Tech", "KoraCRM", "MyCondPets", "JIS"] },
      { name: "PHP", projects: ["KoraCRM"] },
      { name: "JavaScript", projects: ["MyCondPets", "KoraCRM"] },
      { name: "SQL", projects: ["Todos os projetos"] },
    ],
  },
  {
    name: "frameworks",
    color: "#4ade80",
    skills: [
      { name: "React / Next.js", projects: ["GolData — Robô de Sinais", "Apontamento de Horas", "MyCondPets", "Paiol Tech", "JIS"] },
      { name: "React Native / Expo", projects: ["ConectAgente"] },
      { name: "FastAPI", projects: ["GolData — Robô de Sinais", "GolData", "Quantbot ML", "JIS"] },
      { name: "Spring Boot", projects: ["CodeReview AI", "JIS"] },
      { name: "NestJS", projects: ["Paiol Tech"] },
      { name: "Laravel", projects: ["KoraCRM"] },
      { name: "SQLAlchemy", projects: ["GolData — Robô de Sinais", "GolData"] },
    ],
  },
  {
    name: "data_science",
    color: "#f59e0b",
    skills: [
      { name: "scikit-learn", projects: ["GolData — Robô de Sinais", "GolData", "Quantbot ML", "JIS"] },
      { name: "XGBoost", projects: ["GolData", "Quantbot ML"] },
      { name: "Dixon-Coles + Elo", projects: ["GolData — Robô de Sinais"] },
      { name: "Critério de Kelly", projects: ["GolData — Robô de Sinais"] },
      { name: "PyTorch", projects: ["Quantbot ML"] },
      { name: "FinBERT", projects: ["Quantbot ML"] },
      { name: "Monte Carlo", projects: ["Quantbot ML"] },
      { name: "NetworkX", projects: ["GolData"] },
    ],
  },
  {
    name: "infra_e_dados",
    color: "#06b6d4",
    skills: [
      { name: "PostgreSQL", projects: ["GolData — Robô de Sinais", "Apontamento de Horas", "KoraCRM", "Paiol Tech", "JIS", "MyCondPets"] },
      { name: "Redis", projects: ["GolData — Robô de Sinais", "CodeReview AI", "KoraCRM", "Paiol Tech"] },
      { name: "Docker", projects: ["GolData — Robô de Sinais", "CodeReview AI", "JIS", "KoraCRM"] },
      { name: "Supabase", projects: ["ConectAgente", "Apontamento de Horas", "MyCondPets"] },
      { name: "RabbitMQ", projects: ["CodeReview AI"] },
      { name: "Turborepo", projects: ["Paiol Tech"] },
      { name: "AWS S3", projects: ["KoraCRM"] },
      { name: "Nginx", projects: ["GolData — Robô de Sinais"] },
      { name: "GitHub Actions (CI/CD)", projects: ["Todos os projetos"] },
      { name: "Git", projects: ["Todos"] },
    ],
  },
];
