import { m } from "motion/react";
import { useIDE } from "../state/useIDE";
import { filesByPath } from "../vfs";
import { CloseIcon, FileIcon, PlayIcon } from "./icons";

export default function Tabs() {
  const { openPaths, activePath, activate, close, setRunPanel, runPanelOpen } =
    useIDE();

  const active = activePath ? filesByPath.get(activePath) : null;

  return (
    <div className="h-9 bg-[#0c0c0c] border-b border-[#1c1c1c] flex items-stretch text-[12px] font-mono select-none">
      <ul
        role="tablist"
        className="flex flex-1 items-stretch overflow-x-auto m-0 p-0 list-none"
      >
        {openPaths.map((path) => {
          const f = filesByPath.get(path);
          if (!f) return null;
          const isActive = path === activePath;
          return (
            <m.li
              key={path}
              role="tab"
              aria-selected={isActive}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.16, ease: [0.22, 0.61, 0.36, 1] }}
              className={`group flex items-center pl-3 pr-2 gap-2 border-r border-[#1c1c1c] cursor-pointer ${isActive ? "bg-[#151515] text-[#ededed]" : "text-[#9a9a9a] hover:bg-[#111111]"}`}
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
                className="text-[#6b6b6b] hover:text-[#ededed] p-0.5 rounded-sm opacity-60 group-hover:opacity-100"
              >
                <CloseIcon size={11} />
              </button>
            </m.li>
          );
        })}
      </ul>
      {active?.runnable && (
        <button
          type="button"
          onClick={() => setRunPanel(!runPanelOpen)}
          className={`flex items-center gap-1.5 px-3 border-l border-[#1c1c1c] text-[11.5px] ${runPanelOpen ? "text-[#ffffff]" : "text-[#9a9a9a] hover:text-[#ededed]"}`}
          title="Executar demo deste arquivo"
        >
          <PlayIcon size={12} />
          Run
        </button>
      )}
    </div>
  );
}
