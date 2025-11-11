
import { Lesson } from '../../types';

export const lesson7: Lesson = {
  id: 7,
  title: "Bucles I: Repetir X veces",
  description: "Cuando sabes exactamente cuántas veces quieres hacer algo.",
  steps: [
    {
      type: 'theory',
      title: "El problema de repetir",
      content: `
Imagina que te castigan en la escuela y debes escribir 100 veces "No debo tirar papeles en clase".
¡Es aburridísimo! Para una computadora, es pan comido.

Los **Bucles** (loops) nos permiten repetir instrucciones sin escribirlas una por una.
      `
    },
    {
      type: 'theory',
      title: "El Bucle FOR (Para...)",
      content: `
Usamos \`FOR\` cuando sabemos el número exacto de repeticiones. Es como un reloj que hace tictac un número fijo de veces.

\`\`\`basic
FOR i = 1 TO 5
  PRINT "Esta es la repetición número " + i
NEXT i
\`\`\`
*   **FOR i = 1 TO 5**: "Empieza una cuenta en 1, y termina cuando llegue a 5".
*   **NEXT i**: "Vuelve arriba e incrementa el contador".
      `
    },
    {
      type: 'code',
      title: "La Máquina de Tablas",
      content: "Vamos a crear una máquina que sepa cualquier tabla de multiplicar. Usaremos un bucle que vaya del 1 al 10.",
      exercise: {
        prompt: "Cambia la variable 'tabla' para ver otras tablas. ¡La computadora hace el trabajo duro!",
        initialCode: `tabla = 7
PRINT "--- Tabla del " + tabla + " ---"
FOR contador = 1 TO 10
    resultado = tabla * contador
    PRINT tabla + " x " + contador + " = " + resultado
NEXT contador`,
        solutionCues: ['FOR', 'TO', 'NEXT']
      }
    }
  ]
};
