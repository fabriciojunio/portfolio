export interface TextoDoProjeto {
  oneLine: string;
  what: string;
  role: string;
  highlights: string[];
  security?: string[];
  demoNote: string;
  flow: string[];
}
export const TRADUCOES: Record<"en" | "es", Record<string, TextoDoProjeto>> = {
  "en": {
    "balcao": {
      "oneLine": "WhatsApp sales agent that never makes up a price",
      "what": "Agent for phone shops that serves, negotiates and appraises used devices on WhatsApp. The model understands the customer and calls functions; price, instalments and trade-in come from tested code.",
      "role": "I built the conversation orchestrator, the tools, the output auditor and the human-in-the-loop panel.",
      "highlights": [
        "Function calling with deterministic pricing engines",
        "Auditor checks every number before sending",
        "Panel to take over chats, approve offers and switch the bot off"
      ],
      "demoNote": "No hosted demo: the repository runs a full conversation with npm run demo, without database, GPU or WhatsApp.",
      "flow": [
        "Open the repository and run npm run demo.",
        "Follow the negotiation and trade-in offer in the terminal.",
        "Read the auditor that blocks invented numbers."
      ]
    },
    "guarita": {
      "oneLine": "RAG and MCP assistant, attacked and defended",
      "what": "Support assistant with knowledge-base retrieval and MCP tools, with six OWASP Top 10 for LLM attacks written as tests.",
      "role": "I built the agent, the MCP server, the attacks and the defences, and wrote the red team report.",
      "highlights": [
        "Prompt injection, exfiltration and tampered tools as tests",
        "Defences outside the model: session, human confirmation and tool hashing",
        "31 tests, strict mypy and an industry-format report"
      ],
      "demoNote": "The attacks run as tests against a model that obeys any instruction: the worst case, on purpose.",
      "flow": [
        "Read the red team report in the repository.",
        "Run pytest -v tests/test_ataques.py.",
        "Compare each attack in the vulnerable and defended versions."
      ],
      "security": [
        "Six OWASP Top 10 for LLM (2025) attacks written as tests",
        "Human confirmation for actions with side effects and ownership checked from the session",
        "MCP tools approved by hash against description swaps"
      ]
    },
    "cautela": {
      "oneLine": "Investment agent that neither recommends nor invents numbers",
      "what": "Agent that answers investment questions only with measured numbers, cites the source and states the limitation.",
      "role": "I built the agent, the fact base and the auditor that blocks recommendations and unsupported numbers.",
      "highlights": [
        "Output auditor independent of the model",
        "Every answer cites the source of its number",
        "Explicit refusal when there is no data"
      ],
      "demoNote": "Runs from the command line; the repository includes the fact base and instructions.",
      "flow": [
        "Open the repository and run the command-line interface.",
        "Ask a question about funds.",
        "Watch the auditor refuse a recommendation."
      ]
    },
    "verbete": {
      "oneLine": "Bill classification with measured abstention",
      "what": "Multi-label classification of 4,500 Brazilian bills into 32 topics, with abstention and explanation, and the measurement of an annotation leak.",
      "role": "I collected the data, trained and evaluated the model, measured the leak and built the coverage curve.",
      "highlights": [
        "Annotation leak that inflated results by 26%",
        "Coverage curve: 80% answered at 0.604 micro-F1",
        "41 tests and reproducible experiments"
      ],
      "demoNote": "Numbers and figures are in the repository; the experiments run in sequence.",
      "flow": [
        "Read the main result in the README.",
        "Run experiments 01 to 04.",
        "Check the abstention curve in the figures."
      ]
    },
    "aurora": {
      "oneLine": "Astronaut health without relying on Earth, for NASA Space Apps",
      "what": "Health monitoring for long missions, built for the NASA International Space Apps Challenge 2026: explainable alerts against each person's normal, radiation from real data and an offline assistant.",
      "role": "I built the architecture, the risk engine, security and tests, as a team of two.",
      "highlights": [
        "Alerts against each person's normal, not the population",
        "Radiation dose from real NASA data",
        "318 unit tests and 11 end-to-end tests"
      ],
      "demoNote": "Simulated crew data; radiation and solar storms are real NASA and NOAA measurements.",
      "flow": [
        "Open the demo and pick a crew member.",
        "See the explained alerts and the radiation dose.",
        "Check the scientific sources in the repository."
      ],
      "security": [
        "AES-GCM 256 with a PIN-derived key (PBKDF2, 600k iterations)",
        "Hash-chained audit log signed with ECDSA P-256",
        "CSP without inline scripts, Trusted Types and a pipeline with gitleaks, Semgrep, OSV and ZAP"
      ]
    },
    "almanaque": {
      "oneLine": "Business directories and support console",
      "what": "PHP and Symfony platform with separate customer portals, search, subscriptions and a support console.",
      "role": "I developed the domain, integrations, support console and automated tests.",
      "highlights": [
        "Tenant isolation and idempotent billing",
        "Elasticsearch with database fallback",
        "Triage, known issues and release records"
      ],
      "demoNote": "Sample data. The hosted search uses the database; Elasticsearch and billing commands run locally.",
      "flow": [
        "Search the directory for a business.",
        "Sign in with the demo support account to inspect tickets and triage.",
        "Follow the repository guide to test search and billing locally."
      ]
    },
    "vitrine-bauru": {
      "oneLine": "Social outreach for SEDECON in Bauru: a small business directory",
      "what": "UNISAGRADO social outreach project for SEDECON, Bauru's Municipal Secretariat for Economic Development, Tourism and Innovation. The department supports entrepreneurship and local economic development. The platform promotes small businesses through a catalog, search, moderation and WhatsApp contact.",
      "role": "I developed Java services, event integrations and the browsing and management interface.",
      "highlights": [
        "Spring Boot microservices with Kafka and separate data stores",
        "Registration moderation and contact indicators",
        "Integration tests and data deletion workflow"
      ],
      "demoNote": "Demo data and deployed API. The first request may take time while the service starts.",
      "flow": [
        "Search by category or district and open a business.",
        "Use the demo profile buttons on the login screen.",
        "Explore moderation and contact indicators."
      ],
      "security": [
        "AppSec programme: STRIDE, attack trees, PASTA, DREAD, SAMM and ATT&CK",
        "Security Champions kit: secure PR checklist, training and a SAST triage guide",
        "CSP limited to 'self', rate limiting and an LGPD deletion saga",
        "Kubernetes with Kyverno in CEL, Trivy on manifests and Flux GitOps"
      ]
    },
    "feira": {
      "oneLine": "DevSecOps pipeline with gates that block, around Kafka orders",
      "what": "Four Spring Boot microservices coordinate orders through Kafka events, wrapped in a full DevSecOps pipeline: gates that fail the merge, SBOM, Kubernetes with policies and detection as code.",
      "role": "I built the saga, the outbox and the idempotent consumers, and set up the security pipeline, the custom rules and the metrics dashboard.",
      "highlights": [
        "Outbox and inbox handle repeated delivery",
        "Inventory compensation and payment refunds",
        "Integration tests for failures and out-of-order events"
      ],
      "demoNote": "Browser simulation; Java services and Kafka run locally.",
      "flow": [
        "Place an order and follow its transitions.",
        "Order soybean oil to observe rejection and inventory compensation.",
        "Run Docker Compose to inspect the real distributed services."
      ],
      "security": [
        "Kafka with TLS, SASL/SCRAM and per-service ACLs",
        "Semgrep with custom rules and measured false positives, CodeQL, OSV, gitleaks and ZAP as gates",
        "SPDX and CycloneDX SBOM, Kyverno, Falco, Sigma rules and an MTTR and SLA dashboard"
      ]
    },
    "koracrm": {
      "oneLine": "Laravel CRM with pipeline, tasks and auditing",
      "what": "CRM for leads, sales pipeline, tasks and user audit records.",
      "role": "I developed the layered API, domain rules and React interface.",
      "highlights": [
        "Use cases separated from Eloquent",
        "Roles and change audit records",
        "Domain, integration and browser tests"
      ],
      "demoNote": "Browser demo with sample data. The Laravel API is not deployed.",
      "flow": [
        "Choose the demo sign-in option.",
        "Open a lead, move through the pipeline and inspect tasks.",
        "Run the API and tests using the repository instructions."
      ]
    },
    "authcore": {
      "oneLine": "Identity: JWT, MFA, passkeys, Keycloak and Kong, with attacks proven",
      "what": "Authentication and authorization service with token rotation, MFA, passkeys, Keycloak with PKCE and Kong at the edge, plus a React UI.",
      "role": "I built the authentication, authorization and session flows, the threat model and the automated attack proofs.",
      "highlights": [
        "JWT HS256 and TOTP authentication",
        "Refresh rotation and reuse detection",
        "Input validation and authentication tests"
      ],
      "demoNote": "Published interface. Complete authentication flows depend on the API; run the full environment locally.",
      "flow": [
        "Explore access and recovery screens.",
        "Inspect renewal, 2FA and authorization flows in the source.",
        "Run the full environment locally to test the backend."
      ],
      "security": [
        "TOTP MFA with an encrypted secret, and passkeys (WebAuthn)",
        "Keycloak with PKCE, Kong at the edge and a Spring service that validates again: 18 attacks proven in CI",
        "STRIDE, ASVS 5.0, CSRF, tested IDOR and CSP with Trusted Types"
      ]
    },
    "codereview-ai": {
      "oneLine": "Asynchronous code analysis",
      "what": "Code analysis using a local model, RabbitMQ queue and Redis cache.",
      "role": "I developed asynchronous orchestration, analysis tracking and content-based caching.",
      "highlights": [
        "Spring Boot and processing queue",
        "Content-hash caching",
        "Request tracing and automated tests"
      ],
      "demoNote": "No public web demo. Run the application locally.",
      "flow": [
        "Follow the local setup instructions.",
        "Submit code and track its analysis identifier.",
        "Inspect the selected example in the IDE."
      ]
    },
    "conectagente": {
      "oneLine": "Undergraduate thesis and research · selected for Saruê (UNESP Bauru)",
      "what": "My undergraduate thesis and public health research for Community Health Agents, selected for Saruê, the UNESP Bauru incubator. Field app with React Native and Expo, offline SQLite records, Supabase/PostgreSQL synchronization and a Next.js management dashboard.",
      "role": "I own security and privacy (authorization in the database, on-device encryption, pinning, audit trail and LGPD) and build registration, visits and sync.",
      "highlights": [
        "Local SQLite for field registration",
        "Synchronization and role-based access",
        "Selected for Saruê, the UNESP Bauru incubator"
      ],
      "demoNote": "Under development. The web dashboard requires authorized access. Use fictional health data.",
      "flow": [
        "Review the mobile and web architecture.",
        "The dashboard requires an authorized account.",
        "Test offline registration and synchronization locally with fictional data."
      ],
      "security": [
        "Row Level Security on every table, tested as a boundary on a real PostgreSQL",
        "On-device database encrypted with SQLCipher, key in the Android Keystore",
        "Certificate pinning, audited access to sensitive data and an append-only trail",
        "LGPD for health data: legal basis, retention, incident plan and MobSF in CI"
      ]
    },
    "permaneia": {
      "oneLine": "Study assistant and fuzzy dropout analysis",
      "what": "Study assistant and fuzzy dropout analysis. Academic project. Source and setup instructions are available on GitHub.",
      "role": "Development, integration and automated testing. Team contributions are identified in the repository.",
      "highlights": [
        "Implementation: Next.js 15, TypeScript, PostgreSQL",
        "Automated checks and documented workflow",
        "Scope and limitations stated in the repository"
      ],
      "demoNote": "The IDE simulation illustrates one algorithm; see the repository for the complete application.",
      "flow": [
        "Explore the project and its documented workflow.",
        "Review the source in the IDE or on GitHub.",
        "Follow the repository instructions to run the complete environment."
      ]
    },
    "cardiocam": {
      "oneLine": "Experimental cardiac signal research from video",
      "what": "Academic image and signal processing project to study remote photoplethysmography (rPPG), signal quality and method comparison.",
      "role": "I develop processing, evaluation and automated tests for the experimental tool.",
      "highlights": [
        "Classical methods and signal quality evaluation",
        "Research tools and video processing",
        "Automated tests on Linux and Windows"
      ],
      "demoNote": "Synthetic signal simulation, without camera processing or clinically validated measurements.",
      "flow": [
        "Explore the project and its documented workflow.",
        "Review the source in the IDE or on GitHub.",
        "Follow the repository instructions to run the complete environment."
      ]
    },
    "lastro": {
      "oneLine": "Research on financial institutions and the stability of their dependencies",
      "what": "Computer Science research at UNISAGRADO. It investigates learning dependency structures among Brazilian financial institutions using Bayesian networks and multiobjective evolutionary optimization, and how stable those structures remain over time.",
      "role": "I develop the method, experiments, evaluation and research documentation.",
      "highlights": [
        "Bayesian networks and multiobjective evolutionary optimization",
        "Comparison with reference methods and known structures",
        "Temporal stability evaluation using public B3 data"
      ],
      "demoNote": "Research in progress. This is a public topic overview; code and research artifacts remain private.",
      "flow": [
        "Read the overview of the topic, method and evaluation criteria.",
        "Get in touch to discuss the research; the repository remains private."
      ]
    },
    "baliza": {
      "oneLine": "Parking occupancy through image processing",
      "what": "Parking occupancy through image processing. Academic project. Source and setup instructions are available on GitHub.",
      "role": "I contributed to processing, evaluation and documentation as part of the project team.",
      "highlights": [
        "Implementation: Python, YOLO11, OpenCV",
        "Automated checks and documented workflow",
        "Scope and limitations stated in the repository"
      ],
      "demoNote": "See the repository for the local setup and demonstration scope.",
      "flow": [
        "Explore the project and its documented workflow.",
        "Review the source in the IDE or on GitHub.",
        "Follow the repository instructions to run the complete environment."
      ]
    },
    "contaflux": {
      "oneLine": "Vehicle counting from fixed-camera video",
      "what": "Vehicle counting from fixed-camera video. Academic project. Source and setup instructions are available on GitHub.",
      "role": "I contributed to processing, evaluation and documentation as part of the project team.",
      "highlights": [
        "Implementation: Python, OpenCV, NumPy",
        "Automated checks and documented workflow",
        "Scope and limitations stated in the repository"
      ],
      "demoNote": "The IDE simulation illustrates one algorithm; see the repository for the complete application.",
      "flow": [
        "Explore the project and its documented workflow.",
        "Review the source in the IDE or on GitHub.",
        "Follow the repository instructions to run the complete environment."
      ]
    },
    "kaida": {
      "oneLine": "Academic 2D Unity game",
      "what": "Academic 2D Unity game. Academic project. Source and setup instructions are available on GitHub.",
      "role": "Development, integration and automated testing. Team contributions are identified in the repository.",
      "highlights": [
        "Implementation: Unity 2022.3, C#, Unity Test Framework",
        "Automated checks and documented workflow",
        "Scope and limitations stated in the repository"
      ],
      "demoNote": "The IDE simulation illustrates one algorithm; see the repository for the complete application.",
      "flow": [
        "Explore the project and its documented workflow.",
        "Review the source in the IDE or on GitHub.",
        "Follow the repository instructions to run the complete environment."
      ]
    },
    "bicudo": {
      "oneLine": "Academic one-button Unity game",
      "what": "Academic one-button Unity game. Academic project. Source and setup instructions are available on GitHub.",
      "role": "Development, integration and automated testing. Team contributions are identified in the repository.",
      "highlights": [
        "Implementation: Unity 2022.3, C#, Unity Test Framework",
        "Automated checks and documented workflow",
        "Scope and limitations stated in the repository"
      ],
      "demoNote": "The IDE simulation illustrates one algorithm; see the repository for the complete application.",
      "flow": [
        "Explore the project and its documented workflow.",
        "Review the source in the IDE or on GitHub.",
        "Follow the repository instructions to run the complete environment."
      ]
    },
    "laboratorio-vr": {
      "oneLine": "Virtual reality chemistry lab",
      "what": "Virtual reality chemistry lab. Academic project. Source and setup instructions are available on GitHub.",
      "role": "Development, integration and automated testing. Team contributions are identified in the repository.",
      "highlights": [
        "Implementation: Unity, C#, Google Cardboard",
        "Automated checks and documented workflow",
        "Scope and limitations stated in the repository"
      ],
      "demoNote": "See the repository for the local setup and demonstration scope.",
      "flow": [
        "Explore the project and its documented workflow.",
        "Review the source in the IDE or on GitHub.",
        "Follow the repository instructions to run the complete environment."
      ]
    },
    "jis": {
      "oneLine": "Job aggregator with filters and matching scores",
      "what": "Job aggregator with filters and matching scores. Personal project. Source and setup instructions are available on GitHub.",
      "role": "Development, integration and automated testing. Team contributions are identified in the repository.",
      "highlights": [
        "Implementation: Next.js 15, React 19, TypeScript",
        "Automated checks and documented workflow",
        "Scope and limitations stated in the repository"
      ],
      "demoNote": "Matching score is a heuristic, not a hiring probability.",
      "flow": [
        "Explore the project and its documented workflow.",
        "Review the source in the IDE or on GitHub.",
        "Follow the repository instructions to run the complete environment."
      ]
    },
    "outorga": {
      "oneLine": "Streaming catalog and license management",
      "what": "Streaming catalog and license management. Personal project. Source and setup instructions are available on GitHub.",
      "role": "Development, integration and automated testing. Team contributions are identified in the repository.",
      "highlights": [
        "Implementation: Java 21, Spring Boot, PostgreSQL",
        "Automated checks and documented workflow",
        "Scope and limitations stated in the repository"
      ],
      "demoNote": "See the repository for the local setup and demonstration scope.",
      "flow": [
        "Explore the project and its documented workflow.",
        "Review the source in the IDE or on GitHub.",
        "Follow the repository instructions to run the complete environment."
      ]
    },
    "paiol-tech": {
      "oneLine": "Rural debt management in TypeScript",
      "what": "Rural debt management in TypeScript. Personal project. Source and setup instructions are available on GitHub.",
      "role": "Development, integration and automated testing. Team contributions are identified in the repository.",
      "highlights": [
        "Implementation: Next.js 15, NestJS, CQRS",
        "Automated checks and documented workflow",
        "Scope and limitations stated in the repository"
      ],
      "demoNote": "See the repository for the local setup and demonstration scope.",
      "flow": [
        "Explore the project and its documented workflow.",
        "Review the source in the IDE or on GitHub.",
        "Follow the repository instructions to run the complete environment."
      ]
    },
    "rastro": {
      "oneLine": "Where else is the flaw they just fixed",
      "what": "Product Security research. Takes the vulnerable function and the same function after the fix and searches a codebase for variants of the flaw, telling what is still vulnerable apart from what already got the fix. Evaluated on the NIST Juliet Test Suite and two real cases: PHP (CVE-2012-1823 and CVE-2024-4577) and Spring4Shell.",
      "role": "I designed the method and the model, ran the experiment with cross-validation by CWE, reproduced the real cases and wrote the research report.",
      "highlights": [
        "Average precision of 0.748 against 0.413 for Jaccard, on CWEs unseen in training",
        "Already-fixed code in the top 10 drops from 36.4% to 2.6%",
        "Whole php-src in 24 s and spring-framework in 22 s"
      ],
      "security": [
        "No model is loaded from a file: unpickling runs code",
        "Dataset downloaded over HTTPS only and used only after its SHA-256 matches",
        "Hash-pinned dependencies; gitleaks, OSV-Scanner, Semgrep and CodeQL in CI"
      ],
      "demoNote": "Command-line tool, no hosted demo. The real cases run with rastro caso php and rastro caso spring.",
      "flow": [
        "Read the results and method in the README.",
        "Run rastro caso php and watch the 2024 flaw come back through the function fixed in 2012.",
        "Read the research report in docs/monografia.md."
      ]
    },
    "brecha": {
      "oneLine": "Intentionally vulnerable banking API, its pentest and the fixed version",
      "what": "Penetration testing lab: a banking API in Java plus Go, Django and Node services with planted OWASP API Security Top 10 flaws, the fixed version side by side and the full report. Simulated data.",
      "role": "I built the vulnerable and fixed services, ran the penetration test and wrote the report and the attack chain write-up.",
      "highlights": [
        "19 findings with CVSS 4.0, CWE, reproduction steps and fix",
        "Report in OWASP WSTG and Trail of Bits format, in Portuguese and English",
        "Attack chain: SSRF, forged token, deserialization, tunnel and Nmap on the internal network"
      ],
      "security": [
        "Every flaw has a test that exploits v1 and proves the block in v2",
        "ModSecurity WAF with the OWASP CRS and a custom rule against serialized Java objects",
        "Segmented network and blocked egress in the fixed version"
      ],
      "demoNote": "Local lab, no hosted demo: it only binds to 127.0.0.1 and uses simulated data.",
      "flow": [
        "Read the report in docs/relatorio-pentest.en.md.",
        "Run mvn test: each flaw exploited in v1 and blocked in v2.",
        "Follow the attack chain in docs/cadeia-de-ataque.en.md."
      ]
    },
    "alicerce": {
      "oneLine": "Secure-by-default Spring Boot template for every squad to start from",
      "what": "The baseline an AppSec team hands over so every new service is born with authentication, authorization, headers, errors, logging and a security pipeline already solved, along with vulnerability management, champions, advisory and vulnerability response processes.",
      "role": "I built the template, the pipeline, the anti-SSRF HTTP client, VEX generation and the process guides.",
      "highlights": [
        "OAuth 2.0 and OIDC with Keycloak, deny by default and 404 for someone else's resource",
        "Pipeline with no continue-on-error: gitleaks, Semgrep, OSV, Trivy, ZAP and cosign",
        "Signed OpenVEX generated from accepted risks"
      ],
      "security": [
        "HTTP client that refuses internal addresses, including via DNS rebinding and redirects",
        "Distroless, non-root, read-only container with images pinned by digest",
        "Problem Details errors without stack traces, ECS logs with correlation and Actuator limited to health"
      ],
      "demoNote": "Repository template, no hosted demo; the pipeline runs on every push in GitHub Actions.",
      "flow": [
        "Read the table of what comes ready in the README.",
        "See the pipeline in .github/workflows/esteira.yml.",
        "Read the processes in docs/processo/."
      ]
    },
    "crivo": {
      "oneLine": "Vulnerability triage with EPSS, KEV and deadlines, in Go",
      "what": "Pipeline CLI that merges CodeQL, Semgrep, OSV-Scanner and OWASP ZAP, removes duplicates, checks each CVE against real exploitation (CISA KEV and FIRST EPSS) and returns a queue with priority, deadline and reason, blocking the merge above the agreed threshold.",
      "role": "I built the CLI, the priority rules, time-boxed risk acceptances and the optional summary with a local model.",
      "highlights": [
        "P1 to P4 with 7 to 180 day SLAs and the reason for each decision",
        "A risk acceptance without reason or date is rejected; an expired one blocks again",
        "Go with no external dependencies, with parser fuzzing"
      ],
      "security": [
        "AI summary only with a local model; text coming from the analysed code stays out of the prompt",
        "Model output treated as untrusted: no links, images, HTML or mentions",
        "Tests with -race and fuzzing against malformed reports"
      ],
      "demoNote": "CLI with no hosted demo; it runs in CI and locally with go build.",
      "flow": [
        "Read the priority rules in the README.",
        "Run go test ./... and the parser fuzzing.",
        "See crivo -osv osv.json -falhar-em P2 failing the pipeline."
      ]
    }
  },
  "es": {
    "balcao": {
      "oneLine": "Agente de atención en WhatsApp que no inventa precios",
      "what": "Agente para tiendas de celulares que atiende, negocia y evalúa equipos usados en WhatsApp. El modelo entiende al cliente y llama funciones; precio, cuotas y canje salen de código probado.",
      "role": "Desarrollé el orquestador de la conversación, las herramientas, el auditor de salida y el panel con humano en el circuito.",
      "highlights": [
        "Function calling con motores de precio deterministas",
        "Auditor que revisa cada número antes del envío",
        "Panel para tomar la conversación, aprobar ofertas y apagar el bot"
      ],
      "demoNote": "No hay demostración publicada: el repositorio ejecuta una conversación completa con npm run demo, sin base de datos, GPU ni WhatsApp.",
      "flow": [
        "Abre el repositorio y ejecuta npm run demo.",
        "Sigue la negociación y la oferta de canje en la terminal.",
        "Lee el auditor que bloquea números inventados."
      ]
    },
    "guarita": {
      "oneLine": "Asistente con RAG y MCP, atacado y defendido",
      "what": "Asistente de soporte con búsqueda en base de conocimiento y herramientas MCP, con seis ataques del OWASP Top 10 para LLM escritos como pruebas.",
      "role": "Desarrollé el agente, el servidor MCP, los ataques y las defensas, y escribí el informe de red team.",
      "highlights": [
        "Inyección de prompt, exfiltración y herramienta adulterada como pruebas",
        "Defensas fuera del modelo: sesión, confirmación humana y hash de herramientas",
        "31 pruebas, mypy estricto e informe con formato de mercado"
      ],
      "demoNote": "Los ataques corren como pruebas contra un modelo que obedece cualquier instrucción: el peor caso, a propósito.",
      "flow": [
        "Lee el informe de red team en el repositorio.",
        "Ejecuta pytest -v tests/test_ataques.py.",
        "Compara cada ataque en la versión vulnerable y en la defendida."
      ],
      "security": [
        "Seis ataques del OWASP Top 10 para LLM (2025) escritos como pruebas",
        "Confirmación humana para acciones con efecto y dueño verificado por la sesión",
        "Herramientas MCP aprobadas por hash contra el cambio de descripción"
      ]
    },
    "cautela": {
      "oneLine": "Agente de inversiones que no recomienda ni inventa números",
      "what": "Agente que responde preguntas sobre inversiones solo con números medidos, cita la fuente y declara la limitación.",
      "role": "Desarrollé el agente, la base de hechos y el auditor que bloquea recomendaciones y números sin respaldo.",
      "highlights": [
        "Auditor de salida independiente del modelo",
        "Cada respuesta cita la fuente del número",
        "Rechazo explícito cuando no hay dato"
      ],
      "demoNote": "Se ejecuta por línea de comandos; el repositorio trae la base de hechos y las instrucciones.",
      "flow": [
        "Abre el repositorio y ejecuta la interfaz de línea de comandos.",
        "Haz una pregunta sobre fondos.",
        "Mira al auditor rechazar una recomendación."
      ]
    },
    "verbete": {
      "oneLine": "Clasificación de proyectos de ley con abstención medida",
      "what": "Clasificación multietiqueta de 4.500 proyectos de ley en 32 temas, con abstención y explicación, y la medición de una fuga de anotación.",
      "role": "Recolecté los datos, entrené y evalué el modelo, medí la fuga y armé la curva de cobertura.",
      "highlights": [
        "Fuga de anotación que inflaba el resultado un 26%",
        "Curva de cobertura: 80% respondido con micro-F1 de 0,604",
        "41 pruebas y experimentos reproducibles"
      ],
      "demoNote": "Los números y las figuras están en el repositorio; los experimentos corren en secuencia.",
      "flow": [
        "Lee el resultado principal en el README.",
        "Ejecuta los experimentos 01 a 04.",
        "Revisa la curva de abstención en las figuras."
      ]
    },
    "aurora": {
      "oneLine": "Salud de astronautas sin depender de la Tierra, para NASA Space Apps",
      "what": "Monitoreo de salud para misiones largas, hecho para el NASA International Space Apps Challenge 2026: alertas explicables contra lo normal de cada persona, radiación con datos reales y asistente sin conexión.",
      "role": "Desarrollé la arquitectura, el motor de riesgo, la seguridad y las pruebas, en dupla.",
      "highlights": [
        "Alertas contra lo normal de cada persona, no de la población",
        "Dosis de radiación con datos reales de la NASA",
        "318 pruebas unitarias y 11 de punta a punta"
      ],
      "demoNote": "Datos de tripulación simulados; la radiación y las tormentas solares son mediciones reales de la NASA y la NOAA.",
      "flow": [
        "Abre la demostración y elige un tripulante.",
        "Mira las alertas explicadas y la dosis de radiación.",
        "Consulta las fuentes científicas en el repositorio."
      ],
      "security": [
        "AES-GCM 256 con clave derivada del PIN (PBKDF2, 600 mil iteraciones)",
        "Auditoría encadenada por hash y firmada con ECDSA P-256",
        "CSP sin scripts inline, Trusted Types y pipeline con gitleaks, Semgrep, OSV y ZAP"
      ]
    },
    "almanaque": {
      "oneLine": "Guías comerciales y consola de soporte",
      "what": "Plataforma PHP y Symfony con portales separados por cliente, búsqueda, suscripciones y soporte.",
      "role": "Desarrollé el dominio, las integraciones, la consola de soporte y las pruebas.",
      "highlights": [
        "Aislamiento entre clientes y cobros idempotentes",
        "Elasticsearch con alternativa en la base de datos",
        "Triaje, problemas conocidos y versiones"
      ],
      "demoNote": "Datos de ejemplo. La búsqueda publicada usa la base de datos; Elasticsearch y cobros se evalúan localmente.",
      "flow": [
        "Busque una empresa en el directorio.",
        "Entre con la cuenta de soporte de demostración y explore los tickets.",
        "Siga la guía del repositorio para probar búsqueda y cobros localmente."
      ]
    },
    "vitrine-bauru": {
      "oneLine": "Acción social para SEDECON en Bauru: vitrina de pequeños emprendedores",
      "what": "Acción social de extensión de UNISAGRADO para SEDECON, la Secretaría Municipal de Desarrollo Económico, Turismo e Innovación de Bauru. La secretaría apoya el emprendimiento y el desarrollo económico local. La plataforma difunde pequeños negocios con catálogo, búsqueda, moderación y contacto por WhatsApp.",
      "role": "Desarrollé los servicios Java, las integraciones por eventos y la interfaz de consulta y gestión.",
      "highlights": [
        "Microservicios Spring Boot con Kafka y datos separados",
        "Moderación e indicadores de contactos",
        "Pruebas de integración y exclusión de datos"
      ],
      "demoNote": "Datos de ejemplo y API publicada. La primera respuesta puede tardar mientras inicia el servicio.",
      "flow": [
        "Busque por categoría o barrio y abra un negocio.",
        "Utilice los botones de perfil de demostración en el login.",
        "Explore la moderación y los indicadores de contactos."
      ],
      "security": [
        "Programa de AppSec: STRIDE, árbol de ataque, PASTA, DREAD, SAMM y ATT&CK",
        "Kit de Security Champions: checklist de PR seguro, capacitación y guía de triage del SAST",
        "CSP solo con 'self', límite de peticiones y saga de eliminación por la LGPD",
        "Kubernetes con Kyverno en CEL, Trivy en los manifiestos y Flux GitOps"
      ]
    },
    "feira": {
      "oneLine": "Pipeline DevSecOps con controles que bloquean, sobre pedidos en Kafka",
      "what": "Cuatro microservicios Spring Boot coordinan pedidos por eventos Kafka y, a su alrededor, un pipeline DevSecOps completo: controles que rechazan el merge, SBOM, Kubernetes con políticas y detección como código.",
      "role": "Implementé la saga, el outbox y los consumidores idempotentes, y armé el pipeline de seguridad, las reglas propias y el panel de métricas.",
      "highlights": [
        "Outbox e inbox para entregas repetidas",
        "Compensación de inventario y reembolsos",
        "Pruebas de fallos y eventos fuera de orden"
      ],
      "demoNote": "Simulación en el navegador; Java y Kafka se ejecutan localmente.",
      "flow": [
        "Realice un pedido y siga sus transiciones.",
        "Pida aceite de soja para observar el rechazo y la compensación.",
        "Ejecute Docker Compose para evaluar los servicios distribuidos."
      ],
      "security": [
        "Kafka con TLS, SASL/SCRAM y ACL por servicio",
        "Semgrep con reglas propias y falsos positivos medidos, CodeQL, OSV, gitleaks y ZAP como controles",
        "SBOM SPDX y CycloneDX, Kyverno, Falco, reglas Sigma y panel de MTTR y SLA"
      ]
    },
    "koracrm": {
      "oneLine": "CRM Laravel con embudo, tareas y auditoría",
      "what": "CRM para leads, embudo de ventas, tareas y auditoría por usuario.",
      "role": "Desarrollé la API en capas, las reglas de dominio y la interfaz React.",
      "highlights": [
        "Casos de uso separados de Eloquent",
        "Perfiles y auditoría de cambios",
        "Pruebas de dominio, integración y navegador"
      ],
      "demoNote": "Interfaz con datos de ejemplo. La API Laravel no está publicada.",
      "flow": [
        "Elija la opción de acceso de demostración.",
        "Abra un lead, recorra el embudo y consulte tareas.",
        "Ejecute la API y las pruebas con las instrucciones del repositorio."
      ]
    },
    "authcore": {
      "oneLine": "Identidad: JWT, MFA, passkeys, Keycloak y Kong, con ataques probados",
      "what": "Servicio de autenticación y autorización con rotación de tokens, MFA, passkeys, Keycloak con PKCE y Kong en el borde, y una interfaz React.",
      "role": "Implementé los flujos de autenticación, autorización y sesión, el modelo de amenazas y la prueba automatizada de los ataques.",
      "highlights": [
        "JWT HS256 y autenticación TOTP",
        "Rotación de tokens y detección de reutilización",
        "Validación y pruebas de autenticación"
      ],
      "demoNote": "Interfaz publicada. Los flujos dependen de la API; ejecute el entorno completo localmente.",
      "flow": [
        "Explore las pantallas de acceso y recuperación.",
        "Revise renovación, 2FA y autorización en el código.",
        "Ejecute el entorno completo localmente para probar el backend."
      ],
      "security": [
        "MFA por TOTP con secreto cifrado y passkeys (WebAuthn)",
        "Keycloak con PKCE, Kong en el borde y un servicio Spring que valida de nuevo: 18 ataques probados en la CI",
        "STRIDE, ASVS 5.0, CSRF, IDOR probado y CSP con Trusted Types"
      ]
    },
    "codereview-ai": {
      "oneLine": "Análisis de código asíncrono",
      "what": "Análisis de código con modelo local, cola RabbitMQ y caché Redis.",
      "role": "Desarrollé la orquestación asíncrona, el seguimiento de análisis y el caché por contenido.",
      "highlights": [
        "Spring Boot y cola de procesamiento",
        "Caché por hash del contenido",
        "Trazabilidad y pruebas automatizadas"
      ],
      "demoNote": "Sin demostración web pública. Ejecute la aplicación localmente.",
      "flow": [
        "Siga las instrucciones de ejecución local.",
        "Envíe código y siga el identificador del análisis.",
        "Revise el ejemplo seleccionado en la IDE."
      ]
    },
    "conectagente": {
      "oneLine": "Tesis de grado e investigación · seleccionado para Saruê (UNESP Bauru)",
      "what": "Mi tesis de grado e investigación universitaria en salud pública para Agentes Comunitarios de Salud, seleccionada para Saruê, incubadora de UNESP Bauru. App de campo con React Native y Expo, registros offline en SQLite, sincronización con Supabase/PostgreSQL y panel de gestión Next.js.",
      "role": "Soy responsable de la seguridad y la privacidad (autorización en la base, cifrado en el dispositivo, pinning, auditoría y LGPD) y desarrollo registro, visitas y sincronización.",
      "highlights": [
        "SQLite local para registros en campo",
        "Sincronización y acceso por perfil",
        "Seleccionado para Saruê, incubadora de UNESP Bauru"
      ],
      "demoNote": "En desarrollo. El panel requiere acceso autorizado. Utilice datos de salud ficticios.",
      "flow": [
        "Revise la arquitectura móvil y web.",
        "El panel requiere una cuenta autorizada.",
        "Pruebe los registros offline y la sincronización con datos ficticios."
      ],
      "security": [
        "Row Level Security en todas las tablas, probada como frontera en un PostgreSQL real",
        "Base del dispositivo cifrada con SQLCipher y clave en el Android Keystore",
        "Certificate pinning, lectura de datos sensibles auditada y registro inmutable",
        "LGPD para datos de salud: base legal, retención, plan de incidentes y MobSF en la CI"
      ]
    },
    "permaneia": {
      "oneLine": "Asistente académico y análisis de abandono con lógica fuzzy",
      "what": "Asistente académico y análisis de abandono con lógica fuzzy. Proyecto académico. El código y las instrucciones están disponibles en GitHub.",
      "role": "Desarrollo, integraciones y pruebas. Las contribuciones del equipo se indican en el repositorio.",
      "highlights": [
        "Implementación: Next.js 15, TypeScript, PostgreSQL",
        "Verificaciones y flujo documentado",
        "Alcance y limitaciones documentados"
      ],
      "demoNote": "La simulación ilustra un algoritmo; consulte el repositorio para ejecutar la aplicación completa.",
      "flow": [
        "Explore el proyecto y su flujo documentado.",
        "Revise el código en la IDE o en GitHub.",
        "Siga las instrucciones para ejecutar el entorno completo."
      ]
    },
    "cardiocam": {
      "oneLine": "Investigación experimental de señales cardíacas por vídeo",
      "what": "Proyecto académico de procesamiento de imágenes y señales para estudiar rPPG, calidad de señal y comparación de métodos.",
      "role": "Desarrollo el procesamiento, la evaluación y las pruebas de la herramienta experimental.",
      "highlights": [
        "Métodos clásicos y evaluación de calidad",
        "Herramientas de investigación y procesamiento de vídeo",
        "Pruebas automatizadas en Linux y Windows"
      ],
      "demoNote": "Simulación con señales sintéticas, sin cámara ni mediciones clínicamente validadas.",
      "flow": [
        "Explore el proyecto y su flujo documentado.",
        "Revise el código en la IDE o en GitHub.",
        "Siga las instrucciones para ejecutar el entorno completo."
      ]
    },
    "lastro": {
      "oneLine": "Investigación sobre dependencias financieras y su estabilidad temporal",
      "what": "Investigación en Ciencias de la Computación en UNISAGRADO. Investiga estructuras de dependencia entre instituciones financieras brasileñas mediante redes bayesianas y optimización evolutiva multiobjetivo, y su estabilidad a lo largo del tiempo.",
      "role": "Desarrollo el método, los experimentos, la evaluación y la documentación de la investigación.",
      "highlights": [
        "Redes bayesianas y optimización evolutiva multiobjetivo",
        "Comparación con métodos de referencia y estructuras conocidas",
        "Evaluación de estabilidad temporal con datos públicos de B3"
      ],
      "demoNote": "Investigación en desarrollo. Esta es una presentación pública del tema; el código y los artefactos permanecen privados.",
      "flow": [
        "Lea la presentación del tema, método y criterios de evaluación.",
        "Entre en contacto para conversar sobre la investigación; el repositorio permanece privado."
      ]
    },
    "baliza": {
      "oneLine": "Ocupación de estacionamiento mediante imágenes",
      "what": "Ocupación de estacionamiento mediante imágenes. Proyecto académico. El código y las instrucciones están disponibles en GitHub.",
      "role": "Participé en el procesamiento, la evaluación y la documentación como integrante del equipo.",
      "highlights": [
        "Implementación: Python, YOLO11, OpenCV",
        "Verificaciones y flujo documentado",
        "Alcance y limitaciones documentados"
      ],
      "demoNote": "Consulte el repositorio para la ejecución local y el alcance de la demostración.",
      "flow": [
        "Explore el proyecto y su flujo documentado.",
        "Revise el código en la IDE o en GitHub.",
        "Siga las instrucciones para ejecutar el entorno completo."
      ]
    },
    "contaflux": {
      "oneLine": "Conteo de vehículos en vídeo de cámara fija",
      "what": "Conteo de vehículos en vídeo de cámara fija. Proyecto académico. El código y las instrucciones están disponibles en GitHub.",
      "role": "Participé en el procesamiento, la evaluación y la documentación como integrante del equipo.",
      "highlights": [
        "Implementación: Python, OpenCV, NumPy",
        "Verificaciones y flujo documentado",
        "Alcance y limitaciones documentados"
      ],
      "demoNote": "La simulación ilustra un algoritmo; consulte el repositorio para ejecutar la aplicación completa.",
      "flow": [
        "Explore el proyecto y su flujo documentado.",
        "Revise el código en la IDE o en GitHub.",
        "Siga las instrucciones para ejecutar el entorno completo."
      ]
    },
    "kaida": {
      "oneLine": "Juego académico 2D en Unity",
      "what": "Juego académico 2D en Unity. Proyecto académico. El código y las instrucciones están disponibles en GitHub.",
      "role": "Desarrollo, integraciones y pruebas. Las contribuciones del equipo se indican en el repositorio.",
      "highlights": [
        "Implementación: Unity 2022.3, C#, Unity Test Framework",
        "Verificaciones y flujo documentado",
        "Alcance y limitaciones documentados"
      ],
      "demoNote": "La simulación ilustra un algoritmo; consulte el repositorio para ejecutar la aplicación completa.",
      "flow": [
        "Explore el proyecto y su flujo documentado.",
        "Revise el código en la IDE o en GitHub.",
        "Siga las instrucciones para ejecutar el entorno completo."
      ]
    },
    "bicudo": {
      "oneLine": "Juego académico de un botón en Unity",
      "what": "Juego académico de un botón en Unity. Proyecto académico. El código y las instrucciones están disponibles en GitHub.",
      "role": "Desarrollo, integraciones y pruebas. Las contribuciones del equipo se indican en el repositorio.",
      "highlights": [
        "Implementación: Unity 2022.3, C#, Unity Test Framework",
        "Verificaciones y flujo documentado",
        "Alcance y limitaciones documentados"
      ],
      "demoNote": "La simulación ilustra un algoritmo; consulte el repositorio para ejecutar la aplicación completa.",
      "flow": [
        "Explore el proyecto y su flujo documentado.",
        "Revise el código en la IDE o en GitHub.",
        "Siga las instrucciones para ejecutar el entorno completo."
      ]
    },
    "laboratorio-vr": {
      "oneLine": "Laboratorio de química en realidad virtual",
      "what": "Laboratorio de química en realidad virtual. Proyecto académico. El código y las instrucciones están disponibles en GitHub.",
      "role": "Desarrollo, integraciones y pruebas. Las contribuciones del equipo se indican en el repositorio.",
      "highlights": [
        "Implementación: Unity, C#, Google Cardboard",
        "Verificaciones y flujo documentado",
        "Alcance y limitaciones documentados"
      ],
      "demoNote": "Consulte el repositorio para la ejecución local y el alcance de la demostración.",
      "flow": [
        "Explore el proyecto y su flujo documentado.",
        "Revise el código en la IDE o en GitHub.",
        "Siga las instrucciones para ejecutar el entorno completo."
      ]
    },
    "jis": {
      "oneLine": "Agregador de empleo con filtros y puntuación",
      "what": "Agregador de empleo con filtros y puntuación. Proyecto propio. El código y las instrucciones están disponibles en GitHub.",
      "role": "Desarrollo, integraciones y pruebas. Las contribuciones del equipo se indican en el repositorio.",
      "highlights": [
        "Implementación: Next.js 15, React 19, TypeScript",
        "Verificaciones y flujo documentado",
        "Alcance y limitaciones documentados"
      ],
      "demoNote": "La puntuación es una heurística, no una probabilidad de contratación.",
      "flow": [
        "Explore el proyecto y su flujo documentado.",
        "Revise el código en la IDE o en GitHub.",
        "Siga las instrucciones para ejecutar el entorno completo."
      ]
    },
    "outorga": {
      "oneLine": "Catálogo de streaming y gestión de licencias",
      "what": "Catálogo de streaming y gestión de licencias. Proyecto propio. El código y las instrucciones están disponibles en GitHub.",
      "role": "Desarrollo, integraciones y pruebas. Las contribuciones del equipo se indican en el repositorio.",
      "highlights": [
        "Implementación: Java 21, Spring Boot, PostgreSQL",
        "Verificaciones y flujo documentado",
        "Alcance y limitaciones documentados"
      ],
      "demoNote": "Consulte el repositorio para la ejecución local y el alcance de la demostración.",
      "flow": [
        "Explore el proyecto y su flujo documentado.",
        "Revise el código en la IDE o en GitHub.",
        "Siga las instrucciones para ejecutar el entorno completo."
      ]
    },
    "paiol-tech": {
      "oneLine": "Gestión de deudas rurales en TypeScript",
      "what": "Gestión de deudas rurales en TypeScript. Proyecto propio. El código y las instrucciones están disponibles en GitHub.",
      "role": "Desarrollo, integraciones y pruebas. Las contribuciones del equipo se indican en el repositorio.",
      "highlights": [
        "Implementación: Next.js 15, NestJS, CQRS",
        "Verificaciones y flujo documentado",
        "Alcance y limitaciones documentados"
      ],
      "demoNote": "Consulte el repositorio para la ejecución local y el alcance de la demostración.",
      "flow": [
        "Explore el proyecto y su flujo documentado.",
        "Revise el código en la IDE o en GitHub.",
        "Siga las instrucciones para ejecutar el entorno completo."
      ]
    },
    "rastro": {
      "oneLine": "Dónde más está la falla que acaban de corregir",
      "what": "Investigación en Product Security. Recibe la función vulnerable y la misma función corregida y busca variantes de la falla en una base de código, separando lo que sigue vulnerable de lo que ya recibió la corrección. Evaluado en la Juliet Test Suite del NIST y en dos casos reales: PHP (CVE-2012-1823 y CVE-2024-4577) y Spring4Shell.",
      "role": "Desarrollé el método y el modelo, el experimento con validación cruzada por CWE, los casos reales y el informe de la investigación.",
      "highlights": [
        "Precisión media de 0,748 frente a 0,413 de Jaccard, en CWE no vistas en el entrenamiento",
        "El código ya corregido en el top 10 baja de 36,4% a 2,6%",
        "php-src completo en 24 s y spring-framework en 22 s"
      ],
      "security": [
        "Ningún modelo se carga desde archivo: deserializar pickle ejecuta código",
        "Conjunto de datos descargado solo por HTTPS y usado solo con el SHA-256 verificado",
        "Dependencias instaladas con hash; gitleaks, OSV-Scanner, Semgrep y CodeQL en la CI"
      ],
      "demoNote": "Herramienta de línea de comandos, sin demostración publicada. Los casos reales se ejecutan con rastro caso php y rastro caso spring.",
      "flow": [
        "Lea el resultado y la metodología en el README.",
        "Ejecute rastro caso php y vea la falla de 2024 volver por la función corregida en 2012.",
        "Lea el informe de la investigación en docs/monografia.md."
      ]
    },
    "brecha": {
      "oneLine": "API bancaria vulnerable a propósito, su pentest y la versión corregida",
      "what": "Laboratorio de pruebas de intrusión: una API bancaria en Java y servicios en Go, Django y Node con fallas plantadas de la OWASP API Security Top 10, la versión corregida al lado y el informe completo. Datos simulados.",
      "role": "Construí los servicios vulnerables y los corregidos, hice la prueba de intrusión y escribí el informe y el write-up de la cadena de ataque.",
      "highlights": [
        "19 hallazgos con CVSS 4.0, CWE, pasos de reproducción y corrección",
        "Informe en formato OWASP WSTG y Trail of Bits, en portugués e inglés",
        "Cadena de ataque: SSRF, token falsificado, deserialización, túnel y Nmap en la red interna"
      ],
      "security": [
        "Cada falla tiene una prueba que explota la v1 y demuestra el bloqueo en la v2",
        "WAF ModSecurity con OWASP CRS y regla propia contra objetos Java serializados",
        "Red segmentada y salida bloqueada en la versión corregida"
      ],
      "demoNote": "Laboratorio local, sin demostración publicada: solo escucha en 127.0.0.1 y usa datos simulados.",
      "flow": [
        "Lea el informe en docs/relatorio-pentest.en.md.",
        "Ejecute mvn test: cada falla explotada en la v1 y bloqueada en la v2.",
        "Siga la cadena de ataque en docs/cadeia-de-ataque.en.md."
      ]
    },
    "alicerce": {
      "oneLine": "Plantilla Spring Boot segura por defecto, para que cada squad parta de ella",
      "what": "La base que un equipo de AppSec entrega para que cada servicio nuevo nazca con autenticación, autorización, cabeceras, errores, logs y pipeline de seguridad resueltos, junto con los procesos de gestión de vulnerabilidades, champions, advisory y respuesta a vulnerabilidades.",
      "role": "Desarrollé la plantilla, el pipeline, el cliente HTTP anti-SSRF, la generación de VEX y las guías de proceso.",
      "highlights": [
        "OAuth 2.0 y OIDC con Keycloak, denegación por defecto y 404 para recurso ajeno",
        "Pipeline sin continue-on-error: gitleaks, Semgrep, OSV, Trivy, ZAP y cosign",
        "OpenVEX firmado generado a partir de los riesgos aceptados"
      ],
      "security": [
        "Cliente HTTP que rechaza direcciones internas, incluso por DNS rebinding y redirecciones",
        "Contenedor distroless, sin root y de solo lectura, con imágenes por digest",
        "Errores en Problem Details sin pila, logs ECS con correlación y Actuator solo con health"
      ],
      "demoNote": "Plantilla de repositorio, sin demostración publicada; el pipeline se ejecuta en cada push en GitHub Actions.",
      "flow": [
        "Lea la tabla de lo que viene listo en el README.",
        "Vea el pipeline en .github/workflows/esteira.yml.",
        "Lea los procesos en docs/processo/."
      ]
    },
    "crivo": {
      "oneLine": "Triage de vulnerabilidades con EPSS, KEV y plazos, en Go",
      "what": "CLI de pipeline que une CodeQL, Semgrep, OSV-Scanner y OWASP ZAP, elimina duplicados, cruza cada CVE con explotación real (KEV de CISA y EPSS de FIRST) y devuelve una cola con prioridad, plazo y motivo, bloqueando el merge por encima del límite acordado.",
      "role": "Desarrollé la CLI, las reglas de prioridad, las aceptaciones de riesgo con plazo y el resumen opcional con un modelo local.",
      "highlights": [
        "P1 a P4 con SLA de 7 a 180 días y el motivo de cada decisión",
        "Una aceptación de riesgo sin motivo o fecha se rechaza; vencida vuelve a bloquear",
        "Go sin dependencias externas, con fuzzing del parser"
      ],
      "security": [
        "Resumen con IA solo con modelo local; el texto que viene del código analizado queda fuera del prompt",
        "Respuesta del modelo tratada como no confiable: sin enlaces, imágenes, HTML ni menciones",
        "Pruebas con -race y fuzzing contra informes malformados"
      ],
      "demoNote": "CLI sin demostración publicada; se ejecuta en la CI y localmente con go build.",
      "flow": [
        "Lea las reglas de prioridad en el README.",
        "Ejecute go test ./... y el fuzzing del parser.",
        "Vea crivo -osv osv.json -falhar-em P2 bloqueando el pipeline."
      ]
    }
  }
};
