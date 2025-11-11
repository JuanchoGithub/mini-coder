
import { Lesson } from '../../types';

export const lesson8: Lesson = {
  id: 8,
  title: "Proyecto Final: Aventura",
  description: "Tu propio juego de texto.",
  steps: [
    {
      type: 'theory',
      title: "El plan",
      content: `
Vamos a usar todo lo aprendido para hacer un mini-juego.
Necesitaremos:
1. Un bucle \`DO WHILE\` para que el juego siga hasta terminar.
2. \`PRINT\` e \`INPUT\` para narrar y preguntar qué hacer.
3. \`IF\` para ver si ganaste o perdiste.
      `
    },
    {
      type: 'code',
      title: "El Laberinto",
      content: "Intenta escapar del laberinto. Solo hay una salida correcta.",
      exercise: {
        prompt: "Encuentra la salida (es el ESTE).",
        initialCode: `jugando = 1
PRINT "Estás perdido en un laberinto oscuro."

DO WHILE jugando = 1
    INPUT "¿Vas al NORTE, SUR, ESTE u OESTE? ", direccion$
    
    IF direccion$ = "ESTE" THEN
        PRINT "¡Ves luz! Has encontrado la salida. GANASTE."
        jugando = 0
    ELSEIF direccion$ = "NORTE" THEN
        PRINT "Chocas contra una pared fría."
    ELSE
        PRINT "Te adentras más en la oscuridad... mejor vuelve."
    END IF
LOOP`,
         solutionCues: ['DO WHILE', 'IF', 'ESTE']
      }
    }
  ]
};
