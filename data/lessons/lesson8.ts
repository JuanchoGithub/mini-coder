import { Lesson } from '../../types';

export const lesson8: Lesson = {
  id: 8,
  title: "Bucles II: Repeticiones Indefinidas (DO)",
  description: "Aprende a repetir código cuando no sabes cuándo parar, y cómo evitar el temido bucle infinito.",
  steps: [
    {
      type: 'theory',
      title: "FOR vs. DO: ¿Cuándo uso cuál?",
      content: `
Ya eres un experto en bucles \`FOR\`. Pero tienen una limitación: debes saber de antemano cuántas veces vas a repetir algo.

*   **Bucle Definido (\`FOR\`):** "Repite esto 10 veces". "Procesa estos 50 emails". Sabes el número.
*   **Bucle Indefinido (\`DO\`):** "Repite esto HASTA QUE el usuario adivine la clave". "Sigue atacando MIENTRAS el jefe final tenga vida". No sabes el número, depende de una condición.

Para los bucles indefinidos, usamos la estructura **DO WHILE ... LOOP**.
      `
    },
    {
      type: 'theory',
      title: "Hacer Mientras... (DO WHILE)",
      content: `
El bucle \`DO WHILE\` es como un guardia obstinado. Repite un bloque de código **MIENTRAS** una condición sea verdadera.

\`\`\`basic
clave$ = ""
DO WHILE clave$ <> "secreto"
   INPUT "Dime la clave: ", clave$
LOOP
PRINT "¡Bienvenido, agente!"
\`\`\`
El programa se queda "atrapado" en el bucle. En cada vuelta, comprueba la condición \`clave$ <> "secreto"\`. Si es verdadera, ejecuta el \`INPUT\` de nuevo. Solo cuando escribes "secreto", la condición se vuelve falsa, y el programa puede "escapar" del bucle y continuar.
      `
    },
    {
      type: 'theory',
      title: "El Patrón de la 'Variable Bandera'",
      content: `
Una técnica muy común es usar una variable que actúe como un interruptor o "bandera" (flag) para controlar el bucle.

\`\`\`basic
jugando = 1 ' 1 significa 'SÍ, seguir jugando'

DO WHILE jugando = 1
   PRINT "--- Menú Principal ---"
   INPUT "Elige una opción (1=Jugar, 0=Salir): ", opcion
   IF opcion = 0 THEN
      jugando = 0 ' Bajamos la bandera para salir
   END IF
LOOP

PRINT "Gracias por jugar."
\`\`\`
El bucle continuará para siempre hasta que una acción DENTRO del bucle cambie el valor de \`jugando\` a \`0\`.
      `
    },
    {
      type: 'theory',
      title: "¡Peligro! El Bucle Infinito",
      content: `
Este es uno de los **errores semánticos** más comunes y frustrantes para un programador novato.

Un bucle infinito ocurre cuando la condición de un \`DO WHILE\` **nunca** se vuelve falsa. El programa se queda atrapado para siempre, repitiendo el mismo código sin parar, y usualmente tienes que cerrarlo a la fuerza.

**¿Cómo ocurre?**
Generalmente, porque olvidas incluir DENTRO del bucle el código que podría cambiar la condición.

\`\`\`basic
' ERROR: BUCLE INFINITO
respuesta$ = "no"
DO WHILE respuesta$ <> "si"
   PRINT "Esto se repetirá para siempre..."
   ' ¡ERROR! Olvidamos preguntar de nuevo al usuario.
   ' Falta un INPUT para cambiar el valor de respuesta$
LOOP
\`\`\`
`
    },
    {
      type: 'code',
      title: "Juego: Adivina el Número",
      content: `
Vamos a crear un juego clásico. La computadora pensará en un número secreto y tú tendrás que adivinarlo. El programa te dará pistas de "Más alto" o "Más bajo".

Este es un ejemplo perfecto para un \`DO WHILE\`, porque no sabemos cuántos intentos te llevará. Además, combina bucles con las decisiones (\`IF/ELSEIF\`) que aprendiste en la Lección 6.
      `,
      exercise: {
        prompt: "El juego funciona, pero el número secreto siempre es 7. Modifica el código para que el número secreto sea 25 y el mensaje inicial avise que el rango es de 1 a 50.",
        initialCode: `secreto = 7
intento = 0

PRINT "He pensado en un número del 1 al 10. ¡Adivínalo!"

DO WHILE intento <> secreto
    INPUT "Tu intento: ", intento
    
    IF intento < secreto THEN
        PRINT "Demasiado bajo... ¡Más alto!"
    ELSEIF intento > secreto THEN
        PRINT "Demasiado alto... ¡Más bajo!"
    END IF
LOOP

PRINT "¡CORRECTO! El número era " + secreto + ". ¡Ganaste!"`,
        solutionCues: ['DO WHILE', 'LOOP', 'IF', 'ELSEIF']
      }
    }
  ]
};