import type { FileNode } from '../types/fileSystem';

// Special files that should appear at the end
const SPECIAL_FILES = [
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'tsconfig.node.json',
  'vite.config.ts',
  '.gitignore',
  '.eslintrc.js',
  'postcss.config.js',
  'tailwind.config.js'
];

export function sortFileNodes(nodes: FileNode[]): FileNode[] {
  return [...nodes].sort((a, b) => {
    // If both are directories or both are files
    if (a.type === b.type) {
      // If they're both files, check if they're special files
      if (a.type === 'file') {
        const aIsSpecial = SPECIAL_FILES.includes(a.name);
        const bIsSpecial = SPECIAL_FILES.includes(b.name);
        
        if (aIsSpecial && !bIsSpecial) return 1;
        if (!aIsSpecial && bIsSpecial) return -1;
        if (aIsSpecial && bIsSpecial) {
          return SPECIAL_FILES.indexOf(a.name) - SPECIAL_FILES.indexOf(b.name);
        }
      }
      return a.name.localeCompare(b.name);
    }
    
    // Directories come before files
    return a.type === 'directory' ? -1 : 1;
  });
}

export function getFileLanguage(filePath: string): string {
  const extension = filePath.split('.').pop()?.toLowerCase();
  
  const languageMap: Record<string, string> = {
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'html': 'html',
    'css': 'css',
    'json': 'json',
    'md': 'markdown',
  };

  return languageMap[extension || ''] || 'plaintext';
}

export function isFileEditable(path: string): boolean {
  // Don't allow editing directories
  if (path.endsWith('/')) return false;
  
  // Get the file extension
  const extension = path.split('.').pop()?.toLowerCase();
  
  // List of editable extensions
  const editableExtensions = [
    'txt', 'md', 'js', 'jsx', 'ts', 'tsx', 
    'css', 'scss', 'less', 'html', 'json',
    'yml', 'yaml', 'xml', 'svg', 'env',
    'gitignore', 'dockerignore', 'sh', 'bash'
  ];
  
  return extension ? editableExtensions.includes(extension) : false;
}