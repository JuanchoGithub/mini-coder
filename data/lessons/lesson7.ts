import { Lesson } from '../../types';

export const lesson7: Lesson = {
  id: 7,
  title: "Bucles I: Repeticiones Controladas (FOR)",
  description: "Aprende a repetir tareas un número exacto de veces, e incluso a contar hacia atrás. Descubre cómo los bucles evitan código repetitivo y hacen tus programas más eficientes y potentes.",
  steps: [
    {
      type: 'theory',
      title: "La pereza es la madre de la invención",
      content: `
Imagina que debes escribir 100 veces "No debo tirar papeles en clase" a mano. Sería tedioso, aburrido y propenso a errores como saltarte líneas o equivocarte en el conteo.

Las computadoras son expertas en tareas repetitivas y monótonas: pueden hacer lo mismo miles de veces sin cansarse ni equivocarse. Para eso, usamos **Bucles** (loops), estructuras que repiten bloques de código automáticamente.

Hay dos tipos principales de bucles:
- **Controlados por conteo (FOR):** Cuando sabes exactamente cuántas veces quieres repetir algo (esta lección).
- **Controlados por condición (WHILE/DO):** Cuando repites hasta que una condición cambie (lección futura).

¿Por qué son útiles? Evitan copiar-pegar código (que es error-prone y difícil de mantener). En el mundo real, bucles procesan listas de datos (ej: sumar notas de 100 estudiantes), generan gráficos o simulan animaciones.

Analogía: Un bucle es como una lavadora: Configuras cuántos ciclos (repeticiones), y ella hace el trabajo sin que intervengas en cada vuelta.
      `
    },
    {
      type: 'theory',
      title: "El Contador Automático: FOR...NEXT",
      content: `
El bucle \`FOR\` es como contratar a un robot contador que maneja el loop por ti, usando una variable temporal para rastrear las repeticiones.

Sintaxis básica:
\`\`\`basic
FOR variable = inicio TO fin [STEP paso]
  ' Código a repetir
NEXT variable
\`\`\`

Ejemplo:
\`\`\`basic
FOR i = 1 TO 5
  PRINT "Esta es la repetición número " + i
NEXT i
\`\`\`

Desglosemos paso a paso:
*   **\`FOR i = 1 TO 5\`**: Crea una variable temporal \`i\` (convención para "índice"), asigna valor inicial 1. El bucle repetirá hasta que \`i\` llegue a 5 (inclusivo por defecto).
*   **\`PRINT ...\`**: El cuerpo del bucle: código que se ejecuta en cada iteración (vuelta). Aquí, usa \`i\` para mostrar el número actual.
*   **\`NEXT i\`**: Marca el fin del cuerpo. La máquina suma 1 a \`i\` (paso default), chequea si \`i\` <= 5; si sí, vuelve al FOR; si no, sale del bucle y continúa el programa.

Output:
Esta es la repetición número 1
Esta es la repetición número 2
...
Esta es la repetición número 5

Nota: \`i\` es local al bucle; no la uses fuera sin redeclarar. Puedes usar cualquier nombre de variable (ej: contador), pero \`i\` es estándar.

Errores comunes: Olvidar NEXT (SYNTAX ERROR), o loop infinito si fin < inicio sin STEP negativo.
      `
    },
    {
      type: 'code',
      title: "Práctica: Bucle Básico",
      content: `
Prueba un FOR simple. Imprime "Hola" 3 veces, usando i en el mensaje.
      `,
      exercise: {
          prompt: "Haz que el programa imprima 'Hola número X' para X desde 1 hasta 3.",
          // FIX: Added closing backtick to initialCode template literal.
          initialCode: `' Escribe un bucle FOR que cuente de 1 a 3
' Dentro del bucle, imprime "Hola número " y el contador'`,
          expectedOutput: "Hola número 1\nHola número 2\nHola número 3"
      }
    },
    {
      type: 'theory',
      title: "Cambiando el Paso: STEP",
      content: `
Por defecto, \`FOR\` incrementa de 1 en 1 (STEP 1 implícito). Pero puedes personalizar el "paso" con **STEP** para contar de forma diferente, como de 2 en 2 o incluso hacia atrás.

Ejemplo: **Contar de 2 en 2 (pares):**
\`\`\`basic
PRINT "Números pares:"
FOR i = 2 TO 10 STEP 2
  PRINT i
NEXT i
' SALIDA: 2, 4, 6, 8, 10
\`\`\`

Ejemplo: **¡Contar hacia atrás! (regresiva):**
\`\`\`basic
PRINT "Cuenta regresiva..."
FOR i = 5 TO 1 STEP -1
  PRINT i
NEXT i
PRINT "¡DESPEGUE! 🚀"
' SALIDA: 5, 4, 3, 2, 1, ¡DESPEGUE!
\`\`\`

STEP puede ser positivo (aumenta), negativo (disminuye) o fraccional (ej: STEP 0.5 para 1, 1.5, 2...). Si STEP es negativo, asegúrate que inicio > fin.

Uso real: STEP 2 para procesar elementos pares en listas, o -1 para invertir secuencias.
      `
    },
    {
      type: 'code',
      title: "Práctica: STEP Personalizado",
      content: `
Usa STEP para imprimir múltiplos de 3 de 3 a 15.
      `,
      exercise: {
          prompt: "Crea un bucle que imprima los múltiplos de 3, desde 3 hasta 15.",
          // FIX: Added closing backtick to initialCode template literal.
          initialCode: `' Escribe un bucle FOR que vaya de 3 a 15,
' saltando de 3 en 3.
' Imprime el contador en cada paso.'`,
          expectedOutput: "3\n6\n9\n12\n15"
      }
    },
    {
      type: 'theory',
      title: "Uso Creativo: Dibujando con Bucles",
      content: `
Los bucles no solo sirven para contar o imprimir listas; son herramientas creativas para **construir** cosas acumulativamente, como patrones, figuras o datos procesados.

¿Recuerdas que el operador \`+\` une textos (concatenación de Lección 5)? Podemos usarlo dentro de un bucle para acumular resultados en una variable.

Ejemplo: Construir una pirámide de estrellas:
\`\`\`basic
LET linea$ = ""  ' Inicializa vacía
FOR i = 1 TO 5
    linea$ = linea$ + "*"  ' Acumula una * por iteración
    PRINT linea$
NEXT i
\`\`\`

Output:
*
**
***
****
*****

Esto enseña acumulación: En cada vuelta, modificas una variable fuera del bucle (linea$) y la usas.

Otro ejemplo: Suma de números del 1 al 10:
\`\`\`basic
LET suma = 0
FOR i = 1 TO 10
    suma = suma + i
NEXT i
PRINT "Suma: " + suma  ' 55
\`\`\`

Consejo: Inicializa variables acumuladoras fuera del bucle (ej: suma=0) para que persistan entre iteraciones.
      `
    },
    {
      type: 'code',
      title: "Práctica: Patrón Acumulativo",
      content: `
Crea un triángulo inverso: ***** a *.
      `,
      exercise: {
          prompt: "Crea un triángulo de estrellas invertido, desde 5 estrellas hasta 1.",
          // FIX: Added closing backtick to initialCode template literal.
          initialCode: `' Este desafío requiere dos bucles, uno dentro de otro (anidado).
' Bucle exterior: cuenta hacia atrás de 5 a 1 (usa STEP -1).
' Bucle interior: construye una línea de texto con tantas estrellas como indique el contador del bucle exterior.'`,
          expectedOutput: "*****\n****\n***\n**\n*"
      }
    },
    {
      type: 'theory',
      title: "Errores Comunes y Depuración",
      content: `
Bucles pueden ser tricky: 
- **Loop infinito:** Si STEP positivo pero inicio > fin, o condición mal seteada – el programa "cuelga". Solución: Chequea límites.
- **Off-by-one:** Empieza en 0 o 1? Incluye fin? Prueba con pequeño rango.
- **Variable no inicializada:** Para acumuladores, setea a 0 o "" antes.
- **Anidación:** Bucles dentro de bucles (ej: para matrices) – indenta bien.

Depura: Agrega PRINT i en el cuerpo para ver iteraciones. Usa rangos pequeños primero.
      `
    },
    {
      type: 'code',
      title: "Ejercicio: Lanzamiento del Cohete",
      content: "Vamos a programar el lanzamiento de un cohete. Necesita una cuenta regresiva de 10 a 1. Al final, debe imprimir '¡Despegue!'. ¡Necesitarás usar `STEP -1`! Agrega un delay si posible, o solo el conteo.",
      exercise: {
        prompt: "Escribe un programa completo para la cuenta regresiva de un cohete, desde 10 hasta 1, con un mensaje final de '¡DESPEGUE! 🚀'.",
        // FIX: Added closing backtick to initialCode template literal.
        initialCode: `' Escribe un programa para una cuenta regresiva.
' 1. Imprime "Iniciando secuencia de lanzamiento..."
' 2. Usa un bucle FOR para contar de 10 a 1 (con STEP -1).
' 3. Dentro del bucle, imprime "Segundos restantes: " y el contador.
' 4. Después del bucle, imprime "¡DESPEGUE! 🚀"'`,
        expectedOutput: "Iniciando secuencia de lanzamiento...\nSegundos restantes: 10\nSegundos restantes: 9\nSegundos restantes: 8\nSegundos restantes: 7\nSegundos restantes: 6\nSegundos restantes: 5\nSegundos restantes: 4\nSegundos restantes: 3\nSegundos restantes: 2\nSegundos restantes: 1\n¡DESPEGUE! 🚀"
      }
    },
    {
      type: 'theory',
      title: "Resumen",
      content: `
*   **Bucles FOR:** Repiten código un número fijo de veces, usando una variable contador.
*   **Sintaxis:** FOR var = inicio TO fin [STEP paso] ... NEXT var.
*   **STEP:** Personaliza incremento (positivo, negativo para regresiva, fraccional).
*   **Acumulación:** Usa variables fuera para construir resultados iterativamente (sumas, patrones).
*   Errores: Infinitos, off-by-one; depura con PRINTs y pruebas pequeñas.
*   Aplicaciones: Procesar listas, generar tablas, simulaciones (ej: física, juegos).

¡Con FOR, automatizas repeticiones! En la siguiente lección, veremos WHILE para bucles condicionales, donde no sabes cuántas vueltas заранее.
      `
    }
  ]
};