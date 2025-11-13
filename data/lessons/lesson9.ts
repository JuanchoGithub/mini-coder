
import { Lesson } from '../../types';

export const lesson9: Lesson = {
  id: 9,
  title: "Proyecto: Aventura de Texto",
  description: "Combina todo lo aprendido: variables, bucles y decisiones para construir tu primer videojuego, una aventura de texto interactiva paso a paso.",
  steps: [
    {
      type: 'theory',
      title: "El Gran Proyecto",
      content: `
¡Has llegado lejos! Es hora de combinar todo tu conocimiento para construir algo más grande y complejo que cualquier cosa que hayas hecho antes: un **videojuego**.

Crearemos una **Aventura de Texto**, un género clásico donde la historia y las decisiones son lo más importante. La imaginación del jugador crea los gráficos. Para construirlo, necesitarás usar todo tu arsenal de programación:

*   **\`PRINT\` e \`INPUT\`:** Para describir el mundo al jugador y recibir sus comandos. Serán nuestros ojos y oídos.
*   **Variables:** Para recordar el estado del juego. ¿Dónde está el jugador? ¿Cuánta vida le queda? ¿Ha encontrado la llave secreta? Las variables serán la memoria de nuestro mundo.
*   **\`IF/ELSEIF/ELSE\`:** Para crear las reglas del juego. Si el jugador usa la llave en la puerta correcta, se abre. Si entra en la guarida del dragón sin una espada, pierde. Las decisiones son el cerebro de nuestro juego.
*   **\`DO WHILE\`:** Para mantener el juego en marcha. El juego se repetirá, turno tras turno, hasta que el jugador gane o pierda. Este es el corazón que mantiene vivo nuestro juego.

¿Listo para convertirte en un creador de mundos? ¡Empecemos!
      `
    },
    {
      type: 'theory',
      title: "El Corazón del Juego: El Bucle Principal",
      content: `
Todo videojuego, desde el más simple al más complejo, se basa en una idea fundamental: el **Bucle Principal** (o "Game Loop").

Es un bucle \`DO WHILE\` que se repite indefinidamente mientras el juego esté activo. En cada repetición (o "turno"), el juego hace tres cosas:
1.  **Procesa la entrada del jugador:** ¿Qué botón ha pulsado? ¿Qué ha escrito?
2.  **Actualiza el estado del juego:** Mueve al personaje, reduce la vida de un enemigo, añade un objeto al inventario.
3.  **Renderiza el resultado:** Dibuja la nueva situación en la pantalla.

Usaremos una **variable bandera** para controlar nuestro bucle, como aprendimos en la lección anterior.

\`\`\`basic
' 1. Inicializamos la bandera
jugando = 1 ' 1 significa "el juego está activo"

' 2. Creamos el bucle
DO WHILE jugando = 1
    PRINT "--- Nuevo Turno ---"
    ' Aquí irá toda la lógica del juego...
LOOP

PRINT "--- Fin del Juego ---"
\`\`\`
El juego quedará "atrapado" dentro de este bucle hasta que algo dentro cambie el valor de \`jugando\` a 0.
      `
    },
    {
      type: 'code',
      title: "Práctica: Creando el Corazón",
      content: `
Vamos a crear el esqueleto de nuestro juego. Tu tarea es construir un bucle principal que se detenga después de 5 turnos. Esto nos enseña a controlar la salida del bucle.
      `,
      exercise: {
        prompt: "Crea un bucle controlado por una bandera `jugando`. Usa un contador para que, después de 5 turnos, la bandera `jugando` se ponga a 0 y el bucle termine.",
        initialCode: `jugando = 1
contador_turnos = 0

' Escribe tu bucle DO WHILE aquí.
' Dentro del bucle:
' 1. Imprime "Turno número " y el contador.
' 2. Incrementa el contador.
' 3. Usa un IF para comprobar si el contador ha llegado a 5.
'    Si es así, cambia 'jugando' a 0.
`,
        expectedOutput: "Turno número 1\nTurno número 2\nTurno número 3\nTurno número 4\nTurno número 5",
        solution: `jugando = 1
contador_turnos = 0

DO WHILE jugando = 1
    contador_turnos = contador_turnos + 1
    PRINT "Turno número " + contador_turnos
    IF contador_turnos >= 5 THEN
        jugando = 0
    END IF
LOOP`
      }
    },
    {
      type: 'theory',
      title: "El Estado del Mundo: Variables Clave",
      content: `
Nuestro juego necesita memoria. Antes de que empiece el bucle, debemos definir todas las variables que describirán el estado inicial del mundo y del jugador.

Para nuestra aventura, "El Laberinto del Minotauro", necesitaremos:
*   **\`vida = 3\`**: La salud del jugador. Si llega a 0, pierde.
*   **\`habitacion = 1\`**: La ubicación actual del jugador. Usaremos números para identificar cada sala (1=Inicio, 2=Armería, etc.).
*   **\`tiene_espada = 0\`**: Un indicador (0 para no, 1 para sí) para saber si el jugador ha encontrado la espada. Esto es una variable bandera para el inventario.

Estas variables se declaran **una sola vez**, antes de que comience el \`DO WHILE\`. Dentro del bucle, las **modificaremos** para reflejar los cambios en el juego.
      `
    },
    {
      type: 'code',
      title: "Práctica: Definiendo al Héroe",
      content: `
Ahora, añade las variables de estado a tu código. Colócalas justo antes de que empiece el bucle principal.
      `,
      exercise: {
        prompt: "Añade las variables `vida`, `habitacion` y `tiene_espada` con sus valores iniciales. Luego, imprime un reporte de estado antes de que comience el bucle.",
        initialCode: `' --- Variables de Estado ---
' Define aquí 'vida', 'habitacion' y 'tiene_espada'


' --- Reporte Inicial ---
PRINT "--- INICIO DE LA AVENTURA ---"
PRINT "Vida inicial: " + vida
PRINT "Ubicación: Habitación " + habitacion


jugando = 1
DO WHILE jugando = 1
    PRINT "El juego está en marcha..."
    jugando = 0 ' Salimos para que no sea infinito
LOOP
`,
        expectedOutput: "--- INICIO DE LA AVENTURA ---\nVida inicial: 3\nUbicación: Habitación 1\nEl juego está en marcha...",
        solution: `' --- Variables de Estado ---
vida = 3
habitacion = 1
tiene_espada = 0

' --- Reporte Inicial ---
PRINT "--- INICIO DE LA AVENTURA ---"
PRINT "Vida inicial: " + vida
PRINT "Ubicación: Habitación " + habitacion

jugando = 1
DO WHILE jugando = 1
    PRINT "El juego está en marcha..."
    jugando = 0 ' Salimos para que no sea infinito
LOOP`
      }
    },
    {
      type: 'theory',
      title: "Describiendo el Entorno con IF",
      content: `
Dentro del bucle, lo primero que debemos hacer en cada turno es decirle al jugador dónde está. Usaremos la variable \`habitacion\` y un bloque \`IF/ELSEIF\` para mostrar la descripción correcta.

\`\`\`basic
DO WHILE jugando = 1
    ' ...
    IF habitacion = 1 THEN
        PRINT "Estás en una sala de piedra fría. Hay una puerta al NORTE."
    ELSEIF habitacion = 2 THEN
        PRINT "Estás en una armería oxidada. Hay una puerta al SUR."
    END IF
    ' ...
LOOP
\`\`\`
De esta forma, el juego se vuelve dinámico. A medida que la variable \`habitacion\` cambie, el jugador verá descripciones diferentes.
      `
    },
    {
      type: 'code',
      title: "Práctica: La Primera Habitación",
      content: `
Añade la lógica para describir la habitación dentro de tu bucle de juego. Por ahora, como el jugador siempre empieza en la habitación 1, siempre verá la misma descripción.
      `,
      exercise: {
        prompt: "Dentro del bucle, añade un bloque IF que compruebe si `habitacion` es 1. Si es así, imprime 'Estás en la sala inicial. Hay puertas al NORTE y al ESTE.'",
        initialCode: `vida = 3
habitacion = 1
tiene_espada = 0

jugando = 1
DO WHILE jugando = 1
    
    ' --- Describe la habitación aquí ---


    PRINT "Aún no puedes moverte."
    jugando = 0 ' Salimos para que no sea infinito
LOOP
`,
        expectedOutput: "Estás en la sala inicial. Hay puertas al NORTE y al ESTE.\nAún no puedes moverte.",
        solution: `vida = 3
habitacion = 1
tiene_espada = 0

jugando = 1
DO WHILE jugando = 1
    
    ' --- Describe la habitación aquí ---
    IF habitacion = 1 THEN
        PRINT "Estás en la sala inicial. Hay puertas al NORTE y al ESTE."
    END IF

    PRINT "Aún no puedes moverte."
    jugando = 0 ' Salimos para que no sea infinito
LOOP`
      }
    },
    {
      type: 'theory',
      title: "La Voz del Jugador: INPUT y Comandos",
      content: `
Ahora que el jugador sabe dónde está, necesita poder actuar. Usaremos \`INPUT\` para pedirle un comando y lo guardaremos en una variable de texto, como \`accion$\`.

\`\`\`basic
' ... dentro del bucle ...
INPUT "> ", accion$
\`\`\`
El \`"> "\` es un "prompt" clásico en las aventuras de texto, indicando que el juego espera una orden.

Una vez que tenemos el comando en \`accion$\`, necesitamos procesarlo. Esto se hace con otro bloque \`IF/ELSEIF\` anidado dentro del \`IF\` de la habitación. La lógica es: "SI estoy en esta habitación, Y el jugador hace esta acción, ENTONCES cambia el estado del juego".

\`\`\`basic
IF habitacion = 1 THEN
    ' ... descripción ...
    INPUT "> ", accion$
    
    IF accion$ = "NORTE" THEN
        habitacion = 2 ' ¡Cambiamos la ubicación del jugador!
    ELSE
        PRINT "No puedes hacer eso."
    END IF
END IF
\`\`\`
      `
    },
    {
      type: 'code',
      title: "Práctica: Abriendo la Primera Puerta",
      content: `
¡Vamos a darle movimiento al jugador! Añade la lógica para que el jugador pueda moverse de la habitación 1 (Inicio) a la 2 (Armería) escribiendo "NORTE". Para verificar que funciona, imprimiremos el nuevo valor de \`habitacion\`.
      `,
      exercise: {
        prompt: "Añade un INPUT para la `accion$`. Si el jugador está en la habitación 1 y escribe 'NORTE', cambia el valor de `habitacion` a 2.",
        initialCode: `habitacion = 1
jugando = 1

DO WHILE jugando = 1
    IF habitacion = 1 THEN
        PRINT "Estás en la sala inicial. Hay una puerta al NORTE."
        ' --- Añade tu código aquí ---
        ' 1. Pide un comando con INPUT y guárdalo en accion$
        ' 2. Si accion$ es "NORTE", cambia habitacion a 2

        PRINT "Nueva ubicación: " + habitacion ' Para depurar
    END IF
    
    jugando = 0
LOOP`,
        expectedOutput: "Estás en la sala inicial. Hay una puerta al NORTE.\nNueva ubicación: 2",
        solution: `habitacion = 1
jugando = 1

DO WHILE jugando = 1
    IF habitacion = 1 THEN
        PRINT "Estás en la sala inicial. Hay una puerta al NORTE."
        INPUT "> ", accion$
        IF accion$ = "NORTE" THEN
            habitacion = 2
        END IF
        PRINT "Nueva ubicación: " + habitacion ' Para depurar
    END IF
    
    jugando = 0
LOOP`
      }
    },
    {
      type: 'theory',
      title: "Peligro y Recompensa",
      content: `
Un juego no es divertido sin objetivos y peligros. Vamos a añadir dos mecánicas:

1.  **Encontrar un objeto:** En la Armería (habitación 2), si el jugador escribe "BUSCAR", podemos cambiar la variable \`tiene_espada\` de 0 a 1. Debemos usar un \`IF\` para que esto solo funcione si aún no la tiene.

2.  **Ganar o Perder:** Al final de cada turno del bucle, debemos comprobar las condiciones de fin de juego.
    *   **Perder:** \`IF vida <= 0 THEN jugando = 0\`.
    *   **Ganar:** \`IF minotauro_derrotado = 1 THEN jugando = 0\`.

Al cambiar \`jugando\` a 0, el bucle \`DO WHILE\` se detendrá en la siguiente comprobación, terminando el juego.
      `
    },
    {
      type: 'code',
      title: "El Desafío Final: El Laberinto del Minotauro",
      content: `
Es hora de juntar todas las piezas. Aquí está el código casi completo para "El Laberinto del Minotauro". Tu misión final es programar la lógica de la habitación más peligrosa: la guarida del Minotauro (habitación 3).
      `,
      exercise: {
        prompt: "Completa la sección `ELSEIF habitacion = 3`. Si el jugador escribe 'ATACAR', debes comprobar si `tiene_espada` es 1. Si es así, gana el juego (imprime victoria y pon `jugando = 0`). Si no, pierde (imprime derrota y pon `vida = 0`).",
        initialCode: `REM --- CONFIGURACIÓN INICIAL DEL JUEGO ---
jugando = 1
vida = 3
habitacion = 1 ' 1=Inicio, 2=Armería, 3=Guarida
tiene_espada = 0

PRINT "=== EL LABERINTO DEL MINOTAURO ==="

DO WHILE jugando = 1
    PRINT "" 
    
    IF habitacion = 1 THEN
        PRINT "Estás en la sala inicial. Hay puertas al NORTE y al ESTE."
        INPUT "> ", accion$
        IF accion$ = "NORTE" THEN
            habitacion = 2
        ELSEIF accion$ = "ESTE" THEN
            habitacion = 3
        END IF
        
    ELSEIF habitacion = 2 THEN
        PRINT "Estás en una vieja armería. Hay una puerta al SUR."
        INPUT "> ", accion$
        IF accion$ = "SUR" THEN
            habitacion = 1
        ELSEIF accion$ = "BUSCAR" THEN
            IF tiene_espada = 0 THEN
                PRINT "¡Encuentras una espada legendaria!"
                tiene_espada = 1
            ELSE
                PRINT "No encuentras nada más."
            END IF
        END IF
        
    ELSEIF habitacion = 3 THEN
        PRINT "¡Estás en la guarida del Minotauro!"
        ' --- TU CÓDIGO VA AQUÍ ---
        ' 1. Pide un comando con INPUT.
        ' 2. Si el comando es "ATACAR":
        '    - Si tiene_espada es 1, imprime un mensaje de victoria y pon jugando = 0.
        '    - Si no, imprime un mensaje de derrota y pon vida = 0.
        ' 3. Si el comando es "OESTE", vuelve a la habitación 1.

    END IF
    
    IF vida <= 0 THEN
        PRINT "--- FIN DEL JUEGO ---"
        jugando = 0
    END IF
LOOP
`,
         solutionCues: ['INPUT', 'IF', 'ATACAR', 'tiene_espada'],
         solution: `REM --- CONFIGURACIÓN INICIAL DEL JUEGO ---
jugando = 1
vida = 3
habitacion = 1 ' 1=Inicio, 2=Armería, 3=Guarida
tiene_espada = 0

PRINT "=== EL LABERINTO DEL MINOTAURO ==="

DO WHILE jugando = 1
    PRINT "" 
    
    IF habitacion = 1 THEN
        PRINT "Estás en la sala inicial. Hay puertas al NORTE y al ESTE."
        INPUT "> ", accion$
        IF accion$ = "NORTE" THEN
            habitacion = 2
        ELSEIF accion$ = "ESTE" THEN
            habitacion = 3
        ELSE
            PRINT "No entiendo ese comando."
        END IF
        
    ELSEIF habitacion = 2 THEN
        PRINT "Estás en una vieja armería. Hay una puerta al SUR."
        INPUT "> ", accion$
        IF accion$ = "SUR" THEN
            habitacion = 1
        ELSEIF accion$ = "BUSCAR" THEN
            IF tiene_espada = 0 THEN
                PRINT "¡Encuentras una espada legendaria!"
                tiene_espada = 1
            ELSE
                PRINT "No encuentras nada más."
            END IF
        ELSE
            PRINT "No entiendo ese comando."
        END IF
        
    ELSEIF habitacion = 3 THEN
        PRINT "¡Estás en la guarida del Minotauro! Te ataca sin piedad."
        INPUT "> ", accion$
        IF accion$ = "ATACAR" THEN
            IF tiene_espada = 1 THEN
                PRINT "¡Con la espada legendaria, derrotas al Minotauro! ¡Has ganado!"
                jugando = 0
            ELSE
                PRINT "Atacas con tus manos desnudas. El Minotauro te derrota fácilmente."
                vida = 0
            END IF
        ELSEIF accion$ = "OESTE" THEN
            habitacion = 1
            PRINT "Huyes de la batalla."
        ELSE
            PRINT "El Minotauro no te da tiempo. ¡Has sido derrotado!"
            vida = 0
        END IF
    END IF
    
    IF vida <= 0 THEN
        PRINT "--- FIN DEL JUEGO ---"
        jugando = 0
    END IF
LOOP
`
      }
    },
    {
      type: 'theory',
      title: "¡Felicidades, Creador de Mundos!",
      content: `
¡Lo has conseguido! Has construido un videojuego completo desde cero.

Has aprendido a pensar como un programador: descomponiendo un problema grande (un juego) en piezas más pequeñas y manejables (un bucle, variables, decisiones) y luego ensamblándolas en un todo funcional.

Lo que has hecho en este último ejercicio es la base de TODOS los videojuegos: un **Bucle Principal** (Game Loop) que repite constantemente:
1.  **Mostrar el estado del juego** (dónde estás, qué ves).
2.  **Esperar la acción del jugador** (\`INPUT\`).
3.  **Actualizar el mundo** según esa acción (cambiar variables con \`IF\`s).
4.  **Comprobar si se ha ganado o perdido**.

Ahora tienes el poder de crear. El límite es tu imaginación. Ve al **Sandbox** y experimenta. ¿Puedes añadir una poción de vida? ¿Una nueva habitación con un puzzle? ¿Un tesoro escondido?

**El viaje del programador no ha hecho más que empezar.**
      `
    }
  ]
};