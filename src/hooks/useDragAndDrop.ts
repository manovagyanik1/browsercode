import { useState } from 'react';
import { useFileSystem } from '../context/FileSystemContext';

export function useDragAndDrop() {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const { renameFile } = useFileSystem();

  const handleDragStart = (path: string) => {
    setDraggedItem(path);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-[#2a2d2e]');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('bg-[#2a2d2e]');
  };

  const handleDrop = (e: React.DragEvent, targetPath: string) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-[#2a2d2e]');

    if (!draggedItem || draggedItem === targetPath) return;

    const fileName = draggedItem.split('/').pop()!;
    const newPath = targetPath === '/' ? `/${fileName}` : `${targetPath}/${fileName}`;
    
    renameFile(draggedItem, newPath);
    setDraggedItem(null);
  };

  return {
    draggedItem,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop
  };
}