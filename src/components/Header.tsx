import { Code2 } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-blue-500" />
            <h1 className="text-xl font-semibold text-white">Code Editor</h1>
          </div>
        </div>
      </div>
    </header>
  );
}