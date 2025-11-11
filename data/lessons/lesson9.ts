
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
*   **Variables:** Para recordar si el jugador tiene la llave, o si sigue vivo.
*   **IF/ELSE:** Para decidir qué pasa según las elecciones del jugador.
*   **DO WHILE:** Para que el juego continúe turno tras turno hasta que ganes o pierdas.
      `
    },
    {
      type: 'code',
      title: "El Laberinto del Minotauro",
      content: `
Te despiertas en un laberinto oscuro. Tienes que encontrar la salida.
Hemos preparado la estructura básica del juego. Tu trabajo es jugarlo, entenderlo, ¡y luego mejorarlo!

**Misión:**
1. Juega una vez para ver cómo funciona.
2. Intenta cambiar el código para añadir una nueva habitación o un monstruo.
      `,
      exercise: {
        prompt: "Encuentra la salida (Pista: ve al ESTE). Luego, ¡intenta modificar el texto!",
        initialCode: `jugando = 1
tiene_llave = 0

PRINT "=== EL LABERINTO ==="
PRINT "Te despiertas en una habitación de piedra fría."

DO WHILE jugando = 1
    PRINT ""
    PRINT "¿Qué haces? (NORTE, SUR, ESTE, OESTE, BUSCAR)"
    INPUT "> ", accion$
    
    IF accion$ = "ESTE" THEN
        IF tiene_llave = 1 THEN
             PRINT "¡Usas la llave en la puerta de hierro! ¡Eres libre!"
             PRINT "--- GANASTE ---"
             jugando = 0
        ELSE
             PRINT "Hay una gran puerta de hierro cerrada con llave al Este."
        END IF
    ELSEIF accion$ = "NORTE" THEN
        PRINT "Un muro sólido te bloquea el paso."
    ELSEIF accion$ = "BUSCAR" THEN
        PRINT "¡Encuentras una llave oxidada en el suelo!"
        tiene_llave = 1
    ELSE
        PRINT "Caminas en la oscuridad y vuelves al mismo lugar. Qué raro."
    END IF
LOOP`,
         solutionCues: ['DO WHILE', 'IF', 'INPUT']
      }
    },
    {
      type: 'theory',
      title: "¡Felicidades, Programador!",
      content: `
Has completado el curso básico de MiniCoder.
Lo que has hecho en este último ejercicio es la base de TODOS los videojuegos: un **Bucle Principal** (Game Loop) que repite constantemente:
1. Mostrar el estado del juego.
2. Esperar la acción del jugador.
3. Actualizar el mundo según esa acción.

¡Ahora el límite es tu imaginación! Ve al **Sandbox** y crea tus propias aventuras desde cero.
      `
    }
  ]
};
