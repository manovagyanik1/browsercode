import type { editor } from 'monaco-editor';

export interface EditorRef {
  editor: editor.IStandaloneCodeEditor | null;
}

export interface EditorProps {
  initialValue?: string;
  language?: string;
  onChange?: (value: string) => void;
}