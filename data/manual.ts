export interface ManualEntry {
  id: string;
  title: string;
  category: 'Conceptos' | 'Entrada/Salida' | 'Decisiones' | 'Bucles' | 'Funciones';
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