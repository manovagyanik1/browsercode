import { useRef } from 'react';
import Editor from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { DEFAULT_CODE, EDITOR_OPTIONS } from '../constants/editorDefaults';
import type { EditorProps } from '../types/editor';

export function CodeEditor({ 
  initialValue = DEFAULT_CODE,
  language = 'javascript',
  onChange 
}: EditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
  }

  function handleEditorChange(value: string | undefined) {
    onChange?.(value ?? '');
  }

  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      defaultValue={initialValue}
      theme="vs-dark"
      options={EDITOR_OPTIONS}
      onMount={handleEditorDidMount}
      onChange={handleEditorChange}
    />
  );
}