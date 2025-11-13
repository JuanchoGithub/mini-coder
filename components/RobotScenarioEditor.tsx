
import React, { useState, useRef, useEffect } from 'react';
import { WorldState2D, InteractiveObject2D } from '../types';
import { Save, Trash2, MousePointer2, Coffee, BrickWall, Square } from 'lucide-react';

interface RobotScenarioEditorProps {
    initialWorld: WorldState2D;
    onWorldChange: (newWorld: WorldState2D) => void;
}

type ToolType = 'select' | 'robot' | 'cup' | 'wall' | 'table';

const RobotScenarioEditor: React.FC<RobotScenarioEditorProps> = ({ initialWorld, onWorldChange }) => {
    const [world, setWorld] = useState<WorldState2D>(initialWorld);
    const [selectedTool, setSelectedTool] = useState<ToolType>('select');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        drawCanvas();
    }, [world]);

    const drawCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Zones
        world.zones.forEach(zone => {
            ctx.fillStyle = '#dcfce780'; 
            ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
            ctx.strokeStyle = '#22c55e';
            ctx.setLineDash([5, 5]);
            ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);
            ctx.setLineDash([]);
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
        ctx.fillStyle = '#6366f1';
        ctx.fillRect(-20, -20, 40, 40);
        ctx.fillStyle = 'white';
        ctx.fillRect(5, -10, 10, 5);
        ctx.fillRect(5, 5, 10, 5);
        ctx.restore();

        // Grid for editing help
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        for(let i=0; i<500; i+=50) {
            ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,500); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(500,i); ctx.stroke();
        }
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newWorld = JSON.parse(JSON.stringify(world)) as WorldState2D;

        switch (selectedTool) {
            case 'robot':
                newWorld.robot.x = x;
                newWorld.robot.y = y;
                break;
            case 'cup':
                newWorld.objects.push({
                    id: `cup_${Date.now()}`,
                    emoji: '☕',
                    x, y, width: 30, height: 30,
                    isGrabbable: true,
                    minGripForce: 2,
                    breakForce: 2.5
                });
                break;
            case 'wall':
                 newWorld.objects.push({
                    id: `wall_${Date.now()}`,
                    emoji: '🧱',
                    x, y, width: 40, height: 40,
                    isGrabbable: false
                });
                break;
            case 'table':
                newWorld.zones.push({
                    id: `table_${Date.now()}`,
                    x: x - 40, y: y - 40, width: 80, height: 80,
                    label: 'MESA'
                });
                break;
            case 'select':
                // Simple delete closest object for now if clicking near it
                const clickRadius = 30;
                newWorld.objects = newWorld.objects.filter(o => Math.sqrt(Math.pow(o.x - x, 2) + Math.pow(o.y - y, 2)) > clickRadius);
                newWorld.zones = newWorld.zones.filter(z => !(x > z.x && x < z.x + z.width && y > z.y && y < z.y + z.height));
                break;
        }

        setWorld(newWorld);
        onWorldChange(newWorld);
    };

    const clearWorld = () => {
        const emptyWorld = { ...initialWorld, objects: [], zones: [] };
        setWorld(emptyWorld);
        onWorldChange(emptyWorld);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="bg-white border-b border-slate-200 p-3 flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold text-slate-500 uppercase">Herramientas:</span>
                
                <button onClick={() => setSelectedTool('select')} className={`p-2 rounded-lg flex items-center gap-2 ${selectedTool === 'select' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`} title="Seleccionar/Borrar">
                    <MousePointer2 size={18} />
                </button>
                <div className="w-px h-6 bg-slate-300 mx-2" />
                <button onClick={() => setSelectedTool('robot')} className={`p-2 rounded-lg ${selectedTool === 'robot' ? 'bg-indigo-500 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`} title="Mover Robot">
                    🤖
                </button>
                <button onClick={() => setSelectedTool('cup')} className={`p-2 rounded-lg ${selectedTool === 'cup' ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'}`} title="Añadir Taza">
                    <Coffee size={18} />
                </button>
                <button onClick={() => setSelectedTool('wall')} className={`p-2 rounded-lg ${selectedTool === 'wall' ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`} title="Añadir Pared">
                    <BrickWall size={18} />
                </button>
                <button onClick={() => setSelectedTool('table')} className={`p-2 rounded-lg ${selectedTool === 'table' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'}`} title="Añadir Zona Mesa">
                    <Square size={18} />
                </button>

                 <div className="flex-1" />
                 <button onClick={clearWorld} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 text-sm font-bold">
                    <Trash2 size={16} /> Limpiar Todo
                </button>
            </div>

            <div className="flex-1 bg-slate-100 relative flex items-center justify-center p-4 overflow-auto">
                 <div className="relative shadow-xl border-4 border-dashed border-slate-300 rounded-xl overflow-hidden bg-white cursor-crosshair">
                     <canvas 
                        ref={canvasRef} 
                        width={500} 
                        height={500} 
                        onClick={handleCanvasClick}
                        className="bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyMHYyMEgwem0xIDFoMTh2MThIMXoiIGZpbGw9IiNmMWY1ZjkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')]"
                    />
                    {selectedTool === 'select' && (
                        <div className="absolute bottom-2 left-2 bg-white/80 px-2 py-1 text-xs text-slate-500 rounded pointer-events-none">
                            Haz clic en un objeto para borrarlo
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RobotScenarioEditor;
