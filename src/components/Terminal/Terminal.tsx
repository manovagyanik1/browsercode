import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { startShell } from '../../services/webcontainer';
import { TerminalHeader } from './TerminalHeader';
import 'xterm/css/xterm.css';

export function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const [isTerminalReady, setIsTerminalReady] = useState(false);

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
    let shellProcess: Awaited<ReturnType<typeof startShell>> | null = null;

    const initWebContainer = async () => {
      try {
        shellProcess = await startShell();
        
        // Handle user input
        const handleData = (data: string) => {
          shellProcess?.input?.write(data);
        };
        
        term.onData(handleData);

        // Handle shell output
        if (shellProcess.output) {
          const reader = shellProcess.output.getReader();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            term.write(value);
          }
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
  }, [isTerminalReady]);

  return (
    <div className="flex flex-col">
      <TerminalHeader />
      <div 
        ref={terminalRef}
        className="h-48 bg-[#1e1e1e] text-[#cccccc] overflow-hidden"
        style={{ padding: '4px' }}
      />
    </div>
  );
}