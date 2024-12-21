import Editor from '@monaco-editor/react';
import { useFileSystem } from '../../context/FileSystemContext';
import { EmptyEditor } from './EmptyEditor';
import { EditorHeader } from './EditorHeader';
import { isFileEditable, getFileLanguage } from '../../utils/fileUtils';
import { getFileContent } from '../../utils/fileSystemUtils';
import { EDITOR_OPTIONS } from '../../constants/editorDefaults';
import { darkTheme } from '../../constants/editorTheme';
import { useEffect, useCallback } from 'react';
import type { Monaco } from '@monaco-editor/react';
import { getWebContainerInstance } from '../../services/webcontainer';
import debounce from 'lodash/debounce';

export function EditorPane() {
  const { currentFile, files, updateFileContent } = useFileSystem();
  
  // Debounced save function
  const debouncedSave = useCallback(
    debounce(async (path: string, content: string) => {
      try {
        const webcontainer = await getWebContainerInstance();
        await webcontainer.fs.writeFile(path, content);
      } catch (error) {
        console.error('Failed to save file:', error);
      }
    }, 1000), // 1 second delay
    []
  );

  const handleEditorMount = (editor: any, monaco: Monaco) => {
    monaco.editor.defineTheme('browsercode-dark', darkTheme);
    monaco.editor.setTheme('browsercode-dark');
    
    // Configure TypeScript compiler options
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
      jsxImportSource: 'react',
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      allowNonTsExtensions: true,
    });
  };

  // Don't show editor for directories or non-editable files
  if (!currentFile || !isFileEditable(currentFile)) {
    return <EmptyEditor />;
  }

  const handleEditorChange = (value: string | undefined) => {
    if (currentFile && value !== undefined) {
      // Update UI immediately
      updateFileContent(currentFile, value);
      // Debounced save to filesystem
      debouncedSave(currentFile, value);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#1e1e1e] min-w-0">
      <EditorHeader />
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          defaultLanguage={getFileLanguage(currentFile)}
          value={getFileContent(currentFile, files)}
          theme="browsercode-dark"
          options={{
            ...EDITOR_OPTIONS,
            readOnly: !isFileEditable(currentFile)
          }}
          onChange={handleEditorChange}
          onMount={handleEditorMount}
          path={currentFile}
        />
      </div>
    </div>
  );
}