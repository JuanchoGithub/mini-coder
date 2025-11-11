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
    // EJERCICIO 2: LAVADERO (DUCHA) - REDESIGNED
    {
        id: 'robot-shower',
        title: 'Lavadero Automático',
        description: 'MiniBot necesita un baño. Debes pasar por las zonas en ORDEN EXACTO: 1. Jabón (🧼) -> 2. Agua (🚿) -> 3. Secado (💨). ¡La ruta ya no es una línea recta!',
        initialWorld: {
            status: 'running',
            log: [],
            robot: { x: 50, y: 450, angle: -90, gripperOpen: true, holdingObjectId: null, crashed: false, visitedZones: [] },
            objects: [
                 { id: 'wall1', emoji: '🧱', x: 250, y: 250, width: 30, height: 250, isGrabbable: false }
            ],
            zones: [
                { id: 'soap', x: 20, y: 20, width: 100, height: 80, label: '1. JABÓN 🧼' },
                { id: 'water', x: 380, y: 20, width: 100, height: 80, label: '2. AGUA 🚿' },
                { id: 'dry', x: 200, y: 400, width: 100, height: 80, label: '3. SECADO 💨' }
            ]
        },
        availableInstructions: [
            { id: 'move_50', type: 'MOVE', label: 'Avanzar 50', param: 50 },
            { id: 'move_100', type: 'MOVE', label: 'Avanzar 100', param: 100 },
            { id: 'rot_90', type: 'ROTATE', label: 'Girar Der. (90°)', param: 90 },
            { id: 'rot_-90', type: 'ROTATE', label: 'Girar Izq. (90°)', param: -90 },
        ],
        goalCheck: (world) => {
            const visited = world.robot.visitedZones || [];
            // Filter out consecutive duplicates to only care about the sequence of entering new zones
            const sequence = visited.filter((zone, index) => zone !== visited[index - 1]);
            
            const soapIndex = sequence.indexOf('soap');
            const waterIndex = sequence.indexOf('water');
            const dryIndex = sequence.indexOf('dry');

            // The ultimate goal is to have visited all three in order.
            if (soapIndex !== -1 && waterIndex > soapIndex && dryIndex > waterIndex) {
                return { complete: true };
            }

            // Provide helpful feedback if the goal isn't met.
            const lastZone = sequence[sequence.length - 1];
            if (lastZone === 'dry') { // They reached the end but the sequence is wrong
                if (soapIndex === -1) return { complete: false, error: '¡Llegaste al final pero te saltaste el jabón!' };
                if (waterIndex === -1 || waterIndex < soapIndex) return { complete: false, error: '¡Tienes jabón, pero te olvidaste de enjuagar con agua!' };
            }
            if(lastZone === 'water' && soapIndex === -1) {
                return { complete: false, error: '¡Te enjuagaste antes de usar el jabón!' };
            }


            return { complete: false };
        }
    },
    // EJERCICIO 3: ESTACIONAMIENTO - REDISEÑADO
    {
        id: 'robot-parking',
        title: 'Misión: Estacionamiento de Precisión',
        description: 'Misión: Estacionamiento en paralelo. Estaciona a MiniBot en el espacio libre (🅿️) entre los dos bloques de construcción. Necesitarás avanzar, retroceder y girar con mucha precisión. ¡Es un desafío de verdad!',
        initialWorld: {
            status: 'running',
            log: [],
            robot: { x: 50, y: 350, angle: 0, gripperOpen: true, holdingObjectId: null, crashed: false, visitedZones: [] },
            objects: [
                // Obstáculos que simulan otros autos
                { id: 'obs1a', emoji: '🧱', x: 170, y: 420, width: 30, height: 30, isGrabbable: false },
                { id: 'obs1b', emoji: '🧱', x: 140, y: 420, width: 30, height: 30, isGrabbable: false },
                { id: 'obs2a', emoji: '🧱', x: 330, y: 420, width: 30, height: 30, isGrabbable: false },
                { id: 'obs2b', emoji: '🧱', x: 360, y: 420, width: 30, height: 30, isGrabbable: false },
                
                // Bordillo/Pared trasera para que no se pase
                { id: 'curb1', emoji: '🚧', x: 150, y: 480, width: 30, height: 30, isGrabbable: false },
                { id: 'curb2', emoji: '🚧', x: 200, y: 480, width: 30, height: 30, isGrabbable: false },
                { id: 'curb3', emoji: '🚧', x: 250, y: 480, width: 30, height: 30, isGrabbable: false },
                { id: 'curb4', emoji: '🚧', x: 300, y: 480, width: 30, height: 30, isGrabbable: false },
                { id: 'curb5', emoji: '🚧', x: 350, y: 480, width: 30, height: 30, isGrabbable: false },
            ],
            zones: [
                { id: 'parking', x: 200, y: 400, width: 120, height: 60, label: '🅿️' }
            ]
        },
        availableInstructions: [
            { id: 'move_50', type: 'MOVE', label: 'Avanzar 50', param: 50 },
            { id: 'move_100', type: 'MOVE', label: 'Avanzar 100', param: 100 },
            { id: 'move_back_50', type: 'MOVE', label: 'Retroceder 50', param: -50 },
            { id: 'rot_45', type: 'ROTATE', label: 'Girar Der. (45°)', param: 45 },
            { id: 'rot_-45', type: 'ROTATE', label: 'Girar Izq. (45°)', param: -45 },
            { id: 'rot_90', type: 'ROTATE', label: 'Girar Der. (90°)', param: 90 },
            { id: 'rot_-90', type: 'ROTATE', label: 'Girar Izq. (90°)', param: -90 },
        ],
        goalCheck: (world) => {
            const parking = world.zones.find(z => z.id === 'parking');
            // Goal is met if the robot is *mostly* inside the zone and straight
            if (parking && isInside(world.robot.x, world.robot.y, parking.x + 10, parking.y + 10, parking.width - 20, parking.height - 20)) {
                // Check if robot is relatively straight (facing left or right)
                if (world.robot.angle < 10 || world.robot.angle > 350 || (world.robot.angle > 170 && world.robot.angle < 190) ) {
                    return { complete: true };
                } else {
                    return { complete: false, error: '¡Estás en el lugar, pero el auto está torcido!' };
                }
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