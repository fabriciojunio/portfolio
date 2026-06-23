// Dados reais dos projetos, escritos pra leitura humana.
// Sem badges de cor por linguagem, sem métricas inventadas.

export interface SiteProject {
  slug: string;
  name: string;
  oneLine: string;
  what: string;
  role: string;
  highlights?: string[];
  stack: string[];
  github: string | null; // null = repositório privado (sem link público)
  demo?: string | null;
  year: string;
  snippet: string;
  snippetLang: "typescript" | "python" | "java" | "php" | "csharp";
}

const PROJECTS_SOURCE: SiteProject[] = [
  {
    slug: "goldata",
    name: "GolData",
    oneLine: "Analytics de futebol com Machine Learning",
    what: "Plataforma de análise de futebol com xG (Expected Goals), xA, métricas de pressão e rede de passes. API FastAPI com JWT, rate limiting e cache por partida.",
    role: "Modelei o xG em XGBoost calibrado sobre ~80k chutes da Série A. Construí a rede de passes com NetworkX (centralidade, hubs de criação).",
    highlights: [
      "~80k chutes da Série A no dataset de treino",
      "xG calibrado com isotonic calibration (Brier Score < 0.18)",
    ],
    stack: ["Python", "FastAPI", "XGBoost", "NetworkX", "Plotly"],
    github: "https://github.com/fabriciojunio/goldata",
    demo: null,
    year: "2026",
    snippetLang: "python",
    snippet: `from math import exp

def xg(x, y, header=False):
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
    highlights: [
      "Edge mínimo de 4%: filtra ruído estatístico antes de publicar",
      "Kelly fracionário 1/4 para gestão de risco por stake",
      "Auditoria pública: cada pick assinado com SHA-256",
    ],
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
    highlights: [
      "Outbox pattern com retry e conflict resolution: sync funciona até sem sinal",
      "SQLite WAL + FTS para busca offline sem nenhuma chamada de rede",
    ],
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
    oneLine: "Pipeline Kanban em Laravel + React com auditoria por estágio",
    what: "CRM completo com pipeline de vendas Kanban (drag-and-drop), gestão de contatos, histórico de interações e analytics de conversão. Backend Laravel 11 com Sanctum + Swagger.",
    role: "Implementei o service de movimentação do pipeline com auditoria de mudanças e a query de conversão por estágio.",
    highlights: [
      "Drag-and-drop Kanban com posição persistida, sem dessync entre cliente e banco",
      "Auditoria automática: cada movimentação entre estágios fica registrada",
    ],
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
    name: "Pontual - Apontamento de Horas",
    oneLine: "Gestão de horas multiusuário com RBAC, SLA e dashboards",
    what: "Plataforma de apontamento de horas por cliente, com múltiplos usuários e papeis (admin, GP, analista, visualizador), SLA automático, dashboards de controle, auditoria e relatórios Excel para o financeiro.",
    role: "Construí a autenticação multiusuário com bcrypt e JWT, o controle de acesso por papel (RBAC), o SLA automático e a camada de auditoria.",
    highlights: [
      "Multiusuário com RBAC: admin, GP, analista e visualizador",
      "Cada colaborador vê só os próprios lançamentos; GP e admin têm visão consolidada do time",
      "SLA automático: pendente (0-2d), alerta (2-5d) e atraso (5d+)",
      "Export Excel mensal para o financeiro e log de auditoria de cada ação",
    ],
    stack: ["Next.js 14", "Prisma", "PostgreSQL", "JWT", "Tailwind"],
    github: null, // repositório privado
    demo: "https://apontamento-horas.vercel.app",
    year: "2026",
    snippetLang: "typescript",
    snippet: `// Validação no boundary da API (route handler → domínio)
export const ApontamentoCreate = z.object({
  tipo:      z.enum(TIPOS),                        // desenvolvimento, suporte, reunião...
  data:      z.string().regex(/^\\d{4}-\\d{2}-\\d{2}$/, "AAAA-MM-DD"),
  horas:     z.coerce.number().min(0.5).max(24),  // de 30min a 24h
  clienteId: z.string().min(1, "selecione um cliente"),
  chamado:   z.string().max(100).optional().nullable(),
  descricao: z.string().min(1).max(1000).trim(),
});`,
  },
  {
    slug: "jis",
    name: "JIS / Sistema de Vagas IA",
    oneLine: "Coleta e ranqueia vagas e publica top-5 no Telegram",
    what: "Sistema que coleta vagas de Gupy, GeekHunter e Programathor, aplica score híbrido (regras + RandomForest) e envia as melhores oportunidades às 19h via Telegram.",
    role: "Escrevi o motor de score em Java e o serviço ML em Python (FastAPI + scikit-learn). Calibrei pesos por ROI das vagas que abri.",
    highlights: [
      "Coleta automatizada em 3 plataformas: Gupy, GeekHunter e Programathor",
      "Score híbrido: regras determinísticas + RandomForest calibrado",
      "Envio automático dos top-5 todo dia às 19h via Telegram",
    ],
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
    highlights: [
      "Processamento assíncrono via fila RabbitMQ com ticket ID por análise",
      "Cache Redis de 24h por hash SHA-256 do código, zero reprocessamento",
      "Detecta bugs, code smells e violações SOLID em Java, Python e JS",
    ],
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
    highlights: [
      "Magic link: login sem senha, só um clique no email",
      "Domain event dispara notificação WhatsApp automaticamente no vencimento",
    ],
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
    highlights: [
      "Middleware bloqueia /admin para qualquer role que não seja SÍNDICO ou ADMIN",
      "Login Google OAuth: sem cadastro manual, sem senha pra gerenciar",
    ],
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
    oneLine: "Renda passiva que opera sozinha (paper) e aprende com notícias e resultados",
    what: "Sistema de renda passiva por dividendos (método Barsi/Bazin) que opera sozinho com dinheiro simulado e aprende com os próprios acertos e erros. Junta fundamentos reais (Fundamentus, toda a B3), macro do Banco Central e ~28 fontes de notícias, lê o sentimento com FinBERT-PT-BR e roda na nuvem todo dia via GitHub Actions, gerando relatórios e um track record auditável.",
    role: "Construí o ciclo autônomo de ponta a ponta: a carteira paper que segue os sinais do screener, o módulo de feedback que aprende quais perfis de pick batem o CDI, a camada multi-fonte de dados e notícias, e a automação na nuvem (GitHub Actions + CI). Reaproveitei a base de validação anti-overfitting.",
    highlights: [
      "Opera sozinho na nuvem (GitHub Actions): decide, registra e aprende todo dia, sem servidor",
      "Ciclo de feedback: mede cada pick contra o CDI e ajusta o score conforme acerta ou erra",
      "Multi-fonte gratuita: Fundamentus (DY de toda a B3), Banco Central (macro) e ~28 feeds de notícias",
      "Sentimento das notícias com FinBERT-PT-BR (PyTorch), com fallback léxico sem GPU",
    ],
    stack: ["Python", "PyTorch", "FinBERT-PT-BR", "FastAPI", "GitHub Actions"],
    github: "https://github.com/fabriciojunio/quantbot-ml",
    demo: null,
    year: "2026",
    snippetLang: "python",
    snippet: `def preco_teto_bazin(dividendo_anual: float, dy_alvo: float = 8.0) -> float:
    # Preço justo de Bazin: onde o dividend yield atinge o piso.
    # Com a Selic alta, exijo 8% em vez dos 6% clássicos.
    return round(dividendo_anual / (dy_alvo / 100), 2)

def aprova_barsi(dy_12m: float, payout: float, anos: int) -> bool:
    # setor perene + dividendo consistente, não preço de curto prazo
    return dy_12m >= 5.0 and payout >= 40.0 and anos >= 5`,
  },
  {
    slug: "authcore",
    name: "AuthCore",
    oneLine: "JWT RS256 + refresh rotation com blacklist + 2FA TOTP em Node.js",
    what: "Backend Node.js com Clean Architecture, JWT (RS256) + 2FA TOTP via speakeasy, RBAC (3 roles), blacklist Redis. Frontend React 18 + Vite.",
    role: "Implementei a rotação de refresh-token com blacklist em Redis (cada refresh emite par novo e invalida o anterior).",
    highlights: [
      "JWT RS256 assimétrico + 2FA TOTP: chave privada nunca sai do servidor",
      "Rotação de refresh-token: cada emissão invalida o anterior, sem replay attack",
    ],
    stack: ["Node.js", "Express", "TypeORM", "JWT + 2FA", "Docker"],
    github: "https://github.com/fabriciojunio/authcore",
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
  {
    slug: "bravor",
    name: "BRAVOR",
    oneLine: "Coach de musculação e corrida com treino, nutrição e recuperação adaptativos",
    what: "App web mobile-first (PWA) e app nativo Android que adapta treino, dieta e recuperação à rotina real do usuário, com base científica. Monorepo com um motor de domínio próprio (fórmulas de treino e nutrição) isolado num pacote testado.",
    role: "Construí o motor de domínio isolado (packages/core), a sessão JWT em cookie httpOnly com renovação automática no middleware, a proteção CSRF por origem e a mitigação da CVE-2025-29927 do Next.js.",
    highlights: [
      "Motor de domínio isolado e testado: 142 testes, cobertura de ~94%",
      "Sessão JWT (jose) em cookie httpOnly, renovada no middleware sem novo login",
      "Triagem de segurança (PAR-Q e checagem de dor) antes de liberar treino",
    ],
    stack: ["Next.js 15", "React 19", "Prisma", "Supabase", "Capacitor"],
    github: null, // repositório privado
    demo: "https://bravor.vercel.app",
    year: "2026",
    snippetLang: "typescript",
    snippet: `// BRAVOR: renovação de sessão + headers de segurança no middleware
const RENOVAR_APOS_SEG = 24 * 60 * 60; // renova o cookie após 1 dia

export async function middleware(request: NextRequest) {
  if (isPublic(request.nextUrl.pathname)) return NextResponse.next();

  const session = await verifySession(cookie(request));
  if (!session) return redirectLogin(request);

  const res = NextResponse.next();
  if (agora() - session.iat > RENOVAR_APOS_SEG) {
    res.cookies.set(COOKIE_NAME, await signSession(session), cookieOptions);
  }
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  return res;
}`,
  },
  {
    slug: "mente-viva",
    name: "Mente Viva",
    oneLine: "Exercícios cognitivos offline para prevenção do Alzheimer",
    what: "App mobile gratuito com 7 jogos cognitivos (caça-palavras, memória, Stroop, contas, sequência e mais), cada um em 3 níveis. Funciona 100% offline: nenhum dado sai do aparelho. Licença MIT, pensado para qualquer pessoa reusar em ONGs e grupos de idosos.",
    role: "Escrevi o engine puro de cada jogo (sem React, totalmente testável) e a camada offline-first. O projeto tem 206 testes e o APK é gerado por GitHub Actions.",
    highlights: [
      "7 jogos cobrindo linguagem, memória, atenção e raciocínio numérico",
      "100% offline: nenhum dado sai do aparelho",
      "206 testes no engine puro; APK gerado por GitHub Actions",
    ],
    stack: ["React Native", "Expo SDK 50", "AsyncStorage", "GitHub Actions"],
    github: "https://github.com/fabriciojunio/mente-viva",
    demo: null,
    year: "2026",
    snippetLang: "typescript",
    snippet: `// Mente Viva: engine puro do jogo (sem React, 100% testável)
export function commitSelection(state: BoardState): BoardState {
  const picked = state.selection.map((c) => c.letter).join("");
  const idx = state.words.findIndex(
    (w) => !w.found && (w.word === picked || w.word === reverse(picked)),
  );
  if (idx < 0) return { ...state, selection: [] };

  const words = [...state.words];
  words[idx] = { ...words[idx], found: true };
  return {
    ...state, words, selection: [],
    score: state.score + words[idx].word.length * 10,
  };
}`,
  },
  {
    slug: "mundo-do-lukinha",
    name: "Mundo do Lukinha",
    oneLine: "Jogos educativos que se adaptam à faixa etária da criança",
    what: "Plataforma educativa para crianças de 3 a 14 anos com jogos de matemática, português, memória e ciências. A dificuldade (número de questões, tempo e limite numérico) se adapta sozinha à faixa etária. Filosofia não punitiva: sempre encoraja, nunca pune.",
    role: "Defini o modelo de faixas etárias que ajusta dificuldade e tempo por idade, e a camada de feedback positivo. Monorepo pnpm com estado em Zustand e testes em Vitest.",
    highlights: [
      "Dificuldade adaptativa por faixa etária (de pintinho a mestre)",
      "Filosofia não punitiva: o feedback sempre encoraja a criança",
    ],
    stack: ["Next.js 14", "TypeScript", "Zustand", "pnpm workspaces"],
    github: "https://github.com/fabriciojunio/mundo-do-lukinha",
    demo: "https://mundo-do-lukinha.vercel.app",
    year: "2026",
    snippetLang: "typescript",
    snippet: `// Mundo do Lukinha: dificuldade adaptativa por faixa etária
export const FAIXAS: Record<Faixa, FaixaSpec> = {
  pintinho:    { idade: [3, 5],   segundosPorQuestao: 30, numeroDeQuestoes:  5, limite: 10   },
  explorador:  { idade: [6, 8],   segundosPorQuestao: 20, numeroDeQuestoes: 10, limite: 50   },
  aventureiro: { idade: [9, 11],  segundosPorQuestao: 15, numeroDeQuestoes: 15, limite: 100  },
  mestre:      { idade: [12, 14], segundosPorQuestao: 10, numeroDeQuestoes: 20, limite: 1000 },
};

export function faixaDaIdade(idade: number): Faixa {
  if (idade <= 5)  return "pintinho";
  if (idade <= 8)  return "explorador";
  if (idade <= 11) return "aventureiro";
  return "mestre";
}`,
  },
  {
    slug: "laboratorio-vr",
    name: "Laboratório VR",
    oneLine: "Laboratório de química em Realidade Virtual com interação por gaze",
    what: "Laboratório de química em VR feito em Unity, com interação por gaze (olhar) e suporte a Google Cardboard e ao giroscópio do celular. Olhar para um objeto exibe informações; olhar para um ponto de teleporte preenche em verde e move o usuário. Build para Android.",
    role: "Implementei o controle por gaze (raycast a partir da câmera), os pontos de teleporte com timer de permanência do olhar e o controle de câmera por giroscópio ou toque.",
    highlights: [
      "Interação por gaze: raycast da câmera detecta objetos no campo de visão",
      "Teleporte por dwell: o ponto preenche em verde conforme o tempo de olhar",
    ],
    stack: ["Unity", "C#", "Google Cardboard", "Android"],
    github: "https://github.com/fabriciojunio/LaboratorioVR",
    demo: null,
    year: "2025",
    snippetLang: "csharp",
    snippet: `// Laboratório VR: ponto de teleporte ativado por gaze (olhar)
public class TeleportPoint : MonoBehaviour
{
    public float tempoOlhar = 2f;
    private float timer = 0f;

    public void IniciarOlhar()
    {
        timer += Time.deltaTime;
        float progresso = timer / tempoOlhar;
        rend.material.color = Color.Lerp(corOriginal, Color.green, progresso);
        if (timer >= tempoOlhar) Teleportar();
    }

    public void PararOlhar()
    {
        timer = 0f;
        rend.material.color = corOriginal;
    }
}`,
  },
];

// Ordem de exibição pensada para vagas de engenharia em fintech/banco:
// linguagem mais pedida (Java + Spring) na frente, depois mercado
// financeiro, segurança bancária e, por fim, full-stack e mobile.
const WORK_ORDER = [
  "jis",                // Java 21 + Spring Boot
  "codereview-ai",      // Java 21 + Spring Boot
  "quantbot-ml",        // mercado financeiro
  "goldata-pro",        // value bets, modelagem financeira
  "paiol-tech",         // SaaS com Open Finance
  "authcore",           // segurança e autenticação
  "apontamento-horas",  // RBAC, SLA, auditoria
  "bravor",             // full-stack + segurança, motor de domínio
  "koracrm",            // full-stack React
  "mycondpets",         // full-stack React
  "goldata",            // ML aplicado
  "conectagente",       // mobile offline-first
  "mente-viva",         // mobile offline-first, impacto social
  "mundo-do-lukinha",   // educação, front-end
  "laboratorio-vr",     // VR / Unity, projeto acadêmico
];

export const PROJECTS: SiteProject[] = WORK_ORDER.map(
  (slug) => PROJECTS_SOURCE.find((p) => p.slug === slug)!,
);

export const SOBRE = {
  nome: "Fabrício Júnio",
  cargo: "Analista de Sistemas Júnior",
  empresa: "Nexum Tecnologia",
  cidade: "Bauru, SP",
  bio: "Desenvolvedor FullStack. Java em banco, Python em ML, TypeScript no frontend. Prefiro código em produção a código em README.",
  longBio: [
    "Tenho 20 anos. Curso Ciência da Computação na UNISAGRADO e participo da Incubadora Saruê, na UNESP Bauru.",
    "Na Nexum trabalho com Lecom BPM, robôs em Java e integrações REST. Implementei a integração com a API do IBGE que cortou em 80% o tempo de cadastro, e atuo em projetos bancários de abertura de conta digital.",
    "Nos projetos pessoais, vou de back-end Java com Spring Boot (JIS, CodeReview AI) a sistemas do mercado financeiro: renda passiva com dividendos (QuantBot ML), detecção de value bets (GolData) e SaaS com Open Finance (Paiol Tech).",
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
    items: ["scikit-learn", "XGBoost", "PyTorch", "FinBERT-PT-BR", "Ollama (local)"],
  },
  {
    label: "infra",
    items: ["Docker", "GitHub Actions", "Nginx", "Vercel"],
  },
];

export const EMPRESAS = [
  "Nexum Tecnologia",
  "Java",
  "Spring Boot",
  "React",
  "Python",
  "TypeScript",
  "PHP",
  "UNISAGRADO",
  "Incubadora Saruê",
  "UNESP Bauru",
  "Bauru, SP",
];
