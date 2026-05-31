import type { VFile } from "../types";

// Cada arquivo é uma vitrine real do projeto: snippet autêntico
// retirado/adaptado do código de produção, com a meta correspondente.

export const projectFiles: VFile[] = [
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
    path: "/projetos/jis.java",
    name: "jis.java",
    language: "java",
    runnable: "vagas-score",
    meta: {
      project: "JIS: Sistema de Vagas IA",
      github: "https://github.com/fabriciojunio/jis",
      demo: "https://jis-frontend-mocha.vercel.app",
      stack: ["Java 21", "Spring Boot", "Python", "FastAPI", "scikit-learn"],
      role: "Coleta vagas (Gupy, GeekHunter, Programathor), aplica score híbrido (regras + RandomForest) e envia top-5 às 19h via Telegram.",
    },
    content: `// JIS: motor de score híbrido
// Regras com pesos + chamada ao serviço Python (RandomForest)

package com.fabricio.jis.scoring;

import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

public final class JobScorer {

    private static final Map<String, Double> WEIGHTS = Map.of(
        "remoto",       0.30,
        "stack_match",  0.25,
        "senioridade",  0.20,
        "salario",      0.15,
        "empresa_tier", 0.10
    );

    public static double scoreRules(Job job, List<String> userStack) {
        double remote   = job.isRemote() ? 1.0 : 0.2;
        double match    = stackMatch(job.tags(), userStack);
        double sen      = senLevel(job.title());
        double sal      = salaryRange(job.salary());
        double tier     = job.companyTier();

        return  WEIGHTS.get("remoto")       * remote
              + WEIGHTS.get("stack_match")  * match
              + WEIGHTS.get("senioridade")  * sen
              + WEIGHTS.get("salario")      * sal
              + WEIGHTS.get("empresa_tier") * tier;
    }

    private static double stackMatch(List<String> tags, List<String> user) {
        long hits = tags.stream().filter(user::contains).count();
        return Math.min(1.0, hits / 3.0);
    }

    private static double senLevel(String title) {
        String t = title.toLowerCase();
        if (Pattern.matches(".*\\\\b(junior|jr|estag)\\\\b.*", t)) return 1.0;
        if (Pattern.matches(".*\\\\bpleno\\\\b.*", t))             return 0.6;
        if (Pattern.matches(".*\\\\b(senior|sr|tech lead)\\\\b.*", t)) return 0.2;
        return 0.5;
    }

    private static double salaryRange(int salary) {
        if (salary <= 0) return 0.4;
        return Math.min(1.0, salary / 8000.0);
    }
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
      project: "Apontamento de Horas",
      github: "https://github.com/fabriciojunio/apontamento-horas",
      demo: "https://apontamento-horas.vercel.app",
      stack: ["Next.js 14", "Prisma", "PostgreSQL", "Zod", "Ollama"],
      role: "Registro de horas por cooperativa com export Excel (4 abas) e detecção de tipo de trabalho via LLM local (Ollama).",
    },
    content: `// Apontamento de Horas: validação Zod no boundary da API.
// Tudo que chega na route handler passa por aqui antes
// de tocar o domínio.

import { z } from "zod";

export const RegistroHoras = z.object({
  data:     z.string().regex(/^\\d{4}-\\d{2}-\\d{2}$/, "AAAA-MM-DD"),
  inicio:   z.string().regex(/^\\d{2}:\\d{2}$/, "HH:MM"),
  fim:      z.string().regex(/^\\d{2}:\\d{2}$/, "HH:MM"),
  pausaMin: z.number().int().min(0).max(480).default(0),
  cliente:  z.string().min(2).max(80),
  ticket:   z.string().regex(/^[A-Z]+-\\d+$/).optional(),
  descricao: z.string().min(5).max(2000),
})
  .refine(
    ({ inicio, fim }) => toMinutes(fim) > toMinutes(inicio),
    { path: ["fim"], message: "fim deve ser depois do início" }
  )
  .transform((r) => ({
    ...r,
    duracaoMin: toMinutes(r.fim) - toMinutes(r.inicio) - r.pausaMin,
  }))
  .refine(
    (r) => r.duracaoMin >= 5,
    { path: ["fim"], message: "duração mínima de 5 minutos" }
  );

export type RegistroHorasInput = z.input<typeof RegistroHoras>;
export type RegistroHorasParsed = z.output<typeof RegistroHoras>;

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

// Uso em uma route handler do Next.js:
// const body = await req.json();
// const data = RegistroHoras.parse(body);   // lança ZodError com 400
// await prisma.registro.create({ data });
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
      stack: ["Python", "FastAPI", "PyTorch", "XGBoost", "FinBERT"],
      role: "Trading quantitativo com ensemble de 3 modelos (RF + XGBoost + GB), FinBERT para sentimento e Monte Carlo (10K simulações) para risco.",
    },
    content: `# Quantbot ML: ensemble com voting ponderado
# Combina Random Forest, XGBoost e Gradient Boosting.
# Pesos calibrados em walk-forward com TimeSeriesSplit.

import numpy as np
from dataclasses import dataclass
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from xgboost import XGBClassifier
from sklearn.model_selection import TimeSeriesSplit
from sklearn.metrics import roc_auc_score

@dataclass
class Ensemble:
    rf:  RandomForestClassifier
    xgb: XGBClassifier
    gb:  GradientBoostingClassifier
    weights: tuple[float, float, float] = (0.4, 0.4, 0.2)

    def predict_proba(self, X: np.ndarray) -> np.ndarray:
        p1 = self.rf.predict_proba(X)[:, 1]
        p2 = self.xgb.predict_proba(X)[:, 1]
        p3 = self.gb.predict_proba(X)[:, 1]
        w1, w2, w3 = self.weights
        return w1 * p1 + w2 * p2 + w3 * p3

def walk_forward_auc(model, X, y, n_splits: int = 5) -> float:
    tscv = TimeSeriesSplit(n_splits=n_splits)
    aucs = []
    for tr, te in tscv.split(X):
        model.fit(X[tr], y[tr])
        aucs.append(roc_auc_score(y[te], model.predict_proba(X[te])[:, 1]))
    return float(np.mean(aucs))
`,
  },

  {
    path: "/projetos/enterprise-project.ts",
    name: "enterprise-project.ts",
    language: "typescript",
    meta: {
      project: "Enterprise Project",
      github: "https://github.com/fabriciojunio/enterprise-project",
      demo: "https://frontend-tan-mu-38.vercel.app",
      stack: ["Node.js", "Express", "TypeORM", "JWT + 2FA", "Docker"],
      role: "API REST enterprise com Clean Architecture, JWT + 2FA TOTP, RBAC (3 roles) e 23 testes (unit + integração).",
    },
    content: `// Enterprise: refresh-token rotation com blacklist em Redis
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
];
