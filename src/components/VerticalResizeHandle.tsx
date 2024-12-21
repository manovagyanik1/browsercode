import { useEffect, useRef } from 'react';

interface VerticalResizeHandleProps {
  onResize: (deltaY: number) => void;
}

export function VerticalResizeHandle({ onResize }: VerticalResizeHandleProps) {
  const isDragging = useRef(false);
  const startY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaY = e.clientY - startY.current;
      onResize(deltaY);
      startY.current = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onResize]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startY.current = e.clientY;
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
  };

  return (
    <div
      className="h-1 bg-gray-800 hover:bg-blue-500 cursor-row-resize transition-colors"
      onMouseDown={handleMouseDown}
    />
  );
} 