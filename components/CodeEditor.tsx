
import React, { useRef } from 'react';
import { KEYWORDS } from '../services/interpreter';

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  onCursorWordChange: (word: string) => void;
  readOnly?: boolean;
  fontSize: number;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, onCursorWordChange, readOnly = false, fontSize }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  const handleScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const getWordAtCursor = (text: string, cursorIndex: number): string => {
    let start = cursorIndex;
    while (start > 0 && /[\w$%\!#]/.test(text[start - 1])) {
      start--;
    }
    let end = cursorIndex;
    while (end < text.length && /[\w$%\!#]/.test(text[end])) {
      end++;
    }
    return text.substring(start, end);
  };

  const handleCursorActivity = () => {
    if (textareaRef.current) {
      const cursorIndex = textareaRef.current.selectionStart;
      const word = getWordAtCursor(code, cursorIndex);
      onCursorWordChange(word.toUpperCase());
    }
  };

  const highlightCodeAsHtml = (input: string): string => {
    const escapeHtml = (text: string) => {
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    };

    const lines = input.split('\n');
    const htmlLines = lines.map(line => {
        let comment = '';
        let codePart = line;
        
        // Simple tokenizer for QB-ish syntax
        const remIndex = line.toUpperCase().indexOf('REM ');
        const tickIndex = line.indexOf('\'');
        let splitIndex = -1;

        if (remIndex > -1 && (tickIndex === -1 || remIndex < tickIndex)) splitIndex = remIndex;
        else if (tickIndex > -1) splitIndex = tickIndex;
        
        if (splitIndex > -1) {
            codePart = line.substring(0, splitIndex);
            comment = line.substring(splitIndex);
        }

        const tokens = codePart.split(/(".*?"|[\s+=\(\),<>]+)/g).filter(Boolean); // Filter out empty strings
        
        const codeHtml = tokens.map(token => {
            let className = "text-slate-800";
            const upperToken = token.trim().toUpperCase();
            if (KEYWORDS.includes(upperToken)) {
                className = "text-blue-700 font-bold";
            } else if (token.startsWith('"')) {
                className = "text-cyan-600";
            } else if (!isNaN(Number(token.trim())) && token.trim() !== '') {
                className = "text-emerald-600";
            }
            return `<span class="${className}">${escapeHtml(token)}</span>`;
        }).join('');

        const commentHtml = comment ? `<span class="text-green-600 italic">${escapeHtml(comment)}</span>` : '';
        
        return codeHtml + commentHtml;
    });

    // Append a newline to match the textarea's scroll height behavior, preventing misalignment.
    return htmlLines.join('\n') + '\n';
  };

  return (
    <div
        className={`relative w-full h-full font-mono overflow-hidden bg-[#f0f0f0] rounded-xl border border-slate-300 focus-within:border-primary transition-colors ${readOnly ? 'cursor-not-allowed' : ''}`}
        style={{ fontSize: `${fontSize}px` }}
    >
       {/* Lighter gray background for that retro feel */}
      <pre
        ref={preRef}
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-full p-4 m-0 overflow-auto z-0 pointer-events-none leading-6 whitespace-pre font-mono"
        dangerouslySetInnerHTML={{ __html: highlightCodeAsHtml(code) }}
      />

      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => onChange(e.target.value)}
        onScroll={handleScroll}
        onClick={handleCursorActivity}
        onKeyUp={handleCursorActivity}
        readOnly={readOnly}
        spellCheck="false"
        className={`absolute top-0 left-0 w-full h-full p-4 m-0 bg-transparent z-10 resize-none outline-none text-transparent caret-slate-900 leading-6 whitespace-pre font-mono ${readOnly ? 'cursor-not-allowed' : ''}`}
        style={{ color: 'transparent' }}
      />
    </div>
  );
};

export default CodeEditor;