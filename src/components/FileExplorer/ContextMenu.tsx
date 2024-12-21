import { useEffect, useRef } from 'react';
import { Target, Lock, Plus, FolderPlus } from 'lucide-react';
import { useFileSystem } from '../../context/FileSystemContext';

interface ContextMenuProps {
  x: number;
  y: number;
  path: string;
  isDirectory: boolean;
  onClose: () => void;
  onRename: () => void;
}

export function ContextMenu({ x, y, path, isDirectory, onClose, onRename }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { createFile, createDirectory, deleteFile } = useFileSystem();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const menuItems = [
    {
      label: 'New file...',
      icon: Plus,
      action: () => {
        createFile(path + '/untitled');
        onClose();
      },
      showFor: 'directory'
    },
    {
      label: 'New folder...',
      icon: FolderPlus,
      action: () => {
        createDirectory(path + '/untitled');
        onClose();
      },
      showFor: 'directory'
    },
    { type: 'separator', showFor: 'directory' },
    {
      label: 'Target file',
      icon: Target,
      action: () => {
        onClose();
      }
    },
    {
      label: 'Lock file',
      icon: Lock,
      action: () => {
        onClose();
      }
    },
    { type: 'separator' },
    {
      label: 'Cut',
      action: () => {
        onClose();
      }
    },
    {
      label: 'Copy',
      action: () => {
        onClose();
      }
    },
    {
      label: 'Copy path',
      action: () => {
        navigator.clipboard.writeText(path);
        onClose();
      }
    },
    {
      label: 'Copy relative path',
      action: () => {
        const relativePath = path.replace('/src/', '');
        navigator.clipboard.writeText(relativePath);
        onClose();
      }
    },
    { type: 'separator' },
    {
      label: 'Rename...',
      action: () => {
        onRename();
      }
    },
    {
      label: 'Delete',
      action: () => {
        deleteFile(path);
        onClose();
      }
    }
  ];

  return (
    <div
      ref={menuRef}
      className="fixed bg-[#252526] border border-[#454545] rounded-md shadow-lg py-1 z-50"
      style={{ left: x, top: y }}
    >
      {menuItems.map((item, index) => {
        if (item.type === 'separator') {
          return item.showFor && item.showFor !== (isDirectory ? 'directory' : 'file') ? null : (
            <div key={index} className="h-px bg-[#454545] my-1" />
          );
        }

        if (item.showFor && item.showFor !== (isDirectory ? 'directory' : 'file')) {
          return null;
        }

        return (
          <button
            key={index}
            className="w-full px-3 py-1 text-left hover:bg-[#2a2d2e] flex items-center gap-2 text-[13px] text-[#cccccc]"
            onClick={item.action}
          >
            {item.icon && <item.icon className="w-4 h-4" />}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}