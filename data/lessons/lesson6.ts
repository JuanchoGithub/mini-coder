
import { Lesson } from '../../types';

export const lesson6: Lesson = {
  id: 6,
  title: "Decisiones (IF)",
  description: "Si pasa esto, haz aquello.",
  steps: [
    {
      type: 'theory',
      title: "IF...THEN",
      content: `
Es el cerebro de tu programa.
\`\`\`basic
IF edad > 18 THEN
   PRINT "Puedes votar"
END IF
\`\`\`
Si la condición es cierta, entra al bloque. Si no, lo salta.
      `
    },
    {
      type: 'code',
      title: "El Portero Virtual",
      content: "Vamos a crear un programa que solo deje pasar a mayores de 13 años.",
      exercise: {
        prompt: "Completa el IF para que si edad < 13 diga 'Eres muy pequeño'.",
        initialCode: `INPUT "Tu edad: ", edad
IF edad < 13 THEN
    PRINT "Eres muy pequeño"
ELSE
    PRINT "Pase adelante"
END IF`,
        solutionCues: ['IF', 'THEN', '<']
      }
    }
  ]
};
