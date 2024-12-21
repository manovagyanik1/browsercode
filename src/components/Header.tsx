import { Code2, Eye, EyeOff } from 'lucide-react';

interface HeaderProps {
  onTogglePreview: () => void;
}

export function Header({ onTogglePreview }: HeaderProps) {
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-blue-500" />
            <h1 className="text-xl font-semibold text-white">Code Editor</h1>
          </div>
          <button
            onClick={onTogglePreview}
            className="p-2 hover:bg-gray-800 rounded-md flex items-center gap-2 text-gray-300 hover:text-white"
          >
            <Eye className="w-4 h-4" />
            <span>Toggle Preview</span>
          </button>
        </div>
      </div>
    </header>
  );
}