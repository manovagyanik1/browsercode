import { Plus, FolderPlus } from 'lucide-react';
import { useFileSystem } from '../../context/FileSystemContext';
import { FileTreeItem } from './FileTree';
import { useState } from 'react';
import { EditableLabel } from './EditableLabel';

export function FileExplorer() {
  const { files, createFile, createDirectory } = useFileSystem();
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  const handleCreateFile = () => {
    setIsCreatingFile(true);
  };

  const handleCreateFolder = () => {
    setIsCreatingFolder(true);
  };

  const handleNewItemSubmit = (name: string) => {
    if (name) {
      if (isCreatingFile) {
        createFile(name);
      } else if (isCreatingFolder) {
        createDirectory(name);
      }
    }
    setIsCreatingFile(false);
    setIsCreatingFolder(false);
  };

  const handleNewItemCancel = () => {
    setIsCreatingFile(false);
    setIsCreatingFolder(false);
  };

  return (
    <div className="w-64 bg-[#1e1e1e] border-r border-[#2d2d2d] flex flex-col">
      <div className="p-3 border-b border-[#2d2d2d] flex items-center justify-between">
        <span className="text-sm font-medium text-[#cccccc]">EXPLORER</span>
        <div className="flex gap-2">
          <button
            onClick={handleCreateFile}
            className="p-1 hover:bg-[#2d2d2d] rounded"
            title="New File"
          >
            <Plus className="w-4 h-4 text-[#cccccc]" />
          </button>
          <button
            onClick={handleCreateFolder}
            className="p-1 hover:bg-[#2d2d2d] rounded"
            title="New Folder"
          >
            <FolderPlus className="w-4 h-4 text-[#cccccc]" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {(isCreatingFile || isCreatingFolder) && (
          <div className="px-4 py-1">
            <EditableLabel
              value=""
              isEditing={true}
              onSubmit={handleNewItemSubmit}
              onCancel={handleNewItemCancel}
            />
          </div>
        )}
        {files.map((node, index) => (
          <FileTreeItem key={index} node={node} level={1} />
        ))}
      </div>
    </div>
  );
}