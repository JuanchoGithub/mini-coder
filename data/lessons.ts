
import { Lesson } from '../types';

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "Las Bases",
    description: "¿Qué es realmente programar? Idiomas y traductores.",
    steps: [
      {
        type: 'theory',
        title: "¿Qué es programar?",
        content: `
Una posible definición sería: **"Darle instrucciones a la computadora para que haga lo que vos necesites."**

Las computadoras hablan un lenguaje llamado **binario** (ceros y unos), ya que en el fondo solo entienden si pasa energía (1) o no (0) por sus circuitos.
        `
      },
      {
        type: 'theory',
        title: "El Traductor",
        content: `
En el mundo hay muchos idiomas (Español, Inglés, Alemán). Para entendernos, usamos un lenguaje común o un **intérprete** (traductor).

Con las computadoras pasa lo mismo. Solo hablan binario, pero hay intérpretes que hablan tanto binario como otros idiomas más fáciles para nosotros (como BASIC, Java, o nuestro MiniQB). Estos traductores convierten tus órdenes al lenguaje de la máquina.
        `
      },
      {
        type: 'code',
        title: "Tu primera orden",
        content: `
Vamos a probar nuestro intérprete. La orden más básica es \`PRINT\` (imprimir), que muestra texto en la pantalla.
        `,
        exercise: {
            prompt: "Escribe: PRINT \"Hola máquina\"",
            initialCode: '',
            expectedOutput: "Hola máquina"
        }
      }
    ]
  },
  {
    id: 2,
    title: "Lógica I: Pensar como máquina",
    description: "La computadora no tiene sentido común. Entrena tu lógica con MiniBot.",
    steps: [
      {
        type: 'theory',
        title: "Sin sentido común",
        content: `
Si te digo "toma café", tu cerebro sabe que debes buscar la taza, ver si quema, agarrarla con cuidado...

La computadora NO sabe nada de eso. Es literal. Si le dices "agarra" y está lejos, agarrará el aire. Si le dices "agarra fuerte" y la taza es frágil, la romperá.
        `
      },
      {
        type: 'logic-simulation-2d',
        title: "Misión: Operación Café",
        content: `
Programa a **MiniBot** para que lleve la taza a la mesa.
Debes ser preciso:
1. Acércate lo suficiente.
2. Usa la fuerza correcta (ni mucha ni poca).
3. Llévala a la zona verde y suéltala.
        `,
        scenarioId: 'coffee-run'
      },
      {
        type: 'theory',
        title: "¿Qué aprendimos?",
        content: `
Para que el robot funcionara, tuviste que pensar en **Pasos Lógicos** y **Parámetros** (como la distancia o la fuerza).
Programar es exactamente eso: dividir un problema grande ("servir café") en pasos pequeñitos que una máquina tonta pueda seguir sin equivocarse.
        `
      }
    ]
  },
  {
    id: 3,
    title: "Lógica II: Verdadero o Falso",
    description: "El mundo binario de las decisiones.",
    steps: [
      {
        type: 'theory',
        title: "Todo es 1 o 0",
        content: `
En el fondo, las decisiones de una computadora son comparaciones que resultan en **VERDADERO (1)** o **FALSO (0)**.
A esto se le llama **Lógica Booleana**.

*   \`5 = 5\` es VERDADERO (1)
*   \`5 = 2\` es FALSO (0)
        `
      },
      {
        type: 'theory',
        title: "Operador AND (Y)",
        content: `
A veces necesitas que se cumplan DOS cosas a la vez. Usamos **AND**.
Solo es verdadero si AMBAS partes lo son.

| Condición A | Condición B | Resultado A AND B |
| :--- | :--- | :--- |
| Falso (0) | Falso (0) | **0 (Falso)** |
| Verdadero (1)| Falso (0) | **0 (Falso)** |
| Falso (0) | Verdadero (1)| **0 (Falso)** |
| Verdadero (1)| Verdadero (1)| **1 (Verdadero)**|
        `
      },
      {
        type: 'code',
        title: "Experimenta con la verdad",
        content: `
Vamos a pedirle a MiniQB que calcule estas verdades.
Recuerda: En QuickBASIC, 'Verdadero' a veces se muestra como -1, pero cualquier cosa distinta de 0 cuenta como Verdad.
        `,
        exercise: {
            prompt: "¿Qué dará (5 > 2) AND (1 = 0)? Piénsalo (Verdadero Y Falso) y ejecútalo.",
            initialCode: `PRINT "5 > 2 es: "
PRINT 5 > 2
PRINT "1 = 0 es: "
PRINT 1 = 0
PRINT "Ambos juntos (AND) es:"
PRINT (5 > 2) AND (1 = 0)`,
            expectedOutput: "0" 
        }
      }
    ]
  },
  {
    id: 4,
    title: "Tu primer programa real",
    description: "Usando los comandos PRINT e INPUT.",
    steps: [
      {
        type: 'theory',
        title: "Hablando (PRINT)",
        content: `
Llegó la hora de escribir en el lenguaje real.
La orden \`PRINT\` muestra información en la pantalla.

Puede mostrar texto fijo (entre comillas): \`PRINT "Hola"\`
O el resultado de cálculos: \`PRINT 2 + 2\`
        `
      },
      {
        type: 'theory',
        title: "Escuchando (INPUT)",
        content: `
Un programa útil necesita datos del usuario. \`INPUT\` detiene el programa y espera a que el usuario escriba algo y pulse Enter.

Necesitamos un lugar donde guardar eso que el usuario escribe. A esos lugares los llamamos **Variables**.
        `
      },
      {
        type: 'code',
        title: "Interactuando",
        content: `
Vamos a combinar ambos. Preguntaremos el nombre al usuario y lo saludaremos.
Fíjate en el uso de \`$\` en \`nombre$\`: indica que esta variable guardará Texto.
        `,
        exercise: {
          prompt: "Ejecuta el programa, escribe tu nombre en la consola cuando aparezca '?', y pulsa Enter.",
          initialCode: `PRINT "¿Cómo te llamas?"
INPUT nombre$
PRINT "Hola, " + nombre$ + ". ¡Bienvenido!"`,
          solutionCues: ['INPUT', 'PRINT']
        }
      }
    ]
  },
  {
    id: 5,
    title: "Variables",
    description: "Las cajas de la memoria.",
    steps: [
      {
        type: 'theory',
        title: "Tipos de datos",
        content: `
Las variables son "cajas" con etiqueta. En MiniQB, la etiqueta nos dice qué podemos guardar dentro:

*   **String ($):** Para texto. Ej: \`nombre$ = "Ana"\`
*   **Numérico (sin símbolo):** Para números. Ej: \`puntos = 100\`
        `
      },
      {
        type: 'code',
        title: "Reasignación",
        content: `
Las variables pueden cambiar de valor (por eso se llaman "variables").
El valor antiguo se pierde para siempre cuando guardas uno nuevo.
        `,
        exercise: {
          prompt: "¿Qué mostrará este código al final? Ejecútalo para verlo.",
          initialCode: `puntos = 100
PRINT puntos
puntos = 200
PRINT puntos
puntos = puntos + 50
PRINT puntos`,
          expectedOutput: "250"
        }
      }
    ]
  },
  {
    id: 6,
    title: "Decisiones (IF)",
    description: "Si pasa esto, haz aquello.",
    steps: [
      {
        type: 'theory',
        title: "IF...THEN",
        content: `
Es el cerebro de tu programa.
\`\`\`basic
IF edad > 18 THEN
   PRINT "Puedes votar"
END IF
\`\`\`
Si la condición es cierta, entra al bloque. Si no, lo salta.
        `
      },
      {
        type: 'code',
        title: "El Portero Virtual",
        content: "Vamos a crear un programa que solo deje pasar a mayores de 13 años.",
        exercise: {
          prompt: "Completa el IF para que si edad < 13 diga 'Eres muy pequeño'.",
          initialCode: `INPUT "Tu edad: ", edad
IF edad < 13 THEN
    PRINT "Eres muy pequeño"
ELSE
    PRINT "Pase adelante"
END IF`,
          solutionCues: ['IF', 'THEN', '<']
        }
      }
    ]
  },
  {
    id: 7,
    title: "Bucles (FOR)",
    description: "Repetir cosas automáticamente.",
    steps: [
      {
        type: 'theory',
        title: "El contador",
        content: `
Si sabes que quieres hacer algo 5 veces, usa \`FOR\`.
\`FOR i = 1 TO 5\` crea una variable \`i\` que cuenta por ti: 1, 2, 3, 4, 5.
        `
      },
      {
        type: 'code',
        title: "La tabla del 7",
        content: "Usemos un bucle para no tener que escribir 10 veces PRINT.",
        exercise: {
          prompt: "Ejecuta y mira cómo la computadora hace el trabajo duro.",
          initialCode: `FOR numero = 1 TO 10
    PRINT "7 x " + numero + " = " + (7 * numero)
NEXT numero`,
          solutionCues: ['FOR', 'NEXT']
        }
      }
    ]
  },
  {
    id: 8,
    title: "Proyecto Final: Aventura",
    description: "Tu propio juego de texto.",
    steps: [
      {
        type: 'theory',
        title: "El plan",
        content: `
Vamos a usar todo lo aprendido para hacer un mini-juego.
Necesitaremos:
1. Un bucle \`DO WHILE\` para que el juego siga hasta terminar.
2. \`PRINT\` e \`INPUT\` para narrar y preguntar qué hacer.
3. \`IF\` para ver si ganaste o perdiste.
        `
      },
      {
        type: 'code',
        title: "El Laberinto",
        content: "Intenta escapar del laberinto. Solo hay una salida correcta.",
        exercise: {
          prompt: "Encuentra la salida (es el ESTE).",
          initialCode: `jugando = 1
PRINT "Estás perdido en un laberinto oscuro."

DO WHILE jugando = 1
    INPUT "¿Vas al NORTE, SUR, ESTE u OESTE? ", direccion$
    
    IF direccion$ = "ESTE" THEN
        PRINT "¡Ves luz! Has encontrado la salida. GANASTE."
        jugando = 0
    ELSEIF direccion$ = "NORTE" THEN
        PRINT "Chocas contra una pared fría."
    ELSE
        PRINT "Te adentras más en la oscuridad... mejor vuelve."
    END IF
LOOP`,
           solutionCues: ['DO WHILE', 'IF', 'ESTE']
        }
      }
    ]
  }
];
