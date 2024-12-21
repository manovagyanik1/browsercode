export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
  content?: string;
}

export interface FileSystemContextType {
  files: FileNode[];
  currentFile: string | null;
  setFiles: (files: FileNode[]) => void;
  createFile: (path: string, content?: string) => void;
  createDirectory: (path: string) => void;
  deleteFile: (path: string) => void;
  renameFile: (oldPath: string, newPath: string) => void;
  updateFileContent: (path: string, content: string) => void;
  setCurrentFile: (path: string | null) => void;
}