import { useEffect } from 'react';
import { Header } from './components/Header';
import { EditorPane } from './components/Editor/EditorPane';
import { FileExplorer } from './components/FileExplorer';
import { Terminal } from './components/Terminal/Terminal';
import { Preview } from './components/Preview/Preview';
import { FileSystemProvider } from './context/FileSystemContext';
import { ResizablePanel } from './components/ResizablePanel';
import { PreviewProvider } from './context/PreviewContext';

export default function App() {
  useEffect(() => {
    // Handle page refresh and tab close
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const message = 'You will lose all your changes. Are you sure you want to leave?';
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    // Handle browser back button
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      if (window.confirm('You will lose all your changes. Are you sure you want to leave?')) {
        window.history.go(-1);
      } else {
        // Push a new state to prevent leaving
        window.history.pushState(null, '', window.location.href);
      }
    };

    // Push initial state to enable back button handling
    window.history.pushState(null, '', window.location.href);

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <FileSystemProvider>
      <PreviewProvider>
        <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
          <Header />
          <main className="flex-1 flex">
            <FileExplorer />
            <div className="flex-1 flex flex-col">
              <ResizablePanel
                leftPanel={<EditorPane />}
                rightPanel={<Preview />}
                initialLeftWidth={60}
                minLeftWidth={30}
                minRightWidth={20}
              />
              <Terminal />
            </div>
          </main>
        </div>
      </PreviewProvider>
    </FileSystemProvider>
  );
}