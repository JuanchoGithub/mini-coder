import { Lesson } from '../../types';

export const lesson11: Lesson = {
  id: 11,
  title: "Extra: Música y Sonido",
  description: "Dale vida a tus programas con efectos de sonido y melodías. Aprende a usar BEEP, SOUND y a componer música con PLAY.",
  steps: [
    {
      type: 'theory',
      title: "Más Allá del Silencio",
      content: `
Hasta ahora, tus programas han sido silenciosos. Pero el sonido es una herramienta poderosa para comunicarte con el usuario. Puede:

*   **Dar Feedback:** Un sonido de "éxito" cuando completas una acción o un "error" cuando algo falla.
*   **Crear Atmósfera:** La música de fondo en un juego puede hacerlo emocionante o misterioso.
*   **Ser Parte del Juego:** Imagina un juego de "Simón Dice" donde debes recordar y repetir una secuencia de sonidos.

En MiniQB, tenemos tres comandos para jugar con el sonido, desde el más simple hasta el más musical. ¡Vamos a explorarlos!
      `
    },
    {
      type: 'theory',
      title: "BEEP: El Sonido de Alerta",
      content: `
El comando más simple es \`BEEP\`. No necesita argumentos y produce un sonido de sistema corto y agudo. Piensa en él como el pitido de una caja registradora o una computadora vieja.

**¿Cuándo usarlo?**
*   Para confirmar que un botón fue presionado.
*   Para alertar sobre un error de entrada (como escribir texto donde va un número).
*   Para señalar el final de un contador o una tarea.

Es una forma rápida y sencilla de llamar la atención del usuario sin ser demasiado intrusivo.
      `
    },
    {
      type: 'code',
      title: "Práctica: Alerta de Error",
      content: `
Vamos a usar \`BEEP\` para alertar al usuario si introduce una contraseña incorrecta.
      `,
      exercise: {
        prompt: "Completa el código para que, si el `intento$` no es igual a `clave_secreta$`, el programa haga un BEEP antes de imprimir el mensaje de error.",
        initialCode: `clave_secreta$ = "1234"
INPUT "Clave: ", intento$

IF intento$ = clave_secreta$ THEN
    PRINT "Acceso concedido."
ELSE
    ' --- Tu código va aquí ---
    ' Añade un BEEP para alertar del error.
    PRINT "Clave incorrecta."
END IF`,
        expectedOutput: "Clave incorrecta.",
        solutionCues: ['BEEP']
      }
    },
    {
      type: 'theory',
      title: "SOUND: El Sintetizador Preciso",
      content: `
Si quieres más control que un simple pitido, \`SOUND\` es tu herramienta. Te permite generar cualquier tono especificando dos cosas:

\`SOUND frecuencia, duracion\`

*   **Frecuencia:** Se mide en Hertz (Hz) y determina qué tan aguda o grave es la nota. Una frecuencia más alta es más aguda. Por ejemplo, la nota "La" que se usa para afinar orquestas es de 440 Hz.
*   **Duración:** Se mide en "ticks" de reloj, donde aproximadamente 18.2 ticks equivalen a 1 segundo.

Con \`SOUND\`, puedes crear efectos de sonido de ciencia ficción, alarmas personalizadas o incluso tocar música nota por nota si conoces sus frecuencias.
      `
    },
    {
      type: 'code',
      title: "Práctica: Una Sirena Simple",
      content: `
Vamos a crear una sirena simple que alterna entre dos tonos, uno agudo y uno grave, usando un bucle \`FOR\`. La duración se mide en "ticks" (18.2 por segundo), así que usaremos un valor pequeño como 4 para cada sonido.
      `,
      exercise: {
        prompt: "Escribe un bucle `FOR` que se repita 3 veces. Dentro del bucle, toca un tono agudo (800 Hz) por 4 ticks, y luego un tono grave (400 Hz) por 4 ticks.",
        initialCode: `' Escribe un bucle FOR que se repita 3 veces.
' Dentro del bucle:
' 1. Usa SOUND para tocar un tono agudo (800 Hz, 4 ticks)
' 2. Usa SOUND para tocar un tono grave (400 Hz, 4 ticks)
`,
        expectedOutput: "",
        solutionCues: ['FOR', 'TO', 'SOUND', 'NEXT']
      }
    },
    {
      type: 'theory',
      title: "PLAY: El Compositor Avanzado",
      content: `
Tocar notas simples como 'C D E' es divertido, pero el verdadero poder de \`PLAY\` está en sus comandos, que te permiten controlar cada aspecto de la música como un verdadero compositor.

La cadena de texto de \`PLAY\` es un mini-lenguaje de programación musical. Aquí están tus herramientas:

*   **Notas:** \`A, B, C, D, E, F, G\`. Puedes añadir sostenidos (\`#\` o \`+\`) o bemoles (\`-\`). Ej: \`C#\`, \`G+\`, \`A-\`.
*   **Ln:** Fija la **L**ongitud (duración) de las notas. L1 es una redonda, L2 una blanca, L4 una negra (el valor por defecto), L8 una corchea, etc.
*   **On:** Fija la **O**ctava. El rango es de 0 (muy grave) a 6 (muy agudo). La octava por defecto es la 4 (la del Do central del piano).
*   **< y >:** Sube (\`>\`) o baja (\`<\`) una octava de forma rápida.
*   **Tn:** Fija el **T**empo (velocidad) en negras por minuto. El rango va de 32 (muy lento) a 255 (muy rápido). Por defecto es T120.
*   **Pn:** Inserta una **P**ausa con una duración 'n' (igual que L).
*   **. (Punto):** Puesto después de una nota, la hace durar 1.5 veces más (nota con puntillo).
*   **MN, ML, MS:** Fija el estilo de la nota (Music Normal, Music Legato, Music Staccato).
*   **Nn:** Toca una **N**ota específica por su número (0-84, como en un teclado MIDI).

Los comandos como T, O y L afectan a **todas las notas que vienen después** hasta que los cambies de nuevo.
      `
    },
    {
      type: 'code',
      title: "Práctica: Componiendo con Comandos",
      content: `
Vamos a usar los nuevos comandos para crear una pequeña melodía con más expresión. Queremos que la música cambie de velocidad y tono.
      `,
      exercise: {
        prompt: "Crea una melodía que: 1. Empiece rápido (T180). 2. Toque 'C D E' como corcheas (L8). 3. Baje una octava (<). 4. Se vuelva más lenta (T100). 5. Toque 'G A B' como negras (L4).",
        initialCode: `PRINT "Creando una melodía dinámica..."
' Escribe todo en una sola cadena de PLAY.
' Ejemplo: PLAY "T180 L8 C D E < T100 L4 G A B"
`,
        expectedOutput: "Creando una melodía dinámica...",
        solutionCues: ['PLAY', 'T180', 'L8', 'C D E', '<', 'T100', 'L4', 'G A B']
      }
    },
    {
      type: 'theory',
      title: "Homenaje a los Clásicos: Chiptunes",
      content: `
En los años 80, las computadoras y consolas de videojuegos tenían chips de sonido muy limitados. Solo podían generar tonos simples, como los que produce nuestro comando \`SOUND\`. La música creada con estas limitaciones se conoce como **Chiptune**.

Los compositores de esa época eran genios creativos que, con muy poco, crearon bandas sonoras icónicas que todavía recordamos. Con nuestro comando \`PLAY\`, podemos rendir homenaje a esa era y tocar versiones simplificadas de grandes obras. ¡Vamos a intentarlo!
      `
    },
    {
      type: 'code',
      title: "Ejemplo 1: Estrellita Dónde Estás",
      content: `
Vamos a tocar la melodía de una canción infantil muy famosa. Ahora que sabes de comandos, puedes ver que empieza con un tempo de 120 (T120), en la octava 4 (O4) y con corcheas (L8).
      `,
      exercise: {
        prompt: "Completa la melodía de 'Estrellita Dónde Estás' y ejecútala.",
        initialCode: `PRINT "Tocando 'Estrellita Dónde Estás'..."
' Parte 1
PLAY "T120 O4 L8 C C G G A A G"
' Parte 2: La melodía sigue con "F F E E D D C"
' Escribe un segundo comando PLAY aquí para completar la canción.
`,
        expectedOutput: "Tocando 'Estrellita Dónde Estás'...",
        solutionCues: ['PLAY']
      }
    },
    {
      type: 'code',
      title: "Ejemplo 2: Oda a la Alegría",
      content: `
Esta es una versión simplificada del famoso tema de la 9ª Sinfonía de Beethoven.
      `,
      exercise: {
        prompt: "Ejecuta el código para escuchar la 'Oda a la Alegría'. No necesitas cambiar nada, ¡solo disfrutar!",
        initialCode: `PRINT "Interpretando: Oda a la Alegría (Beethoven)"
PLAY "T140 O4 L8 E E F G G F E D C C D E E D D"`,
        expectedOutput: "Interpretando: Oda a la Alegría (Beethoven)"
      }
    },
    {
      type: 'code',
      title: "Ejemplo 3: Minueto en Sol",
      content: `
Ahora, una pieza un poco más compleja: el inicio del famoso Minueto en Sol de Johann Sebastian Bach.
      `,
      exercise: {
        prompt: "Ejecuta el código para escuchar el Minueto en Sol. ¿Reconoces la melodía?",
        initialCode: `PRINT "Interpretando: Minueto en Sol (Bach)"
PLAY "T160 O4 L8 G D G A B C D G D G E F G A B C D G"`,
        expectedOutput: "Interpretando: Minueto en Sol (Bach)"
      }
    },
    {
      type: 'code',
      title: "Desafío Épico: Himno del Reino Champiñón",
      content: `
¡Un verdadero desafío para la computadora! Esta es una melodía mucho más larga y compleja, que usa casi todos los comandos de \`PLAY\`. ¿Reconoces este icónico tema de los videojuegos?
      `,
      exercise: {
        prompt: "Ejecuta el código para escuchar la melodía. Puede que tarde un poco en tocarla toda. ¡Disfruta del concierto!",
        initialCode: `PRINT "Interpretando un himno de los videojuegos..."
PLAY "T120O3L16BL8BBL16GL8B>DP8<DP8GP16DP16<B>P16EF+L16FL8EL16DL8GL16B>L8EL16CL8D<BL16GAL8F+P16GP16DP16<BP16>EF+L16FL8EL16DL8GL16B>L8EL16CL8D<BL16GAL8F+P16P8>L16DC+C<L8B-BL16DEL8GL16EGAP8>L16DC+CL8<B-B>GL16GGP16P4L16DC+CL8<B-BL16DL8GL16EGAP8L8B-P16 AP16GP2L16>DC+C<L8B-BL16DEL8GL16EGAP8>L16DC+CL8<B-B>GL16GGP16P4L16DC+CL8<B-BL16DL8GL16EGAP8L8B-P16AP16GP2L16GL8GGL16GL8AL16BL8GL16EL4DL16GL8GGL16GAL2BP16L16GL8GGL16GL8AL16BL8GL16EL4DL16BL8BBL16GL8B>DP8<DP8 L16>EL8CL16<GP8L8G+L16A>L8FL16FL4<AL8B>L16AAL8AL16GFEL8C<L16AL4GL16>EL8CL16<GP8L8G+L16A>L8FL16F<L4AL16B>L8FL16FL8FL16EDL4CP4 L16EL8CL16<GP8L8G+L16A>L8FL16FL4<AL8B>L16AAL8AL16GFEL8C<L16AL4GL16>EL8CL16<GP8L8G+L16A>L8FL16F<L4AL16B>L8FL16FL8FL16EDL4CP4 L16CL8CL16CP17CL8DL16EL8CL16<AL4G>L16CL8CL16CP16CDEP2CL8CL16CP16CL8DL16EL8CL16<AL4G>L16EL8EL16EP16CL8EL4GP4 L16EL8CL16<GP8L8G+L16A>L8FL16FL4<AL8B>L16AAL8AL16GFEL8C<L16AL4GL16>EL8CL16<GP8L8G+L16A>L8FL16F<L4AT115L16B>L8FL16FT90L8FL16EDP4 T80O3P8>L4C<L4GL5EL8ABAG+B-G+L16GFL1G"`,
        expectedOutput: "Interpretando un himno de los videojuegos..."
      }
    },
    {
      type: 'code',
      title: "Desafío Inmortal: Cánon en Re Mayor",
      content: `
Para terminar, una obra maestra de la música clásica que ha trascendido los siglos, adaptada al lenguaje de nuestra computadora. Esta pieza es extremadamente larga y compleja, demostrando el verdadero poder de una simple cadena de texto para crear arte.
      `,
      exercise: {
        prompt: "Ejecuta el código y escucha la interpretación del Cánon de Pachelbel. ¡Será un concierto largo!",
        initialCode: `PRINT "Interpretando un clásico inmortal..."
PLAY "<L16A.P32L16A.P32L16C.P32L16A.P32L16D.P32L16A.P32L16E.P32L16D.P32L16C.P32L16C.P32L16E.P32L16C.P32L16G.P32L16C.P32L16E.P32L16C.P32L16G.P32L16G.P32L16B.P32L16G.P32L16C.P32L16G.P32L16D.P32L16C.P32L16F.P32L16F.P32L16A.P32L16F.P32L16C.P32L16F.P32L16C.P32L16B.P32L16A.P32L16A.P32L16C.P32L16A.P32L16D.P32L16A.P32L16E.P32L16D.P32L16C.P32L16C.P32L16E.P32L16C.P32L16G.P32L16C.P32L16E.P32L16C.P32L16G.P32L16G.P32L16B.P32L16G.P32L16C.P32L16G.P32L16D.P32L16C.P32L16F.P32L16F.P32L16A.P32L16F.P32L16C.P32L16F.P32L16C.P32L16B.L8AP16L8AP16L8AP16L8AP16L16G.P32L16C.P32L8AP16L8AP16L8AP16L8AP16L16G.P32L16E.P32L8AP16L8AP16L8AP16L8AP16L16G.P32L16C.P32L8AP16L8AP16L16A.P32L32AP32L32AP16P32L32AP32L32AP8P16P32L8AP16L8AP16L8AP16L8AP16L16G.P32L16C.P32L8AP16L8AP16L8AP16L8AP16L16G.P32L16E.P32L8AP16L8AP16L8AP16L8AP16L16G.P32L16C.P32L8AP16L8AP16L16A.P32L32AP32L32AP16P32L32AP32L32AP8P16P32L32AP32L16E.P32L32AP32L16C.P32L32AP32L16A#P32L32AP32L16C.P32L32AP32L32A#P32L16G.P32L32AP32L16E.P32L32AP32L16C.P32L32AP32L16A#P32L32AP32L16C.P32L32AP32L32A#P32L16G.P32L32AP32L16E.P32L32AP32L16C.P32L32AP32L16A#P32L32AP32L16C.P32L32AP32L32A#P32L16G.P32L32AP32L16E.P32L32AP32L16C.P32L32GP32L16G.P32L32GP32L16A.P32L16A.P8P32L32AP32L16E.P32L32AP32L16C.P32L32AP32L16A#P32L32AP32L16C.P32L32AP32L32A#P32L16G.P32L32AP32L16E.P32L32AP32L16C.P32L32AP32L16A#P32L32AP32L16C.P32L32AP32L32A#P32L16G.P32L32AP32L16E.P32L32AP32L16C.P32L32AP32L16A#P32L32AP32L16C.P32L32AP32L32A#P32L16G.P1P32L8AP16L8AP16L8AP16L8AP16L16G.P32L16C.P32L8AP16L8AP16L8AP16L8AP16L16G.P32L16E.P32L8AP16L8AP16L8AP16L8AP16L16G.P32L16C.P32L8AP16L8AP16L16A.P32L32AP32L32AP16P32L32AP32L32AP8P16P32L8AP16L8AP16L8AP16L8AP16L16G.P32L16C.P32L8AP16L8AP16L8AP16L8AP16L16G.P32L16E.P32L8AP16L8AP16L8AP16L8AP16L16G.P32L16C.P32L8AP16L8AP16L16A.P32L32AP32L32AP16P32L32AP32L32AP8P16P32L32AP32L16E.P32L32AP32L16C.P32L32AP32L16A#P32L32AP32L16C.P32L32AP32L32A#P32L16G.P32L32AP32L16E.P32L32AP32L16C.P32L32AP32L16A#P32L32AP32L16C.P32L32AP32L32A#P32L16G.P32L32AP32L16E.P32L32AP32L16C.P32L32AP32L16A#P32L32AP32L16C.P32L32AP32L32A#P32L16G.P32L32AP32L16E.P32L32AP32L16C.P32L32GP32L16G.P32L32GP32L16A.P32L16A.P8P32L32AP32L16E.P32L32AP32L16C.P32L32AP32L16A#P32L32AP32L16C.P32L32AP32L32A#P32L16G.P32L32AP32L16E.P32L32AP32L16C.P32L32AP32L16A#P32L32AP32L16C.P32L32AP32L32A#P32L16G.P32L32AP32L16E.P32L32AP32L16C.P32L32AP32L16A#P32L32AP32L16C.P32L32AP32L32A#P32L16G.P32L32AP32L16E.P32L32AP32L16C.P32L32GP32L16G.P32L32GP32L16A.P32L16A.P8P32L8AP16L8AP16L8AP16L8AP16L16G.P32L16C.P32L8AP16L8AP16L8AP16L8AP16L16G.P32L16E.P32L8AP16L8AP16L8AP16L8AP16L16G.P32L16C.P32L8AP16L8AP16L16A.P32L32AP32L32AP16P32L32AP32L32AP8P16P32L8AP16L8AP16L8AP16L8AP16L16G.P32L16C.P32L8AP16L8AP16L8AP16L8AP16L16G.P32L16E.P32L8AP16L8AP16L8AP16L8AP16L16G.P32L16C.P32L8AP16L8AP16L16A.P32L32AP32L32AP16P32L32AP32L32AP8P16P32L32AP32L16E.P32L32AP32L16C.P32L32AP32L16A#P32L32AP32L16C.P32L32AP32L32A#P32L16G.P32L32AP32L16E.P32L32AP32L16C.P32L32AP32L16A#P32L32AP32L16C.P32L32AP32L32A#P32L16G.P32L32AP32L16E.P32L32AP32L16C.P32L32AP32L16A#P32L32AP32L16C.P32L32AP32L32A#P32L16G.P32L32AP32L16E.P32L32AP32L16C.P32L32GP32L16G.P32L32GP32L16A.P32L16A.P8P32L32AP32L16E.P32L32AP32L16C.P32L32AP32L16A#P32L32AP32L16C.P32L32AP32L32A#P32L16G.P32L32AP32L16E.P32L32AP32L16C.P32L32AP32L16A#P32L32AP32L16C.P32L32AP32L32A#P32L16G.P32L32AP32L16E.P32L32AP32L16C.P32L32AP32L16A#P32L32AP32L16C.P32L32AP32L32A#P32L16G.P32L8AP16L8AP16L8AP16L8AP16L16G.P32L16C.P32L8AP16L8AP16L8AP16L8AP16L16G.P32L16E.P32L8AP16L8AP16L8AP16L8AP16L16G.P32L16C.P32L8AP16L8AP16L16A.P32L32AP32L32AP16P32L32AP32L32AP8P16P32L8AP16L8AP16L8AP16L8AP16L16G.P32L16C.P32L8AP16L8AP16L8AP16L8AP16L16G.P32L16E.P32L8AP16L8AP16L8AP16L8AP16L16G.P32L16C.P32L8AP16L8AP16L16A.P32L32AP32L32AP16P32L32AP32L32AP8P16P32L32AP32L16E.P32L32AP32L16C.P32L32AP32L16A#P32L32AP32L16C."`,
        expectedOutput: "Interpretando un clásico inmortal..."
      }
    },
    {
      type: 'code',
      title: "Ejemplo 4: Un Sonido Familiar",
      content: `
Aquí tienes otra melodía icónica del mundo de los videojuegos, dividida en varias líneas de \`PLAY\` para mayor claridad. ¿Puedes adivinar de qué juego se trata?
      `,
      exercise: {
        prompt: "Ejecuta el código para escuchar esta melodía. ¡A ver si la reconoces!",
        initialCode: `PRINT "Reproduciendo un sonido familiar..."
PLAY "t230"
PLAY "o3l8g>ceg>cel4g.e."
PLAY "o3l8g+>c+e+g+>c+e+l4g+.e+."
PLAY "o3l8b->dfb->dfl4b-.l8b-b-b->l2c."`,
        expectedOutput: "Reproduciendo un sonido familiar..."
      }
    },
    {
      type: 'theory',
      title: "Resumen Musical",
      content: `
¡Felicidades, ahora eres un programador musical!

*   **\`BEEP\`**: Para alertas rápidas y simples.
*   **\`SOUND\`**: Para control total sobre frecuencia y duración. Ideal para efectos de sonido.
*   **\`PLAY\`**: Para componer melodías usando notas y comandos avanzados como T, L y O.

El sonido hace que tus programas sean más interactivos y divertidos. Ahora ve al **Sandbox** y experimenta. ¿Puedes componer tu propia canción? ¿O crear efectos de sonido para un juego? ¡El límite es tu creatividad!
      `
    }
  ]
};