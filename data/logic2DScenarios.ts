
import { Scenario2D, RobotInstruction } from '../types';
import { isInside } from '../services/robot2DEngine';

const standardInstructions: RobotInstruction[] = [
    { id: 'move_50', type: 'MOVE', label: 'Avanzar 50', param: 50 },
    { id: 'move_100', type: 'MOVE', label: 'Avanzar 100', param: 100 },
    { id: 'rot_90', type: 'ROTATE', label: 'Girar Derecha (90°)', param: 90 },
    { id: 'rot_-90', type: 'ROTATE', label: 'Girar Izquierda (90°)', param: -90 },
    { id: 'open', type: 'GRIP_OPEN', label: 'Abrir Pinza' },
    { id: 'grip_med', type: 'GRIP_CLOSE', label: 'Agarrar', param: 2 },
];

export const scenarios2D: Scenario2D[] = [
    // EJERCICIO 1: COLECTIVO ROBOT
    {
        id: 'robot-bus',
        title: 'El Colectivo Robot',
        description: 'MiniBot quiere tomar el colectivo 🚌. PERO no puede subir sin su tarjeta SUBE 💳. Primero ve a buscar la tarjeta, agárrala, y luego ve a la parada.',
        initialWorld: {
            status: 'running',
            log: [],
            robot: { x: 50, y: 450, angle: 0, gripperOpen: true, holdingObjectId: null, crashed: false, visitedZones: [] },
            objects: [
                { id: 'sube', emoji: '💳', x: 50, y: 50, width: 20, height: 20, isGrabbable: true, minGripForce: 1 }
            ],
            zones: [
                { id: 'parada', x: 350, y: 400, width: 100, height: 80, label: 'PARADA 🚌' }
            ]
        },
        availableInstructions: [
            ...standardInstructions,
             { id: 'move_200', type: 'MOVE', label: 'Avanzar 200', param: 200 },
        ],
        goalCheck: (world) => {
            const parada = world.zones.find(z => z.id === 'parada');
            if (!parada) return { complete: false };

            const inParada = isInside(world.robot.x, world.robot.y, parada.x, parada.y, parada.width, parada.height);

            if (inParada) {
                if (world.robot.holdingObjectId === 'sube') {
                    return { complete: true };
                } else {
                    return { complete: false, error: '¡Estás en la parada pero olvidaste tu tarjeta SUBE!' };
                }
            }
            return { complete: false };
        }
    },
    // EJERCICIO 2: LAVADERO (DUCHA)
    {
        id: 'robot-shower',
        title: 'Lavadero Automático',
        description: 'MiniBot necesita un baño. Debes pasar por las zonas en ORDEN EXACTO: 1. Jabón (🧼) -> 2. Agua (🚿) -> 3. Secado (💨). Si te saltas un paso, ¡saldrás sucio!',
        initialWorld: {
            status: 'running',
            log: [],
            robot: { x: 50, y: 250, angle: 0, gripperOpen: true, holdingObjectId: null, crashed: false, visitedZones: [] },
            objects: [],
            zones: [
                { id: 'soap', x: 150, y: 200, width: 60, height: 100, label: '1. JABÓN 🧼' },
                { id: 'water', x: 250, y: 200, width: 60, height: 100, label: '2. AGUA 🚿' },
                { id: 'dry', x: 350, y: 200, width: 60, height: 100, label: '3. SECADO 💨' }
            ]
        },
        availableInstructions: [
            { id: 'move_50', type: 'MOVE', label: 'Avanzar 50', param: 50 },
            { id: 'move_100', type: 'MOVE', label: 'Avanzar 100', param: 100 },
            { id: 'rot_90', type: 'ROTATE', label: 'Girar Der. (90°)', param: 90 },
            { id: 'rot_-90', type: 'ROTATE', label: 'Girar Izq. (90°)', param: -90 },
        ],
        goalCheck: (world) => {
            // Check the sequence in visitedZones
            // We need to find specifically 'soap', then 'water', then 'dry' in that relative order in the array.
            const visited = world.robot.visitedZones || [];
            const soapIndex = visited.indexOf('soap');
            const waterIndex = visited.lastIndexOf('water'); // Use lastIndexOf to ensure it was visited AFTER soap if entered multiple times, simplish logic
            const dryIndex = visited.lastIndexOf('dry');

            // Need to be currently in 'dry' or have finished the sequence.
            // Let's just say if they reached 'dry' and the history is correct.
            
            if (isInside(world.robot.x, world.robot.y, 350, 200, 60, 100)) { // currently in dry zone
                 if (soapIndex !== -1 && waterIndex !== -1 && soapIndex < waterIndex) {
                     return { complete: true };
                 } else if (soapIndex === -1) {
                     return { complete: false, error: '¡Llegaste al final pero no usaste jabón!' };
                 } else if (waterIndex === -1 || waterIndex < soapIndex) {
                     return { complete: false, error: '¡Tienes jabón pero no te enjuagaste con agua!' };
                 }
            }

            return { complete: false };
        }
    },
    // EJERCICIO 3: ESTACIONAMIENTO
    {
        id: 'robot-parking',
        title: 'Misión: Estacionar',
        description: 'Estaciona a MiniBot en la zona designada (🅿️). El espacio es muy estrecho, ¡cuidado con las paredes! Tip: Quizás necesites girar antes de entrar.',
        initialWorld: {
            status: 'running',
            log: [],
            robot: { x: 100, y: 350, angle: 0, gripperOpen: true, holdingObjectId: null, crashed: false, visitedZones: [] },
            objects: [
                { id: 'w1', emoji: '🧱', x: 300, y: 100, width: 30, height: 200, isGrabbable: false },
                { id: 'w2', emoji: '🧱', x: 420, y: 100, width: 30, height: 200, isGrabbable: false },
                { id: 'w3', emoji: '🧱', x: 300, y: 100, width: 150, height: 30, isGrabbable: false }, // back wall
            ],
            zones: [
                { id: 'parking', x: 330, y: 130, width: 90, height: 150, label: 'ESTACIONAMIENTO 🅿️' }
            ]
        },
        availableInstructions: [
            { id: 'move_50', type: 'MOVE', label: 'Avanzar 50', param: 50 },
            { id: 'move_back_50', type: 'MOVE', label: 'Retroceder 50', param: -50 },
            { id: 'rot_90', type: 'ROTATE', label: 'Girar Der. (90°)', param: 90 },
            { id: 'rot_-90', type: 'ROTATE', label: 'Girar Izq. (90°)', param: -90 },
        ],
        goalCheck: (world) => {
            const parking = world.zones.find(z => z.id === 'parking');
            if (parking && isInside(world.robot.x, world.robot.y, parking.x, parking.y, parking.width, parking.height)) {
                return { complete: true };
            }
            return { complete: false };
        }
    },
    // MISION FINAL ORIGINAL
    {
        id: 'coffee-run',
        title: 'Operación: Taza de Café',
        description: 'El robot debe llevar la taza (☕) a la mesa (zona verde). La taza es frágil: si usas Fuerza ALTA, se romperá. Si usas BAJA, se caerá.',
        initialWorld: {
            status: 'running',
            log: [],
            robot: { x: 50, y: 250, angle: 0, gripperOpen: true, holdingObjectId: null, crashed: false, visitedZones: [] },
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
