import { useEffect, useRef } from 'react';

interface VerticalResizeHandleProps {
  onResize: (delta: number) => void;
  orientation: 'vertical' | 'horizontal';
}

export function VerticalResizeHandle({ onResize, orientation }: VerticalResizeHandleProps) {
  const isDragging = useRef(false);
  const startPos = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const delta = orientation === 'vertical' 
        ? e.clientX - startPos.current 
        : e.clientY - startPos.current;
      onResize(delta);
      startPos.current = orientation === 'vertical' ? e.clientX : e.clientY;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      
      // Remove overlay
      const overlay = document.getElementById('resize-overlay');
      if (overlay) {
        overlay.remove();
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onResize, orientation]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startPos.current = orientation === 'vertical' ? e.clientX : e.clientY;
    document.body.style.cursor = orientation === 'vertical' ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';

    // Add overlay to prevent iframe interference
    const overlay = document.createElement('div');
    overlay.id = 'resize-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.right = '0';
    overlay.style.bottom = '0';
    overlay.style.zIndex = '9999';
    document.body.appendChild(overlay);
  };

  return (
    <div
      className={`
        ${orientation === 'vertical' ? 'w-1 cursor-col-resize' : 'h-1 cursor-row-resize'}
        bg-gray-800 hover:bg-blue-500 transition-colors flex-shrink-0
      `}
      onMouseDown={handleMouseDown}
    />
  );
} 