import type { VFile } from "../types";

interface Props {
  file: VFile;
}

export default function ProjectMeta({ file }: Props) {
  const m = file.meta;
  if (!m) return null;

  return (
    <div className="bg-[#13151a] border-b border-[#1f222a] px-5 py-3 font-mono text-[12px] text-[#9ea2ab]">
      <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
        <span className="text-[10px] uppercase tracking-[1.2px] text-[#6c7079]">
          projeto
        </span>
        <span className="text-[#e6e3dc] text-[13px]">{m.project}</span>
        {m.role && (
          <span className="text-[#9ea2ab] text-[12px] leading-snug">
            — {m.role}
          </span>
        )}
      </div>

      {m.stack && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {m.stack.map((s) => (
            <span
              key={s}
              className="text-[10.5px] px-2 py-[2px] rounded-sm border border-[#272b34] bg-[#181a20] text-[#c98a5a]"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px]">
        {m.github && (
          <a
            href={m.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9ea2ab] hover:text-[#e36b3a] transition-colors"
          >
            ↗ código no GitHub
          </a>
        )}
        {m.demo && (
          <a
            href={m.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9ea2ab] hover:text-[#e36b3a] transition-colors"
          >
            ↗ demo ao vivo
          </a>
        )}
        {file.runnable && (
          <span className="text-[#7cb37b]">
            ▸ tem demo interativa — clique em <strong>Run</strong> no canto.
          </span>
        )}
      </div>
    </div>
  );
}
