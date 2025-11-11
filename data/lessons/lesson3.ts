
import { Lesson } from '../../types';

export const lesson3: Lesson = {
  id: 3,
  title: "Lógica II: Verdadero o Falso",
  description: "El mundo binario de las decisiones.",
  steps: [
    {
      type: 'theory',
      title: "Todo es 1 o 0",
      content: `
En el fondo, las decisiones de una computadora son comparaciones que resultan en **VERDADERO (1)** o **FALSO (0)**.
A esto se le llama **Lógica Booleana**.

*   \`5 = 5\` es VERDADERO (1)
*   \`5 = 2\` es FALSO (0)
      `
    },
    {
      type: 'theory',
      title: "Operador AND (Y)",
      content: `
A veces necesitas que se cumplan DOS cosas a la vez. Usamos **AND**.
Solo es verdadero si AMBAS partes lo son.

| Condición A | Condición B | Resultado A AND B |
| :--- | :--- | :--- |
| Falso (0) | Falso (0) | **0 (Falso)** |
| Verdadero (1)| Falso (0) | **0 (Falso)** |
| Falso (0) | Verdadero (1)| **0 (Falso)** |
| Verdadero (1)| Verdadero (1)| **1 (Verdadero)**|
      `
    },
    {
      type: 'code',
      title: "Experimenta con la verdad",
      content: `
Vamos a pedirle a MiniQB que calcule estas verdades.
Recuerda: En QuickBASIC, 'Verdadero' a veces se muestra como -1, pero cualquier cosa distinta de 0 cuenta como Verdad.
      `,
      exercise: {
          prompt: "¿Qué dará (5 > 2) AND (1 = 0)? Piénsalo (Verdadero Y Falso) y ejecútalo.",
          initialCode: `PRINT "5 > 2 es: "
PRINT 5 > 2
PRINT "1 = 0 es: "
PRINT 1 = 0
PRINT "Ambos juntos (AND) es:"
PRINT (5 > 2) AND (1 = 0)`,
          expectedOutput: "0" 
      }
    }
  ]
};
