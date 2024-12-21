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
        const monacoPath = `file:///${node.path.replace(/^\//, '')}`;
        fileSystem.set(monacoPath, node.content || '');
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
    jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
    jsxImportSource: 'react',
    allowJs: true,
    typeRoots: ['node_modules/@types'],
    skipLibCheck: true,
    strict: true,
    isolatedModules: true,
    baseUrl: '/',
    paths: {
      '*': ['*', '/*.js', '/*.jsx', '/*.ts', '/*.tsx']
    }
  });

  // Add module declarations for assets
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `declare module '*.svg' {
      const content: string;
      export default content;
    }
    
    declare module '*.css' {
      const content: { [className: string]: string };
      export default content;
    }
    
    declare module '*.png' {
      const content: string;
      export default content;
    }
    
    declare module '*.jpg' {
      const content: string;
      export default content;
    }`,
    'file:///src/types/assets.d.ts'
  );

  // Add React types
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `declare module 'react' {
      export * from 'react/index';
    }`,
    'file:///node_modules/react/index.d.ts'
  );

  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `declare module 'react/index' {
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
          | React.ReactPortal
          | Iterable<ReactNode>;

        export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
          type: T;
          props: P;
          key: Key | null;
        }

        export type JSXElementConstructor<P> =
          | ((props: P) => ReactElement<any, any> | null)
          | (new (props: P) => Component<any, any>);

        export type Key = string | number;

        export interface Component<P = {}, S = {}> {
          render(): ReactNode;
          props: Readonly<P>;
          state: Readonly<S>;
          setState(state: S | ((prevState: S, props: P) => S)): void;
        }

        // Hooks
        export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
        export function useEffect(effect: () => (void | (() => void)), deps?: readonly any[]): void;
        export function useContext<T>(context: Context<T>): T;
        export function useRef<T>(initialValue: T): { current: T };
        export function useMemo<T>(factory: () => T, deps: readonly any[] | undefined): T;
        export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: readonly any[]): T;

        export interface Context<T> {
          Provider: Provider<T>;
          Consumer: Consumer<T>;
          displayName?: string;
        }
        
        export interface Provider<T> {
          value: T;
        }
        
        export interface Consumer<T> {
          (value: T): ReactNode;
        }

        export function createElement(
          type: string | JSXElementConstructor<any>,
          props?: any,
          ...children: ReactNode[]
        ): ReactElement;

        export function Fragment(props: { children?: ReactNode }): ReactElement | null;
      }
    }`,
    'file:///node_modules/react/index.d.ts'
  );

  // Add JSX types
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `declare namespace JSX {
      interface Element extends React.ReactElement<any, any> { }
      interface ElementClass extends React.Component<any> {
        render(): React.ReactNode;
      }
      interface ElementAttributesProperty { props: {}; }
      interface ElementChildrenAttribute { children: {}; }
      
      interface IntrinsicElements {
        div: any;
        span: any;
        a: any;
        p: any;
        button: any;
        input: any;
        img: any;
        h1: any;
        h2: any;
        h3: any;
        form: any;
        nav: any;
        main: any;
        section: any;
        header: any;
        footer: any;
        [elemName: string]: any;
      }
    }`,
    'file:///node_modules/@types/react/jsx-runtime.d.ts'
  );

  // Add each file to Monaco's TypeScript compiler
  fileSystem.forEach((content, path) => {
    const uri = monaco.Uri.parse(path);
    if (!monaco.editor.getModel(uri)) {
      monaco.editor.createModel(
        content,
        undefined,
        uri
      );
    }
  });

  // Enable cmd/ctrl + click navigation
  monaco.editor.addEditorAction({
    id: 'editor.action.goToDeclaration',
    label: 'Go to Declaration',
    keybindings: [
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyB,
      monaco.KeyMod.Alt | monaco.KeyCode.KeyB,
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.leftButton
    ],
    precondition: undefined,
    keybindingContext: undefined,
    contextMenuGroupId: 'navigation',
    contextMenuOrder: 1.5,
    run: (ed) => {
      const position = ed.getPosition();
      if (!position) return;

      const model = ed.getModel();
      if (!model) return;

      monaco.languages.typescript.getTypeScriptWorker().then(async (worker) => {
        const client = await worker(model.uri);
        const definitions = await client.getDefinitionAtPosition(
          model.uri.toString(),
          model.getOffsetAt(position)
        );

        if (definitions && definitions.length > 0) {
          const def = definitions[0];
          const uri = monaco.Uri.parse(def.fileName);
          const range = {
            startLineNumber: def.range.startLineNumber,
            startColumn: def.range.startColumn,
            endLineNumber: def.range.endLineNumber,
            endColumn: def.range.endColumn
          };

          monaco.editor.getModel(uri)?.setValue(fileSystem.get(def.fileName) || '');
          ed.setPosition({ lineNumber: range.startLineNumber, column: range.startColumn });
          ed.revealLineInCenter(range.startLineNumber);
        }
      });
    }
  });
}