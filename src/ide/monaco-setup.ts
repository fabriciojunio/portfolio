// Mantém o Monaco rodando 100% local (sem CDN), pra que a CSP
// estrita continue funcionando.
//
// Importamos APENAS o editor.worker — o portfolio é read-only,
// não precisamos do TS/JSON worker (que pesam 6 MB juntos só
// pra IntelliSense). Syntax highlighting é feito pelo worker
// principal, sem precisar dos demais.

import { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";

const env: monaco.Environment = {
  getWorker() {
    return new editorWorker();
  },
};

(self as unknown as { MonacoEnvironment: monaco.Environment }).MonacoEnvironment = env;

// Desliga validação de tipos/sintaxe — só queremos exibir código.
monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
  noSemanticValidation: true,
  noSyntaxValidation: true,
});
monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
  noSemanticValidation: true,
  noSyntaxValidation: true,
});

loader.config({ monaco });
