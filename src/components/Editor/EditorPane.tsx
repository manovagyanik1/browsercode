import Editor from '@monaco-editor/react';
import { useFileSystem } from '../../context/FileSystemContext';
import { EmptyEditor } from './EmptyEditor';
import { EditorHeader } from './EditorHeader';
import { isFileEditable, getFileLanguage } from '../../utils/fileUtils';
import { getFileContent } from '../../utils/fileSystemUtils';
import { EDITOR_OPTIONS } from '../../constants/editorDefaults';
import { darkTheme } from '../../constants/editorTheme';
import { useEffect } from 'react';
import type { Monaco } from '@monaco-editor/react';

export function EditorPane() {
  const { currentFile, files, updateFileContent } = useFileSystem();
  
  const handleEditorMount = (editor: any, monaco: Monaco) => {
    monaco.editor.defineTheme('browsercode-dark', darkTheme);
    monaco.editor.setTheme('browsercode-dark');
  };

  // Don't show editor for directories or non-editable files
  if (!currentFile || !isFileEditable(currentFile)) {
    return <EmptyEditor />;
  }

  const handleEditorChange = (value: string | undefined) => {
    if (currentFile && value !== undefined) {
      updateFileContent(currentFile, value);
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