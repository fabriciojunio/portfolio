import type { SkillCategory } from "../types";

export const skillCategories: SkillCategory[] = [
  {
    name: "linguagens",
    color: "#818cf8",
    skills: [
      { name: "Python", projects: ["Pulso Dados", "Análise Currículos", "Base Conhecimento", "Quantbot ML", "Detector Fraudes", "Previsão Clima", "Diagnóstico IA", "Transcritor Áudio", "Oficina Chatbot", "Controle Financeiro"] },
      { name: "Java", projects: ["Análise Currículos", "Base Conhecimento", "CodeReview AI", "Painel Dev", "Diagnóstico IA", "Controle Financeiro", "Auditoria Contratos"] },
      { name: "TypeScript", projects: ["Gestor Eventos", "Base Conhecimento", "Quadro Tarefas", "Painel Dev", "Central de Logs", "Transcritor Áudio", "Oficina Chatbot", "ConectAgente", "Apontamento de Horas"] },
      { name: "JavaScript", projects: ["Gestor Eventos", "MyCondPets", "Planilha Financeira"] },
      { name: "Go", projects: ["Central de Logs"] },
      { name: "SQL", projects: ["Todos os projetos"] },
      { name: "Solidity", projects: ["Auditoria Contratos"] },
    ],
  },
  {
    name: "frameworks",
    color: "#4ade80",
    skills: [
      { name: "React / Next.js", projects: ["Base Conhecimento", "Quadro Tarefas", "Painel Dev", "MyCondPets", "Apontamento de Horas", "Planilha Financeira"] },
      { name: "Angular", projects: ["Gestor Eventos", "Controle Financeiro"] },
      { name: "React Native / Expo", projects: ["ConectAgente"] },
      { name: "Spring Boot", projects: ["Análise Currículos", "Base Conhecimento", "CodeReview AI", "Painel Dev", "Diagnóstico IA", "Controle Financeiro", "Auditoria Contratos"] },
      { name: "FastAPI", projects: ["Pulso Dados", "Análise Currículos", "Base Conhecimento", "Quantbot ML", "Detector Fraudes", "Previsão Clima", "Diagnóstico IA", "Transcritor Áudio", "Oficina Chatbot", "Controle Financeiro"] },
      { name: "Express / Node.js", projects: ["Gestor Eventos"] },
      { name: "Gin (Go)", projects: ["Central de Logs"] },
    ],
  },
  {
    name: "data_science",
    color: "#f59e0b",
    skills: [
      { name: "scikit-learn", projects: ["Pulso Dados", "Análise Currículos", "Quantbot ML", "Detector Fraudes"] },
      { name: "PyTorch", projects: ["Quantbot ML", "Detector Fraudes", "Previsão Clima", "Diagnóstico IA"] },
      { name: "XGBoost", projects: ["Pulso Dados", "Quantbot ML"] },
      { name: "SHAP / LIME", projects: ["Pulso Dados"] },
      { name: "NLP / spaCy", projects: ["Análise Currículos"] },
      { name: "Prophet", projects: ["Previsão Clima", "Controle Financeiro"] },
      { name: "Whisper", projects: ["Transcritor Áudio"] },
      { name: "FinBERT", projects: ["Quantbot ML"] },
      { name: "Grad-CAM", projects: ["Diagnóstico IA"] },
      { name: "MLflow", projects: ["Pulso Dados"] },
    ],
  },
  {
    name: "infra_e_dados",
    color: "#06b6d4",
    skills: [
      { name: "PostgreSQL", projects: ["Quase todos"] },
      { name: "Redis", projects: ["Base Conhecimento", "Gestor Eventos", "Detector Fraudes", "CodeReview AI", "Painel Dev", "Transcritor Áudio", "Controle Financeiro", "Auditoria Contratos"] },
      { name: "Docker", projects: ["Todos os novos"] },
      { name: "Elasticsearch", projects: ["Base Conhecimento", "Central de Logs"] },
      { name: "Kafka + Spark", projects: ["Detector Fraudes"] },
      { name: "RabbitMQ", projects: ["CodeReview AI"] },
      { name: "Supabase", projects: ["ConectAgente", "Apontamento de Horas"] },
      { name: "ChromaDB", projects: ["Oficina Chatbot"] },
      { name: "Ollama (LLM local)", projects: ["CodeReview AI", "Oficina Chatbot", "Auditoria Contratos"] },
      { name: "Git", projects: ["Todos"] },
    ],
  },
];
