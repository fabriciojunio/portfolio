import { useIDE } from "../state/useIDE";
import { TREE } from "../vfs";
import type { TreeNode } from "../types";
import { ChevronIcon, FileIcon, FolderIcon, FolderOpenIcon } from "./icons";

export default function Sidebar() {
  return (
    <aside className="h-full bg-[#0c0c0c] border-r border-[#1c1c1c] flex flex-col text-[12.5px] text-[#9a9a9a] font-mono select-none">
      <div className="px-3 pt-3 pb-2 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[1.5px] text-[#6b6b6b]">
          Explorer
        </span>
        <span className="text-[10px] text-[#6b6b6b]">v1.0</span>
      </div>
      <div className="px-2 py-1 text-[#ededed] text-[11px] uppercase tracking-[1px]">
        {TREE.name}
      </div>
      <nav
        className="overflow-y-auto flex-1 pb-2"
        aria-label="Estrutura de arquivos"
      >
        <Tree nodes={TREE.children} depth={0} />
      </nav>
      <div className="px-3 py-2 border-t border-[#1c1c1c] text-[10.5px] text-[#6b6b6b] leading-relaxed">
        clique num arquivo para abrir.
        <br />
        <span className="text-[#9a9a9a]">Ctrl/⌘ + P</span> abre rápido.
      </div>
    </aside>
  );
}

interface TreeProps {
  nodes: TreeNode[];
  depth: number;
}

function Tree({ nodes, depth }: TreeProps) {
  const { expandedDirs, toggleDir, open, activePath } = useIDE();
  return (
    <ul role="tree" className="m-0 p-0 list-none">
      {nodes.map((node) => {
        if (node.type === "dir") {
          const isOpen = expandedDirs.has(node.path);
          return (
            <li key={node.path} role="treeitem">
              <button
                type="button"
                onClick={() => toggleDir(node.path)}
                className="w-full flex items-center gap-1.5 px-2 py-[3px] hover:bg-[#151515] text-left text-[#ededed]"
                style={{ paddingLeft: 8 + depth * 12 }}
              >
                <ChevronIcon
                  size={10}
                  className={`transition-transform text-[#6b6b6b] ${isOpen ? "rotate-90" : ""}`}
                />
                {isOpen ? (
                  <FolderOpenIcon size={13} className="text-[#d4d4d4]" />
                ) : (
                  <FolderIcon size={13} className="text-[#b8b8b8]" />
                )}
                <span className="truncate">{node.name}</span>
              </button>
              {isOpen && (
                <Tree nodes={node.children} depth={depth + 1} />
              )}
            </li>
          );
        }

        const active = activePath === node.path;
        return (
          <li key={node.path} role="treeitem">
            <button
              type="button"
              onClick={() => open(node.path)}
              className={`w-full flex items-center gap-1.5 px-2 py-[3px] text-left hover:bg-[#151515] ${active ? "bg-[#191919] text-[#ededed]" : "text-[#9a9a9a]"}`}
              style={{ paddingLeft: 8 + depth * 12 + 12 }}
            >
              <FileIcon language={node.language} size={13} />
              <span className="truncate">{node.name}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
