
import { Lesson } from '../../types';

export const lesson5: Lesson = {
  id: 5,
  title: "El Taller de Datos (Operaciones)",
  description: "Tu computadora es una calculadora superpoderosa. Aprende a sumar números... ¡y textos! Descubre cómo transformar datos con operadores para hacer cálculos y comparaciones útiles.",
  steps: [
    {
      type: 'theory',
      title: "Más que una caja fuerte",
      content: `
En la lección anterior, vimos que las variables son como cajas para guardar datos temporalmente. Pero una computadora no sirve de mucho si solo almacena cosas sin hacer nada con ellas. ¡Necesitamos que trabaje, procese y transforme esa información!

Transformar datos se llama **Operar**. Usamos **operadores** (símbolos especiales) para realizar acciones como sumar, comparar o unir datos. Esto es el corazón de los cálculos en programación, desde apps financieras hasta juegos.

Analogía: Imagina las variables como ingredientes en una cocina. Los operadores son las herramientas (cuchillo para cortar, batidora para mezclar) que los convierten en una receta completa. Sin operadores, solo tienes ingredientes crudos.
      `
    },
    {
      type: 'theory',
      title: "Operadores Matemáticos",
      content: `
Para los números, la computadora usa símbolos que quizás ya conozcas de matemáticas escolares, con algunas pequeñas diferencias para adaptarse al teclado:

*   Suma: \`+\` (Ej: \`5 + 5\` → \`10\`) – Útil para acumular scores o totales.
*   Resta: \`-\` (Ej: \`10 - 2\` → \`8\`) – Para deducciones, como restar daños en un juego.
*   Multiplicación: \`*\` (Usamos asterisco en vez de 'x' para evitar confusiones con variables. Ej: \`3 * 4\` → \`12\`) – Para escalar valores, como calcular áreas.
*   División: \`/\` (Usamos la barra forward. Ej: \`20 / 2\` → \`10\`) – Para promedios o repartos.

Puedes usarlos directamente en un \`PRINT\` para ver resultados inmediatos, o guardar el resultado en una variable para reutilizarlo:
\`LET puntos = 10 + 5  ' puntos ahora es 15\`

Importante: La división con enteros puede truncar decimales (ej: 5 / 2 = 2 en algunos lenguajes), pero en MiniQB soporta floats. Siempre prueba.

Orden de operaciones (PEMDAS): Paréntesis, Exponentes (no cubierto aún), Multiplicación/División, Suma/Resta. Usa \`()\` para forzar orden: \` (2 + 3) * 4 = 20 \`, no \`2 + 3 * 4 = 14\`.
      `
    },
    {
      type: 'code',
      title: "Práctica: Calculadora veloz",
      content: `
Prueba estos cálculos. Fíjate cómo la computadora respeta el orden matemático (primero multiplica/divide, luego suma/resta), a menos que uses paréntesis \`()\` para agrupar.

Experimenta: Cambia números y ve qué pasa si divides por cero (¡error semántico!).
      `,
      exercise: {
          prompt: "Añade una cuarta línea que calcule el resultado de (50 - 10) / 4. El resultado debería ser 10. Luego, agrega una para 100 / (5 + 5).",
          initialCode: `PRINT 10 + 5 * 2 ' Resultado: 20 (multiplica primero)
PRINT (10 + 5) * 2 ' Resultado: 30 (paréntesis cambian orden)
PRINT 100 / 2 / 5 ' Resultado: 10 (divide secuencial)

' Añade tus cálculos aquí debajo'`,
          expectedOutput: "20\n30\n10\n10\n10",
          solution: `PRINT 10 + 5 * 2
PRINT (10 + 5) * 2
PRINT 100 / 2 / 5
PRINT (50 - 10) / 4
PRINT 100 / (5 + 5)`
      }
    },
    {
      type: 'theory',
      title: "Operadores de Comparación",
      content: `
Además de las matemáticas puras, podemos comparar valores para tomar decisiones (base para condicionales en lección 6). Estas operaciones son booleanas y **siempre** devuelven \`1\` (Verdadero) o \`0\` (Falso), conectando con la lógica de lección 3.

| Operador | Descripción | Ejemplo | Resultado | Uso Real |
| :---: | :--- | :--- | :---: | :--- |
| \`=\` | ¿Son iguales? | \`10 = 10\` | \`1\` (Verdadero) | Chequear si password coincide. |
| \`<>\` | ¿Son diferentes? | \`10 <> 5\` | \`1\` (Verdadero) | Ver si inventario cambió. |
| \`>\` | ¿Es el de la izquierda mayor que el de la derecha? | \`10 > 5\` | \`1\` (Verdadero) | Si edad > 18, acceso adulto. |
| \`<\` | ¿Es el de la izquierda menor que el de la derecha? | \`10 < 5\` | \`0\` (Falso) | Si temperatura < 0, alerta frío. |
| \`>=\` | ¿Es mayor o igual? | \`10 >= 10\` | \`1\` (Verdadero) | Si score >= 100, gana bonus. |
| \`<=\` | ¿Es menor o igual? | \`10 <= 5\` | \`0\` (Falso) | Si stock <= 10, reordenar. |

Cuidado: \`=\` es para comparación, no asignación (usa LET o = en contextos para asignar). En strings, compara alfabéticamente (ej: "A" < "B" = 1).
      `
    },
    {
      type: 'code',
      title: "Práctica: Comparaciones",
      content: `
Usa PRINT para ver resultados booleanos. Predice antes de ejecutar.
      `,
      exercise: {
          prompt: "Agrega líneas para comparar si 15 <= 20 (1) y si 'A' < 'B' (1, comparación ASCII).",
          initialCode: `PRINT 10 = 10 ' 1
PRINT 5 > 10 ' 0

' Agrega aquí'`,
          expectedOutput: "1\n0\n1\n1",
          solution: `PRINT 10 = 10
PRINT 5 > 10
PRINT 15 <= 20
PRINT "A" < "B"`
      }
    },
    {
      type: 'theory',
      title: "El '+' Camaleón",
      content: `
El símbolo \`+\` es especial y polimórfico: Se comporta diferente según el tipo de dato, mostrando el poder del overloading en programación.

*   Si sumas **Números**, hace matemáticas: \`2 + 2\` → \`4\` (suma aritmética).
*   Si sumas **Texto** (Strings), los une (concatena): \`"2" + "2"\` → \`"22"\` (no 4, sino texto pegado).

Ejemplos mixtos: \`"Edad: " + 25\` → \`"Edad: 25"\` (convierte número a string automáticamente en MiniQB).

**¡Cuidado!** Si intentas operaciones inválidas como \`"hola" * 5\`, la computadora te dará un error porque no sabe cómo multiplicar palabras (aunque en algunos lenguajes como Python, repite strings). Siempre chequea tipos para evitar bugs semánticos.
      `
    },
    {
      type: 'theory',
      title: "Un poco de historia",
      content: `
Las primeras computadoras eran literalmente calculadoras gigantes diseñadas para la guerra (calcular trayectorias de cañones en la WWII, como ENIAC en 1945).

Fue **Ada Lovelace**, la primera programadora de la historia en el siglo XIX (colaborando con Charles Babbage en la Máquina Analítica), quien se dio cuenta de que si asignábamos otros significados a los números (como notas musicales, colores o letras), ¡estas máquinas podrían componer música, generar arte o incluso escribir poesía! Ada predijo la IA creativa 100 años antes.

Hoy, operadores matemáticos son universales en lenguajes, pero su poder se extiende a datos no-numéricos gracias a ideas como las de Ada.
      `
    },
    {
      type: 'code',
      title: "Ejercicio: La Calculadora de Edad",
      content: `
Vamos a crear un programa útil. Le pedirás al usuario su edad en años, y la computadora calculará cuántos meses aproximados ha vivido (años * 12), y quizás días (meses * 30, aproximado).

Recuerda:
1. \`INPUT\` para pedir la edad (número, sin $).
2. Variables nuevas para cálculos (ej: meses = anios * 12).
3. \`PRINT\` para mostrar resultados mezclado con texto (usa + para concatenar).
      `,
      exercise: {
        prompt: "Completa el código. Debes calcular los meses (años * 12) y guardarlos en la variable 'meses' para que el programa funcione. Agrega días aproximados (meses * 30).",
        initialCode: `INPUT "¿Cuántos años tienes? ", anios

' ↓↓↓ Escribe aquí las líneas que faltan ↓↓↓
' meses = anios * 12
' dias = meses * 30  ' Aproximado

PRINT "¡Wow! Has vivido aproximadamente " + meses + " meses y " + dias + " días."`,
        solutionCues: ['*', '12', '30', 'PRINT'],
        solution: `INPUT "¿Cuántos años tienes? ", anios

meses = anios * 12
dias = meses * 30

PRINT "¡Wow! Has vivido aproximadamente " + meses + " meses y " + dias + " días."`
      }
    },
    {
      type: 'theory',
      title: "Resumen",
      content: `
*   **Operadores Matemáticos:** +, -, *, / para cálculos numéricos; respeta PEMDAS, usa () para control.
*   **Comparadores:** =, <>, >, <, >=, <= devuelven 1/0 para lógica booleana.
*   **+ Especial:** Suma números o concatena strings; chequea tipos para evitar errores.
*   Historia: De calculadoras de guerra a herramientas creativas, gracias a pioneros como Ada Lovelace.
*   Aplicaciones: Calculadoras, juegos (scores), finanzas (intereses), ciencia (fórmulas).

¡Con operaciones, tus programas calculan! En la siguiente lección, usaremos comparadores en IF para decisiones inteligentes basadas en datos.
      `
    }
  ]
};