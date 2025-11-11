
import { Lesson } from '../../types';

export const lesson4: Lesson = {
  id: 4,
  title: "Tu primer programa real",
  description: "Usando los comandos PRINT e INPUT.",
  steps: [
    {
      type: 'theory',
      title: "Hablando (PRINT)",
      content: `
Llegó la hora de escribir en el lenguaje real.
La orden \`PRINT\` muestra información en la pantalla.

Puede mostrar texto fijo (entre comillas): \`PRINT "Hola"\`
O el resultado de cálculos: \`PRINT 2 + 2\`
      `
    },
    {
      type: 'theory',
      title: "Escuchando (INPUT)",
      content: `
Un programa útil necesita datos del usuario. \`INPUT\` detiene el programa y espera a que el usuario escriba algo y pulse Enter.

Necesitamos un lugar donde guardar eso que el usuario escribe. A esos lugares los llamamos **Variables**.
      `
    },
    {
      type: 'code',
      title: "Interactuando",
      content: `
Vamos a combinar ambos. Preguntaremos el nombre al usuario y lo saludaremos.
Fíjate en el uso de \`$\` en \`nombre$\`: indica que esta variable guardará Texto.
      `,
      exercise: {
        prompt: "Ejecuta el programa, escribe tu nombre en la consola cuando aparezca '?', y pulsa Enter.",
        initialCode: `PRINT "¿Cómo te llamas?"
INPUT nombre$
PRINT "Hola, " + nombre$ + ". ¡Bienvenido!"`,
        solutionCues: ['INPUT', 'PRINT']
      }
    }
  ]
};
