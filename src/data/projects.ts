import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "apontamento-horas",
    name: "Apontamento de Horas",
    shortDesc: "Sistema de registro de horas com relatórios Excel por dia, semana e mês.",
    longDesc:
      "Sistema web para registrar e gerenciar horas de trabalho por cooperativa/cliente. Dashboard com estatísticas, filtros avançados, exportação de relatórios Excel com 4 abas (detalhes, por dia, por semana, por mês) e detecção inteligente de tipo de trabalho via IA local.",
    category: "full-stack",
    tags: ["Next.js", "IA Local"],
    tagColor: "#06b6d4",
    dotColor: "#22d3ee",
    metrics: [
      { value: "Excel", label: "4 abas", color: "#06b6d4" },
      { value: "IA", label: "detecção tipo", color: "#4ade80" },
      { value: "Zod", label: "validação", color: "#f59e0b" },
      { value: "Vitest", label: "testes", color: "#818cf8" },
    ],
    features: [
      "CRUD de registros de horas com gestão de clientes (cooperativas)",
      "Exportação Excel com 4 abas: detalhes, por dia, por semana e por mês",
      "Detecção inteligente de tipo de trabalho via IA local (Ollama)",
      "Dashboard com estatísticas: horas na semana, no mês, pendentes e lançados",
      "Filtros por status, cliente e período de datas",
      "Segurança: CSP headers, HSTS, rate limiting e validação Zod",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Next.js 14 │───▶│  API Routes  │───▶│  PostgreSQL │
│  Tailwind   │    │  Prisma ORM  │    │  Supabase   │
└─────────────┘    └──────┬───────┘    └─────────────┘
                          │
                   ┌──────▼───────┐    ┌─────────────┐
                   │  Zod + xlsx  │    │  Ollama IA  │
                   │  Validation  │    │  Detecção   │
                   └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Next.js 14", color: "#a78bfa" },
      { name: "TypeScript", color: "#06b6d4" },
      { name: "Tailwind", color: "#4ade80" },
      { name: "Prisma", color: "#f59e0b" },
      { name: "PostgreSQL", color: "#38bdf8" },
      { name: "Zod", color: "#818cf8" },
      { name: "xlsx", color: "#f472b6" },
      { name: "Vitest", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/apontamento-horas",
    demo: "https://apontamento-horas.vercel.app",
    filters: ["full-stack", "javascript"],
  },
  {
    id: "codereview-ai",
    name: "CodeReview AI",
    shortDesc: "Plataforma de code review automatizado com LLM local (Ollama) — detecta bugs, code smells e violações SOLID.",
    longDesc:
      "Plataforma que analisa código Java, Python e JavaScript usando LLM local via Ollama. Detecta bugs, code smells, violações SOLID e atribui score de qualidade 0-100 com processamento assíncrono via RabbitMQ e cache Redis de 24h.",
    category: "full-stack",
    tags: ["Java", "IA Local"],
    tagColor: "#f59e0b",
    dotColor: "#f59e0b",
    metrics: [
      { value: "3", label: "linguagens", color: "#f59e0b" },
      { value: "0-100", label: "score", color: "#4ade80" },
      { value: "SSE", label: "streaming", color: "#818cf8" },
      { value: "24h", label: "cache", color: "#06b6d4" },
    ],
    features: [
      "Submissão de código via texto, upload de arquivo ou URL do GitHub",
      "Fila de processamento assíncrona com RabbitMQ e ticket ID",
      "Análise estruturada: bugs, code smells, violações SOLID, score 0-100",
      "Streaming de análise em tempo real via Server-Sent Events (SSE)",
      "Cache Redis de 24h — mesmo código retorna resultado instantâneo",
      "JWT auth + rate limiting (20 reviews/hora) + métricas Prometheus",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Submit     │───▶│ Spring Boot  │───▶│  RabbitMQ   │
│  Code       │    │  Java 21     │    │  Queue      │
└─────────────┘    └──────┬───────┘    └──────┬──────┘
                          │                    │
┌─────────────┐    ┌──────▼───────┐    ┌──────▼──────┐
│  SSE        │◀───│  Redis       │◀───│  Ollama     │
│  Streaming  │    │  Cache 24h   │    │  LLM Local  │
└─────────────┘    └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Java 21", color: "#f59e0b" },
      { name: "Spring Boot", color: "#4ade80" },
      { name: "Ollama", color: "#818cf8" },
      { name: "RabbitMQ", color: "#06b6d4" },
      { name: "Redis", color: "#f472b6" },
      { name: "PostgreSQL", color: "#38bdf8" },
      { name: "Docker", color: "#a78bfa" },
      { name: "Prometheus", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/codereview-ai",
    demo: null,
    filters: ["full-stack", "java"],
  },
  {
    id: "conectagente",
    name: "ConectAgente",
    shortDesc: "App mobile offline-first para Agentes Comunitários de Saúde (ACS/SUS).",
    longDesc:
      "App mobile para Agentes de Saúde do SUS com arquitetura offline-first. Coleta dados em campo sem internet com SQLite local, sincroniza automaticamente com Supabase ao reconectar. 5 módulos clínicos por morador, metas mensais, exportação Excel e audit log LGPD.",
    category: "mobile",
    tags: ["React Native", "Offline-First"],
    tagColor: "#4ade80",
    dotColor: "#4ade80",
    metrics: [
      { value: "Offline", label: "first", color: "#4ade80" },
      { value: "5", label: "módulos clínicos", color: "#818cf8" },
      { value: "SQLite", label: "local DB", color: "#f59e0b" },
      { value: "LGPD", label: "audit log", color: "#06b6d4" },
    ],
    features: [
      "Área Agente: dashboard, residências, moradores, fichas clínicas (5 módulos), visitas com sinais vitais",
      "Área Admin: 7 indicadores globais, top 3 agentes, gestão de residências, estatísticas",
      "Arquitetura offline-first com SQLite (WAL + FTS) e sync automático com Supabase",
      "Checklist de medicamentos/vacinas, encaminhamentos, calendário de visitas",
      "Metas mensais por agente com acompanhamento de progresso",
      "Exportação CSV/Excel e audit log LGPD compliant",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Expo SDK   │───▶│  expo-sqlite │───▶│  Supabase   │
│  React Nav  │    │  WAL + FTS   │    │  PostgreSQL │
└──────┬──────┘    └──────────────┘    └──────┬──────┘
       │                                      │
┌──────▼──────┐    ┌──────────────┐    ┌──────▼──────┐
│  React Hook │    │  expo-crypto │    │  RLS +      │
│  Form + Zod │    │  SHA-256     │    │  Sync Auto  │
└─────────────┘    └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "React Native", color: "#06b6d4" },
      { name: "Expo SDK 54", color: "#4ade80" },
      { name: "TypeScript", color: "#f59e0b" },
      { name: "SQLite", color: "#818cf8" },
      { name: "Supabase", color: "#38bdf8" },
      { name: "Zod", color: "#f472b6" },
      { name: "Jest", color: "#a78bfa" },
      { name: "expo-router", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/ConectAgente",
    demo: "https://conectagente-web.vercel.app",
    filters: ["mobile", "javascript"],
  },
  {
    id: "jis",
    name: "JIS — Sistema de Vagas IA",
    shortDesc: "Coleta, pontua e notifica as melhores vagas de emprego via Telegram com Machine Learning.",
    longDesc:
      "Sistema inteligente que coleta vagas do Gupy, GeekHunter e Programathor, aplica motor de score com regras + RandomForest e envia as melhores oportunidades às 19h via Telegram. Dashboard Next.js com histórico, métricas e painel de configuração.",
    category: "full-stack",
    tags: ["Java", "ML", "Telegram Bot"],
    tagColor: "#818cf8",
    dotColor: "#818cf8",
    metrics: [
      { value: "3", label: "fontes de vagas", color: "#818cf8" },
      { value: "ML", label: "RandomForest", color: "#4ade80" },
      { value: "19h", label: "notificação", color: "#f59e0b" },
      { value: "Telegram", label: "bot", color: "#06b6d4" },
    ],
    features: [
      "Coleta automatizada de vagas: Gupy, GeekHunter, Programathor",
      "Motor de score híbrido: regras com pesos + modelo RandomForest Python",
      "Notificação diária às 19h com as melhores vagas via Telegram Bot",
      "Dashboard Next.js 15 com histórico, filtros, métricas de acurácia",
      "Backend Spring Boot com agendador, API REST e banco PostgreSQL",
      "Serviço ML Python (FastAPI + scikit-learn) para scoring preditivo",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Gupy +     │───▶│ Spring Boot  │───▶│  FastAPI    │
│  GeekHunter │    │  Scraping    │    │  ML Score   │
└─────────────┘    └──────┬───────┘    └──────┬──────┘
                          │                    │
┌─────────────┐    ┌──────▼───────┐    ┌──────▼──────┐
│  Telegram   │◀───│  PostgreSQL  │◀───│  Random     │
│  Bot        │    │  + Dashboard │    │  Forest     │
└─────────────┘    └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Java 21", color: "#f59e0b" },
      { name: "Spring Boot", color: "#4ade80" },
      { name: "Next.js 15", color: "#a78bfa" },
      { name: "Python", color: "#818cf8" },
      { name: "FastAPI", color: "#06b6d4" },
      { name: "scikit-learn", color: "#f472b6" },
      { name: "PostgreSQL", color: "#38bdf8" },
      { name: "Docker", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/jis",
    demo: "https://jis-frontend-mocha.vercel.app",
    filters: ["full-stack", "java", "python", "javascript"],
  },
  {
    id: "koracrm",
    name: "KoraCRM",
    shortDesc: "CRM completo com pipeline de vendas, gestão de clientes e dashboard analítico.",
    longDesc:
      "CRM (Customer Relationship Management) com pipeline de vendas Kanban, gestão de contatos, tarefas, histórico de interações e dashboard com métricas de conversão. Backend Laravel 11 com API RESTful e autenticação Sanctum, frontend React/Vite.",
    category: "full-stack",
    tags: ["Laravel", "CRM"],
    tagColor: "#f472b6",
    dotColor: "#f472b6",
    metrics: [
      { value: "Kanban", label: "pipeline", color: "#f472b6" },
      { value: "REST", label: "API Laravel", color: "#4ade80" },
      { value: "Sanctum", label: "auth", color: "#f59e0b" },
      { value: "Vitest", label: "testes", color: "#818cf8" },
    ],
    features: [
      "Pipeline de vendas Kanban com drag-and-drop de deals por estágio",
      "Gestão de contatos e empresas com histórico de interações",
      "Dashboard analítico: taxa de conversão, receita por estágio, atividades",
      "Backend Laravel 11 com API RESTful, Sanctum auth e Swagger docs",
      "Integração AWS S3 para upload de anexos e Redis para cache",
      "Testes com Pest (PHP) e Vitest (frontend), PHPStan para análise estática",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  React 18   │───▶│  Laravel 11  │───▶│  PostgreSQL │
│  Vite       │    │  API REST    │    │  MySQL      │
└─────────────┘    └──────┬───────┘    └─────────────┘
                          │
                   ┌──────▼───────┐    ┌─────────────┐
                   │  Sanctum     │    │  Redis +    │
                   │  Auth + RLS  │    │  AWS S3     │
                   └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Laravel 11", color: "#f472b6" },
      { name: "PHP 8.2", color: "#818cf8" },
      { name: "React 18", color: "#06b6d4" },
      { name: "TypeScript", color: "#f59e0b" },
      { name: "Sanctum", color: "#4ade80" },
      { name: "PostgreSQL", color: "#38bdf8" },
      { name: "Redis", color: "#a78bfa" },
      { name: "AWS S3", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/KoraCRM",
    demo: "https://koracrm-frontend.vercel.app",
    filters: ["full-stack", "javascript"],
  },
  {
    id: "mycondpets",
    name: "MyCondPets",
    shortDesc: "Gestão de pets em condomínios com login Google, mural e painel admin.",
    longDesc:
      "Plataforma para condomínios residenciais gerenciarem pets. Login via Google OAuth, cadastro de tutores e pets com foto, mural de comunicados (perdidos/achados), dashboard admin com estatísticas. Backend com Next.js API Routes e banco Supabase/PostgreSQL.",
    category: "full-stack",
    tags: ["Next.js", "OAuth"],
    tagColor: "#a78bfa",
    dotColor: "#a78bfa",
    metrics: [
      { value: "OAuth", label: "Google", color: "#a78bfa" },
      { value: "Admin", label: "dashboard", color: "#4ade80" },
      { value: "Jest", label: "testes", color: "#f59e0b" },
      { value: "CRUD", label: "completo", color: "#06b6d4" },
    ],
    features: [
      "Login via Google OAuth com NextAuth.js v5",
      "Cadastro de tutores com dados de contato e apartamento",
      "Registro de pets: nome, espécie, raça, nascimento, cor, porte, sexo, foto",
      "Mural de comunicados para alertas de perdidos/achados",
      "Dashboard admin com stats: total pets, perdidos, tutores, apartamentos",
      "Testes com Jest + Testing Library, banco Supabase PostgreSQL",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Next.js 15 │───▶│  API Routes  │───▶│  PostgreSQL │
│  React 19   │    │  NextAuth v5 │    │  Supabase   │
└──────┬──────┘    └──────────────┘    └─────────────┘
       │
┌──────▼──────┐    ┌──────────────┐
│  Google     │    │  Jest +      │
│  OAuth      │    │  Testing Lib │
└─────────────┘    └──────────────┘`,
    techStack: [
      { name: "Next.js 15", color: "#a78bfa" },
      { name: "React 19", color: "#06b6d4" },
      { name: "TypeScript", color: "#f59e0b" },
      { name: "NextAuth.js", color: "#4ade80" },
      { name: "PostgreSQL", color: "#38bdf8" },
      { name: "Supabase", color: "#818cf8" },
      { name: "Jest", color: "#f472b6" },
      { name: "Tailwind", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/MyCondPets",
    demo: "https://mycondpets.vercel.app",
    filters: ["full-stack", "javascript"],
  },
  {
    id: "paiol-tech",
    name: "Paiol Tech",
    shortDesc: "SaaS de gestão de dívidas rurais com login sem senha, alertas WhatsApp e Open Finance.",
    longDesc:
      "SaaS para produtores rurais brasileiros gerenciarem dívidas. Login sem senha (magic link), alertas via WhatsApp, integração Open Finance, arquitetura offline-first com PWA. Monorepo Turborepo com frontend Next.js 15 e backend NestJS em Clean Architecture + CQRS.",
    category: "full-stack",
    tags: ["NestJS", "SaaS", "Monorepo"],
    tagColor: "#f59e0b",
    dotColor: "#f59e0b",
    metrics: [
      { value: "Turbo", label: "monorepo", color: "#f59e0b" },
      { value: "PWA", label: "offline-first", color: "#4ade80" },
      { value: "CQRS", label: "arquitetura", color: "#818cf8" },
      { value: "WA", label: "alertas", color: "#06b6d4" },
    ],
    features: [
      "Login sem senha via magic link com OTP (Redis session)",
      "Alertas proativos no WhatsApp para vencimentos de dívidas",
      "Integração Open Finance para importação automática de dados bancários",
      "Monorepo Turborepo + pnpm workspaces: apps/web, apps/api, packages/*",
      "Backend NestJS com Clean Architecture, CQRS e Domain Events",
      "Frontend Next.js 15 PWA offline-first com shadcn/ui e Tailwind",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Next.js 15 │───▶│  NestJS API  │───▶│  PostgreSQL │
│  PWA + shadcn│   │  CQRS+DDD   │    │  Supabase   │
└─────────────┘    └──────┬───────┘    └─────────────┘
                          │
                   ┌──────▼───────┐    ┌─────────────┐
                   │  Redis       │    │  WhatsApp + │
                   │  OTP Session │    │  Open Finance│
                   └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Next.js 15", color: "#a78bfa" },
      { name: "NestJS", color: "#f472b6" },
      { name: "TypeScript", color: "#06b6d4" },
      { name: "Turborepo", color: "#f59e0b" },
      { name: "PostgreSQL", color: "#38bdf8" },
      { name: "Prisma", color: "#4ade80" },
      { name: "Redis", color: "#818cf8" },
      { name: "shadcn/ui", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/paiol-tech",
    demo: "https://paiol-tech.vercel.app",
    filters: ["full-stack", "javascript"],
  },
  {
    id: "goldata",
    name: "GolData",
    shortDesc: "Plataforma de analytics de futebol com Machine Learning, xG e métricas avançadas via FastAPI.",
    longDesc:
      "Plataforma completa de análise de futebol com Machine Learning. Calcula Expected Goals (xG), esperados xA, métricas de pressão e análise de rede de passes. Serve dados do Brasileirão e competições europeias via FastAPI com autenticação JWT, rate limiting e cache inteligente.",
    category: "data-science",
    tags: ["Python", "ML", "Futebol"],
    tagColor: "#4ade80",
    dotColor: "#4ade80",
    metrics: [
      { value: "xG", label: "expected goals", color: "#4ade80" },
      { value: "ML", label: "XGBoost", color: "#818cf8" },
      { value: "FastAPI", label: "REST API", color: "#06b6d4" },
      { value: "Docker", label: "containerizado", color: "#f59e0b" },
    ],
    features: [
      "Modelo de Expected Goals (xG) com XGBoost e features de posição, ângulo e pressão",
      "Expected Assists (xA) e métricas de progressão de bola (PPDA, passes progressivos)",
      "Análise de rede de passes com NetworkX: centralidade, fluidez, hubs de criação",
      "API REST FastAPI com JWT auth, rate limiting (SlowAPI) e cache por partida",
      "Dados do Brasileirão Série A e competições europeias com coleta automatizada",
      "Dashboard de relatórios com Plotly e Seaborn, exportação CSV/JSON",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  FastAPI    │───▶│  ML Models   │───▶│  SQLAlchemy │
│  JWT + Rate │    │  XGBoost/xG  │    │  SQLite/PG  │
└─────────────┘    └──────┬───────┘    └─────────────┘
                          │
                   ┌──────▼───────┐    ┌─────────────┐
                   │  NetworkX    │    │  Plotly +   │
                   │  Passes Net  │    │  Seaborn    │
                   └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Python", color: "#818cf8" },
      { name: "FastAPI", color: "#4ade80" },
      { name: "XGBoost", color: "#f472b6" },
      { name: "scikit-learn", color: "#a78bfa" },
      { name: "NetworkX", color: "#06b6d4" },
      { name: "SQLAlchemy", color: "#38bdf8" },
      { name: "Docker", color: "#f59e0b" },
      { name: "Plotly", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/goldata",
    demo: null,
    filters: ["data-science", "python"],
  },
  {
    id: "quantbot-ml",
    name: "Quantbot ML",
    shortDesc: "Sistema de trading quantitativo com ML, sentimento FinBERT e gestão de risco Monte Carlo.",
    longDesc:
      "Sistema de trading combinando ensemble de 3 modelos de ML (Random Forest, XGBoost, Gradient Boosting), análise de sentimento financeiro com FinBERT (PyTorch), detecção de regime de mercado (4 regimes) e gestão de risco com simulações Monte Carlo. Dashboard React com 8 abas.",
    category: "data-science",
    tags: ["Python", "FinTech", "IA"],
    tagColor: "#818cf8",
    dotColor: "#818cf8",
    metrics: [
      { value: "3", label: "modelos ML", color: "#818cf8" },
      { value: "4", label: "regimes mercado", color: "#4ade80" },
      { value: "FinBERT", label: "sentimento", color: "#f59e0b" },
      { value: "B3+US", label: "mercados", color: "#06b6d4" },
    ],
    features: [
      "Ensemble: Random Forest + XGBoost + Gradient Boosting com voting ponderado",
      "Análise de sentimento financeiro com FinBERT (PyTorch) em notícias",
      "Walk-Forward Validation com TimeSeriesSplit para evitar data leakage",
      "Detecção de regime de mercado (bull/bear × low/high vol) com HMM",
      "Gestão de risco: Value at Risk, Expected Shortfall, Monte Carlo (10K simulações)",
      "Dashboard React 18 com 8 abas: Overview, Performance, ML Signals, Paper Trading, Risk...",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  React 18   │───▶│   FastAPI    │───▶│  Ensemble   │
│  Dashboard  │    │   REST API   │    │  3 Models   │
└─────────────┘    └──────┬───────┘    └──────┬──────┘
                          │                    │
┌─────────────┐    ┌──────▼───────┐    ┌──────▼──────┐
│  FinBERT    │◀───│  Risk Mgmt   │◀───│  Regime     │
│  Sentimento │    │  Monte Carlo │    │  Detection  │
└─────────────┘    └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Python", color: "#818cf8" },
      { name: "FastAPI", color: "#4ade80" },
      { name: "PyTorch", color: "#f59e0b" },
      { name: "XGBoost", color: "#f472b6" },
      { name: "scikit-learn", color: "#a78bfa" },
      { name: "React 18", color: "#06b6d4" },
      { name: "yfinance", color: "#38bdf8" },
      { name: "FinBERT", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/quantbot-ml",
    demo: null,
    filters: ["data-science", "python", "javascript"],
  },
  {
    id: "goldata-pro",
    name: "GolData — Robô de Sinais",
    shortDesc: "Plataforma de sinais de value bets com ML, Bot Telegram e site público auditável por hash SHA-256.",
    longDesc:
      "Plataforma completa de sinais de apostas esportivas com motor ML ensemble (Dixon-Coles + Elo, 60/40). Detecta value bets com edge > 4% e calcula stake via critério de Kelly fracionário. Bot Telegram publica picks com links de afiliado. Site público exibe histórico auditável por hash SHA-256. Backend FastAPI em Clean Architecture, JWT, LGPD-compliant e containerizado com Docker.",
    category: "full-stack",
    tags: ["FastAPI", "ML", "Telegram Bot"],
    tagColor: "#4ade80",
    dotColor: "#4ade80",
    metrics: [
      { value: "Dixon-Coles", label: "+ Elo ML", color: "#4ade80" },
      { value: "Kelly", label: "gestão de risco", color: "#818cf8" },
      { value: "SHA-256", label: "auditável", color: "#06b6d4" },
      { value: "Docker", label: "produção", color: "#f59e0b" },
    ],
    features: [
      "Motor ML ensemble Dixon-Coles + Elo (60/40) com ValueBetDetector e Kelly fracionário (1/4)",
      "Detecta value bets: edge > 4%, confiança > 52%, mínimo 2 estrelas de qualidade",
      "Bot Telegram publica picks com xG, Elo, odds e botões inline de casas de aposta",
      "Site público Next.js: picks do dia (sem odds) e histórico com hash SHA-256 auditável",
      "Feedback loop: ajusta MIN_EDGE automaticamente com base em ROI e win_rate acumulados",
      "Segurança: JWT, rate limiting, LGPD, robots.txt anti-bots, containers non-root (UID 1001)",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Next.js 14 │───▶│   FastAPI    │───▶│  PostgreSQL │
│  Site Público│   │  Python 3.12 │    │  Redis 7    │
└─────────────┘    └──────┬───────┘    └─────────────┘
                          │
                   ┌──────▼───────┐    ┌─────────────┐
                   │  Dixon-Coles │    │  Telegram   │
                   │  + Elo+Kelly │    │  Bot        │
                   └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Python 3.12", color: "#818cf8" },
      { name: "FastAPI", color: "#4ade80" },
      { name: "Next.js 14", color: "#a78bfa" },
      { name: "scikit-learn", color: "#f472b6" },
      { name: "PostgreSQL", color: "#38bdf8" },
      { name: "Redis", color: "#f59e0b" },
      { name: "Docker", color: "#06b6d4" },
      { name: "Nginx", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/bot-sinais",
    demo: null,
    filters: ["full-stack", "python", "data-science"],
  },
  {
    id: "mente-viva",
    name: "Mente Viva",
    shortDesc: "App de exercícios cognitivos gratuitos para prevenção do Alzheimer — 7 jogos, timers e progresso.",
    longDesc:
      "App React Native para treino cognitivo diário, desenvolvido para auxiliar na prevenção do Alzheimer. 7 mini-jogos (Memória, Rapidez, Sequência, Cores/Stroop, Contas, Palavras e Caça-Palavras) com timers, scoring, streaks e histórico. APK gerado via GitHub Actions sem necessidade de conta Expo.",
    category: "mobile",
    tags: ["React Native", "Expo"],
    tagColor: "#a78bfa",
    dotColor: "#a78bfa",
    metrics: [
      { value: "7", label: "mini-jogos", color: "#a78bfa" },
      { value: "APK", label: "Android nativo", color: "#4ade80" },
      { value: "CI/CD", label: "GitHub Actions", color: "#06b6d4" },
      { value: "Offline", label: "sem internet", color: "#f59e0b" },
    ],
    features: [
      "7 mini-jogos cognitivos: Memória, Rapidez, Sequência, Stroop, Contas, Palavras e Caça-Palavras",
      "Timer e scoring por nível com barra de progresso e pontuação em tempo real",
      "Histórico de partidas, streaks diários e recorde pessoal por jogo",
      "Caça-Palavras com seleção por arrasto (PanResponder) e grades temáticas aleatórias",
      "APK Android gerado automaticamente via GitHub Actions sem conta Expo",
      "Modo escuro permanente com tema violeta profundo e gradiente violet→rose",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│ React Native│───▶│  gameEngine  │───▶│ AsyncStorage│
│  Expo SDK 50│    │  puro, 0 UI  │    │  (perfil)   │
└─────────────┘    └──────────────┘    └─────────────┘
                          │
                   ┌──────▼───────┐    ┌─────────────┐
                   │  PanResponder│    │  GitHub     │
                   │  gesto drag  │    │  Actions APK│
                   └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "React Native", color: "#06b6d4" },
      { name: "Expo SDK 50", color: "#a78bfa" },
      { name: "JavaScript", color: "#f59e0b" },
      { name: "AsyncStorage", color: "#4ade80" },
      { name: "PanResponder", color: "#f472b6" },
      { name: "React Navigation", color: "#38bdf8" },
      { name: "GitHub Actions", color: "#818cf8" },
      { name: "Hermes", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/mente-viva",
    demo: null,
    filters: ["mobile", "javascript"],
  },
  {
    id: "mundo-do-lukinha",
    name: "Mundo do Lukinha",
    shortDesc: "Plataforma educativa com 6 jogos para crianças de 3 a 14 anos — adaptação automática por faixa etária.",
    longDesc:
      "Ecossistema de jogos educativos para ensinar matemática, português, ciências e programação de forma divertida e não punitiva. 6 jogos incluídos: Batalha dos Números, Jogo da Memória, Caça-Palavras, Dino Runner, Laboratório de Cores e Quiz Aventura. 4 faixas etárias (3-14 anos) com adaptação automática de dificuldade. Monorepo pnpm com Next.js 14.",
    category: "full-stack",
    tags: ["Next.js", "EdTech"],
    tagColor: "#fb923c",
    dotColor: "#fb923c",
    metrics: [
      { value: "6", label: "jogos educativos", color: "#fb923c" },
      { value: "3–14", label: "anos", color: "#4ade80" },
      { value: "4", label: "faixas etárias", color: "#818cf8" },
      { value: "pnpm", label: "monorepo", color: "#06b6d4" },
    ],
    features: [
      "6 jogos: Batalha dos Números, Memória, Caça-Palavras, Dino Runner, Laboratório de Cores, Quiz Aventura",
      "4 faixas etárias: Pintinho (3-5), Explorador (6-8), Aventureiro (9-11), Mestre (12-14)",
      "Adaptação automática de dificuldade e conteúdo por faixa etária",
      "Filosofia não punitiva: sempre encorajador, nunca penaliza o erro",
      "Monorepo pnpm workspaces com Next.js 14, TypeScript strict e Zustand",
      "Testes com Vitest + React Testing Library, zero custo de infraestrutura",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Next.js 14 │───▶│  Zustand     │───▶│ Game Engine │
│  App Router │    │  State Mgmt  │    │  TypeScript │
└─────────────┘    └──────────────┘    └──────┬──────┘
                                              │
                   ┌──────────────┐    ┌──────▼──────┐
                   │  Vitest +    │    │  Faixas     │
                   │  Testing Lib │    │  3-14 anos  │
                   └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Next.js 14", color: "#a78bfa" },
      { name: "TypeScript", color: "#06b6d4" },
      { name: "Tailwind", color: "#4ade80" },
      { name: "Zustand", color: "#f59e0b" },
      { name: "Vitest", color: "#818cf8" },
      { name: "React Testing Library", color: "#f472b6" },
      { name: "pnpm", color: "#38bdf8" },
      { name: "App Router", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/mundo-do-lukinha",
    demo: "https://mundo-do-lukinha.vercel.app",
    filters: ["full-stack", "javascript"],
  },
];
