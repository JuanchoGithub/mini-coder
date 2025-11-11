import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { lessons } from '../data/lessons';
import { logicScenarios } from '../data/logicScenarios';
import { scenarios2D } from '../data/logic2DScenarios';
import ReactMarkdown from 'react-markdown';
import CodePlayground from '../components/CodePlayground';
import LogicSimulator from '../components/LogicSimulator';
import RobotSimulator2D from '../components/RobotSimulator2D';
import { ChevronLeft, ChevronRight, CheckCircle, Home, ClipboardCopy, Check } from 'lucide-react';
import { ExecutionResult } from '../types';

const LessonWizard = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lessonId = Number(id);
  const lesson = lessons.find(l => l.id === lessonId);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [exerciseHint, setExerciseHint] = useState<string | null>(null);

  if (!lesson) return <div className="p-8 text-center text-2xl font-bold text-slate-400">Lección no encontrada 😔</div>;

  const currentStep = lesson.steps[currentStepIndex];
  const isLastStep = currentStepIndex === lesson.steps.length - 1;

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
  // FIX: Provide a proper type for `props` to avoid errors with `children`.
  const CustomPre = (props: React.ComponentProps<'pre'>) => {
    const { children } = props;
    const [isCopied, setIsCopied] = useState(false);

    // Helper to recursively get text content from React children
    const getCodeString = (node: React.ReactNode): string => {
        if (typeof node === 'string') return node;
        if (Array.isArray(node)) return node.map(getCodeString).join('');
        // FIX: Safely access props.children by casting, as React.isValidElement does not guarantee its presence.
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
                setTimeout(() => setIsCopied(false), 2000); // Reset after 2s
            }).catch(err => {
                console.error("Failed to copy text: ", err);
            });
        }
    };
    
    return (
        <div className="relative group bg-slate-800 text-slate-100 p-6 my-4 rounded-xl shadow-inner">
             {/* The <pre> from markdown will be nested here. Reset its styles to avoid conflicts. */}
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


  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-8 flex items-center justify-between sticky top-0 z-50">
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
        <div className="text-sm font-medium text-slate-500">
            Paso {currentStepIndex + 1} de {lesson.steps.length}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-8 flex flex-col">
        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-10 animate-fadeIn flex flex-col">
            <div className="mb-6">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${currentStep.type === 'theory' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                    {currentStep.type === 'theory' ? 'Teoría' : currentStep.type.includes('simulation') ? 'Simulador' : 'Práctica'}
                </span>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">{currentStep.title}</h2>
                
                <div className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 prose-strong:text-primary prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1 prose-code:rounded mb-8">
                    <ReactMarkdown components={{ pre: CustomPre }}>{currentStep.content}</ReactMarkdown>
                </div>
            </div>

            {/* Logic Simulator (Text) */}
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

             {/* Logic Simulator (2D) */}
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

            {/* Code Playground */}
            {currentStep.type === 'code' && currentStep.exercise && (
                <div className="mt-4">
                     <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4 text-amber-800 font-medium">
                        💡 Tu misión: {currentStep.exercise.prompt}
                     </div>
                    {exerciseHint && (
                      <div className="mt-4 mb-4 bg-blue-50 border-l-4 border-blue-400 p-4 text-blue-800 font-medium animate-fadeIn whitespace-pre-wrap">
                        🤔 Pista: {exerciseHint}
                      </div>
                    )}
                    <CodePlayground 
                        initialCode={currentStep.exercise.initialCode || ''} 
                        onRunComplete={(result, code) => checkExercise(result, code)}
                    />
                </div>
            )}

            {/* Simple completion button for theory/mental exercises */}
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
      </main>

      {/* Footer Nav */}
      <footer className="bg-white border-t border-slate-200 py-4 px-8 sticky bottom-0">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
            <button 
                onClick={handlePrev} 
                disabled={currentStepIndex === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:pointer-events-none transition-colors"
            >
                <ChevronLeft size={20} /> Anterior
            </button>

            <button 
                onClick={handleNext}
                disabled={(currentStep.type === 'code' || currentStep.type.includes('simulation') || (currentStep.type === 'exercise' && currentStep.exercise?.expectedOutput === 'DONE')) && !exerciseCompleted}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white shadow-md transition-all transform hover:-translate-y-1 ${
                    ((currentStep.type === 'code' || currentStep.type.includes('simulation') || currentStep.exercise?.expectedOutput === 'DONE') && !exerciseCompleted)
                    ? 'bg-slate-400 cursor-not-allowed opacity-70' 
                    : 'bg-primary hover:bg-indigo-700 hover:shadow-lg'
                }`}
            >
                {isLastStep ? 'Finalizar Lección' : 'Continuar'} <ChevronRight size={20} />
            </button>
        </div>
      </footer>
    </div>
  );
};

export default LessonWizard;