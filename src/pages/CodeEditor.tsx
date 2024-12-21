import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { EditorPane } from '../components/Editor/EditorPane';
import { FileExplorer } from '../components/FileExplorer';
import { Terminal } from '../components/Terminal/Terminal';
import { Preview } from '../components/Preview/Preview';
import { ResizablePanel } from '../components/ResizablePanel';
import { VerticalResizeHandle } from '../components/VerticalResizeHandle';

export default function CodeEditor() {
  const [explorerWidth, setExplorerWidth] = useState(240);
  const [terminalHeight, setTerminalHeight] = useState(200);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const message = 'You will lose all your changes. Are you sure you want to leave?';
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      if (window.confirm('You will lose all your changes. Are you sure you want to leave?')) {
        window.history.go(-1);
      } else {
        window.history.pushState(null, '', window.location.href);
      }
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <Header />
      <main className="flex-1 flex overflow-hidden">
        <div style={{ width: explorerWidth }} className="h-full flex-shrink-0">
          <FileExplorer />
        </div>
        <VerticalResizeHandle
          orientation="vertical"
          onResize={(delta) => setExplorerWidth(prev => Math.max(160, Math.min(480, prev + delta)))}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 h-full min-h-0">
            <ResizablePanel
              leftPanel={<EditorPane />}
              rightPanel={<Preview />}
              initialLeftWidth={60}
              minLeftWidth={30}
              minRightWidth={20}
            />
          </div>
          <VerticalResizeHandle
            orientation="horizontal"
            onResize={(delta) => setTerminalHeight(prev => Math.max(100, Math.min(800, prev - delta)))}
          />
          <div style={{ height: terminalHeight }} className="flex-shrink-0">
            <Terminal />
          </div>
        </div>
      </main>
    </div>
  );
}