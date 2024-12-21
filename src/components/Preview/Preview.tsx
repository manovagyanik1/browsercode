import { usePreview } from '../../context/PreviewContext';

export function Preview() {
  const { previewUrl } = usePreview();

  if (!previewUrl) {
    return (
      <div className="h-full bg-white flex items-center justify-center text-gray-500">
        <p>Waiting for dev server to start...</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-white">
      <iframe
        src={previewUrl}
        className="w-full h-full border-none"
        title="Preview"
        sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
      />
    </div>
  );
}