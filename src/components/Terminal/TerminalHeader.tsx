import { X } from 'lucide-react';

interface TerminalHeaderProps {
  terminals: Array<{ id: string }>;
  activeTerminal: string;
  onTerminalSelect: (id: string) => void;
  onTerminalClose?: (id: string) => void;
}

export function TerminalHeader({ terminals, activeTerminal, onTerminalSelect, onTerminalClose }: TerminalHeaderProps) {
  return (
    <div className="flex items-center">
      <div className="flex">
        {terminals.map(({ id }) => (
          <div key={id} className="flex items-center">
            <button
              onClick={() => onTerminalSelect(id)}
              className={`px-3 py-1 text-xs ${
                activeTerminal === id 
                  ? 'text-white bg-[#2d2d2d]' 
                  : 'text-gray-400 hover:text-white hover:bg-[#2d2d2d]'
              }`}
            >
              Terminal {id}
            </button>
            {id !== '1' && onTerminalClose && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTerminalClose(id);
                }}
                className="hover:text-white text-gray-400 px-1"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}