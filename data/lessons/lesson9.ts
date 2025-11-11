import { Lesson } from '../../types';

export const lesson9: Lesson = {
  id: 9,
  title: "Proyecto Final: Tu Aventura",
  description: "Combina todo lo aprendido: Variables, Operaciones, IF y Bucles en un juego real.",
  steps: [
    {
      type: 'theory',
      title: "El Desafío Final",
      content: `
¡Has llegado lejos! Es hora de construir algo GRANDE.
Vamos a crear una **Aventura de Texto**, un tipo de juego donde la imaginación pone los gráficos.

Usaremos todo tu arsenal:
*   **INPUT/PRINT:** Para narrar la historia y preguntar qué hacer.
*   **Variables:** Para recordar la vida del jugador, su ubicación, y si tiene objetos.
*   **IF/ELSE/ELSEIF:** Para decidir qué pasa según las elecciones del jugador.
*   **DO WHILE:** Para que el juego continúe turno tras turno hasta que ganes o pierdas.
      `
    },
    {
      type: 'code',
      title: "El Laberinto del Minotauro",
      content: `
Te despiertas en un laberinto oscuro. Tu objetivo es encontrar la **espada legendaria** para derrotar al **Minotauro** y encontrar la **salida**.

Hemos preparado un juego completo. Tu misión es:
1.  Leer el código y entender cómo las variables \`habitacion\`, \`vida\` y \`tiene_espada\` controlan el juego.
2.  Jugarlo y encontrar la secuencia correcta de acciones para ganar.
3.  ¡Experimentar! Intenta cambiar los textos, añadir una nueva habitación o un nuevo objeto.
      `,
      exercise: {
        prompt: "Derrota al Minotauro y escapa. Pista: explora bien antes de ir a su guarida.",
        initialCode: `REM --- CONFIGURACIÓN INICIAL DEL JUEGO ---
jugando = 1
vida = 3
habitacion = 1 ' 1=Inicio, 2=Armería, 3=Guarida del Minotauro
tiene_espada = 0

PRINT "=== EL LABERINTO DEL MINOTAURO ==="
PRINT "Te despiertas en una habitación de piedra fría."
PRINT "Escuchas un rugido lejano..."

DO WHILE jugando = 1
    REM --- BUCLE PRINCIPAL DEL JUEGO ---
    PRINT "" ' Línea en blanco para separar turnos
    
    REM --- DESCRIPCIÓN DE LA HABITACIÓN ACTUAL ---
    IF habitacion = 1 THEN
        PRINT "Estás en la sala inicial. Hay puertas al NORTE y al ESTE."
    ELSEIF habitacion = 2 THEN
        PRINT "Estás en una vieja armería. Hay una puerta al SUR."
    ELSEIF habitacion = 3 THEN
        PRINT "¡Estás en la guarida del Minotauro! La bestia duerme... por ahora."
        PRINT "Ves una salida al OESTE."
    END IF

    REM --- ESPERAR ACCIÓN DEL JUGADOR ---
    INPUT "> ", accion$
    
    REM --- PROCESAR ACCIÓN SEGÚN LA HABITACIÓN ---
    IF habitacion = 1 THEN ' Lógica para la Sala Inicial
        IF accion$ = "NORTE" THEN
            habitacion = 2
        ELSEIF accion$ = "ESTE" THEN
            habitacion = 3
        ELSE
            PRINT "No puedes ir por ahí."
        END IF
        
    ELSEIF habitacion = 2 THEN ' Lógica para la Armería
        IF accion$ = "SUR" THEN
            habitacion = 1
        ELSEIF accion$ = "BUSCAR" THEN
            IF tiene_espada = 0 THEN
                PRINT "¡Encuentras una espada legendaria entre los escombros!"
                tiene_espada = 1
            ELSE
                PRINT "No encuentras nada más de interés."
            END IF
        ELSE
            PRINT "No puedes hacer eso aquí."
        END IF
        
    ELSEIF habitacion = 3 THEN ' Lógica para la Guarida
        IF accion$ = "OESTE" THEN
            habitacion = 1
        ELSEIF accion$ = "ATACAR" THEN
            IF tiene_espada = 1 THEN
                PRINT "Con la espada en mano, derrotas al Minotauro. ¡La salida está libre!"
                PRINT "--- GANASTE ---"
                jugando = 0
            ELSE
                PRINT "Intentas atacar con tus puños... El Minotauro se despierta y te derrota."
                vida = 0
            END IF
        ELSE
            PRINT "Haces un ruido y el Minotauro se mueve. ¡Mejor no molestarlo!"
            vida = vida - 1
        END IF
    END IF
    
    REM --- COMPROBAR SI EL JUGADOR HA PERDIDO ---
    IF vida <= 0 THEN
        PRINT "Has sido derrotado."
        PRINT "--- FIN DEL JUEGO ---"
        jugando = 0
    END IF
LOOP
`,
         solutionCues: ['DO WHILE', 'IF', 'INPUT']
      }
    },
    {
      type: 'theory',
      title: "¡Felicidades, Programador!",
      content: `
Has completado el curso básico de MiniCoder.
Lo que has hecho en este último ejercicio es la base de TODOS los videojuegos: un **Bucle Principal** (Game Loop) que repite constantemente:
1.  Mostrar el estado del juego (dónde estás, qué ves).
2.  Esperar la acción del jugador (\`INPUT\`).
3.  Actualizar el mundo según esa acción (cambiar variables con \`IF\`s).
4.  Comprobar si se ha ganado o perdido.

¡Ahora el límite es tu imaginación! Ve al **Sandbox** y crea tus propias aventuras desde cero.
      `
    }
  ]
};
