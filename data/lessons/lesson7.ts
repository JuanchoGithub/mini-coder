
import { Lesson } from '../../types';

export const lesson7: Lesson = {
  id: 7,
  title: "Bucles (FOR)",
  description: "Repetir cosas automáticamente.",
  steps: [
    {
      type: 'theory',
      title: "El contador",
      content: `
Si sabes que quieres hacer algo 5 veces, usa \`FOR\`.
\`FOR i = 1 TO 5\` crea una variable \`i\` que cuenta por ti: 1, 2, 3, 4, 5.
      `
    },
    {
      type: 'code',
      title: "La tabla del 7",
      content: "Usemos un bucle para no tener que escribir 10 veces PRINT.",
      exercise: {
        prompt: "Ejecuta y mira cómo la computadora hace el trabajo duro.",
        initialCode: `FOR numero = 1 TO 10
    PRINT "7 x " + numero + " = " + (7 * numero)
NEXT numero`,
        solutionCues: ['FOR', 'NEXT']
      }
    }
  ]
};
