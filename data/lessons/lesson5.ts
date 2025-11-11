
import { Lesson } from '../../types';

export const lesson5: Lesson = {
  id: 5,
  title: "Variables",
  description: "Las cajas de la memoria.",
  steps: [
    {
      type: 'theory',
      title: "Las Cajas con Etiqueta",
      content: `
Imagina que la memoria de la computadora es un almacén gigante lleno de cajas vacías.
Para usar una caja, le pones una etiqueta (un nombre) y guardas algo dentro.

\`puntos = 100\`
Aquí, buscamos una caja, le pegamos la etiqueta "puntos" y guardamos el número 100 dentro.
      `
    },
    {
      type: 'theory',
      title: "¿Texto o Números?",
      content: `
Las computadoras son ordenadas. No les gusta mezclar peras con manzanas.
En nuestro lenguaje MiniQB, usamos un truco para diferenciarlas:

*   **Cajas para Texto:** Su etiqueta termina con el signo **$** (Piensa en la 'S' de String/Texto). Ej: \`nombre$ = "Ana"\`
*   **Cajas para Números:** Su etiqueta NO tiene signo especial. Ej: \`edad = 12\`
      `
    },
    {
      type: 'code',
      title: "Reasignación (Cambiar el contenido)",
      content: `
¿Por qué se llaman "variables"? ¡Porque su valor puede variar!
Puedes sacar lo que había en una caja y meter algo nuevo. Lo viejo se pierde para siempre.
      `,
      exercise: {
        prompt: "¿Qué número mostrará al final? Sigue el código con tu dedo antes de ejecutar.",
        initialCode: `puntos = 100
PRINT "Empiezas con: " + puntos
puntos = 200
PRINT "Ahora tienes: " + puntos
puntos = puntos + 50
PRINT "¡Bono! Total final: " + puntos`,
        expectedOutput: "¡Bono! Total final: 250"
      }
    }
  ]
};
