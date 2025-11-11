
import { Lesson } from '../../types';

export const lesson8: Lesson = {
  id: 8,
  title: "Bucles II: Repetir hasta que...",
  description: "Cuando NO sabes cuántas veces tendrás que repetir algo.",
  steps: [
    {
      type: 'theory',
      title: "¿Y si no sé cuándo parar?",
      content: `
El bucle \`FOR\` es genial si sabes que quieres repetir algo 10 veces.
¿Pero qué pasa si quieres repetir algo **mientras** el usuario no adivine una contraseña? Podría tardar 1 intento, o 1000.

Ahí entra el **DO WHILE** (Hacer Mientras...).
      `
    },
    {
      type: 'theory',
      title: "El portero obstinado",
      content: `
\`DO WHILE\` repite un bloque de código MIENTRAS una condición sea verdadera.

\`\`\`basic
clave$ = ""
DO WHILE clave$ <> "secreto"
   INPUT "Dime la clave: ", clave$
LOOP
PRINT "¡Bienvenido!"
\`\`\`
El programa se queda "atrapado" en el bucle hasta que la condición (\`clave$ <> "secreto"\`) deja de ser cierta.
      `
    },
    {
      type: 'code',
      title: "El adivino persistente",
      content: `
Vamos a hacer un juego donde tienes que adivinar un número. El programa no terminará hasta que aciertes.
Observa cómo usamos una variable \`adivinado\` que empieza en 0 (Falso) y cambia a 1 (Verdadero) solo cuando aciertas.
      `,
      exercise: {
        prompt: "Ejecuta el juego e intenta adivinar el número secreto (es el 5).",
        initialCode: `secreto = 5
adivinado = 0

PRINT "Estoy pensando en un número del 1 al 10..."

DO WHILE adivinado = 0
    INPUT "¿Cuál es? ", intento
    IF intento = secreto THEN
        PRINT "¡EXACTO! ¡Lo adivinaste!"
        adivinado = 1
    ELSE
        PRINT "Nop. Intenta de nuevo."
    END IF
LOOP

PRINT "Fin del juego."`,
        solutionCues: ['DO WHILE', 'LOOP', '= 1']
      }
    }
  ]
};
