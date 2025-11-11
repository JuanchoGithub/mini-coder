
import { WorldState2D, RobotInstruction, InteractiveObject2D } from '../types';

// Helper to calculate distance between two points
const dist = (x1: number, y1: number, x2: number, y2: number) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

// Helper to check if a point is inside a rectangle (zone)
export const isInside = (x: number, y: number, rx: number, ry: number, rw: number, rh: number) => {
    return x >= rx && x <= rx + rw && y >= ry && y <= ry + rh;
}

export const executeStep = (world: WorldState2D, instruction: RobotInstruction): WorldState2D => {
    // Deep copy state to avoid mutations
    const nextWorld: WorldState2D = JSON.parse(JSON.stringify(world));
    const { robot, objects, zones } = nextWorld;

    // Ensure visitedZones exists (for older states or custom worlds without it initally)
    if (!robot.visitedZones) robot.visitedZones = [];

    if (nextWorld.status !== 'running') return nextWorld;

    switch (instruction.type) {
        case 'WAIT':
            nextWorld.log.push("🤖 Esperando...");
            break;
            
        case 'MOVE':
            const distance = instruction.param || 0;
            const rad = (robot.angle * Math.PI) / 180;
            // Smaller steps for collision detection could be better, but simple end-point check for now
            const dx = Math.cos(rad) * distance;
            const dy = Math.sin(rad) * distance;
            
            const newX = robot.x + dx;
            const newY = robot.y + dy;

            // 1. Check boundary collisions (World is 500x500 approx)
            if (newX < 20 || newX > 480 || newY < 20 || newY > 480) {
                robot.crashed = true;
                nextWorld.status = 'failed';
                nextWorld.log.push("❌ ¡CRASH! El robot chocó contra el borde del mundo.");
                return nextWorld;
            }

            // 2. Check object collisions (if NOT holding it)
            for (const obj of objects) {
                if (obj.id !== robot.holdingObjectId) {
                    // Simple circular collision approximation for ease
                    if (dist(newX, newY, obj.x, obj.y) < 30) { // 30 is approx robot radius + obj radius
                         robot.crashed = true;
                         nextWorld.status = 'failed';
                         nextWorld.log.push(`❌ ¡PUM! Chocaste contra ${obj.emoji}.`);
                         return nextWorld;
                    }
                }
            }

            // Move robot
            robot.x = newX;
            robot.y = newY;
            
            // Move held object together with robot
            if (robot.holdingObjectId) {
                const heldObj = objects.find(o => o.id === robot.holdingObjectId);
                if (heldObj) {
                    // Object sits slightly in front of robot center
                    heldObj.x = robot.x + Math.cos(rad) * 25;
                    heldObj.y = robot.y + Math.sin(rad) * 25;
                }
            }

            // Track visited zones
            for (const zone of zones) {
                if (isInside(robot.x, robot.y, zone.x, zone.y, zone.width, zone.height)) {
                    // Only add if it's different from the last one visited to avoid duplicates while moving inside
                    const lastVisited = robot.visitedZones[robot.visitedZones.length - 1];
                    if (lastVisited !== zone.id) {
                        robot.visitedZones.push(zone.id);
                        // Optional: Log zone entry? Might be too noisy.
                        // nextWorld.log.push(`📍 Entrando en ${zone.label}`);
                    }
                }
            }

            nextWorld.log.push(`🤖 Avanzando ${distance} pasos.`);
            break;

        case 'ROTATE':
            robot.angle += (instruction.param || 0);
            // Normalize angle
            robot.angle = robot.angle % 360;
            if (robot.angle < 0) robot.angle += 360;
            nextWorld.log.push(`🤖 Girando ${instruction.param}°`);
            break;

        case 'GRIP_OPEN':
            if (robot.gripperOpen) {
                 nextWorld.log.push("⚠️ La pinza ya estaba abierta.");
            } else {
                robot.gripperOpen = true;
                if (robot.holdingObjectId) {
                    nextWorld.log.push("⬇️ Soltaste el objeto.");
                    robot.holdingObjectId = null;
                } else {
                    nextWorld.log.push("👐 Abriendo pinza.");
                }
            }
            break;

        case 'GRIP_CLOSE':
             if (!robot.gripperOpen) {
                 nextWorld.log.push("⚠️ La pinza ya estaba cerrada.");
                 break;
             }
             
             robot.gripperOpen = false;
             const gripStrength = instruction.param || 1;

             // Find grabbable object in front of robot
             // Gripper position is approx 30 units in front of robot center
             const radGrip = (robot.angle * Math.PI) / 180;
             const gripperX = robot.x + Math.cos(radGrip) * 35;
             const gripperY = robot.y + Math.sin(radGrip) * 35;

             let grabbedSomething = false;
             for (const obj of objects) {
                 if (obj.isGrabbable && !robot.holdingObjectId) {
                     if (dist(gripperX, gripperY, obj.x, obj.y) < 20) {
                         // Object is in reach!
                         
                         // Check physics
                         if (obj.breakForce && gripStrength > obj.breakForce) {
                             obj.isBroken = true;
                             obj.emoji = '💥'; // Broken emoji
                             nextWorld.status = 'failed';
                             nextWorld.log.push(`❌ ¡CRACK! Usaste demasiada fuerza y rompiste ${obj.id}.`);
                             return nextWorld;
                         }

                         if (obj.minGripForce && gripStrength < obj.minGripForce) {
                              nextWorld.log.push(`⚠️ Fuerza insuficiente para levantar ${obj.emoji}. Se resbaló.`);
                         } else {
                             // SUCCESSFUL GRAB
                             robot.holdingObjectId = obj.id;
                             obj.x = gripperX;
                             obj.y = gripperY;
                             nextWorld.log.push(`✊ ¡Agarraste ${obj.emoji}!`);
                             grabbedSomething = true;
                         }
                     }
                 }
             }
             
             if (!grabbedSomething && !robot.holdingObjectId) {
                 nextWorld.log.push("💨 Cerraste la pinza en el aire. Nada cerca.");
             }
             break;
    }

    return nextWorld;
};
