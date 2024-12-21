import type { editor } from 'monaco-editor';

export const darkTheme: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: false,
  rules: [
    { token: '', foreground: 'cccccc', background: '1e1e1e' },
    { token: 'comment', foreground: '6a737d', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'cccccc' },
    { token: 'string', foreground: 'a8a8a8' },
    { token: 'number', foreground: 'b5cea8' },
    { token: 'type', foreground: 'cccccc' },
    { token: 'variable', foreground: 'cccccc' },
    { token: 'function', foreground: 'cccccc' }
  ],
  colors: {
    'editor.background': '#1e1e1e',
    'editor.foreground': '#cccccc',
    'editor.lineHighlightBackground': '#2a2d2e',
    'editor.selectionBackground': '#404040',
    'editor.inactiveSelectionBackground': '#3a3d41',
    'editorCursor.foreground': '#cccccc',
    'editorWhitespace.foreground': '#3a3a3a',
    'editorLineNumber.foreground': '#858585',
    'editorLineNumber.activeForeground': '#cccccc',
    'editor.selectionHighlightBackground': '#333333',
    'editor.wordHighlightBackground': '#333333',
    'editor.wordHighlightStrongBackground': '#333333',
    'editorBracketMatch.background': '#333333',
    'editorBracketMatch.border': '#454545',
    'editorIndentGuide.background': '#404040',
    'editorIndentGuide.activeBackground': '#707070',
    'editorOverviewRuler.border': '#404040',
    'editorOverviewRuler.findMatchForeground': '#404040',
    'editorOverviewRuler.modifiedForeground': '#404040',
    'editorOverviewRuler.addedForeground': '#404040',
    'editorOverviewRuler.deletedForeground': '#404040',
    'editorOverviewRuler.errorForeground': '#ff0000',
    'editorOverviewRuler.warningForeground': '#cca700',
    'editorOverviewRuler.infoForeground': '#404040',
    'scrollbarSlider.background': '#404040',
    'scrollbarSlider.hoverBackground': '#505050',
    'scrollbarSlider.activeBackground': '#606060',
    'editorLink.activeForeground': '#cccccc',
    'editorLightBulb.foreground': '#cccccc',
    'editorLightBulbAutoFix.foreground': '#cccccc'
  }
};