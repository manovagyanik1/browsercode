import { Plus, FolderPlus } from 'lucide-react';
import { useFileSystem } from '../../context/FileSystemContext';
import { FileTreeItem } from './FileTree';
import { useState } from 'react';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';

export function FileExplorer() {
  const { files, currentFile } = useFileSystem();
  const [isCreating, setIsCreating] = useState<{ type: 'file' | 'folder'; parentPath: string } | null>(null);
  const { handleDragOver, handleDragLeave, handleDrop } = useDragAndDrop();

  const getTargetDirectory = () => {
    if (!currentFile) {
      console.log('No current file, returning root directory');
      return '/'; 
    }
  
    if (currentFile.endsWith('/')) {
      console.log(`Selected directory: ${currentFile}`);
      return currentFile; 
    }
  
    const parts = currentFile.split('/');
    const parentPath = parts.join('/'); 
    
    console.log(`Current file: ${currentFile}, Parent path: ${parentPath}`);
    
    return parentPath || '/';
  };
  
  

  const handleCreateFile = () => {
    const targetDirectory = getTargetDirectory();
    console.log('Creating file in:', targetDirectory);
    setIsCreating({ type: 'file', parentPath: targetDirectory });
  };
  
  const handleCreateFolder = () => {
    const targetDirectory = getTargetDirectory();
    console.log('Creating folder in:', targetDirectory);
    setIsCreating({ type: 'folder', parentPath: targetDirectory });
  };
  

  return (
    <div 
      className="h-full flex flex-col bg-[#1e1e1e]"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, '/')}
    >
      <div className="p-3 border-b border-[#2d2d2d] flex items-center justify-between">
        <span className="text-sm font-medium text-[#cccccc]">EXPLORER</span>
        <div className="flex gap-2">
          <button
            onClick={handleCreateFile}
            className="p-1 hover:bg-[#2d2d2e] rounded"
            title="New File"
          >
            <Plus className="w-4 h-4 text-[#cccccc]" />
          </button>
          <button
            onClick={handleCreateFolder}
            className="p-1 hover:bg-[#2d2d2e] rounded"
            title="New Folder"
          >
            <FolderPlus className="w-4 h-4 text-[#cccccc]" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {files.map((node, index) => (
          <FileTreeItem 
            key={index} 
            node={node} 
            level={1}
            isCreating={isCreating}
            onCreateFinish={() => setIsCreating(null)}
          />
        ))}
      </div>
    </div>
  );
}