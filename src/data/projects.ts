import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "pulso-dados",
    name: "Pulso Dados",
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
    github: "https://github.com/fabriciojunio/pulso-dados",
    demo: null,
    filters: ["data-science", "python"],
  },
  {
    id: "analise-curriculos",
    name: "Análise Currículos",
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
    github: "https://github.com/fabriciojunio/analise-curriculos",
    demo: null,
    filters: ["full-stack", "java", "python"],
  },
  {
    id: "gestor-eventos",
    name: "Gestor Eventos",
    shortDesc: "Gestão de eventos com ingressos e check-in em tempo real.",
    longDesc:
      "Plataforma onde organizadores criam eventos e lotes de ingressos, participantes compram e fazem check-in via QR Code, com dashboard real-time mostrando lotação e vendas.",
    category: "full-stack",
    tags: ["JavaScript", "Tempo Real"],
    tagColor: "#06b6d4",
    dotColor: "#06b6d4",
    metrics: [
      { value: "Angular", label: "frontend", color: "#06b6d4" },
      { value: "Node", label: "backend", color: "#4ade80" },
      { value: "RT", label: "socket.io", color: "#818cf8" },
      { value: "NgRx", label: "estado", color: "#f59e0b" },
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
    github: "https://github.com/fabriciojunio/gestor-eventos",
    demo: null,
    filters: ["full-stack", "javascript"],
  },
  {
    id: "base-conhecimento",
    name: "Base Conhecimento",
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
    github: "https://github.com/fabriciojunio/base-conhecimento",
    demo: null,
    filters: ["full-stack", "java", "python", "javascript"],
  },
  {
    id: "quantbot-ml",
    name: "Quantbot ML",
    shortDesc: "Sistema de trading quantitativo com ML, sentimento FinBERT e gestão de risco.",
    longDesc:
      "Sistema institucional de trading combinando ensemble de 3 modelos de ML, análise de sentimento com FinBERT, detecção de regime de mercado e gestão avançada de risco com simulações Monte Carlo.",
    category: "data-science",
    tags: ["Data Science", "FinTech"],
    tagColor: "#818cf8",
    dotColor: "#818cf8",
    metrics: [
      { value: "3", label: "modelos ML", color: "#818cf8" },
      { value: "233", label: "testes", color: "#4ade80" },
      { value: "4", label: "regimes", color: "#f59e0b" },
      { value: "B3+US", label: "mercados", color: "#06b6d4" },
    ],
    features: [
      "Ensemble de 3 modelos: Random Forest, XGBoost, Gradient Boosting com voting",
      "Análise de sentimento financeiro com FinBERT (PyTorch)",
      "Walk-Forward Validation com TimeSeriesSplit para evitar data leakage",
      "Detecção de regime de mercado (bull/bear × low/high vol)",
      "Técnicas quantitativas: Triple Barrier Method, CUSUM Filter, Fractional Differentiation",
      "Dashboard React com 8 abas: Overview, Performance, News, ML Signals, Paper Trading, Accuracy, Memory, Risk",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  React 18   │───▶│   FastAPI    │───▶│  Ensemble   │
│  Dashboard  │    │   REST API   │    │  3 Models   │
└─────────────┘    └──────┬───────┘    └──────┬──────┘
                          │                    │
┌─────────────┐    ┌──────▼───────┐    ┌──────▼──────┐
│  FinBERT    │◀───│  Risk Mgmt   │◀───│  Regime     │
│  Sentiment  │    │  Monte Carlo │    │  Detection  │
└─────────────┘    └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Python", color: "#818cf8" },
      { name: "React 18", color: "#06b6d4" },
      { name: "FastAPI", color: "#4ade80" },
      { name: "XGBoost", color: "#f472b6" },
      { name: "PyTorch", color: "#f59e0b" },
      { name: "scikit-learn", color: "#a78bfa" },
      { name: "yfinance", color: "#38bdf8" },
      { name: "FinBERT", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/quantbot-ml",
    demo: null,
    filters: ["data-science", "python", "javascript"],
  },
  {
    id: "detector-fraudes",
    name: "Detector Fraudes",
    shortDesc: "Detecção de fraudes em tempo real com Kafka, Spark Streaming e ML ensemble.",
    longDesc:
      "Pipeline de Data Engineering + ML que processa ~100 tx/sec via Kafka e Spark Streaming, aplica ensemble de Isolation Forest + Autoencoder para detectar anomalias em <200ms com 92% de precisão.",
    category: "data-science",
    tags: ["Data Engineering", "ML"],
    tagColor: "#f472b6",
    dotColor: "#f472b6",
    metrics: [
      { value: "92%", label: "precisão", color: "#f472b6" },
      { value: "0.96", label: "auc-roc", color: "#4ade80" },
      { value: "<200", label: "ms latência", color: "#f59e0b" },
      { value: "100/s", label: "transações", color: "#06b6d4" },
    ],
    features: [
      "Kafka producer para geração e ingestão de transações",
      "Spark Structured Streaming para feature engineering em tempo real",
      "Sliding windows (5min, 30min, 1h) sobre comportamento do usuário",
      "Ensemble ML: Isolation Forest + Autoencoder (PyTorch)",
      "3 níveis de risco: SEGURO / SUSPEITO / FRAUDE",
      "Dashboard Streamlit com monitoramento live das transações",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Kafka      │───▶│  Spark       │───▶│  Ensemble   │
│  Producer   │    │  Streaming   │    │  IF + AE    │
└─────────────┘    └──────┬───────┘    └──────┬──────┘
                          │                    │
┌─────────────┐    ┌──────▼───────┐    ┌──────▼──────┐
│  Streamlit  │◀───│   FastAPI    │◀───│  PostgreSQL │
│  Dashboard  │    │   REST API   │    │  + Redis    │
└─────────────┘    └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Python", color: "#818cf8" },
      { name: "Kafka", color: "#f472b6" },
      { name: "Spark", color: "#f59e0b" },
      { name: "PyTorch", color: "#06b6d4" },
      { name: "FastAPI", color: "#4ade80" },
      { name: "scikit-learn", color: "#a78bfa" },
      { name: "PostgreSQL", color: "#38bdf8" },
      { name: "Redis", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/detector-fraudes",
    demo: null,
    filters: ["data-science", "python"],
  },
  {
    id: "previsao-clima",
    name: "Previsão Clima",
    shortDesc: "Forecast de clima brasileiro com Prophet, SARIMA e LSTM ensemble.",
    longDesc:
      "Pipeline de Data Science para análise e previsão climática de 10 cidades brasileiras usando ensemble de 3 modelos (Prophet, SARIMA, LSTM) com dashboard interativo de 5 páginas.",
    category: "data-science",
    tags: ["Data Science", "Time Series"],
    tagColor: "#06b6d4",
    dotColor: "#06b6d4",
    metrics: [
      { value: "10", label: "cidades", color: "#06b6d4" },
      { value: "3", label: "modelos", color: "#818cf8" },
      { value: "LSTM", label: "deep learning", color: "#f59e0b" },
      { value: "5", label: "dashboards", color: "#4ade80" },
    ],
    features: [
      "3 modelos de forecast: Prophet (com sazonalidade/feriados), SARIMA (auto_arima), LSTM (PyTorch 2 layers)",
      "Ensemble averaging com pesos baseados em MAE",
      "Detecção de tendências e sazonalidade automática",
      "Dashboard interativo com 5 páginas: Mapa, Séries Temporais, Forecast, Métricas, Anomalias",
      "API FastAPI com endpoints para cidades, histórico, forecast e anomalias",
      "Análise geoespacial com Folium e GeoPandas",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  DuckDB     │───▶│  Pipeline    │───▶│  Ensemble   │
│  Parquet    │    │  Transform   │    │  3 Models   │
└─────────────┘    └──────────────┘    └──────┬──────┘
                                              │
┌─────────────┐    ┌──────────────┐    ┌──────▼──────┐
│  Streamlit  │◀───│   FastAPI    │◀───│  Prophet +  │
│  5 Pages    │    │   REST API   │    │  SARIMA+LSTM│
└─────────────┘    └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Python", color: "#818cf8" },
      { name: "Prophet", color: "#06b6d4" },
      { name: "PyTorch", color: "#f59e0b" },
      { name: "FastAPI", color: "#4ade80" },
      { name: "Streamlit", color: "#f472b6" },
      { name: "DuckDB", color: "#a78bfa" },
      { name: "GeoPandas", color: "#38bdf8" },
      { name: "Docker", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/previsao-clima",
    demo: null,
    filters: ["data-science", "python"],
  },
  {
    id: "diagnostico-ia",
    name: "Diagnóstico IA",
    shortDesc: "Classificação de imagens médicas com Deep Learning e Grad-CAM explicável.",
    longDesc:
      "Sistema de classificação de raios-X torácicos (Normal vs Pneumonia) usando ResNet-18 com transfer learning, explicabilidade visual via Grad-CAM customizado e gateway Spring Boot com JWT.",
    category: "data-science",
    tags: ["Deep Learning", "Saúde"],
    tagColor: "#f59e0b",
    dotColor: "#f59e0b",
    metrics: [
      { value: "ResNet", label: "modelo", color: "#f59e0b" },
      { value: "2K", label: "imagens", color: "#4ade80" },
      { value: "Grad-CAM", label: "explicável", color: "#818cf8" },
      { value: "JWT", label: "gateway", color: "#06b6d4" },
    ],
    features: [
      "ResNet-18 com transfer learning (ImageNet pretrained)",
      "Data augmentation: rotação, flip, brilho, contraste, affine",
      "Implementação custom de Grad-CAM do zero para explicabilidade visual",
      "Gateway Spring Boot com JWT + rate limiting",
      "Métricas: Accuracy, Precision, Recall, F1, AUC-ROC, Confusion Matrix",
      "Dashboard Streamlit com heatmaps e explicações visuais",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Streamlit  │───▶│ Spring Boot  │───▶│  FastAPI    │
│  Dashboard  │    │  Gateway     │    │  ML Service │
└─────────────┘    └──────┬───────┘    └──────┬──────┘
                          │                    │
                   ┌──────▼───────┐    ┌──────▼──────┐
                   │  PostgreSQL  │    │  ResNet-18  │
                   │  + JWT Auth  │    │  + Grad-CAM │
                   └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "PyTorch", color: "#f59e0b" },
      { name: "FastAPI", color: "#4ade80" },
      { name: "Spring Boot", color: "#818cf8" },
      { name: "Streamlit", color: "#06b6d4" },
      { name: "PostgreSQL", color: "#38bdf8" },
      { name: "Docker", color: "#a78bfa" },
      { name: "torchvision", color: "#f472b6" },
      { name: "Java 21", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/diagnostico-ia",
    demo: null,
    filters: ["data-science", "python", "java"],
  },
  {
    id: "central-logs",
    name: "Central de Logs",
    shortDesc: "Plataforma de centralização e análise de logs em tempo real com Go e Elasticsearch.",
    longDesc:
      "Sistema que recebe logs de múltiplas aplicações via API, armazena no Elasticsearch e oferece busca full-text, dashboards, alertas customizáveis e streaming em tempo real via WebSocket.",
    category: "full-stack",
    tags: ["Go", "Infra"],
    tagColor: "#06b6d4",
    dotColor: "#06b6d4",
    metrics: [
      { value: "13K", label: "linhas", color: "#06b6d4" },
      { value: "65", label: "arquivos", color: "#4ade80" },
      { value: "WS", label: "real-time", color: "#818cf8" },
      { value: "ES", label: "elasticsearch", color: "#f59e0b" },
    ],
    features: [
      "Ingestão assíncrona de logs (unitário e batch até 1000)",
      "Busca full-text com filtros, ordenação e highlight",
      "Dashboard: timeline, distribuição, top serviços, tendência de erros",
      "Alertas customizáveis (ex: '50+ ERRORs do payment-service em 5 min')",
      "Streaming real-time via WebSocket com filtros",
      "SDK Go client com buffering interno para integração",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  React 19   │───▶│  Go + Gin    │───▶│ Elastic     │
│  Recharts   │    │  REST API    │    │ Search 8    │
└──────┬──────┘    └──────┬───────┘    └─────────────┘
       │                  │
┌──────▼──────┐    ┌──────▼───────┐    ┌─────────────┐
│  WebSocket  │◀───│  Alert       │───▶│  PostgreSQL │
│  Streaming  │    │  Engine      │    │  Alerts DB  │
└─────────────┘    └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Go", color: "#06b6d4" },
      { name: "Gin", color: "#4ade80" },
      { name: "React 19", color: "#818cf8" },
      { name: "TypeScript", color: "#f59e0b" },
      { name: "Elasticsearch", color: "#f472b6" },
      { name: "WebSocket", color: "#a78bfa" },
      { name: "PostgreSQL", color: "#38bdf8" },
      { name: "Docker", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/central-logs",
    demo: null,
    filters: ["full-stack", "go"],
  },
  {
    id: "codereview-ai",
    name: "CodeReview AI",
    shortDesc: "Plataforma de code review automatizado com LLM local (Ollama) — detecta bugs, code smells e violações SOLID.",
    longDesc:
      "Plataforma que analisa código Java, Python e JavaScript usando LLM local via Ollama. Detecta bugs, code smells, violações SOLID e atribui score de qualidade 0-100 com processamento assíncrono.",
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
      "Streaming de análise em tempo real via Server-Sent Events",
      "Cache Redis de 24h (mesmo código = resultado instantâneo)",
      "JWT auth + rate limiting (20 reviews/hora)",
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
    id: "quadro-tarefas",
    name: "Quadro Tarefas",
    shortDesc: "Gestão de projetos estilo Trello/Notion com Kanban, SSE e drag-and-drop.",
    longDesc:
      "App de gestão de projetos com múltiplos workspaces, boards Kanban com drag-and-drop, cards com Markdown, checklists, labels, comentários e atualizações em tempo real via SSE.",
    category: "full-stack",
    tags: ["Next.js", "Full Stack"],
    tagColor: "#a78bfa",
    dotColor: "#a78bfa",
    metrics: [
      { value: "SSE", label: "real-time", color: "#a78bfa" },
      { value: "DnD", label: "drag-drop", color: "#4ade80" },
      { value: "RBAC", label: "roles", color: "#f59e0b" },
      { value: "E2E", label: "playwright", color: "#06b6d4" },
    ],
    features: [
      "Múltiplos workspaces com roles (Owner, Admin, Member)",
      "Boards Kanban com suporte a favoritos",
      "Drag-and-drop de cards com reordenação (dnd-kit)",
      "Modal de card: descrição Markdown, labels, checklists, assignees, comentários",
      "Atualizações em tempo real via Server-Sent Events",
      "Atalhos de teclado (/ busca, Esc fecha) e dark mode responsivo",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Next.js 15 │───▶│  API Routes  │───▶│  PostgreSQL │
│  React 19   │    │  NextAuth v5 │    │  Prisma ORM │
└──────┬──────┘    └──────┬───────┘    └─────────────┘
       │                  │
┌──────▼──────┐    ┌──────▼───────┐    ┌─────────────┐
│  dnd-kit    │◀───│  SSE         │    │  Zustand    │
│  Drag&Drop  │    │  Real-time   │    │  TanStack Q │
└─────────────┘    └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Next.js 15", color: "#a78bfa" },
      { name: "React 19", color: "#06b6d4" },
      { name: "TypeScript", color: "#f59e0b" },
      { name: "Prisma", color: "#4ade80" },
      { name: "NextAuth v5", color: "#818cf8" },
      { name: "Zustand", color: "#f472b6" },
      { name: "Playwright", color: "#38bdf8" },
      { name: "dnd-kit", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/quadro-tarefas",
    demo: null,
    filters: ["full-stack", "javascript"],
  },
  {
    id: "painel-dev",
    name: "Painel Dev",
    shortDesc: "Dashboard de produtividade para equipes dev com sprints, Kanban e GitHub.",
    longDesc:
      "Plataforma para times de desenvolvimento acompanharem sprints, Kanban e métricas de entrega (velocity, lead time, cycle time, burndown) com integração GitHub e LGPD compliance.",
    category: "full-stack",
    tags: ["Java", "React", "DevOps"],
    tagColor: "#4ade80",
    dotColor: "#4ade80",
    metrics: [
      { value: "6", label: "métricas", color: "#4ade80" },
      { value: "GitHub", label: "integração", color: "#818cf8" },
      { value: "LGPD", label: "compliant", color: "#f59e0b" },
      { value: "RBAC", label: "roles", color: "#06b6d4" },
    ],
    features: [
      "Times e Workspaces multi-team com roles (OWNER/ADMIN/MEMBER)",
      "Gestão de sprints (PLANNING / ACTIVE / COMPLETED)",
      "Kanban board com drag-and-drop",
      "Engine de métricas: velocity, burndown, lead time, cycle time, throughput",
      "Integração GitHub: commits, PRs, review times",
      "LGPD: data export, soft delete, consent tracking",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  React 19   │───▶│ Spring Boot  │───▶│  PostgreSQL │
│  Recharts   │    │  Java 21     │    │  16         │
└──────┬──────┘    └──────┬───────┘    └─────────────┘
       │                  │
┌──────▼──────┐    ┌──────▼───────┐    ┌─────────────┐
│  dnd-kit    │    │  GitHub API  │    │   Redis     │
│  Kanban     │    │  Integration │    │   Cache     │
└─────────────┘    └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Java 21", color: "#f59e0b" },
      { name: "Spring Boot", color: "#4ade80" },
      { name: "React 19", color: "#06b6d4" },
      { name: "TypeScript", color: "#818cf8" },
      { name: "PostgreSQL", color: "#38bdf8" },
      { name: "Redis", color: "#f472b6" },
      { name: "Docker", color: "#a78bfa" },
      { name: "JUnit 5", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/painel-dev",
    demo: null,
    filters: ["full-stack", "java", "javascript"],
  },
  {
    id: "transcritor-audio",
    name: "Transcritor Áudio",
    shortDesc: "Transcrição de áudio com Whisper local — 99 idiomas, 100% offline.",
    longDesc:
      "Serviço de transcrição usando OpenAI Whisper rodando 100% local. Suporta 99 idiomas com detecção automática, segmentação com timestamps e exportação em TXT, SRT, VTT e JSON.",
    category: "full-stack",
    tags: ["IA Local", "Audio"],
    tagColor: "#f472b6",
    dotColor: "#f472b6",
    metrics: [
      { value: "99", label: "idiomas", color: "#f472b6" },
      { value: "100MB", label: "max upload", color: "#4ade80" },
      { value: "4", label: "formatos", color: "#f59e0b" },
      { value: "Local", label: "100% offline", color: "#06b6d4" },
    ],
    features: [
      "Upload de áudio (MP3, WAV, M4A, FLAC, OGG, WEBM) até 100MB",
      "Transcrição assíncrona com Celery + Redis",
      "Detecção automática de idioma (99 idiomas suportados)",
      "Segmentação com timestamps por frase",
      "Exportação: TXT, SRT, VTT, JSON",
      "Player de áudio integrado com highlight de segmentos e edição inline",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  React 19   │───▶│   FastAPI    │───▶│  Celery     │
│  Drag&Drop  │    │   REST API   │    │  Workers    │
└─────────────┘    └──────────────┘    └──────┬──────┘
                                              │
┌─────────────┐    ┌──────────────┐    ┌──────▼──────┐
│  Audio      │◀───│   SQLite     │◀───│  Whisper    │
│  Player     │    │   Storage    │    │  Local AI   │
└─────────────┘    └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Python", color: "#818cf8" },
      { name: "FastAPI", color: "#4ade80" },
      { name: "React 19", color: "#06b6d4" },
      { name: "TypeScript", color: "#f59e0b" },
      { name: "Whisper", color: "#f472b6" },
      { name: "Celery", color: "#a78bfa" },
      { name: "Redis", color: "#38bdf8" },
      { name: "Docker", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/transcritor-audio",
    demo: null,
    filters: ["full-stack", "python", "javascript"],
  },
  {
    id: "oficina-chatbot",
    name: "Oficina Chatbot",
    shortDesc: "Plataforma de chatbots com RAG usando LLM local — sem LangChain, do zero.",
    longDesc:
      "Plataforma para criar chatbots com RAG (Retrieval Augmented Generation) usando Ollama local. Upload de documentos, indexação com embeddings, respostas contextualizadas — pipeline RAG implementado do zero.",
    category: "full-stack",
    tags: ["IA Local", "RAG"],
    tagColor: "#818cf8",
    dotColor: "#818cf8",
    metrics: [
      { value: "RAG", label: "do zero", color: "#818cf8" },
      { value: "384", label: "dimensões", color: "#4ade80" },
      { value: "SSE", label: "streaming", color: "#f59e0b" },
      { value: "PDF", label: "docs", color: "#06b6d4" },
    ],
    features: [
      "Upload de documentos (PDF, TXT, MD) com chunking (~500 tokens com overlap)",
      "Pipeline RAG do zero (sem LangChain): embeddings → ChromaDB → LLM",
      "Vector embeddings com sentence-transformers (384 dimensões)",
      "ChromaDB com isolamento de namespace por chatbot",
      "Respostas com streaming via Server-Sent Events",
      "Atribuição de fontes com scores de relevância e analytics por bot",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  React 19   │───▶│   FastAPI    │───▶│  ChromaDB   │
│  Chat UI    │    │   REST API   │    │  Vectors    │
└─────────────┘    └──────┬───────┘    └──────┬──────┘
                          │                    │
┌─────────────┐    ┌──────▼───────┐    ┌──────▼──────┐
│  SSE        │◀───│  PostgreSQL  │    │  Ollama     │
│  Streaming  │    │  Metadata    │    │  LLM Local  │
└─────────────┘    └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Python", color: "#818cf8" },
      { name: "FastAPI", color: "#4ade80" },
      { name: "React 19", color: "#06b6d4" },
      { name: "TypeScript", color: "#f59e0b" },
      { name: "Ollama", color: "#f472b6" },
      { name: "ChromaDB", color: "#a78bfa" },
      { name: "PostgreSQL", color: "#38bdf8" },
      { name: "Docker", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/oficina-chatbot",
    demo: null,
    filters: ["full-stack", "python", "javascript"],
  },
  {
    id: "controle-financeiro",
    name: "Controle Financeiro",
    shortDesc: "Dashboard financeiro pessoal com predição de gastos via Prophet e ML.",
    longDesc:
      "Plataforma de finanças pessoais com 3 serviços: backend Java, frontend Angular e serviço ML Python. Predição de gastos com Prophet, detecção de anomalias, categorização automática e LGPD compliance.",
    category: "full-stack",
    tags: ["Java", "Angular", "ML"],
    tagColor: "#4ade80",
    dotColor: "#4ade80",
    metrics: [
      { value: "3", label: "serviços", color: "#4ade80" },
      { value: "Prophet", label: "forecast", color: "#818cf8" },
      { value: "LGPD", label: "compliant", color: "#f59e0b" },
      { value: "NgRx", label: "estado", color: "#06b6d4" },
    ],
    features: [
      "Backend Java/Spring Boot com transações, budgets, metas e relatórios",
      "Serviço ML Python: Prophet para forecast, Z-score para anomalias, TF-IDF + Naive Bayes para categorização",
      "Frontend Angular 18 com dashboards, gráficos Chart.js e progress bars",
      "Import de CSV, recorrência automática e tracking de orçamento",
      "Metas financeiras com progresso circular",
      "LGPD compliance com data export e consent tracking",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Angular 18 │───▶│ Spring Boot  │───▶│  FastAPI    │
│  NgRx       │    │  Java 21     │    │  ML Service │
└─────────────┘    └──────┬───────┘    └──────┬──────┘
                          │                    │
┌─────────────┐    ┌──────▼───────┐    ┌──────▼──────┐
│  Chart.js   │    │  PostgreSQL  │    │  Prophet +  │
│  Dashboard  │    │  + Redis     │    │  Naive Bayes│
└─────────────┘    └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Java 21", color: "#f59e0b" },
      { name: "Spring Boot", color: "#4ade80" },
      { name: "Angular 18", color: "#f472b6" },
      { name: "Python", color: "#818cf8" },
      { name: "FastAPI", color: "#06b6d4" },
      { name: "PostgreSQL", color: "#38bdf8" },
      { name: "Redis", color: "#a78bfa" },
      { name: "Docker", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/controle-financeiro",
    demo: null,
    filters: ["full-stack", "java", "python", "javascript"],
  },
  {
    id: "auditoria-contratos",
    name: "Auditoria Contratos",
    shortDesc: "Auditoria de segurança para smart contracts Solidity com análise estática e LLM.",
    longDesc:
      "Plataforma de auditoria de contratos Solidity combinando análise estática com 10 regras de segurança (Strategy pattern) e análise semântica via LLM local (Ollama). Score de segurança 0-100.",
    category: "full-stack",
    tags: ["Java", "Web3", "Segurança"],
    tagColor: "#f59e0b",
    dotColor: "#f59e0b",
    metrics: [
      { value: "10", label: "regras", color: "#f59e0b" },
      { value: "0-100", label: "score", color: "#4ade80" },
      { value: "5", label: "severidades", color: "#818cf8" },
      { value: "LLM", label: "semântica", color: "#06b6d4" },
    ],
    features: [
      "Submissão via JSON, upload de arquivo ou URL do GitHub",
      "Análise estática com 10 regras de segurança (Strategy pattern)",
      "Verificações: reentrancy, overflow, unchecked returns, access control, front-running, delegatecall, self-destruct",
      "Análise semântica via Ollama (DeepSeek-Coder/CodeLlama)",
      "Findings com severidade: CRITICAL, HIGH, MEDIUM, LOW, INFO",
      "Score de segurança 0-100 com classificação de risco",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Submit     │───▶│ Spring Boot  │───▶│  Static     │
│  Contract   │    │  Java 21     │    │  10 Rules   │
└─────────────┘    └──────┬───────┘    └──────┬──────┘
                          │                    │
┌─────────────┐    ┌──────▼───────┐    ┌──────▼──────┐
│  Report     │◀───│  PostgreSQL  │    │  Ollama     │
│  Score 0-100│    │  + Redis     │    │  LLM Local  │
└─────────────┘    └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Java 21", color: "#f59e0b" },
      { name: "Spring Boot", color: "#4ade80" },
      { name: "Ollama", color: "#818cf8" },
      { name: "PostgreSQL", color: "#38bdf8" },
      { name: "Redis", color: "#06b6d4" },
      { name: "Docker", color: "#a78bfa" },
      { name: "JUnit 5", color: "#f472b6" },
      { name: "Mockito", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/auditoria-contratos",
    demo: null,
    filters: ["full-stack", "java"],
  },
  {
    id: "mycondpets",
    name: "MyCondPets",
    shortDesc: "Gestão de pets em condomínios com login Google, mural e painel admin.",
    longDesc:
      "Plataforma para condomínios residenciais gerenciarem pets. Login via Google OAuth, cadastro de tutores e pets, mural de comunicados (perdidos/achados), dashboard admin com estatísticas.",
    category: "full-stack",
    tags: ["Next.js", "Full Stack"],
    tagColor: "#a78bfa",
    dotColor: "#a78bfa",
    metrics: [
      { value: "OAuth", label: "google", color: "#a78bfa" },
      { value: "Admin", label: "dashboard", color: "#4ade80" },
      { value: "Jest", label: "testes", color: "#f59e0b" },
      { value: "CRUD", label: "completo", color: "#06b6d4" },
    ],
    features: [
      "Login via Google OAuth com NextAuth.js",
      "Cadastro de tutores com dados de contato e apartamento",
      "Registro de pets: nome, espécie, raça, data de nascimento, cor, porte, sexo, foto",
      "Mural de comunicados para alertas de perdidos/achados",
      "Dashboard admin com stats: total pets, perdidos, tutores, apartamentos",
      "Diretório de pets para administradores",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Next.js 15 │───▶│  API Routes  │───▶│  PostgreSQL │
│  React 19   │    │  NextAuth    │    │  Supabase   │
└──────┬──────┘    └──────────────┘    └─────────────┘
       │
┌──────▼──────┐    ┌──────────────┐
│  Google     │    │  Jest +      │
│  OAuth      │    │  Testing Lib │
└─────────────┘    └──────────────┘`,
    techStack: [
      { name: "Next.js 15", color: "#a78bfa" },
      { name: "React 19", color: "#06b6d4" },
      { name: "PostgreSQL", color: "#38bdf8" },
      { name: "NextAuth.js", color: "#4ade80" },
      { name: "Jest", color: "#f59e0b" },
      { name: "Lucide React", color: "#f472b6" },
      { name: "pnpm", color: "#818cf8" },
      { name: "TypeScript", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/MyCondPets",
    demo: null,
    filters: ["full-stack", "javascript"],
  },
  {
    id: "conectagente",
    name: "ConectAgente",
    shortDesc: "App mobile offline-first para Agentes Comunitários de Saúde (ACS/SUS).",
    longDesc:
      "App mobile para Agentes de Saúde do SUS com arquitetura offline-first. Coleta de dados em campo com sincronização automática, 5 módulos clínicos por morador, metas mensais e relatórios Excel.",
    category: "mobile",
    tags: ["React Native", "Mobile"],
    tagColor: "#4ade80",
    dotColor: "#4ade80",
    metrics: [
      { value: "Offline", label: "first", color: "#4ade80" },
      { value: "5", label: "módulos", color: "#818cf8" },
      { value: "SQLite", label: "local DB", color: "#f59e0b" },
      { value: "LGPD", label: "audit log", color: "#06b6d4" },
    ],
    features: [
      "Área Agente: dashboard, residências, moradores, fichas clínicas (5 módulos), visitas com sinais vitais",
      "Área Admin: 7 indicadores globais, top 3 agentes, gestão de residências, estatísticas",
      "Arquitetura offline-first com SQLite (WAL + FTS) e sync automático com Supabase",
      "Checklist de medicamentos/vacinas, encaminhamentos, calendário de visitas",
      "Metas mensais por agente com acompanhamento",
      "Exportação CSV/Excel e audit log LGPD",
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
    demo: null,
    filters: ["mobile", "javascript"],
  },
  {
    id: "apontamento-horas",
    name: "Apontamento de Horas",
    shortDesc: "Sistema de registro de horas com RPA para lançamento automático no NXPlanning.",
    longDesc:
      "Sistema web para registrar e gerenciar horas de trabalho com integração RPA para lançamento automático no NXPlanning. Dashboard com estatísticas, filtros avançados e detecção inteligente de tipo de trabalho.",
    category: "full-stack",
    tags: ["Next.js", "RPA"],
    tagColor: "#06b6d4",
    dotColor: "#06b6d4",
    metrics: [
      { value: "RPA", label: "automação", color: "#06b6d4" },
      { value: "CSP", label: "headers", color: "#4ade80" },
      { value: "Zod", label: "validação", color: "#f59e0b" },
      { value: "Vitest", label: "testes", color: "#818cf8" },
    ],
    features: [
      "CRUD de registros de horas com gestão de clientes (cooperativas)",
      "Detecção inteligente de tipo de trabalho baseada na descrição",
      "Integração RPA para lançamento em batch no NXPlanning",
      "Dashboard com estatísticas e resumo semanal",
      "Filtros avançados por status, cliente e período",
      "Segurança: CSP headers, HSTS, rate limiting",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Next.js 14 │───▶│  API Routes  │───▶│  PostgreSQL │
│  Tailwind   │    │  Prisma ORM  │    │  Supabase   │
└─────────────┘    └──────┬───────┘    └─────────────┘
                          │
                   ┌──────▼───────┐    ┌─────────────┐
                   │  Zod         │    │  RPA        │
                   │  Validation  │    │  NXPlanning  │
                   └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Next.js 14", color: "#a78bfa" },
      { name: "TypeScript", color: "#06b6d4" },
      { name: "Tailwind", color: "#4ade80" },
      { name: "Prisma", color: "#f59e0b" },
      { name: "PostgreSQL", color: "#38bdf8" },
      { name: "Zod", color: "#818cf8" },
      { name: "Vitest", color: "#f472b6" },
      { name: "Supabase", color: "#fb923c" },
    ],
    github: "https://github.com/fabriciojunio/apontamento-horas",
    demo: null,
    filters: ["full-stack", "javascript"],
  },
  {
    id: "planilha-financeira",
    name: "Planilha Financeira",
    shortDesc: "Aplicação financeira com integração Mercado Pago para pagamentos.",
    longDesc:
      "Aplicação de gestão financeira com integração ao Mercado Pago SDK para processamento de pagamentos. Interface moderna com Next.js 15, React 19 e TypeScript.",
    category: "full-stack",
    tags: ["Next.js", "Pagamentos"],
    tagColor: "#4ade80",
    dotColor: "#4ade80",
    metrics: [
      { value: "MP", label: "mercado pago", color: "#4ade80" },
      { value: "Next.js", label: "15", color: "#a78bfa" },
      { value: "React", label: "19", color: "#06b6d4" },
      { value: "TS", label: "tipado", color: "#f59e0b" },
    ],
    features: [
      "Gestão de dados financeiros com interface intuitiva",
      "Integração completa com Mercado Pago SDK",
      "Processamento de pagamentos via checkout",
      "Interface responsiva com Tailwind CSS",
      "TypeScript para type safety em todo o projeto",
      "Componentes reutilizáveis com Lucide React",
    ],
    architecture: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Next.js 15 │───▶│  API Routes  │───▶│  Mercado    │
│  React 19   │    │  TypeScript  │    │  Pago SDK   │
└─────────────┘    └──────────────┘    └─────────────┘`,
    techStack: [
      { name: "Next.js 15", color: "#a78bfa" },
      { name: "React 19", color: "#06b6d4" },
      { name: "TypeScript", color: "#f59e0b" },
      { name: "Tailwind", color: "#4ade80" },
      { name: "Mercado Pago", color: "#38bdf8" },
      { name: "Lucide React", color: "#f472b6" },
    ],
    github: "https://github.com/fabriciojunio/planilha-financeira-site",
    demo: null,
    filters: ["full-stack", "javascript"],
  },
];
