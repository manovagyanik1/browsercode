import { useFileSystem } from '../../context/FileSystemContext';

export function Preview() {
  const { currentFile } = useFileSystem();

  if (!currentFile) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <p>Select a file to preview</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-white">
      <iframe
        src={`/preview/${currentFile}`}
        className="w-full h-full border-none"
        title="Preview"
      />
    </div>
  );
}