import Editor from "@monaco-editor/react";
import { useFileSystem } from "../../context/FileSystemContext";
import { EmptyEditor } from "./EmptyEditor";
import { EditorHeader } from "./EditorHeader";
import { isFileEditable, getFileLanguage } from "../../utils/fileUtils";
import { getFileContent } from "../../utils/fileSystemUtils";
import { EDITOR_OPTIONS } from "../../constants/editorDefaults";
import { darkTheme } from "../../constants/editorTheme";
import { useEffect, useCallback, useRef } from "react";
import type { Monaco } from "@monaco-editor/react";
import type * as monaco from "monaco-editor";
import debounce from "lodash/debounce";
import { FileNode } from "src/types/fileSystem";

export function EditorPane() {
  const {
    currentFile,
    files,
    updateFileContent,
    setCurrentFile: updateCurrentFile,
  } = useFileSystem();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);

  const debouncedSave = useCallback(
    debounce(async (path: string, content: string) => {
      try {
        console.log(`Saving file ${path}:`, content);
      } catch (error) {
        console.error("Failed to save file:", error);
      }
    }, 1000),
    []
  );

  const resolveFile = (path: string): string | null => {
    if (!currentFile) return null;
    const currentDir = currentFile.split("/").slice(0, -1).join("/");

    if (path.startsWith("./")) {
      path = `${currentDir}/${path.slice(2)}`;
    } else if (path.startsWith("../")) {
      path = `${currentDir.split("/").slice(0, -1).join("/")}/${path.slice(3)}`;
    } else if (!path.startsWith("/")) {
      path = `${currentDir}/${path}`;
    }

    if (findFile(path, files)) return path;

    const extensions = [".ts", ".tsx", ".js", ".jsx"];
    for (const ext of extensions) {
      if (findFile(`${path}${ext}`, files)) return `${path}${ext}`;
    }

    for (const ext of extensions) {
      if (findFile(`${path}/index${ext}`, files)) return `${path}/index${ext}`;
    }

    return null;
  };

  const findFile = (path: string, nodes: FileNode[]): FileNode | null => {
    const parts = path.split("/").filter(Boolean);
    let current: FileNode | null = null;
    let currentNodes = nodes;

    for (const part of parts) {
      current = currentNodes.find((node) => node.name === part) || null;
      if (!current) return null;
      currentNodes = current.children || [];
    }

    return current && current.type === "file" ? current : null;
  };

  const handleEditorMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monacoInstance: Monaco
  ) => {
    editorRef.current = editor;
    monacoRef.current = monacoInstance;

    monacoInstance.editor.defineTheme("browsercode-dark", darkTheme);
    monacoInstance.editor.setTheme("browsercode-dark");

    monacoInstance.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
      {
        noSemanticValidation: true,
        noSyntaxValidation: false,
      }
    );
    editor.addCommand(
      monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.KeyB,
      () => {
        handleDefinitionRequest();
      }
    );

    editor.onMouseDown((e) => {
      if (e.event.ctrlKey) {
        e.event.preventDefault();
        const position = e.target.position;
        if (position) {
          handleDefinitionRequest(position);
        }
      }
    });
  };

  const handleDefinitionRequest = (position?: monaco.Position) => {
    if (!editorRef.current || !monacoRef.current) return;

    const editor = editorRef.current;
    const monacoInstance = monacoRef.current;

    const pos = position || editor.getPosition();
    if (!pos) return;

    const model = editor.getModel();
    if (!model) return;

    const lineContent = model.getLineContent(pos.lineNumber);

    const importRegex = /import.*from\s+['"](.+?)['"]/g;
    let match;
    while ((match = importRegex.exec(lineContent)) !== null) {
      const importPath = match[1];
      const startIndex = match.index + match[0].indexOf(importPath);
      const endIndex = startIndex + importPath.length;

      const startColumn = startIndex + 1;
      const endColumn = endIndex + 1;

      if (pos.column >= startColumn && pos.column <= endColumn) {
        const resolvedPath = resolveFile(importPath);
        if (resolvedPath) {
          updateCurrentFile(resolvedPath);
          return;
        }
      }
    }

    const word = model.getWordAtPosition(pos);
    if (word) {
      const possiblePaths = [
        `${word.word}.tsx`,
        `${word.word}.ts`,
        `${word.word}/index.tsx`,
        `${word.word}/index.ts`,
      ];

      for (const path of possiblePaths) {
        const resolvedPath = resolveFile(path);
        if (resolvedPath) {
          updateCurrentFile(resolvedPath);
          return;
        }
      }
    }
  };

  if (!currentFile || !isFileEditable(currentFile)) {
    return <EmptyEditor />;
  }

  const handleEditorChange = (value: string | undefined) => {
    if (currentFile && value !== undefined) {
      updateFileContent(currentFile, value);
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
            readOnly: !isFileEditable(currentFile),
            mouseStyle: "text",
          }}
          onChange={handleEditorChange}
          onMount={handleEditorMount}
          path={currentFile}
        />
      </div>
    </div>
  );
}
