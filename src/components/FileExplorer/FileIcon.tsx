import { File, Folder } from 'lucide-react';

interface FileIconProps {
  isDirectory: boolean;
}

export function FileIcon({ isDirectory }: FileIconProps) {
  if (isDirectory) {
    return <Folder className="w-4 h-4 text-[#e3b341]" />;
  }
  return <File className="w-4 h-4 text-[#519aba]" />;
}