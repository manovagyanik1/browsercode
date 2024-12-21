import { createContext, useContext, useState } from 'react';
import type { FileNode, FileSystemContextType } from '../types/fileSystem';

const FileSystemContext = createContext<FileSystemContextType | null>(null);

export function FileSystemProvider({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<FileNode[]>([]);
  const [currentFile, setCurrentFile] = useState<string | null>(null);

  const findNode = (path: string): { node: FileNode | null; parent: FileNode[] } => {
    const parts = path.split('/').filter(Boolean);
    let current = files;
    let node: FileNode | null = null;
    
    for (let i = 0; i < parts.length; i++) {
      node = current.find(f => f.name === parts[i]) || null;
      if (!node) break;
      if (i < parts.length - 1) {
        current = node.children || [];
      }
    }
    
    return { node, parent: current };
  };

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
      const { node, parent } = findNode(path);
      
      if (node) {
        const index = parent.indexOf(node);
        if (index !== -1) {
          parent.splice(index, 1);
        }
      }

      return newFiles;
    });

    // Clear currentFile if deleted
    if (currentFile === path) {
      setCurrentFile(null);
    }
  };

  const moveFile = (oldPath: string, newPath: string) => {
    setFiles(prev => {
      const newFiles = [...prev];
      const { node: sourceNode, parent: sourceParent } = findNode(oldPath);
      
      if (!sourceNode) return prev;

      // Remove from old location
      const sourceIndex = sourceParent.indexOf(sourceNode);
      if (sourceIndex !== -1) {
        sourceParent.splice(sourceIndex, 1);
      }

      // Add to new location
      const parts = newPath.split('/').filter(Boolean);
      let current = newFiles;

      for (let i = 0; i < parts.length - 1; i++) {
        const dir = current.find(f => f.name === parts[i] && f.type === 'directory');
        if (!dir) return prev;
        current = dir.children || [];
      }

      const movedNode = {
        ...sourceNode,
        name: parts[parts.length - 1],
        path: newPath
      };
      current.push(movedNode);

      return newFiles;
    });

    // Update currentFile if moved
    if (currentFile === oldPath) {
      setCurrentFile(newPath);
    }
  };

  const renameFile = (oldPath: string, newPath: string) => {
    // Use moveFile for both renaming and moving
    moveFile(oldPath, newPath);
  };

  const updateFileContent = (path: string, content: string) => {
    setFiles(prev => {
      const newFiles = [...prev];
      const { node } = findNode(path);
      
      if (node && node.type === 'file') {
        node.content = content;
      }

      return newFiles;
    });
  };

  return (
    <FileSystemContext.Provider value={{
      files,
      setFiles,
      currentFile,
      createFile,
      createDirectory,
      deleteFile,
      renameFile,
      moveFile,
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