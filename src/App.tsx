import { Header } from './components/Header';
import { EditorPane } from './components/Editor/EditorPane';
import { FileExplorer } from './components/FileExplorer';
import { Terminal } from './components/Terminal/Terminal';
import { Preview } from './components/Preview/Preview';
import { FileSystemProvider } from './context/FileSystemContext';
import { ResizablePanel } from './components/ResizablePanel';

export default function App() {
  return (
    <FileSystemProvider>
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
    </FileSystemProvider>
  );
}