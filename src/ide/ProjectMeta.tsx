import type { VFile } from "../types";

interface Props {
  file: VFile;
}

export default function ProjectMeta({ file }: Props) {
  const m = file.meta;
  if (!m) return null;

  return (
    <div className="bg-[#151515] border-b border-[#1c1c1c] px-5 py-3 font-mono text-[12px] text-[#9a9a9a]">
      <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
        <span className="text-[10px] uppercase tracking-[1.2px] text-[#6b6b6b]">
          projeto
        </span>
        <span className="text-[#ededed] text-[13px]">{m.project}</span>
        {m.role && (
          <span className="text-[#9a9a9a] text-[12px] leading-snug">
            · {m.role}
          </span>
        )}
      </div>

      {m.stack && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {m.stack.map((s) => (
            <span
              key={s}
              className="text-[10.5px] px-2 py-[2px] rounded-sm border border-[#262626] bg-[#191919] text-[#b8b8b8]"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px]">
        {m.github ? (
          <a
            href={m.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9a9a9a] hover:text-[#ffffff] transition-colors"
          >
            ↗ código no GitHub
          </a>
        ) : (
          <span className="text-[#6b6b6b]">código privado</span>
        )}
        {m.demo && (
          <a
            href={m.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9a9a9a] hover:text-[#ffffff] transition-colors"
          >
            ↗ demo ao vivo
          </a>
        )}
        {m.demoAcesso && (
          <span className="text-[#6b6b6b]">entrar com {m.demoAcesso}</span>
        )}
        {file.runnable && (
          <span className="text-[#ededed]">
            ▸ tem demo interativa: clique em <strong>Run</strong> no canto.
          </span>
        )}
      </div>
    </div>
  );
}
