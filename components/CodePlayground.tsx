
import React, { useState, useEffect, useRef } from 'react';
import CodeEditor from './CodeEditor';
import SidebarHelp from './SidebarHelp';
import { executeCode } from '../services/interpreter';
import { Play, Terminal, RotateCcw, CornerDownLeft, ZoomIn, ZoomOut, BookOpen } from 'lucide-react';
import { ExecutionResult, OutputLine } from '../types';

interface CodePlaygroundProps {
  initialCode: string;
  onRunComplete?: (result: ExecutionResult, code: string) => void;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({ initialCode, onRunComplete }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentWord, setCurrentWord] = useState('');
  const [fontSize, setFontSize] = useState(14); // Default font size
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isHelpVisible, setIsHelpVisible] = useState(false);
  
  // Reset code when initialCode changes (new lesson step)
  useEffect(() => {
      setCode(initialCode);
      setOutput([]);
      setError(null);
      setIsWaitingForInput(false);
  }, [initialCode]);

  const toggleHelp = () => {
    setIsHelpVisible(prev => !prev);
  };

  const handleRun = (inputVal?: string) => {
    setError(null);
    if (!inputVal) setOutput([]); // Clear output on fresh run

    const result: ExecutionResult = executeCode(code, inputVal);

    if (result.error) {
      setError(result.error);
      setIsWaitingForInput(false);
      // Notify parent even on error, so we can have exercises that require causing errors
      if (onRunComplete) onRunComplete(result, code);
    } else {
      // Keep previous output if we were just waiting for input, otherwise set new
      setOutput(result.output);
      setIsWaitingForInput(!!result.isWaitingForInput);
      
      if (onRunComplete && !result.isWaitingForInput) {
          onRunComplete(result, code);
      }
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleRun(inputValue);
      setInputValue('');
  };

  const handleIncreaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 1, 24)); // Max 24px
  };

  const handleDecreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 1, 10)); // Min 10px
  };

  return (
    <div className="flex h-full border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
      {/* Main Area (Editor + Console + Mobile Help) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
                 <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="ml-3 text-sm font-medium text-slate-600 hidden sm:inline">Editor MiniCode</span>
                <div className="flex items-center gap-1 ml-2 border-l border-slate-300 pl-3">
                    <button onClick={handleDecreaseFontSize} className="p-1 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-md transition-colors" title="Reducir tamaño de letra">
                        <ZoomOut size={16} />
                    </button>
                    <button onClick={handleIncreaseFontSize} className="p-1 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-md transition-colors" title="Aumentar tamaño de letra">
                        <ZoomIn size={16} />
                    </button>
                </div>
            </div>
          <div className="flex gap-2">
             <button onClick={() => { setCode(initialCode); setOutput([]); setError(null); setIsWaitingForInput(false); }} className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors" title="Reiniciar Código">
                 <RotateCcw size={18} />
             </button>
             <button 
                onClick={toggleHelp}
                className={`p-2 rounded-lg transition-colors ${isHelpVisible ? 'bg-indigo-100 text-primary' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'}`}
                title="Ayuda Rápida"
                aria-pressed={isHelpVisible}
             >
                <BookOpen size={18} />
             </button>
            <button
                onClick={() => handleRun()}
                disabled={isWaitingForInput}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-bold text-sm transition-all ${isWaitingForInput ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'}`}
            >
                <Play size={16} fill="currentColor" /> Ejecutar
            </button>
          </div>
        </div>

        {/* Editor & Output Split */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0">
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 relative min-h-[200px]">
                <CodeEditor
                    code={code}
                    onChange={setCode}
                    onCursorWordChange={setCurrentWord}
                    readOnly={isWaitingForInput}
                    fontSize={fontSize}
                />
              </div>
    
              {isHelpVisible && (
                <div className="lg:hidden h-72 border-t border-slate-200">
                  <SidebarHelp currentWord={currentWord} />
                </div>
              )}
            </div>


          {/* Output Terminal */}
          <div className="h-64 md:h-auto md:w-2/5 bg-slate-900 text-slate-100 p-4 font-mono text-sm overflow-y-auto flex flex-col">
            <div className="flex items-center gap-2 mb-2 opacity-50 text-xs uppercase tracking-wider font-bold">
                <Terminal size={14} /> Consola
            </div>
            <div className="flex-1 space-y-1">
                {output.map((line, i) => (
                <div key={i} className="break-words animate-fadeIn">{'> ' + line.value}</div>
                ))}
                {error && (
                    <div className="text-red-400 font-bold mt-2 animate-pulse">Error: {error}</div>
                )}
                {isWaitingForInput && (
                     <form onSubmit={handleInputSubmit} className="mt-2 flex items-center gap-2 text-green-400 animate-fadeIn">
                        <span className="animate-pulse">?</span>
                        <input 
                            type="text" 
                            autoFocus
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="bg-transparent border-none outline-none text-green-400 w-full font-bold"
                            placeholder="Escribe aquí..."
                        />
                        <button type="submit" className="text-slate-500"><CornerDownLeft size={16}/></button>
                    </form>
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      {isHelpVisible && (
        <div className="w-64 hidden lg:block flex-shrink-0 border-l border-slate-200">
          <SidebarHelp currentWord={currentWord} />
        </div>
      )}
    </div>
  );
};

export default CodePlayground;
