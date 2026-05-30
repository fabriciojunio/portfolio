// Dados reais dos projetos, escritos pra leitura humana.
// Sem badges de cor por linguagem, sem métricas inventadas.

export interface SiteProject {
  slug: string;
  name: string;
  oneLine: string;
  what: string;
  role: string;
  stack: string[];
  github: string;
  demo?: string | null;
  year: string;
  // snippet curto, vai aparecer nos cards 3D + na página
  snippet: string;
  snippetLang: "typescript" | "python" | "java" | "php";
}

export const PROJECTS: SiteProject[] = [
  {
    slug: "goldata",
    name: "GolData",
    oneLine: "Analytics de futebol com Machine Learning",
    what: "Plataforma de análise de futebol com xG (Expected Goals), xA, métricas de pressão e rede de passes. API FastAPI com JWT, rate limiting e cache por partida.",
    role: "Modelei o xG em XGBoost calibrado sobre ~80k chutes da Série A. Construí a rede de passes com NetworkX (centralidade, hubs de criação).",
    stack: ["Python", "FastAPI", "XGBoost", "NetworkX", "Plotly"],
    github: "https://github.com/fabriciojunio/goldata",
    demo: null,
    year: "2026",
    snippetLang: "python",
    snippet: `def xg(x, y, header=False):
    f = shot_features(x, y)
    z = (3.10
         - 0.140 * f["distance"]
         + 0.012 * f["angle_deg"]
         - 0.45  * (1 if header else 0))
    return 1 / (1 + exp(-z))`,
  },
  {
    slug: "goldata-pro",
    name: "GolData / Robô de Sinais",
    oneLine: "Value bets com ML ensemble + auditoria SHA-256",
    what: "Motor Dixon-Coles + Elo (60/40) que detecta value bets com edge > 4%. Calcula stake via Kelly fracionário (1/4) e publica picks no Telegram. Site público exibe histórico auditável por hash.",
    role: "Cuidei do motor de detecção (ValueBetDetector + Kelly), do feedback loop que ajusta MIN_EDGE por ROI acumulado, e do hash de auditoria pública.",
    stack: ["Python", "FastAPI", "Next.js", "PostgreSQL", "Redis", "Docker"],
    github: "https://github.com/fabriciojunio/bot-sinais",
    demo: null,
    year: "2026",
    snippetLang: "python",
    snippet: `def kelly_fraction(prob, odds, fraction=0.25):
    b = odds - 1
    if b <= 0:
        return 0.0
    q = 1 - prob
    return max(0.0, ((b * prob - q) / b) * fraction)`,
  },
  {
    slug: "conectagente",
    name: "ConectAgente",
    oneLine: "App offline-first para Agentes Comunitários do SUS",
    what: "Coleta dados em campo sem internet (SQLite WAL+FTS) e sincroniza com Supabase ao reconectar. 5 módulos clínicos por morador, metas mensais, audit log LGPD.",
    role: "Arquitetei o engine de sync (outbox pattern com retries e conflict resolution) e o esquema do SQLite com índices FTS pra busca offline.",
    stack: ["React Native", "Expo SDK 54", "SQLite", "Supabase", "Zod"],
    github: "https://github.com/fabriciojunio/ConectAgente",
    demo: "https://conectagente-web.vercel.app",
    year: "2026",
    snippetLang: "typescript",
    snippet: `async drain(): Promise<{ sent: number; failed: number }> {
  const online = (await NetInfo.fetch()).isInternetReachable;
  if (!online) return { sent: 0, failed: 0 };

  const rows = await this.db.getAllAsync<Pending>(
    "SELECT * FROM outbox ORDER BY at ASC LIMIT 100",
  );
  /* ... */
}`,
  },
  {
    slug: "koracrm",
    name: "KoraCRM",
    oneLine: "CRM com pipeline Kanban e dashboard analítico",
    what: "CRM completo com pipeline de vendas Kanban (drag-and-drop), gestão de contatos, histórico de interações e analytics de conversão. Backend Laravel 11 com Sanctum + Swagger.",
    role: "Implementei o service de movimentação do pipeline com auditoria de mudanças e a query de conversão por estágio.",
    stack: ["Laravel 11", "React 18", "Sanctum", "PostgreSQL", "Redis", "AWS S3"],
    github: "https://github.com/fabriciojunio/KoraCRM",
    demo: "https://koracrm-frontend.vercel.app",
    year: "2026",
    snippetLang: "php",
    snippet: `public function moveDeal(Deal $deal, Stage $to, ?int $pos = null): Deal
{
    return DB::transaction(function () use ($deal, $to, $pos) {
        $from = $deal->stage;
        $deal->update([
            'stage_id' => $to->id,
            'position' => $pos ?? $this->nextPosition($to),
        ]);
        event(new DealMoved($deal, $from, $to));
        return $deal->fresh(['stage', 'contact', 'company']);
    });
}`,
  },
  {
    slug: "apontamento-horas",
    name: "Apontamento de Horas",
    oneLine: "Registro de horas com export Excel e IA local",
    what: "Sistema web para registrar horas por cooperativa. Exporta Excel com 4 abas (detalhes, dia, semana, mês) e detecta tipo de trabalho via LLM local (Ollama).",
    role: "Construí a validação Zod no boundary da API e a integração com Ollama pra classificar tipo de trabalho a partir da descrição.",
    stack: ["Next.js 14", "Prisma", "PostgreSQL", "Zod", "Ollama"],
    github: "https://github.com/fabriciojunio/apontamento-horas",
    demo: "https://apontamento-horas.vercel.app",
    year: "2026",
    snippetLang: "typescript",
    snippet: `export const RegistroHoras = z.object({
  data:     z.string().regex(/^\\d{4}-\\d{2}-\\d{2}$/),
  inicio:   z.string().regex(/^\\d{2}:\\d{2}$/),
  fim:      z.string().regex(/^\\d{2}:\\d{2}$/),
  cliente:  z.string().min(2).max(80),
  descricao: z.string().min(5).max(2000),
}).refine(
  ({ inicio, fim }) => toMinutes(fim) > toMinutes(inicio),
  { path: ["fim"], message: "fim deve ser depois do início" },
);`,
  },
  {
    slug: "jis",
    name: "JIS / Sistema de Vagas IA",
    oneLine: "Coleta e ranqueia vagas e publica top-5 no Telegram",
    what: "Sistema que coleta vagas de Gupy, GeekHunter e Programathor, aplica score híbrido (regras + RandomForest) e envia as melhores oportunidades às 19h via Telegram.",
    role: "Escrevi o motor de score em Java e o serviço ML em Python (FastAPI + scikit-learn). Calibrei pesos por ROI das vagas que abri.",
    stack: ["Java 21", "Spring Boot", "Python", "FastAPI", "scikit-learn"],
    github: "https://github.com/fabriciojunio/jis",
    demo: "https://jis-frontend-mocha.vercel.app",
    year: "2025",
    snippetLang: "java",
    snippet: `public static double scoreRules(Job job, List<String> userStack) {
    double remote = job.isRemote() ? 1.0 : 0.2;
    double match  = stackMatch(job.tags(), userStack);
    double sen    = senLevel(job.title());
    double sal    = salaryRange(job.salary());

    return  WEIGHTS.get("remoto")      * remote
          + WEIGHTS.get("stack_match") * match
          + WEIGHTS.get("senioridade") * sen
          + WEIGHTS.get("salario")     * sal;
}`,
  },
  {
    slug: "codereview-ai",
    name: "CodeReview AI",
    oneLine: "Code review automatizado com LLM local",
    what: "Plataforma que analisa Java, Python e JavaScript usando Ollama. Detecta bugs, code smells e violações SOLID. Processamento via RabbitMQ, cache Redis de 24h.",
    role: "Implementei o orquestrador assíncrono (fila RabbitMQ + ticket ID) e o sistema de cache por hash do código enviado.",
    stack: ["Java 21", "Spring Boot", "Ollama", "RabbitMQ", "Redis"],
    github: "https://github.com/fabriciojunio/codereview-ai",
    demo: null,
    year: "2025",
    snippetLang: "java",
    snippet: `public String submit(String code, Language lang, String userId) {
    String hash = sha256(code + ":" + lang);
    String cached = redis.opsForValue().get("review:" + hash);
    if (cached != null) return cached;       // hit imediato

    String ticket = UUID.randomUUID().toString();
    repo.create(new ReviewJob(ticket, hash, lang, userId, "PENDING"));
    rabbit.convertAndSend("review.queue",
        new ReviewMessage(ticket, code, lang));
    return ticket;
}`,
  },
  {
    slug: "paiol-tech",
    name: "Paiol Tech",
    oneLine: "SaaS de gestão de dívidas rurais",
    what: "SaaS para produtor rural. Login sem senha (magic link), alertas WhatsApp e Open Finance. Monorepo Turborepo com NestJS (Clean Arch + CQRS) e Next.js PWA.",
    role: "Modelei o domain do agregado de Dívida (com domain events) e o handler CQRS que dispara notificação WhatsApp no vencimento.",
    stack: ["Next.js 15", "NestJS", "CQRS", "Turborepo", "PWA"],
    github: "https://github.com/fabriciojunio/paiol-tech",
    demo: "https://paiol-tech.vercel.app",
    year: "2025",
    snippetLang: "typescript",
    snippet: `@CommandHandler(DebtDueCommand)
export class DebtDueHandler implements ICommandHandler<DebtDueCommand> {
  async execute(cmd: DebtDueCommand): Promise<void> {
    const debt = await this.debts.byId(cmd.debtId);
    debt.markDue();                  // emite DebtMarkedDueEvent
    await this.debts.save(debt);
    await this.notify.whatsapp({ /* ... */ });
  }
}`,
  },
  {
    slug: "mycondpets",
    name: "MyCondPets",
    oneLine: "Gestão de pets em condomínios residenciais",
    what: "Login Google OAuth, cadastro de tutores e pets, mural de comunicados (perdidos/achados) e painel admin com estatísticas.",
    role: "Cuidei do middleware de role-guard (só SÍNDICO/ADMIN entra em /admin) e da modelagem do domínio Tutor/Pet/Aviso.",
    stack: ["Next.js 15", "React 19", "NextAuth.js", "PostgreSQL", "Supabase"],
    github: "https://github.com/fabriciojunio/MyCondPets",
    demo: "https://mycondpets.vercel.app",
    year: "2025",
    snippetLang: "typescript",
    snippet: `export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  if (!ADMIN_ROUTES.some((r) => url.pathname.startsWith(r))) {
    return NextResponse.next();
  }
  const session = await auth();
  if (!session)                       return NextResponse.redirect(loginUrl(url));
  if (!ROLES_ADMIN.has(session.role)) return NextResponse.rewrite(new URL("/403", url));
  return NextResponse.next();
}`,
  },
  {
    slug: "quantbot-ml",
    name: "Quantbot ML",
    oneLine: "Trading quantitativo com ensemble + FinBERT",
    what: "Ensemble de 3 modelos (Random Forest + XGBoost + Gradient Boosting), análise de sentimento com FinBERT (PyTorch) e gestão de risco via Monte Carlo (10K simulações).",
    role: "Calibrei os pesos do ensemble com walk-forward validation pra evitar data leakage em série temporal.",
    stack: ["Python", "FastAPI", "PyTorch", "XGBoost", "FinBERT"],
    github: "https://github.com/fabriciojunio/quantbot-ml",
    demo: null,
    year: "2025",
    snippetLang: "python",
    snippet: `def walk_forward_auc(model, X, y, n_splits: int = 5) -> float:
    tscv = TimeSeriesSplit(n_splits=n_splits)
    aucs = []
    for tr, te in tscv.split(X):
        model.fit(X[tr], y[tr])
        aucs.append(roc_auc_score(y[te], model.predict_proba(X[te])[:, 1]))
    return float(np.mean(aucs))`,
  },
  {
    slug: "enterprise-project",
    name: "Enterprise Project",
    oneLine: "API REST com Clean Architecture e 2FA TOTP",
    what: "Backend Node.js com Clean Architecture, JWT (RS256) + 2FA TOTP via speakeasy, RBAC (3 roles), blacklist Redis. Frontend React 18 + Vite.",
    role: "Implementei a rotação de refresh-token com blacklist em Redis (cada refresh emite par novo e invalida o anterior).",
    stack: ["Node.js", "Express", "TypeORM", "JWT + 2FA", "Docker"],
    github: "https://github.com/fabriciojunio/enterprise-project",
    demo: "https://frontend-tan-mu-38.vercel.app",
    year: "2025",
    snippetLang: "typescript",
    snippet: `async rotate(refresh: string): Promise<Pair> {
  const decoded = jwt.verify(refresh, this.secret) as { sub: string; jti: string };
  const ok = await this.redis.get(\`rt:\${decoded.jti}\`);
  if (!ok) throw new Error("refresh:revoked");

  await this.redis.del(\`rt:\${decoded.jti}\`);       // invalida o atual
  return this.issue(decoded.sub, await this.roleOf(decoded.sub));
}`,
  },
];

