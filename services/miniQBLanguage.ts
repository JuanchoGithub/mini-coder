import { StreamLanguage } from '@codemirror/language';
import { legacySimpleMode } from "@codemirror/lang-legacy-simple-mode";
import { KEYWORDS } from './interpreter';

const miniQBMode = legacySimpleMode({
  start: [
    // Comments
    { regex: /'.*$/, token: "comment" },
    { regex: /\bREM\b.*/i, token: "comment" },

    // Strings
    { regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string" },

    // Keywords
    { regex: new RegExp(`\\b(?:${KEYWORDS.join('|')})\\b`, 'i'), token: "keyword" },

    // Numbers
    { regex: /\b\d+(\.\d+)?\b/, token: "number" },

    // Variables (with optional type suffix)
    { regex: /[a-zA-Z_][\w]*[$%#&!]?/, token: "variableName" },

    // Operators
    { regex: /[-+*\/=<>]+/, token: "operator" },

    // Punctuation
    { regex: /[,()]/, token: "punctuation" }
  ],
  meta: {
    commentTokens: { line: "'" }
  }
});

export const miniQBLanguage = StreamLanguage.define(miniQBMode);
