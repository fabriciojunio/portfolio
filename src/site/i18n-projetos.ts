/**
 * Tradução do texto dos projetos.
 *
 * Fica separado do data.ts de propósito. O data.ts é o conteúdo em português,
 * que é onde eu penso e escrevo; aqui é a versão para quem não lê português.
 * Misturar os três idiomas no mesmo objeto tornaria impossível revisar o texto
 * original sem tropeçar em duas traduções a cada campo.
 *
 * O que não entra aqui, de propósito: nome de projeto, nome de tecnologia e os
 * trechos de código. Nome próprio traduzido vira outro projeto, e comentário de
 * código traduzido deixa de bater com o repositório que a pessoa vai abrir.
 *
 * O teste em site.test.ts cobra que todo projeto tenha os dois idiomas, com o
 * mesmo número de destaques do português. Sem isso, um projeto novo entra e o
 * site em inglês simplesmente não mostra nada onde deveria.
 */

export interface TextoDoProjeto {
  oneLine: string;
  what: string;
  role: string;
  highlights: string[];
}

const en: Record<string, TextoDoProjeto> = {
  feira: {
    oneLine: "Event-driven orders with a saga that compensates",
    what: "Four Spring Boot services talking over Kafka. Each owns its database and none reads another's tables. The saga has to survive messages that arrive twice, out of order, or late, and a MongoDB read model answers in one query what previously required joining three services in the browser.",
    role: "I wrote all of it: the sealed event contracts, the shared transactional outbox, the idempotent consumer, the order saga and the projection that feeds the read model. The hardest case was the race where a payment is approved while the order is being cancelled, which ends in a refund.",
    highlights: [
      "Distributed tracing survives the outbox: the context is stored in a column and propagated in a Kafka header, otherwise it dies at commit and the dashboard shows loose traces instead of one whole saga",
      "Outbox using SELECT FOR UPDATE SKIP LOCKED, so several instances can run at once",
      "Concurrency proven with ten real threads against a real PostgreSQL",
      "A MongoDB read model whose document is derived from the events, so it can be thrown away and rebuilt from the topic",
      "CI spins up a real Kubernetes cluster and applies the manifests, on top of validating the Terraform",
      "A migration that drops or renames a column fails the build: the rollout is gradual and the old version's dispatcher keeps reading the outbox during the swap",
      "187 tests, none of which need Docker installed",
    ],
  },
  outorga: {
    oneLine: "White-label streaming: no licence, no air time",
    what: "A multi-tenant streaming platform. One rule organises the whole system: nothing goes on air without a current licence covering the territory and the exhibition window.",
    role: "I modelled the entire domain. Publishing is the only door to the air, and it takes the licence in the method signature, so no code path can publish without one. An hourly sweep pulls down whatever expired and restores whatever was renewed.",
    highlights: [
      "Domain without a single line of Spring, enforced by an architecture test",
      "Every repository takes the tenant in its signature, never from a context variable",
      "Data-protection export and anonymisation implemented, not promised",
      "A migration that drops or renames a column fails the build: during a deploy both versions run together, and a column that disappears here denies content to someone who paid for it",
      "275 tests against a real PostgreSQL",
    ],
  },
  "codereview-ai": {
    oneLine: "Automated code review with a local LLM",
    what: "A platform that reviews Java, Python and JavaScript using Ollama. It flags bugs, code smells and SOLID violations. Work runs through RabbitMQ with a 24-hour Redis cache.",
    role: "I built the asynchronous orchestrator (RabbitMQ queue plus a ticket ID) and the cache keyed by a hash of the submitted code.",
    highlights: [
      "Asynchronous processing through a RabbitMQ queue, one ticket ID per review",
      "24-hour Redis cache keyed by the SHA-256 of the code, so nothing is analysed twice",
      "The request's trace rides in the message header: without it the queue wait, the largest slice of the user's wait, falls into the gap between two unrelated traces",
      "One trace span per database query, by wrapping the DataSource, which is what makes an N+1 visible",
      "A migration that drops or renames a column fails the build: during the swap the consumer is halfway through work it already accepted",
    ],
  },
  "paiol-tech": {
    oneLine: "SaaS for managing farm debt",
    what: "A SaaS for farmers. Passwordless login by magic link, WhatsApp alerts and Open Finance. A Turborepo monorepo with NestJS (Clean Architecture plus CQRS) and a Next.js PWA.",
    role: "I modelled the Debt aggregate with its domain events, and the CQRS handler that fires the WhatsApp notification when a debt comes due.",
    highlights: [
      "Magic link: no password, just one click from the email",
      "A domain event fires the WhatsApp notification automatically on the due date",
    ],
  },
  "guarda-banco": {
    oneLine: "A latch inside the server against accidental DELETE and UPDATE",
    what: "Protection installed in the database itself: every DELETE or UPDATE has a cap on rows affected per statement, and going over it aborts the transaction. Because the rule lives in the server, it holds the same in DBeaver, Workbench, SSMS or psql. Scripts for PostgreSQL, MySQL and SQL Server.",
    role: "I set the core idea: cap by rows affected rather than hunting for DELETE without WHERE. Also the nesting-level control, which makes a cascade count against the statement that started it, and the local panel for granting an exception.",
    highlights: [
      "A row cap also covers a WHERE that is too broad, an OR where AND was meant, and an unexpected cascade",
      "Aborts in BEFORE ROW: it fails on the row past the cap, without materialising everything first",
      "ON DELETE CASCADE counts against the originating statement rather than resetting the counter",
      "Lifting the protection requires a written reason and lasts only inside that transaction",
    ],
  },
  authcore: {
    oneLine: "RS256 JWT, refresh rotation with a blacklist and TOTP 2FA in Node.js",
    what: "A Node.js backend on Clean Architecture with RS256 JWT, TOTP two-factor through speakeasy, RBAC across three roles and a Redis blacklist. React 18 and Vite on the front.",
    role: "I built the refresh-token rotation backed by a Redis blacklist: every refresh issues a new pair and invalidates the previous one.",
    highlights: [
      "Asymmetric RS256 JWT plus TOTP 2FA: the private key never leaves the server",
      "Refresh rotation: each issue invalidates the last one, closing the replay window",
    ],
  },
  "quantbot-ml": {
    oneLine: "Passive income that trades on its own (on paper) and learns from news and outcomes",
    what: "A dividend-investing system in the Barsi/Bazin tradition that trades with simulated money and learns from its own hits and misses. It combines real fundamentals (Fundamentus, the whole Brazilian exchange), central-bank macro data and around 28 news sources, reads sentiment with FinBERT-PT-BR, and runs daily in the cloud through GitHub Actions, producing reports and an auditable track record.",
    role: "I built the autonomous loop end to end: the paper portfolio that follows the screener, the feedback module that learns which kinds of pick beat the benchmark rate, the multi-source data and news layer, and the cloud automation. I reused the existing anti-overfitting validation base.",
    highlights: [
      "Runs itself in the cloud through GitHub Actions: decides, records and learns every day, with no server",
      "Feedback loop: measures every pick against the benchmark rate and adjusts the score as it hits or misses",
      "Free multi-source data: Fundamentus for dividend yield across the exchange, the central bank for macro, and around 28 news feeds",
      "News sentiment with FinBERT-PT-BR on PyTorch, with a lexicon fallback that needs no GPU",
    ],
  },
  balcao: {
    oneLine: "A WhatsApp sales assistant where the model never writes a number",
    what: "Support, negotiation and trade-in appraisal over WhatsApp for phone shops. The model understands the customer and picks the strategy for the conversation, but the cash price, the instalment plan, the maximum discount and the trade-in value all come from deterministic functions. The final message still passes an auditor before it is sent.",
    role: "I designed the output auditor, the pricing and trade-in engines, and the guards that run before the model at all: exit requests, requests for a human, and scope.",
    highlights: [
      "The model returns text with placeholders; the domain is what computes the value",
      "The auditor rejects any digit that cannot be traced to a recorded lookup",
      "Two rejections in the same conversation escalate to a human",
      "A trade-in figure only leaves with the pre-appraisal disclaimer consumer law requires",
    ],
  },
  "apontamento-horas": {
    oneLine: "Multi-user time tracking with RBAC, SLA and dashboards",
    what: "A platform for logging hours per client, with multiple users and roles (admin, project manager, analyst, viewer), automatic SLA tracking, control dashboards, an audit trail and Excel reports for finance.",
    role: "I built the multi-user authentication with bcrypt and JWT, the role-based access control, the automatic SLA and the audit layer.",
    highlights: [
      "Multi-user with RBAC: admin, project manager, analyst and viewer",
      "Each person sees only their own entries; managers and admins get the consolidated team view",
      "Automatic SLA: pending (0-2 days), warning (2-5 days), overdue (5 days and up)",
      "Monthly Excel export for finance, plus an audit log of every action",
    ],
  },
  registraservico: {
    oneLine: "Service logging with configurable types and fields",
    what: "A multi-tenant system for recording services delivered, built for public bodies and field teams. Service types and the fields on each form are configured by the organisation rather than written into the code. Audit trail, BI export, and a PWA that installs without an app store.",
    role: "I modelled the configurable schema (service type, custom fields, and the record itself as validated JSON) and wrote the dynamic validator that checks incoming data against the field definitions stored in the database.",
    highlights: [
      "The form is not in the code, it is in the database: the same engine serves another organisation with no rewrite",
      "JWT checked in edge middleware, with immediate session revocation",
      "Four-role RBAC: admin, manager, operator and viewer",
      "Two taps to file a record in the field, with CSV export for Power BI",
    ],
  },
  conectagente: {
    oneLine: "Undergraduate research: offline field data collection for community health workers",
    what: "An undergraduate research project, incubated at Saruê (UNESP Bauru). It collects field data with no internet connection (SQLite with WAL and FTS) and syncs once back online. It never went to the field with an actual health worker: this is research, not a product in use.",
    role: "I designed the sync engine (an outbox pattern with retries and conflict resolution) and the SQLite schema with FTS indexes for offline search.",
    highlights: [
      "Outbox pattern with retry and conflict resolution: sync survives having no signal at all",
      "SQLite WAL plus FTS for offline search without a single network call",
    ],
  },
  permaneia: {
    oneLine: "A study assistant with RAG and an early warning for dropout risk",
    what: "Two fronts against university dropout. An assistant that answers student questions from the official course documents, citing the source, and that says when the answer is not in the material instead of guessing an exam date. And a dashboard that ranks the class by dropout risk computed with fuzzy logic.",
    role: "I wrote the Mamdani fuzzy inference engine from scratch, with no library, and the entire RAG layer: chunking by unit of information, hybrid retrieval with rank fusion, a relevance threshold, the schedule computed in code, and the defences against prompt injection.",
    highlights: [
      "A student averaging 8.6 with 34% attendance is flagged high risk; the grade-only criterion that registrars actually use would call them fine",
      "The question log exposed a defect the panel had missed: \"When is exam P1?\" answered while \"when is the exam\" refused, at the same similarity. Retrieval gained a second arm, by term matching",
      "Calendar questions are not answered by the model: \"when is the next class\" is resolved in code, over the dates in the material itself, and the model only writes it up",
      "When the material has no answer, it still answers about the university and the subject, and the warning that this has no source is written by the code, not by the model",
      "Works with no API key: in degraded mode it transcribes the document rather than composing, which is stricter still about not inventing",
      "2,093 tests and nine documented defects, one of which existed only in the published artefact and not in the source",
    ],
  },
  "vitrine-bauru": {
    oneLine: "A shop window for Bauru's small businesses, in four Spring services",
    what: "A university extension project with SEDECON, the city's economic development department. The owner registers the business, the department checks and approves it, and the shop goes into a public window where the customer talks straight to whoever makes the product, on WhatsApp. Four Spring Boot services, each with its own database, talking over events, plus an edge gateway and a React front end.",
    role: "I wrote the whole system: the sealed event contracts, the shared outbox and inbox, the registration state machine, the LGPD deletion saga, the projection that feeds the public search and the entire interface. Also the transport decision that lets the same code run with Kafka, with Amazon SNS and with no broker at all.",
    highlights: [
      "Event transport is one interface with three adapters: Kafka where a broker exists, Amazon SNS on the managed deployment, and an in-process call when there is no broker at all",
      "Distributed tracing survives the outbox: the context goes into a column and then into a Kafka header or an SNS attribute, because the event is published by another thread and the context would die at commit",
      "The third adapter came out of a mistake of mine: I had written in the decision record that no managed messaging had a permanent free tier, because I searched for managed Kafka instead of searching for the problem. SNS and SQS are permanently free on AWS, and the adapter went in without touching the outbox, the inbox or any consumer",
      "Deleting personal data under LGPD is a saga with a deadline and retries: three services have to confirm the erasure before the request can close",
      "The failed-password counter and the session revocation write in their own transaction, because the exception that triggered them rolled both back; an integration test is what caught it",
      "The document field accepts the alphanumeric CNPJ that came into force in July 2026, with the check digit computed from the ASCII value minus 48",
      "1,042 green tests with no Docker required: embedded PostgreSQL and embedded Kafka start inside the test itself",
      "Thirteen architecture rules enforced by ArchUnit, one of them being that no controller returns a JPA entity",
      "Deployed end to end on free tiers: database on Neon, containerised API on Render and the site on Vercel, behind a three-stage CI",
      "The Kubernetes manifests had an autoscaler pointing at a Deployment that did not exist; I wrote a coherence check that runs in CI with no cluster and fails on exactly that case",
    ],
  },
  cardiocam: {
    oneLine: "Measures heart rate from video, without touching the person",
    what: "It estimates heart rate from the colour shift in skin caused by blood flow, captured on an ordinary webcam. The technique is remote photoplethysmography (rPPG). It implements and compares four algorithms from the literature: GREEN, CHROM, POS and ICA.",
    role: "I built the whole path, from cropping the face to the number on screen, and the comparison between the four algorithms. Also the background correction, which is what holds the measurement up when automatic white balance is on.",
    highlights: [
      "Four rPPG algorithms compared in the same pipeline, with POS as the default for being the most reliable",
      "The wall behind the person has no pulse: what oscillates there is ambient light, and that is a direct measure of the interference",
      "With white balance oscillating inside the cardiac band, accuracy went from 1 in 16 without background correction to 16 in 16 with it",
      "The pulse varies between 0.1% and 1% of intensity, below the noise of a single pixel: spatial averaging is what makes the signal appear",
    ],
  },
  contaflux: {
    oneLine: "Counts vehicles in fixed-camera video by line crossing",
    what: "It counts cars passing along a road from fixed-camera footage. Each vehicle is tracked frame by frame and counted exactly once, at the moment it crosses a line in the scene. It splits by direction, reports the vehicle type and estimates speed. Two detectors: background subtraction, which runs with nothing installed, and YOLO recognition.",
    role: "I wrote the detection, the tracking and the counting rule, plus the automatic inference of where the line should sit based on the traffic itself. Also the integration of recognition as an alternative to background subtraction.",
    highlights: [
      "The counting line is inferred from traffic: the program watches for a few seconds and places it perpendicular to the flow, with nobody clicking",
      "Two detectors asking different questions: motion asks whether something moved, recognition asks whether that is a car",
      "A dark car on dark asphalt was classified as shadow by MOG2 and vanished from the count; solved with two masks",
      "Validated against synthetic scenes with known ground truth, plus five real videos checked by watching the boxes on screen",
    ],
  },
  mycondpets: {
    oneLine: "Pet management for residential buildings",
    what: "Google OAuth login, registration of owners and pets, a noticeboard for lost and found, and an admin panel with statistics.",
    role: "I handled the role-guard middleware (only building manager and admin reach /admin) and the modelling of the Owner/Pet/Notice domain.",
    highlights: [
      "Middleware blocks /admin for any role other than building manager or admin",
      "Google OAuth login: no manual sign-up, no password to manage",
    ],
  },
  kaida: {
    oneLine: "A 2D metroidvania in Unity, with the game assembled by code",
    what: "A 2D metroidvania with six scenes, abilities that unlock paths, a single-encounter boss with one health bar, three attempts per run, three difficulty levels and autosave at rest points. The project generates its own assets: an editor menu slices the sprites and builds the animations, prefabs, tiles and scenes from code.",
    role: "I handled the player controller (a state machine, one file per state), the boss, and the editor generators that assemble the whole game from code.",
    highlights: [
      "The game is assembled by editor scripts: the repository holds the recipe, not the binary scene file nobody can review",
      "Coyote time and jump buffering: the jump still counts for a moment after leaving the ledge, and a command given mid-air waits for the ground",
      "A state machine with one file per player state, instead of a chain of conditions inside Update",
      "The difficulty chosen in the menu lands on a copy of the stats, never on the original asset, which would write the change to disk",
      "A Windows build published in releases, so it can be played without the engine",
    ],
  },
  bicudo: {
    oneLine: "A one-button game in Unity, with a scene that measures itself against the screen",
    what: "A one-button game in the Flappy Bird lineage: the bird falls on its own, rises when the player says so, and the run ends on the first contact. A single scene for all three states, art sliced by script, four sound effects generated by synthesis and no audio file in the repository.",
    role: "A solo project: I did all of it, from slicing the sprites and assembling the scene in code through to the tests and the executable.",
    highlights: [
      "The impulse replaces vertical velocity rather than adding to it: two taps in a row rise as much as one, and the game becomes about rhythm",
      "No Rigidbody2D. Collision is a circle query every frame, because anything moved by transform passes through the pipe between two frames without firing an event",
      "The scene measures the visible width at runtime and redoes the maths if the screen changes: with bounds fixed in the scene, the floor slid off the edge and pipes appeared out of nowhere in front of the bird on an ultrawide monitor",
      "The four sound effects are synthesised at startup, which avoids a third-party licence in a game where four beeps do the job",
      "46 tests, three of which open the scene that ships in the executable: the score once sat at zero for an entire run while the tests called the scoring method directly and passed green",
    ],
  },
  "laboratorio-vr": {
    oneLine: "A VR chemistry lab with gaze-based interaction",
    what: "A chemistry lab in VR built in Unity, with gaze interaction and support for Google Cardboard and the phone's gyroscope. Looking at an object shows information; looking at a teleport point fills it green and moves you. Android build.",
    role: "I implemented the gaze control (a raycast from the camera), the teleport points with a dwell timer, and the camera control by gyroscope or touch.",
    highlights: [
      "Gaze interaction: a raycast from the camera detects objects in the field of view",
      "Dwell teleport: the point fills green as you keep looking at it",
    ],
  },
  jis: {
    oneLine: "A job aggregator that estimates the real odds of each posting",
    what: "It collects jobs from eight public sources without needing an API key, discards what has no chance (stale postings, seniority above reach, regions that will not hire from Brazil) and builds a résumé prompt tailored to whatever survives.",
    role: "I set the cut-off criteria from recruiting research rather than guesswork: minimum stack overlap, the window before a posting becomes a ghost, and the region filter. Anything failing one of those is not scored, it is discarded.",
    highlights: [
      "Eight real sources, among them LinkedIn, Remotive, RemoteOK and WeWorkRemotely",
      "Postings older than 30 days are discarded: ghost jobs run between 20% and 35% of everything published",
      "No database: jobs arrive live with a 30-minute cache and the funnel lives in the browser",
    ],
  },
  goldata: {
    oneLine: "Football analytics with machine learning",
    what: "A football analysis platform with expected goals, expected assists, pressing metrics and passing networks. A FastAPI service with JWT, rate limiting and per-match caching.",
    role: "I modelled expected goals in XGBoost, calibrated over roughly 80,000 shots from the Brazilian first division. I built the passing network with NetworkX, covering centrality and creation hubs.",
    highlights: [
      "Around 80,000 first-division shots in the training set",
      "Expected goals calibrated with isotonic regression, Brier score under 0.18",
    ],
  },
  "goldata-pro": {
    oneLine: "Value bets with an ML ensemble and SHA-256 auditing",
    what: "A Dixon-Coles and Elo engine, weighted 60/40, that finds value bets with an edge above 4%. It sizes stakes with fractional Kelly at one quarter and publishes picks to Telegram. A public site shows a history auditable by hash.",
    role: "I handled the detection engine and Kelly sizing, the feedback loop that adjusts the minimum edge from accumulated return, and the public audit hash.",
    highlights: [
      "A 4% minimum edge filters statistical noise before anything is published",
      "Quarter Kelly for risk management on stake size",
      "Public auditing: every pick signed with SHA-256",
    ],
  },
  sintonia: {
    oneLine: "A social network where the conversation turns on whatever is playing",
    what: "A monorepo with a NestJS API, a Next.js site and an Expo app. Live now-playing status, conversations with ephemeral messages (by TTL or single view), streaks and a group pet. Integration with music services is a port with adapters.",
    role: "I built the foundation: Clean Architecture in the API, the music-provider port with its adapters, the pure domain for ephemerality and streaks, and the data-protection layer (export, deletion with anonymisation, and media purging).",
    highlights: [
      "A music port with adapters: Last.fm as the primary, because Spotify caps new apps at 25 users",
      "Ephemeral messages expire by TTL or on read, and the purge job actually deletes",
      "Gamification domain kept pure, with no framework, tested outside NestJS",
      "Real light and dark themes, with tokens shared between web and mobile",
    ],
  },
  bravor: {
    oneLine: "A strength and running coach with adaptive training, nutrition and recovery",
    what: "A mobile-first web app (PWA) and a native Android app that adapt training, diet and recovery to the user's actual routine, on a scientific basis. A monorepo with its own domain engine holding the training and nutrition formulas, isolated in a tested package.",
    role: "I built the isolated domain engine, the JWT session in an httpOnly cookie renewed automatically in middleware, the origin-based CSRF protection, and the mitigation for the Next.js middleware bypass disclosed in 2025.",
    highlights: [
      "Domain engine isolated and tested: 142 tests, around 94% coverage",
      "JWT session (jose) in an httpOnly cookie, renewed in middleware without a fresh login",
      "Safety screening (PAR-Q and a pain check) before any training is released",
    ],
  },
  koracrm: {
    oneLine: "A Kanban pipeline in Laravel and React with per-stage auditing",
    what: "A full CRM with a drag-and-drop Kanban sales pipeline, contact management, interaction history and conversion analytics. Laravel 11 backend with Sanctum and Swagger.",
    role: "I built the pipeline movement service with change auditing, and the per-stage conversion query.",
    highlights: [
      "Drag-and-drop Kanban with the position persisted, so client and database never drift apart",
      "Automatic auditing: every move between stages is recorded",
    ],
  },
  "mente-viva": {
    oneLine: "Offline cognitive exercises for Alzheimer's prevention",
    what: "A free mobile app with seven cognitive games (word search, memory, Stroop, arithmetic, sequences and more), each at three levels. It works fully offline: no data leaves the device. MIT licensed, meant to be reused by charities and groups working with older adults.",
    role: "I wrote the pure engine behind each game, with no React and fully testable, and the offline-first layer. The project has 206 tests and the APK is built by GitHub Actions.",
    highlights: [
      "Seven games covering language, memory, attention and numerical reasoning",
      "Fully offline: no data leaves the device",
      "206 tests on the pure engine; APK built by GitHub Actions",
    ],
  },
  "mundo-do-lukinha": {
    oneLine: "Educational games that adapt to the child's age band",
    what: "An educational platform for children aged 3 to 14, with games in maths, language, memory and science. Difficulty (number of questions, time and numeric ceiling) adapts on its own to the age band. A non-punitive philosophy: it always encourages, never punishes.",
    role: "I defined the age-band model that adjusts difficulty and time by age, and the positive feedback layer. A pnpm monorepo with Zustand state and Vitest tests.",
    highlights: [
      "Difficulty adapts by age band, from chick to master",
      "A non-punitive philosophy: the feedback always encourages the child",
    ],
  },
};

