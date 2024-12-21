import { useFileSystem } from '../../context/FileSystemContext';
import { ChevronRight } from 'lucide-react';

export function EditorHeader() {
  const { currentFile } = useFileSystem();

  if (!currentFile) return null;

  const pathParts = currentFile.split('/').filter(Boolean);

  return (
    <div className="bg-[#1e1e1e] px-4 py-2 text-[#cccccc] text-sm flex items-center gap-2 border-b border-[#2d2d2d]">
      {pathParts.map((part, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 mx-1 text-gray-500" />}
          <span>{part}</span>
        </div>
      ))}
    </div>
  );
}