import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "quantbot-ml",
    name: "QuantBot ML",
    shortDesc: "Trading quantitativo com IA. Ensemble ML + FinBERT.",
    longDesc:
      "Sistema de trading quantitativo com IA que analisa mercado financeiro e gera sinais automatizados de compra e venda usando ensemble de modelos e análise de sentimento.",
    category: "data-science",
    tags: ["Data Science", "Open Source"],
    tagColor: "#4ade80",
    dotColor: "#4ade80",
    metrics: [
      { value: "13K+", label: "linhas", color: "#4ade80" },
      { value: "233", label: "testes", color: "#818cf8" },
      { value: "3", label: "modelos ml", color: "#f59e0b" },
      { value: "3", label: "mercados", color: "#06b6d4" },
    ],
    features: [
      "Ensemble de Random Forest, XGBoost e Gradient Boosting pra gerar sinais de trading",
      "Análise de sentimento de notícias financeiras com FinBERT (NLP)",
      "Walk-Forward Validation pra garantir resultados confiáveis",
      "Gestão de risco com Monte Carlo e stop-loss dinâmico baseado em ATR",
      "Dashboard interativo em React + API FastAPI servindo dados em tempo real",
      "Criptografia AES-256 e conformidade com LGPD",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  React UI   │───▶│   FastAPI    │───▶│  ML Engine  │
│  Dashboard  │    │   REST API   │    │  Ensemble   │
└─────────────┘    └──────┬───────┘    └─────────────┘
                          │
                   ┌──────▼───────┐    ┌─────────────┐
                   │  PostgreSQL  │    │   FinBERT   │
                   │   Database   │    │  Sentiment  │
                   └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Python", color: "#818cf8" },
      { name: "FastAPI", color: "#f59e0b" },
      { name: "React", color: "#06b6d4" },
      { name: "Scikit-learn", color: "#4ade80" },
      { name: "XGBoost", color: "#f472b6" },
      { name: "FinBERT", color: "#a78bfa" },
      { name: "Pandas", color: "#fb923c" },
      { name: "PostgreSQL", color: "#38bdf8" },
    ],
    github: "https://github.com/fabriciojunio/quantbot-ml",
    demo: null,
    filters: ["data-science", "python"],
  },
  {
    id: "datapulse",
    name: "DataPulse",
    shortDesc: "Pipeline de ML end-to-end pra churn prediction com explicabilidade.",
    longDesc:
      "Pipeline completo de Data Science: ingestão, EDA, feature engineering, treinamento de 5 modelos, seleção automática, explicabilidade com SHAP e dashboard de monitoramento.",
    category: "data-science",
    tags: ["Data Science", "MLOps"],
    tagColor: "#818cf8",
    dotColor: "#818cf8",
    metrics: [
      { value: "5", label: "modelos", color: "#818cf8" },
      { value: "50K", label: "registros", color: "#4ade80" },
      { value: "25", label: "features", color: "#f59e0b" },
      { value: "95%+", label: "auc-roc", color: "#06b6d4" },
    ],
    features: [
      "Treinamento e comparação de 5 modelos: Logistic Regression, Random Forest, XGBoost, LightGBM, CatBoost",
      "Feature engineering com custom transformers no Scikit-learn Pipeline",
      "Hyperparameter tuning com Optuna (100 trials por modelo)",
      "Explicabilidade com SHAP values e LIME pra cada predição",
      "Dashboard Streamlit com EDA interativa e monitoramento de drift",
      "Tracking de experimentos com MLflow",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Raw Data   │───▶│  Pipeline    │───▶│  5 Models   │
│  50K rows   │    │  Transform   │    │  Optuna     │
└─────────────┘    └──────────────┘    └──────┬──────┘
                                              │
┌─────────────┐    ┌──────────────┐    ┌──────▼──────┐
│  Streamlit  │◀───│   FastAPI    │◀───│   SHAP +    │
│  Dashboard  │    │  Predict API │    │   MLflow    │
└─────────────┘    └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Python", color: "#818cf8" },
      { name: "Scikit-learn", color: "#4ade80" },
      { name: "XGBoost", color: "#f472b6" },
      { name: "LightGBM", color: "#06b6d4" },
      { name: "SHAP", color: "#f59e0b" },
      { name: "MLflow", color: "#a78bfa" },
      { name: "Streamlit", color: "#fb923c" },
      { name: "FastAPI", color: "#38bdf8" },
    ],
    github: "https://github.com/fabriciojunio/datapulse",
    demo: null,
    filters: ["data-science", "python"],
  },
  {
    id: "sentinelcv",
    name: "SentinelCV",
    shortDesc: "Análise inteligente de currículos com NLP e similaridade semântica.",
    longDesc:
      "Plataforma que recebe currículos em PDF, extrai o texto, analisa com NLP e pontua contra descrições de vagas usando similaridade semântica com sentence-transformers.",
    category: "full-stack",
    tags: ["Java", "ML", "Microsserviços"],
    tagColor: "#f59e0b",
    dotColor: "#f59e0b",
    metrics: [
      { value: "2", label: "serviços", color: "#f59e0b" },
      { value: "JWT", label: "auth", color: "#4ade80" },
      { value: "LGPD", label: "compliant", color: "#818cf8" },
      { value: "80%+", label: "cobertura", color: "#06b6d4" },
    ],
    features: [
      "Backend Java/Spring Boot com CRUD de vagas, upload de PDF e histórico de análises",
      "Serviço Python/FastAPI com spaCy e sentence-transformers pra análise semântica",
      "Score de compatibilidade 0-100 com breakdown por categoria",
      "Extração de entidades (skills, empresas, cargos) com NER do spaCy",
      "Spring Security com JWT, rate limiting e LGPD compliance",
      "Docker Compose orquestrando ambos os serviços",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Upload     │───▶│ Spring Boot  │───▶│  FastAPI    │
│  PDF        │    │  Java 21     │    │  NLP Engine │
└─────────────┘    └──────┬───────┘    └──────┬──────┘
                          │                    │
                   ┌──────▼───────┐    ┌──────▼──────┐
                   │  PostgreSQL  │    │  spaCy +    │
                   │  + Audit Log │    │  Sentence   │
                   └──────────────┘    │  Transform. │
                                       └─────────────┘`,
    techStack: [
      { name: "Java 21", color: "#f59e0b" },
      { name: "Spring Boot", color: "#4ade80" },
      { name: "Python", color: "#818cf8" },
      { name: "FastAPI", color: "#06b6d4" },
      { name: "spaCy", color: "#f472b6" },
      { name: "PostgreSQL", color: "#38bdf8" },
      { name: "Docker", color: "#a78bfa" },
      { name: "JWT", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/sentinelcv",
    demo: null,
    filters: ["full-stack", "java", "python"],
  },
  {
    id: "codereview-ai",
    name: "CodeReview AI",
    shortDesc: "Code review automatizado com LLM local via Ollama.",
    longDesc:
      "Plataforma que recebe código-fonte, envia pra LLM rodando localmente e retorna análise de bugs, code smells, violações SOLID e sugestões de refatoração com score de qualidade.",
    category: "full-stack",
    tags: ["Java", "IA Generativa"],
    tagColor: "#f472b6",
    dotColor: "#f472b6",
    metrics: [
      { value: "3", label: "linguagens", color: "#f472b6" },
      { value: "LLM", label: "local", color: "#4ade80" },
      { value: "SSE", label: "streaming", color: "#818cf8" },
      { value: "Queue", label: "rabbitmq", color: "#f59e0b" },
    ],
    features: [
      "Submissão de código Java, Python e JavaScript pra review automático",
      "Processamento assíncrono com RabbitMQ (fila de análises)",
      "LLM local via Ollama (sem API externa, tudo roda na máquina)",
      "Streaming de resultados em tempo real com Server-Sent Events",
      "Cache de análises no Redis (mesmo código = mesma resposta por 24h)",
      "Prompt engineering com templates específicos por linguagem",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Submit     │───▶│ Spring Boot  │───▶│  RabbitMQ   │
│  Code       │    │  WebFlux     │    │  Queue      │
└─────────────┘    └──────┬───────┘    └──────┬──────┘
                          │                    │
┌─────────────┐    ┌──────▼───────┐    ┌──────▼──────┐
│  Redis      │◀───│  Consumer    │◀───│   Ollama    │
│  Cache      │    │  Processor   │    │  LLM Local  │
└─────────────┘    └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Java 21", color: "#f59e0b" },
      { name: "Spring Boot", color: "#4ade80" },
      { name: "WebFlux", color: "#818cf8" },
      { name: "RabbitMQ", color: "#fb923c" },
      { name: "Redis", color: "#f472b6" },
      { name: "Ollama", color: "#06b6d4" },
      { name: "PostgreSQL", color: "#38bdf8" },
      { name: "Docker", color: "#a78bfa" },
    ],
    github: "https://github.com/fabriciojunio/codereview-ai",
    demo: null,
    filters: ["full-stack", "java"],
  },
  {
    id: "eventflow",
    name: "EventFlow",
    shortDesc: "Gestão de eventos com ingressos e check-in em tempo real.",
    longDesc:
      "Plataforma onde organizadores criam eventos e lotes de ingressos, participantes compram e fazem check-in via QR Code, com dashboard real-time mostrando lotação e vendas.",
    category: "full-stack",
    tags: ["JavaScript", "Real-time"],
    tagColor: "#06b6d4",
    dotColor: "#06b6d4",
    metrics: [
      { value: "Angular", label: "frontend", color: "#06b6d4" },
      { value: "Node", label: "backend", color: "#4ade80" },
      { value: "RT", label: "socket.io", color: "#818cf8" },
      { value: "NgRx", label: "state mgmt", color: "#f59e0b" },
    ],
    features: [
      "Frontend Angular 18 com NgRx, Material Design e formulários multi-step",
      "Backend Node.js/Express com TypeScript e Prisma ORM",
      "Compra de ingressos com fila BullMQ (evita race condition)",
      "Check-in via QR Code com validação em tempo real",
      "Dashboard do organizador atualizado ao vivo via Socket.IO",
      "LGPD: anonimização de dados 12 meses após evento",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Angular 18 │───▶│  Express.js  │───▶│  PostgreSQL │
│  NgRx       │    │  TypeScript  │    │  Prisma ORM │
└──────┬──────┘    └──────┬───────┘    └─────────────┘
       │                  │
┌──────▼──────┐    ┌──────▼───────┐    ┌─────────────┐
│  Socket.IO  │◀───│  BullMQ      │───▶│   Redis     │
│  Real-time  │    │  Workers     │    │   Queue     │
└─────────────┘    └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Angular 18", color: "#f472b6" },
      { name: "TypeScript", color: "#06b6d4" },
      { name: "Node.js", color: "#4ade80" },
      { name: "Express", color: "#f59e0b" },
      { name: "Socket.IO", color: "#818cf8" },
      { name: "Prisma", color: "#a78bfa" },
      { name: "PostgreSQL", color: "#38bdf8" },
      { name: "Redis", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/eventflow",
    demo: null,
    filters: ["full-stack", "javascript"],
  },
  {
    id: "nexushub",
    name: "NexusHub",
    shortDesc: "Plataforma de conhecimento com recomendação por IA e busca inteligente.",
    longDesc:
      "Sistema onde equipes organizam documentação técnica. IA analisa conteúdo e comportamento de leitura pra recomendar artigos, detectar duplicatas e gerar resumos automáticos.",
    category: "full-stack",
    tags: ["Full Stack", "3 Serviços"],
    tagColor: "#a78bfa",
    dotColor: "#a78bfa",
    metrics: [
      { value: "3", label: "serviços", color: "#a78bfa" },
      { value: "ES", label: "elasticsearch", color: "#4ade80" },
      { value: "ML", label: "recomendação", color: "#f59e0b" },
      { value: "TF-IDF", label: "similaridade", color: "#06b6d4" },
    ],
    features: [
      "Backend Java/Spring Boot com CRUD de artigos, versionamento e tracking de leitura",
      "Busca full-text com Elasticsearch e autocomplete",
      "Sistema de recomendação híbrido (collaborative + content-based) em Python",
      "Detecção de duplicatas com MinHash + LSH",
      "Resumo automático com TextRank (extractive summarization local)",
      "Frontend React 19 com dark/light mode, infinite scroll e Zustand",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  React 19   │───▶│ Spring Boot  │───▶│  FastAPI    │
│  Zustand    │    │  Java 21     │    │  ML Service │
└─────────────┘    └──────┬───────┘    └──────┬──────┘
                          │                    │
┌─────────────┐    ┌──────▼───────┐    ┌──────▼──────┐
│ Elastic     │◀───│  PostgreSQL  │    │  TF-IDF +   │
│ Search      │    │  + Redis     │    │  TextRank   │
└─────────────┘    └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Java 21", color: "#f59e0b" },
      { name: "Spring Boot", color: "#4ade80" },
      { name: "React 19", color: "#06b6d4" },
      { name: "Python", color: "#818cf8" },
      { name: "Elasticsearch", color: "#f472b6" },
      { name: "FastAPI", color: "#a78bfa" },
      { name: "PostgreSQL", color: "#38bdf8" },
      { name: "Redis", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/nexushub",
    demo: null,
    filters: ["full-stack", "java", "python", "javascript"],
  },
  {
    id: "conectagente",
    name: "ConectAgente",
    shortDesc: "App mobile pra agentes de saúde. Offline-first. Incubado na UNESP.",
    longDesc:
      "App mobile para agentes comunitários de saúde com arquitetura offline-first. Funciona em áreas com internet limitada. Incubado na Saruê Incubadora da UNESP Bauru.",
    category: "full-stack",
    tags: ["Mobile", "Incubadora"],
    tagColor: "#fb923c",
    dotColor: "#fb923c",
    metrics: [
      { value: "Offline", label: "first", color: "#fb923c" },
      { value: "Saruê", label: "incubadora", color: "#4ade80" },
      { value: "SQLite", label: "local db", color: "#818cf8" },
      { value: "Sync", label: "supabase", color: "#06b6d4" },
    ],
    features: [
      "Arquitetura offline-first com expo-sqlite pra funcionar sem internet",
      "Sincronização automática com Supabase quando volta a conexão",
      "Originado de pesquisa de iniciação científica na UNESP",
      "Incubado na Saruê Incubadora (UNESP Bauru)",
      "Participação no Programa Ignite (Wadhwani Foundation)",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  React      │───▶│  expo-sqlite │───▶│  Supabase   │
│  Native     │    │  Local DB    │    │  Cloud Sync │
│  Expo       │    │  Offline     │    │  PostgreSQL │
└─────────────┘    └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "React Native", color: "#06b6d4" },
      { name: "Expo", color: "#f1f5f9" },
      { name: "TypeScript", color: "#818cf8" },
      { name: "Supabase", color: "#4ade80" },
      { name: "expo-sqlite", color: "#f59e0b" },
    ],
    github: "https://github.com/fabriciojunio/conectagente",
    demo: null,
    filters: ["full-stack", "javascript"],
  },
  {
    id: "mycondpets",
    name: "MyCondPets",
    shortDesc: "Gestão de pets em condomínios com busca NLP. Equipe de 5.",
    longDesc:
      "Plataforma web acadêmica para gestão de pets em condomínios com busca por linguagem natural customizada. Desenvolvido em equipe de 5 alunos na UNISAGRADO.",
    category: "full-stack",
    tags: ["Acadêmico", "NLP"],
    tagColor: "#38bdf8",
    dotColor: "#38bdf8",
    metrics: [
      { value: "5", label: "devs", color: "#38bdf8" },
      { value: "NLP", label: "busca", color: "#4ade80" },
      { value: "Next 15", label: "framework", color: "#818cf8" },
      { value: "Ágil", label: "metodologia", color: "#f59e0b" },
    ],
    features: [
      "Busca com processamento de linguagem natural customizado",
      "Backend completo com Next.js 15 e PostgreSQL",
      "Autenticação com NextAuth.js",
      "Desenvolvido em equipe de 5 com metodologia ágil e entregas semanais",
      "React 19 com Server Components",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  React 19   │───▶│  Next.js 15  │───▶│ PostgreSQL  │
│  Client     │    │  API Routes  │    │  Database   │
└─────────────┘    └──────┬───────┘    └─────────────┘
                          │
                   ┌──────▼───────┐
                   │  NLP Engine  │
                   │  Custom      │
                   └──────────────┘`,
    techStack: [
      { name: "Next.js 15", color: "#f1f5f9" },
      { name: "React 19", color: "#06b6d4" },
      { name: "TypeScript", color: "#818cf8" },
      { name: "PostgreSQL", color: "#38bdf8" },
      { name: "NextAuth", color: "#4ade80" },
      { name: "NLP", color: "#f59e0b" },
    ],
    github: "https://github.com/fabriciojunio/mycondpets",
    demo: null,
    filters: ["full-stack", "javascript"],
  },
];
