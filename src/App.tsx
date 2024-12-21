import { Header } from './components/Header';
import { EditorPane } from './components/Editor/EditorPane';
import { FileExplorer } from './components/FileExplorer';
import { Terminal } from './components/Terminal/Terminal';
import { Preview } from './components/Preview/Preview';
import { FileSystemProvider } from './context/FileSystemContext';
import { useState } from 'react';

export default function App() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <FileSystemProvider>
      <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
        <Header onTogglePreview={() => setShowPreview(!showPreview)} />
        <main className="flex-1 flex">
          <FileExplorer />
          <div className="flex-1 flex flex-col">
            <div className="flex-1 flex">
              <div className={`flex-1 ${showPreview ? 'border-r border-gray-800' : ''}`}>
                <EditorPane />
              </div>
              {showPreview && (
                <div className="w-1/2">
                  <Preview />
                </div>
              )}
            </div>
            <Terminal />
          </div>
        </main>
      </div>
    </FileSystemProvider>
  );
}