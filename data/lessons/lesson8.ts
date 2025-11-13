
import { Lesson } from '../../types';

export const lesson8: Lesson = {
  id: 8,
  title: "Bucles II: Repeticiones Indefinidas (DO)",
  description: "Aprende a repetir código cuando no sabes cuándo parar, y cómo evitar el temido bucle infinito. Explora bucles condicionales para manejar situaciones impredecibles como inputs de usuario o juegos.",
  steps: [
    {
      type: 'theory',
      title: "FOR vs. DO: ¿Cuándo uso cuál?",
      content: `
Ya eres un experto en bucles \`FOR\` de la lección anterior, donde controlas repeticiones exactas con un contador. Pero tienen una limitación clave: debes saber de antemano cuántas veces vas a repetir algo, como "imprime 10 líneas" o "procesa 50 elementos".

En la vida real (y en programación), muchas situaciones son impredecibles:
- ¿Cuántos intentos necesita un usuario para adivinar una contraseña?
- ¿Cuántas rondas dura un juego hasta que alguien gane?

Aquí entran los bucles indefinidos:
*   **Bucle Definido (\`FOR\`):** "Repite esto exactamente 10 veces". "Procesa estos 50 emails". Sabes el número fijo o rango.
*   **Bucle Indefinido (\`DO WHILE\` o similar):** "Repite esto HASTA QUE el usuario adivine la clave". "Sigue atacando MIENTRAS el jefe final tenga vida >0". No sabes el número de iteraciones; depende de una condición que cambia durante la ejecución.

Para los bucles indefinidos, usamos la estructura **DO WHILE ... LOOP** (o equivalentes como WHILE en otros lenguajes). Esto permite flexibilidad: el bucle corre hasta que una condición booleana (de Lección 3) se vuelva falsa.

Analogía: FOR es como cocinar una receta con "agrega 5 huevos" (cantidad fija). DO WHILE es "prueba la sopa HASTA QUE esté salada a gusto" (repites probando y agregando hasta condición cumplida).

¿Por qué importa? Bucles indefinidos manejan interacciones dinámicas, como menús, validación de inputs o simulaciones. Sin ellos, tus programas serían rígidos.
      `
    },
    {
      type: 'theory',
      title: "Hacer Mientras... (DO WHILE)",
      content: `
El bucle \`DO WHILE\` es como un guardia obstinado que repite un bloque de código **MIENTRAS** una condición booleana sea verdadera. Ejecuta el cuerpo al menos una vez (porque chequea la condición al final), y continúa hasta que la condición falle.

Sintaxis en MiniQB:
\`\`\`basic
DO WHILE condicion
   ' Código a repetir
LOOP
\`\`\`

Ejemplo: Validación de contraseña:
\`\`\`basic
LET clave$ = ""  ' Inicializa
DO WHILE clave$ <> "secreto"  ' Mientras no sea "secreto"
   INPUT "Dime la clave: ", clave$
LOOP
PRINT "¡Bienvenido, agente!"
\`\`\`

Flujo detallado:
1. Entra al DO (ejecuta cuerpo al menos una vez).
2. Pide input y guarda en clave$.
3. Al LOOP, chequea condición: Si clave$ != "secreto" (verdadera), vuelve al DO.
4. Repite hasta que condición sea falsa (clave$ = "secreto"), entonces sale y continúa.

Nota: La condición usa comparadores de Lección 5 (ej: <>, =, >). El bucle se "atrapa" hasta que algo dentro cambie la condición (ej: input del usuario).

Variante: En algunos lenguajes es WHILE ... END WHILE (chequea condición al inicio, podría no ejecutar ni una vez). MiniQB usa DO WHILE para garantizar al menos una iteración, útil para prompts iniciales.
      `
    },
    {
      type: 'code',
      title: "Práctica: DO WHILE Simple",
      content: `
Prueba un DO WHILE básico: Pide números hasta que sea positivo.
      `,
      exercise: {
          prompt: "Repite INPUT hasta que numero >0, entonces PRINT 'OK'.",
          initialCode: `LET numero = 0
DO WHILE numero <= 0
   INPUT "Ingresa un número positivo: ", numero
LOOP
PRINT "OK, " + numero + " es positivo."`,
          expectedOutput: "OK, 5 es positivo.",
          solution: `LET numero = 0
DO WHILE numero <= 0
   INPUT "Ingresa un número positivo: ", numero
LOOP
PRINT "OK, " + numero + " es positivo."`
      }
    },
    {
      type: 'theory',
      title: "El Patrón de la 'Variable Bandera'",
      content: `
Una técnica muy común y poderosa es usar una variable booleana (0/1) que actúe como un interruptor o "bandera" (flag) para controlar el bucle. Inicialízala en 1 (activa) y cámbiala a 0 dentro del bucle cuando quieras salir.

Ejemplo: Menú de juego repetitivo:
\`\`\`basic
LET jugando = 1  ' 1 significa 'SÍ, seguir jugando'; bandera activa

DO WHILE jugando = 1
   PRINT "--- Menú Principal ---"
   INPUT "Elige una opción (1=Jugar, 0=Salir): ", opcion
   IF opcion = 0 THEN
      jugando = 0  ' Bajamos la bandera para salir
   ELSE
      PRINT "¡Jugando una ronda!"
   END IF
LOOP

PRINT "Gracias por jugar."
\`\`\`

Aquí, el bucle continúa indefinidamente hasta que una acción DENTRO (elegir 0) flipa la bandera. Esto combina IF (Lección 6) con bucles para lógica interactiva.

Ventajas: Fácil de leer, permite múltiples formas de salir (ej: IFs anidados para condiciones complejas). Útil en menús, validaciones o loops hasta "salir".
      `
    },
    {
      type: 'theory',
      title: "¡Peligro! El Bucle Infinito",
      content: `
Este es uno de los **errores semánticos** más comunes y frustrantes para un programador novato (y expertos también).

Un bucle infinito ocurre cuando la condición de un \`DO WHILE\` **nunca** se vuelve falsa. El programa se queda atrapado para siempre, repitiendo el mismo código sin parar, consumiendo CPU y usualmente requiriendo cerrarlo a la fuerza (ctrl+C o kill process).

**¿Cómo ocurre?**
- Generalmente, porque olvidas incluir DENTRO del bucle el código que podría cambiar la condición (ej: no pides input nuevo).
- O la condición es siempre verdadera (ej: WHILE 1=1).
- O un bug lógico (ej: variable no se actualiza correctamente).

Ejemplo de error:
\`\`\`basic
' ERROR: BUCLE INFINITO
LET respuesta$ = "no"
DO WHILE respuesta$ <> "si"
   PRINT "Esto se repetirá para siempre..."
   ' ¡ERROR! Olvidamos INPUT para cambiar respuesta$
LOOP
\`\`\`

Prevención:
- Siempre incluye código dentro que modifique variables en la condición.
- Prueba con pocos casos: ¿Sale después de 1-2 iteraciones?
- Agrega contadores de seguridad: LET count=0; IF count>100 THEN BREAK (si MiniQB soporta BREAK).
- En depuración, agrega PRINT "Iteración X" para ver si avanza.

Historia: Bucles infinitos han causado crashes famosos, como en sistemas embebidos. ¡Siempre diseña una salida!
      `
    },
    {
      type: 'code',
      title: "Práctica: Detecta Infinito",
      content: `
Intenta crear un bucle infinito a propósito (WHILE 1=1), ejecuta, ve el problema, luego fixea agregando una bandera que se flipa después de 5 vueltas.
      `,
      exercise: {
          prompt: "Agrega LET count=0; count=count+1; IF count>5 THEN salir=0.",
          initialCode: `LET salir = 1
DO WHILE salir = 1
   PRINT "Esto debería parar después de 5..."
   ' Agrega contador y IF para flip salir
LOOP`,
          expectedOutput: "Esto debería parar después de 5...\nEsto debería parar después de 5...\nEsto debería parar después de 5...\nEsto debería parar después de 5...\nEsto debería parar después de 5...\nEsto debería parar después de 5...",
          solution: `LET salir = 1
LET count = 0
DO WHILE salir = 1
   PRINT "Esto debería parar después de 5..."
   count = count + 1
   IF count > 5 THEN
       salir = 0
   END IF
LOOP`
      }
    },
    {
      type: 'theory',
      title: "Combinando con Otras Estructuras",
      content: `
DO WHILE brilla cuando se combina con IF (decisiones) y variables (acumulación):
- Usa IF dentro para ramificar por iteración (ej: si input inválido, continua; si válido, procesa y sale).
- Acumula como en FOR: LET total=0; WHILE... total=total+input; etc.

Ejemplo avanzado: Calculadora simple que repite hasta 'salir'.
      `
    },
    {
      type: 'code',
      title: "Juego: Adivina el Número",
      content: `
Vamos a crear un juego clásico. La computadora pensará en un número secreto y tú tendrás que adivinarlo. El programa te dará pistas de "Más alto" o "Más bajo".

Este es un ejemplo perfecto para un \`DO WHILE\`, porque no sabemos cuántos intentos te llevará (indefinido). Además, combina bucles con las decisiones (\`IF/ELSEIF\`) que aprendiste en la Lección 6, y variables para rastrear.
      `,
      exercise: {
        prompt: "El juego funciona, pero el número secreto siempre es 7 y rango 1-10. Modifica el código para que el número secreto sea 25 y el mensaje inicial avise que el rango es de 1 a 50. Agrega un contador de intentos.",
        initialCode: `LET secreto = 7
LET intento = 0
LET count = 0

PRINT "He pensado en un número del 1 al 10. ¡Adivínalo!"

DO WHILE intento <> secreto
    count = count + 1
    INPUT "Tu intento: ", intento
    
    IF intento < secreto THEN
        PRINT "Demasiado bajo... ¡Más alto!"
    ELSEIF intento > secreto THEN
        PRINT "Demasiado alto... ¡Más bajo!"
    END IF
LOOP

PRINT "¡CORRECTO! El número era " + secreto + ". ¡Ganaste en " + count + " intentos!"`,
        solutionCues: ['DO WHILE', 'LOOP', 'IF', 'ELSEIF'],
        solution: `LET secreto = 25
LET intento = 0
LET count = 0

PRINT "He pensado en un número del 1 al 50. ¡Adivínalo!"

DO WHILE intento <> secreto
    count = count + 1
    INPUT "Tu intento: ", intento
    
    IF intento < secreto THEN
        PRINT "Demasiado bajo... ¡Más alto!"
    ELSEIF intento > secreto THEN
        PRINT "Demasiado alto... ¡Más bajo!"
    END IF
LOOP

PRINT "¡CORRECTO! El número era " + secreto + ". ¡Ganaste en " + count + " intentos!"`
      }
    },
    {
      type: 'theory',
      title: "Resumen",
      content: `
*   **DO WHILE:** Repite mientras condición verdadera; ejecuta al menos una vez.
*   **Vs FOR:** Usa DO para repeticiones indefinidas dependientes de condiciones cambiantes.
*   **Bandera:** Variable booleana para controlar salida flexible.
*   **Infinito:** Evita olvidando cambios en condición; usa contadores de seguridad.
*   **Combinaciones:** Con IF para decisiones por iteración, variables para acumulación.
*   **Aplicaciones:** Validación inputs, menús interactivos, juegos (turnos hasta fin), simulaciones (hasta convergencia).

¡Con DO WHILE, maneja lo impredecible! En la siguiente lección, exploraremos arrays para almacenar múltiples datos y procesarlos con bucles.
      `
    }
  ]
};