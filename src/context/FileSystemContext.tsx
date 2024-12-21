import { createContext, useContext, useState } from 'react';
import type { FileNode, FileSystemContextType } from '../types/fileSystem';

const FileSystemContext = createContext<FileSystemContextType | null>(null);

const initialFiles: FileNode[] = [
  {
    name: 'src',
    path: 'src',
    type: 'directory',
    children: [
      {
        name: 'App.tsx',
        path: 'src/App.tsx',
        type: 'file',
        content: `import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}`
      },
      {
        name: 'App.css',
        path: 'src/App.css',
        type: 'file',
        content: `#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.card {
  padding: 2em;
}`
      },
      {
        name: 'main.tsx',
        path: 'src/main.tsx',
        type: 'file',
        content: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`
      },
      {
        name: 'index.css',
        path: 'src/index.css',
        type: 'file',
        content: `@tailwind base;
@tailwind components;
@tailwind utilities;`
      }
    ]
  },
  {
    name: 'index.html',
    path: 'index.html',
    type: 'file',
    content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`
  },
  {
    name: 'package.json',
    path: 'package.json',
    type: 'file',
    content: JSON.stringify({
      "name": "vite-react-typescript-starter",
      "private": true,
      "version": "0.0.0",
      "type": "module",
      "scripts": {
        "dev": "vite",
        "build": "tsc && vite build",
        "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
        "preview": "vite preview"
      },
      "dependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "lucide-react": "^0.358.0"
      },
      "devDependencies": {
        "@types/react": "^18.2.64",
        "@types/react-dom": "^18.2.21",
        "@typescript-eslint/eslint-plugin": "^7.1.1",
        "@typescript-eslint/parser": "^7.1.1",
        "@vitejs/plugin-react": "^4.2.1",
        "autoprefixer": "^10.4.18",
        "eslint": "^8.57.0",
        "eslint-plugin-react-hooks": "^4.6.0",
        "eslint-plugin-react-refresh": "^0.4.5",
        "postcss": "^8.4.35",
        "tailwindcss": "^3.4.1",
        "typescript": "^5.2.2",
        "vite": "^5.1.6"
      }
    }, null, 2)
  },
  {
    name: 'tsconfig.json',
    path: 'tsconfig.json',
    type: 'file',
    content: JSON.stringify({
      "compilerOptions": {
        "target": "ES2020",
        "useDefineForClassFields": true,
        "lib": ["ES2020", "DOM", "DOM.Iterable"],
        "module": "ESNext",
        "skipLibCheck": true,
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx",
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true
      },
      "include": ["src"],
      "references": [{ "path": "./tsconfig.node.json" }]
    }, null, 2)
  },
  {
    name: 'vite.config.ts',
    path: 'vite.config.ts',
    type: 'file',
    content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()]
})`
  }
];

export function FileSystemProvider({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<FileNode[]>(initialFiles);
  const [currentFile, setCurrentFile] = useState<string | null>(null);

  const createFile = (path: string, content = '') => {
    setFiles(prev => {
      const newFiles = [...prev];
      const parts = path.split('/').filter(Boolean);
      let current = newFiles;

      for (let i = 0; i < parts.length - 1; i++) {
        const dir = current.find(f => f.name === parts[i] && f.type === 'directory');
        if (!dir) return prev;
        current = dir.children || [];
      }

      const newFile = {
        name: parts[parts.length - 1],
        path,
        type: 'file' as const,
        content
      };
      current.push(newFile);

      return newFiles;
    });
  };

  const createDirectory = (path: string) => {
    setFiles(prev => {
      const newFiles = [...prev];
      const parts = path.split('/').filter(Boolean);
      let current = newFiles;

      for (let i = 0; i < parts.length - 1; i++) {
        const dir = current.find(f => f.name === parts[i] && f.type === 'directory');
        if (!dir) return prev;
        current = dir.children || [];
      }

      const newDir = {
        name: parts[parts.length - 1],
        path,
        type: 'directory' as const,
        children: []
      };
      current.push(newDir);

      return newFiles;
    });
  };

  const deleteFile = (path: string) => {
    setFiles(prev => {
      const newFiles = [...prev];
      const parts = path.split('/').filter(Boolean);
      let current = newFiles;

      for (let i = 0; i < parts.length - 1; i++) {
        const dir = current.find(f => f.name === parts[i] && f.type === 'directory');
        if (!dir) return prev;
        current = dir.children || [];
      }

      const index = current.findIndex(f => f.name === parts[parts.length - 1]);
      if (index !== -1) {
        current.splice(index, 1);
      }

      return newFiles;
    });
  };

  const renameFile = (oldPath: string, newPath: string) => {
    setFiles(prev => {
      const newFiles = [...prev];
      const oldParts = oldPath.split('/').filter(Boolean);
      const newParts = newPath.split('/').filter(Boolean);
      let current = newFiles;

      for (let i = 0; i < oldParts.length - 1; i++) {
        const dir = current.find(f => f.name === oldParts[i] && f.type === 'directory');
        if (!dir) return prev;
        current = dir.children || [];
      }

      const file = current.find(f => f.name === oldParts[oldParts.length - 1]);
      if (!file) return prev;

      file.name = newParts[newParts.length - 1];
      file.path = newPath;

      return newFiles;
    });
  };

  const updateFileContent = (path: string, content: string) => {
    setFiles(prev => {
      const newFiles = [...prev];
      const parts = path.split('/').filter(Boolean);
      let current = newFiles;

      for (let i = 0; i < parts.length - 1; i++) {
        const dir = current.find(f => f.name === parts[i] && f.type === 'directory');
        if (!dir) return prev;
        current = dir.children || [];
      }

      const file = current.find(f => f.name === parts[parts.length - 1]);
      if (file && file.type === 'file') {
        file.content = content;
      }

      return newFiles;
    });
  };

  return (
    <FileSystemContext.Provider value={{
      files,
      currentFile,
      createFile,
      createDirectory,
      deleteFile,
      renameFile,
      updateFileContent,
      setCurrentFile
    }}>
      {children}
    </FileSystemContext.Provider>
  );
}

export const useFileSystem = () => {
  const context = useContext(FileSystemContext);
  if (!context) {
    throw new Error('useFileSystem must be used within a FileSystemProvider');
  }
  return context;
};