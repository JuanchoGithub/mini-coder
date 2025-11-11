
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { lessons } from '../data/lessons';
import { logicScenarios } from '../data/logicScenarios';
import { scenarios2D } from '../data/logic2DScenarios';
import ReactMarkdown from 'react-markdown';
import CodePlayground from '../components/CodePlayground';
import LogicSimulator from '../components/LogicSimulator';
import RobotSimulator2D from '../components/RobotSimulator2D';
import { ChevronLeft, ChevronRight, CheckCircle, Home } from 'lucide-react';

const LessonWizard = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lessonId = Number(id);
  const lesson = lessons.find(l => l.id === lessonId);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);

  if (!lesson) return <div className="p-8 text-center text-2xl font-bold text-slate-400">Lección no encontrada 😔</div>;

  const currentStep = lesson.steps[currentStepIndex];
  const isLastStep = currentStepIndex === lesson.steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      navigate('/');
    } else {
      setCurrentStepIndex(prev => prev + 1);
      setExerciseCompleted(false);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      setExerciseCompleted(false); 
    }
  };

  const checkExercise = (output: string[]) => {
      if (!currentStep.exercise) return;
      if (currentStep.exercise.expectedOutput === "DONE") return;

      let isSuccess = false;
      if (currentStep.exercise.expectedOutput) {
           isSuccess = output.some(line => line.trim() === currentStep.exercise?.expectedOutput);
      } else {
          isSuccess = output.length > 0;
      }

      if (isSuccess) {
          setExerciseCompleted(true);
      }
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
                
                <div className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 prose-strong:text-primary prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1 prose-code:rounded prose-pre:bg-slate-900 prose-pre:shadow-lg mb-8">
                    <ReactMarkdown>{currentStep.content}</ReactMarkdown>
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
                    <CodePlayground 
                        initialCode={currentStep.exercise.initialCode || ''} 
                        onOutputChange={checkExercise}
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
