import type { VFile } from "../types";

// Cada arquivo é uma vitrine real do projeto: snippet autêntico
// retirado/adaptado do código de produção, com a meta correspondente.

export const projectFiles: VFile[] = [
  {
    path: "/projetos/feira-do-comando.java",
    name: "feira-do-comando.java",
    language: "java",
    meta: {
      project: "Feira do Comando",
      github: "https://github.com/fabriciojunio/feira-do-comando",
      demo: "https://feira-do-comando.vercel.app",
      stack: ["Java 21", "Spring Boot", "Kafka", "PostgreSQL", "MongoDB", "Kubernetes"],
      role: "Quatro servicos conversando por Kafka, com outbox transacional, consumidor idempotente, saga que compensa e modelo de leitura em MongoDB.",
    },
    content: `// A saga do pedido.
//
// O caso dificil nao e o caminho feliz: e a aprovacao do pagamento
// que chega DEPOIS de o cancelamento ja ter comecado. O dinheiro
// saiu, entao ignorar nao e opcao. Tem que voltar.

sealed interface Evento permits PedidoCriado, EstoqueReservado,
        EstoqueRecusado, PagamentoAprovado, PagamentoRecusado { }

Decisao processar(Evento evento, Instant agora) {
    return switch (evento) {

        case EstoqueReservado e when status == RECEBIDO ->
            avancar(ESTOQUE_RESERVADO,
                    new CobrancaSolicitada(id, total));

        case PagamentoAprovado p when status == ESTOQUE_RESERVADO ->
            avancar(CONFIRMADO, new PedidoConfirmado(id));

        // Aqui mora o valor da saga.
        case PagamentoAprovado p when status == CANCELANDO ->
            new Decisao(false,
                List.of(new PagamentoEstornado(
                    id, p.valor(), Motivo.PEDIDO_CANCELADO)),
                "aprovacao tardia: estornando");

        // Evento repetido nao muda nada, e isso e de proposito:
        // o Kafka entrega ao menos uma vez, nao exatamente uma.
        default -> Decisao.ignorar("evento fora de ordem ou repetido");
    };
}

// Sem "default" no switch de um sealed interface, o compilador
// cobra todo caso novo. Evento novo sem tratamento nao compila.`,
  },
  {
    path: "/projetos/modelo-de-leitura.java",
    name: "modelo-de-leitura.java",
    language: "java",
    meta: {
      project: "Feira do Comando: modelo de leitura",
      github: "https://github.com/fabriciojunio/feira-do-comando",
      demo: "https://feira-do-comando.vercel.app",
      stack: ["Java 21", "Spring Boot", "MongoDB", "Kafka"],
      role: "Projecao que monta em MongoDB o documento que a tela precisa ler.",
    },
    content: `// Cada servico tem o proprio banco, e nenhum responde sozinho
// "como esta o meu pedido": a saga vive em pedidos, a reserva em
// estoque e a cobranca em pagamentos. Quem juntava era o navegador,
// com tres chamadas.
//
// Este servico le os mesmos eventos, com grupo proprio, e mantem um
// documento por pedido. Uma leitura devolve tudo.

@KafkaListener(topics = {PEDIDOS, ESTOQUE, PAGAMENTOS}, groupId = "consulta")
public void receber(String carga) throws Exception {
    projetor.aplicar(mapeador.deJson(carga));
}

// Kafka entrega ao MENOS uma vez. Sem esta guarda, reprocessar uma
// particao duplicaria a linha do tempo, e o cliente veria "estoque
// separado" duas vezes num pedido que reservou uma.
public boolean registrar(UUID idDoEvento, String oQue,
                         String detalhe, Instant quando) {
    if (eventosAplicados.contains(idDoEvento)) {
        return false;
    }
    eventosAplicados.add(idDoEvento);
    linhaDoTempo.add(new Marco(oQue, detalhe, quando));
    versao++;
    return true;
}

// MongoDB e nao um quarto PostgreSQL porque o que a tela quer E um
// documento. E a escolha se defende pelo lado oposto: este dado nao e
// fonte da verdade. Ele e derivado dos eventos e pode ser jogado fora
// e reconstruido do topico.`,
  },
  {
    path: "/projetos/outorga.java",
    name: "outorga.java",
    language: "java",
    meta: {
      project: "Outorga TV",
      github: "https://github.com/fabriciojunio/outorga",
      demo: "https://outorga-tv.vercel.app",
      demoAcesso: "espectador@exemplo.com / demonstracao2026",
      stack: ["Java 21", "Spring Boot", "PostgreSQL", "Next.js"],
      role: "Streaming white-label multi-tenant onde a licenca de exibicao e invariante de dominio.",
    },
    content: `// Sem outorga, nao vai ao ar.
//
// A licenca entra por PARAMETRO, e nao por consulta la dentro.
// Parece detalhe e nao e: assim quem chama e obrigado a ter a
// licenca em maos, e nao existe caminho de codigo capaz de
// publicar sem ela. A regra de negocio passa a ser cobrada pelo
// compilador, e nao por revisao de codigo.

public Result<Titulo> publicar(Licenca licenca, Instant agora) {
    if (!licenca.cobre(this.territorio, agora))
        return Result.erro(FalhaDeNegocio.SEM_LICENCA_VIGENTE);

    return Result.ok(comStatus(Status.PUBLICADO));
}

// A varredura horaria funciona nos DOIS sentidos: tira do ar o
// que venceu e devolve o que foi renovado. O segundo sentido
// existe porque um canal derrubado na mao voltou sozinho, e o
// teste que pegou isso ficou.

void revisarDireitos(Instant agora) {
    if (licenca.venceu(agora))      bloquearPorDireito();
    else if (bloqueadoPorDireito)   liberarPorDireito();
}`,
  },
  {
    path: "/projetos/goldata-pro.py",
    name: "goldata-pro.py",
    language: "python",
    runnable: "kelly",
    meta: {
      project: "GolData Pro: Robô de Sinais",
      github: "https://github.com/fabriciojunio/bot-sinais",
      demo: null,
      stack: ["FastAPI", "scikit-learn", "PostgreSQL", "Redis", "Docker"],
      role: "Plataforma de value bets com ML ensemble (Dixon-Coles + Elo) e auditoria por hash SHA-256.",
    },
    content: `# GolData Pro: motor de value bets
# Combina Dixon-Coles (probabilidade) + Elo (força)
# e aplica Kelly fracionário (1/4) sobre o edge.

from dataclasses import dataclass
from math import log

@dataclass(frozen=True)
class Pick:
    home: str
    away: str
    market: str            # "1", "X", "2", "Over_2.5", ...
    odds: float            # odd decimal da casa
    prob: float            # probabilidade do modelo (0..1)
    confidence: float      # 0..1 (concordância DC vs Elo)

    @property
    def edge(self) -> float:
        # esperança matemática por unidade apostada
        return self.prob * self.odds - 1.0

def kelly_fraction(prob: float, odds: float, fraction: float = 0.25) -> float:
    """Kelly fracionário: parte da banca a apostar."""
    b = odds - 1
    if b <= 0:
        return 0.0
    q = 1 - prob
    full = (b * prob - q) / b
    return max(0.0, full * fraction)

def is_value_pick(pick: Pick, min_edge: float = 0.04, min_conf: float = 0.52) -> bool:
    return pick.edge > min_edge and pick.confidence > min_conf

# Exemplo: Palmeiras x Corinthians, mercado "1"
p = Pick(home="Palmeiras", away="Corinthians",
         market="1", odds=2.10, prob=0.55, confidence=0.61)

print(f"edge   = {p.edge:.3f}")
print(f"kelly% = {kelly_fraction(p.prob, p.odds):.3%}")
print(f"value? = {is_value_pick(p)}")
`,
  },

  {
    path: "/projetos/goldata.py",
    name: "goldata.py",
    language: "python",
    runnable: "xg",
    meta: {
      project: "GolData",
      github: "https://github.com/fabriciojunio/goldata",
      demo: null,
      stack: ["Python", "FastAPI", "XGBoost", "NetworkX", "Plotly"],
      role: "Analytics de futebol com xG, xA, PPDA e análise de rede de passes.",
    },
    content: `# GolData: modelo de Expected Goals (xG)
# Versão didática do modelo treinado em XGBoost.
# Features: distância e ângulo do gol, situação de jogo.

from math import atan2, degrees, exp, hypot

GOAL_X = 105.0       # metros (campo padrão)
GOAL_Y = 34.0
POST_HALF = 3.66     # metade da largura do gol

def shot_features(x: float, y: float) -> dict:
    """Coordenadas em metros, origem no escanteio defensivo."""
    dx = GOAL_X - x
    dy = GOAL_Y - y
    distance = hypot(dx, dy)
    angle = atan2(2 * POST_HALF * dx,
                  dx ** 2 + dy ** 2 - POST_HALF ** 2)
    return {"distance": distance, "angle_deg": degrees(angle)}

def xg(x: float, y: float, *, header: bool = False) -> float:
    """xG calibrado em ~80k chutes da Série A."""
    f = shot_features(x, y)
    # coeficientes obtidos via logistic regression
    z = (3.10
         - 0.140 * f["distance"]
         + 0.012 * f["angle_deg"]
         - 0.45 * (1 if header else 0))
    return 1 / (1 + exp(-z))

# Pênalti, área pequena, fora da grande área
for (x, y, tag) in [(94, 34, "pênalti"),
                    (102, 34, "área pequena"),
                    (85, 30, "fora da grande área")]:
    print(f"{tag:22s} xG = {xg(x, y):.3f}")
`,
  },

  {
    path: "/projetos/jis.ts",
    name: "jis.ts",
    language: "typescript",
    runnable: "vagas-score",
    meta: {
      project: "JIS: agregador de vagas",
      github: "https://github.com/fabriciojunio/jis",
      demo: "https://jis-vagas.vercel.app",
      stack: ["Next.js 15", "TypeScript", "React 19", "Vitest"],
      role: "Coleta vagas de oito fontes públicas, estima a chance real de contratação de cada uma e monta o prompt do currículo sob medida.",
    },
    content: `// JIS: a chance de uma vaga, calculada com o que a pesquisa de
// recrutamento diz, e não com o que dá vontade de acreditar.

type Vaga = {
  titulo: string;
  stack: string[];
  publicadaEmDias: number;
  regiao: "brasil" | "latam" | "worldwide" | "outra";
  senioridade: "junior" | "pleno" | "senior" | "lead";
};

const MEU_STACK = ["java", "spring", "typescript", "node", "sql"];

// Cobrir metade dos requisitos já iguala a taxa de entrevista de quem
// cobre quase todos. Acima disso o ganho some, então o corte fica aqui.
const ADERENCIA_MINIMA = 0.5;

// Vaga com mais de 30 dias tem chance alta de ser fantasma: publicada
// para formar banco de currículo, sem posição aberta do outro lado.
const DIAS_ATE_VIRAR_FANTASMA = 30;

export function chanceDeContratacao(vaga: Vaga): number | null {
  // Os três primeiros não são peso, são porta. Reprovou, nem pontua.
  if (vaga.senioridade === "senior" || vaga.senioridade === "lead") return null;
  if (vaga.regiao === "outra") return null;
  if (vaga.publicadaEmDias > DIAS_ATE_VIRAR_FANTASMA) return null;

  const aderencia = proporcaoDeStack(vaga.stack);
  if (aderencia < ADERENCIA_MINIMA) return null;

  const recencia = 1 - vaga.publicadaEmDias / DIAS_ATE_VIRAR_FANTASMA;

  return Math.round(100 * (0.65 * aderencia + 0.35 * recencia));
}

function proporcaoDeStack(exigido: string[]): number {
  if (exigido.length === 0) return 0;
  const tenho = exigido.filter((t) =>
    MEU_STACK.includes(t.toLowerCase()),
  ).length;
  return tenho / exigido.length;
}
`,
  },

  {
    path: "/projetos/codereview-ai.java",
    name: "codereview-ai.java",
    language: "java",
    meta: {
      project: "CodeReview AI",
      github: "https://github.com/fabriciojunio/codereview-ai",
      demo: null,
      stack: ["Java 21", "Spring Boot", "Ollama", "RabbitMQ", "Redis"],
      role: "Plataforma de code review automatizado com LLM local (Ollama), processamento via RabbitMQ e cache Redis de 24h.",
    },
    content: `// CodeReview AI: orquestrador assíncrono de revisão
// Envia código pra fila RabbitMQ; consumer chama Ollama.

package com.fabricio.codereview.review;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import java.time.Duration;
import java.util.UUID;

public class ReviewService {

    private final RabbitTemplate rabbit;
    private final StringRedisTemplate redis;
    private final ReviewRepository repo;

    public ReviewService(RabbitTemplate rabbit,
                         StringRedisTemplate redis,
                         ReviewRepository repo) {
        this.rabbit = rabbit;
        this.redis  = redis;
        this.repo   = repo;
    }

    /** Submete código para análise. Retorna ticket. */
    public String submit(String code, Language lang, String userId) {
        String hash = sha256(code + ":" + lang);
        String cached = redis.opsForValue().get("review:" + hash);
        if (cached != null) return cached;     // hit imediato

        String ticket = UUID.randomUUID().toString();
        repo.create(new ReviewJob(ticket, hash, lang, userId, "PENDING"));

        rabbit.convertAndSend("review.queue",
            new ReviewMessage(ticket, code, lang));

        return ticket;
    }

    /** Listener atualiza estado + faz cache 24h. */
    public void onResult(String ticket, String hash, String result) {
        repo.complete(ticket, result);
        redis.opsForValue()
             .set("review:" + hash, result, Duration.ofHours(24));
    }
}
`,
  },

  {
    path: "/projetos/conectagente.tsx",
    name: "conectagente.tsx",
    language: "typescript",
    meta: {
      project: "ConectAgente",
      github: "https://github.com/fabriciojunio/ConectAgente",
      demo: "https://conectagente-web.vercel.app",
      stack: ["React Native", "Expo SDK 54", "SQLite", "Supabase", "Zod"],
      role: "App mobile offline-first para Agentes Comunitários de Saúde do SUS. SQLite com WAL+FTS, sync automático ao reconectar.",
    },
    content: `// ConectAgente: sincronização offline-first
// SQLite local (WAL + FTS) → Supabase, ao reconectar.

import * as SQLite from "expo-sqlite";
import NetInfo from "@react-native-community/netinfo";
import { supabase } from "./supabase";

type Pending = {
  id: string;
  table: "visita" | "ficha" | "morador";
  op: "insert" | "update" | "delete";
  payload: Record<string, unknown>;
  at: string;
};

export class SyncEngine {
  constructor(private db: SQLite.SQLiteDatabase) {}

  /** Sobe pendências em batch quando há rede. */
  async drain(): Promise<{ sent: number; failed: number }> {
    const online = (await NetInfo.fetch()).isInternetReachable;
    if (!online) return { sent: 0, failed: 0 };

    const rows = await this.db.getAllAsync<Pending>(
      "SELECT * FROM outbox ORDER BY at ASC LIMIT 100"
    );

    let sent = 0;
    let failed = 0;

    for (const p of rows) {
      try {
        await this.apply(p);
        await this.db.runAsync("DELETE FROM outbox WHERE id = ?", [p.id]);
        sent++;
      } catch (err) {
        failed++;
        await this.db.runAsync(
          "UPDATE outbox SET retries = retries + 1 WHERE id = ?",
          [p.id]
        );
        if ((err as Error).message.includes("conflict")) break;
      }
    }
    return { sent, failed };
  }

  private async apply(p: Pending) {
    const tbl = supabase.from(p.table);
    if (p.op === "insert") return tbl.insert(p.payload).throwOnError();
    if (p.op === "update") return tbl
        .update(p.payload)
        .eq("id", p.payload.id as string)
        .throwOnError();
    if (p.op === "delete") return tbl
        .delete()
        .eq("id", p.payload.id as string)
        .throwOnError();
  }
}
`,
  },

  {
    path: "/projetos/koracrm.php",
    name: "koracrm.php",
    language: "php",
    meta: {
      project: "KoraCRM",
      github: "https://github.com/fabriciojunio/KoraCRM",
      demo: "https://koracrm-frontend.vercel.app",
      stack: ["Laravel 11", "React 18", "Sanctum", "Redis", "AWS S3"],
      role: "CRM com pipeline Kanban, gestão de contatos, dashboard analítico e API Laravel com Sanctum + Swagger.",
    },
    content: `<?php
// KoraCRM: service de movimentação do pipeline (Kanban)
// Move um deal entre estágios com auditoria e cálculo de
// taxa de conversão por estágio.

namespace App\\Services;

use App\\Models\\Deal;
use App\\Models\\Stage;
use App\\Events\\DealMoved;
use Illuminate\\Support\\Facades\\DB;

class PipelineService
{
    public function moveDeal(Deal $deal, Stage $to, ?int $position = null): Deal
    {
        return DB::transaction(function () use ($deal, $to, $position) {
            $from = $deal->stage;

            $deal->update([
                'stage_id'   => $to->id,
                'position'   => $position ?? $this->nextPosition($to),
                'moved_at'   => now(),
            ]);

            $deal->history()->create([
                'from_stage_id' => $from->id,
                'to_stage_id'   => $to->id,
                'user_id'       => auth()->id(),
                'reason'        => request('reason'),
            ]);

            event(new DealMoved($deal, $from, $to));

            return $deal->fresh(['stage', 'contact', 'company']);
        });
    }

    public function conversionByStage(int $pipelineId): array
    {
        return Stage::where('pipeline_id', $pipelineId)
            ->withCount(['deals', 'wonDeals'])
            ->get()
            ->mapWithKeys(fn ($s) => [
                $s->name => $s->deals_count
                    ? round($s->won_deals_count / $s->deals_count, 3)
                    : 0.0,
            ])
            ->toArray();
    }

    private function nextPosition(Stage $stage): int
    {
        return (int) $stage->deals()->max('position') + 1;
    }
}
`,
  },

  {
    path: "/projetos/apontamento-horas.ts",
    name: "apontamento-horas.ts",
    language: "typescript",
    runnable: "zod",
    meta: {
      project: "Horalis",
      demo: "https://apontamento-horas.vercel.app",
      stack: ["Next.js 14", "Prisma", "PostgreSQL", "JWT", "Tailwind"],
      role: "Plataforma multiusuário de apontamento de horas com RBAC, SLA automático, dashboards de controle, auditoria e relatórios Excel.",
    },
    content: `// Apontamento de Horas: validação Zod no boundary da API.
// Tudo que chega na route handler passa por aqui antes
// de tocar o domínio (Prisma).

import { z } from "zod";

export const TIPOS_VALIDOS = [
  "desenvolvimento", "mapeamento", "suporte", "retrabalho",
  "reuniao", "treinamento", "despesas", "apoio-comercial",
  "apoio-diversos", "ausencia", "outros",
] as const;

export const ApontamentoCreateSchema = z.object({
  tipo: z.enum(TIPOS_VALIDOS, { message: "Tipo inválido." }),
  descricao: z
    .string({ message: "Descrição obrigatória." })
    .min(1, "Descrição não pode ser vazia.")
    .max(1000, "Descrição muito longa (máx. 1000 caracteres).")
    .trim(),
  data: z
    .string({ message: "Data obrigatória." })
    .regex(/^\\d{4}-\\d{2}-\\d{2}$/, "Formato de data inválido. Use AAAA-MM-DD.")
    .refine((d) => !isNaN(new Date(d).getTime()), "Data inválida."),
  // Aceita "2.5" ou 2.5 e normaliza: 30min a 24h por apontamento.
  horas: z
    .union([z.string(), z.number()])
    .transform((v) => (typeof v === "string" ? parseFloat(v) : v))
    .refine((v) => !isNaN(v), "Horas inválidas.")
    .refine((v) => v >= 0.5, "Mínimo de 30 minutos.")
    .refine((v) => v <= 24, "Máximo de 24h por apontamento."),
  clienteId: z.string({ message: "Cliente obrigatório." }).min(1, "Selecione um cliente."),
  chamado: z.string().max(100, "Chamado muito longo.").optional().nullable(),
});

export const ApontamentoUpdateSchema = ApontamentoCreateSchema
  .partial()
  .extend({ status: z.enum(["pendente", "lancado"]).optional() });

export type ApontamentoCreateInput = z.infer<typeof ApontamentoCreateSchema>;

// Uso em uma route handler do Next.js:
// const body = await req.json();
// const parsed = ApontamentoCreateSchema.safeParse(body);
// if (!parsed.success) return NextResponse.json({ error }, { status: 400 });
// await apontamentoRepository.create({ ...parsed.data, usuarioId });
`,
  },

  {
    path: "/projetos/mycondpets.ts",
    name: "mycondpets.ts",
    language: "typescript",
    meta: {
      project: "MyCondPets",
      github: "https://github.com/fabriciojunio/MyCondPets",
      demo: "https://mycondpets.vercel.app",
      stack: ["Next.js 15", "React 19", "NextAuth.js", "PostgreSQL", "Supabase"],
      role: "Gestão de pets em condomínios. Login Google OAuth, cadastro de tutores e pets, mural de comunicados, painel admin.",
    },
    content: `// MyCondPets: guarda de role no App Router (Next.js 15)
// Garante que apenas SÍNDICO acessa o painel admin.

import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";

const ADMIN_ROUTES = ["/admin"];
const ROLES_ADMIN  = new Set(["SINDICO", "ADMIN"]);

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const isAdmin = ADMIN_ROUTES.some((r) => url.pathname.startsWith(r));
  if (!isAdmin) return NextResponse.next();

  const session = await auth();
  if (!session) {
    const login = new URL("/login", url);
    login.searchParams.set("redirect", url.pathname);
    return NextResponse.redirect(login);
  }

  if (!ROLES_ADMIN.has(session.user.role)) {
    return NextResponse.rewrite(new URL("/403", url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
`,
  },

  {
    path: "/projetos/paiol-tech.ts",
    name: "paiol-tech.ts",
    language: "typescript",
    meta: {
      project: "Paiol Tech",
      github: "https://github.com/fabriciojunio/paiol-tech",
      demo: "https://paiol-tech.vercel.app",
      stack: ["Next.js 15", "NestJS", "CQRS", "Turborepo", "PWA"],
      role: "SaaS de gestão de dívidas rurais. Magic link, alertas WhatsApp, Open Finance, monorepo Turborepo, NestJS com CQRS.",
    },
    content: `// Paiol Tech: handler CQRS para vencimento de dívida
// Aplica DDD: o aggregate emite domain events que os
// handlers reagem (notificação WhatsApp, log de auditoria).

import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import type { DebtRepository } from "../domain/debt.repository";
import type { NotificationGateway } from "../infra/notification.gateway";
import { DebtDueCommand } from "./debt-due.command";

@CommandHandler(DebtDueCommand)
export class DebtDueHandler implements ICommandHandler<DebtDueCommand> {
  constructor(
    @Inject("DebtRepository") private readonly debts: DebtRepository,
    @Inject("Notify")          private readonly notify: NotificationGateway,
  ) {}

  async execute(cmd: DebtDueCommand): Promise<void> {
    const debt = await this.debts.byId(cmd.debtId);
    if (!debt) throw new Error("debt:not-found");

    debt.markDue();                         // emite DebtMarkedDueEvent

    await this.debts.save(debt);
    await this.notify.whatsapp({
      to: debt.farmer.phone,
      template: "debt_due_v2",
      vars: {
        nome:  debt.farmer.firstName,
        valor: debt.amount.formatted("pt-BR"),
        prazo: debt.dueDate.toISOString().slice(0, 10),
      },
    });
  }
}
`,
  },

  {
    path: "/projetos/quantbot-ml.py",
    name: "quantbot-ml.py",
    language: "python",
    meta: {
      project: "Quantbot ML",
      github: "https://github.com/fabriciojunio/quantbot-ml",
      demo: null,
      stack: ["Python", "PyTorch", "FinBERT-PT-BR", "FastAPI", "GitHub Actions"],
      role: "Renda passiva (Barsi/Bazin) que opera sozinha com dinheiro simulado e aprende: carteira paper + feedback que mede picks contra o CDI, multi-fonte (Fundamentus, Banco Central, ~28 feeds), sentimento FinBERT-PT-BR e automação na nuvem (GitHub Actions + CI).",
    },
    content: `# Quantbot ML: triagem de ações pelo método Barsi/Bazin
# Renda passiva de longo prazo: o que importa é o dividendo
# consistente, não a oscilação de preço de curto prazo.

from dataclasses import dataclass

# Setores "BESTIES" (perenes) que o método exige:
# Bancos, Energia, Seguros, Telecom, Infraestrutura.
BESTIES = {"ITUB4", "BBAS3", "TAEE11", "EGIE3", "BBSE3", "SAPR11"}

@dataclass
class Acao:
    ticker: str
    preco: float
    dy_12m: float        # dividend yield 12 meses (%)
    payout: float        # % do lucro distribuído
    anos_pagando: int    # histórico sem interrupção

    @property
    def dividendo_anual(self) -> float:
        return self.preco * (self.dy_12m / 100)

    def preco_teto_bazin(self, dy_alvo: float = 8.0) -> float:
        # Preço justo: onde o DY atinge o piso. Com a Selic alta,
        # exijo 8% em vez dos 6% clássicos do Bazin.
        return round(self.dividendo_anual / (dy_alvo / 100), 2)

    def aprovada(self) -> bool:
        return (
            self.ticker in BESTIES
            and self.dy_12m >= 5.0
            and self.payout >= 40.0
            and self.anos_pagando >= 5
            and self.preco <= self.preco_teto_bazin()
        )

# ITUB4 a R$32, DY 7%, payout 60%, 15 anos pagando
itau = Acao("ITUB4", 32.0, 7.0, 60.0, 15)
print(f"teto Bazin: R\${itau.preco_teto_bazin():.2f}")
print(f"aprovada?   {itau.aprovada()}")
`,
  },

  {
    path: "/projetos/authcore.ts",
    name: "authcore.ts",
    language: "typescript",
    meta: {
      project: "AuthCore",
      github: "https://github.com/fabriciojunio/authcore",
      demo: "https://frontend-tan-mu-38.vercel.app",
      stack: ["Node.js", "Express", "TypeORM", "JWT + 2FA", "Docker"],
      role: "API de autenticação com Clean Architecture, JWT + 2FA TOTP, RBAC (3 roles) e 23 testes (unit + integração).",
    },
    content: `// AuthCore: refresh-token rotation com blacklist em Redis
// Cada refresh emite par novo e invalida o anterior.

import { randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
import type { RedisClientType } from "redis";

interface Pair { access: string; refresh: string; jti: string; }
interface Deps { redis: RedisClientType; secret: string; }

export class TokenService {
  constructor(private readonly deps: Deps) {}

  async issue(userId: string, role: string): Promise<Pair> {
    const jti = randomBytes(16).toString("hex");
    const access = jwt.sign(
      { sub: userId, role }, this.deps.secret,
      { algorithm: "HS256", expiresIn: "15m", jwtid: jti },
    );
    const refresh = jwt.sign(
      { sub: userId, jti }, this.deps.secret,
      { algorithm: "HS256", expiresIn: "7d" },
    );
    await this.deps.redis.set(\`rt:\${jti}\`, userId, { EX: 7 * 24 * 3600 });
    return { access, refresh, jti };
  }

  async rotate(refresh: string): Promise<Pair> {
    const decoded = jwt.verify(refresh, this.deps.secret) as
      { sub: string; jti: string };
    const ok = await this.deps.redis.get(\`rt:\${decoded.jti}\`);
    if (!ok) throw new Error("refresh:revoked");

    await this.deps.redis.del(\`rt:\${decoded.jti}\`);          // invalida
    return this.issue(decoded.sub, await this.roleOf(decoded.sub));
  }

  private async roleOf(userId: string): Promise<string> {
    return (await this.deps.redis.get(\`role:\${userId}\`)) ?? "user";
  }
}
`,
  },

  {
    path: "/projetos/mente-viva.tsx",
    name: "mente-viva.tsx",
    language: "typescript",
    meta: {
      project: "Mente Viva",
      github: "https://github.com/fabriciojunio/mente-viva",
      demo: null,
      stack: ["React Native", "Expo SDK 50", "AsyncStorage", "GitHub Actions"],
      role: "App de exercícios cognitivos para prevenção do Alzheimer. 7 mini-jogos com timer, scoring e streaks. APK gerado via GitHub Actions.",
    },
    content: `// Mente Viva: engine puro do jogo (sem React, testável)
// A camada de UI só lê o snapshot e despacha actions.

export type Cell = { letter: string; row: number; col: number };
export type Word = { word: string; cells: Cell[]; found: boolean };

export interface BoardState {
  size: number;
  grid: string[][];
  words: Word[];
  selection: Cell[];
  score: number;
}

export function selectCell(state: BoardState, cell: Cell): BoardState {
  const last = state.selection[state.selection.length - 1];
  if (last && !areAligned([...state.selection, cell])) {
    return { ...state, selection: [cell] };
  }
  return { ...state, selection: [...state.selection, cell] };
}

export function commitSelection(state: BoardState): BoardState {
  const picked = state.selection.map((c) => c.letter).join("");
  const idx = state.words.findIndex(
    (w) => !w.found && (w.word === picked || w.word === reverse(picked)),
  );
  if (idx < 0) return { ...state, selection: [] };

  const words = [...state.words];
  words[idx] = { ...words[idx], found: true };
  return {
    ...state,
    words,
    selection: [],
    score: state.score + words[idx].word.length * 10,
  };
}

function areAligned(cells: Cell[]): boolean {
  if (cells.length < 2) return true;
  const dr = cells[1].row - cells[0].row;
  const dc = cells[1].col - cells[0].col;
  for (let i = 2; i < cells.length; i++) {
    if (cells[i].row - cells[i - 1].row !== dr) return false;
    if (cells[i].col - cells[i - 1].col !== dc) return false;
  }
  return true;
}

const reverse = (s: string) => s.split("").reverse().join("");
`,
  },

  {
    path: "/projetos/mundo-do-lukinha.tsx",
    name: "mundo-do-lukinha.tsx",
    language: "typescript",
    meta: {
      project: "Mundo do Lukinha",
      github: "https://github.com/fabriciojunio/mundo-do-lukinha",
      demo: "https://mundo-do-lukinha.vercel.app",
      stack: ["Next.js 14", "TypeScript", "Zustand", "pnpm workspaces"],
      role: "Plataforma educativa com 6 jogos para crianças de 3 a 14 anos. Adaptação automática por faixa etária, filosofia não punitiva.",
    },
    content: `// Mundo do Lukinha: adaptação de dificuldade por faixa
// Define questões e tempos com base na idade da criança.

export type Faixa = "pintinho" | "explorador" | "aventureiro" | "mestre";

interface FaixaSpec {
  idade: [number, number];
  segundosPorQuestao: number;
  numeroDeQuestoes: number;
  permiteNegativos: boolean;
  limite: number;
}

export const FAIXAS: Record<Faixa, FaixaSpec> = {
  pintinho:    { idade: [3, 5],   segundosPorQuestao: 30, numeroDeQuestoes:  5, permiteNegativos: false, limite: 10  },
  explorador:  { idade: [6, 8],   segundosPorQuestao: 20, numeroDeQuestoes: 10, permiteNegativos: false, limite: 50  },
  aventureiro: { idade: [9, 11],  segundosPorQuestao: 15, numeroDeQuestoes: 15, permiteNegativos: true,  limite: 100 },
  mestre:      { idade: [12, 14], segundosPorQuestao: 10, numeroDeQuestoes: 20, permiteNegativos: true,  limite: 1000 },
};

export function faixaDaIdade(idade: number): Faixa {
  if (idade <= 5)  return "pintinho";
  if (idade <= 8)  return "explorador";
  if (idade <= 11) return "aventureiro";
  return "mestre";
}

/** Encoraja, nunca pune. Filosofia do produto. */
export function feedback(acertou: boolean): string {
  if (acertou) {
    return pick([
      "Você arrasou!",
      "Continua assim, campeão!",
      "Que orgulho!",
      "Mais uma na conta!",
    ]);
  }
  return pick([
    "Quase! Tenta de novo, você consegue.",
    "Não foi dessa vez, mas você está ficando craque.",
    "Errar faz parte! Bora a próxima.",
  ]);
}

const pick = <T,>(xs: T[]): T => xs[Math.floor(Math.random() * xs.length)];
`,
  },

  {
    path: "/projetos/bravor.ts",
    name: "bravor.ts",
    language: "typescript",
    meta: {
      project: "BRAVOR",
      demo: "https://bravor.vercel.app",
      stack: ["Next.js 15", "React 19", "Prisma", "Supabase", "Capacitor"],
      role: "Coach de musculação e corrida com treino, nutrição e recuperação adaptativos. Motor de domínio isolado (142 testes, ~94%), sessão JWT httpOnly e segurança no middleware. Repositório privado.",
    },
    content: `// BRAVOR: segurança no middleware (sessão + CSRF + headers)
// Renova o cookie quando passou de 1 dia desde a emissão e
// aplica headers de segurança nas respostas do próprio middleware.

import { NextResponse, type NextRequest } from "next/server";
import { verifySession, signSession, COOKIE_NAME, cookieOptions } from "@/lib/session";
import { validarOrigem } from "@/lib/csrf";

const RENOVAR_APOS_SEG = 24 * 60 * 60;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isPublic(pathname)) return NextResponse.next();

  // CSRF: mutações só com origem confiável (defesa CVE-2025-29927).
  if (request.method !== "GET" && !validarOrigem(request)) {
    return new NextResponse("origem inválida", { status: 403 });
  }

  const session = await verifySession(request.cookies.get(COOKIE_NAME)?.value);
  if (!session) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  const res = NextResponse.next();

  // Renovação deslizante: mantém logado quem usa, expira por inatividade.
  const idadeSeg = Math.floor(Date.now() / 1000) - session.iat;
  if (idadeSeg > RENOVAR_APOS_SEG) {
    res.cookies.set(COOKIE_NAME, await signSession(session), cookieOptions);
  }

  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.delete("X-Powered-By");
  return res;
}
`,
  },

  {
    path: "/projetos/balcao.ts",
    name: "balcao.ts",
    language: "typescript",
    meta: {
      project: "Balcão",
      demo: null,
      stack: ["Node 20", "TypeScript", "Fastify", "Prisma", "PostgreSQL", "Zod"],
      role: "Agente de vendas e trocas no WhatsApp para lojas de celular. O modelo de linguagem não escreve números: quem calcula é o domínio, e um auditor confere cada algarismo antes do envio. Repositório privado.",
    },
    content: `// Balcão: o auditor de saída, a última trava antes do envio.
// Todo número da mensagem precisa ter origem numa consulta
// registrada nesta conversa. Qualquer outro bloqueia o envio.

export type TipoViolacao =
  | "monetario_nao_autorizado"
  | "percentual_nao_autorizado"
  | "numero_sem_formatacao"
  | "marcador_nao_resolvido"
  | "ressalva_ausente";

export interface Violacao {
  readonly tipo: TipoViolacao;
  readonly trecho: string;
  readonly motivo: string;
}

export interface ContextoAuditoria {
  /** Valores devolvidos pelas ferramentas nesta rodada, em centavos. */
  readonly monetariosPermitidos: readonly number[];
  readonly percentuaisPermitidos: readonly number[];
  /** Abaixo deste valor, número solto é considerado inofensivo. */
  readonly limiarNumeroSolto: number;
  /** Texto exigido na mensagem, como a ressalva de pré-avaliação. */
  readonly ressalvaExigida?: string;
}

const combina = (v: number, permitidos: readonly number[], tol = 0) =>
  permitidos.some((p) => Math.abs(p - v) <= tol);

/**
 * Não corrige nada: aprova ou reprova. Quem trata a reprovação é o
 * orquestrador, que tenta de novo e, na segunda falha, chama um humano.
 */
export function auditarMensagem(texto: string, ctx: ContextoAuditoria) {
  const violacoes: Violacao[] = [];

  if (/\\{\\{|\\}\\}/.test(texto)) {
    violacoes.push({
      tipo: "marcador_nao_resolvido",
      trecho: texto.match(/\\{\\{[^}]*\\}\\}?/)?.[0] ?? "{{",
      motivo: "Sobrou marcador na mensagem final.",
    });
  }

  // Valor de troca sem "pré-avaliação" é oferta vinculante (art. 30 do CDC).
  if (ctx.ressalvaExigida && !texto.toLowerCase().includes(ctx.ressalvaExigida)) {
    violacoes.push({
      tipo: "ressalva_ausente",
      trecho: ctx.ressalvaExigida,
      motivo: "A mensagem cita valor de troca sem dizer que é pré-avaliação.",
    });
  }

  for (const o of extrairOcorrencias(texto)) {
    if (o.tipo === "monetario" && !combina(o.valor, ctx.monetariosPermitidos)) {
      violacoes.push({
        tipo: "monetario_nao_autorizado",
        trecho: o.bruto,
        motivo: "Valor sem origem em consulta registrada nesta conversa.",
      });
    }
    // "fica em 1200" é ambíguo para o cliente e barato de refazer:
    // toda quantia sai formatada, sempre.
    if (o.tipo === "solto" && o.valor >= ctx.limiarNumeroSolto) {
      violacoes.push({
        tipo: "numero_sem_formatacao",
        trecho: o.bruto,
        motivo: "Número alto escrito solto, sem formatação de moeda.",
      });
    }
  }

  return { aprovado: violacoes.length === 0, violacoes };
}
`,
  },

  {
    path: "/projetos/guarda-banco.sql",
    name: "guarda-banco.sql",
    language: "sql",
    meta: {
      project: "Guarda do Banco",
      demo: null,
      stack: ["PostgreSQL", "PL/pgSQL", "MySQL", "SQL Server", "Python"],
      role: "Trava no servidor de banco contra DELETE e UPDATE acidentais: limite de linhas afetadas por comando, auditoria e liberação temporária com motivo. Repositório privado.",
    },
    content: `-- Guarda do Banco: trigger que conta as linhas e decide, linha a linha.
--
-- O núcleo não é detectar DELETE sem WHERE, é limite de linhas
-- afetadas por comando. Uma regra cobre WHERE amplo demais, OR no
-- lugar de AND, cascata inesperada e filtro de data errado.
--
-- Abortar em BEFORE ROW é melhor que contar no fim: falha na linha
-- do limite mais um, sem materializar milhões de linhas na memória.

create or replace function guarda.contar_e_checar()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, guarda
as $$
declare
    v_chave   text := guarda.chave_contador(tg_op);
    v_linhas  bigint;
    v_limite  integer;
    v_retorno record;
begin
    if tg_op = 'DELETE' then
        v_retorno := old;
    else
        v_retorno := new;
    end if;

    v_linhas := guarda.ler_contador(v_chave) + 1;
    perform set_config(v_chave, v_linhas::text, true);

    -- Liberação vale só dentro da transação e exige motivo escrito.
    if guarda.esta_liberado() then
        return v_retorno;
    end if;

    -- NULL no limite significa proteção desligada de propósito na tabela.
    v_limite := guarda.limite(tg_table_schema, tg_table_name, tg_op);
    if v_limite is null or v_linhas <= v_limite then
        return v_retorno;
    end if;

    -- O RAISE EXCEPTION desfaz a transação inteira, e com ela qualquer
    -- INSERT que fizéssemos na tabela de auditoria. Por isso o registro
    -- do bloqueio vai para o log do servidor, que não é transacional.
    raise warning
        'GUARDA bloqueou % em %.%: % linhas, limite %. usuário=% host=%',
        tg_op, tg_table_schema, tg_table_name, v_linhas, v_limite,
        session_user, coalesce(host(inet_client_addr()), 'local');

    raise exception
        'GUARDA: % em %.% passou de % linhas e foi bloqueado.',
        tg_op, tg_table_schema, tg_table_name, v_limite
        using
            errcode = 'P0001',
            detail  = 'Provável WHERE mais amplo do que o pretendido, ou CASCADE inesperado.',
            hint    = 'Se for intencional: BEGIN; SELECT guarda.liberar(''motivo''); ...';
end;
$$;
`,
  },

  {
    path: "/projetos/registraservico.ts",
    name: "registraservico.ts",
    language: "typescript",
    meta: {
      project: "RegistraServiço",
      demo: "https://registraservico.vercel.app",
      stack: ["Next.js 14", "TypeScript", "Prisma", "PostgreSQL", "Zod"],
      role: "Registro de prestação de serviços multi-tenant com tipos e campos configuráveis pela organização, auditoria, exportação para BI e PWA. Repositório privado.",
    },
    content: `// RegistraServiço: validação dinâmica dos valores de um registro
// contra a definição de campos do seu TipoServico.
//
// É o coração configurável: o "formulário" não está no código,
// está no banco. O mesmo motor atende uma autarquia hoje e outra
// empresa amanhã, sem reescrever nada.

import type { TipoCampo } from "@prisma/client";

export interface DefinicaoCampo {
  chave: string;
  rotulo: string;
  tipo: TipoCampo;
  obrigatorio: boolean;
  opcoes: string[];
  ativo: boolean;
}

export type ValoresDados = Record<string, unknown>;

const vazio = (v: unknown) =>
  v === undefined || v === null || (typeof v === "string" && v.trim() === "");

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

    switch (campo.tipo) {
      case "TEXTO":
      case "TEXTO_LONGO":
      case "FOTO": // FOTO guarda a URL/identificador do anexo
        if (typeof bruto !== "string") erros[campo.chave] = \`"\${campo.rotulo}" deve ser texto.\`;
        else valores[campo.chave] = bruto.trim();
        break;

      case "NUMERO": {
        const n = typeof bruto === "number" ? bruto : Number(bruto);
        if (Number.isNaN(n)) erros[campo.chave] = \`"\${campo.rotulo}" deve ser um número.\`;
        else valores[campo.chave] = n;
        break;
      }

      case "DATA": {
        const d = new Date(String(bruto));
        if (Number.isNaN(d.getTime())) erros[campo.chave] = \`"\${campo.rotulo}" deve ser uma data válida.\`;
        else valores[campo.chave] = d.toISOString();
        break;
      }

      case "SELECAO": {
        const s = String(bruto);
        if (!campo.opcoes.includes(s)) {
          erros[campo.chave] = \`"\${campo.rotulo}" deve ser uma das opções: \${campo.opcoes.join(", ")}.\`;
        } else {
          valores[campo.chave] = s;
        }
        break;
      }
    }
  }

  return { ok: Object.keys(erros).length === 0, valores, erros };
}
`,
  },

  {
    path: "/projetos/sintonia.ts",
    name: "sintonia.ts",
    language: "typescript",
    meta: {
      project: "Sintonia",
      demo: null,
      stack: ["NestJS", "Next.js 15", "Expo", "Prisma", "PostgreSQL", "Turborepo"],
      role: "Rede social em que a conversa gira em torno da música que está tocando. API NestJS, site Next.js e app Expo no mesmo monorepo, com mensagens efêmeras e gamificação. Repositório privado.",
    },
    content: `// Sintonia: domínio puro de gamificação e de efemeridade.
// Nada de NestJS aqui dentro, o que deixa a regra testável sozinha.

// ── foguinho do grupo ─────────────────────────────────────────────
// A chama sobe uma vez por dia (UTC) em que há interação. Passou um
// dia inteiro sem ninguém aparecer, a chama zera.

export interface StreakState {
  count: number;
  lastActiveDay: string; // yyyy-mm-dd em UTC
  active: boolean;
}

export const toUtcDay = (date: Date) => date.toISOString().slice(0, 10);

function daysBetween(a: string, b: string): number {
  const da = Date.parse(a + "T00:00:00Z");
  const db = Date.parse(b + "T00:00:00Z");
  return Math.round((db - da) / 86_400_000);
}

export function registerInteraction(state: StreakState | null, now: Date): StreakState {
  const today = toUtcDay(now);
  if (!state) return { count: 1, lastActiveDay: today, active: true };

  const gap = daysBetween(state.lastActiveDay, today);
  if (gap <= 0) return { ...state, active: true };                 // mesmo dia
  if (gap === 1) return { count: state.count + 1, lastActiveDay: today, active: true };
  return { count: 1, lastActiveDay: today, active: true };         // furou, recomeça
}

// ── mensagem efêmera ──────────────────────────────────────────────
// Toda mensagem tem um momento de expiração. As de visualização única
// expiram no ato da leitura; as demais, por TTL. Um job de expurgo
// remove o que passou de expiresAt, e aí a mensagem some de verdade.

export function computeExpiresAt(input: {
  ttlSeconds: number | null;
  createdAt: Date;
  defaultTtlSeconds: number;
}): Date {
  const ttl = input.ttlSeconds ?? input.defaultTtlSeconds;
  return new Date(input.createdAt.getTime() + ttl * 1000);
}

export function expiresOnView(
  viewOnce: boolean,
  seenAt: Date,
  currentExpiresAt: Date | null,
): Date | null {
  return viewOnce ? seenAt : currentExpiresAt;
}
`,
  },

  {
    path: "/projetos/permaneia.ts",
    name: "permaneia.ts",
    language: "typescript",
    runnable: "fuzzy-evasao",
    meta: {
      project: "PermaneIA",
      github: "https://github.com/fabriciojunio/permaneia",
      demo: "https://permaneia.vercel.app",
      stack: ["Next.js 15", "TypeScript", "pgvector", "Gemini API", "Prisma"],
      role: "Assistente de estudos com RAG híbrido sobre documentos institucionais, agenda de calendário calculada em código, e painel de risco de evasão com um motor fuzzy Mamdani escrito do zero.",
    },
    content: `// PermaneIA: defuzzificação por centroide do método de Mamdani.
// O motor foi escrito do zero, sem biblioteca, para que as quatro
// etapas ficassem auditáveis: fuzzificação, disparo pelo mínimo,
// agregação pelo máximo e o centroide abaixo.

const PASSOS = 1000;

export function defuzzificarCentroide(agregado: Record<Termo, number>): number {
  let numerador = 0;
  let denominador = 0;

  for (let i = 0; i <= PASSOS; i += 1) {
    const x = i / PASSOS;

    // União dos consequentes recortados: em cada ponto do universo,
    // a altura é o maior valor entre os termos já limitados pela
    // força da regra que os ativou.
    let altura = 0;
    for (const termo of TERMOS) {
      const corte = agregado[termo];
      if (corte <= 0) continue;
      altura = Math.max(altura, Math.min(corte, pertinencia[termo](x)));
    }

    numerador += x * altura;
    denominador += altura;
  }

  // Área nula significaria que nenhuma regra disparou. A base é
  // fatorial completa, então isso não acontece; se acontecer,
  // devolver o meio do universo é mais honesto do que devolver zero,
  // que seria lido como "sem risco" e esconderia o defeito.
  if (denominador === 0) return 0.5;
  return numerador / denominador;
}

// O centroide leva em conta a área inteira do conjunto agregado.
// É por isso que um aluno com uma regra "crítico" fraca e uma
// "médio" forte recebe um score intermediário, que é exatamente a
// gradação que justifica usar fuzzy em vez de um classificador.`,
  },
  {
    path: "/projetos/contaflux.py",
    name: "contaflux.py",
    language: "python",
    runnable: "contagem-de-linha",
    meta: {
      project: "Contaflux",
      github: "https://github.com/fabriciojunio/contaflux",
      demo: null,
      stack: ["Python", "OpenCV", "NumPy", "YOLO11", "PyInstaller"],
      role: "Contagem de veículos em vídeo de câmera fixa por cruzamento de linha, com dois detectores: subtração de fundo e reconhecimento.",
    },
    content: `# Contaflux: contar quem cruza a linha, e em que sentido
# Contar presença na tela seria frágil: o número sobe e desce
# conforme os veículos entram e saem, e um carro parado dentro
# da cena ficaria sendo contado para sempre.

from dataclasses import dataclass

@dataclass(frozen=True, slots=True)
class Linha:
    x1: float
    y1: float
    x2: float
    y2: float

    def lado(self, ponto: tuple[float, float]) -> float:
        """Sinal indica o lado; magnitude, a distância proporcional."""
        return (self.x2 - self.x1) * (ponto[1] - self.y1) - (
            self.y2 - self.y1
        ) * (ponto[0] - self.x1)

def cruzou(linha: Linha, antes, agora) -> bool:
    # A troca de sinal entre dois quadros consecutivos significa
    # que a linha foi atravessada no intervalo.
    return linha.lado(antes) * linha.lado(agora) < 0

linha = Linha(400, 100, 400, 600)
print("cruzou:", cruzou(linha, (380, 350), (420, 352)))
print("mesmo lado:", cruzou(linha, (380, 350), (390, 352)))
`,
  },

  {
    path: "/projetos/cardiocam.py",
    name: "cardiocam.py",
    language: "python",
    runnable: "rppg",
    meta: {
      project: "Cardiocam",
      github: "https://github.com/fabriciojunio/cardiocam",
      demo: null,
      stack: ["Python", "OpenCV", "NumPy", "SciPy", "scikit-learn"],
      role: "Frequência cardíaca por vídeo (rPPG), com quatro algoritmos da literatura comparados no mesmo pipeline.",
    },
    content: `# Cardiocam: POS, projeção no plano ortogonal ao tom de pele
# Variação só de intensidade (a lâmpada oscila, a pessoa anda para
# uma região mais clara) desloca a cor ao longo da direção do tom
# de pele. Projetando no plano ortogonal, ela desaparece.

import numpy as np

PROJECAO = np.array([[0.0, 1.0, -1.0],
                     [-2.0, 1.0, 1.0]])

def combinar(bloco: np.ndarray) -> np.ndarray:
    """bloco 3xL com as médias R, G e B de cada quadro."""
    normalizado = bloco / bloco.mean(axis=1, keepdims=True)
    projetado = PROJECAO @ normalizado

    # O peso cancela o que sobrou de distorção nos dois eixos.
    alfa = np.std(projetado[0]) / np.std(projetado[1])
    pulso = projetado[0] + alfa * projetado[1]
    return pulso - pulso.mean()

fps, batimentos = 30, 72
t = np.arange(0, 10, 1 / fps)
pulso = 0.005 * np.sin(2 * np.pi * (batimentos / 60) * t)
rgb = np.vstack([0.6 + pulso, 0.5 + 2 * pulso, 0.4 + pulso])

sinal = combinar(rgb)
pico = np.argmax(np.abs(np.fft.rfft(sinal)))
print("bpm estimado:", round(pico * 60 * fps / len(t)))
`,
  },

  {
    path: "/projetos/kaida.cs",
    name: "kaida.cs",
    language: "csharp",
    runnable: "pulo",
    meta: {
      project: "Kaida: Raízes do Esquecimento",
      github: "https://github.com/fabriciojunio/kaida",
      demo: null,
      stack: ["Unity 2022.3", "C#", "Unity Test Framework"],
      role: "Metroidvania 2D com seis cenas, habilidades que destrancam caminhos e chefe com barra única. O jogo inteiro é montado por scripts de editor.",
    },
    content: `// Kaida: o pulo perdoa o erro de alguns quadros
// Coyote time: sair da borda não tira o pulo na hora.
// Buffer: apertar pulo um pouco antes de encostar no chão vale.
// Sem os dois, o controle parece que "não responde", e o jogador
// culpa o jogo, não o próprio tempo de reação.

using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public PlayerStats stats;

    [HideInInspector] public float coyoteTimer = 0f;
    [HideInInspector] public float jumpBufferTimer = 0f;

    void TickTimers(float dt)
    {
        coyoteTimer = Mathf.Max(0f, coyoteTimer - dt);
        jumpBufferTimer = Mathf.Max(0f, jumpBufferTimer - dt);
    }

    public void BufferJump() { jumpBufferTimer = stats.jumpBufferTime; }

    public bool ConsumeJumpBuffer()
    {
        if (jumpBufferTimer > 0f) { jumpBufferTimer = 0f; return true; }
        return false;
    }

    public bool PodePular()
    {
        return (IsGrounded() || coyoteTimer > 0f) && ConsumeJumpBuffer();
    }
}
`,
  },

  {
    path: "/projetos/bicudo.cs",
    name: "bicudo.cs",
    language: "csharp",
    runnable: "impulso",
    meta: {
      project: "Bicudo",
      github: "https://github.com/fabriciojunio/bicudo",
      demo: null,
      stack: ["Unity 2022.3", "C#", "Unity Test Framework"],
      role: "Jogo de um botão na linha do Flappy Bird, feito sozinho. O cenário mede a tela ao rodar e se ajusta de 4:3 a ultrawide.",
    },
    content: `// Bicudo: o impulso TROCA a velocidade, não soma a ela.
// Uma linha de diferença, e é ela que decide se o jogo é sobre ritmo
// ou sobre martelar o botão. Somando, dois toques seguidos mandam o
// pássaro para fora da tela, e a estratégia vira apertar mais rápido.

using UnityEngine;

public class Passaro : MonoBehaviour
{
    public float impulso = 6.2f;
    public float gravidade = 18f;
    public float quedaMaxima = 10f;
    public float raio = 0.28f;
    public LayerMask camadasQueMatam;

    public float VelocidadeVertical { get; private set; }

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

        ConferirBatida();
    }

    // O pássaro é movido pelo transform, então os eventos de colisão do
    // Unity não são confiáveis: entre dois quadros ele atravessa o cano
    // sem disparar nada. Perguntar a cada quadro é barato e não deixa passar.
    void ConferirBatida()
    {
        if (Physics2D.OverlapCircle(transform.position, raio, camadasQueMatam) != null)
            Morrer();
    }
}
`,
  },

  {
    path: "/projetos/laboratorio-vr.cs",
    name: "laboratorio-vr.cs",
    language: "csharp",
    meta: {
      project: "Laboratório VR",
      github: "https://github.com/fabriciojunio/LaboratorioVR",
      demo: null,
      stack: ["Unity", "C#", "Google Cardboard", "Android"],
      role: "Laboratório de química em VR (Unity) com interação por gaze, pontos de teleporte por dwell e câmera por giroscópio. Build para Android / Google Cardboard.",
    },
    content: `// Laboratório VR: ponto de teleporte ativado por gaze (olhar)
// O usuário olha para o ponto; ele preenche em verde conforme
// o tempo de permanência e, ao completar, move o camera rig.

using UnityEngine;

public class TeleportPoint : MonoBehaviour
{
    public float tempoOlhar = 2f;
    public Transform cameraRig;
    private float timer = 0f;
    private Renderer rend;
    private Color corOriginal;

    void Start()
    {
        rend = GetComponent<Renderer>();
        if (rend != null) corOriginal = rend.material.color;
        if (cameraRig == null) cameraRig = Camera.main.transform;
    }

    public void IniciarOlhar()
    {
        timer += Time.deltaTime;
        float progresso = timer / tempoOlhar;
        if (rend != null)
            rend.material.color = Color.Lerp(corOriginal, Color.green, progresso);
        if (timer >= tempoOlhar) Teleportar();
    }

    public void PararOlhar()
    {
        timer = 0f;
        if (rend != null) rend.material.color = corOriginal;
    }

    void Teleportar()
    {
        cameraRig.position = new Vector3(
            transform.position.x, cameraRig.position.y, transform.position.z);
        timer = 0f;
    }
}
`,
  },
];
