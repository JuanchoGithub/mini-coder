import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';

const retroTheme = EditorView.theme({
    "&": {
        color: "#1e293b", // slate-800
        backgroundColor: "#f0f0f0",
        height: '100%',
        fontSize: '16px',
        fontFamily: 'monospace',
    },
    ".cm-content": {
        caretColor: "#0f172a" // slate-900
    },
    "&.cm-focused .cm-cursor": {
        borderLeftColor: "#0f172a"
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
        backgroundColor: "#e0e7ff" // indigo-200
    },
    ".cm-gutters": {
        backgroundColor: "#e8e8e8",
        color: "#94a3b8", // slate-400
        borderRight: "1px solid #d1d5db" // slate-300
    },
    ".cm-activeLineGutter": {
      backgroundColor: "#dbeafe", // blue-200
      color: '#1e3a8a' // blue-800
    },
    ".cm-line": {
      lineHeight: '1.5',
      padding: '0 8px'
    }
}, { dark: false });

const retroHighlightStyle = HighlightStyle.define([
    { tag: tags.keyword, color: "#4338ca", fontWeight: "bold" }, // indigo-700
    { tag: tags.comment, color: "#16a34a", fontStyle: "italic" }, // green-600
    { tag: tags.string, color: "#0891b2" }, // cyan-600
    { tag: tags.number, color: "#059669" }, // emerald-600
    { tag: tags.variableName, color: "#475569" }, // slate-600
    { tag: tags.operator, color: "#64748b" }, // slate-500
    { tag: tags.punctuation, color: "#64748b" }, // slate-500
    { tag: tags.meta, color: "#475569" }, // For REM command
]);

export const retroEditorTheme = [
    retroTheme,
    syntaxHighlighting(retroHighlightStyle)
];
