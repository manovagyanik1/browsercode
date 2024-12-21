import { ChevronRight, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { FileNode } from '../../types/fileSystem';
import { useFileSystem } from '../../context/FileSystemContext';
import { ContextMenu } from './ContextMenu';
import { EditableLabel } from './EditableLabel';
import { FileIcon } from './FileIcon';
import { sortFileNodes } from '../../utils/fileUtils';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';

interface FileTreeItemProps {
  node: FileNode;
  level: number;
  isCreating?: { type: 'file' | 'folder'; parentPath: string };
  onCreateFinish?: () => void;
}

export function FileTreeItem({ node, level, isCreating, onCreateFinish }: FileTreeItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { setCurrentFile, renameFile, currentFile, createFile, createDirectory, deleteFile } = useFileSystem();
  const isDirectory = node.type === 'directory';
  const { draggedItem, dragTarget, handleDragStart, handleDragOver, handleDragLeave, handleDrop } = useDragAndDrop();

  useEffect(() => {
    if (isCreating && node.path === isCreating.parentPath) {
      setIsOpen(true);
    }
  }, [isCreating, node.path]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDirectory) {
      setIsOpen(!isOpen);
    }
    setCurrentFile(node.path);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDirectory) {
      setIsEditing(true);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY });
    setCurrentFile(node.path);
  };

  const isActive = currentFile === node.path;
  const isDragTarget = dragTarget === node.path && isDirectory;
  const isDragging = draggedItem === node.path;
  const canDrop = isDirectory && draggedItem !== node.path;

  const className = `
    flex items-center gap-1 px-2 py-1 cursor-pointer text-[13px]
    ${isActive ? 'bg-[#37373d] text-white' : 'text-[#cccccc] hover:bg-[#2a2d2e]'}
    ${isDragTarget ? 'bg-[#2a2d2e] ring-1 ring-blue-500' : ''}
    ${isDragging ? 'opacity-50' : ''}
    transition-all duration-150
  `;

  return (
    <div>
      <div
        className={className}
        style={{ paddingLeft: `${level * 12}px` }}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleContextMenu}
        draggable={!isEditing}
        onDragStart={(e) => {
          e.stopPropagation();
          handleDragStart(node.path);
        }}
        onDragOver={(e) => {
          if (canDrop) {
            handleDragOver(e, node.path);
          }
        }}
        onDragLeave={(e) => {
          if (canDrop) {
            handleDragLeave(e);
          }
        }}
        onDrop={(e) => {
          if (canDrop) {
            handleDrop(e, node.path);
          }
        }}
      >
        {isDirectory && (
          <span className="w-4 h-4">
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </span>
        )}
        <FileIcon isDirectory={isDirectory} />
        <EditableLabel
          value={node.name}
          isEditing={isEditing}
          onSubmit={(newName) => {
            if (newName && newName !== node.name) {
              const newPath = node.path.replace(node.name, newName);
              renameFile(node.path, newPath);
            }
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          path={node.path}
          isDirectory={isDirectory}
          onClose={() => setContextMenu(null)}
          onRename={() => setIsEditing(true)}
          onCreateFile={() => createFile(`${node.path}/untitled`)}
          onCreateFolder={() => createDirectory(`${node.path}/untitled`)}
        />
      )}

      {isDirectory && (isOpen || isDragTarget) && (
        <div>
          {isCreating && node.path === isCreating.parentPath && (
            <div className="flex items-center" style={{ paddingLeft: `${(level + 1) * 12}px` }}>
              <FileIcon isDirectory={isCreating.type === 'folder'} />
              <EditableLabel
                value=""
                isEditing={true}
                onSubmit={handleNewItemSubmit}
                onCancel={onCreateFinish}
              />
            </div>
          )}
          {sortFileNodes(node.children || []).map((child, index) => (
            <FileTreeItem 
              key={index} 
              node={child} 
              level={level + 1} 
              isCreating={isCreating}
              onCreateFinish={onCreateFinish}
            />
          ))}
        </div>
      )}
    </div>
  );
}