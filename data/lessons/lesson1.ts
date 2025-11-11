import { Lesson } from '../../types';

export const lesson1: Lesson = {
  id: 1,
  title: "Las Bases",
  description: "¿Qué es realmente programar? Desmitificando la comunicación humano-máquina, desde los conceptos básicos hasta por qué es una habilidad esencial en el mundo actual.",
  steps: [
    {
      type: 'theory',
      title: "Bienvenidos al mundo real",
      content: `
Mucha gente piensa que programar es una actividad reservada para genios matemáticos encerrados en sótanos oscuros con pantallas llenas de texto verde cayendo al estilo Matrix. O quizás imaginan a hackers con capuchas tecleando furiosamente para "entrar al sistema".

**Nada más lejos de la realidad.**

Programar es, esencialmente, **resolver problemas de manera sistemática**. Es el arte de dividir una tarea grande y compleja en pasos tan pequeños, simples y tontos que hasta una máquina pueda entenderlos y ejecutarlos sin errores. 

Piensa en cocinar una receta: no dices "haz una torta", sino "mezcla 2 huevos con 1 taza de harina, bate por 5 minutos, hornea a 180°C por 30 minutos". Programar es similar, pero para computadoras.

¿Por qué es importante? En el mundo actual, la programación no solo crea apps o sitios web; se usa en medicina (para analizar datos de pacientes), en arte (para generar música o diseños), en ciencia (para simular climas) y hasta en la vida cotidiana (como algoritmos que recomiendan videos en YouTube). Aprender a programar te enseña a pensar lógicamente, a ser paciente con los errores y a automatizar tareas repetitivas.
      `
    },
    {
      type: 'theory',
      title: "El Genio Tonto",
      content: `
Imagina que tienes un asistente superpoderoso. Puede realizar millones de cálculos por segundo, nunca se cansa, nunca olvida nada y puede manejar cantidades enormes de datos. Suena genial, ¿verdad?

Hay un problema: es extremadamente literal, no tiene sentido común ni creatividad propia. Si le dices "ve a la tienda y si hay huevos, trae seis", podría volver con 6 litros de leche porque "había huevos" en la tienda, interpretando la instrucción al pie de la letra sin inferir que querías 6 huevos.

Ese asistente es la computadora. Programar es aprender a darle órdenes tan precisas, paso a paso, que no pueda malinterpretarlas. Las computadoras siguen instrucciones ciegamente: si hay un error en tus órdenes, fallarán, pero nunca "adivinarán" lo que quisiste decir.

Ejemplo real: En 1999, la sonda Mars Climate Orbiter de NASA se perdió porque un equipo usó unidades en libras y otro en newtons. La computadora "entendió" las instrucciones, pero el resultado fue catastrófico. ¡La precisión lo es todo!
      `
    },
    {
      type: 'theory',
      title: "La barrera del idioma",
      content: `
Las computadoras no hablan español ni inglés. En su nivel más profundo, solo entienden pulsos eléctricos: encendido (1) o apagado (0). Esto es el **código binario**, el lenguaje máquina base de todo.

Cada letra, número o imagen se representa en binario. Por ejemplo, ¿te imaginas tener que decirle "Hola" a tu computadora usando solo ceros y unos? Sería algo así:
\`01001000 01101111 01101100 01100001\` (esto es el código ASCII para "Hola").

¡Imposible trabajar así a diario! Por eso inventamos los **Lenguajes de Programación**. Son idiomas intermedios, más parecidos al inglés o al español, que nosotros podemos leer y escribir fácilmente. Un programa especial (llamado **compilador** o **intérprete**) los convierte automáticamente a binario.

- **Compilador:** Traduce todo el código de una vez antes de ejecutarlo (como traducir un libro entero).
- **Intérprete:** Traduce línea por línea mientras se ejecuta (como un intérprete en una conversación).

Historia breve: El primer lenguaje de alto nivel fue Fortran en 1957, para cálculos científicos. Hoy hay miles, como Python (fácil para principiantes), Java (para apps móviles) o JavaScript (para web). Nosotros usaremos **MiniQB**, inspirado en BASIC, diseñado para ser simple y legible.
      `
    },
    {
      type: 'code',
      title: "Tu primera palabra",
      content: `
Vamos a probar nuestro lenguaje, llamado **MiniQB**. Es un lenguaje diseñado para ser fácil de leer, inspirado en clásicos como BASIC, pero simplificado para principiantes.

La orden más básica en casi cualquier lenguaje es la que le dice a la computadora: "Muestra esto en la pantalla". Aquí usamos la palabra \`PRINT\` (imprimir en inglés). 

Nota: Todo lo que va entre comillas (" ") es texto literal que se muestra tal cual. Si olvidas las comillas, la computadora pensará que es un comando o variable.

**Tu misión:** Haz que la computadora te salude.
      `,
      exercise: {
          prompt: "Cambia el texto dentro de las comillas para que diga 'Hola, MiniCoder' y pulsa Ejecutar.",
          initialCode: 'PRINT "¡Hola Mundo!"',
          expectedOutput: "Hola, MiniCoder",
          errorHints: [
            {
              codeIncludes: '¡Hola, MiniCoder!',
              hint: '¡Casi! La programación es muy exacta. El saludo no necesita los signos de exclamación (¡!). Inténtalo de nuevo sin ellos.'
            },
            {
              codeIncludes: 'Hola MiniCoder',
              hint: '¡Estás muy cerca! Revisa el texto con atención. Falta un pequeño detalle de puntuación después de "Hola".'
            },
            {
              codeIncludes: '¡Hola MiniCoder!',
              hint: '¡Casi! La programación es muy exacta. El saludo no necesita los signos de exclamación (¡!). Inténtalo de nuevo sin ellos.'
            }
          ]
      }
    },
    {
      type: 'code',
      title: "Experimenta con PRINT",
      content: `
Ahora que viste tu primer programa, probemos variaciones. ¿Qué pasa si usas números? Puedes imprimir el resultado de operaciones matemáticas directamente.

Intenta imprimir el resultado de una resta. Esto te muestra que PRINT no solo es para texto, sino para expresiones.

**Consejo:** Si ves un error, lee el mensaje: te dirá qué línea falló y por qué.
      `,
      exercise: {
          prompt: "Ahora, haz que el programa imprima el resultado de la resta `100 - 42`.",
          // FIX: Added closing backtick to initialCode template literal.
          initialCode: `' Escribe aquí un comando PRINT para calcular 100 - 42'`,
          expectedOutput: "58"
      }
    },
    {
      type: 'theory',
      title: "La importancia de la Sintaxis",
      content: `
En español, si te olvidas de un acento o cometes un error tipográfico, la gente te entiende igual gracias al contexto. La computadora NO: es implacable.

A las reglas estrictas de cómo se debe escribir un lenguaje las llamamos **Sintaxis**. Es como la gramática y ortografía en un idioma humano, pero sin flexibilidad.

Tiene varios niveles:
1.  **Léxico (Palabras):** ¿Está bien escrita la palabra? \`PRINT\` existe y es una palabra reservada, pero \`PRNT\` o \`print\` (en minúscula, si MiniQB es case-sensitive) no.
2.  **Gramática (Frases):** ¿Están las palabras en el orden correcto? \`PRINT "Hola"\` funciona, pero \`"Hola" PRINT\` no, porque el comando va primero.
3.  **Semántica (Significado):** Más adelante, pero básicamente, ¿tiene lógica? Ej: No puedes imprimir una variable inexistente.

Si fallas en sintaxis, la computadora ni siquiera intentará ejecutar tu programa. Te gritará: **SYNTAX ERROR**. ¡Es el error más común para novatos!

Ejemplo común: Olvidar cerrar comillas o paréntesis. En lenguajes reales como Python, la indentación (espacios) también es sintaxis.
      `
    },
    {
      type: 'code',
      title: "Rompiendo cosas a propósito",
      content: `
Parte fundamental de aprender a programar es perder el miedo a los errores. Los vas a cometer TODO EL TIEMPO, incluso cuando seas experto (¡los programadores senior depuran el 80% del tiempo!).

Un mensaje de error no es un castigo: es la computadora pidiéndote ayuda porque no entendió algo. Siempre lee el error: te da pistas como "Línea 1: Falta comilla" o "Palabra desconocida".

Intenta provocar un **Error de Sintaxis** escribiendo mal el comando (ej: \`PRINT ("Hola"\` sin cerrar el paréntesis, o \`PRIN "Hola"\` con letra faltante). Ejecuta, ve el error, y corrígelo.
      `,
      exercise: {
          prompt: "Genera un Syntax Error. Rompe el comando PRINT a propósito, luego arréglalo.",
          initialCode: 'PRINT ("Esto va a fallar"',
          expectedOutput: "$$ERROR$$"  // Para el error, y luego el output correcto
      }
    },
    {
      type: 'theory',
      title: "No todos los errores son iguales",
      content: `
A veces tu código está perfectamente escrito (Sintaxis correcta), pero falla al ejecutarse. Estos son **Errores Semánticos** (o de lógica/run-time).

Es como decir en español: *"La tostada se comió al gato"*. Gramaticalmente la frase es perfecta (Sujeto + Verbo + Predicado), pero el **significado** es absurdo y no tiene sentido en la realidad.

En programación, un error semántico sería:
- Intentar usar una variable que todavía no existe (ej: PRINT edad, sin definir edad antes).
- Dividir un número por cero (imposible matemáticamente).
- Acceder a un archivo que no existe.

La computadora te entendió perfectamente, ¡pero lo que le pediste es imposible o ilógico! Estos errores son más difíciles de encontrar porque el programa "corre" hasta que falla.

Consejo: Usa "debugging" – ejecuta paso a paso, imprime valores intermedios para ver qué pasa.
      `
    },
    {
      type: 'code',
      title: "El programa es una secuencia",
      content: `
Un programa rara vez es una sola línea. Generalmente es una lista de instrucciones que la computadora lee **de arriba hacia abajo**, una por una, en orden secuencial. No salta líneas a menos que se lo indiques (eso viene en lecciones futuras con condicionales).

Si escribes tres comandos \`PRINT\`, aparecerán tres líneas en la pantalla, en ese exacto orden. Cambia el orden y verás cómo cambia el output.

Esto enseña "flujo de control": la computadora es como un lector que sigue la historia línea por línea.
      `,
      exercise: {
          prompt: "Añade una cuarta línea de código usando `PRINT` al final para completar la historia con la frase 'Y creó mundos nuevos.'.",
          // FIX: Added closing backtick to initialCode template literal.
          initialCode: `PRINT "Había una vez..."
PRINT "un programador novato..."
PRINT "¡que se convirtió en experto!"
' Agrega tu línea de código aquí debajo'`,
          expectedOutput: "Había una vez...\nun programador novato...\n¡que se convirtió en experto!\nY creó mundos nuevos."
      }
    },
    {
      type: 'theory',
      title: "Herramientas básicas para programar",
      content: `
Además del lenguaje, necesitas herramientas:
- **Editor de código:** Como VS Code o este editor integrado. Colorea el código para resaltar sintaxis.
- **Intérprete/Compilador:** En MiniQB, está built-in.
- **Depurador:** Para pausar y revisar errores.

Práctica: Siempre prueba tu código en pedazos pequeños. ¡No escribas todo de una y esperes que funcione!
      `
    },
    {
      type: 'theory',
      title: "Resumen",
      content: `
*   **Programar** es resolver problemas dando instrucciones precisas a una máquina literal.
*   La **Sintaxis** son las reglas estrictas de escritura (léxico y gramática); errores aquí impiden la ejecución.
*   **Error de Sintaxis:** "No entendí lo que escribiste" – común en novatos, fácil de fixear leyendo el mensaje.
*   **Error Semántico:** "Entendí lo que escribiste, pero no tiene sentido" – requiere lógica para depurar.
*   Los programas se ejecutan en **orden secuencial**, de arriba hacia abajo.
*   Bonus: Programar desarrolla habilidades como paciencia, lógica y creatividad. En el futuro, te ayudará en carreras desde IA hasta diseño.

¿Listo para aprender a "pensar" como ese Genio Tonto del que hablamos? En la siguiente lección, exploraremos variables para almacenar datos y hacer programas más dinámicos.
      `
    }
  ]
};