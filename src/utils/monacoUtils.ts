import type { Monaco } from '@monaco-editor/react';
import type { FileNode } from '../types/fileSystem';

export function setupMonacoTypescript(monaco: Monaco, files: FileNode[]) {
  // Create a virtual file system for TypeScript
  const fileSystem = new Map<string, string>();
  
  // Add all TypeScript/JavaScript files to the virtual file system
  function addFilesToSystem(nodes: FileNode[]) {
    nodes.forEach(node => {
      if (node.type === 'file' && 
          (node.path.endsWith('.ts') || 
           node.path.endsWith('.tsx') || 
           node.path.endsWith('.js') || 
           node.path.endsWith('.jsx'))) {
        fileSystem.set(node.path, node.content || '');
      }
      if (node.children) {
        addFilesToSystem(node.children);
      }
    });
  }
  
  addFilesToSystem(files);

  // Configure TypeScript compiler options
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ESNext,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.React,
    reactNamespace: 'React',
    allowJs: true,
    typeRoots: ['node_modules/@types'],
  });

  // Add type definitions for React
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `
    declare module 'react' {
      export = React;
      export as namespace React;
      
      declare namespace React {
        export type ReactNode = 
          | string
          | number
          | boolean
          | null
          | undefined
          | React.ReactElement
          | React.ReactFragment
          | React.ReactPortal;
          
        export interface ReactElement<P = any> {
          type: string | React.ComponentType<P>;
          props: P;
          key: string | number | null;
        }
        
        export function createElement(
          type: string | React.ComponentType,
          props?: any,
          ...children: React.ReactNode[]
        ): React.ReactElement;
      }
    }
    `,
    'typescript/react.d.ts'
  );

  // Add each file to Monaco's TypeScript compiler
  fileSystem.forEach((content, path) => {
    const uri = monaco.Uri.parse(path);
    if (!monaco.editor.getModel(uri)) {
      monaco.editor.createModel(
        content,
        path.endsWith('tsx') || path.endsWith('jsx') ? 'typescript' : 'javascript',
        uri
      );
    }
  });
}