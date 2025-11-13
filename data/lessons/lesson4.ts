
import { Lesson } from '../../types';

export const lesson4: Lesson = {
  id: 4,
  title: "Memoria y Conversación",
  description: "Aprende cómo la computadora recuerda cosas (Variables) para poder tener una conversación contigo (Input/Output). Descubre cómo almacenar datos, pedir información al usuario y crear interacciones dinámicas.",
  steps: [
    {
      type: 'theory',
      title: "El Cerebro de la Máquina",
      content: `
Hasta ahora, la computadora solo repetía lo que escribías directamente en el código, como un loro. Pero si quieres que tenga una conversación real, responda a tus inputs o recuerde detalles para usarlos después, necesita **memoria temporal**.

Necesita recordar tu nombre después de que se lo dices, o recordar cuántos puntos tienes en un juego para actualizarlos. Para eso existen las **Variables**: espacios en la memoria de la computadora donde guardas información para usarla más tarde.

Analogía: Imagina que estás cocinando y necesitas recordar ingredientes. No los repites cada vez; los "guardas" en tu mente (o en una nota). Las variables son esas "notas" para la máquina.

¿Por qué es esencial? Sin variables, tus programas serían estáticos y aburridos. Con ellas, puedes crear apps interactivas, juegos o calculadoras personalizadas. En el mundo real, variables manejan todo, desde scores en videojuegos hasta datos en bases de datos.
      `
    },
    {
      type: 'theory',
      title: "Las Cajas con Etiqueta",
      content: `
Imagina las variables como **cajas reutilizables** donde guardas información. Cada caja puede contener un valor (número, texto, etc.), y para no confundirte entre miles de cajas, le pones una etiqueta única (el nombre de la variable).

Ejemplo: \`puntos = 100\`
- Aquí, la computadora crea (o busca) una caja, le pega la etiqueta "puntos" y guarda el número 100 adentro.
- Si más tarde haces \`puntos = puntos + 50\`, abre la caja, suma 50 al 100 y guarda 150 de vuelta.

Importante: Las variables pueden cambiar de valor (por eso se llaman "variables"), pero el nombre permanece. ¡Es como rellenar la misma caja con cosas nuevas!

Historia breve: El concepto de variables viene de la matemática, pero en programación se popularizó con Fortran en los 50s. Hoy, son fundamentales en todos los lenguajes.
      `
    },
    {
      type: 'theory',
      title: "Reglas para Nombrar Variables",
      content: `
Puedes nombrar a una variable de casi cualquier manera, pero hay reglas estrictas para evitar errores de sintaxis. La computadora es picky:

1.  **Debe empezar con una letra o guión bajo (_).** \`puntos1\` o \`_puntos\` es válido, pero \`1puntos\` no (porque empieza con número).
2.  **Puede contener letras, números y guiones bajos, pero NO espacios ni símbolos raros como @, # o ?.** \`puntos_jugador\` es válido (usa _ para separar), pero \`puntos jugador\` no (espacio). \`puntosJugador\` sí funciona (sin espacios).
3.  **No puede llamarse como una palabra reservada del lenguaje.** No puedes nombrar una variable \`PRINT\` o \`IF\`, porque la computadora se confundiría (son comandos built-in).
4.  **Case-sensitive:** En la mayoría de lenguajes (incluyendo MiniQB), \`Puntos\` y \`puntos\` son variables diferentes.

Ejemplos válidos: \`i\`, \`nombreUsuario\`, \`unNombreMuyLargo\`, \`puntosDelJefeFinal_2\`.
Ejemplos inválidos: \`2puntos\`, \`puntos jugador\`, \`PRINT\`.

Consejo: Si rompes una regla, obtendrás un SYNTAX ERROR. Siempre chequea el mensaje de error para fixear.
      `
    },
    {
      type: 'theory',
      title: "Nombrando con Estilo (Buenas Prácticas)",
      content: `
El hecho de que puedas nombrar una variable \`x\` o \`a1b2c3\` no significa que debas hacerlo. Nombres malos hacen tu código confuso y difícil de mantener.

Mira este código: \`a = b * c\`. ¿Entiendes qué hace? Imposible sin contexto.
Ahora mira este: \`pagoMensual = horasTrabajadas * precioPorHora\`. ¡Mucho más claro! Sabes exactamente qué representa cada variable.

Ambas líneas hacen lo mismo (calcular un pago), pero la segunda se **auto-documenta**. Como programador, tu meta es escribir código que otros (¡o tú mismo dentro de 6 meses!) puedan entender fácilmente. Buenos nombres reducen bugs y ahorran tiempo.

Estilos comunes:
- **camelCase**: Primera palabra en minúscula, siguientes en mayúscula (ej: \`horasTrabajadas\`). Usaremos este en MiniQB.
- **snake_case**: Todo minúscula, palabras separadas por _ (ej: \`horas_trabajadas\`).
- **PascalCase**: Todo empieza en mayúscula (ej: \`HorasTrabajadas\`), común para clases.

Elige uno y sé consistente. También, usa nombres descriptivos: \`velocidadMaxima\` en vez de \`v\`.
      `
    },
    {
      type: 'code',
      title: "Práctica: Creando Variables",
      content: `
Vamos a crear variables simples. Usa el comando LET para asignar (aunque en MiniQB podría ser implícito, pero LET hace claro).

Intenta predecir el output antes de ejecutar.
      `,
      exercise: {
          prompt: "Crea una variable 'edad' con 25, y 'nombre$' con 'Juan'. Luego, imprime ambas variables, una en cada línea.",
          initialCode: `' Crea una variable llamada edad con el número 25
' Crea una variable llamada nombre$ con el texto "Juan"

' Imprime ambas variables, una en cada línea'`,
          expectedOutput: "25\nJuan",
          solution: `edad = 25
nombre$ = "Juan"
PRINT edad
PRINT nombre$`
      }
    },
    {
      type: 'theory',
      title: "Tipos de Datos: El caos de mezclar",
      content: `
¿Qué pasa si intentas sumar \\\`"5" + 6\\\`?
- En algunos lenguajes: \\\`11\\\` (convierte "5" a número automáticamente).
- En otros: \\\`"56"\\\` (convierte 6 a texto y concatena).
- O error si no coinciden tipos.

Esto se llama **Tipado Débil** (la computadora "adivina" por ti, a veces mal, causando bugs sutiles como en JavaScript).

Para evitar este caos, los programadores usan diferentes estrategias. Algunos lenguajes usan **Tipado Fuerte**, donde debes declarar el tipo de cada variable y la máquina te avisa si hay errores. En MiniQB, para mantener las cosas simples, usamos una **convención de nombrado** con sufijos para que *tú*, como programador, sepas qué tipo de dato estás manejando y evites errores de lógica.
      `
    },
    {
      type: 'theory',
      title: "Las Etiquetas de MiniQB",
      content: `
Para ayudar a los programadores a no confundirse, los dialectos clásicos de BASIC inventaron una **convención** muy útil: usar un símbolo especial (sufijo) al final del nombre de la variable para recordar qué tipo de dato contiene.

*   **$ (Dólar) = Texto (String):** Si el nombre de una variable termina en \\\`$\\\` (como \\\`nombre$\\\`), es una señal para el programador de que esa "caja" está destinada a guardar texto.
*   **(Sin símbolo) = Números:** Si no tiene sufijo (como \\\`edad\\\`), está destinada a guardar números.

**¡Importante!** MiniQB es un lenguaje moderno y flexible. No te dará un error si guardas texto en una variable sin \\\`$\\\` (como \\\`saludo = "hola"\\\`). Sin embargo, seguir esta convención es una **muy buena práctica** que te ayudará a evitar errores de lógica, especialmente cuando tus programas se vuelvan más complejos. Te ayuda a recordar qué puedes hacer con cada variable.
      `
    },
    {
      type: 'code',
      title: "Práctica: Errores de Operación",
      content: `
Aunque MiniQB es flexible al guardar datos en variables, no puede hacer magia. Hay operaciones que son lógicamente imposibles.

Por ejemplo, puedes sumar dos números (\\\`5 + 5\\\`) y puedes "sumar" (concatenar) dos textos (\\\`"hola" + "mundo"\\\`), pero, ¿qué significa multiplicar un texto por un número? La computadora no lo sabe, y en lugar de adivinar, te dará un **error de tipo** durante la ejecución.

¡Vamos a provocar uno!
      `,
      exercise: {
          prompt: "Intenta multiplicar el texto 'hola' por 5. La computadora no sabrá qué hacer y te mostrará un error. El objetivo es ver este error.",
          initialCode: `' Escribe aquí el código para intentar multiplicar "hola" por 5'`,
          expectedOutput: "$$ERROR$$",
          solution: `PRINT "hola" * 5`
      }
    },
    {
      type: 'theory',
      title: "Escuchando al usuario: INPUT",
      content: `
Ahora que tenemos cajas (variables), podemos pedirle al usuario que las llene dinámicamente.
El comando \\\`INPUT\\\` detiene el programa, muestra un mensaje, espera a que el usuario escriba algo y presione ENTER, y guarda lo escrito en una variable.

Sintaxis: \\\`INPUT "Mensaje para el usuario: ", variable\\\`

Ej: \\\`INPUT "Dime tu nombre: ", nombre$\\\`
- Muestra "Dime tu nombre: ", espera input, guarda en nombre$ (como texto).

Nota: Si la variable es numérica (sin $), INPUT intentará convertir el input a número. Si el usuario escribe letras, ¡error! Siempre valida inputs en programas reales.
      `
    },
    {
      type: 'theory',
      title: "Respondiendo: PRINT recargado",
      content: `
Ya conoces \\\`PRINT\\\`. Pero ahora podemos usarlo para mezclar texto fijo con el contenido de variables usando el signo más \\\`+\\\` (concatenación para strings, suma para números).

Ej: \\\`PRINT "Hola " + nombre$ + ", ¡bienvenido!"\\\`
- Resultado: "Hola Ana, ¡bienvenido!" (si nombre$ es "Ana").
- ¡Ojo con los espacios dentro de las comillas! La computadora no los agrega sola – "Hola" + "Ana" sería "HolaAna".

Para números: \\\`PRINT edad + 1\\\` suma 1 a la edad.

Consejo: Usa + para construir mensajes dinámicos. En lenguajes modernos como Python, hay f-strings para esto.
      `
    },
    {
      type: 'theory',
      title: "Anatomía de un Programa de Conversación",
      content: `
Veamos un ejemplo completo y analicémoslo línea por línea para ver cómo fluye.

\`\`\`basic
PRINT "¡Hola! Soy un bot."
INPUT "¿Cuál es tu nombre? ", nombre$
PRINT "Mucho gusto, " + nombre$
INPUT "¿Y tu comida favorita? ", comida$
PRINT "¡Qué rico! A mí también me gusta " + comida$
\`\`\`

---

1.  **\\\`PRINT "¡Hola! Soy un bot."\\\`**
    - El programa empieza saludando. Sencillo, estático, para setear el tono.

2.  **\\\`INPUT "¿Cuál es tu nombre? ", nombre$\\\`**
    - **\\\`INPUT\\\`**: Pausa ejecución, espera input del usuario.
    - **\\\`"¿Cuál es tu nombre? "\\\`**: Prompt mostrado (nota el espacio al final para separación).
    - **\\\`nombre$\\\`**: Variable donde se guarda (texto, por $).

3.  **\\\`PRINT "Mucho gusto, " + nombre$\\\`**
    - Concatena texto fijo con variable para respuesta personalizada.

4.  **\\\`INPUT "¿Y tu comida favorita? ", comida$\\\`**
    - Similar al anterior, pero nueva variable.

5.  **\\\`PRINT "¡Qué rico! A mí también me gusta " + comida$\\\`**
    - Cierra la conversación usando el último input.

Este flujo crea una "conversación" simple. En apps reales, usa loops para repetir preguntas.
      `
    },
    {
      type: 'code',
      title: "Tu primer Chatbot",
      content: `
Ahora te toca a ti. Vamos a crear un programa que converse de verdad.
Preguntará el nombre (texto, necesita \\\`$\\\`) y luego la edad (número, NO necesita \\\`$\\\`), y responderá basado en eso.
      `,
      exercise: {
        prompt: "Completa el código para que pregunte la edad y dé una respuesta final personalizada, como '¡Vaya, tienes X años, nombre!'",
        initialCode: `INPUT "¿Cómo te llamas? ", nombre$
PRINT "Hola, " + nombre$

' ↓↓↓ Agrega tu código aquí abajo ↓↓↓
' 1. Usa INPUT para preguntar la edad (recuerda: ¡es un número, sin $!)
'    Guarda el resultado en una variable llamada 'edad'.

' 2. Usa PRINT para decir algo como "¡Vaya, tienes " + edad + " años, " + nombre$ + "!" (usa + para concatenar, pero convierte edad a string si es necesario).`,
        solutionCues: ['INPUT', 'edad', 'PRINT'],
        solution: `INPUT "¿Cómo te llamas? ", nombre$
PRINT "Hola, " + nombre$

INPUT "Dime tu edad: ", edad
PRINT "¡Vaya, tienes " + edad + " años, " + nombre$ + "!"`
      }
    },
    {
      type: 'theory',
      title: "Organizando el Caos (¿Para qué sirven?)",
      content: `
Las variables no solo guardan datos; también hacen tu código más **legible**, **mantenible** y **reutilizable**.

Imagina un cálculo matemático complejo. Versión mala:
\\\`PRINT ((((2 + 3) * 2) + ((5 * 3) / 10)) * 3.1416)\\\`
- ¡Es un desastre! Difícil de leer, depurar o cambiar.

Versión buena con variables:
\`\`\`basic
' Paso 1: Calcular base
base = 2 + 3
base = base * 2

' Paso 2: Calcular ajuste
ajuste = 5 * 3
ajuste = ajuste / 10

' Paso final: Aplicar pi
pi = 3.1416
resultadoFinal = (base + ajuste) * pi
PRINT resultadoFinal
\`\`\`
- Mucho más limpio. Cada paso tiene nombre, fácil de entender/modificar. Si cambias pi a 3.14, solo editas una línea.

Beneficios extras: Reusa valores (ej: usa 'pi' en múltiples cálculos), evita repeticiones, facilita debugging (PRINT variables intermedias para chequear).
      `
    },
    {
      type: 'theory',
      title: "Resumen",
      content: `
*   **Variables:** Cajas etiquetadas para almacenar datos (números o texto).
*   **Nombres:** Empiezan con letra, sin espacios, camelCase para claridad.
*   **Tipos en MiniQB:** $ para texto, nada para números – tipado fuerte para evitar errores.
*   **INPUT:** Pide data al usuario y guarda en variable.
*   **PRINT con +:** Concatena/suma para outputs dinámicos.
*   Bonus: Variables mejoran legibilidad y evitan caos en cálculos complejos.

¡Con esto, tus programas son interactivos! En la siguiente lección, usaremos lógica booleana con IF para decisiones basadas en inputs.
      `
    }
  ]
};