export const SOBRE = {
  nome: "Fabrício Júnio",
  cargo: "Analista de Sistemas Júnior",
  empresa: "Nexum Tecnologia",
  cidade: "Bauru, SP",
  bio: "Desenvolvedor FullStack. Entrego sistemas que rodam de verdade, com foco em qualidade, segurança e código que se mantém ao longo do tempo.",
  longBio: [
    "Tenho 21 anos. Curso Ciência da Computação na UNISAGRADO e participo da Incubadora Saruê, na UNESP Bauru.",
    "Na Nexum trabalho com Lecom BPM, robôs em Java e integrações REST. Implementei a integração com a API do IBGE que cortou em 80% o tempo de cadastro, e atuo em projetos bancários de abertura de conta digital.",
    "Fora do trabalho mantenho um conjunto de projetos pessoais que vão do ML aplicado a futebol (GolData, com Expected Goals) ao CRM completo em Laravel (KoraCRM), passando por app offline-first para Agentes Comunitários de Saúde do SUS (ConectAgente).",
  ],
  contato: {
    email: "junioad555@gmail.com",
    github: "https://github.com/fabriciojunio",
    linkedin: "https://www.linkedin.com/in/fabr%C3%ADcioj%C3%BAnio/",
  },
};

export const STACK_GROUPS = [
  {
    label: "back",
    items: ["Java + Spring Boot", "Node + NestJS", "FastAPI (Python)", "Laravel"],
  },
  {
    label: "front",
    items: ["React 19", "Next.js 15", "React Native + Expo", "TypeScript strict"],
  },
  {
    label: "dados",
    items: ["PostgreSQL", "Redis", "Supabase", "SQLite (WAL + FTS)"],
  },
  {
    label: "ml",
    items: ["scikit-learn", "XGBoost", "PyTorch", "FinBERT", "Ollama (local)"],
  },
  {
    label: "infra",
    items: ["Docker", "GitHub Actions", "Nginx", "Vercel"],
  },
];

export const EMPRESAS = [
  "Nexum Tecnologia",
  "Lecom BPM",
  "UNISAGRADO",
  "Incubadora Saruê",
  "UNESP Bauru",
  "Bauru, SP",
];
