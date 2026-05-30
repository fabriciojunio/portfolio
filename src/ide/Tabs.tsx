import { useIDE } from "../state/useIDE";
import { filesByPath } from "../vfs";
import { CloseIcon, FileIcon, PlayIcon } from "./icons";

export default function Tabs() {
  const { openPaths, activePath, activate, close, setRunPanel, runPanelOpen } =
    useIDE();

  const active = activePath ? filesByPath.get(activePath) : null;

  return (
    <div className="h-9 bg-[#0e0f12] border-b border-[#1f222a] flex items-stretch text-[12px] font-mono select-none">
      <ul
        role="tablist"
        className="flex flex-1 items-stretch overflow-x-auto m-0 p-0 list-none"
      >
        {openPaths.map((path) => {
          const f = filesByPath.get(path);
          if (!f) return null;
          const isActive = path === activePath;
          return (
            <li
              key={path}
              role="tab"
              aria-selected={isActive}
              className={`group flex items-center pl-3 pr-2 gap-2 border-r border-[#1f222a] cursor-pointer ${isActive ? "bg-[#13151a] text-[#e6e3dc]" : "text-[#9ea2ab] hover:bg-[#11131a]"}`}
              onClick={() => activate(path)}
            >
              <FileIcon language={f.language} size={12} />
              <span className="truncate max-w-[160px]">{f.name}</span>
              <button
                type="button"
                aria-label={`Fechar ${f.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  close(path);
                }}
                className="text-[#6c7079] hover:text-[#e6e3dc] p-0.5 rounded-sm opacity-60 group-hover:opacity-100"
              >
                <CloseIcon size={11} />
              </button>
            </li>
          );
        })}
      </ul>
      {active?.runnable && (
        <button
          type="button"
          onClick={() => setRunPanel(!runPanelOpen)}
          className={`flex items-center gap-1.5 px-3 border-l border-[#1f222a] text-[11.5px] ${runPanelOpen ? "text-[#e36b3a]" : "text-[#9ea2ab] hover:text-[#e6e3dc]"}`}
          title="Executar demo deste arquivo"
        >
          <PlayIcon size={12} />
          Run
        </button>
      )}
    </div>
  );
}
