
import { Lesson } from '../../types';

export const lesson5: Lesson = {
  id: 5,
  title: "Variables",
  description: "Las cajas de la memoria.",
  steps: [
    {
      type: 'theory',
      title: "Tipos de datos",
      content: `
Las variables son "cajas" con etiqueta. En MiniQB, la etiqueta nos dice qué podemos guardar dentro:

*   **String ($):** Para texto. Ej: \`nombre$ = "Ana"\`
*   **Numérico (sin símbolo):** Para números. Ej: \`puntos = 100\`
      `
    },
    {
      type: 'code',
      title: "Reasignación",
      content: `
Las variables pueden cambiar de valor (por eso se llaman "variables").
El valor antiguo se pierde para siempre cuando guardas uno nuevo.
      `,
      exercise: {
        prompt: "¿Qué mostrará este código al final? Ejecútalo para verlo.",
        initialCode: `puntos = 100
PRINT puntos
puntos = 200
PRINT puntos
puntos = puntos + 50
PRINT puntos`,
        expectedOutput: "250"
      }
    }
  ]
};
