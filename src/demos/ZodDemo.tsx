import { useMemo, useState } from "react";

// Replica leve do schema do Apontamento de Horas, sem dependência
// do Zod em runtime (pra não inflar bundle só por essa demo).

interface Field {
  data: string;
  inicio: string;
  fim: string;
  pausaMin: number;
  cliente: string;
  ticket: string;
  descricao: string;
}

interface Issue {
  path: keyof Field;
  message: string;
}

function parseHHMM(s: string): number | null {
  if (!/^\d{2}:\d{2}$/.test(s)) return null;
  const [h, m] = s.split(":").map(Number);
  if (h > 23 || m > 59) return null;
  return h * 60 + m;
}

function validate(f: Field): { ok: boolean; issues: Issue[]; duracao: number | null } {
  const issues: Issue[] = [];

  if (!/^\d{4}-\d{2}-\d{2}$/.test(f.data))
    issues.push({ path: "data", message: "deve ser AAAA-MM-DD" });

  const ini = parseHHMM(f.inicio);
  if (ini === null) issues.push({ path: "inicio", message: "deve ser HH:MM" });

  const fim = parseHHMM(f.fim);
  if (fim === null) issues.push({ path: "fim", message: "deve ser HH:MM" });

  if (f.pausaMin < 0 || f.pausaMin > 480)
    issues.push({ path: "pausaMin", message: "entre 0 e 480 minutos" });

  if (f.cliente.length < 2)
    issues.push({ path: "cliente", message: "mínimo de 2 caracteres" });
  if (f.cliente.length > 80)
    issues.push({ path: "cliente", message: "máximo de 80 caracteres" });

  if (f.ticket && !/^[A-Z]+-\d+$/.test(f.ticket))
    issues.push({ path: "ticket", message: 'formato esperado "PROJ-123"' });

  if (f.descricao.length < 5)
    issues.push({ path: "descricao", message: "mínimo de 5 caracteres" });

  let duracao: number | null = null;
  if (ini !== null && fim !== null) {
    if (fim <= ini) issues.push({ path: "fim", message: "deve ser depois do início" });
    else {
      duracao = fim - ini - f.pausaMin;
      if (duracao < 5)
        issues.push({ path: "fim", message: "duração mínima de 5 minutos" });
    }
  }

  return { ok: issues.length === 0, issues, duracao };
}

const DEFAULTS: Field = {
  data: "2026-05-30",
  inicio: "09:00",
  fim: "12:30",
  pausaMin: 0,
  cliente: "Credimogiana",
  ticket: "NEXUM-104",
  descricao: "Integração com API IBGE no Lecom BPM",
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
          <Field label="data" value={f.data} onChange={set("data")} error={errorFor("data")} />
          <Field label="inicio" value={f.inicio} onChange={set("inicio")} error={errorFor("inicio")} />
          <Field label="fim" value={f.fim} onChange={set("fim")} error={errorFor("fim")} />
          <Field
            label="pausaMin"
            value={String(f.pausaMin)}
            onChange={(v) => set("pausaMin")(Number(v) || 0)}
            error={errorFor("pausaMin")}
          />
          <Field label="cliente" value={f.cliente} onChange={set("cliente")} error={errorFor("cliente")} />
          <Field label="ticket" value={f.ticket} onChange={set("ticket")} error={errorFor("ticket")} />
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
    ? { ...f, duracaoMin: result.duracao }
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  textarea?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-[#9ea2ab]">{label}</label>
        {error && <span className="text-[#cf6464] text-[10.5px]">{error}</span>}
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
