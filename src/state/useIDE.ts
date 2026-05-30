import { useCallback, useEffect, useState } from "react";
import { ALL_FILES, filesByPath } from "../vfs";
import type { VFile } from "../types";

type Listener = () => void;

const DEFAULT_OPEN: string[] = ["/sobre.md"];
const DEFAULT_ACTIVE = "/sobre.md";

interface State {
  openPaths: string[];
  activePath: string;
  expandedDirs: Set<string>;
  terminalOpen: boolean;
  paletteOpen: boolean;
  quickOpen: boolean;
  runPanelOpen: boolean;
  bootDone: boolean;
}

const isDesktop =
  typeof window !== "undefined" && window.innerWidth >= 768;

const state: State = {
  openPaths: [...DEFAULT_OPEN],
  activePath: DEFAULT_ACTIVE,
  expandedDirs: new Set<string>(["/", "/projetos"]),
  terminalOpen: isDesktop,
  paletteOpen: false,
  quickOpen: false,
  runPanelOpen: false,
  bootDone: false,
};

const listeners = new Set<Listener>();

function notify() {
  for (const l of listeners) l();
}

export function useIDE() {
  const [, force] = useState(0);

  useEffect(() => {
    const l = () => force((x) => x + 1);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);

  const open = useCallback((path: string) => {
    const file = filesByPath.get(path);
    if (!file) return;
    if (!state.openPaths.includes(path)) {
      state.openPaths = [...state.openPaths, path];
    }
    state.activePath = path;
    expandAncestors(path);
    notify();
  }, []);

  const close = useCallback((path: string) => {
    state.openPaths = state.openPaths.filter((p) => p !== path);
    if (state.activePath === path) {
      state.activePath = state.openPaths[state.openPaths.length - 1] ?? "";
    }
    notify();
  }, []);

  const activate = useCallback((path: string) => {
    if (!filesByPath.has(path)) return;
    state.activePath = path;
    if (!state.openPaths.includes(path)) {
      state.openPaths = [...state.openPaths, path];
    }
    expandAncestors(path);
    notify();
  }, []);

  const toggleDir = useCallback((path: string) => {
    const next = new Set(state.expandedDirs);
    if (next.has(path)) next.delete(path);
    else next.add(path);
    state.expandedDirs = next;
    notify();
  }, []);

  const setTerminal = useCallback((v: boolean) => {
    state.terminalOpen = v;
    notify();
  }, []);

  const toggleTerminal = useCallback(() => {
    state.terminalOpen = !state.terminalOpen;
    notify();
  }, []);

  const setPalette = useCallback((v: boolean) => {
    state.paletteOpen = v;
    if (v) state.quickOpen = false;
    notify();
  }, []);

  const setQuickOpen = useCallback((v: boolean) => {
    state.quickOpen = v;
    if (v) state.paletteOpen = false;
    notify();
  }, []);

  const setRunPanel = useCallback((v: boolean) => {
    state.runPanelOpen = v;
    notify();
  }, []);

  const markBootDone = useCallback(() => {
    state.bootDone = true;
    notify();
  }, []);

  const activeFile: VFile | null =
    (state.activePath && filesByPath.get(state.activePath)) || null;

  return {
    files: ALL_FILES,
    openPaths: state.openPaths,
    activePath: state.activePath,
    activeFile,
    expandedDirs: state.expandedDirs,
    terminalOpen: state.terminalOpen,
    paletteOpen: state.paletteOpen,
    quickOpen: state.quickOpen,
    runPanelOpen: state.runPanelOpen,
    bootDone: state.bootDone,
    open,
    close,
    activate,
    toggleDir,
    setTerminal,
    toggleTerminal,
    setPalette,
    setQuickOpen,
    setRunPanel,
    markBootDone,
  };
}

function expandAncestors(path: string): void {
  const parts = path.split("/").filter(Boolean);
  let cur = "";
  state.expandedDirs.add("/");
  for (let i = 0; i < parts.length - 1; i++) {
    cur += "/" + parts[i];
    state.expandedDirs.add(cur);
  }
}
