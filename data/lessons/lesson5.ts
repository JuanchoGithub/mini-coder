import { Lesson } from '../../types';

export const lesson5: Lesson = {
  id: 5,
  title: "El Taller de Datos (Operaciones)",
  description: "Tu computadora es una calculadora superpoderosa. Aprende a sumar números... ¡y textos!",
  steps: [
    {
      type: 'theory',
      title: "Más que una caja fuerte",
      content: `
En la lección anterior vimos que las variables son cajas para guardar datos. Pero una computadora no sirve de mucho si solo guarda cosas. ¡Necesitamos que trabaje con ellas!

Transformar datos se llama **Operar**.
`
    },
    {
      type: 'theory',
      title: "Operadores Matemáticos",
      content: `
Para los números, la computadora usa símbolos que quizás ya conozcas, con algunas pequeñas diferencias:

*   Suma: \`+\` (Ej: \`5 + 5\` → \`10\`)
*   Resta: \`-\` (Ej: \`10 - 2\` → \`8\`)
*   Multiplicación: \`*\` (Usamos asterisco, no la 'x'. Ej: \`3 * 4\` → \`12\`)
*   División: \`/\` (Usamos la barra. Ej: \`20 / 2\` → \`10\`)

Puedes usarlos directamente en un \`PRINT\` o guardar el resultado en una variable:
\`puntos = 10 + 5\`
`
    },
    {
      type: 'code',
      title: "Práctica: Calculadora veloz",
      content: `
Prueba estos cálculos. Fíjate cómo la computadora respeta el orden matemático (primero multiplica/divide, luego suma/resta), a menos que uses paréntesis \`()\`.
`,
      exercise: {
          prompt: "Intenta predecir los resultados antes de ejecutar. ¿Qué pasa con la última línea?",
          initialCode: `PRINT 10 + 5 * 2
PRINT (10 + 5) * 2
PRINT 100 / 2 / 5`,
          expectedOutput: "20" // Expecting at least the first result to verify they ran it
      }
    },
    {
      type: 'theory',
      title: "Operadores de Comparación",
      content: `
Además de las matemáticas, podemos comparar valores. Estas operaciones son la base de la toma de decisiones (Lección 3 y 6) y **siempre** devuelven \`1\` (Verdadero) o \`0\` (Falso).

| Operador | Descripción | Ejemplo | Resultado |
| :---: | :--- | :--- | :---: |
| \`=\` | ¿Son iguales? | \`10 = 10\` | \`1\` (Verdadero) |
| \`<>\` | ¿Son diferentes? | \`10 <> 5\` | \`1\` (Verdadero) |
| \`>\` | ¿Es el de la izq. mayor que el de la der.? | \`10 > 5\` | \`1\` (Verdadero) |
| \`<\` | ¿Es el de la izq. menor que el de la der.?| \`10 < 5\` | \`0\` (Falso) |
| \`>=\` | ¿Es mayor o igual? | \`10 >= 10\` | \`1\` (Verdadero) |
| \`<=\` | ¿Es menor o igual? | \`10 <= 5\` | \`0\` (Falso) |
`
    },
    {
      type: 'theory',
      title: "El '+' Camaleón",
      content: `
El símbolo \`+\` es especial. Se comporta diferente según qué tipo de dato le des.

*   Si sumas **Números**, hace matemáticas: \`2 + 2\` → \`4\`
*   Si sumas **Texto** (Strings), los une (concatena): \`"2" + "2"\` → \`"22"\`

**¡Cuidado!** Si intentas hacer matemáticas con texto (ej: \`"hola" * 5\`), la computadora te dará un error porque no sabe cómo multiplicar palabras.
`
    },
    {
      type: 'theory',
      title: "Un poco de historia",
      content: `
Las primeras computadoras eran literalmente calculadoras gigantes diseñadas para la guerra (calcular trayectorias de cañones).

Fue **Ada Lovelace**, la primera programadora de la historia en el siglo XIX, quien se dio cuenta de que si asignábamos otros significados a los números (como notas musicales o letras), ¡estas máquinas podrían componer música o escribir poesía!
`
    },
    {
      type: 'code',
      title: "Ejercicio: La Calculadora de Edad",
      content: `
Vamos a crear un programa útil. Le pedirás al usuario su edad en años, y la computadora calculará cuántos meses aproximados ha vivido.

Recuerda:
1. \`INPUT\` para pedir la edad (número).
2. Una variable nueva que sea \`edad * 12\`.
3. \`PRINT\` para mostrar el resultado mezclado con texto.
`,
      exercise: {
        prompt: "Completa el código para calcular y mostrar los meses vividos.",
        initialCode: `INPUT "¿Cuántos años tienes? ", anios
meses = anios * 12
PRINT "¡Wow! Has vivido aproximadamente " + meses + " meses."`,
        solutionCues: ['*', '12', 'PRINT']
      }
    }
  ]
};