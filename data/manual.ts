
export interface ManualEntry {
  id: string;
  title: string;
  category: 'Conceptos' | 'Entrada/Salida' | 'Decisiones' | 'Bucles' | 'Funciones' | 'Sonido' | 'Arreglos';
  description: string;
  syntax?: string;
  example: string;
}

export const manualData: ManualEntry[] = [
  {
    id: 'variables',
    title: 'Variables',
    category: 'Conceptos',
    description: 'Las variables son "cajas" donde guardas información en la memoria de la computadora. En MiniQB, el nombre de la variable nos dice qué tipo de dato guarda:\n\n* Si termina en **$** (como `nombre$`), guarda **Texto**.\n* Si no (como `edad` o `puntos`), guarda **Números**.',
    example: `nombre$ = "MiniCoder"
edad = 12
PRINT "Hola, soy " + nombre$
PRINT "Tengo " + edad + " años"`
  },
  {
    id: 'print',
    title: 'PRINT',
    category: 'Entrada/Salida',
    description: 'Usa `PRINT` para mostrar información en la pantalla. Puedes mostrar texto entre comillas, valores de variables, o resultados de operaciones.',
    syntax: 'PRINT expresión',
    example: `PRINT "Hola Mundo"
puntos = 100
PRINT "Tienes " + puntos + " puntos"
PRINT 50 * 2`
  },
  {
    id: 'input',
    title: 'INPUT',
    category: 'Entrada/Salida',
    description: '`INPUT` detiene el programa y espera a que el usuario escriba algo con el teclado. Lo que el usuario escribe se guarda en la variable que elijas.',
    syntax: 'INPUT "Mensaje opcional ", variable',
    example: `PRINT "¿Cómo te llamas?"
INPUT nombre$
PRINT "¡Mucho gusto, " + nombre$ + "!"

INPUT "Escribe un número: ", numero
PRINT "El doble es: " + (numero * 2)`
  },
  {
    id: 'if',
    title: 'IF ... THEN',
    category: 'Decisiones',
    description: 'Permite que tu programa tome decisiones. Si la condición es VERDADERA, ejecuta el código que sigue a `THEN`.',
    syntax: 'IF condición THEN\n  (código)\nEND IF',
    example: `puntos = 100
IF puntos >= 100 THEN
  PRINT "¡Ganaste el juego!"
  PRINT "Eres un campeón."
END IF`
  },
  {
    id: 'else',
    title: 'ELSE / ELSEIF',
    category: 'Decisiones',
    description: 'Se usa con `IF` para decidir qué hacer cuando la condición NO es verdadera (`ELSE`), o para probar otra condición (`ELSEIF`).',
    syntax: 'IF condición1 THEN\n  ...\nELSEIF condición2 THEN\n  ...\nELSE\n  ...\nEND IF',
    example: `INPUT "Tu edad: ", edad
IF edad >= 18 THEN
  PRINT "Eres adulto"
ELSEIF edad >= 13 THEN
  PRINT "Eres adolescente"
ELSE
  PRINT "Eres un niño"
END IF`
  },
  {
    id: 'for',
    title: 'FOR ... NEXT',
    category: 'Bucles',
    description: 'Crea un bucle que se repite un número exacto de veces. La computadora cuenta automáticamente usando una variable.',
    syntax: 'FOR variable = inicio TO fin [STEP paso]\n  (código a repetir)\nNEXT variable',
    example: `PRINT "Tabla del 5:"
FOR i = 1 TO 10
  PRINT "5 x " + i + " = " + (5 * i)
NEXT i

PRINT "Cuenta regresiva:"
FOR t = 5 TO 1 STEP -1
  PRINT t + "..."
NEXT t
PRINT "¡DESPEGUE!"`
  },
  {
    id: 'do',
    title: 'DO WHILE ... LOOP',
    category: 'Bucles',
    description: 'Repite un bloque de código MIENTRAS una condición sea verdadera. Útil cuando no sabes exactamente cuántas veces necesitas repetir algo.',
    syntax: 'DO WHILE condición\n  (código a repetir)\nLOOP',
    example: `secreto = 7
respuesta = 0

PRINT "Adivina el número (1-10)"
DO WHILE respuesta <> secreto
  INPUT "¿Cuál es? ", respuesta
  IF respuesta < secreto THEN PRINT "Más alto..."
  IF respuesta > secreto THEN PRINT "Más bajo..."
LOOP
PRINT "¡Correcto! Era el " + secreto`
  },
   {
    id: 'dim',
    title: 'DIM (Arreglos)',
    category: 'Arreglos',
    description: '`DIM` (dimensión) se usa para declarar un "arreglo", que es como una lista o un casillero con múltiples compartimentos numerados. En lugar de tener variables separadas como `item1`, `item2`, `item3`, puedes tener un solo arreglo llamado `item` y acceder a sus elementos con un índice: `item(1)`, `item(2)`, etc. Los índices en MiniQB empiezan en 1.',
    syntax: 'DIM nombre_arreglo(tamaño)',
    example: `' Declara un arreglo para 5 puntajes
DIM puntajes(5)

' Asigna valores a algunos elementos
puntajes(1) = 150
puntajes(2) = 220
puntajes(5) = 180

PRINT "El primer puntaje es: " + puntajes(1)
PRINT "El último puntaje es: " + puntajes(5)

' Los arreglos son poderosos con bucles FOR
DIM nombres$(3)
nombres$(1) = "Ana"
nombres$(2) = "Luis"
nombres$(3) = "Eva"

FOR i = 1 TO 3
    PRINT "Bienvenido/a, " + nombres$(i)
NEXT i`
  },
  {
    id: 'rnd',
    title: 'RND',
    category: 'Funciones',
    description: 'Devuelve un número entero aleatorio entre 1 y un máximo que tú especifiques. Es la función clave para crear juegos impredecibles y divertidos.',
    syntax: 'RND(número_máximo)',
    example: `' Lanza un dado de 6 caras
dado = RND(6)
PRINT "Salió el número " + dado

' Simula una moneda
moneda = RND(2)
IF moneda = 1 THEN
  PRINT "Cara"
ELSE
  PRINT "Cruz"
END IF`
  },
  {
    id: 'beep',
    title: 'BEEP',
    category: 'Sonido',
    description: 'Produce un sonido corto y simple, como un pitido de sistema. Útil para dar feedback al usuario, como en un error o al completar una acción.',
    syntax: 'BEEP',
    example: `' Este programa emite un sonido
PRINT "Escucha..."
BEEP
PRINT "¡Sonó!"`
  },
  {
    id: 'sound',
    title: 'SOUND',
    category: 'Sonido',
    description: 'A diferencia de BEEP, produce un sonido con una frecuencia y duración variables. La frecuencia se mide en Hertz (rango de 37 a 32767). La duración se mide en "ticks" de reloj, donde aproximadamente 18.2 ticks equivalen a un segundo.',
    syntax: 'SOUND frecuencia, duracion',
    example: `' Toca la nota LA (440 Hz) durante medio segundo (aprox. 9 ticks)
PRINT "Tocando nota LA..."
SOUND 440, 9

' Toca una nota más grave (DO) por un segundo (aprox. 18 ticks)
PRINT "Tocando nota DO..."
SOUND 261, 18`
  },
  {
    id: 'play',
    title: 'PLAY (Avanzado)',
    category: 'Sonido',
    description: 'Usa `PLAY` para tocar melodías y partituras complejas. `PLAY` interpreta una cadena de texto que contiene notas y comandos especiales. Los tonos se indican con las letras de la A a la G. Las alteraciones (sostenidos/bemoles) se indican con `+` o `#` (sostenido) o `-` (bemol) justo después de la nota. Los espacios en blanco se ignoran. Los comandos cambian las propiedades de todas las notas que les siguen.',
    syntax: `PLAY "cadena_de_comandos_y_notas"

**Comandos Principales:**
- **Notas:** \`A, B, C, D, E, F, G\`. Pueden llevar \`#\` o \`+\` (sostenido) y \`-\` (bemol). Ej: \`C#\`, \`G+\`, \`A-\`
- **Ln:** Fija la duración de las notas (L1: redonda, L2: blanca, L4: negra, L8: corchea, etc.). Por defecto L4.
- **On:** Fija la octava actual (0-6). Por defecto O4.
- **< >:** Sube o baja una octava.
- **Tn:** Fija el tempo (velocidad) en negras por minuto (32-255). Por defecto T120.
- **Pn:** Pausa con una duración \`n\` (igual que L).
- **.** (punto): Puesto después de una nota, la hace durar 1.5 veces más (nota con puntillo).
- **MN, ML, MS:** Fija el estilo. MN (Normal, 7/8), ML (Legato, duración completa), MS (Staccato, 3/4). Por defecto MN.
- **Nn:** Toca una nota específica por su número MIDI (0-84, 0 es pausa).

**Notación Rápida:** Puedes especificar la duración de una nota directamente con un número. Ej: \`C8\` es lo mismo que \`L8 C\`.`,
    example: `' Toca "Estrellita Dónde Estás" con tempo y octavas
' T180 = Tempo Rápido, O4 = Octava 4
PLAY "T180 O4 L8 C C G G A A G4 F F E E D D C4"

' Una escala cromática subiendo y bajando
PLAY "L16 O3 C C# D D# E F F# G G# A A# B > C < B A# A G# G F# F E D# D C# C"
`
  },
  {
    id: 'cls',
    title: 'CLS',
    category: 'Entrada/Salida',
    description: 'Limpia la pantalla de resultados (Consola). Útil al principio de un programa o juego.',
    syntax: 'CLS',
    example: `PRINT "Esto se borrará en breve..."
FOR i = 1 TO 1000: NEXT i ' Pequeña pausa
CLS
PRINT "¡Pantalla limpia!"`
  },
  {
    id: 'rem',
    title: 'REM o \'',
    category: 'Conceptos',
    description: 'Permite escribir comentarios para ti mismo. La computadora ignora todo lo que escribas después de `REM` o una comilla simple (`\'`).',
    syntax: 'REM comentario  O  \' comentario',
    example: `REM Este programa saluda
' Esto también es un comentario
PRINT "Hola" ' Saludo`
  }
];