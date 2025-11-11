
import { Lesson } from '../../types';

export const lesson3: Lesson = {
  id: 3,
  title: "Lógica II: Pensamiento Booleano",
  description: "Desde diseccionar problemas cotidianos hasta entender las tablas de verdad que rigen a la máquina.",
  steps: [
    {
      type: 'theory',
      title: "Parte 1: El Problema Humano",
      content: `
En la clase anterior vimos que la computadora necesita instrucciones precisas. Decir "la taza está en la mesa" no es suficiente; podría estar a 1000 metros de altura sobre ella.

**La computadora no tiene intuición ni contexto.**

Tú, como programador, eres quien debe proveer ese contexto. Debes saber MUY BIEN dónde empiezas y a dónde vas.
      `
    },
    {
      type: 'theory',
      title: "La Trampa de lo Simple",
      content: `
Volvamos al ejercicio del café.
**Tarea:** Tomar café.
**Respuesta humana:** "Agarras la taza y tomas".

Parece fácil, pero si le das esa instrucción a un robot, quizás intente agarrar el líquido directamente (y quemarse), porque dijiste "agarra el café", no "la taza".

Para un robot, "agarrar" implica: elevar brazo, abrir mano, extender brazo, cerrar mano. Y si el orden falla (extender con el puño cerrado), ¡golpeas la taza!
      `
    },
    {
      type: 'theory',
      title: "Introducción a los 'Bugs'",
      content: `
Un **Bug** es un error en tu lógica que produce resultados inesperados.

Imagina que dices al robot: *"Toma café mientras sientas líquido en los labios"*.
**El Bug:** Si el líquido se mueve y por un milisegundo deja de tocar sus labios, el robot pensará que terminó, ¡aunque la taza siga llena!

Para arreglar estos bugs, necesitamos ser matemáticamente precisos.
      `
    },
    {
      type: 'logic-simulation',
      title: "Práctica: El Bug Invisible",
      content: `
Antes de pasar a la teoría pesada, prueba este escenario.
Parece una tarea fácil (cambiar una batería), pero si usas tu "sentido común" humano en lugar de lógica fría y estricta, tendrás un accidente impactante.
      `,
      scenarioId: 'battery-fix'
    },
    {
      type: 'theory',
      title: "Parte 2: Lógica Booleana",
      content: `
¿Cómo toma decisiones la computadora? Todo se reduce a dos palabras: **VERDADERO** (True) y **FALSO** (False).
Para la computadora, no existen los "quizás" ni los "más o menos".

Internamente, usan números:
*   ✅ **VERDADERO = 1**
*   ❌ **FALSO = 0**
      `
    },
    {
      type: 'theory',
      title: "Haciendo Preguntas (Comparadores)",
      content: `
Para obtener respuestas de Verdadero/Falso, usamos **Comparadores**:

| Símbolo | Significado | Ejemplo | Resultado |
| :---: | :--- | :--- | :---: |
| \`=\` | Igual a | \`5 = 5\` | ✅ 1 |
| \`<>\` | Distinto a | \`5 <> 8\` | ✅ 1 |
| \`>\` | Mayor que | \`10 > 2\` | ✅ 1 |
| \`<\` | Menor que | \`3 < 1\` | ❌ 0 |
| \`>=\` | Mayor o igual | \`5 >= 5\` | ✅ 1 |
      `
    },
    {
      type: 'code',
      title: "Práctica: Interrogando a la máquina",
      content: `
Vamos a preguntarle cosas a MiniCoder. Usaremos \`PRINT\` para ver si nos responde \`1\` (Verdad) o \`0\` (Mentira).

Intenta predecir qué saldrá antes de ejecutar.
      `,
      exercise: {
          prompt: "Escribe estas 3 preguntas y ejecuta:",
          initialCode: `PRINT 10 > 5
PRINT "hola" = "adios"
PRINT 20 >= 20`,
          expectedOutput: "1" // Expecting at least one '1' (True) in output to pass
      }
    },
    {
      type: 'theory',
      title: "Tablas de Verdad: El Operador AND",
      content: `
A veces necesitamos cumplir MÁS de una condición.
Por ejemplo: Para entrar a la montaña rusa debes tener "más de 12 años" **Y** "medir más de 1.40m".

El operador **AND** (Y) es muy exigente. SOLO es verdadero si TODAS las condiciones son verdaderas.

| Condición A | Condición B | Resultado A AND B |
| :---: | :---: | :---: |
| ❌ FALSO (0) | ❌ FALSO (0) | 🔴 **FALSO (0)** |
| ❌ FALSO (0) | ✅ VERDAD (1) | 🔴 **FALSO (0)** |
| ✅ VERDAD (1) | ❌ FALSO (0) | 🔴 **FALSO (0)** |
| ✅ VERDAD (1) | ✅ VERDAD (1) | 🟢 **VERDAD (1)** |
      `
    },
    {
      type: 'code',
      title: "Práctica: AND",
      content: `
Vamos a probar al exigente AND.
Queremos saber si un número es "especial". Para ser especial debe ser mayor que 10 **Y** menor que 20.
      `,
      exercise: {
          prompt: "Prueba con diferentes valores para 'numero'. Solo debe dar 1 si está entre 11 y 19.",
          initialCode: `numero = 15
es_especial = (numero > 10) AND (numero < 20)
PRINT "¿Es especial? " + es_especial`,
          solutionCues: ['AND']
      }
    },
    {
      type: 'theory',
      title: "Tablas de Verdad: El Operador OR",
      content: `
El operador **OR** (O) es más relajado. Es verdadero si AL MENOS UNA de las condiciones es verdadera.
Ejemplo: "Te compro helado si sacas buenas notas **O** si limpias tu cuarto". (Con que hagas una, tienes helado).

| Condición A | Condición B | Resultado A OR B |
| :---: | :---: | :---: |
| ❌ FALSO (0) | ❌ FALSO (0) | 🔴 **FALSO (0)** |
| ❌ FALSO (0) | ✅ VERDAD (1) | 🟢 **VERDAD (1)** |
| ✅ VERDAD (1) | ❌ FALSO (0) | 🟢 **VERDAD (1)** |
| ✅ VERDAD (1) | ✅ VERDAD (1) | 🟢 **VERDAD (1)** |
      `
    },
    {
      type: 'theory',
      title: "El Inversor: NOT",
      content: `
A veces queremos lo contrario. El operador **NOT** (NO) invierte el valor.
Si algo es Verdad, NOT lo hace Falso.

| Condición A | Resultado NOT A |
| :---: | :---: |
| ❌ FALSO (0) | 🟢 **VERDAD (1)** |
| ✅ VERDAD (1) | 🔴 **FALSO (0)** |

Ejemplo: \`NOT (5 > 10)\`
*   \`5 > 10\` es Falso (0).
*   \`NOT (Falso)\` se convierte en **Verdadero (1)**.
      `
    },
    {
      type: 'code',
      title: "Desafío Lógico Final",
      content: `
Combinemos todo. Imagina un sistema de seguridad.
La alarma suena (Verdadero) SI:
*   (Es de noche **AND** se abrió la puerta)
*   **OR**
*   (Se presionó el botón de pánico)

Es una lógica compleja, ¡pero las computadoras la resuelven en nanosegundos!
      `,
      exercise: {
          prompt: "Cambia las variables para probar cuándo suena la alarma (debe dar 1).",
          initialCode: `es_noche = 1
puerta_abierta = 0
boton_panico = 1

alarma = (es_noche AND puerta_abierta) OR boton_panico
PRINT "¿Suena la alarma? " + alarma`,
          solutionCues: ['AND', 'OR']
      }
    }
  ]
};
