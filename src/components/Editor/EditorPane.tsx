import Editor, { useMonaco } from '@monaco-editor/react';
import { useEffect, useCallback } from 'react';
import { useFileSystem } from '../../context/FileSystemContext';
import { EDITOR_OPTIONS } from '../../constants/editorDefaults';
import { getFileLanguage } from '../../utils/fileUtils';
import { getFileContent } from '../../utils/fileSystemUtils';
import { EmptyEditor } from './EmptyEditor';
import { EditorHeader } from './EditorHeader';
import { setupMonacoTypescript } from '../../utils/monacoUtils';
import { getWebContainerInstance } from '../../services/webcontainer';
import debounce from 'lodash/debounce';

export function EditorPane() {
  const monaco = useMonaco();
  const { currentFile, files, updateFileContent, setCurrentFile } = useFileSystem();

  // Debounced save function
  const debouncedSave = useCallback(
    debounce(async (path: string, content: string) => {
      try {
        const webcontainer = await getWebContainerInstance();
        await webcontainer.fs.writeFile(path, content);
      } catch (error) {
        console.error('Failed to save file:', error);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    if (monaco) {
      setupMonacoTypescript(monaco, files);
    }
  }, [monaco, files]);

  const handleEditorChange = async (value: string | undefined) => {
    if (currentFile && value !== undefined) {
      updateFileContent(currentFile, value);
      debouncedSave(currentFile, value);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#1e1e1e] min-w-0">
      <EditorHeader />
      <div className="flex-1 min-h-0 relative">
        {!currentFile ? (
          <EmptyEditor />
        ) : (
          <Editor
            height="100%"
            defaultLanguage={getFileLanguage(currentFile)}
            value={getFileContent(currentFile, files)}
            theme="vs-dark"
            options={{
              ...EDITOR_OPTIONS,
              quickSuggestions: {
                other: true,
                comments: true,
                strings: true
              },
              suggestOnTriggerCharacters: true,
              acceptSuggestionOnCommitCharacter: true,
              wordBasedSuggestions: "allDocuments",
              parameterHints: {
                enabled: true
              },
              mouseWheelZoom: true,
              smoothScrolling: true,
              links: true,
              minimap: { enabled: false }
            }}
            onChange={handleEditorChange}
            path={currentFile}
          />
        )}
      </div>
    </div>
  );
}