import { createContext, useContext, useState } from 'react';
import type { FileNode, FileSystemContextType } from '../types/fileSystem';

const FileSystemContext = createContext<FileSystemContextType | null>(null);

export function FileSystemProvider({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<FileNode[]>([]);
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