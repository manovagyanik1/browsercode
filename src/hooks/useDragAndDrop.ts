import { useState } from 'react';
import { useFileSystem } from '../context/FileSystemContext';
import { moveFile } from '../services/webcontainer';

export function useDragAndDrop() {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragTarget, setDragTarget] = useState<string | null>(null);
  const { moveFile: moveFileInState } = useFileSystem();

  const handleDragStart = (path: string) => {
    setDraggedItem(path);
  };

  const handleDragOver = (e: React.DragEvent, targetPath?: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragTarget(targetPath);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragTarget(null);
  };

  const handleDrop = async (e: React.DragEvent, targetPath: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragTarget(null);

    if (!draggedItem || draggedItem === targetPath) return;

    const fileName = draggedItem.split('/').pop()!;
    const newPath = targetPath === '/' ? `/${fileName}` : `${targetPath}/${fileName}`;
    
    // Don't move if target path is the same as current directory
    const currentDir = draggedItem.substring(0, draggedItem.lastIndexOf('/'));
    if (currentDir === targetPath) return;

    // First move the file in WebContainer
    const success = await moveFile(draggedItem, newPath);
    
    if (success) {
      // Then update our state
      moveFileInState(draggedItem, newPath);
    }
    
    setDraggedItem(null);
  };

  return {
    draggedItem,
    dragTarget,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop
  };
}