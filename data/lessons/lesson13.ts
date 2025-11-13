
import { Lesson } from '../../types';

export const lesson13: Lesson = {
  id: 13,
  title: "Proyecto: TA-TE-TI",
  description: "Usa tu nuevo conocimiento sobre arreglos para construir el clásico juego TA-TE-TI (Tic-Tac-Toe) desde cero, paso a paso.",
  steps: [
    {
      type: 'theory',
      title: "El Plan de Juego",
      content: `
¡Es hora de construir nuestro TA-TE-TI! Antes de escribir una sola línea de código, un buen programador siempre hace un plan.

**Pregunta clave:** ¿Cómo representamos el tablero del juego en la memoria de la computadora?

El tablero tiene 9 casillas. ¡Esto suena como un trabajo perfecto para un **arreglo**!

Crearemos un arreglo de texto con 9 compartimentos:
\`DIM tablero$(9)\`

Cada casilla del arreglo corresponderá a una casilla del juego:
*   \`tablero$(1)\` será la casilla superior izquierda.
*   \`tablero$(5)\` será la casilla central.
*   \`tablero$(9)\` será la casilla inferior derecha.

Al principio, llenaremos el arreglo con los números del "1" al "9". Así, el jugador sabrá qué número teclear para elegir una casilla. Cuando un jugador haga un movimiento, cambiaremos el número por una "X" o una "O".
      `
    },
    {
      type: 'code',
      title: "Paso 1: Crear e Inicializar el Tablero",
      content: `
Vamos a escribir el código para crear nuestro arreglo \`tablero$\` y llenarlo con los números del "1" al "9". Aunque podríamos usar un bucle, vamos a hacerlo directamente para ser claros.
      `,
      exercise: {
        prompt: "Completa el código. Primero, declara un arreglo de texto `tablero$` con 9 espacios. Luego, llena cada `tablero$(i)` con su número correspondiente del 1 al 9.",
        initialCode: `' 1. Declara un arreglo de texto llamado tablero$ con 9 espacios.
DIM tablero$(9)

' 2. Llena el arreglo con los números del 1 al 9.
tablero$(1) = "1"
tablero$(2) = "2"
tablero$(3) = "3"
tablero$(4) = "4"
tablero$(5) = "5"
tablero$(6) = "6"
tablero$(7) = "7"
tablero$(8) = "8"
tablero$(9) = "9"

' Código de prueba para ver si funciona (no necesitas cambiarlo)
PRINT "La casilla 5 contiene: " + tablero$(5)
PRINT "La casilla 9 contiene: " + tablero$(9)
`,
        expectedOutput: "La casilla 5 contiene: 5\nLa casilla 9 contiene: 9",
        solutionCues: ['DIM tablero$(9)'],
        solution: `DIM tablero$(9)
tablero$(1) = "1"
tablero$(2) = "2"
tablero$(3) = "3"
tablero$(4) = "4"
tablero$(5) = "5"
tablero$(6) = "6"
tablero$(7) = "7"
tablero$(8) = "8"
tablero$(9) = "9"

PRINT "La casilla 5 contiene: " + tablero$(5)
PRINT "La casilla 9 contiene: " + tablero$(9)`
      }
    },
    {
      type: 'theory',
      title: "Paso 2: Dibujar el Tablero en Pantalla",
      content: `
Tener el tablero en memoria no es suficiente; necesitamos mostrárselo al jugador de una forma que se entienda. No podemos simplemente imprimir el arreglo, porque saldría como una lista. Tenemos que darle formato de cuadrícula 3x3.

Usaremos varios comandos \`PRINT\` y concatenaremos los elementos del arreglo con los caracteres de las líneas (" | " y "---|---").

\`\`\`basic
' Para la primera fila:
PRINT " " + tablero$(1) + " | " + tablero$(2) + " | " + tablero$(3) + " "
' Para la línea separadora:
PRINT "---|---|---"
' Y así sucesivamente para las otras filas...
\`\`\`
      `
    },
    {
      type: 'code',
      title: "Práctica: Dibujando el Tablero",
      content: `
Vamos a poner en práctica la teoría. Aquí está el código que inicializa el tablero. Tu misión es añadir los comandos \`PRINT\` para dibujarlo en la pantalla.
      `,
      exercise: {
        prompt: "Completa el código para que imprima el tablero en un formato de 3x3. Este código será la base visual de nuestro juego.",
        initialCode: `DIM tablero$(9)
tablero$(1) = "1"
tablero$(2) = "2"
tablero$(3) = "3"
tablero$(4) = "4"
tablero$(5) = "5"
tablero$(6) = "6"
tablero$(7) = "7"
tablero$(8) = "8"
tablero$(9) = "9"

PRINT "--- TA-TE-TI ---"
PRINT ""
' --- Dibuja el tablero aquí ---
PRINT " " + tablero$(1) + " | " + tablero$(2) + " | " + tablero$(3) + " "
PRINT "---|---"
' Completa las dos líneas que faltan para dibujar el resto del tablero
' (casillas 4, 5, 6 y 7, 8, 9)
`,
        expectedOutput: "--- TA-TE-TI ---\n\n 1 | 2 | 3 \n---|---\n 4 | 5 | 6 \n---|---\n 7 | 8 | 9 ",
        solutionCues: ['tablero$(4)', 'tablero$(7)'],
        solution: `DIM tablero$(9)
tablero$(1) = "1"
tablero$(2) = "2"
tablero$(3) = "3"
tablero$(4) = "4"
tablero$(5) = "5"
tablero$(6) = "6"
tablero$(7) = "7"
tablero$(8) = "8"
tablero$(9) = "9"

PRINT "--- TA-TE-TI ---"
PRINT ""
PRINT " " + tablero$(1) + " | " + tablero$(2) + " | " + tablero$(3) + " "
PRINT "---|---|---"
PRINT " " + tablero$(4) + " | " + tablero$(5) + " | " + tablero$(6) + " "
PRINT "---|---|---"
PRINT " " + tablero$(7) + " | " + tablero$(8) + " | " + tablero$(9) + " "`
      }
    },
    {
      type: 'theory',
      title: "Paso 3: El Bucle del Juego y los Turnos",
      content: `
Como en nuestros juegos anteriores, necesitamos un bucle principal \`DO WHILE\` para que el juego continúe, turno tras turno. También necesitamos variables para saber:
*   De quién es el turno actual (\`turno$\` = "X" o "O").
*   Si alguien ya ha ganado (\`ganador$\` = "" al principio).
*   Cuántos turnos han pasado, para detectar un empate (\`turnos_jugados\`).

La lógica dentro del bucle será:
1.  **Dibujar** el tablero.
2.  **Pedir** al jugador actual que elija una casilla.
3.  **Actualizar** el arreglo \`tablero$\` con una "X" o una "O".
4.  **Comprobar** si ese movimiento ha ganado el juego.
5.  **Cambiar** el turno al otro jugador.
      `
    },
    {
      type: 'code',
      title: "Práctica: El Turno del Jugador",
      content: `
Vamos a implementar la parte central del bucle: pedir una jugada y actualizar el tablero. Por ahora, no comprobaremos si hay un ganador, solo haremos que los turnos funcionen.
      `,
      exercise: {
        prompt: "Completa el código. El programa debe pedir una jugada y colocar el símbolo del jugador actual (`turno$`) en la casilla correspondiente del `tablero$`. Luego, debe cambiar el turno.",
        initialCode: `DIM tablero$(9)
tablero$(1) = "1"
tablero$(2) = "2"
tablero$(3) = "3"
tablero$(4) = "4"
tablero$(5) = "5"
tablero$(6) = "6"
tablero$(7) = "7"
tablero$(8) = "8"
tablero$(9) = "9"
turno$ = "X"

' --- Dibuja el tablero una vez ---
PRINT " " + tablero$(1) + " | " + tablero$(2) + " | " + tablero$(3) + " "
PRINT "---|---|---"
PRINT " " + tablero$(4) + " | " + tablero$(5) + " | " + tablero$(6) + " "
PRINT "---|---|---"
PRINT " " + tablero$(7) + " | " + tablero$(8) + " | " + tablero$(9) + " "
PRINT ""

' --- Pide la jugada ---
INPUT "Turno de '" + turno$ + "'. Elige una casilla: ", jugada

' --- Actualiza el tablero ---
' Coloca el valor de turno$ en la casilla que eligió el jugador.
' Ejemplo: tablero$(jugada) = turno$


' --- Cambia el turno ---
IF turno$ = "X" THEN
    turno$ = "O"
ELSE
    turno$ = "X"
END IF

' --- Imprime el tablero de nuevo para ver el cambio ---
PRINT ""
PRINT "Tablero actualizado:"
PRINT " " + tablero$(1) + " | " + tablero$(2) + " | " + tablero$(3) + " "
PRINT "---|---|---"
PRINT " " + tablero$(4) + " | " + tablero$(5) + " | " + tablero$(6) + " "
PRINT "---|---|---"
PRINT " " + tablero$(7) + " | " + tablero$(8) + " | " + tablero$(9) + " "
`,
        solutionCues: ['tablero$(jugada) = turno$'],
        solution: `DIM tablero$(9)
tablero$(1) = "1"
tablero$(2) = "2"
tablero$(3) = "3"
tablero$(4) = "4"
tablero$(5) = "5"
tablero$(6) = "6"
tablero$(7) = "7"
tablero$(8) = "8"
tablero$(9) = "9"
turno$ = "X"

' --- Dibuja el tablero una vez ---
PRINT " " + tablero$(1) + " | " + tablero$(2) + " | " + tablero$(3) + " "
PRINT "---|---|---"
PRINT " " + tablero$(4) + " | " + tablero$(5) + " | " + tablero$(6) + " "
PRINT "---|---|---"
PRINT " " + tablero$(7) + " | " + tablero$(8) + " | " + tablero$(9) + " "
PRINT ""

' --- Pide la jugada ---
INPUT "Turno de '" + turno$ + "'. Elige una casilla: ", jugada

' --- Actualiza el tablero ---
tablero$(jugada) = turno$

' --- Cambia el turno ---
IF turno$ = "X" THEN
    turno$ = "O"
ELSE
    turno$ = "X"
END IF

' --- Imprime el tablero de nuevo para ver el cambio ---
PRINT ""
PRINT "Tablero actualizado:"
PRINT " " + tablero$(1) + " | " + tablero$(2) + " | " + tablero$(3) + " "
PRINT "---|---|---"
PRINT " " + tablero$(4) + " | " + tablero$(5) + " | " + tablero$(6) + " "
PRINT "---|---|---"
PRINT " " + tablero$(7) + " | " + tablero$(8) + " | " + tablero$(9) + " "`
      }
    },
    {
      type: 'theory',
      title: "Paso 4: La Lógica de Victoria",
      content: `
Esta es la parte más inteligente del juego. Después de cada movimiento, tenemos que comprobar si el jugador actual ha ganado. Hay 8 formas de ganar en el TA-TE-TI:
*   3 filas horizontales (1-2-3, 4-5-6, 7-8-9)
*   3 columnas verticales (1-4-7, 2-5-8, 3-6-9)
*   2 diagonales (1-5-9, 3-5-7)

Para comprobar una fila, usamos un \`IF\` con el operador \`AND\`:
\`\`\`basic
IF tablero$(1) = tablero$(2) AND tablero$(2) = tablero$(3) THEN
    ganador$ = turno$ ' El jugador actual gana
END IF
\`\`\`
Esta línea comprueba si las casillas 1, 2 y 3 contienen el mismo símbolo (que no será un número, sino "X" o "O"). Si es así, declaramos un ganador y el bucle principal se detendrá.
      `
    },
    {
      type: 'code',
      title: "Desafío Final: El Juego Completo",
      content: `
Aquí tienes el código casi completo. Funciona, pero solo comprueba las filas horizontales para la victoria.

**Tu misión:** Añade la lógica que falta para comprobar las **3 columnas verticales** y las **2 diagonales**. Con esto, el juego estará terminado.
      `,
      exercise: {
        prompt: "Completa la lógica de victoria. Debes añadir las comprobaciones para las 3 columnas y las 2 diagonales. Si se encuentra un ganador, la variable `ganador$` debe actualizarse con el valor de `turno$`, y el juego terminará.",
        initialCode: `DIM tablero$(9)
tablero$(1) = "1"
tablero$(2) = "2"
tablero$(3) = "3"
tablero$(4) = "4"
tablero$(5) = "5"
tablero$(6) = "6"
tablero$(7) = "7"
tablero$(8) = "8"
tablero$(9) = "9"

turno$ = "X"
turnos_jugados = 0
ganador$ = ""

DO WHILE ganador$ = "" AND turnos_jugados < 9
    CLS
    PRINT " " + tablero$(1) + " | " + tablero$(2) + " | " + tablero$(3) + " "
    PRINT "---|---|---"
    PRINT " " + tablero$(4) + " | " + tablero$(5) + " | " + tablero$(6) + " "
    PRINT "---|---|---"
    PRINT " " + tablero$(7) + " | " + tablero$(8) + " | " + tablero$(9) + " "
    PRINT ""
    
    INPUT "Turno de '" + turno$ + "'. Elige una casilla: ", jugada
    
    IF jugada >= 1 AND jugada <= 9 THEN
      IF tablero$(jugada) <> "X" AND tablero$(jugada) <> "O" THEN
          tablero$(jugada) = turno$
          turnos_jugados = turnos_jugados + 1
          
          ' --- Comprobar victoria ---
          ' Filas (ya hechas)
          IF tablero$(1)=tablero$(2) AND tablero$(2)=tablero$(3) THEN
              ganador$ = turno$
          END IF
          IF tablero$(4)=tablero$(5) AND tablero$(5)=tablero$(6) THEN
              ganador$ = turno$
          END IF
          IF tablero$(7)=tablero$(8) AND tablero$(8)=tablero$(9) THEN
              ganador$ = turno$
          END IF
          ' Columnas (¡TU CÓDIGO AQUÍ!)
          ' Añade 3 IFs para las columnas (1,4,7), (2,5,8) y (3,6,9)

          ' Diagonales (¡TU CÓDIGO AQUÍ!)
          ' Añade 2 IFs para las diagonales (1,5,9) y (3,5,7)

          IF turno$ = "X" THEN
              turno$ = "O"
          ELSE
              turno$ = "X"
          END IF
      ELSE
          PRINT "¡Casilla ocupada! Pulsa Enter para continuar."
          INPUT temp$
      END IF
    ELSE
      PRINT "¡Jugada inválida! Pulsa Enter para continuar."
      INPUT temp$
    END IF
LOOP

' --- Mostrar resultado final ---
CLS
PRINT " " + tablero$(1) + " | " + tablero$(2) + " | " + tablero$(3) + " "
PRINT "---|---|---"
PRINT " " + tablero$(4) + " | " + tablero$(5) + " | " + tablero$(6) + " "
PRINT "---|---|---"
PRINT " " + tablero$(7) + " | " + tablero$(8) + " | " + tablero$(9) + " "
PRINT ""
IF ganador$ <> "" THEN
    PRINT "¡El ganador es " + ganador$ + "!"
ELSE
    PRINT "¡Es un empate!"
END IF
`,
        solutionCues: ['tablero$(1)=tablero$(4)', 'tablero$(2)=tablero$(5)', 'tablero$(3)=tablero$(6)', 'tablero$(1)=tablero$(5)', 'tablero$(3)=tablero$(5)'],
        solution: `DIM tablero$(9)
tablero$(1) = "1"
tablero$(2) = "2"
tablero$(3) = "3"
tablero$(4) = "4"
tablero$(5) = "5"
tablero$(6) = "6"
tablero$(7) = "7"
tablero$(8) = "8"
tablero$(9) = "9"

turno$ = "X"
turnos_jugados = 0
ganador$ = ""

DO WHILE ganador$ = "" AND turnos_jugados < 9
    CLS
    PRINT " " + tablero$(1) + " | " + tablero$(2) + " | " + tablero$(3) + " "
    PRINT "---|---|---"
    PRINT " " + tablero$(4) + " | " + tablero$(5) + " | " + tablero$(6) + " "
    PRINT "---|---|---"
    PRINT " " + tablero$(7) + " | " + tablero$(8) + " | " + tablero$(9) + " "
    PRINT ""
    
    INPUT "Turno de '" + turno$ + "'. Elige una casilla: ", jugada
    
    IF jugada >= 1 AND jugada <= 9 THEN
      IF tablero$(jugada) <> "X" AND tablero$(jugada) <> "O" THEN
          tablero$(jugada) = turno$
          turnos_jugados = turnos_jugados + 1
          
          ' --- Comprobar victoria ---
          ' Filas (ya hechas)
          IF tablero$(1)=tablero$(2) AND tablero$(2)=tablero$(3) THEN
              ganador$ = turno$
          END IF
          IF tablero$(4)=tablero$(5) AND tablero$(5)=tablero$(6) THEN
              ganador$ = turno$
          END IF
          IF tablero$(7)=tablero$(8) AND tablero$(8)=tablero$(9) THEN
              ganador$ = turno$
          END IF
          ' Columnas
          IF tablero$(1)=tablero$(4) AND tablero$(4)=tablero$(7) THEN
              ganador$ = turno$
          END IF
          IF tablero$(2)=tablero$(5) AND tablero$(5)=tablero$(8) THEN
              ganador$ = turno$
          END IF
          IF tablero$(3)=tablero$(6) AND tablero$(6)=tablero$(9) THEN
              ganador$ = turno$
          END IF
          ' Diagonales
          IF tablero$(1)=tablero$(5) AND tablero$(5)=tablero$(9) THEN
              ganador$ = turno$
          END IF
          IF tablero$(3)=tablero$(5) AND tablero$(5)=tablero$(7) THEN
              ganador$ = turno$
          END IF

          IF turno$ = "X" THEN
              turno$ = "O"
          ELSE
              turno$ = "X"
          END IF
      ELSE
          PRINT "¡Casilla ocupada! Pulsa Enter para continuar."
          INPUT temp$
      END IF
    ELSE
      PRINT "¡Jugada inválida! Pulsa Enter para continuar."
      INPUT temp$
    END IF
LOOP

' --- Mostrar resultado final ---
CLS
PRINT " " + tablero$(1) + " | " + tablero$(2) + " | " + tablero$(3) + " "
PRINT "---|---|---"
PRINT " " + tablero$(4) + " | " + tablero$(5) + " | " + tablero$(6) + " "
PRINT "---|---|---"
PRINT " " + tablero$(7) + " | " + tablero$(8) + " | " + tablero$(9) + " "
PRINT ""
IF ganador$ <> "" THEN
    PRINT "¡El ganador es " + ganador$ + "!"
ELSE
    PRINT "¡Es un empate!"
END IF
`
      }
    },
    {
      type: 'theory',
      title: "¡Partida Ganada!",
      content: `
¡Felicidades! Has programado un juego completo y funcional, aplicando todos los conceptos que has aprendido a lo largo de este curso: variables, entrada/salida, decisiones, bucles y, finalmente, arreglos.

Has visto cómo un problema aparentemente complejo como un juego puede descomponerse en partes lógicas y manejables. Esta es la habilidad más importante de un programador.

**Desafíos para el Sandbox:**
*   ¿Puedes mejorar el juego para que no se rompa si el jugador introduce un texto en lugar de un número?
*   ¿Puedes hacer que el juego pregunte si quieren jugar otra partida al final? (Pista: necesitarás otro bucle \`DO WHILE\` que envuelva todo el juego).

¡Ahora eres un verdadero desarrollador de juegos!
      `
    }
  ]
};