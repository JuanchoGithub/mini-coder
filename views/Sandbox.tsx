
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Code2, Bot, Play, PencilRuler, Box } from 'lucide-react';
import CodePlayground from '../components/CodePlayground';
import RobotSimulator2D from '../components/RobotSimulator2D';
import RobotScenarioEditor from '../components/RobotScenarioEditor';
import { WorldState2D, Scenario2D, RobotInstruction } from '../types';

const defaultSandboxWorld: WorldState2D = {
    status: 'running',
    log: [],
    robot: { x: 250, y: 250, angle: 0, gripperOpen: true, holdingObjectId: null, crashed: false, visitedZones: [] },
    objects: [],
    zones: []
};

const standardInstructions: RobotInstruction[] = [
    { id: 'move_50', type: 'MOVE', label: 'Avanzar 50', param: 50 },
    { id: 'move_100', type: 'MOVE', label: 'Avanzar 100', param: 100 },
    { id: 'rot_90', type: 'ROTATE', label: 'Girar Der. (90°)', param: 90 },
    { id: 'rot_-90', type: 'ROTATE', label: 'Girar Izq. (90°)', param: -90 },
    { id: 'open', type: 'GRIP_OPEN', label: 'Abrir Pinza' },
    { id: 'grip_med', type: 'GRIP_CLOSE', label: 'Agarrar', param: 2 },
];

const Sandbox = () => {
  const [activeTab, setActiveTab] = useState<'code' | 'robot'>('code');
  const [robotMode, setRobotMode] = useState<'edit' | 'play'>('edit');
  const [customWorld, setCustomWorld] = useState<WorldState2D>(defaultSandboxWorld);

  // Wrap custom world in a scenario object for the simulator
  const customScenario: Scenario2D = {
      id: 'custom',
      title: 'Mundo Personalizado',
      description: 'Tu propio diseño. ¡No hay reglas, solo diviértete!',
      initialWorld: customWorld,
      availableInstructions: standardInstructions,
      // Always complete immediately if goal checked, pure sandbox.
      // Or better: never complete automatically, just run until crash.
      goalCheck: () => ({ complete: false }) 
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between sticky top-0 z-50 shadow-sm gap-4 sm:gap-0">
         <div className="flex items-center gap-4">
             <Link to="/" className="p-2 text-slate-400 hover:text-primary hover:bg-indigo-50 rounded-xl transition-colors">
                 <Home size={24} />
             </Link>
             <h1 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                 <Box size={24} className="text-accent" /> Sandbox
             </h1>
         </div>
         
         {/* Tab Switcher */}
         <div className="flex bg-slate-100 p-1 rounded-xl">
             <button 
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-bold text-xs sm:text-sm transition-all ${activeTab === 'code' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                 <Code2 size={18}/> Código Libre
             </button>
             <button 
                onClick={() => setActiveTab('robot')}
                className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-bold text-xs sm:text-sm transition-all ${activeTab === 'robot' ? 'bg-white text-accent shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                 <Bot size={18}/> Constructor de Mundos
             </button>
         </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-2 py-6 md:p-6 overflow-hidden flex flex-col">
          {activeTab === 'code' ? (
              <div className="flex-1 h-full animate-fadeIn min-h-0">
                  <CodePlayground initialCode="PRINT '¡Hola Sandbox!'\nPRINT 'Aquí puedes escribir lo que quieras.'\n" />
              </div>
          ) : (
              <div className="flex-1 flex flex-col h-full animate-fadeIn bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-0">
                  {/* Robot Mode Toolbar */}
                  <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                      <h2 className="font-bold text-slate-700 flex items-center gap-2">
                          {robotMode === 'edit' ? <PencilRuler size={20}/> : <Play size={20}/>}
                          <span className="hidden sm:inline">{robotMode === 'edit' ? 'Editando Mundo' : 'Probando Mundo'}</span>
                      </h2>
                      <button 
                        onClick={() => setRobotMode(prev => prev === 'edit' ? 'play' : 'edit')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-white shadow-md transition-all transform active:scale-95 ${robotMode === 'edit' ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-500 hover:bg-amber-600'}`}
                      >
                          {robotMode === 'edit' ? <><Play size={20} fill="currentColor"/> JUGAR</> : <><PencilRuler size={20}/> EDITAR</>}
                      </button>
                  </div>

                  <div className="flex-1 overflow-hidden">
                      {robotMode === 'edit' ? (
                          <RobotScenarioEditor initialWorld={customWorld} onWorldChange={setCustomWorld} />
                      ) : (
                          // Key forces remount to reset state on every play
                          <RobotSimulator2D key={Date.now()} scenario={customScenario} onComplete={() => {}} />
                      )}
                  </div>
              </div>
          )}
      </main>
    </div>
  );
};

export default Sandbox;