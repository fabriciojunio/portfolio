import { useIDE } from "../state/useIDE";
import { filesByPath } from "../vfs";

export default function TitleBar() {
  const { activePath, setPalette } = useIDE();
  const f = activePath ? filesByPath.get(activePath) : null;
  const title = f
    ? `${f.path} — fabricio-junio`
    : "fabricio-junio — portfolio";

  return (
    <header className="h-8 bg-[#0a0b0e] border-b border-[#1f222a] flex items-center select-none font-mono text-[11.5px] text-[#9ea2ab]">
      <div className="flex items-center gap-1.5 px-3">
        <Dot color="#cf6464" />
        <Dot color="#d4a247" />
        <Dot color="#7cb37b" />
      </div>

      <button
        type="button"
        onClick={() => setPalette(true)}
        className="flex-1 mx-2 my-1 h-6 rounded-sm bg-[#13151a] hover:bg-[#181a20] border border-[#1f222a] text-center text-[#9ea2ab] hover:text-[#e6e3dc] transition-colors"
        title="Paleta de comandos (Ctrl/⌘+K)"
      >
        <span className="text-[#6c7079]">⌕</span>
        <span className="mx-2 truncate">{title}</span>
        <span className="text-[#6c7079] text-[10px] ml-2">⌘K</span>
      </button>

      <div className="px-3 text-[10px] text-[#6c7079] uppercase tracking-[1.2px]">
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
