export function Preview() {
  return (
    <div className="h-full bg-white">
      <iframe
        src="about:blank"
        className="w-full h-full border-none"
        title="Preview"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}