const es: Record<string, TextoDoProjeto> = {
  feira: {
    oneLine: "Pedidos orientados a eventos con saga y compensación",
    what: "Cuatro servicios Spring Boot conversando por Kafka. Cada uno con su propia base de datos, ninguno leyendo tablas del otro. La saga tiene que sobrevivir a mensajes repetidos, desordenados y atrasados, y un modelo de lectura en MongoDB responde en una consulta lo que antes exigía unir tres servicios en el navegador.",
    role: "Lo escribí todo: los contratos de evento sellados, el outbox transaccional compartido, el consumidor idempotente, la saga del pedido y la proyección que alimenta el modelo de lectura. El caso más difícil fue la carrera en que el pago se aprueba mientras el pedido se está cancelando, que termina en reembolso.",
    highlights: [
      "El rastreo distribuido atraviesa el outbox: el contexto se guarda en una columna y se propaga en cabecera de Kafka, si no muere en el commit y el panel muestra rastros sueltos en vez de una saga entera",
      "Outbox con SELECT FOR UPDATE SKIP LOCKED, para correr en varias instancias",
      "Concurrencia probada con diez hilos reales contra un PostgreSQL real",
      "Modelo de lectura en MongoDB: el documento se deriva de los eventos, así que puede tirarse y reconstruirse desde el tópico",
      "El CI levanta un clúster Kubernetes real y aplica los manifiestos, además de validar el Terraform",
      "Una migración que borra o renombra columna reprueba en el build: la actualización es gradual y el despachador de la versión anterior sigue leyendo el outbox durante el cambio",
      "187 pruebas, ninguna de ellas requiere tener Docker instalado",
    ],
  },
  outorga: {
    oneLine: "Streaming white-label: sin licencia, no sale al aire",
    what: "Plataforma de streaming multi-tenant. Una sola regla ordena todo el sistema: nada sale al aire sin licencia vigente para el territorio y la ventana de exhibición.",
    role: "Modelé el dominio completo. Publicar es la única puerta al aire, y exige la licencia en la firma del método, así que no existe camino de código que publique sin ella. Un barrido cada hora baja lo que venció y repone lo que se renovó.",
    highlights: [
      "Dominio sin una línea de Spring, verificado por prueba de arquitectura",
      "Todo repositorio recibe el tenant en la firma, nunca de una variable de contexto",
      "Exportación y anonimización de datos personales implementadas, no prometidas",
      "Una migración que borra o renombra columna reprueba en el build: durante un despliegue ambas versiones corren juntas, y una columna que desaparece aquí niega contenido a quien pagó",
      "275 pruebas contra un PostgreSQL real",
    ],
  },
  "codereview-ai": {
    oneLine: "Revisión de código automatizada con un LLM local",
    what: "Plataforma que analiza Java, Python y JavaScript usando Ollama. Detecta errores, code smells y violaciones de SOLID. El trabajo pasa por RabbitMQ con caché Redis de 24 horas.",
    role: "Construí el orquestador asíncrono (cola RabbitMQ más un ticket) y el caché por hash del código enviado.",
    highlights: [
      "Procesamiento asíncrono por cola RabbitMQ, un ticket por análisis",
      "Caché Redis de 24 h por SHA-256 del código: nada se analiza dos veces",
      "El rastro de la petición viaja en la cabecera del mensaje: sin eso la espera en la cola, la mayor parte de la espera del usuario, cae en el hueco entre dos rastros sueltos",
      "Un tramo de rastro por consulta a la base, envolviendo el DataSource, que es lo que hace visible el N+1",
      "Una migración que borra o renombra columna reprueba en el build: durante el cambio el consumidor está a mitad de un trabajo ya aceptado",
    ],
  },
  "paiol-tech": {
    oneLine: "SaaS de gestión de deudas rurales",
    what: "SaaS para el productor rural. Login sin contraseña por magic link, alertas por WhatsApp y Open Finance. Monorepo Turborepo con NestJS (Clean Architecture y CQRS) y PWA en Next.js.",
    role: "Modelé el agregado de Deuda con sus eventos de dominio, y el handler CQRS que dispara la notificación de WhatsApp al vencimiento.",
    highlights: [
      "Magic link: sin contraseña, un solo clic desde el correo",
      "Un evento de dominio dispara la notificación de WhatsApp automáticamente al vencer",
    ],
  },
  "guarda-banco": {
    oneLine: "Un cerrojo dentro del servidor contra DELETE y UPDATE accidentales",
    what: "Protección instalada en la propia base de datos: todo DELETE o UPDATE tiene un tope de filas afectadas por sentencia, y pasarse aborta la transacción. Como la regla vive en el servidor, vale igual en DBeaver, Workbench, SSMS o psql. Scripts para PostgreSQL, MySQL y SQL Server.",
    role: "Definí el núcleo: topar por filas afectadas en vez de cazar DELETE sin WHERE. También el control de nivel de anidamiento, que hace que la cascada sume a la sentencia que la originó, y el panel local de excepciones.",
    highlights: [
      "El tope de filas cubre también un WHERE demasiado amplio, un OR donde iba AND y una cascada inesperada",
      "Aborta en BEFORE ROW: falla en la fila siguiente al tope, sin materializar todo antes",
      "ON DELETE CASCADE cuenta contra la sentencia de origen, no reinicia el contador",
      "Levantar la protección exige un motivo escrito y vale solo dentro de esa transacción",
    ],
  },
  authcore: {
    oneLine: "JWT RS256, rotación de refresh con blacklist y 2FA TOTP en Node.js",
    what: "Backend Node.js con Clean Architecture, JWT RS256 y segundo factor TOTP vía speakeasy, RBAC de tres roles y blacklist en Redis. React 18 y Vite en el front.",
    role: "Implementé la rotación de refresh-token con blacklist en Redis: cada refresh emite un par nuevo e invalida el anterior.",
    highlights: [
      "JWT RS256 asimétrico y 2FA TOTP: la clave privada nunca sale del servidor",
      "Rotación de refresh: cada emisión invalida la anterior y cierra la ventana de replay",
    ],
  },
  "quantbot-ml": {
    oneLine: "Renta pasiva que opera sola (en papel) y aprende de noticias y resultados",
    what: "Sistema de renta pasiva por dividendos (método Barsi/Bazin) que opera solo con dinero simulado y aprende de sus propios aciertos y errores. Combina fundamentos reales (Fundamentus, toda la bolsa brasileña), macro del banco central y unas 28 fuentes de noticias, lee el sentimiento con FinBERT-PT-BR y corre a diario en la nube por GitHub Actions, generando informes y un historial auditable.",
    role: "Construí el ciclo autónomo de punta a punta: la cartera en papel que sigue al screener, el módulo de feedback que aprende qué perfiles de pick superan la tasa de referencia, la capa multi-fuente de datos y noticias, y la automatización en la nube. Reutilicé la base de validación contra sobreajuste.",
    highlights: [
      "Corre solo en la nube por GitHub Actions: decide, registra y aprende todos los días, sin servidor",
      "Ciclo de feedback: mide cada pick contra la tasa de referencia y ajusta el score según acierte o falle",
      "Multi-fuente gratuita: Fundamentus para el dividendo de toda la bolsa, banco central para macro y unas 28 fuentes de noticias",
      "Sentimiento de noticias con FinBERT-PT-BR sobre PyTorch, con respaldo léxico que no necesita GPU",
    ],
  },
  balcao: {
    oneLine: "IA de ventas en WhatsApp donde el modelo nunca escribe un número",
    what: "Atención, negociación y tasación de equipos usados por WhatsApp para tiendas de celulares. El modelo entiende al cliente y elige la estrategia de la conversación, pero el precio de contado, las cuotas, el descuento máximo y el valor de canje salen de funciones deterministas. El mensaje final aún pasa por un auditor antes de enviarse.",
    role: "Diseñé el auditor de salida, el motor de precios y de tasación de usados, y las guardas que corren antes del modelo: pedido de salida, pedido de un humano y alcance.",
    highlights: [
      "El modelo devuelve texto con marcadores; quien calcula el valor es el dominio",
      "El auditor rechaza cualquier cifra que no se pueda rastrear a una consulta registrada",
      "Dos rechazos en la misma conversación escalan a atención humana",
      "El valor de canje solo sale acompañado de la advertencia de tasación previa que exige la ley del consumidor",
    ],
  },
  "apontamento-horas": {
    oneLine: "Gestión de horas multiusuario con RBAC, SLA y tableros",
    what: "Plataforma de carga de horas por cliente, con múltiples usuarios y roles (admin, líder de proyecto, analista, visualizador), SLA automático, tableros de control, auditoría e informes en Excel para finanzas.",
    role: "Construí la autenticación multiusuario con bcrypt y JWT, el control de acceso por rol, el SLA automático y la capa de auditoría.",
    highlights: [
      "Multiusuario con RBAC: admin, líder de proyecto, analista y visualizador",
      "Cada persona ve solo sus propias cargas; líderes y admin tienen la vista consolidada del equipo",
      "SLA automático: pendiente (0-2 días), alerta (2-5 días) y atraso (5 días o más)",
      "Exportación mensual a Excel para finanzas y registro de auditoría de cada acción",
    ],
  },
  registraservico: {
    oneLine: "Registro de servicios con tipos y campos configurables",
    what: "Sistema multi-tenant de registro de prestación de servicios, pensado para organismos públicos y equipos de campo. Los tipos de servicio y los campos de cada formulario los configura la organización, no están escritos en el código. Traza de auditoría, exportación a BI y PWA que se instala sin tienda de aplicaciones.",
    role: "Modelé el esquema configurable (tipo de servicio, campos personalizados y el registro como JSON validado) y escribí el validador dinámico que contrasta los datos contra la definición de campos guardada en la base.",
    highlights: [
      "El formulario no está en el código, está en la base: el mismo motor atiende a otra organización sin reescritura",
      "JWT verificado en middleware edge con revocación inmediata de sesión",
      "RBAC de cuatro roles: admin, gestor, operador y visualizador",
      "Registro en campo en dos toques, con exportación CSV para Power BI",
    ],
  },
  conectagente: {
    oneLine: "Iniciación científica: recolección en campo sin internet para agentes de salud",
    what: "Proyecto de iniciación científica, incubado en Saruê (UNESP Bauru). Recolecta datos en campo sin internet (SQLite con WAL y FTS) y sincroniza al reconectar. Nunca fue a campo con un agente real: es investigación, no un producto en uso.",
    role: "Diseñé el motor de sincronización (patrón outbox con reintentos y resolución de conflictos) y el esquema SQLite con índices FTS para búsqueda sin conexión.",
    highlights: [
      "Patrón outbox con reintento y resolución de conflictos: la sincronización sobrevive a quedarse sin señal",
      "SQLite WAL y FTS para búsqueda sin conexión, sin una sola llamada de red",
    ],
  },
  permaneia: {
    oneLine: "Asistente de estudio con RAG y alerta de riesgo de deserción",
    what: "Dos frentes contra la deserción universitaria. Un asistente que responde dudas del estudiante a partir de los documentos oficiales de la materia, citando la fuente, y que avisa cuando la respuesta no está en el material en vez de arriesgar una fecha de examen. Y un tablero que ordena al curso por riesgo de deserción calculado con lógica difusa.",
    role: "Escribí el motor de inferencia difusa de Mamdani desde cero, sin biblioteca, y toda la capa de RAG: fragmentación por unidad de información, búsqueda híbrida con fusión de rankings, umbral de relevancia, la agenda calculada en código y las defensas contra inyección de prompt.",
    highlights: [
      "Un estudiante con promedio 8,6 y 34% de asistencia recibe riesgo alto; el criterio solo por nota, que es el que usan las secretarías, diría que está tranquilo",
      "El registro de preguntas expuso el defecto que el tribunal no había visto: \"¿Cuándo es el examen P1?\" respondía y \"cuándo es el examen\" se negaba, con la misma similitud. La búsqueda ganó un segundo brazo, por coincidencia de términos",
      "Las preguntas de calendario no las responde el modelo: \"cuál es la próxima clase\" se resuelve en código, sobre las fechas del propio material, y el modelo solo redacta",
      "Cuando el material no responde, igual responde sobre la universidad y el contenido, y el aviso de que eso no tiene fuente lo escribe el código, no el modelo",
      "Funciona sin clave de API: en modo degradado transcribe el documento en vez de redactar, lo que es aún más estricto en cuanto a no inventar",
      "2.093 pruebas y nueve defectos documentados, uno de ellos existiendo solo en el artefacto publicado y no en el código fuente",
    ],
  },
  "vitrine-bauru": {
    oneLine: "Escaparate de los pequeños negocios de Bauru, en cuatro servicios Spring",
    what: "Proyecto de extensión con la SEDECON, la secretaría de desarrollo económico del municipio. El emprendedor registra su negocio, la secretaría lo verifica y lo aprueba, y la tienda entra en un escaparate público donde el consumidor habla directo por WhatsApp con quien produce. Son cuatro servicios Spring Boot, cada uno con su propia base de datos, comunicándose por eventos, más una pasarela en el borde y un front en React.",
    role: "Escribí el sistema entero: los contratos de evento sellados, el outbox y el inbox compartidos, la máquina de estados del registro, la saga de eliminación de la LGPD, la proyección que alimenta la búsqueda pública y toda la interfaz. También la decisión de transporte que permite que el mismo código funcione con Kafka, con Amazon SNS y sin corredor alguno.",
    highlights: [
      "El transporte de eventos es una interfaz con tres adaptadores: Kafka donde hay corredor, Amazon SNS en el despliegue gestionado y llamada en proceso cuando no hay corredor alguno",
      "El rastreo distribuido atraviesa el outbox: el contexto va en una columna y después en cabecera de Kafka o atributo de SNS, porque el evento lo publica otro hilo y el contexto moriría en el commit",
      "El tercer adaptador nació de un error mío: había escrito en el documento de decisión que no existía mensajería gestionada gratuita, porque busqué Kafka gestionado en lugar de buscar el problema. SNS y SQS están en la capa permanentemente gratuita de AWS, y el adaptador entró sin tocar el outbox, el inbox ni ningún consumidor",
      "Eliminar datos por la LGPD es una saga con plazo y reenvío: tres servicios deben confirmar el borrado antes de que la solicitud se cierre",
      "El contador de contraseña incorrecta y la revocación de sesión escriben en transacción propia, porque la excepción que los disparaba deshacía ambos; lo encontró una prueba de integración",
      "El documento acepta el CNPJ alfanumérico vigente desde julio de 2026, con el dígito calculado a partir del valor ASCII menos 48",
      "1.042 pruebas en verde sin necesidad de Docker: PostgreSQL y Kafka embebidos arrancan dentro de la propia prueba",
      "Trece reglas de arquitectura verificadas con ArchUnit, entre ellas que ningún controlador devuelva una entidad JPA",
      "Publicado de punta a punta en capas gratuitas: base de datos en Neon, API en contenedor en Render y el sitio en Vercel, con un CI de tres etapas",
      "Los manifiestos de Kubernetes tenían un autoescalador apuntando a un Deployment inexistente; escribí una verificación de coherencia que corre en CI sin clúster y rechaza ese caso",
    ],
  },
  cardiocam: {
    oneLine: "Mide la frecuencia cardíaca por video, sin tocar a la persona",
    what: "Estima la frecuencia cardíaca a partir del cambio de color de la piel causado por el flujo sanguíneo, captado con una webcam común. La técnica es fotopletismografía remota (rPPG). Implementa y compara cuatro algoritmos de la literatura: GREEN, CHROM, POS e ICA.",
    role: "Armé todo el camino, desde el recorte del rostro hasta el número en pantalla, y la comparación entre los cuatro algoritmos. También la corrección por el fondo del cuadro, que es lo que sostiene la medición con balance de blancos automático.",
    highlights: [
      "Cuatro algoritmos rPPG comparados en el mismo pipeline, con POS por defecto por ser el más confiable",
      "La pared detrás de la persona no tiene pulso: lo que oscila ahí es luz ambiente, y sirve como medida directa de la interferencia",
      "Con el balance de blancos oscilando dentro de la banda cardíaca, el acierto pasó de 1 de 16 sin corrección por fondo a 16 de 16 con ella",
      "La variación del pulso está entre 0,1% y 1% de la intensidad, por debajo del ruido de un píxel: el promedio espacial es lo que hace aparecer la señal",
    ],
  },
  contaflux: {
    oneLine: "Cuenta vehículos en video de cámara fija, por cruce de línea",
    what: "Cuenta los autos que pasan por una vía a partir de un video de cámara fija. Cada vehículo se sigue cuadro a cuadro y se cuenta una sola vez, al cruzar una línea en la escena. Separa por sentido, informa el tipo de vehículo y estima velocidad. Dos detectores: sustracción de fondo, que corre sin instalar nada, y reconocimiento por YOLO.",
    role: "Escribí la detección, el seguimiento y la regla de conteo, más la deducción automática de dónde debe ir la línea a partir del propio tráfico. También la integración del reconocimiento como alternativa a la sustracción de fondo.",
    highlights: [
      "La línea de conteo se deduce del tráfico: el programa observa unos segundos y la coloca perpendicular al sentido de los autos, sin que nadie haga clic",
      "Dos detectores con preguntas distintas: el movimiento pregunta si algo se movió, el reconocimiento pregunta si eso es un auto",
      "Un auto oscuro sobre asfalto oscuro era clasificado como sombra por MOG2 y desaparecía de la cuenta; resuelto con dos máscaras",
      "Validación con escenas sintéticas de referencia conocida, más cinco videos reales verificados mirando las cajas en pantalla",
    ],
  },
  mycondpets: {
    oneLine: "Gestión de mascotas en edificios residenciales",
    what: "Login con Google OAuth, registro de dueños y mascotas, cartelera de avisos (perdidos y encontrados) y panel de administración con estadísticas.",
    role: "Me encargué del middleware de control de rol (solo administración del edificio entra en /admin) y del modelado del dominio Dueño/Mascota/Aviso.",
    highlights: [
      "El middleware bloquea /admin para cualquier rol que no sea administrador del edificio",
      "Login con Google OAuth: sin registro manual, sin contraseña que gestionar",
    ],
  },
  kaida: {
    oneLine: "Metroidvania 2D en Unity, con el juego armado por código",
    what: "Metroidvania 2D con seis escenas, habilidades que desbloquean caminos, un jefe de enfrentamiento único con una sola barra de vida, tres intentos por partida, tres niveles de dificultad y guardado automático en los puntos de descanso. El proyecto genera sus propios recursos: un menú del editor corta los sprites y arma las animaciones, prefabs, tiles y escenas desde el código.",
    role: "Me encargué del controlador del jugador (una máquina de estados, un archivo por estado), del jefe y de los generadores de editor que arman el juego entero desde el código.",
    highlights: [
      "El juego se arma con scripts de editor: el repositorio guarda la receta, no el archivo binario de escena que nadie puede revisar",
      "Coyote time y buffer de salto: el salto sigue valiendo un instante después de dejar el borde, y el comando dado en el aire espera al suelo",
      "Máquina de estados con un archivo por estado del jugador, en vez de una cadena de condiciones dentro del Update",
      "La dificultad elegida en el menú llega a una copia de las estadísticas, nunca al recurso original, que grabaría el cambio en disco",
      "Build de Windows publicada en releases, para jugar sin instalar el motor",
    ],
  },
  bicudo: {
    oneLine: "Juego de un botón en Unity, con el escenario que se mide contra la pantalla",
    what: "Juego de un botón en la línea de Flappy Bird: el pájaro cae solo, sube cuando el jugador lo manda, y la partida termina en el primer contacto. Escena única para los tres estados, arte recortado por script, cuatro efectos de sonido generados por síntesis y ningún archivo de audio en el repositorio.",
    role: "Proyecto individual: hice todo, desde el recorte de los sprites y el armado de la escena por código hasta las pruebas y el ejecutable.",
    highlights: [
      "El impulso reemplaza la velocidad vertical en vez de sumarse a ella: dos toques seguidos suben lo mismo que uno, y el juego pasa a ser sobre ritmo",
      "Sin Rigidbody2D. La colisión es una consulta de círculo por cuadro, porque lo que se mueve por transform atraviesa el caño entre dos cuadros sin disparar ningún evento",
      "El escenario mide el ancho visible al ejecutar y rehace la cuenta si cambia la pantalla: con los límites fijos en la escena, el piso se salía por el borde y los caños aparecían de la nada frente al pájaro en un monitor ultrawide",
      "Los cuatro efectos de sonido se sintetizan al inicio, lo que evita una licencia de terceros en un juego donde cuatro pitidos alcanzan",
      "46 pruebas, y tres de ellas abren la escena que va en el ejecutable: el marcador estuvo una partida entera en cero mientras las pruebas llamaban al método de puntuar directamente y pasaban en verde",
    ],
  },
  "laboratorio-vr": {
    oneLine: "Laboratorio de química en realidad virtual con interacción por mirada",
    what: "Laboratorio de química en VR hecho en Unity, con interacción por mirada y soporte para Google Cardboard y el giroscopio del celular. Mirar un objeto muestra información; mirar un punto de teletransporte lo llena de verde y mueve al usuario. Build para Android.",
    role: "Implementé el control por mirada (raycast desde la cámara), los puntos de teletransporte con temporizador de permanencia, y el control de cámara por giroscopio o toque.",
    highlights: [
      "Interacción por mirada: un raycast desde la cámara detecta objetos en el campo visual",
      "Teletransporte por permanencia: el punto se llena de verde según el tiempo de mirada",
    ],
  },
  jis: {
    oneLine: "Agregador de empleos que estima la chance real de cada aviso",
    what: "Recolecta empleos de ocho fuentes públicas sin exigir clave de API, descarta lo que no tiene chance (aviso viejo, seniority por encima, regiones que no contratan desde Brasil) y arma el prompt del currículum a medida del aviso que sobrevive.",
    role: "Definí el criterio de corte a partir de investigación de reclutamiento en vez de suposiciones: coincidencia mínima de stack, plazo antes de que el aviso se vuelva fantasma, y filtro de región. Lo que falla en cualquiera de ellos no recibe puntaje, se descarta.",
    highlights: [
      "Ocho fuentes reales, entre ellas LinkedIn, Remotive, RemoteOK y WeWorkRemotely",
      "Aviso con más de 30 días se descarta: los avisos fantasma van del 20% al 35% de todo lo publicado",
      "Sin base de datos: los avisos llegan en vivo con caché de 30 minutos y el embudo vive en el navegador",
    ],
  },
  goldata: {
    oneLine: "Analítica de fútbol con aprendizaje automático",
    what: "Plataforma de análisis de fútbol con goles esperados, asistencias esperadas, métricas de presión y red de pases. API en FastAPI con JWT, límite de tasa y caché por partido.",
    role: "Modelé los goles esperados en XGBoost, calibrado sobre unos 80.000 tiros de la primera división brasileña. Construí la red de pases con NetworkX, incluyendo centralidad y focos de creación.",
    highlights: [
      "Unos 80.000 tiros de primera división en el conjunto de entrenamiento",
      "Goles esperados calibrados con regresión isotónica, Brier score por debajo de 0,18",
    ],
  },
  "goldata-pro": {
    oneLine: "Value bets con ensamble de ML y auditoría SHA-256",
    what: "Motor Dixon-Coles y Elo, ponderado 60/40, que detecta value bets con ventaja superior al 4%. Dimensiona la apuesta con Kelly fraccionado a un cuarto y publica los picks en Telegram. Un sitio público muestra un historial auditable por hash.",
    role: "Me encargué del motor de detección y del dimensionamiento por Kelly, del ciclo de feedback que ajusta la ventaja mínima según el retorno acumulado, y del hash de auditoría pública.",
    highlights: [
      "Ventaja mínima del 4%: filtra ruido estadístico antes de publicar",
      "Kelly a un cuarto para gestionar el riesgo por apuesta",
      "Auditoría pública: cada pick firmado con SHA-256",
    ],
  },
  sintonia: {
    oneLine: "Red social donde la conversación gira en torno a lo que está sonando",
    what: "Monorepo con API en NestJS, sitio en Next.js y app en Expo. Estado de reproducción en vivo, conversaciones con mensajes efímeros (por TTL o de una sola lectura), rachas y una mascota grupal. La integración con servicios de música es un puerto con adaptadores.",
    role: "Armé la base: Clean Architecture en la API, el puerto de proveedor de música con sus adaptadores, el dominio puro de efimeridad y rachas, y la capa de protección de datos (exportación, borrado con anonimización y purga de medios).",
    highlights: [
      "Puerto de música con adaptadores: Last.fm como principal, porque Spotify limita las apps nuevas a 25 usuarios",
      "El mensaje efímero expira por TTL o al leerse, y el trabajo de purga borra de verdad",
      "Dominio de gamificación puro, sin framework, probado fuera de NestJS",
      "Temas claro y oscuro reales, con tokens compartidos entre web y móvil",
    ],
  },
  bravor: {
    oneLine: "Entrenador de musculación y running con entrenamiento, nutrición y recuperación adaptativos",
    what: "App web mobile-first (PWA) y app nativa Android que adapta entrenamiento, dieta y recuperación a la rutina real del usuario, con base científica. Monorepo con un motor de dominio propio que guarda las fórmulas de entrenamiento y nutrición, aislado en un paquete con pruebas.",
    role: "Construí el motor de dominio aislado, la sesión JWT en cookie httpOnly renovada automáticamente en el middleware, la protección CSRF por origen y la mitigación del bypass de middleware de Next.js divulgado en 2025.",
    highlights: [
      "Motor de dominio aislado y probado: 142 pruebas, cobertura cercana al 94%",
      "Sesión JWT (jose) en cookie httpOnly, renovada en el middleware sin nuevo login",
      "Triaje de seguridad (PAR-Q y chequeo de dolor) antes de habilitar cualquier entrenamiento",
    ],
  },
  koracrm: {
    oneLine: "Pipeline Kanban en Laravel y React con auditoría por etapa",
    what: "CRM completo con pipeline de ventas Kanban de arrastrar y soltar, gestión de contactos, historial de interacciones y analítica de conversión. Backend Laravel 11 con Sanctum y Swagger.",
    role: "Implementé el servicio de movimiento del pipeline con auditoría de cambios, y la consulta de conversión por etapa.",
    highlights: [
      "Kanban de arrastrar y soltar con la posición persistida, sin desincronía entre cliente y base",
      "Auditoría automática: cada movimiento entre etapas queda registrado",
    ],
  },
  "mente-viva": {
    oneLine: "Ejercicios cognitivos sin conexión para prevención del Alzheimer",
    what: "App móvil gratuita con siete juegos cognitivos (sopa de letras, memoria, Stroop, cálculo, secuencias y más), cada uno en tres niveles. Funciona totalmente sin conexión: ningún dato sale del aparato. Licencia MIT, pensada para que ONG y grupos de adultos mayores la reutilicen.",
    role: "Escribí el motor puro de cada juego, sin React y totalmente comprobable, y la capa offline-first. El proyecto tiene 206 pruebas y el APK lo genera GitHub Actions.",
    highlights: [
      "Siete juegos que cubren lenguaje, memoria, atención y razonamiento numérico",
      "Totalmente sin conexión: ningún dato sale del aparato",
      "206 pruebas sobre el motor puro; APK generado por GitHub Actions",
    ],
  },
  "mundo-do-lukinha": {
    oneLine: "Juegos educativos que se adaptan a la franja etaria del niño",
    what: "Plataforma educativa para niños de 3 a 14 años con juegos de matemática, lengua, memoria y ciencias. La dificultad (cantidad de preguntas, tiempo y techo numérico) se adapta sola a la franja etaria. Filosofía no punitiva: siempre alienta, nunca castiga.",
    role: "Definí el modelo de franjas etarias que ajusta dificultad y tiempo por edad, y la capa de refuerzo positivo. Monorepo pnpm con estado en Zustand y pruebas en Vitest.",
    highlights: [
      "La dificultad se adapta por franja etaria, de pollito a maestro",
      "Filosofía no punitiva: el refuerzo siempre alienta al niño",
    ],
  },
};

export const TRADUCOES = { en, es } as const;
