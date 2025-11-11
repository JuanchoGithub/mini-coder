
import { Lesson } from '../../types';

export const lesson1: Lesson = {
  id: 1,
  title: "Las Bases",
  description: "¿Qué es realmente programar? Desmitificando la comunicación humano-máquina.",
  steps: [
    {
      type: 'theory',
      title: "Bienvenidos al mundo real",
      content: `
Mucha gente piensa que programar es una actividad reservada para genios matemáticos encerrados en sótanos oscuros con pantallas llenas de texto verde cayendo al estilo Matrix.

**Nada más lejos de la realidad.**

Programar es, esencialmente, **resolver problemas**. Es el arte de dividir una tarea grande y compleja en pasos tan pequeños y tontos que hasta una máquina pueda entenderlos.
      `
    },
    {
      type: 'theory',
      title: "El Genio Tonto",
      content: `
Imagina que tienes un asistente superpoderoso. Puede realizar millones de cálculos por segundo, nunca se cansa y nunca olvida nada. Suena genial, ¿verdad?

Hay un problema: es extremadamente literal y no tiene sentido común.
Si le dices "ve a la tienda y si hay huevos, trae seis", podría volver con 6 litros de leche porque "había huevos" en la tienda.

Ese asistente es la computadora. Programar es aprender a darle órdenes tan precisas que no pueda malinterpretarlas.
      `
    },
    {
      type: 'theory',
      title: "La barrera del idioma",
      content: `
Las computadoras no hablan español ni inglés. En su nivel más profundo, solo entienden pulsos eléctricos: encendido (1) o apagado (0). Esto es el **código binario**.

¿Te imaginas tener que decirle "Hola" a tu computadora usando solo ceros y unos? Sería algo así:
\`01001000 01101111 01101100 01100001\`

¡Imposible trabajar así! Por eso inventamos los **Lenguajes de Programación**. Son idiomas intermedios, más parecidos al inglés, que nosotros podemos leer y que un programa especial (llamado traductor, compilador o intérprete) convierte a ceros y unos por nosotros.
      `
    },
    {
      type: 'code',
      title: "Tu primera palabra",
      content: `
Vamos a probar nuestro lenguaje, llamado **MiniQB**. Es un lenguaje diseñado para ser fácil de leer.

La orden más básica en casi cualquier lenguaje es la que le dice a la computadora: "Muestra esto en la pantalla". Aquí usamos la palabra \`PRINT\` (imprimir en inglés).

**Tu misión:** Haz que la computadora te salude. Escribe exactamente el código de abajo y pulsa "Ejecutar".
      `,
      exercise: {
          prompt: "Escribe esto en el editor:",
          initialCode: 'PRINT "¡Hola Mundo!"',
          expectedOutput: "¡Hola Mundo!"
      }
    },
    {
      type: 'theory',
      title: "La importancia de la Sintaxis",
      content: `
¿Notaste las comillas \`"\` en el ejercicio anterior?
En español, si te olvidas de un acento, la gente te entiende igual. La computadora NO.

A las reglas estrictas de cómo se debe escribir un lenguaje de programación las llamamos **Sintaxis**.
*   \`PRINT "Hola"\` ✅ (La computadora entiende que "Hola" es texto porque está entre comillas).
*   \`PRINT Hola\` ❌ (La computadora se confunde: ¿Hola es un comando? ¿Una variable? ¡Error!).
      `
    },
    {
      type: 'code',
      title: "Rompiendo cosas a propósito",
      content: `
Parte fundamental de aprender a programar es perder el miedo a los errores. Los vas a cometer TODO EL TIEMPO, incluso cuando seas experto.

Un mensaje de error no es un castigo, es la computadora pidiéndote ayuda porque no entendió algo.

Intenta escribir mal el comando a propósito (por ejemplo, \`PRNT\` en lugar de \`PRINT\`) y mira qué pasa.
      `,
      exercise: {
          prompt: "Genera tu primer error. Escribe 'PRINT' mal y ejecuta.",
          initialCode: 'PRNT "Esto va a fallar"',
          expectedOutput: "$$ERROR$$"
      }
    },
    {
      type: 'code',
      title: "El programa es una secuencia",
      content: `
Un programa rara vez es una sola línea. Generalmente es una lista de instrucciones que la computadora lee **de arriba hacia abajo**, una por una.

Si escribes tres comandos \`PRINT\`, aparecerán tres líneas en la pantalla, en ese exacto orden.
      `,
      exercise: {
          prompt: "Escribe tres líneas diferentes usando PRINT para contar una mini-historia.",
          initialCode: `PRINT "Había una vez..."
PRINT "un programador novato..."
PRINT "¡que se convirtió en experto!"`,
          solutionCues: ['PRINT', 'PRINT', 'PRINT']
      }
    },
    {
      type: 'theory',
      title: "Resumen",
      content: `
*   **Programar** es dar instrucciones precisas para resolver problemas.
*   Usamos **Lenguajes de Programación** para no tener que hablar en binario (1s y 0s).
*   La **Sintaxis** son las reglas de escritura y ¡son estrictas!
*   Los **Errores** son normales y nos ayudan a aprender.
*   Los programas se ejecutan en **orden**, de arriba a abajo.

¿Listo para aprender a "pensar" como ese Genio Tonto del que hablamos? Pasemos a la siguiente lección.
      `
    }
  ]
};
