import { Lesson } from '../../types';

export const lesson4: Lesson = {
  id: 4,
  title: "Memoria y Conversación",
  description: "Aprende cómo la computadora recuerda cosas (Variables) para poder tener una conversación contigo (Input/Output).",
  steps: [
    {
      type: 'theory',
      title: "El Cerebro de la Máquina",
      content: `
Hasta ahora, la computadora solo repetía lo que escribías en el código. Pero si quieres que tenga una conversación, necesita **memoria**.

Necesita recordar tu nombre después de que se lo dices, o recordar cuántos puntos tienes en un juego.
Para eso existen las **Variables**.
      `
    },
    {
      type: 'theory',
      title: "Las Cajas con Etiqueta",
      content: `
Imagina las variables como **cajas** donde guardas información.
Para no confundirte de caja, le pones una etiqueta (un nombre).

\`puntos = 100\`
Aquí, la computadora busca una caja, le pega la etiqueta "puntos" y guarda el número 100 adentro.
      `
    },
    {
      type: 'theory',
      title: "Reglas para Nombrar Variables",
      content: `
Puedes nombrar a una variable de casi cualquier manera, pero hay reglas importantes que no puedes romper:

1.  **Debe empezar con una letra.** \`puntos1\` es válido, pero \`1puntos\` no lo es.
2.  **No pueden tener espacios ni símbolos raros.** \`puntos_jugador\` es inválido. \`puntosJugador\` sí funciona.
3.  **No puede llamarse como una palabra reservada.** No puedes nombrar una variable \`print\` o \`if\`, porque la computadora se confundiría.

Ejemplos válidos: \`i\`, \`nombre$\`, \`unNombreMuyLargo\`, \`puntosDelJefeFinal\`.
      `
    },
    {
      type: 'theory',
      title: "Nombrando con Estilo (Buenas Prácticas)",
      content: `
El hecho de que puedas nombrar una variable \`x\` no significa que debas hacerlo.

Mira este código: \`a = b * c\`. ¿Entiendes qué hace? Imposible.
Ahora mira este: \`pagoMensual = horasTrabajadas * precioPorHora\`. ¡Mucho más claro!

Ambas líneas hacen lo mismo, pero la segunda se **auto-documenta**. Como programador, tu meta es escribir código que otros (¡o tú mismo dentro de 6 meses!) puedan entender.

Usaremos un estilo llamado **camelCase**: la primera palabra empieza en minúscula y las siguientes en mayúscula, sin espacios.
      `
    },
    {
      type: 'theory',
      title: "Tipos de Datos: El caos de mezclar",
      content: `
¿Qué pasa si intentas sumar \`"5" + 6\`?
*   ¿Es \`11\` (matemáticas)?
*   ¿O es \`"56"\` (pegar texto)?

Diferentes lenguajes hacen cosas diferentes, y eso puede causar desastres. A esto se le llama **Tipado Débil** (la computadora adivina por ti, a veces mal).

Para evitar este caos, en MiniQB usamos **Tipado Fuerte** mediante etiquetas especiales. Te obligamos a decirle a la computadora explícitamente qué tipo de dato es cada cosa.
      `
    },
    {
      type: 'theory',
      title: "Las Etiquetas de MiniQB",
      content: `
Para que nunca haya dudas, usamos un símbolo especial (sigilo) al final del nombre de la variable:

*   **$ (Dólar) = Texto:** Si la variable termina en \`$\`, SOLO puede guardar texto.
    *   Ej: \`nombre$ = "Ana"\`
*   **(Sin símbolo) = Números:** Si no tiene nada, SOLO puede guardar números.
    *   Ej: \`edad = 12\`

¡Es vital no mezclarlas! Si intentas guardar texto en una variable numérica, podrías causar un error semántico.
      `
    },
    {
      type: 'theory',
      title: "Escuchando al usuario: INPUT",
      content: `
Ahora que tenemos cajas (variables), podemos pedirle al usuario que las llene.
El comando \`INPUT\` detiene el programa, espera a que el usuario escriba algo y presione ENTER, y lo guarda en la variable que elijas.

\`INPUT "Dime tu nombre: ", nombre$\`
      `
    },
    {
      type: 'theory',
      title: "Respondiendo: PRINT recargado",
      content: `
Ya conoces \`PRINT\`. Pero ahora podemos usarlo para mezclar texto fijo con el contenido de nuestras variables usando el signo más \`+\`.

\`PRINT "Hola " + nombre$ + ", ¡bienvenido!"\`
(¡Ojo con los espacios dentro de las comillas, la computadora no los agrega sola!)
      `
    },
    {
      type: 'theory',
      title: "Anatomía de un Programa de Conversación",
      content: `
Veamos un ejemplo completo y analicémoslo línea por línea.

\`\`\`basic
PRINT "¡Hola! Soy un bot."
INPUT "¿Cuál es tu nombre? ", nombre$
PRINT "Mucho gusto, " + nombre$
INPUT "¿Y tu comida favorita? ", comida$
PRINT "¡Qué rico! A mí también me gusta " + comida$
\`\`\`

---

1.  **\`PRINT "¡Hola! Soy un bot."\`**
    *   El programa empieza saludando. Sencillo, ¿verdad?

2.  **\`INPUT "¿Cuál es tu nombre? ", nombre$\`**
    *   **\`INPUT\`**: Le dice a la computadora "Pausa y espera a que el usuario escriba algo".
    *   **\`"¿Cuál es tu nombre? "\`**: Este es el *mensaje* que se le muestra al usuario para que sepa qué escribir.
    *   **\`nombre$\`**: Esta es la *variable* (la caja) donde se guardará lo que el usuario escriba. Usamos **\`$\`** porque esperamos que escriba texto.

3.  **\`PRINT "Mucho gusto, " + nombre$\`**
    *   Usamos \`PRINT\` para responder.
    *   **\`"Mucho gusto, "\`**: Este es un texto fijo. Nota el espacio al final, ¡es importante para que no se pegue al nombre!
    *   **\`+ nombre$\`**: Aquí ocurre la **concatenación**. La computadora une el texto "Mucho gusto, " con el contenido de la variable \`nombre$\`.

4.  **\`INPUT "¿Y tu comida favorita? ", comida$\`**
    *   Funciona exactamente igual que el primer \`INPUT\`, pero guarda la respuesta en una nueva variable llamada \`comida$\`.

5.  **\`PRINT "¡Qué rico! A mí también me gusta " + comida$\`**
    *   Otro \`PRINT\` que concatena un texto fijo con el contenido de la variable \`comida$\`.
`
    },
    {
      type: 'code',
      title: "Tu primer Chatbot",
      content: `
Ahora te toca a ti. Vamos a crear un programa que converse de verdad.
Preguntará el nombre (texto, necesita \`$\`) y luego la edad (número, NO necesita \`$\`).
      `,
      exercise: {
        prompt: "Completa el código para que pregunte la edad y dé una respuesta final personalizada.",
        initialCode: `INPUT "¿Cómo te llamas? ", nombre$
PRINT "Hola, " + nombre$

' Agrega abajo un INPUT para la edad (recuerda: ¡es un número!)


' Ahora usa PRINT para decir algo como "¡Vaya, X años!" usando la variable
`,
        solutionCues: ['INPUT', 'edad', 'PRINT']
      }
    },
    {
      type: 'theory',
      title: "Organizando el Caos (¿Para qué sirven?)",
      content: `
Las variables no solo guardan datos, también hacen tu código más **legible** y **mantenible**.

Imagina que tienes que hacer un cálculo matemático complejo. Podrías escribirlo todo en una línea:
\`PRINT ((((2 + 3) * 2) + ((5 * 3) / 10)) * 3.1416)\`

¡Es un desastre! Nadie entiende qué está pasando. En cambio, si usamos variables:
\`\`\`basic
' Paso 1
resu1 = 2 + 3
resu1 = resu1 * 2

' Paso 2
resu2 = 5 * 3
resu2 = resu2 / 10

' Paso final
pi = 3.1416
resultadoFinal = (resu1 + resu2) * pi
PRINT resultadoFinal
\`\`\`
Mucho más limpio, ¿verdad? Ahora cada paso tiene un nombre y es fácil de entender y de modificar si hay un error.
      `
    }
  ]
};