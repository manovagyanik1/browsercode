import { ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { FileNode } from '../../types/fileSystem';
import { useFileSystem } from '../../context/FileSystemContext';
import { ContextMenu } from './ContextMenu';
import { EditableLabel } from './EditableLabel';
import { FileIcon } from './FileIcon';

interface FileTreeItemProps {
  node: FileNode;
  level: number;
}

export function FileTreeItem({ node, level }: FileTreeItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { setCurrentFile, renameFile, currentFile } = useFileSystem();
  const isDirectory = node.type === 'directory';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDirectory) {
      setIsOpen(!isOpen);
    } else {
      setCurrentFile(node.path);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const isActive = currentFile === node.path;
  const className = `flex items-center gap-1 px-2 py-1 cursor-pointer text-[13px] ${
    isActive ? 'bg-[#37373d] text-white' : 'text-[#cccccc] hover:bg-[#2a2d2e]'
  }`;

  return (
    <div>
      <div
        className={className}
        style={{ paddingLeft: `${level * 12}px` }}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onContextMenu={(e) => {
          e.preventDefault();
          setContextMenu({ x: e.clientX, y: e.clientY });
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
        />
      )}
      {isDirectory && isOpen && node.children?.map((child, index) => (
        <FileTreeItem key={index} node={child} level={level + 1} />
      ))}
    </div>
  );
}