import React, { useState, useEffect } from 'react';
// FIX: Import GameStateValue for type casting.
import { LogicScenario, LogicAction, GameState, GameStateValue } from '../types';
import { Play, RotateCcw, Plus, X, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

interface LogicSimulatorProps {
  scenario: LogicScenario;
  onComplete: () => void;
}

const LogicSimulator: React.FC<LogicSimulatorProps> = ({ scenario, onComplete }) => {
  const [currentActions, setCurrentActions] = useState<LogicAction[]>([]);
  const [simulationState, setSimulationState] = useState<GameState>(scenario.initialState);
  const [simulating, setSimulating] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // Reset when scenario changes
  useEffect(() => {
      resetSim();
  }, [scenario.id]);

  const resetSim = () => {
      setCurrentActions([]);
      setSimulationState(scenario.initialState);
      setSimulating(false);
      setCurrentStep(-1);
      setError(null);
      setSuccess(false);
      setLogs([]);
  };

  const addAction = (action: LogicAction) => {
      if (!simulating && !success) {
          setCurrentActions([...currentActions, action]);
          setError(null);
      }
  };

  const removeAction = (index: number) => {
      if (!simulating && !success) {
          const newActions = [...currentActions];
          newActions.splice(index, 1);
          setCurrentActions(newActions);
          setError(null);
      }
  };

  const runSimulation = async () => {
      setSimulating(true);
      setSimulationState(scenario.initialState);
      setCurrentStep(-1);
      setError(null);
      setSuccess(false);
      setLogs(["Inicio de la simulación..."]);

      let state = { ...scenario.initialState };
      let failed = false;

      for (let i = 0; i < currentActions.length; i++) {
          setCurrentStep(i);
          const action = currentActions[i];
          
          // Slight delay for visual effect
          await new Promise(r => setTimeout(r, 800));

          const check = action.check(state);
          if (check === true) {
              state = action.apply(state);
              setSimulationState(state);
              setLogs(prev => [...prev, `✅ ${action.label}: OK`]);
          } else {
              setError(`Error en paso ${i + 1} (${action.label}): ${check}`);
              setLogs(prev => [...prev, `❌ ${action.label}: FALLÓ. ${check}`]);
              failed = true;
              break;
          }
      }

      setSimulating(false);

      if (!failed) {
          if (scenario.goal(state)) {
              setSuccess(true);
              setLogs(prev => [...prev, "🎉 ¡OBJETIVO CUMPLIDO!"]);
              onComplete();
          } else {
              setError("La secuencia terminó, pero no cumpliste el objetivo final.");
              setLogs(prev => [...prev, "⚠️ Secuencia terminada. Objetivo NO cumplido."]);
          }
      }
  };

  return (
    <div className="flex flex-col lg:flex-row border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
        
        {/* Left Panel: Available Actions & State */}
        <div className="lg:w-1/3 bg-white border-r border-slate-200 p-4 flex flex-col">
            <div className="mb-6">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Estado Actual</h3>
                <div className="bg-slate-100 p-3 rounded-xl text-sm space-y-2 border border-slate-200 font-mono">
                    {/* FIX: Use Object.keys to avoid a type inference issue with Object.entries that caused the description function to be treated as a non-callable object. */}
                    {Object.keys(scenario.stateDescriptions).map((key) => (
                        <div key={key} className={key === 'robot_loc' || key === 'robot_mano' ? 'font-bold text-blue-700' : 'text-slate-600'}>
                            {scenario.stateDescriptions[key](simulationState[key] as GameStateValue)}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Acciones Disponibles</h3>
                <div className="grid grid-cols-1 gap-2">
                    {scenario.actions.map(action => (
                        <button
                            key={action.id}
                            onClick={() => addAction(action)}
                            disabled={simulating || success}
                            className="flex items-center justify-between px-4 py-3 bg-white border-2 border-blue-100 rounded-xl font-bold text-blue-700 hover:border-blue-500 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed text-left"
                        >
                            {action.label}
                            <Plus size={16} className="text-blue-300" />
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Middle Panel: Sequence Builder */}
        <div className="flex-1 p-4 flex flex-col bg-slate-50">
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    Tu Algoritmo <span className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full text-xs">{currentActions.length} pasos</span>
                </h3>
                <button onClick={resetSim} disabled={simulating} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors" title="Borrar todo">
                    <RotateCcw size={18} />
                </button>
            </div>
            
            <div className="bg-slate-200/50 rounded-xl p-4 space-y-2 border-2 border-dashed border-slate-300">
                {currentActions.length === 0 ? (
                    <div className="min-h-48 flex flex-col items-center justify-center text-slate-400 italic">
                        <ArrowRight size={32} className="mb-2 opacity-20" />
                        Añade acciones desde la izquierda
                    </div>
                ) : (
                    currentActions.map((action, idx) => (
                        <div 
                            key={idx} 
                            className={`relative flex items-center px-4 py-3 rounded-xl font-bold border-2 transition-all ${
                                idx === currentStep 
                                ? 'bg-amber-100 border-amber-500 text-amber-800 shadow-lg scale-105 z-10' 
                                : idx < currentStep
                                    ? 'bg-green-50 border-green-200 text-green-700 opacity-70'
                                    : 'bg-white border-slate-200 text-slate-700'
                            } ${error && idx === currentStep ? '!bg-red-100 !border-red-500 !text-red-800' : ''}`}
                        >
                            <span className="mr-3 opacity-50 text-xs">#{idx + 1}</span>
                            {action.label}
                            {idx === currentStep && simulating && <span className="ml-auto animate-pulse">⏳</span>}
                            {!simulating && !success && (
                                <button 
                                    onClick={() => removeAction(idx)} 
                                    className="absolute right-2 p-1 text-slate-300 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>

            <button
                onClick={runSimulation}
                disabled={simulating || currentActions.length === 0}
                className={`mt-4 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-95 ${
                    simulating ? 'bg-slate-400 cursor-not-allowed' : 
                    success ? 'bg-green-500' : 'bg-primary hover:bg-indigo-700 hover:-translate-y-1'
                }`}
            >
                {simulating ? 'Ejecutando...' : success ? '¡Éxito! Reiniciar' : <span><Play size={20} className="inline mr-1"/> PROBAR ALGORITMO</span>}
            </button>
        </div>

        {/* Right Panel: Output Log */}
        <div className="lg:w-1/4 bg-slate-900 p-4 text-slate-300 font-mono text-xs overflow-y-auto flex flex-col border-l border-slate-800">
             <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Registro de Ejecución</h3>
             <div className="space-y-1">
                 {logs.map((log, i) => (
                     <div key={i} className={`${log.includes('❌') ? 'text-red-400 font-bold' : log.includes('🎉') ? 'text-green-400 font-bold' : ''}`}>
                         {log}
                     </div>
                 ))}
                 {error && (
                     <div className="mt-4 p-3 bg-red-900/50 border border-red-500/50 rounded text-red-200">
                         <AlertTriangle size={16} className="inline mr-1"/> {error}
                     </div>
                 )}
                 {success && (
                     <div className="mt-4 p-3 bg-green-900/50 border border-green-500/50 rounded text-green-200 flex flex-col items-center text-center gap-2">
                         <CheckCircle size={32} />
                         ¡Misión Cumplida!
                     </div>
                 )}
             </div>
        </div>

    </div>
  );
};

export default LogicSimulator;