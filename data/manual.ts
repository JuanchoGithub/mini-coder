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
    example: `' Ejemplo 1: Asignación simple
nombre$ = "MiniCoder"
edad = 12
PRINT "Hola, soy " + nombre$
PRINT "Tengo " + edad + " años"

' Ejemplo 2: Actualizando una variable
puntos = 100
PRINT "" ' Línea en blanco para separar
PRINT "Puntos iniciales: " + puntos
' El jugador gana 50 puntos
puntos = puntos + 50
PRINT "Puntos actualizados: " + puntos`
  },
  {
    id: 'print',
    title: 'PRINT',
    category: 'Entrada/Salida',
    description: 'Usa `PRINT` para mostrar información en la pantalla. Puedes mostrar texto entre comillas, valores de variables, o resultados de operaciones.',
    syntax: 'PRINT expresión',
    example: `' Ejemplo 1: Imprimir texto y el valor de una variable
PRINT "Hola Mundo"
puntos = 100
PRINT "Tienes " + puntos + " puntos"

' Ejemplo 2: Imprimir el resultado de un cálculo
PRINT "50 por 2 es: " + (50 * 2)

' Ejemplo 3: Imprimir el resultado de una comparación (1=Verdadero, 0=Falso)
edad = 20
PRINT "¿Es mayor de edad? (1=Sí, 0=No): " + (edad >= 18)`
  },
  {
    id: 'input',
    title: 'INPUT',
    category: 'Entrada/Salida',
    description: '`INPUT` detiene el programa y espera a que el usuario escriba algo con el teclado. Lo que el usuario escribe se guarda en la variable que elijas.',
    syntax: 'INPUT "Mensaje opcional ", variable',
    example: `' Ejemplo 1: Pidiendo texto
INPUT "Escribe tu nombre: ", nombre$
PRINT "¡Mucho gusto, " + nombre$ + "!"

' Ejemplo 2: Pidiendo números para un cálculo
PRINT ""
PRINT "--- Calculadora de Área de Rectángulo ---"
INPUT "Ancho: ", ancho
INPUT "Alto: ", alto
area = ancho * alto
PRINT "El área del rectángulo es: " + area`
  },
  {
    id: 'if',
    title: 'IF ... THEN',
    category: 'Decisiones',
    description: 'Permite que tu programa tome decisiones. Si la condición es VERDADERA, ejecuta el código que sigue a `THEN`.',
    syntax: 'IF condición THEN\n  (código)\nEND IF',
    example: `' Ejemplo 1: Condición simple
puntos = 100
IF puntos >= 100 THEN
  PRINT "¡Ganaste el juego!"
  PRINT "Eres un campeón."
END IF

' Ejemplo 2: Condición compuesta con AND
edad = 25
tiene_licencia = 1 ' 1 para Sí, 0 para No
PRINT ""
PRINT "--- Requisitos para alquilar auto ---"
IF edad >= 18 AND tiene_licencia = 1 THEN
  PRINT "Puedes alquilar el auto."
END IF`
  },
  {
    id: 'else',
    title: 'ELSE / ELSEIF',
    category: 'Decisiones',
    description: 'Se usa con `IF` para decidir qué hacer cuando la condición NO es verdadera (`ELSE`), o para probar otra condición (`ELSEIF`).',
    syntax: 'IF condición1 THEN\n  ...\nELSEIF condición2 THEN\n  ...\nELSE\n  ...\nEND IF',
    example: `' Ejemplo 1: Rangos de edad
INPUT "Tu edad: ", edad
IF edad >= 18 THEN
  PRINT "Eres adulto"
ELSEIF edad >= 13 THEN
  PRINT "Eres adolescente"
ELSE
  PRINT "Eres un niño"
END IF

' Ejemplo 2: Contraseña
clave_secreta$ = "abracadabra"
PRINT ""
INPUT "Introduce la contraseña: ", intento$
IF intento$ = clave_secreta$ THEN
    PRINT "Acceso concedido."
ELSE
    PRINT "Contraseña incorrecta."
END IF`
  },
  {
    id: 'for',
    title: 'FOR ... NEXT',
    category: 'Bucles',
    description: 'Crea un bucle que se repite un número exacto de veces. La computadora cuenta automáticamente usando una variable.',
    syntax: 'FOR variable = inicio TO fin [STEP paso]\n  (código a repetir)\nNEXT variable',
    example: `' Ejemplo 1: Tabla de multiplicar
PRINT "Tabla del 5:"
FOR i = 1 TO 10
  PRINT "5 x " + i + " = " + (5 * i)
NEXT i

' Ejemplo 2: Cuenta regresiva con STEP
PRINT ""
PRINT "Cuenta regresiva:"
FOR t = 5 TO 1 STEP -1
  PRINT t + "..."
NEXT t
PRINT "¡DESPEGUE!"

' Ejemplo 3: Sumar los números del 1 al 100
suma = 0
FOR n = 1 TO 100
    suma = suma + n
NEXT n
PRINT ""
PRINT "La suma de los números del 1 al 100 es: " + suma`
  },
  {
    id: 'do',
    title: 'DO WHILE ... LOOP',
    category: 'Bucles',
    description: 'Repite un bloque de código MIENTRAS una condición sea verdadera. Útil cuando no sabes exactamente cuántas veces necesitas repetir algo.',
    syntax: 'DO WHILE condición\n  (código a repetir)\nLOOP',
    example: `' Ejemplo 1: Juego de adivinar el número
secreto = RND(10) ' Un número aleatorio del 1 al 10
respuesta = 0

PRINT "Adivina el número (1-10)"
DO WHILE respuesta <> secreto
  INPUT "¿Cuál es? ", respuesta
  IF respuesta < secreto THEN PRINT "Más alto..."
  IF respuesta > secreto THEN PRINT "Más bajo..."
LOOP
PRINT "¡Correcto! Era el " + secreto

' Ejemplo 2: Menú interactivo
opcion = 0
DO WHILE opcion <> 3
    PRINT ""
    PRINT "--- MENÚ ---"
    PRINT "1. Saludar"
    PRINT "2. Contar un chiste"
    PRINT "3. Salir"
    INPUT "Elige una opción: ", opcion
    
    IF opcion = 1 THEN
        PRINT "¡Hola, MiniCoder!"
    ELSEIF opcion = 2 THEN
        PRINT "¿Qué le dice un pez a otro? ¡Nada!"
    END IF
LOOP
PRINT "¡Hasta luego!"`
  },
   {
    id: 'dim',
    title: 'DIM (Arreglos)',
    category: 'Arreglos',
    description: '`DIM` (dimensión) se usa para declarar un "arreglo", que es como una lista o un casillero con múltiples compartimentos numerados. En lugar de tener variables separadas como `item1`, `item2`, `item3`, puedes tener un solo arreglo llamado `item` y acceder a sus elementos con un índice: `item(1)`, `item(2)`, etc. Los índices en MiniQB empiezan en 1.',
    syntax: 'DIM nombre_arreglo(tamaño)',
    example: `' Ejemplo 1: Guardar y leer datos
DIM nombres$(3)
nombres$(1) = "Ana"
nombres$(2) = "Luis"
nombres$(3) = "Eva"

PRINT "Recorriendo la lista de nombres:"
FOR i = 1 TO 3
    PRINT "Bienvenido/a, " + nombres$(i)
NEXT i

' Ejemplo 2: Llenar un arreglo con INPUT
DIM compras$(3)
PRINT ""
PRINT "--- Lista de Compras ---"
FOR i = 1 TO 3
    INPUT "Producto " + i + ": ", compras$(i)
NEXT i

PRINT ""
PRINT "Tu lista final es:"
FOR i = 1 TO 3
    PRINT "- " + compras$(i)
NEXT i`
  },
  {
    id: 'rnd',
    title: 'RND',
    category: 'Funciones',
    description: 'Devuelve un número entero aleatorio entre 1 y un máximo que tú especifiques. Es la función clave para crear juegos impredecibles y divertidos.',
    syntax: 'RND(número_máximo)',
    example: `' Ejemplo 1: Simular un dado de 6 caras
dado = RND(6)
PRINT "Salió el número " + dado

' Ejemplo 2: Elegir un enemigo aleatorio para una batalla
PRINT ""
enemigo_aleatorio = RND(3)
IF enemigo_aleatorio = 1 THEN
    PRINT "¡Apareció un Slime!"
ELSEIF enemigo_aleatorio = 2 THEN
    PRINT "¡Apareció un Goblin!"
ELSE
    PRINT "¡Apareció un Dragón!"
END IF

' Ejemplo 3: Posicionar un tesoro en un mapa de 100x100
PRINT ""
tesoro_x = RND(100)
tesoro_y = RND(100)
PRINT "El tesoro está escondido en las coordenadas: (" + tesoro_x + ", " + tesoro_y + ")"`
  },
  {
    id: 'beep',
    title: 'BEEP',
    category: 'Sonido',
    description: 'Produce un sonido corto y simple, como un pitido de sistema. Útil para dar feedback al usuario, como en un error o al completar una acción.',
    syntax: 'BEEP',
    example: `' Ejemplo 1: Una simple alerta
INPUT "Contraseña: ", clave$
IF clave$ <> "1234" THEN
    BEEP
    PRINT "Acceso denegado."
END IF

' Ejemplo 2: Crear un ritmo simple con un bucle
PRINT ""
PRINT "Escucha el ritmo..."
FOR i = 1 TO 4
    BEEP
    ' Este bucle vacío crea una pequeña pausa.
    ' La computadora contará de 1 a 500 muy rápido.
    FOR pausa = 1 TO 500
    NEXT pausa
NEXT i`
  },
  {
    id: 'sound',
    title: 'SOUND',
    category: 'Sonido',
    description: 'A diferencia de BEEP, produce un sonido con una frecuencia y duración variables. La frecuencia se mide en Hertz (rango de 37 a 32767). La duración se mide en "ticks" de reloj, donde aproximadamente 18.2 ticks equivalen a un segundo.',
    syntax: 'SOUND frecuencia, duracion',
    example: `' Ejemplo 1: Tocar notas específicas
' Toca la nota LA (A4), que es 440 Hz, durante medio segundo (aprox. 9 ticks)
PRINT "Tocando nota LA (A)..."
SOUND 440, 9

' Toca una nota DO (C4) grave por un segundo (aprox. 18 ticks)
PRINT "Tocando nota DO (C)..."
SOUND 261.63, 18

' Ejemplo 2: Tocar una escala musical simple (Do, Re, Mi, Fa)
PRINT ""
PRINT "Tocando una escala..."
SOUND 261.63, 9 ' Do
SOUND 293.66, 9 ' Re
SOUND 329.63, 9 ' Mi
SOUND 349.23, 9 ' Fa`
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
    example: `' Ejemplo 1: Una melodía simple ("Estrellita Dónde Estás")
' T120=Tempo normal, O4=Octava 4, L8=Corcheas, G4=Sol como negra
PLAY "T120 O4 L8 C C G G A A G4 F F E E D D C4"

' Ejemplo 2: Usando comandos para crear efectos
' Sube y baja de octava, cambia de estilo (Staccato/Legato)
' y añade pausas.
PLAY "O3 T150 L8" ' Configuración inicial
PLAY "C D E F P8"  ' Sube y hace una pausa de corchea
PLAY "> C D E F"    ' Sube una octava y sigue
PLAY "ML G4"      ' Toca un Sol largo y conectado (Legato)
PLAY "MS < G F E D C4" ' Baja octava, toca rápido y picado (Staccato)`
  },
  {
    id: 'cls',
    title: 'CLS',
    category: 'Entrada/Salida',
    description: 'Limpia la pantalla de resultados (Consola). Útil al principio de un programa o juego.',
    syntax: 'CLS',
    example: `' Ejemplo 1: Limpieza básica
PRINT "Línea 1"
PRINT "Línea 2"
' El comando CLS borrará todo lo que se imprimió antes.
CLS
PRINT "¡Pantalla limpia!"

' Ejemplo 2: Usado en un menú simple para una mejor experiencia
PRINT "Presiona Enter para continuar..."
INPUT a$ ' Pausa para que el usuario pueda leer
CLS
PRINT "--- BIENVENIDO AL MENÚ ---"`
  },
  {
    id: 'rem',
    title: 'REM o \'',
    category: 'Conceptos',
    description: 'Permite escribir comentarios para ti mismo. La computadora ignora todo lo que escribas después de `REM` o una comilla simple (`\'`).',
    syntax: 'REM comentario  O  \' comentario',
    example: `' Ejemplo 1: Comentarios para explicar el código
REM Este programa calcula un promedio
' Primero, definimos las variables
nota1 = 10
nota2 = 8

' Ejemplo 2: Usar ' para deshabilitar una línea temporalmente
PRINT "Esta línea se ejecutará."
' PRINT "Esta línea NO se ejecutará porque es un comentario."
PRINT "Esta línea también se ejecutará."`
  }
];