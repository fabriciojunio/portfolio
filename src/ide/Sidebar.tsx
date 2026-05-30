import { useIDE } from "../state/useIDE";
import { TREE } from "../vfs";
import type { TreeNode } from "../types";
import { ChevronIcon, FileIcon, FolderIcon, FolderOpenIcon } from "./icons";

export default function Sidebar() {
  return (
    <aside className="h-full bg-[#0e0f12] border-r border-[#1f222a] flex flex-col text-[12.5px] text-[#9ea2ab] font-mono select-none">
      <div className="px-3 pt-3 pb-2 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[1.5px] text-[#6c7079]">
          Explorer
        </span>
        <span className="text-[10px] text-[#6c7079]">v1.0</span>
      </div>
      <div className="px-2 py-1 text-[#e6e3dc] text-[11px] uppercase tracking-[1px]">
        {TREE.name}
      </div>
      <nav
        className="overflow-y-auto flex-1 pb-2"
        aria-label="Estrutura de arquivos"
      >
        <Tree nodes={TREE.children} depth={0} />
      </nav>
      <div className="px-3 py-2 border-t border-[#1f222a] text-[10.5px] text-[#6c7079] leading-relaxed">
        clique num arquivo para abrir.
        <br />
        <span className="text-[#9ea2ab]">Ctrl/⌘ + P</span> abre rápido.
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
                className="w-full flex items-center gap-1.5 px-2 py-[3px] hover:bg-[#13151a] text-left text-[#e6e3dc]"
                style={{ paddingLeft: 8 + depth * 12 }}
              >
                <ChevronIcon
                  size={10}
                  className={`transition-transform text-[#6c7079] ${isOpen ? "rotate-90" : ""}`}
                />
                {isOpen ? (
                  <FolderOpenIcon size={13} className="text-[#f0a570]" />
                ) : (
                  <FolderIcon size={13} className="text-[#c98a5a]" />
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
              className={`w-full flex items-center gap-1.5 px-2 py-[3px] text-left hover:bg-[#13151a] ${active ? "bg-[#181a20] text-[#e6e3dc]" : "text-[#9ea2ab]"}`}
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
