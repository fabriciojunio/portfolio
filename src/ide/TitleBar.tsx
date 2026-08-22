import { useIDE } from "../state/useIDE";
import { filesByPath } from "../vfs";

export default function TitleBar() {
  const { activePath, setPalette } = useIDE();
  const f = activePath ? filesByPath.get(activePath) : null;
  const title = f
    ? `${f.path} · fabricio-junio`
    : "fabricio-junio / portfolio";

  return (
    <header className="h-8 bg-[#0c0c0c] border-b border-[#1c1c1c] flex items-center select-none font-mono text-[11.5px] text-[#9a9a9a]">
      <div className="flex items-center gap-1.5 px-3">
        <Dot color="#8a8a8a" />
        <Dot color="#b8b8b8" />
        <Dot color="#ededed" />
      </div>

      <button
        type="button"
        onClick={() => setPalette(true)}
        className="flex-1 mx-2 my-1 h-6 rounded-sm bg-[#151515] hover:bg-[#191919] border border-[#1c1c1c] text-center text-[#9a9a9a] hover:text-[#ededed] transition-colors"
        title="Paleta de comandos (Ctrl/⌘+K)"
      >
        <span className="text-[#6b6b6b]">⌕</span>
        <span className="mx-2 truncate">{title}</span>
        <span className="text-[#6b6b6b] text-[10px] ml-2">⌘K</span>
      </button>

      <div className="px-3 text-[10px] text-[#6b6b6b] uppercase tracking-[1.2px]">
        portfolio v1.0
      </div>
    </header>
  );
}

function Dot({ color }: { color: string }) {
  return (
    <span
      className="w-[10px] h-[10px] rounded-full"
      style={{ backgroundColor: color, opacity: 0.85 }}
    />
  );
}
