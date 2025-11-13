
import { Lesson } from '../../types';

export const lesson3: Lesson = {
  id: 3,
  title: "Lógica II: Pensamiento Booleano",
  description: "Desde diseccionar problemas cotidianos hasta entender las tablas de verdad que rigen a la máquina. Aprende a tomar decisiones binarias y evitar bugs lógicos en tus programas.",
  steps: [
    {
      type: 'theory',
      title: "Parte 1: El Problema Humano",
      content: `
En la lección anterior, vimos que la computadora necesita instrucciones precisas y secuenciales. Decir simplemente "la taza está en la mesa" no es suficiente; podría estar a 1000 metros de altura sobre ella, o la mesa podría estar inclinada, causando que se caiga.

**La computadora no tiene intuición ni contexto implícito.** No asume nada basado en experiencias pasadas o sentido común. Tú, como programador, eres quien debe proveer ese contexto detallado. Debes saber MUY BIEN dónde empiezas (estado inicial), qué recursos tienes y a dónde vas (estado deseado).

Esto es crucial porque los humanos llenamos gaps con conocimiento previo, pero las máquinas no. Por ejemplo, en programación real, si olvidas inicializar una variable (darle un valor inicial), la máquina podría usar un valor basura, causando crashes impredecibles.

¿Por qué importa? En IA o robótica, un mal entendimiento del contexto puede llevar a fallos catastróficos, como un dron que "ve" un obstáculo pero no "entiende" que debe rodearlo.
      `
    },
    {
      type: 'theory',
      title: "La Trampa de lo Simple",
      content: `
Volvamos al ejercicio del café de la lección pasada.
**Tarea aparente:** Tomar café.
**Respuesta humana típica:** "Agarras la taza y tomas".

Parece fácil, pero si le das esa instrucción vaga a un robot, quizás intente agarrar el líquido directamente (y quemarse las "manos"), porque dijiste "agarra el café", no "la taza que contiene el café". O peor, si la taza está vacía, ¿qué hace?

Para un robot, "agarrar" implica una secuencia precisa: elevar brazo a coordenadas exactas, abrir mano con fuerza calibrada, extender brazo sin colisiones, cerrar mano suavemente. Si el orden falla (por ejemplo, extender con el puño cerrado), ¡golpeas la taza y la rompes!

Analogía: Es como dar indicaciones a un turista perdido: No dices "ve al norte", sino "gira a la derecha en la esquina, camina 200 metros hasta el semáforo, cruza la calle...". En programación, esto se traduce a algoritmos detallados para evitar ambigüedades.
      `
    },
    {
      type: 'theory',
      title: "Introducción a los 'Bugs'",
      content: `
Un **Bug** es un error en tu lógica que produce resultados inesperados o incorrectos, aunque la sintaxis sea perfecta. El término "bug" viene de 1947, cuando una polilla real atascó un relay en una computadora Harvard Mark II – ¡un bug literal!

Imagina que le dices al robot: *"Toma café mientras sientas líquido en los labios"*.
**El Bug potencial:** Si el líquido se mueve ligeramente y por un milisegundo deja de tocar sus labios (debido a vibraciones), el robot pensará que terminó, ¡aunque la taza siga llena! O si hay salpicaduras, podría "tomar" indefinidamente.

Para arreglar estos bugs, necesitamos ser matemáticamente precisos: Definir condiciones claras, límites y chequeos. En programación, usamos debugging tools para rastrear variables paso a paso y encontrar dónde falla la lógica.

Consejo: Siempre asume lo peor – "¿Qué pasa si...?" – y prueba edge cases (casos extremos, como taza vacía o café frío).
      `
    },
    {
      type: 'logic-simulation',
      title: "Práctica: El Bug Invisible",
      content: `
Antes de pasar a la teoría pesada, prueba este escenario interactivo.
Parece una tarea fácil (cambiar una batería en un dispositivo), pero si usas tu "sentido común" humano en lugar de lógica fría y estricta, tendrás un accidente impactante (¡quizás una explosión virtual!).

Objetivo: Sigue los pasos lógicos exactos: Apaga el dispositivo, desconecta cables, remueve batería vieja, inserta nueva, reconecta. Cualquier desviación causa un bug.

Reflexiona después: ¿Qué asumiste que la máquina no podía? Esto te prepara para la lógica booleana.
      `,
      scenarioId: 'battery-fix'
    },
    {
      type: 'theory',
      title: "Parte 2: Lógica Booleana",
      content: `
¿Cómo toma decisiones la computadora? Todo se reduce a dos estados binarios: **VERDADERO** (True) y **FALSO** (False), inspirado en el álgebra booleana de George Boole (siglo XIX). Para la computadora, no existen los "quizás", "más o menos" o probabilidades – todo es 0 o 1.

Internamente, usan números binarios:
*   ✅ **VERDADERO = 1** (circuito encendido)
*   ❌ **FALSO = 0** (circuito apagado)

Esto es la base de todos los procesadores: Millones de transistores que flipan entre 0 y 1 para calcular todo, desde sumar números hasta renderizar gráficos.

En programación, usamos lógica booleana para condicionales (if statements), loops y filtros. Sin ella, tus programas serían lineales y rígidos, sin capacidad de decisión.
      `
    },
    {
      type: 'theory',
      title: "Haciendo Preguntas (Comparadores)",
      content: `
Para obtener respuestas de Verdadero/Falso, usamos **Comparadores** (operadores relacionales). Estos evalúan expresiones y devuelven 1 o 0.

| Símbolo | Significado | Ejemplo | Resultado | Explicación |
| :---: | :--- | :--- | :---: | :--- |
| \`=\` | Igual a | \`5 = 5\` | ✅ 1 | Chequea igualdad exacta (cuidado con tipos: 5 vs "5"). |
| \`<>\` | Distinto a | \`5 <> 8\` | ✅ 1 | Útil para exclusiones. |
| \`>\` | Mayor que | \`10 > 2\` | ✅ 1 | Para rangos superiores. |
| \`<\` | Menor que | \`3 < 1\` | ❌ 0 | Para rangos inferiores. |
| \`>=\` | Mayor o igual | \`5 >= 5\` | ✅ 1 | Incluye el límite. |
| \`<=\` | Menor o igual | \`10 <= 9\` | ❌ 0 | Incluye el límite. |

Nota: En strings, compara alfabéticamente (ej: "A" < "B" es Verdadero). Siempre prueba con datos reales para evitar surprises.
      `
    },
    {
      type: 'code',
      title: "Práctica: Interrogando a la máquina",
      content: `
Vamos a preguntarle cosas a MiniCoder. Usaremos \`PRINT\` para ver si nos responde \`1\` (Verdad) o \`0\` (Mentira). Esto te ayuda a entender cómo la máquina "piensa" en binario.

Intenta predecir qué saldrá antes de ejecutar cada línea. Luego, experimenta cambiando valores para ver cómo cambian los resultados.
      `,
      exercise: {
          prompt: "Añade una línea al final que compruebe si 50 es diferente (<>) de 50. Debería imprimir 0 (Falso). Luego, agrega otra para 50 <= 100 (debe ser 1).",
          initialCode: `PRINT 10 > 5 ' Esto dará 1 (Verdadero)
PRINT 20 >= 20 ' Esto dará 1 (Verdadero)

' Escribe tu código aquí para comprobar si 50 <> 50 y 50 <= 100`,
          expectedOutput: "1\n1\n0\n1",
          solution: `PRINT 10 > 5
PRINT 20 >= 20
PRINT 50 <> 50
PRINT 50 <= 100`
      }
    },
    {
      type: 'theory',
      title: "Tablas de Verdad: El Operador AND",
      content: `
A veces necesitamos cumplir MÁS de una condición simultáneamente.
Por ejemplo: Para entrar a la montaña rusa debes tener "más de 12 años" **Y** "medir más de 1.40m". Si fallas en una, no entras.

El operador **AND** (Y lógico) es muy exigente. SOLO es verdadero si TODAS las condiciones son verdaderas. Es como un "todo o nada".

| Condición A | Condición B | Resultado A AND B | Ejemplo Real |
| :---: | :---: | :---: | :--- |
| ❌ FALSO (0) | ❌ FALSO (0) | 🔴 **FALSO (0)** | Edad <12 AND Altura <1.40: No entra. |
| ❌ FALSO (0) | ✅ VERDAD (1) | 🔴 **FALSO (0)** | Edad <12 AND Altura >1.40: No entra. |
| ✅ VERDAD (1) | ❌ FALSO (0) | 🔴 **FALSO (0)** | Edad >12 AND Altura <1.40: No entra. |
| ✅ VERDAD (1) | ✅ VERDAD (1) | 🟢 **VERDAD (1)** | Edad >12 AND Altura >1.40: Entra. |

En código: Usa paréntesis para claridad en expresiones complejas.
      `
    },
    {
      type: 'code',
      title: "Práctica: AND",
      content: `
Vamos a probar al exigente AND.
Queremos saber si un número es "especial". Para ser especial debe ser mayor que 10 **Y** menor que 20 (es decir, entre 11 y 19).

Experimenta: Cambia 'numero' a valores como 5, 15, 25 y ve los resultados. ¿Qué pasa con bordes como 10 o 20?
      `,
      exercise: {
          prompt: "Cambia el valor de la variable 'numero' a 25. Al ejecutar, el programa ahora debería imprimir que NO es especial (un 0).",
          initialCode: `numero = 15
es_especial = (numero > 10) AND (numero < 20)
PRINT "¿Es especial? " + es_especial`,
          expectedOutput: "¿Es especial? 0",
          solution: `numero = 25
es_especial = (numero > 10) AND (numero < 20)
PRINT "¿Es especial? " + es_especial`
      }
    },
    {
      type: 'theory',
      title: "Tablas de Verdad: El Operador OR",
      content: `
El operador **OR** (O lógico) es más relajado. Es verdadero si AL MENOS UNA de las condiciones es verdadera. Es inclusivo – si ambas son verdaderas, también lo es.

Ejemplo: "Te compro helado si sacas buenas notas **O** si limpias tu cuarto". (Con que hagas una, tienes helado; si haces ambas, mejor aún).

| Condición A | Condición B | Resultado A OR B | Ejemplo Real |
| :---: | :---: | :---: | :--- |
| ❌ FALSO (0) | ❌ FALSO (0) | 🔴 **FALSO (0)** | Malas notas OR Cuarto sucio: No helado. |
| ❌ FALSO (0) | ✅ VERDAD (1) | 🟢 **VERDAD (1)** | Malas notas OR Cuarto limpio: Helado. |
| ✅ VERDAD (1) | ❌ FALSO (0) | 🟢 **VERDAD (1)** | Buenas notas OR Cuarto sucio: Helado. |
| ✅ VERDAD (1) | ✅ VERDAD (1) | 🟢 **VERDAD (1)** | Buenas notas OR Cuarto limpio: Helado. |

Nota: Hay un OR exclusivo (XOR), verdadero solo si exactamente una es verdadera, pero AND/OR son más comunes.
      `
    },
    {
      type: 'theory',
      title: "El Inversor: NOT",
      content: `
A veces queremos lo contrario de una condición. El operador **NOT** (NO lógico) invierte el valor booleano.

| Condición A | Resultado NOT A | Ejemplo |
| :---: | :---: | :--- |
| ❌ FALSO (0) | 🟢 **VERDAD (1)** | NOT (llueve) si no llueve: Verdadero (salimos). |
| ✅ VERDAD (1) | 🔴 **FALSO (0)** | NOT (llueve) si llueve: Falso (no salimos). |

Ejemplo: \`NOT (5 > 10)\`
*   \`5 > 10\` es Falso (0).
*   \`NOT (Falso)\` se convierte en **Verdadero (1)**.

Útil para negaciones: "Si NO es administrador, deniega acceso". Combínalo con AND/OR para lógicas complejas, pero usa paréntesis para evitar confusiones (ej: NOT (A AND B) vs (NOT A) AND B).
      `
    },
    {
      type: 'code',
      title: "Práctica: Combinando NOT",
      content: `
Probemos NOT en acción. Queremos saber si un usuario NO es menor de edad (es decir, mayor o igual a 18).

Cambia la edad y ve cómo invierte el resultado.
      `,
      exercise: {
          prompt: "Agrega NOT a la condición para imprimir 1 si NO es menor (edad >=18). Prueba con edad=17 (debe ser 0).",
          initialCode: `edad = 20
es_menor = (edad < 18)
PRINT "Es menor? " + es_menor

' Agrega aquí con NOT'`,
          expectedOutput: "Es menor? 0\nNo es menor? 1",
          solution: `edad = 17
es_menor = (edad < 18)
PRINT "Es menor? " + es_menor
PRINT "No es menor? " + (NOT es_menor)`
      }
    },
    {
      type: 'code',
      title: "Desafío Lógico Final",
      content: `
Combinemos todo. Imagina un sistema de seguridad inteligente.
La alarma suena (Verdadero) SI:
*   (Es de noche **AND** se abrió la puerta sin llave)
*   **OR**
*   (Se presionó el botón de pánico **OR** NOT hay batería)

Es una lógica compleja, ¡pero las computadoras la resuelven en nanosegundos! En programación real, esto se usa en if statements para ramificar código.

Modifica variables para probar escenarios: ¿Qué hace que suene? ¿Qué la silencia?
      `,
      exercise: {
          prompt: "Modifica los valores de las variables (cámbialos entre 0 y 1) para crear una situación donde la alarma NO suene. El resultado debe ser 0.",
          initialCode: `es_noche = 1 ' 1=SI, 0=NO
puerta_abierta = 0 ' 1=SI, 0=NO
boton_panico = 1 ' 1=SI, 0=NO

alarma = (es_noche AND puerta_abierta) OR boton_panico
PRINT "¿Suena la alarma? " + alarma`,
          expectedOutput: "¿Suena la alarma? 0",
          solution: `es_noche = 1 ' 1=SI, 0=NO
puerta_abierta = 0 ' 1=SI, 0=NO
boton_panico = 0 ' 1=SI, 0=NO

alarma = (es_noche AND puerta_abierta) OR boton_panico
PRINT "¿Suena la alarma? " + alarma`
      }
    },
    {
      type: 'theory',
      title: "Resumen y Aplicaciones",
      content: `
*   **Lógica Booleana:** Todo reduce a True (1) / False (0).
*   **Comparadores:** Preguntas binarias (=, <>, >, <, >=, <=).
*   **Operadores:** AND (todas verdaderas), OR (al menos una), NOT (inversión).
*   **Bugs Lógicos:** Evítalos con precisión, edge cases y debugging.
*   Aplicaciones: En búsquedas (Google usa AND/OR), seguridad (alarmas), juegos (condiciones de victoria), IA (decisiones).

¡Dominar esto te permite ramificar tus programas! En la siguiente lección, usaremos booleano en condicionales IF para hacer código inteligente.
      `
    }
  ]
};