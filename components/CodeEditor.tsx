import React, { useRef } from 'react';
import { KEYWORDS } from '../services/interpreter';

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  onCursorWordChange: (word: string) => void;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, onCursorWordChange, readOnly = false }) => {
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

  const highlightCode = (input: string) => {
    return input.split('\n').map((line, i) => {
        // Simple tokenizer for QB-ish syntax
        // 1. Detect comments first (REM or ')
        let comment = '';
        let codePart = line;
        const remIndex = line.toUpperCase().indexOf('REM ');
        const tickIndex = line.indexOf('\'');
        let splitIndex = -1;

        if (remIndex > -1 && (tickIndex === -1 || remIndex < tickIndex)) splitIndex = remIndex;
        else if (tickIndex > -1) splitIndex = tickIndex;

        if (splitIndex > -1) {
            codePart = line.substring(0, splitIndex);
            comment = line.substring(splitIndex);
        }

        // 2. Tokenize code part
        const tokens = codePart.split(/(".*?"|[\s+=\(\),<>]+)/g);

        return (
            <div key={i} className="min-h-[1.5rem]">
                {tokens.map((token, j) => {
                    let className = "text-slate-800";
                    const upperToken = token.trim().toUpperCase();
                    if (KEYWORDS.includes(upperToken)) {
                        className = "text-blue-700 font-bold"; // Classic QB blue-ish keywords
                    } else if (token.startsWith('"')) {
                        className = "text-cyan-600"; // QB strings
                    } else if (!isNaN(Number(token.trim())) && token.trim() !== '') {
                        className = "text-emerald-600"; // Numbers
                    }
                    return <span key={j} className={className}>{token}</span>;
                })}
                {comment && <span className="text-green-600 italic">{comment}</span>} 
             </div>
        );
    });
  };

  return (
    <div className="relative w-full h-full font-mono text-base overflow-hidden bg-[#f0f0f0] rounded-xl border border-slate-300 focus-within:border-primary transition-colors">
       {/* Lighter gray background for that retro feel */}
      <pre
        ref={preRef}
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-full p-4 m-0 overflow-hidden z-0 pointer-events-none leading-6 whitespace-pre-wrap break-words font-mono"
      >
        {highlightCode(code)}
      </pre>

      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => onChange(e.target.value)}
        onScroll={handleScroll}
        onClick={handleCursorActivity}
        onKeyUp={handleCursorActivity}
        readOnly={readOnly}
        spellCheck="false"
        className="absolute top-0 left-0 w-full h-full p-4 m-0 bg-transparent z-10 resize-none outline-none text-transparent caret-slate-900 leading-6 whitespace-pre-wrap break-words font-mono"
        style={{ color: 'transparent' }}
      />
    </div>
  );
};

export default CodeEditor;
