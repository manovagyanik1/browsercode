import type { FileNode } from '../types/fileSystem';

export function getFileContent(path: string, files: FileNode[]): string {
  if (!path) return '';
  const parts = path.split('/').filter(Boolean);
  let current = files;
  
  for (let i = 0; i < parts.length - 1; i++) {
    const dir = current.find(f => f.name === parts[i] && f.type === 'directory');
    if (!dir) return '';
    current = dir.children || [];
  }
  
  const file = current.find(f => f.name === parts[parts.length - 1]);
  return file?.content || '';
}