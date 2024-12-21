import { useEffect, useRef, useState } from 'react';

interface ResizablePanelProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  initialLeftWidth?: number;
  minLeftWidth?: number;
  minRightWidth?: number;
}

export function ResizablePanel({
  leftPanel,
  rightPanel,
  initialLeftWidth = 60,
  minLeftWidth = 20,
  minRightWidth = 20,
}: ResizablePanelProps) {
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth);
  const containerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !container) return;

      const containerRect = container.getBoundingClientRect();
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

      // Enforce min widths
      if (newLeftWidth >= minLeftWidth && (100 - newLeftWidth) >= minRightWidth) {
        setLeftWidth(newLeftWidth);
      }
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
  }, [minLeftWidth, minRightWidth]);

  const handleDragStart = () => {
    isDragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  return (
    <div ref={containerRef} className="flex-1 flex overflow-hidden">
      <div style={{ width: `${leftWidth}%` }} className="h-full overflow-hidden">
        {leftPanel}
      </div>
      <div
        ref={dividerRef}
        className="w-1 bg-gray-800 hover:bg-blue-500 cursor-col-resize transition-colors flex-shrink-0"
        onMouseDown={handleDragStart}
      />
      <div style={{ width: `${100 - leftWidth}%` }} className="h-full overflow-hidden">
        {rightPanel}
      </div>
    </div>
  );
}