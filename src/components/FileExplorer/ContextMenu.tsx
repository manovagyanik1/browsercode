import { useEffect, useRef } from 'react';
import { Target, Lock, Plus, FolderPlus, FileText, Folder } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  path: string;
  isDirectory: boolean;
  onClose: () => void;
  onRename: () => void;
  onCreateFile?: () => void;
  onCreateFolder?: () => void;
}

export function ContextMenu({
  x,
  y,
  path,
  isDirectory,
  onClose,
  onRename,
  onCreateFile,
  onCreateFolder
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

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
    ...(isDirectory ? [
      {
        label: 'New File',
        icon: FileText,
        action: () => {
          onCreateFile?.();
          onClose();
        }
      },
      {
        label: 'New Folder',
        icon: Folder,
        action: () => {
          onCreateFolder?.();
          onClose();
        }
      },
      { type: 'separator' as const }
    ] : []),
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
    { type: 'separator' as const },
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
    { type: 'separator' as const },
    {
      label: 'Rename...',
      action: () => {
        onRename();
        onClose();
      }
    },
    {
      label: 'Delete',
      action: () => {
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
          return <div key={index} className="h-px bg-[#454545] my-1" />;
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