
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { lessons } from '../data/lessons';
import { logicScenarios } from '../data/logicScenarios';
import { scenarios2D } from '../data/logic2DScenarios';
import ReactMarkdown from 'react-markdown';
import CodePlayground from '../components/CodePlayground';
import LogicSimulator from '../components/LogicSimulator';
import RobotSimulator2D from '../components/RobotSimulator2D';
import { ChevronLeft, ChevronRight, CheckCircle, Home, ClipboardCopy, Check, ShieldAlert, Trash2, Lightbulb, X } from 'lucide-react';
import { ExecutionResult } from '../types';

// --- Cookie Helper Functions ---
const setCookie = (name: string, value: string, days: number) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

const getCookie = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

const eraseCookie = (name: string) => {
    document.cookie = name+'=; Max-Age=-99999999; path=/';
}
// --- End Cookie Helpers ---


const LessonWizard = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lessonId = Number(id);
  const lesson = lessons.find(l => l.id === lessonId);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [codeProgress, setCodeProgress] = useState<Record<number, string>>({});
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [exerciseHint, setExerciseHint] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isSolutionVisible, setIsSolutionVisible] = useState(false);
  const [solutionCode, setSolutionCode] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Load progress from cookie on mount/lesson change
  useEffect(() => {
    const savedProgressCookie = getCookie(`lessonProgress_${lessonId}`);
    if (savedProgressCookie) {
        try {
            const savedProgress = JSON.parse(savedProgressCookie);
            if (savedProgress.currentStepIndex !== undefined) {
                setCurrentStepIndex(savedProgress.currentStepIndex);
            }
            if (savedProgress.codeProgress) {
                setCodeProgress(savedProgress.codeProgress);
            }
        } catch (e) {
            console.error("Failed to parse lesson progress cookie", e);
            eraseCookie(`lessonProgress_${lessonId}`);
        }
    } else {
        // No saved progress, ensure state is fresh for this lesson
        setCurrentStepIndex(0);
        setCodeProgress({});
    }
  }, [lessonId]);

  // Save progress to cookie whenever it changes
  useEffect(() => {
    // Avoid saving initial blank state on first render
    if (currentStepIndex === 0 && Object.keys(codeProgress).length === 0) {
      const savedProgressCookie = getCookie(`lessonProgress_${lessonId}`);
      if (!savedProgressCookie) return;
    }
    const progress = {
        currentStepIndex,
        codeProgress,
    };
    setCookie(`lessonProgress_${lessonId}`, JSON.stringify(progress), 365);
  }, [currentStepIndex, codeProgress, lessonId]);


  // Admin mode activation via key sequence
  useEffect(() => {
    let sequence = '';
    const targetSequence = '3127';
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        
        sequence += e.key;
        if (sequence.length > targetSequence.length) {
            sequence = sequence.substring(sequence.length - targetSequence.length);
        }
        if (sequence === targetSequence) {
            setIsAdminMode(prev => {
                const newMode = !prev;
                console.log(`Modo Admin ${newMode ? 'activado' : 'desactivado'}.`);
                return newMode;
            });
        }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Run only on mount

  if (!lesson) return <div className="p-8 text-center text-2xl font-bold text-slate-400">Lección no encontrada 😔</div>;

  const currentStep = lesson.steps[currentStepIndex];
  const isLastStep = currentStepIndex === lesson.steps.length - 1;
  const hasBigComponent = ['code', 'logic-simulation', 'logic-simulation-2d'].includes(currentStep.type);


  const handleNext = () => {
    if (isLastStep) {
      navigate('/');
    } else {
      setCurrentStepIndex(prev => prev + 1);
      setExerciseCompleted(false);
      setExerciseHint(null);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      setExerciseCompleted(false); 
      setExerciseHint(null);
    }
  };

  const handleResetProgress = () => {
    if (window.confirm("¿Estás seguro de que quieres borrar todo tu progreso en esta lección? Esta acción no se puede deshacer.")) {
        eraseCookie(`lessonProgress_${lessonId}`);
        window.location.reload();
    }
  };

  const checkExercise = (result: ExecutionResult, code: string) => {
    if (!currentStep.exercise) return;

    // These exercises are completed manually by the user
    if (currentStep.exercise.expectedOutput === "DONE") return;

    setExerciseHint(null); // Reset hint on every run

    // Case 1: The exercise expects a specific error
    if (currentStep.exercise.expectedOutput === '$$ERROR$$') {
        if (result.error) {
            setExerciseCompleted(true);
        } else {
            setExerciseHint("El objetivo era causar un error de sintaxis, pero tu código funcionó. ¡Intenta romperlo a propósito!");
        }
        return;
    }

    // Case 2: The code produced an unexpected error
    if (result.error) {
        setExerciseCompleted(false); // Ensure it's not marked as complete
        // The error is already displayed in the console, no extra hint needed here.
        return;
    }

    // Case 3: Check for correct output
    let isSuccess = false;
    if (currentStep.exercise.expectedOutput) {
        const actualOutput = result.output
            .filter(line => line.type === 'print')
            .map(line => line.value)
            .join('\n')
            .trim();
        const expectedOutput = currentStep.exercise.expectedOutput.trim();
        isSuccess = actualOutput === expectedOutput;
    } else {
        // If no output is specified, any output is considered a success
        isSuccess = result.output.filter(line => line.type === 'print').length > 0;
    }

    if (isSuccess) {
        setExerciseCompleted(true);
        return;
    }

    // Case 4: Output is incorrect, provide hints
    // First, try to find a specific pre-written hint based on common mistakes
    if (currentStep.exercise.errorHints) {
        for (const errorHint of currentStep.exercise.errorHints) {
            if (code.includes(errorHint.codeIncludes)) {
                setExerciseHint(errorHint.hint);
                return; // Found a specific hint, we're done.
            }
        }
    }
    
    // As a last resort, if no specific hint was found, show the user the expected output.
    if (currentStep.exercise.expectedOutput) {
        setExerciseHint(`La salida no es correcta. La consola debería mostrar exactamente esto:\n\n${currentStep.exercise.expectedOutput}`);
    }
};

  // Custom component for rendering <pre> blocks in Markdown with a copy button
  const CustomPre = (props: React.ComponentProps<'pre'>) => {
    const { children } = props;
    const [isCopied, setIsCopied] = useState(false);

    const getCodeString = (node: React.ReactNode): string => {
        if (typeof node === 'string') return node;
        if (Array.isArray(node)) return node.map(getCodeString).join('');
        if (React.isValidElement(node) && (node.props as { children?: React.ReactNode }).children) {
            return getCodeString((node.props as { children: React.ReactNode }).children);
        }
        return '';
    };

    const codeString = getCodeString(children).trim();

    const handleCopy = () => {
        if (codeString) {
            navigator.clipboard.writeText(codeString).then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            }).catch(err => {
                console.error("Failed to copy text: ", err);
            });
        }
    };
    
    return (
        <div className="relative group bg-slate-800 text-slate-100 p-6 my-4 rounded-xl shadow-inner">
            <pre {...props} className="!bg-transparent !p-0 !m-0 !shadow-none !whitespace-pre-wrap !text-sm" /> 
            <button
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 bg-slate-700 text-slate-300 rounded-md opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200 hover:bg-slate-600"
                aria-label="Copiar código"
            >
                {isCopied ? <Check size={16} className="text-green-400" /> : <ClipboardCopy size={16} />}
            </button>
        </div>
    );
  };

  const isExerciseStep = (currentStep.type === 'code' || currentStep.type.includes('simulation') || (currentStep.type === 'exercise' && currentStep.exercise?.expectedOutput === 'DONE'));
  const isStepLocked = isExerciseStep && !exerciseCompleted;


  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
            <Link to="/" className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
                <Home size={20} />
            </Link>
            <div>
                <h1 className="text-xl font-bold text-slate-800">{lesson.title}</h1>
                <div className="flex gap-1 mt-1">
                    {lesson.steps.map((_, idx) => (
                        <div key={idx} className={`h-1.5 w-6 rounded-full transition-colors ${idx <= currentStepIndex ? 'bg-primary' : 'bg-slate-200'}`} />
                    ))}
                </div>
            </div>
        </div>
        <div className="flex items-center gap-4">
             <button onClick={handleResetProgress} className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors" title="Borrar progreso de esta lección">
                <Trash2 size={14} />
                <span className="hidden md:inline">Resetear</span>
            </button>
            <div className="text-sm font-medium text-slate-500 hidden sm:block">
                Paso {currentStepIndex + 1} de {lesson.steps.length}
            </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-2 py-6 md:p-8 flex flex-col gap-6 md:gap-8">
        <div className={`bg-white rounded-3xl shadow-sm border border-slate-100 p-4 md:p-10 animate-fadeIn flex flex-col ${!hasBigComponent ? 'flex-1' : ''}`}>
            <div className="mb-6">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${currentStep.type === 'theory' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                    {currentStep.type === 'theory' ? 'Teoría' : currentStep.type.includes('simulation') ? 'Simulador' : 'Práctica'}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">{currentStep.title}</h2>
                
                <div className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 prose-strong:text-primary prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1 prose-code:rounded mb-8">
                    <ReactMarkdown components={{ pre: CustomPre }}>{currentStep.content}</ReactMarkdown>
                </div>
            </div>
            
            {currentStep.type === 'code' && currentStep.exercise && (
                 <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg text-amber-800 font-medium flex justify-between items-center">
                    <span>💡 Tu misión: {currentStep.exercise.prompt}</span>
                    {currentStep.exercise.solution && (
                        <button 
                            onClick={() => {
                                setSolutionCode(currentStep.exercise.solution ?? '');
                                setIsSolutionVisible(true);
                                setIsCopied(false);
                            }}
                            className="flex items-center gap-2 px-3 py-1.5 bg-amber-200 text-amber-900 font-bold text-xs rounded-lg hover:bg-amber-300 transition-colors flex-shrink-0 ml-4"
                        >
                            <Lightbulb size={14} /> Ver Solución
                        </button>
                    )}
                </div>
            )}

            {currentStep.type === 'exercise' && currentStep.exercise?.expectedOutput === 'DONE' && (
                 <div className="mt-8 bg-indigo-50 p-6 rounded-2xl border border-indigo-100 flex flex-col items-center text-center">
                    <p className="text-indigo-900 text-lg font-medium mb-4">{currentStep.exercise.prompt}</p>
                    <button 
                        onClick={() => setExerciseCompleted(true)} 
                        className={`px-6 py-3 rounded-xl font-bold text-white shadow-md transition-all transform active:scale-95 ${exerciseCompleted ? 'bg-green-500 hover:bg-green-600' : 'bg-primary hover:bg-indigo-700'}`}
                    >
                        {exerciseCompleted ? <span className="flex items-center gap-2"><CheckCircle/> ¡Listo!</span> : 'Ya lo pensé'}
                    </button>
                 </div>
            )}
        </div>
        
        {/* --- INTERACTIVE COMPONENTS RENDERED EXTERNALLY --- */}
        
        {currentStep.type === 'logic-simulation' && currentStep.scenarioId && (
            <div className="flex-1">
                {(() => {
                    const scenario = logicScenarios.find(s => s.id === currentStep.scenarioId);
                    return scenario ? (
                        <LogicSimulator 
                            scenario={scenario} 
                            onComplete={() => setExerciseCompleted(true)}
                        />
                    ) : (
                        <div className="text-red-500">Escenario de texto no encontrado</div>
                    );
                })()}
            </div>
        )}

        {currentStep.type === 'logic-simulation-2d' && currentStep.scenarioId && (
            <div className="flex-1">
                {(() => {
                    const scenario = scenarios2D.find(s => s.id === currentStep.scenarioId);
                    return scenario ? (
                        <RobotSimulator2D 
                            scenario={scenario} 
                            onComplete={() => setExerciseCompleted(true)}
                        />
                    ) : (
                        <div className="text-red-500">Escenario 2D no encontrado</div>
                    );
                })()}
            </div>
        )}

        {currentStep.type === 'code' && currentStep.exercise && (
            <div className="flex-1 flex flex-col min-h-0">
                {exerciseHint && (
                  <div className="mb-4 bg-blue-50 border-l-4 border-blue-400 p-4 text-blue-800 font-medium animate-fadeIn whitespace-pre-wrap">
                    🤔 Pista: {exerciseHint}
                  </div>
                )}
                <div className="flex-1 min-h-0">
                  <CodePlayground 
                      key={currentStepIndex}
                      initialCode={currentStep.exercise.initialCode || ''} 
                      onRunComplete={(result, code) => checkExercise(result, code)}
                      code={codeProgress[currentStepIndex] ?? currentStep.exercise.initialCode ?? ''}
                      onCodeChange={(newCode) => {
                          setCodeProgress(prev => ({
                              ...prev,
                              [currentStepIndex]: newCode
                          }));
                      }}
                  />
                </div>
            </div>
        )}

      </main>

      <footer className="bg-white border-t border-slate-200 py-4 px-4 sm:px-8 sticky bottom-0">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
            <button 
                onClick={handlePrev} 
                disabled={currentStepIndex === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:pointer-events-none transition-colors"
            >
                <ChevronLeft size={20} /> Anterior
            </button>

            {isAdminMode && (
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-100 px-3 py-1.5 rounded-full animate-pulse">
                <ShieldAlert size={14} />
                MODO ADMIN
              </div>
            )}

            <button 
                onClick={handleNext}
                disabled={!isAdminMode && isStepLocked}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white shadow-md transition-all transform hover:-translate-y-1 ${
                    (!isAdminMode && isStepLocked)
                    ? 'bg-slate-400 cursor-not-allowed opacity-70' 
                    : 'bg-primary hover:bg-indigo-700 hover:shadow-lg'
                }`}
            >
                {isLastStep ? 'Finalizar Lección' : 'Continuar'} <ChevronRight size={20} />
            </button>
        </div>
      </footer>

      {isSolutionVisible && solutionCode && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 animate-fadeIn" onClick={() => setIsSolutionVisible(false)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Lightbulb size={20} className="text-amber-500" /> Solución Propuesta</h3>
                    <button onClick={() => setIsSolutionVisible(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 flex-1 overflow-y-auto">
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-sm whitespace-pre-wrap font-mono">
                        <code>{solutionCode}</code>
                    </pre>
                </div>
                <div className="p-4 border-t border-slate-200 bg-slate-50 text-right">
                    <button 
                        onClick={() => {
                            if (solutionCode) {
                                navigator.clipboard.writeText(solutionCode);
                                setIsCopied(true);
                                setTimeout(() => setIsCopied(false), 2000);
                            }
                        }}
                        disabled={isCopied}
                        className="w-32 flex items-center justify-center px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-indigo-700 transition-all disabled:bg-green-500"
                    >
                        {isCopied ? <><Check size={16} className="mr-2"/> Copiado</> : <><ClipboardCopy size={16} className="mr-2"/> Copiar</>}
                    </button>
                </div>
            </div>
        </div>
    )}
    </div>
  );
};

export default LessonWizard;