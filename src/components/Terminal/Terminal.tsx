import { useEffect, useRef, useLayoutEffect, useState } from "react";
import { Terminal as XTerm } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { getWebContainerInstance } from "../../services/webcontainer";
import { initializeTemplate } from "../../services/templateService";
import { TerminalHeader } from "./TerminalHeader";
import { usePreview } from "../../context/PreviewContext";
import "xterm/css/xterm.css";
import { useFileSystem } from "../../context/FileSystemContext";
import { syncFileSystem } from "../../services/webcontainer";

interface TerminalInstance {
  id: string;
  term: XTerm | null;
  fitAddon: FitAddon | null;
  process: any;
  div: HTMLDivElement | null;
}

export function Terminal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [terminals, setTerminals] = useState<TerminalInstance[]>([
    { id: "1", term: null, fitAddon: null, process: null, div: null },
  ]);
  const [activeTerminal, setActiveTerminal] = useState("1");
  const { setPreviewUrl } = usePreview();
  const { setFiles } = useFileSystem();
  const isPrimaryInitialized = useRef(false);
  const webContainerRef = useRef<any>(null);
  const [isWebContainerReady, setIsWebContainerReady] = useState(false);

  useEffect(() => {
    const initWebContainer = async () => {
      const webcontainer = await getWebContainerInstance();
      webContainerRef.current = webcontainer;

      webcontainer.on("server-ready", (port, url) => {
        const previewUrl = url.replace(
          "localhost",
          "localhost.webcontainer.io"
        );
        setPreviewUrl(previewUrl);
      });
      await initializeTemplate(webcontainer);
      await syncFileSystem(setFiles);
      setIsWebContainerReady(true);
    };

    initWebContainer();
  }, [setFiles, setPreviewUrl]);
  useEffect(() => {
    if (!isWebContainerReady) return;

    terminals.forEach((terminal) => {
      if (terminal.term || !containerRef.current) return;

      const terminalDiv = document.createElement("div");
      terminalDiv.style.height = "100%";
      terminalDiv.style.display =
        terminal.id === activeTerminal ? "block" : "none";
      containerRef.current.appendChild(terminalDiv);

      const term = new XTerm({
        theme: {
          background: "#1e1e1e",
          foreground: "#cccccc",
        },
        fontSize: 14,
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        cursorBlink: true,
        rows: 24,
        cols: 80,
      });

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(terminalDiv);
      fitAddon.fit();

      
      setTerminals((prev) =>
        prev.map((t) =>
          t.id === terminal.id ? { ...t, term, fitAddon, div: terminalDiv } : t
        )
      );

      
      initializeShell(
        terminal.id,
        term,
        terminal.id === "1" && !isPrimaryInitialized.current
      );
    });

    
    terminals.forEach((terminal) => {
      if (terminal.div) {
        terminal.div.style.display =
          terminal.id === activeTerminal ? "block" : "none";
      }
    });
  }, [terminals, activeTerminal, isWebContainerReady]);

  const initializeShell = async (
    terminalId: string,
    term: XTerm,
    isPrimary: boolean
  ) => {
    if (!webContainerRef.current) return;

    try {
      const shellProcess = await webContainerRef.current.spawn("jsh", {
        terminal: {
          cols: term.cols,
          rows: term.rows,
        },
      });

     
      setTerminals((prev) =>
        prev.map((t) =>
          t.id === terminalId ? { ...t, process: shellProcess } : t
        )
      );

      term.onData(async (data) => {
        if (shellProcess?.input) {
          const writer = shellProcess.input.getWriter();
          try {
            await writer.write(data);
          } finally {
            writer.releaseLock();
          }
        }
      });

      if (shellProcess.output) {
        const reader = shellProcess.output.getReader();
        (async () => {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            term.write(value);
          }
        })();
      }

      
      if (isPrimary && !isPrimaryInitialized.current) {
        const writer = shellProcess.input.getWriter();
        try {
          await writer.write(
            "yes | npm create vite@latest typescript-template -- --template react-ts && cd typescript-template && npm install && npm run dev\n"
          );
          isPrimaryInitialized.current = true;
        } finally {
          writer.releaseLock();
        }
      } else if (!isPrimary) {
        const writer = shellProcess.input.getWriter();
        try {
          await writer.write("cd typescript-template\n");
        } finally {
          writer.releaseLock();
        }
      }
    } catch (error) {
      console.error("Failed to start shell:", error);
      term.write(
        "\x1b[31mFailed to start shell. Please try refreshing the page.\x1b[0m\r\n"
      );
    }
  };

  const addNewTerminal = () => {
    const newId = String(terminals.length + 1);
    setTerminals((prev) => [
      ...prev,
      { id: newId, term: null, fitAddon: null, process: null, div: null },
    ]);
    setActiveTerminal(newId);
  };

  const handleTerminalClose = (id: string) => {
    const terminal = terminals.find((t) => t.id === id);

    if (terminal) {
      terminal.process?.kill();
      terminal.term?.dispose();
      terminal.div?.remove();
    }

    setTerminals((prev) => prev.filter((t) => t.id !== id));

    if (activeTerminal === id && terminals.length > 1) {
      setActiveTerminal(terminals[0].id);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      terminals.forEach((terminal) => {
        terminal.fitAddon?.fit();
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [terminals]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center bg-[#1e1e1e] border-b border-[#2d2d2d]">
        <TerminalHeader
          terminals={terminals.map((t) => ({ id: t.id, process: t.process }))}
          activeTerminal={activeTerminal}
          onTerminalSelect={setActiveTerminal}
          onTerminalClose={handleTerminalClose}
        />
        <button
          onClick={addNewTerminal}
          className="px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-[#2d2d2d] rounded"
        >
          + New Terminal
        </button>
      </div>
      <div className="flex-1 min-h-0">
        <div
          ref={containerRef}
          className="w-full h-full bg-[#1e1e1e] text-[#cccccc] overflow-auto"
          style={{ padding: "4px" }}
        />
      </div>
    </div>
  );
}
