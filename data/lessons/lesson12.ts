
import { Lesson } from '../../types';

export const lesson12: Lesson = {
  id: 12,
  title: "Extra: Introducción a los Arreglos",
  description: "Aprende a manejar listas de datos. Descubre cómo guardar múltiples valores en una sola variable para organizar tu código y resolver problemas más complejos.",
  steps: [
    {
      type: 'theory',
      title: "El Problema de las Listas",
      content: `
Imagina que quieres guardar los nombres de 5 amigos. Con lo que sabes hasta ahora, harías esto:

\`\`\`basic
nombre1$ = "Ana"
nombre2$ = "Luis"
nombre3$ = "Eva"
nombre4$ = "Juan"
nombre5$ = "Sara"
\`\`\`

Funciona, pero es terrible. ¿Y si fueran 100 amigos? ¿O si quisieras imprimir todos los nombres? Tendrías que escribir 100 líneas de \`PRINT\`. ¡Necesitamos una mejor manera!

La solución son los **Arreglos** (Arrays). Un arreglo es una **variable especial que puede contener una lista de valores**. En lugar de 5 variables separadas, tienes una sola variable que actúa como un casillero con múltiples compartimentos numerados.
      `
    },
    {
      type: 'theory',
      title: "DIM: Creando un Casillero",
      content: `
Para crear un arreglo, usamos el comando \`DIM\` (que significa "dimensión"). Le dices a la computadora el nombre del arreglo y cuántos "compartimentos" o "casillas" necesitas.

\`DIM nombre_del_arreglo(tamaño)\`

Por ejemplo, para guardar los 5 nombres de nuestros amigos:
\`\`\`basic
DIM amigos$(5)
\`\`\`
Esto crea un arreglo llamado \`amigos$\` con 5 espacios. El \`$\` al final, como con las variables normales, nos indica que guardará texto.

**Índices: La Clave de Cada Casilla**
Cada compartimento en el arreglo tiene un número, llamado **índice**, que usamos para acceder a él. En MiniQB, los índices empiezan en **1**.

Para guardar un valor, especificas el índice entre paréntesis:
\`\`\`basic
amigos$(1) = "Ana"
amigos$(3) = "Eva"
\`\`\`

Y para leer un valor, haces lo mismo:
\`\`\`basic
PRINT "El primer amigo es: " + amigos$(1)
\`\`\`
      `
    },
    {
      type: 'code',
      title: "Práctica: Mi Primera Lista",
      content: `
Vamos a crear una lista de compras. Declara un arreglo, guarda algunos productos en él y luego imprime uno de ellos.
      `,
      exercise: {
        prompt: "Crea un arreglo `compras$` de 3 elementos. Guarda 'Leche' en la primera posición y 'Pan' en la tercera. Luego, imprime el valor de la tercera posición.",
        initialCode: `' 1. Declara un arreglo llamado compras$ con 3 espacios.

' 2. Asigna "Leche" a la primera casilla (índice 1).

' 3. Asigna "Pan" a la tercera casilla (índice 3).

' 4. Imprime el valor de la tercera casilla.
`,
        expectedOutput: "Pan",
        solutionCues: ['DIM', 'compras$(1)', 'compras$(3)', 'PRINT'],
        solution: `DIM compras$(3)
compras$(1) = "Leche"
compras$(3) = "Pan"
PRINT compras$(3)`
      }
    },
    {
      type: 'theory',
      title: "El Dúo Dinámico: Arreglos y Bucles FOR",
      content: `
La verdadera magia de los arreglos aparece cuando los combinas con bucles \`FOR\`. Como los índices son números, ¡podemos usar la variable de un bucle \`FOR\` como índice!

Esto nos permite recorrer (o "iterar") todo el arreglo con muy poco código.

**Ejemplo: Imprimir toda la lista de amigos**
\`\`\`basic
DIM amigos$(3)
amigos$(1) = "Ana"
amigos$(2) = "Luis"
amigos$(3) = "Eva"

PRINT "Mis amigos son:"
FOR i = 1 TO 3
    PRINT "- " + amigos$(i)
NEXT i
\`\`\`
**¿Qué está pasando aquí?**
1. El bucle empieza con \`i = 1\`. Se ejecuta \`PRINT amigos$(1)\` ("Ana").
2. \`NEXT i\`: ahora \`i = 2\`. Se ejecuta \`PRINT amigos$(2)\` ("Luis").
3. \`NEXT i\`: ahora \`i = 3\`. Se ejecuta \`PRINT amigos$(3)\` ("Eva").
4. El bucle termina. ¡Hemos impreso toda la lista con solo 3 líneas de código!
      `
    },
    {
      type: 'code',
      title: "Práctica: Recorriendo con un Bucle",
      content: `
Vamos a usar un bucle \`FOR\` para imprimir el contenido de un arreglo que ya está lleno.
      `,
      exercise: {
        prompt: "Completa el código. Usa un bucle FOR para imprimir cada uno de los planetas en una línea nueva.",
        initialCode: `DIM planetas$(4)
planetas$(1) = "Mercurio"
planetas$(2) = "Venus"
planetas$(3) = "Tierra"
planetas$(4) = "Marte"

PRINT "Los primeros 4 planetas son:"
' Escribe aquí un bucle FOR que vaya de 1 a 4
' e imprima cada elemento de planetas$(i).
`,
        expectedOutput: "Los primeros 4 planetas son:\nMercurio\nVenus\nTierra\nMarte",
        solutionCues: ['FOR', 'PRINT', 'planetas$(i)'],
        solution: `DIM planetas$(4)
planetas$(1) = "Mercurio"
planetas$(2) = "Venus"
planetas$(3) = "Tierra"
planetas$(4) = "Marte"

PRINT "Los primeros 4 planetas son:"
FOR i = 1 TO 4
    PRINT planetas$(i)
NEXT i`
      }
    },
    {
      type: 'theory',
      title: "Resumen y Siguientes Pasos",
      content: `
¡Excelente! Has aprendido una de las herramientas más poderosas de la programación.

*   **Arreglos:** Son como variables con múltiples compartimentos, perfectas para guardar listas de datos.
*   **\`DIM\`**: Es el comando que usamos para crear un arreglo y definir su tamaño.
*   **Índices:** Son los números que usamos para acceder a cada compartimento del arreglo (en MiniQB empiezan en 1).
*   **Arreglos + Bucles \`FOR\`:** La combinación perfecta para procesar grandes cantidades de datos con muy poco código.

Ahora que sabes cómo manejar listas, estás listo para construir programas mucho más complejos. En la siguiente lección, usaremos este nuevo superpoder para construir un juego clásico desde cero: **TA-TE-TI (Tic-Tac-Toe)**.
      `
    }
  ]
};