
import { Lesson } from '../../types';

export const lesson7: Lesson = {
  id: 7,
  title: "Bucles I: Repeticiones Controladas (FOR)",
  description: "Aprende a repetir tareas un número exacto de veces, e incluso a contar hacia atrás.",
  steps: [
    {
      type: 'theory',
      title: "La pereza es la madre de la invención",
      content: `
Imagina que debes escribir 100 veces "No debo tirar papeles en clase". Sería tedioso y propenso a errores.
Las computadoras son expertas en tareas repetitivas. Para eso, usamos **Bucles** (loops).

Hay dos tipos principales de bucles. En esta lección veremos el primero: el que se usa cuando sabes **exactamente cuántas veces** quieres repetir algo.
      `
    },
    {
      type: 'theory',
      title: "El Contador Automático: FOR...NEXT",
      content: `
El bucle \`FOR\` es como contratar a un robot para que cuente por ti.

\`\`\`basic
FOR i = 1 TO 5
  PRINT "Esta es la repetición número " + i
NEXT i
\`\`\`
Desglosemos esto:
*   **\`FOR i = 1 TO 5\`**: Le dices a la computadora: "Crea una variable temporal llamada \`i\` (por índice) y asígnale el valor \`1\`. Repite el siguiente bloque de código hasta que \`i\` llegue a \`5\`".
*   **\`PRINT ...\`**: Este es el código que se repetirá en cada "vuelta" del bucle.
*   **\`NEXT i\`**: Le dice a la computadora: "Fin de la vuelta. Suma 1 a \`i\` y vuelve al \`FOR\`. Si \`i\` ya superó el 5, entonces termina el bucle y continúa con el resto del programa".
      `
    },
    {
      type: 'theory',
      title: "Cambiando el Paso: STEP",
      content: `
Por defecto, \`FOR\` cuenta de uno en uno. Pero podemos cambiar eso con la palabra clave **STEP** (paso).

**Contar de 2 en 2:**
\`\`\`basic
PRINT "Números pares:"
FOR i = 2 TO 10 STEP 2
  PRINT i
NEXT i
' SALIDA: 2, 4, 6, 8, 10
\`\`\`

**¡Contar hacia atrás!**
\`\`\`basic
PRINT "Cuenta regresiva..."
FOR i = 5 TO 1 STEP -1
  PRINT i
NEXT i
PRINT "¡DESPEGUE! 🚀"
' SALIDA: 5, 4, 3, 2, 1, ¡DESPEGUE!
\`\`\`
`
    },
    {
      type: 'theory',
      title: "Uso Creativo: Dibujando con Bucles",
      content: `
Los bucles no solo sirven para contar. Sirven para **construir** cosas.
¿Recuerdas que el operador \`+\` une textos? Podemos usar eso dentro de un bucle para crear patrones.

\`\`\`basic
linea$ = ""
FOR i = 1 TO 5
    linea$ = linea$ + "*"
    PRINT linea$
NEXT i
\`\`\`
Este código producirá una pirámide:
\`\`\`
*
**
***
****
*****
\`\`\`
En cada vuelta, añadimos una estrella más a nuestra variable \`linea$\` y la imprimimos.
`
    },
    {
      type: 'code',
      title: "Ejercicio: Lanzamiento del Cohete",
      content: "Vamos a programar el lanzamiento de un cohete. Necesita una cuenta regresiva de 10 a 1. Al final, debe imprimir '¡Despegue!'. ¡Necesitarás usar `STEP -1`!",
      exercise: {
        prompt: "Crea un bucle FOR que cuente hacia atrás desde 10 y luego imprima el mensaje de despegue.",
        initialCode: `PRINT "Iniciando secuencia de lanzamiento..."

' --- TU BUCLE VA AQUÍ ---
' Debe contar de 10 a 1, usando STEP -1
' En cada vuelta, debe imprimir el número del contador.


PRINT "¡DESPEGUE! 🚀"`,
        expectedOutput: "¡DESPEGUE! 🚀",
        solutionCues: ['FOR', 'TO', 'STEP', '-1', 'NEXT']
      }
    }
  ]
};
