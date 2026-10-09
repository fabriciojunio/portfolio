export interface TextoDoProjeto {
  oneLine: string;
  what: string;
  role: string;
  highlights: string[];
  demoNote: string;
  flow: string[];
}
export const TRADUCOES: Record<"en" | "es", Record<string, TextoDoProjeto>> = {
  "en": {
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
      "oneLine": "Entrepreneur listings with moderation and direct contact",
      "what": "UNISAGRADO outreach project for entrepreneurs served by SEDECON in Bauru: listings, search, moderation and WhatsApp contact.",
      "role": "I developed Java services, event integrations and the browsing and management interface.",
      "highlights": [
        "Spring Boot and event integration",
        "Registration moderation and contact indicators",
        "Integration tests and data deletion workflow"
      ],
      "demoNote": "Demo data and deployed API. The first request may take time while the service starts.",
      "flow": [
        "Search by category or district and open a business.",
        "Use the demo profile buttons on the login screen.",
        "Explore moderation and contact indicators."
      ]
    },
    "feira": {
      "oneLine": "Java orders with events and compensating actions",
      "what": "Four Spring Boot services coordinate orders, inventory, payments and queries through Kafka events.",
      "role": "I implemented the order saga, transactional outbox and idempotent consumers.",
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
      "oneLine": "Node.js authentication with JWT, 2FA and roles",
      "what": "Authentication API with token rotation, role-based access, Redis and a React interface.",
      "role": "I implemented authentication, authorization and session renewal flows.",
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
      "oneLine": "Offline home visits with data synchronization",
      "what": "Undergraduate research for Community Health Agents. React Native and Expo, local SQLite, Supabase/PostgreSQL and a Next.js dashboard. Selected by the Saruê incubator at UNESP Bauru.",
      "role": "I develop registration, visits, synchronization, access roles and audit records.",
      "highlights": [
        "Local SQLite for field registration",
        "Synchronization and role-based access",
        "Management dashboard and audit trail"
      ],
      "demoNote": "Under development. The web dashboard requires authorized access. Use fictional health data.",
      "flow": [
        "Review the mobile and web architecture.",
        "The dashboard requires an authorized account.",
        "Test offline registration and synchronization locally with fictional data."
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
      "what": "Experimental cardiac signal research from video. Academic project. Source and setup instructions are available on GitHub.",
      "role": "Development, integration and automated testing. Team contributions are identified in the repository.",
      "highlights": [
        "Implementation: Python, OpenCV, NumPy",
        "Automated checks and documented workflow",
        "Scope and limitations stated in the repository"
      ],
      "demoNote": "Synthetic signal simulation, without camera processing or clinically validated measurements.",
      "flow": [
        "Explore the project and its documented workflow.",
        "Review the source in the IDE or on GitHub.",
        "Follow the repository instructions to run the complete environment."
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
    }
  },
  "es": {
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
        "Siga el roteiro del repositorio para probar búsqueda y cobros localmente."
      ]
    },
    "vitrine-bauru": {
      "oneLine": "Vitrina de emprendedores con moderación y contacto directo",
      "what": "Proyecto de extensión de UNISAGRADO para emprendedores atendidos por SEDECON en Bauru: catálogo, búsqueda, moderación y WhatsApp.",
      "role": "Desarrollé los servicios Java, las integraciones por eventos y la interfaz de consulta y gestión.",
      "highlights": [
        "Spring Boot e integración por eventos",
        "Moderación e indicadores de contactos",
        "Pruebas de integración y exclusión de datos"
      ],
      "demoNote": "Datos de ejemplo y API publicada. La primera respuesta puede tardar mientras inicia el servicio.",
      "flow": [
        "Busque por categoría o barrio y abra un negocio.",
        "Utilice los botones de perfil de demostración en el login.",
        "Explore la moderación y los indicadores de contactos."
      ]
    },
    "feira": {
      "oneLine": "Pedidos Java con eventos y compensaciones",
      "what": "Cuatro servicios Spring Boot coordinan pedidos, inventario, pagos y consultas mediante Kafka.",
      "role": "Implementé la saga de pedidos, el outbox transaccional y los consumidores idempotentes.",
      "highlights": [
        "Outbox e inbox para entregas repetidas",
        "Compensación de inventario y reembolsos",
        "Pruebas de fallos y eventos fuera de orden"
      ],
      "demoNote": "Simulación en el navegador; Java y Kafka se ejecutan localmente.",
      "flow": [
        "Realice un pedido y siga sus transiciones.",
        "Pida aceite de soja para observar la recusa y la compensación.",
        "Ejecute Docker Compose para evaluar los servicios distribuidos."
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
      "oneLine": "Autenticación Node.js con JWT, 2FA y perfiles",
      "what": "API de autenticación con rotación de tokens, acceso por perfil, Redis e interfaz React.",
      "role": "Implementé los flujos de autenticación, autorización y renovación de sesión.",
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
      "oneLine": "Visitas domiciliarias offline con sincronización",
      "what": "Investigación para Agentes Comunitarios de Salud: React Native y Expo, SQLite local, Supabase/PostgreSQL y panel Next.js. Seleccionado por Saruê, incubadora de UNESP Bauru.",
      "role": "Desarrollo registros, visitas, sincronización, perfiles y auditoría.",
      "highlights": [
        "SQLite local para registros en campo",
        "Sincronización y acceso por perfil",
        "Panel de gestión y auditoría"
      ],
      "demoNote": "En desarrollo. El panel requiere acceso autorizado. Utilice datos de salud ficticios.",
      "flow": [
        "Revise la arquitectura móvil y web.",
        "El panel requiere una cuenta autorizada.",
        "Pruebe los registros offline y la sincronización con datos ficticios."
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
      "what": "Investigación experimental de señales cardíacas por vídeo. Proyecto académico. El código y las instrucciones están disponibles en GitHub.",
      "role": "Desarrollo, integraciones y pruebas. Las contribuciones del equipo se indican en el repositorio.",
      "highlights": [
        "Implementación: Python, OpenCV, NumPy",
        "Verificaciones y flujo documentado",
        "Alcance y limitaciones documentados"
      ],
      "demoNote": "Simulación con señales sintéticas, sin cámara ni mediciones clínicamente validadas.",
      "flow": [
        "Explore el proyecto y su flujo documentado.",
        "Revise el código en la IDE o en GitHub.",
        "Siga las instrucciones para ejecutar el entorno completo."
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
    }
  }
};
