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
  /**
   * Caminho do arquivo na IDE que tem demo interativa, quando existe.
   *
   * A demo mora em /lab, e sem um link daqui ela ficava escondida atrás de
   * abrir a IDE, achar o arquivo na árvore e reparar no botão Run. Este campo
   * é o que permite chegar nela direto do card do projeto.
   */
  labDemo?: string;
  year: string;
  snippet: string;
  snippetLang: "typescript" | "python" | "java" | "php" | "csharp" | "sql";
}

const PROJECTS_SOURCE: SiteProject[] = [
  {
    slug: "feira",
    name: "Feira do Comando",
    oneLine: "Pedidos orientados a eventos com saga e compensação",
    what: "Três serviços Spring Boot (pedidos, estoque, pagamentos) conversando por Kafka. Cada um com o próprio banco, nenhum lendo tabela do outro. A saga precisa sobreviver a mensagem repetida, fora de ordem e atrasada.",
    role: "Escrevi tudo: os contratos de evento selados, o outbox transacional compartilhado, o consumidor idempotente e a saga do pedido. O caso que mais deu trabalho foi a corrida em que o pagamento é aprovado durante o cancelamento, que termina em estorno.",
    highlights: [
      "Outbox com SELECT FOR UPDATE SKIP LOCKED, para rodar em várias instâncias",
      "Concorrência provada com dez threads reais contra um PostgreSQL real",
      "12 regras de ArchUnit que quebram o build quando a camada é furada",
      "165 testes, nenhum deles precisando de Docker instalado",
    ],
    stack: ["Java 21", "Spring Boot", "Kafka", "PostgreSQL", "React 19", "ArchUnit"],
    github: "https://github.com/fabriciojunio/feira-do-comando",
    demo: null,
    year: "2026",
    snippetLang: "java",
    snippet: `// A aprovação chegou depois de o cancelamento começar.
// O dinheiro já saiu: não dá para ignorar, tem que voltar.
case PagamentoAprovado p when status == CANCELANDO ->
    new Decisao(false,
        List.of(new PagamentoEstornado(
            id, p.valor(), Motivo.PEDIDO_CANCELADO)),
        "aprovacao tardia: estornando");`,
  },
  {
    slug: "outorga",
    name: "Outorga",
    oneLine: "Streaming white-label: sem outorga, não vai ao ar",
    what: "Plataforma de streaming multi-tenant. A regra que organiza o sistema inteiro é uma só: nada vai ao ar sem licença vigente para o território e a janela de exibição.",
    role: "Modelei o domínio inteiro. Publicar é a única porta para o ar, e ela exige a licença na assinatura do método, então não existe caminho de código que publique sem ela. Uma varredura horária tira do ar o que venceu e devolve o que foi renovado.",
    highlights: [
      "Domínio sem uma linha de Spring, verificado por teste de arquitetura",
      "Todo repositório recebe o tenant na assinatura, não em variável de contexto",
      "LGPD com exportação e anonimização implementadas, não prometidas",
      "260 testes contra PostgreSQL de verdade",
    ],
    stack: ["Java 21", "Spring Boot", "PostgreSQL", "JdbcClient", "Next.js"],
    github: "https://github.com/fabriciojunio/outorga",
    demo: null,
    year: "2026",
    snippetLang: "java",
    snippet: `// A licença entra por parâmetro, e não por consulta interna.
// Quem chama é obrigado a tê-la em mãos: não há como publicar sem.
public Result<Titulo> publicar(Licenca licenca, Instant agora) {
    if (!licenca.cobre(this.territorio, agora))
        return Result.erro(FalhaDeNegocio.SEM_LICENCA_VIGENTE);
    return Result.ok(comStatus(Status.PUBLICADO));
}`,
  },
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
    labDemo: "/projetos/goldata.py",
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
    labDemo: "/projetos/goldata-pro.py",
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
    slug: "permaneia",
    name: "PermaneIA",
    oneLine: "Assistente de estudos com RAG e alerta de risco de evasão",
    what: "Duas frentes contra a evasão no ensino superior. Um assistente que responde dúvidas do aluno sobre os documentos oficiais da disciplina, com a fonte citada, e que diz quando a informação não está no material em vez de arriscar uma data de prova. E um painel que ordena a turma por risco de evasão calculado com lógica fuzzy.",
    role: "Escrevi o motor de inferência fuzzy de Mamdani do zero, sem biblioteca, e a camada de RAG inteira: chunking por unidade de informação, busca híbrida com fusão de rankings, limiar de relevância, agenda calculada em código e as barreiras contra injeção de prompt.",
    highlights: [
      "Um aluno com média 8,6 e presença de 34% recebe risco alto; o critério por nota, que é o usado nas secretarias, diria que está tranquilo",
      "O registro de perguntas mostrou o defeito que a bancada não pegava: \"Quando é a Prova P1?\" respondia e \"quando vai ser a prova\" recusava, com a mesma similaridade. A busca ganhou um segundo braço, por casamento de termos",
      "Perguntas de calendário não são feitas pelo modelo: \"qual é a próxima aula\" é resolvida em código, sobre as datas do próprio material, e o modelo só redige",
      "Quando o material não responde, ele responde mesmo assim sobre a faculdade e sobre o conteúdo, e o aviso de que aquilo não tem fonte é escrito pelo código, não pelo modelo",
      "Funciona sem chave de API: no modo degradado ele transcreve o documento em vez de redigir, o que é ainda mais estrito quanto a não inventar",
      "2.093 testes e nove defeitos documentados, um deles existindo só no artefato publicado e não no código-fonte",
    ],
    stack: ["Next.js 15", "TypeScript", "PostgreSQL", "pgvector", "Prisma", "Gemini API"],
    github: "https://github.com/fabriciojunio/permaneia",
    labDemo: "/projetos/permaneia.ts",
    demo: "https://permaneia.vercel.app",
    year: "2026",
    snippetLang: "typescript",
    snippet: `// Regra 7: o caso que o projeto existe para pegar.
// Notas boas não anulam presença e engajamento em queda.
r(7, "baixa", "alta", "baixo", "alto",
  "Um critério baseado só em nota classificaria este aluno " +
  "como tranquilo, e ele não está.");

// Disparo pelo mínimo: a regra só vale o quanto vale o seu
// antecedente mais fraco.
const forca = Math.min(
  graus.frequencia[regra.se.frequencia],
  graus.notas[regra.se.notas],
  graus.engajamento[regra.se.engajamento],
);`,
  },
  {
    slug: "conectagente",
    name: "ConectAgente",
    oneLine: "Iniciação científica: coleta em campo sem internet para agentes do SUS",
    what: "Projeto de iniciação científica, incubado na Saruê (UNESP Bauru). Coleta dados em campo sem internet (SQLite WAL+FTS) e sincroniza ao reconectar. Nunca foi para campo com agente de verdade: é pesquisa, não produto em uso.",
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
    name: "Horalis",
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
    labDemo: "/projetos/apontamento-horas.ts",
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
    slug: "balcao",
    name: "Balcão",
    oneLine: "IA de vendas no WhatsApp em que o modelo não escreve números",
    what: "Atendimento, negociação e avaliação de aparelhos usados no WhatsApp para lojas de celular. O modelo entende o cliente e escolhe a estratégia da conversa, mas preço à vista, parcelamento, desconto máximo e valor de troca saem de funções determinísticas. A mensagem final ainda passa por um auditor antes do envio.",
    role: "Desenhei o auditor de saída, o motor de preço e de avaliação de usado, e as guardas que rodam antes do modelo (pedido de saída, pedido de atendente e escopo).",
    highlights: [
      "O modelo devolve texto com marcadores; quem calcula o valor é o domínio",
      "Auditor reprova qualquer algarismo sem origem numa consulta registrada",
      "Duas reprovações na mesma conversa escalam para atendimento humano",
      "Valor de troca só sai acompanhado da ressalva de pré-avaliação (art. 30 do CDC)",
    ],
    stack: ["Node 20", "TypeScript", "Fastify", "Prisma", "PostgreSQL", "Zod"],
    github: null, // repositório privado
    demo: null,
    year: "2026",
    snippetLang: "typescript",
    snippet: `// Balcão: o auditor confere cada número antes do envio
for (const o of extrairOcorrencias(texto)) {
  if (o.tipo === "monetario" && !combina(o.valor, permitidos.monetarios)) {
    violacoes.push({
      tipo: "monetario_nao_autorizado",
      trecho: o.bruto,
      motivo: "Valor sem origem em consulta registrada nesta conversa.",
    });
  }
}
return { aprovado: violacoes.length === 0, violacoes };`,
  },
  {
    slug: "guarda-banco",
    name: "Guarda do Banco",
    oneLine: "Trava no servidor contra DELETE e UPDATE acidentais",
    what: "Proteção instalada no próprio banco: todo DELETE ou UPDATE tem limite de linhas afetadas por comando, e passar do limite aborta a transação. Como a regra mora no servidor, vale igual no DBeaver, no Workbench, no SSMS ou no psql. Scripts para PostgreSQL, MySQL e SQL Server.",
    role: "Defini o núcleo: limite por linhas afetadas em vez de caçar DELETE sem WHERE. Também o controle de nível de aninhamento, que faz a cascata somar no mesmo comando, e o painel local de liberação.",
    highlights: [
      "Limite de linhas cobre WHERE amplo demais, OR no lugar de AND e cascata inesperada",
      "Aborta em BEFORE ROW: falha na linha do limite mais um, sem materializar tudo",
      "ON DELETE CASCADE entra na conta do comando de origem, não zera o contador",
      "Liberar a proteção exige motivo escrito e vale só dentro da transação",
    ],
    stack: ["PostgreSQL", "PL/pgSQL", "MySQL", "SQL Server", "Python"],
    github: null, // repositório privado
    demo: null,
    year: "2026",
    snippetLang: "sql",
    snippet: `-- Guarda do Banco: conta as linhas e decide, linha a linha
create or replace function guarda.contar_e_checar()
returns trigger language plpgsql security definer as $$
declare
    v_linhas bigint;
    v_limite integer;
begin
    v_linhas := guarda.ler_contador(guarda.chave_contador(tg_op)) + 1;
    perform set_config(guarda.chave_contador(tg_op), v_linhas::text, true);

    if guarda.esta_liberado() then
        return case when tg_op = 'DELETE' then old else new end;
    end if;

    v_limite := guarda.limite(tg_table_schema, tg_table_name, tg_op);
    if v_limite is not null and v_linhas > v_limite then
        raise exception 'GUARDA: % em %.% passou de % linhas.',
            tg_op, tg_table_schema, tg_table_name, v_limite;
    end if;

    return case when tg_op = 'DELETE' then old else new end;
end;
$$;`,
  },
  {
    slug: "registraservico",
    name: "RegistraServiço",
    oneLine: "Registro de serviços com tipos e campos configuráveis",
    what: "Sistema multi-tenant de registro de prestação de serviços, pensado para órgãos públicos e equipes de campo. Os tipos de serviço e os campos de cada formulário são configurados pela organização, não escritos no código. Trilha de auditoria, exportação para BI e PWA que instala sem loja.",
    role: "Modelei o schema configurável (tipo de serviço, campos personalizados e registro em JSON validado) e escrevi o validador dinâmico que confere os dados contra a definição de campos que está no banco.",
    highlights: [
      "O formulário não está no código, está no banco: o mesmo motor atende outra organização sem reescrita",
      "JWT no middleware edge com revogação imediata de sessão",
      "RBAC de quatro papéis: admin, gestor, operador e visualizador",
      "Registro em campo em dois toques, com exportação CSV para Power BI",
    ],
    stack: ["Next.js 14", "TypeScript", "Prisma", "PostgreSQL", "Zod"],
    github: null, // repositório privado
    demo: "https://registraservico.vercel.app",
    year: "2026",
    snippetLang: "typescript",
    snippet: `// RegistraServiço: valida o registro contra os campos do banco
export function validarDados(campos: DefinicaoCampo[], entrada: ValoresDados) {
  const valores: ValoresDados = {};
  const erros: Record<string, string> = {};

  for (const campo of campos) {
    if (!campo.ativo) continue;
    const bruto = entrada[campo.chave];

    if (vazio(bruto)) {
      if (campo.obrigatorio) erros[campo.chave] = \`"\${campo.rotulo}" é obrigatório.\`;
      continue;
    }
    aplicarTipo(campo, bruto, valores, erros);
  }
  return { ok: Object.keys(erros).length === 0, valores, erros };
}`,
  },
  {
    slug: "sintonia",
    name: "Sintonia",
    oneLine: "Rede social onde a conversa gira em torno da música que está tocando",
    what: "Monorepo com API NestJS, site Next.js e app Expo. Tocando agora em tempo real, conversas com mensagens efêmeras (TTL ou visualização única), foguinho e pet do grupo. A integração com serviços de música é uma porta com adapters.",
    role: "Montei a fundação: Clean Architecture na API, a porta de provedor de música com adapters, o domínio puro de efemeridade e de streak, e a camada de LGPD (exportação, exclusão com anonimização e expurgo de mídia).",
    highlights: [
      "Porta de música com adapters: Last.fm como principal, porque o Spotify trava apps novos em 25 usuários",
      "Mensagem efêmera expira por TTL ou no ato da leitura, e o job de expurgo apaga de verdade",
      "Domínio de gamificação puro, sem framework, testado fora do NestJS",
      "Tema claro e escuro reais, com tokens compartilhados entre web e mobile",
    ],
    stack: ["NestJS", "Next.js 15", "Expo", "Prisma", "PostgreSQL", "Turborepo"],
    github: null, // repositório privado
    demo: null,
    year: "2026",
    snippetLang: "typescript",
    snippet: `// Sintonia: a chama do grupo sobe uma vez por dia
export function registerInteraction(state: StreakState | null, now: Date) {
  const today = toUtcDay(now);
  if (!state) return { count: 1, lastActiveDay: today, active: true };

  const gap = daysBetween(state.lastActiveDay, today);
  if (gap <= 0) return { ...state, active: true };            // mesmo dia
  if (gap === 1) return { count: state.count + 1, lastActiveDay: today, active: true };
  return { count: 1, lastActiveDay: today, active: true };    // furou, recomeça
}`,
  },
  {
    slug: "jis",
    name: "JIS",
    oneLine: "Agregador de vagas que estima a chance real de cada uma",
    what: "Coleta vagas de oito fontes públicas sem exigir chave de API, descarta o que não tem chance (vaga velha, senioridade acima, região que não contrata quem está no Brasil) e monta o prompt do currículo sob medida para a vaga que sobrou.",
    role: "Escrevi o critério de corte a partir de pesquisa de recrutamento em vez de chute: aderência mínima de stack, prazo até a vaga virar fantasma e filtro de região. O que reprova em qualquer um deles não recebe nota, é descartado.",
    highlights: [
      "Oito fontes reais, entre elas LinkedIn, Remotive, RemoteOK e WeWorkRemotely",
      "Vaga com mais de 30 dias é descartada: a faixa de vaga fantasma vai de 20% a 35% do total publicado",
      "Sem banco de dados: as vagas vêm em tempo real com cache de 30 minutos e o funil fica no navegador",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Vitest"],
    github: "https://github.com/fabriciojunio/jis",
    labDemo: "/projetos/jis.ts",
    demo: "https://jis-frontend-mocha.vercel.app",
    year: "2026",
    snippetLang: "typescript",
    snippet: `// Os três primeiros não são peso, são porta. Reprovou, nem pontua.
if (vaga.senioridade === "senior" || vaga.senioridade === "lead") return null;
if (vaga.regiao === "outra") return null;
if (vaga.publicadaEmDias > DIAS_ATE_VIRAR_FANTASMA) return null;

const aderencia = proporcaoDeStack(vaga.stack);
if (aderencia < ADERENCIA_MINIMA) return null;

const recencia = 1 - vaga.publicadaEmDias / DIAS_ATE_VIRAR_FANTASMA;
return Math.round(100 * (0.65 * aderencia + 0.35 * recencia));`,
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
    slug: "contaflux",
    name: "Contaflux",
    oneLine: "Conta veículos em vídeo de câmera fixa, por cruzamento de linha",
    what: "Conta os carros que passam por uma via a partir de um vídeo de câmera fixa. Cada veículo é acompanhado quadro a quadro e contado uma única vez, no instante em que atravessa uma linha na cena. Separa por sentido, informa o tipo do veículo e estima velocidade. Tem dois detectores: subtração de fundo, que roda sem instalar nada, e reconhecimento por YOLO.",
    role: "Escrevi a detecção, o rastreio e a regra de contagem, e a dedução automática de onde a linha deve ficar a partir do próprio tráfego. Também a integração do reconhecimento como alternativa à subtração de fundo.",
    highlights: [
      "A linha de contagem é deduzida do tráfego: o programa observa alguns segundos e a coloca perpendicular ao sentido dos carros, sem ninguém clicar",
      "Dois detectores com perguntas diferentes: movimento pergunta se algo se moveu, reconhecimento pergunta se aquilo é um carro",
      "Carro escuro sobre asfalto escuro era classificado como sombra pelo MOG2 e sumia da conta; resolvido usando duas máscaras",
      "Validação com cenas sintéticas de gabarito conhecido, mais cinco vídeos reais conferidos olhando as caixas na tela",
    ],
    stack: ["Python", "OpenCV", "NumPy", "YOLO11", "PyInstaller"],
    github: "https://github.com/fabriciojunio/contaflux",
    labDemo: "/projetos/contaflux.py",
    demo: null,
    year: "2026",
    snippetLang: "python",
    snippet: `# Contaflux: de que lado da linha o veículo está
def lado(self, ponto: tuple[float, float]) -> float:
    # O sinal do produto vetorial diz o lado; a troca de sinal entre
    # dois quadros significa que a linha foi atravessada no intervalo.
    return (self.x2 - self.x1) * (ponto[1] - self.y1) - (
        self.y2 - self.y1
    ) * (ponto[0] - self.x1)`,
  },
  {
    slug: "cardiocam",
    name: "Cardiocam",
    oneLine: "Mede batimentos cardíacos por vídeo, sem encostar na pessoa",
    what: "Estima frequência cardíaca a partir da variação de cor da pele causada pelo fluxo de sangue, captada por uma webcam comum. A técnica é fotopletismografia remota (rPPG). Implementa e compara quatro algoritmos da literatura: GREEN, CHROM, POS e ICA.",
    role: "Montei o caminho inteiro, do recorte do rosto até o número na tela, e a comparação entre os quatro algoritmos. Também a correção pelo fundo do quadro, que é o que sustenta a medida com balanço de branco automático.",
    highlights: [
      "Quatro algoritmos rPPG comparados no mesmo pipeline, com POS como padrão por ser o mais confiável",
      "A parede atrás da pessoa não tem pulso: o que oscila nela é luz do ambiente, e serve de medida direta da perturbação",
      "Com balanço de branco oscilando na banda cardíaca, o acerto foi de 1 em 16 sem a correção por fundo para 16 em 16 com ela",
      "A variação do pulso fica entre 0,1% e 1% da intensidade, abaixo do ruído de um pixel: a média espacial é o que faz o sinal aparecer",
    ],
    stack: ["Python", "OpenCV", "NumPy", "SciPy", "scikit-learn"],
    github: "https://github.com/fabriciojunio/cardiocam",
    labDemo: "/projetos/cardiocam.py",
    demo: null,
    year: "2026",
    snippetLang: "python",
    snippet: `# Cardiocam (POS): projeção no plano ortogonal ao tom de pele
PROJECAO = np.array([[0.0, 1.0, -1.0], [-2.0, 1.0, 1.0]])

def combinar(bloco):
    # Variação só de intensidade anda na direção do tom de pele,
    # e ao projetar no plano ortogonal ela desaparece.
    normalizado = bloco / bloco.mean(axis=1, keepdims=True)
    projetado = PROJECAO @ normalizado

    alfa = np.std(projetado[0]) / np.std(projetado[1])
    return projetado[0] + alfa * projetado[1]`,
  },
  {
    slug: "kaida",
    name: "Kaida: Raízes do Esquecimento",
    oneLine: "Metroidvania 2D em Unity, com o jogo montado por código",
    what: "Metroidvania 2D com seis cenas, habilidades que destrancam caminhos, chefe em confronto único com barra de vida única, três tentativas por partida, três níveis de dificuldade e save automático nos marcos de descanso. O projeto gera os próprios assets: um menu no editor fatia os sprites, monta as animações, os prefabs, os tiles e as cenas a partir do código.",
    role: "Cuidei do controlador do jogador (máquina de estados, um arquivo por estado), do chefe e dos geradores de editor que montam o jogo inteiro a partir do código.",
    highlights: [
      "O jogo é montado por scripts de editor: o repositório guarda a receita, não o arquivo de cena binário que ninguém consegue revisar",
      "Coyote time e buffer de pulo: o salto ainda vale por um instante depois de sair da borda, e o comando dado no ar espera o chão",
      "Máquina de estados com um arquivo por estado do jogador, em vez de uma cadeia de condições no Update",
      "A dificuldade escolhida no menu chega numa cópia dos stats, nunca no asset original, que gravaria a alteração no disco",
      "Build do Windows publicado em releases, para jogar sem instalar a engine",
    ],
    stack: ["Unity 2022.3", "C#", "Unity Test Framework"],
    github: "https://github.com/fabriciojunio/kaida",
    labDemo: "/projetos/kaida.cs",
    demo: null,
    year: "2026",
    snippetLang: "csharp",
    snippet: `// Kaida: o pulo perdoa o erro de alguns quadros
void TickTimers(float dt)
{
    coyoteTimer = Mathf.Max(0f, coyoteTimer - dt);
    jumpBufferTimer = Mathf.Max(0f, jumpBufferTimer - dt);
}

// Comando dado no ar, pouco antes de encostar no chão, espera.
public void BufferJump() { jumpBufferTimer = stats.jumpBufferTime; }

public bool ConsumeJumpBuffer()
{
    if (jumpBufferTimer > 0f) { jumpBufferTimer = 0f; return true; }
    return false;
}`,
  },
  {
    slug: "bicudo",
    name: "Bicudo",
    oneLine: "Jogo de um botão em Unity, com o cenário que se mede pela tela",
    what: "Jogo de um botão na linha do Flappy Bird: o pássaro cai sozinho, sobe quando o jogador manda, e a partida acaba no primeiro encostão. Cena única para os três estados, arte recortada por script, quatro efeitos sonoros gerados por síntese e nenhum arquivo de áudio no repositório.",
    role: "Projeto individual: fiz tudo, do recorte dos sprites e da montagem da cena por código até os testes e o executável.",
    highlights: [
      "O impulso troca a velocidade vertical em vez de somar a ela: dois toques seguidos sobem o mesmo tanto que um, e o jogo passa a ser sobre ritmo",
      "Sem Rigidbody2D. A colisão é uma consulta de círculo a cada quadro, porque quem move pelo transform atravessa o cano entre dois quadros sem disparar evento nenhum",
      "O cenário mede a largura visível ao rodar e refaz a conta se a tela muda: com os limites fixos na cena, o chão sumia pela borda e o cano reaparecia do nada à frente do pássaro em monitor ultrawide",
      "Os quatro efeitos sonoros são sintetizados na inicialização, o que evita uma terceira licença de terceiros num jogo em que quatro bipes resolvem",
      "46 testes, e três deles abrem a cena que vai no executável: o placar já ficou uma partida inteira em zero enquanto os testes chamavam o método de pontuar direto e passavam verdes",
    ],
    stack: ["Unity 2022.3", "C#", "Unity Test Framework"],
    github: "https://github.com/fabriciojunio/bicudo",
    labDemo: "/projetos/bicudo.cs",
    demo: null,
    year: "2026",
    snippetLang: "csharp",
    snippet: `// Bicudo: o impulso troca a velocidade, não soma a ela
public void Bater()
{
    // troca seca: subir sempre a mesma altura, venha de onde vier
    VelocidadeVertical = impulso;
}

void Update()
{
    VelocidadeVertical -= gravidade * Time.deltaTime;
    VelocidadeVertical = Mathf.Max(VelocidadeVertical, -quedaMaxima);
    transform.position += Vector3.up * VelocidadeVertical * Time.deltaTime;
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

// A vitrine é dividida por peso, não por ordem corrida.
//
// O eixo é back-end: integração, fila, segurança e banco. Vem primeiro porque é
// o que eu faço no trabalho e é o que quero que a pessoa leia antes de tudo.
// Depois vêm os produtos que já têm usuário, os trabalhos de faculdade e, por
// último, o que ficou de projetos antigos.

const EIXO = [
  "feira",              // Kafka, outbox, saga com compensação
  "outorga",            // multi-tenant, licença como invariante de domínio
  "codereview-ai",      // Java 21 + Spring Boot, fila e SSE
  "paiol-tech",         // NestJS com CQRS, Open Finance
  "guarda-banco",       // proteção de escrita dentro do servidor de banco
  "authcore",           // JWT RS256, 2FA, RBAC, auditoria
  "quantbot-ml",        // engenharia de dados e CI que quebra o build
];

const PRODUTO = [
  "balcao",             // o modelo não escreve número, quem calcula é o domínio
  "apontamento-horas",  // RBAC, SLA e exportação
  "registraservico",    // multi-tenant configurável
];

const FACULDADE = [
  "conectagente",       // iniciação científica, sem cliente em campo
  "permaneia",          // RAG com fonte citada e fuzzy escrito do zero
  "cardiocam",          // rPPG, quatro algoritmos comparados
  "contaflux",          // visão computacional aplicada
  "mycondpets",         // web em equipe de cinco
  "kaida",              // Unity, cenas geradas por código
  "bicudo",             // Unity, individual
  "laboratorio-vr",     // VR com interação por gaze
];

const OUTROS = [
  "jis",
  "goldata",
  "goldata-pro",
  "sintonia",
  "bravor",
  "koracrm",
  "mente-viva",
  "mundo-do-lukinha",
];

const porSlug = (slug: string) =>
  PROJECTS_SOURCE.find((p) => p.slug === slug)!;

export const PROJETOS_EIXO: SiteProject[] = EIXO.map(porSlug);
export const PROJETOS_PRODUTO: SiteProject[] = PRODUTO.map(porSlug);
export const PROJETOS_FACULDADE: SiteProject[] = FACULDADE.map(porSlug);
export const PROJETOS_OUTROS: SiteProject[] = OUTROS.map(porSlug);

export const PROJECTS: SiteProject[] = [
  ...PROJETOS_EIXO,
  ...PROJETOS_PRODUTO,
  ...PROJETOS_FACULDADE,
  ...PROJETOS_OUTROS,
];

export const SOBRE = {
  nome: "Fabrício Júnio",
  cargo: "Desenvolvedor back-end",
  cidade: "Bauru, SP",
  bio: "Back-end em Java, integração e automação de processo que já está em produção. Prefiro medir antes de mexer a corrigir no escuro.",
  longBio: [
    "Tenho 21 anos, curso Ciência da Computação na UNISAGRADO e trabalho com integração e automação de processo na Digihub, do grupo Lecom. Atendo treze clientes de seguros, saúde, cooperativismo de crédito, auditoria e judiciário.",
    "Não começo sistema do zero. Mexo em processo de negócio vivo, com centenas de instâncias rodando na hora em que a alteração sobe: robô e integração em Java, regra de tela em JavaScript, roteamento e SQL de diagnóstico. Por isso reproduzo a regra atual e rodo contra o histórico real antes de mudar qualquer linha. Se o modelo não acerta o passado, não serve para prever o futuro.",
    "Nos projetos próprios o eixo é o mesmo. A Feira do Comando são três serviços Spring Boot conversando por Kafka, com outbox transacional e saga que compensa. O Outorga trata a licença de exibição como invariante: não existe caminho de código que publique sem ela. Os dois sobem PostgreSQL e Kafka de verdade nos testes, que foi como apareceram quatro defeitos que mock nenhum mostraria.",
  ],
  contato: {
    email: "junioad555@gmail.com",
    github: "https://github.com/fabriciojunio",
    linkedin: "https://www.linkedin.com/in/fabr%C3%ADcioj%C3%BAnio/",
  },
};

export const STACK_GROUPS = [
  {
    label: "eixo",
    items: ["Java 21", "Spring Boot", "SQL", "API REST", "JavaScript"],
  },
  {
    label: "back",
    items: ["NestJS", "Node + TypeScript", "FastAPI (Python)"],
  },
  {
    label: "dados",
    items: ["PostgreSQL", "MySQL", "Redis", "SQLite (WAL + FTS)"],
  },
  {
    label: "mensageria",
    items: ["Kafka", "RabbitMQ", "outbox transacional", "saga"],
  },
  {
    label: "infra",
    items: ["Docker", "GitHub Actions", "Nginx", "Kubernetes"],
  },
  {
    label: "também uso",
    items: ["React 19", "Next.js 15", "React Native", "scikit-learn", "XGBoost"],
  },
];

export const EMPRESAS = [
  "Java",
  "Spring Boot",
  "SQL",
  "API REST",
  "PostgreSQL",
  "Docker",
  "Kafka",
  "RabbitMQ",
  "BPM",
  "Digihub",
  "UNISAGRADO",
  "Incubadora Saruê",
  "Bauru, SP",
];
