import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { getWebContainerInstance } from '../../services/webcontainer';
import { initializeTemplate } from '../../services/templateService';
import { TerminalHeader } from './TerminalHeader';
import { usePreview } from '../../context/PreviewContext';
import 'xterm/css/xterm.css';
import { useFileSystem } from '../../context/FileSystemContext';
import { syncFileSystem } from '../../services/webcontainer';

export function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const [isTerminalReady, setIsTerminalReady] = useState(false);
  const { setPreviewUrl } = usePreview();
  const { setFiles } = useFileSystem();
  const [terminals, setTerminals] = useState<Array<{ id: string; process: any }>>([{ id: '1', process: null }]);
  const [activeTerminal, setActiveTerminal] = useState('1');

  // Initialize xterm
  useLayoutEffect(() => {
    if (!terminalRef.current || xtermRef.current) return;

    const term = new XTerm({
      theme: {
        background: '#1e1e1e',
        foreground: '#cccccc',
      },
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      cursorBlink: true,
      rows: 24,
      cols: 80,
    });
    
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    fitAddonRef.current = fitAddon;
    
    term.open(terminalRef.current);
    xtermRef.current = term;

    // Ensure the terminal is properly sized after it's fully initialized
    requestAnimationFrame(() => {
      if (fitAddonRef.current) {
        fitAddonRef.current.fit();
        setIsTerminalReady(true);
      }
    });

    // Handle window resize
    const handleResize = () => {
      if (fitAddonRef.current) {
        fitAddonRef.current.fit();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      term.dispose();
      xtermRef.current = null;
      fitAddonRef.current = null;
    };
  }, []);

  // Connect to WebContainer
  useEffect(() => {
    if (!isTerminalReady || !xtermRef.current) return;

    const term = xtermRef.current;
    let shellProcess: any = null;

    const initWebContainer = async () => {
      try {
        const webcontainer = await getWebContainerInstance();

        // Listen for server-ready event before starting anything
        webcontainer.on('server-ready', (port, url) => {
          console.log('Server ready on port:', port);
          console.log('Original URL:', url);
          // Convert localhost URL to WebContainer URL
          const previewUrl = url.replace('localhost', 'localhost.webcontainer.io');
          console.log('Preview URL:', previewUrl);
          setPreviewUrl(previewUrl);
        });
        
        // Start shell first and connect to terminal
        shellProcess = await webcontainer.spawn('jsh', {
          terminal: {
            cols: 80,
            rows: 24,
          }
        });

        // Update the terminal process
        setTerminals(prev => prev.map(t => 
          t.id === activeTerminal ? { ...t, process: shellProcess } : t
        ));

        // Connect terminal input to shell
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

        // Connect shell output to terminal
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

        // Create template directory and initialize project
        await initializeTemplate(webcontainer);
        await syncFileSystem(setFiles);

        // Run commands in sequence
        const writer = shellProcess.input.getWriter();
        try {
          // Create project with -y flag and chain commands
          writer.write('yes | npm create vite@latest typescript-template -- --template react-ts && cd typescript-template && npm install && npm run dev\n');
        } finally {
          writer.releaseLock();
        }

      } catch (error) {
        console.error('Failed to start shell:', error);
        term.write('\x1b[31mFailed to start shell. Please try refreshing the page.\x1b[0m\r\n');
      }
    };

    initWebContainer();

    return () => {
      shellProcess?.kill();
    };
  }, [isTerminalReady, setFiles, setPreviewUrl, activeTerminal]);

  const addNewTerminal = async () => {
    const newId = String(terminals.length + 1);
    setTerminals(prev => [...prev, { id: newId, process: null }]);
    setActiveTerminal(newId);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center bg-[#1e1e1e] border-b border-[#2d2d2d]">
        <TerminalHeader terminals={terminals} activeTerminal={activeTerminal} onTerminalSelect={setActiveTerminal} />
        <button
          onClick={addNewTerminal}
          className="px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-[#2d2d2d] rounded"
        >
          + New Terminal
        </button>
      </div>
      <div className="flex">
        <div className="flex-1">
          <div 
            ref={terminalRef}
            className="h-48 bg-[#1e1e1e] text-[#cccccc] overflow-hidden"
            style={{ padding: '4px' }}
          />
        </div>
      </div>
    </div>
  );
}