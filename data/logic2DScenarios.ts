
import { Scenario2D, RobotInstruction } from '../types';
import { isInside } from '../services/robot2DEngine';

const standardInstructions: RobotInstruction[] = [
    { id: 'move_50', type: 'MOVE', label: 'Avanzar 50', param: 50 },
    { id: 'move_100', type: 'MOVE', label: 'Avanzar 100', param: 100 },
    { id: 'rot_90', type: 'ROTATE', label: 'Girar Derecha (90°)', param: 90 },
    { id: 'rot_-90', type: 'ROTATE', label: 'Girar Izquierda (90°)', param: -90 },
    { id: 'open', type: 'GRIP_OPEN', label: 'Abrir Pinza' },
];

export const scenarios2D: Scenario2D[] = [
    {
        id: 'coffee-run',
        title: 'Operación: Taza de Café',
        description: 'El robot debe llevar la taza (☕) a la mesa (zona verde). La taza es frágil: si usas Fuerza ALTA, se romperá. Si usas BAJA, se caerá.',
        initialWorld: {
            status: 'running',
            log: [],
            robot: { x: 50, y: 250, angle: 0, gripperOpen: true, holdingObjectId: null, crashed: false },
            objects: [
                { id: 'taza', emoji: '☕', x: 250, y: 250, width: 30, height: 30, isGrabbable: true, minGripForce: 2, breakForce: 2.5 },
                { id: 'pared', emoji: '🧱', x: 350, y: 150, width: 30, height: 200, isGrabbable: false }
            ],
            zones: [
                { id: 'mesa', x: 400, y: 200, width: 80, height: 100, label: 'MESA' }
            ]
        },
        availableInstructions: [
            ...standardInstructions,
            { id: 'grip_soft', type: 'GRIP_CLOSE', label: 'Agarrar (Fuerza: BAJA)', param: 1 },
            { id: 'grip_med', type: 'GRIP_CLOSE', label: 'Agarrar (Fuerza: MEDIA)', param: 2 },
            { id: 'grip_hard', type: 'GRIP_CLOSE', label: 'Agarrar (Fuerza: ALTA)', param: 3 },
        ],
        goalCheck: (world) => {
            const taza = world.objects.find(o => o.id === 'taza');
            const mesa = world.zones.find(z => z.id === 'mesa');
            if (!taza || !mesa) return { complete: false };

            if (taza.isBroken) return { complete: false, error: 'La taza está rota.' };

            // Success if cup is on table AND robot is NOT holding it anymore
            if (isInside(taza.x, taza.y, mesa.x, mesa.y, mesa.width, mesa.height)) {
                 if (world.robot.holdingObjectId === 'taza') {
                     return { complete: false, error: '¡Llegaste! Pero debes soltar la taza en la mesa.' };
                 }
                 return { complete: true };
            }
            
            return { complete: false };
        }
    }
];
