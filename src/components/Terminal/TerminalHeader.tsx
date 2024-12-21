interface TerminalHeaderProps {
  terminals: Array<{ id: string }>;
  activeTerminal: string;
  onTerminalSelect: (id: string) => void;
}

export function TerminalHeader({ terminals, activeTerminal, onTerminalSelect }: TerminalHeaderProps) {
  return (
    <div className="flex items-center">
      <div className="flex">
        {terminals.map(({ id }) => (
          <button
            key={id}
            onClick={() => onTerminalSelect(id)}
            className={`px-3 py-1 text-xs ${
              activeTerminal === id 
                ? 'text-white bg-[#2d2d2d]' 
                : 'text-gray-400 hover:text-white hover:bg-[#2d2d2d]'
            }`}
          >
            Terminal {id}
          </button>
        ))}
      </div>
    </div>
  );
}