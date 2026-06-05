import { useMemo, useState } from "react";

// Réplica leve do schema real do Apontamento de Horas
// (lib/validations.ts), sem dependência do Zod em runtime
// pra não inflar o bundle só por essa demo.

const TIPOS = [
  "desenvolvimento", "mapeamento", "suporte", "retrabalho",
  "reuniao", "treinamento", "despesas", "apoio-comercial",
  "apoio-diversos", "ausencia", "outros",
] as const;

interface Field {
  tipo: string;
  data: string;
  horas: string;
  cliente: string;
  chamado: string;
  descricao: string;
}

interface Issue {
  path: keyof Field;
  message: string;
}

function validate(f: Field): { ok: boolean; issues: Issue[]; horas: number | null } {
  const issues: Issue[] = [];

  if (!TIPOS.includes(f.tipo as (typeof TIPOS)[number]))
    issues.push({ path: "tipo", message: "tipo inválido" });

  if (!/^\d{4}-\d{2}-\d{2}$/.test(f.data))
    issues.push({ path: "data", message: "use AAAA-MM-DD" });
  else if (isNaN(new Date(f.data).getTime()))
    issues.push({ path: "data", message: "data inexistente" });

  const horas = f.horas.trim() === "" ? NaN : Number(f.horas);
  if (isNaN(horas)) issues.push({ path: "horas", message: "horas inválidas" });
  else if (horas < 0.5) issues.push({ path: "horas", message: "mínimo de 30 minutos" });
  else if (horas > 24) issues.push({ path: "horas", message: "máximo de 24h" });

  if (f.cliente.trim().length < 1)
    issues.push({ path: "cliente", message: "selecione um cliente" });

  if (f.chamado.length > 100)
    issues.push({ path: "chamado", message: "máximo de 100 caracteres" });

  if (f.descricao.trim().length < 1)
    issues.push({ path: "descricao", message: "descrição obrigatória" });
  else if (f.descricao.length > 1000)
    issues.push({ path: "descricao", message: "máximo de 1000 caracteres" });

  return { ok: issues.length === 0, issues, horas: isNaN(horas) ? null : horas };
}

const DEFAULTS: Field = {
  tipo: "suporte",
  data: "2026-06-03",
  horas: "3",
  cliente: "Credimogiana",
  chamado: "13311",
  descricao: "Chamado 13311 - Assinatura Digital Credimogiana",
};

export default function ZodDemo() {
  const [f, setF] = useState<Field>(DEFAULTS);
  const result = useMemo(() => validate(f), [f]);

  const set = <K extends keyof Field>(k: K) => (v: Field[K]) =>
    setF((s) => ({ ...s, [k]: v }));

  const errorFor = (k: keyof Field) =>
    result.issues.find((i) => i.path === k)?.message;

  return (
    <div className="space-y-3 text-[12.5px] font-mono text-[#c9c5ba]">
      <p className="text-[11.5px] text-[#9ea2ab]">
        validação real do schema do Apontamento de Horas: edite e veja o resultado mudar.
      </p>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="bg-[#0a0b0e] border border-[#272b34] rounded p-3 space-y-2">
          <Field label="tipo" value={f.tipo} onChange={set("tipo")} error={errorFor("tipo")} hint="desenvolvimento · suporte · reuniao · retrabalho ..." />
          <Field label="data" value={f.data} onChange={set("data")} error={errorFor("data")} />
          <Field label="horas" value={f.horas} onChange={set("horas")} error={errorFor("horas")} hint="0.5 a 24 (decimal)" />
          <Field label="cliente" value={f.cliente} onChange={set("cliente")} error={errorFor("cliente")} />
          <Field label="chamado" value={f.chamado} onChange={set("chamado")} error={errorFor("chamado")} hint="opcional" />
          <Field
            label="descricao"
            value={f.descricao}
            onChange={set("descricao")}
            error={errorFor("descricao")}
            textarea
          />
        </div>

        <div className="bg-[#0a0b0e] border border-[#272b34] rounded p-3">
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[1.2px] text-[#6c7079]">
              resultado do parse
            </div>
            <span
              className="text-[11px] px-2 py-0.5 rounded-sm border"
              style={{
                color: result.ok ? "#7cb37b" : "#cf6464",
                borderColor: result.ok ? "#7cb37b66" : "#cf646466",
              }}
            >
              {result.ok ? "✓ válido" : `✗ ${result.issues.length} erro(s)`}
            </span>
          </div>

          <pre className="mt-2 text-[11.5px] overflow-x-auto whitespace-pre">
{JSON.stringify(
  result.ok
    ? {
        tipo: f.tipo,
        data: f.data,
        horas: result.horas,
        cliente: f.cliente,
        chamado: f.chamado || null,
        descricao: f.descricao,
        status: "pendente",
      }
    : { issues: result.issues.map((i) => ({ field: i.path, error: i.message })) },
  null,
  2,
)}
          </pre>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  textarea,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  textarea?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-[#9ea2ab]">{label}</label>
        {error ? (
          <span className="text-[#cf6464] text-[10.5px]">{error}</span>
        ) : hint ? (
          <span className="text-[#6c7079] text-[10.5px]">{hint}</span>
        ) : null}
      </div>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={2}
          className={`mt-0.5 w-full bg-[#13151a] border ${
            error ? "border-[#cf646488]" : "border-[#272b34]"
          } rounded-sm px-2 py-1 text-[#e6e3dc] outline-none focus:border-[#e36b3a]`}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`mt-0.5 w-full bg-[#13151a] border ${
            error ? "border-[#cf646488]" : "border-[#272b34]"
          } rounded-sm px-2 py-1 text-[#e6e3dc] outline-none focus:border-[#e36b3a]`}
          spellCheck={false}
        />
      )}
    </div>
  );
}
