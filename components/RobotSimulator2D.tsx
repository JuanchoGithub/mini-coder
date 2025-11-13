
import React, { useState, useEffect, useRef } from 'react';
import { Scenario2D, RobotInstruction, WorldState2D } from '../types';
import { executeStep } from '../services/robot2DEngine';
import { Play, RotateCcw, Plus, X, ArrowDown, CheckCircle, AlertTriangle, Trash2 } from 'lucide-react';

interface RobotSimulator2DProps {
    scenario: Scenario2D;
    onComplete: () => void;
}

const RobotSimulator2D: React.FC<RobotSimulator2DProps> = ({ scenario, onComplete }) => {
    const [instructions, setInstructions] = useState<RobotInstruction[]>([]);
    const [world, setWorld] = useState<WorldState2D>(scenario.initialWorld);
    const [simulating, setSimulating] = useState(false);
    const [currentStep, setCurrentStep] = useState(-1);
    const [runError, setRunError] = useState<string | null>(null);
    const [runSuccess, setRunSuccess] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const instructionsListRef = useRef<HTMLDivElement>(null);

    // Auto-scroll sequence list container only
    useEffect(() => {
        if (instructionsListRef.current) {
            instructionsListRef.current.scrollTo({
                top: instructionsListRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [instructions]);

    // --- CANVAS RENDERING ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Zones
        world.zones.forEach(zone => {
            ctx.fillStyle = '#dcfce7'; // Light green for target zones
            ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
            ctx.strokeStyle = '#22c55e';
            ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);
            ctx.fillStyle = '#15803d';
            ctx.font = '12px monospace';
            ctx.fillText(zone.label, zone.x + 5, zone.y + 15);
        });

        // Draw Objects
        ctx.font = '24px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        world.objects.forEach(obj => {
             ctx.fillText(obj.emoji, obj.x, obj.y);
        });

        // Draw Robot
        ctx.save();
        ctx.translate(world.robot.x, world.robot.y);
        ctx.rotate((world.robot.angle * Math.PI) / 180);
        
        // Robot body
        ctx.fillStyle = world.robot.crashed ? '#ef4444' : '#6366f1'; // Red if crashed, Indigo normal
        ctx.fillRect(-20, -20, 40, 40);
        
        // Direction indicator (eyes)
        ctx.fillStyle = 'white';
        ctx.fillRect(5, -10, 10, 5);
        ctx.fillRect(5, 5, 10, 5);

        // Gripper
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 4;
        ctx.beginPath();
        if (world.robot.gripperOpen) {
            // Open claws
            ctx.moveTo(20, -15); ctx.lineTo(35, -20);
            ctx.moveTo(20, 15); ctx.lineTo(35, 20);
        } else {
            // Closed claws
            ctx.moveTo(20, -15); ctx.lineTo(35, -5);
            ctx.moveTo(20, 15); ctx.lineTo(35, 5);
        }
        ctx.stroke();

        ctx.restore();

    }, [world]);

    // --- SIMULATION LOOP ---
    useEffect(() => {
        if (!simulating) return;

        if (currentStep >= instructions.length) {
            // End of instructions
            setSimulating(false);
            checkGoal(world);
            return;
        }

        if (world.status === 'failed') {
            setSimulating(false);
            setRunError("El robot ha fallado. Revisa el registro.");
            return;
        }

        const timer = setTimeout(() => {
            const nextWorld = executeStep(world, instructions[currentStep]);
            setWorld(nextWorld);
            setCurrentStep(prev => prev + 1);
        }, 800); // Step delay

        return () => clearTimeout(timer);
    }, [simulating, currentStep, world, instructions]);

    const checkGoal = (finalWorld: WorldState2D) => {
        const result = scenario.goalCheck(finalWorld);
        if (result.complete) {
            setRunSuccess(true);
            onComplete();
        } else {
            setRunError(result.error || "Secuencia terminada sin cumplir el objetivo.");
        }
    };

    const handlePlay = () => {
        setWorld(scenario.initialWorld);
        setCurrentStep(0);
        setRunError(null);
        setRunSuccess(false);
        setSimulating(true);
    };

    const handleReset = () => {
        setWorld(scenario.initialWorld);
        setInstructions([]);
        setCurrentStep(-1);
        setSimulating(false);
        setRunError(null);
        setRunSuccess(false);
    };

    return (
        <div className="flex flex-col lg:flex-row h-full border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
            
            {/* Left Panel: Sequence Builder (The Program) */}
            <div className="lg:w-1/4 bg-slate-50 border-r border-slate-200 flex flex-col">
                <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        Tu Programa <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs">{instructions.length} pasos</span>
                    </h3>
                    <button onClick={handleReset} disabled={simulating} className="text-slate-400 hover:text-red-500 transition-colors" title="Borrar todo">
                        <Trash2 size={16} />
                    </button>
                </div>
                
                <div ref={instructionsListRef} className="flex-1 overflow-y-auto p-3 space-y-2 scroll-smooth">
                    {instructions.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 italic text-sm p-4 text-center opacity-60">
                            <ArrowDown size={24} className="mb-2 animate-bounce" />
                            Añade comandos desde la derecha.
                        </div>
                    ) : (
                        instructions.map((inst, idx) => (
                            <div 
                                key={idx} 
                                className={`relative flex items-center p-2 rounded-lg border-2 transition-all ${
                                    idx === currentStep 
                                    ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm scale-[1.02]' 
                                    : idx < currentStep
                                        ? 'bg-green-50/50 border-green-200/50 text-green-700/50'
                                        : 'bg-white border-slate-200 text-slate-700'
                                }`}
                            >
                                <span className="w-6 text-xs font-mono opacity-50 flex-shrink-0">{(idx + 1).toString().padStart(2, '0')}.</span>
                                <span className="text-sm font-bold truncate">{inst.label}</span>
                                
                                {!simulating && !runSuccess && (
                                    <button 
                                        onClick={() => setInstructions(instructions.filter((_, i) => i !== idx))} 
                                        className="absolute right-2 p-1 text-slate-300 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Middle Area: Canvas */}
            <div className="flex-1 bg-slate-100 relative flex items-center justify-center p-4 overflow-auto">
                <div className="relative shadow-xl border-4 border-white rounded-xl overflow-hidden bg-white">
                        <canvas ref={canvasRef} width={500} height={500} className="bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyMHYyMEgwem0xIDFoMTh2MThIMXoiIGZpbGw9IiNmMWY1ZjkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')]"/>
                        
                        {/* Status Overlays */}
                        {runSuccess && (
                            <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center backdrop-blur-[2px] animate-fadeIn z-20">
                                <div className="bg-white p-8 rounded-3xl shadow-2xl text-center transform scale-110 border-4 border-green-500/30">
                                    <CheckCircle size={64} className="text-green-500 mx-auto mb-4 animate-bounce-in" />
                                    <h3 className="text-2xl font-extrabold text-slate-800 mb-2">¡Misión Cumplida!</h3>
                                    <p className="text-slate-500 font-medium">El café llegó a salvo.</p>
                                </div>
                            </div>
                        )}
                        {runError && !simulating && (
                                <div className="absolute inset-x-0 bottom-4 mx-auto w-max max-w-[90%] bg-red-900/90 backdrop-blur-md text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-bold animate-bounce-in z-20 border border-red-400/50">
                                    <AlertTriangle size={24} className="text-red-400"/> 
                                    <span>{runError}</span>
                                </div>
                        )}
                </div>
            </div>

            {/* Right Panel: Toolbox & Log */}
            <div className="lg:w-80 bg-white border-l border-slate-200 flex flex-col">
                {/* Controls & Palette */}
                <div className="p-3 border-b border-slate-200">
                    {/* Play Controls */}
                    <div className="flex gap-2 w-full mb-3">
                        <button 
                            onClick={() => { setWorld(scenario.initialWorld); setCurrentStep(-1); setRunError(null); setRunSuccess(false); setSimulating(false); }} 
                            disabled={simulating} 
                            className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors flex-1" 
                            title="Reiniciar simulación"
                        >
                            <RotateCcw size={20} className="mx-auto"/>
                        </button>
                        <button 
                            onClick={handlePlay} 
                            disabled={simulating || instructions.length === 0} 
                            className={`flex-grow-[3] flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold text-sm text-white shadow-sm transition-all ${simulating ? 'bg-slate-400 cursor-not-allowed' : 'bg-primary hover:bg-indigo-700 hover:shadow-md active:scale-95'}`}
                        >
                            {simulating ? 'Ejecutando...' : <><Play size={16} fill="currentColor" /> PROBAR</>}
                        </button>
                    </div>
                    
                    {/* Command Palette */}
                    <div className="border-t border-slate-100 pt-3">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Comandos</h3>
                        <div className="flex flex-wrap gap-2">
                        {scenario.availableInstructions.map(inst => (
                            <button
                                key={inst.id}
                                onClick={() => setInstructions([...instructions, inst])}
                                disabled={simulating || runSuccess}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs font-bold text-slate-700 hover:border-primary hover:text-primary hover:bg-indigo-50 transition-all disabled:opacity-50 active:scale-95"
                            >
                                <Plus size={12} /> {inst.label}
                            </button>
                        ))}
                        </div>
                    </div>
                </div>

                {/* Log Console */}
                <div className="flex-1 bg-slate-900 p-3 font-mono text-xs text-slate-300 overflow-y-auto">
                    <div className="text-slate-500 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> Registro del Robot
                    </div>
                    <div className="space-y-1.5">
                        {world.log.map((entry, i) => (
                            <div key={i} className={`leading-relaxed ${entry.includes('❌') ? 'text-red-400 font-bold bg-red-900/20 p-1 rounded' : entry.includes('⚠️') ? 'text-amber-400' : ''}`}>
                                <span className="opacity-30 mr-2">{(i+1).toString().padStart(2, '0')}:</span>{entry}
                            </div>
                        ))}
                        {world.log.length === 0 && <span className="opacity-30 italic">Esperando órdenes...</span>}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default RobotSimulator2D;