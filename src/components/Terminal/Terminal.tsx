import { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { startShell } from '../../services/webcontainer';
import { TerminalHeader } from './TerminalHeader';
import 'xterm/css/xterm.css';

export function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);

  useEffect(() => {
    if (!terminalRef.current || xtermRef.current) return;

    const initTerminal = async () => {
      // Initialize xterm.js
      const term = new XTerm({
        theme: {
          background: '#1e1e1e',
          foreground: '#cccccc',
        },
        fontSize: 14,
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        cursorBlink: true,
      });
      
      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      
      // Mount terminal to DOM
      term.open(terminalRef.current!);
      fitAddon.fit();
      
      xtermRef.current = term;

      try {
        // Start WebContainer shell
        const shellProcess = await startShell();
        
        // Handle terminal input
        term.onData((data) => {
          shellProcess.write(data);
        });

        // Handle shell output
        shellProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              term.write(data);
            },
          })
        );
      } catch (error) {
        console.error('Failed to start shell:', error);
        term.write('\x1b[31mFailed to start shell. Please try refreshing the page.\x1b[0m\r\n');
      }
    };

    initTerminal();

    // Cleanup
    return () => {
      if (xtermRef.current) {
        xtermRef.current.dispose();
        xtermRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col">
      <TerminalHeader />
      <div 
        ref={terminalRef}
        className="h-48 bg-[#1e1e1e] text-[#cccccc]"
      />
    </div>
  );
}