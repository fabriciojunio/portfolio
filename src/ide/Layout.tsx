import { useEffect, useState } from "react";
import { useIDE } from "../state/useIDE";
import Activity from "./Activity";
import CommandPalette, { QuickOpen } from "./CommandPalette";
import Editor from "./Editor";
import HelpFab from "./HelpFab";
import RunPanel from "./RunPanel";
import Sidebar from "./Sidebar";
import StatusBar from "./StatusBar";
import Tabs from "./Tabs";
import Terminal from "./Terminal";
import TitleBar from "./TitleBar";
import Welcome from "./Welcome";

export default function Layout() {
  const ide = useIDE();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth >= 768;
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      const tag = (e.target as HTMLElement)?.tagName;
      const inField = tag === "INPUT" || tag === "TEXTAREA";

      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        ide.setPalette(true);
        return;
      }
      if (mod && e.key.toLowerCase() === "p" && !e.shiftKey) {
        e.preventDefault();
        ide.setQuickOpen(true);
        return;
      }
      if (mod && e.key === "`") {
        e.preventDefault();
        ide.toggleTerminal();
        return;
      }
      if (mod && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setSidebarOpen((s) => !s);
        return;
      }
      if (e.key === "Escape" && !inField) {
        if (ide.paletteOpen) ide.setPalette(false);
        if (ide.quickOpen) ide.setQuickOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ide]);

  return (
    <div className="h-[100dvh] w-screen flex flex-col bg-[#0a0b0e] text-[#e6e3dc] overflow-hidden">
      <TitleBar />
      <div className="flex-1 flex min-h-0">
        <Activity
          onExplorer={() => setSidebarOpen((s) => !s)}
          onSearch={() => ide.setQuickOpen(true)}
          onRun={() => ide.setRunPanel(!ide.runPanelOpen)}
        />

        {/* Sidebar — drawer em mobile, fixo em desktop */}
        <aside
          className={`shrink-0 min-h-0 transition-[width] duration-200 ${sidebarOpen ? "w-[230px] md:w-[240px]" : "w-0"} overflow-hidden`}
        >
          <Sidebar />
        </aside>

        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          <Tabs />
          <div className="flex-1 relative flex flex-col md:flex-row min-h-0">
            <div className="flex-1 flex flex-col min-w-0 min-h-0">
              <Editor />
              <Terminal />
            </div>
            <RunPanel />
          </div>
        </div>
      </div>
      <StatusBar />

      <Welcome />
      <CommandPalette />
      <QuickOpen />
      <HelpFab />
    </div>
  );
}
