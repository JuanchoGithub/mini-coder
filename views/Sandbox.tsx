
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Code2, Bot, Play, PencilRuler, Box, LayoutTemplate } from 'lucide-react';
import CodePlayground from '../components/CodePlayground';
import RobotSimulator2D from '../components/RobotSimulator2D';
import RobotScenarioEditor from '../components/RobotScenarioEditor';
import { WorldState2D, Scenario2D, RobotInstruction } from '../types';

const DEFAULT_SANDBOX_CODE = `PRINT "¡Hola Sandbox!"
PRINT "Aquí puedes escribir y probar lo que quieras."
PRINT "Carga una plantilla o empieza desde cero."`;

const TA_TE_TI_CODE = `REM --- TA-TE-TI ---
REM Un juego clásico programado en MiniQB
REM Carga esta plantilla y pulsa Ejecutar para jugar.

' --- Inicialización de variables del juego ---
DIM tablero$(9)
tablero$(1) = "1"
tablero$(2) = "2"
tablero$(3) = "3"
tablero$(4) = "4"
tablero$(5) = "5"
tablero$(6) = "6"
tablero$(7) = "7"
tablero$(8) = "8"
tablero$(9) = "9"

turno$ = "X"
turnos_jugados = 0
ganador$ = ""
mensaje$ = "" ' Para mensajes de error o información

' --- Bucle Principal del Juego ---
DO WHILE ganador$ = "" AND turnos_jugados < 9
    ' Limpiar la pantalla en cada turno para redibujar
    CLS
    
    ' --- Dibuja el Tablero ---
    PRINT "=== TA - TE - TI ==="
    PRINT ""
    PRINT " " + tablero$(1) + " | " + tablero$(2) + " | " + tablero$(3) + " "
    PRINT "---|---|---"
    PRINT " " + tablero$(4) + " | " + tablero$(5) + " | " + tablero$(6) + " "
    PRINT "---|---|---"
    PRINT " " + tablero$(7) + " | " + tablero$(8) + " | " + tablero$(9) + " "
    PRINT ""
    
    ' Muestra mensajes de error si existen
    IF mensaje$ <> "" THEN
        PRINT mensaje$
        mensaje$ = "" ' Limpia el mensaje para el próximo turno
    END IF

    ' --- Pide la Jugada al usuario ---
    INPUT "Turno de '" + turno$ + "'. Elige una casilla (1-9): ", jugada
    
    ' --- Valida y Procesa la Jugada ---
    IF jugada >= 1 AND jugada <= 9 THEN
        ' Revisa si la casilla está libre
        IF tablero$(jugada) <> "X" AND tablero$(jugada) <> "O" THEN
            ' Marca la casilla con el símbolo del jugador
            tablero$(jugada) = turno$
            turnos_jugados = turnos_jugados + 1
            
            ' --- Comprueba si hay un ganador ---
            ' Filas Horizontales
            IF tablero$(1)=tablero$(2) AND tablero$(2)=tablero$(3) THEN
                ganador$ = turno$
            END IF
            IF tablero$(4)=tablero$(5) AND tablero$(5)=tablero$(6) THEN
                ganador$ = turno$
            END IF
            IF tablero$(7)=tablero$(8) AND tablero$(8)=tablero$(9) THEN
                ganador$ = turno$
            END IF
            ' Columnas Verticales
            IF tablero$(1)=tablero$(4) AND tablero$(4)=tablero$(7) THEN
                ganador$ = turno$
            END IF
            IF tablero$(2)=tablero$(5) AND tablero$(5)=tablero$(8) THEN
                ganador$ = turno$
            END IF
            IF tablero$(3)=tablero$(6) AND tablero$(6)=tablero$(9) THEN
                ganador$ = turno$
            END IF
            ' Diagonales
            IF tablero$(1)=tablero$(5) AND tablero$(5)=tablero$(9) THEN
                ganador$ = turno$
            END IF
            IF tablero$(3)=tablero$(5) AND tablero$(5)=tablero$(7) THEN
                ganador$ = turno$
            END IF

            ' --- Cambia de Turno ---
            IF turno$ = "X" THEN
                turno$ = "O"
            ELSE
                turno$ = "X"
            END IF
        ELSE
            mensaje$ = "¡Error! Esa casilla ya está ocupada."
        END IF
    ELSE
        mensaje$ = "¡Error! Debes elegir un número del 1 al 9."
    END IF
LOOP

' --- Muestra el Resultado Final ---
CLS
PRINT "=== RESULTADO FINAL ==="
PRINT ""
PRINT " " + tablero$(1) + " | " + tablero$(2) + " | " + tablero$(3) + " "
PRINT "---|---|---"
PRINT " " + tablero$(4) + " | " + tablero$(5) + " | " + tablero$(6) + " "
PRINT "---|---|---"
PRINT " " + tablero$(7) + " | " + tablero$(8) + " | " + tablero$(9) + " "
PRINT ""
IF ganador$ <> "" THEN
    PRINT "¡FELICIDADES! El ganador es '" + ganador$ + "'!"
ELSE
    PRINT "¡Ha sido un EMPATE!"
END IF
PRINT "--- Fin del Juego ---"
`;

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
  const [code, setCode] = useState(DEFAULT_SANDBOX_CODE);

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
  
  const loadTaTeTi = () => {
      setCode(TA_TE_TI_CODE);
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
              <div className="flex-1 flex flex-col animate-fadeIn min-h-0 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-500 flex items-center gap-2"><LayoutTemplate size={16}/> Plantillas:</span>
                    <button 
                        onClick={loadTaTeTi} 
                        className="px-3 py-1 bg-white border border-slate-300 rounded-md text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                        Cargar TA-TE-TI
                    </button>
                </div>
                <div className="flex-1 min-h-0">
                    <CodePlayground 
                        code={code}
                        onCodeChange={setCode}
                        initialCode={DEFAULT_SANDBOX_CODE}
                    />
                </div>
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
