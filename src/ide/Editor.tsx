import { Suspense, lazy, useEffect } from "react";
import { useIDE } from "../state/useIDE";
import MarkdownView from "./MarkdownView";
import ProjectMeta from "./ProjectMeta";
import { THEME_NAME, defineTheme } from "./theme";

const MonacoEditor = lazy(async () => {
  await import("./monaco-setup");
  const m = await import("@monaco-editor/react");
  return { default: m.default };
});

export default function Editor() {
  const { activeFile } = useIDE();

  // Pré-carrega Monaco em segundo plano depois da primeira pintura,
  // pra que abrir o primeiro arquivo de código fique instantâneo.
  useEffect(() => {
    const t = setTimeout(() => {
      import("./monaco-setup");
      import("@monaco-editor/react");
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  if (!activeFile) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#6c7079] font-mono text-[12px] bg-[#0e0f12]">
        nenhum arquivo aberto. abra um pela sidebar ou Ctrl/⌘+P.
      </div>
    );
  }

  // Markdown não precisa do Monaco — renderiza limpo e leve.
  if (activeFile.language === "markdown") {
    return (
      <div className="flex-1 overflow-y-auto bg-[#0e0f12]">
        {activeFile.meta && <ProjectMeta file={activeFile} />}
        <MarkdownView source={activeFile.content} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0e0f12]">
      {activeFile.meta && <ProjectMeta file={activeFile} />}
      <div className="flex-1 min-h-0">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full text-[#6c7079] font-mono text-[12px]">
              carregando editor...
            </div>
          }
        >
          <MonacoEditor
            key={activeFile.path}
            height="100%"
            theme={THEME_NAME}
            language={activeFile.language}
            value={activeFile.content}
            path={activeFile.path}
            beforeMount={(monaco) => defineTheme(monaco)}
            options={{
              readOnly: true,
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 13,
              lineHeight: 21,
              fontLigatures: true,
              minimap: {
                enabled: true,
                renderCharacters: false,
                side: "right",
                scale: 1,
              },
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              cursorBlinking: "phase",
              cursorSmoothCaretAnimation: "on",
              renderLineHighlight: "line",
              padding: { top: 16, bottom: 24 },
              wordWrap: "on",
              wrappingIndent: "indent",
              guides: {
                indentation: true,
                highlightActiveIndentation: true,
              },
              bracketPairColorization: {
                enabled: true,
                independentColorPoolPerBracketType: false,
              },
              scrollbar: {
                vertical: "auto",
                horizontal: "auto",
                useShadows: false,
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10,
              },
              overviewRulerLanes: 0,
              overviewRulerBorder: false,
              hideCursorInOverviewRuler: true,
              renderWhitespace: "none",
              folding: true,
              contextmenu: false,
              quickSuggestions: false,
              hover: { enabled: false },
              suggestOnTriggerCharacters: false,
              automaticLayout: true,
            }}
          />
        </Suspense>
      </div>
    </div>
  );
}
