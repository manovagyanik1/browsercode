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
    }, 1000), // 1 second delay
    []
  );

  useEffect(() => {
    if (monaco) {
      setupMonacoTypescript(monaco, files);

      // Add command/ctrl + click navigation
      monaco.editor.addEditorAction({
        id: 'jumpToDefinition',
        label: 'Jump to Definition',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyB],
        run: (editor) => {
          const position = editor.getPosition();
          if (!position) return;

          const model = editor.getModel();
          if (!model) return;

          monaco.languages.typescript.getTypeScriptWorker().then(async (worker) => {
            const client = await worker(model.uri);
            const definitions = await client.getDefinitionAtPosition(
              model.uri.toString(),
              model.getOffsetAt(position)
            );

            if (definitions && definitions.length > 0) {
              const def = definitions[0];
              const filePath = def.fileName.replace('file:///', '');
              setCurrentFile(filePath);
            }
          });
        }
      });
    }
  }, [monaco, files, setCurrentFile]);

  const handleEditorChange = async (value: string | undefined) => {
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
              quickSuggestions: true,
              suggestOnTriggerCharacters: true,
              semanticHighlighting: true,
            }}
            onChange={handleEditorChange}
            path={currentFile}
          />
        )}
      </div>
    </div>
  );
}