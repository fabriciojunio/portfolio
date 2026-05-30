import type { VFile } from "../types";

export const profileJson: VFile = {
  path: "/perfil.json",
  name: "perfil.json",
  language: "json",
  content: `{
  "nome": "Fabrício Júnio Alves Dias",
  "idade": 21,
  "cidade": "Bauru, SP",
  "trabalho": {
    "empresa": "Nexum Tecnologia",
    "cargo": "Analista de Sistemas Júnior",
    "desde": "2026",
    "antes": "Estagiário de Desenvolvimento (2025–2026)"
  },
  "formacao": {
    "graduacao": "Ciência da Computação — UNISAGRADO",
    "incubadora": "Saruê — UNESP Bauru"
  },
  "linguagens": ["Português", "Inglês (técnico)"],
  "stack_principal": {
    "back": ["Java + Spring Boot", "Node + NestJS", "FastAPI", "Laravel"],
    "front": ["React / Next.js", "React Native + Expo", "TypeScript"],
    "dados": ["PostgreSQL", "Redis", "Supabase", "SQLite (WAL+FTS)"],
    "ml":    ["scikit-learn", "XGBoost", "PyTorch", "FinBERT", "Ollama (local)"],
    "infra": ["Docker", "GitHub Actions", "Nginx", "Vercel"]
  },
  "valores": [
    "Clean Architecture só onde faz sentido",
    "Testes onde dão retorno (não 100% cosmético)",
    "Segurança como default, não como camada extra",
    "Português no produto, inglês no código"
  ],
  "trabalho_remoto": true,
  "aberto_a": ["CLT", "PJ", "freelancer técnico"],
  "contato": {
    "email": "fabriciojadias@gmail.com",
    "github": "https://github.com/fabriciojunio",
    "linkedin": "https://linkedin.com/in/fabríciojúnio"
  }
}
`,
};
