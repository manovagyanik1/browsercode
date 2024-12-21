import { createContext, useContext, useState } from 'react';

interface PreviewContextType {
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
}

const PreviewContext = createContext<PreviewContextType | null>(null);

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  return (
    <PreviewContext.Provider value={{ previewUrl, setPreviewUrl }}>
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreview() {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error('usePreview must be used within a PreviewProvider');
  }
  return context;
} 