import { Lesson } from '../../types';

export const lesson2: Lesson = {
  id: 2,
  title: "Lógica I: Pensar como máquina",
  description: "La computadora no tiene sentido común. Entrena tu lógica secuencial con MiniBot, aprendiendo a descomponer problemas en pasos precisos y ordenados para evitar errores lógicos.",
  steps: [
    {
      type: 'theory',
      title: "Sin sentido común",
      content: `
Si te digo "toma café", tu cerebro sabe intuitivamente qué hacer: buscar la taza en la cocina, verificar si está caliente para no quemarte, agarrarla con cuidado por el asa, llevarla a la boca sin derramar... Todo eso gracias al sentido común acumulado de experiencias.

**MiniBot**, nuestro robot virtual, NO sabe nada de eso. Es completamente literal y carece de intuición. Si le dices "agarra" y la taza está lejos, agarrará el aire vacío. Si le dices "avanza" y hay una pared en el camino, chocará sin dudarlo. No "sabe" que debe evitar obstáculos a menos que se lo indiques explícitamente.

En esta lección, vamos a entrenar tu cerebro para dar órdenes en la secuencia exacta, paso a paso. Esto se llama **pensamiento algorítmico**: dividir un problema complejo en instrucciones simples, secuenciales y precisas. Es la base de la programación, porque las computadoras ejecutan código línea por línea, sin asumir nada.

¿Por qué es importante? En el mundo real, errores de secuencia pueden ser costosos. Por ejemplo, en programación, si intentas usar un dato antes de calcularlo, obtendrás un error. En robótica (como autos autónomos), una secuencia mal pensada podría causar accidentes. ¡Aprender esto te hace mejor resolviendo problemas cotidianos!
      `
    },
    {
      type: 'theory',
      title: "Introducción a MiniBot",
      content: `
MiniBot es una simulación 2D interactiva donde controlas un robot en un entorno con obstáculos, objetos y metas. Usas comandos básicos como "avanza", "gira izquierda", "gira derecha", "agarra", "suelta", etc., para crear una secuencia de acciones.

Piensa en él como un juego de puzzles: debes planificar la ruta y acciones exactas. Si fallas, MiniBot "choca" o no completa la misión, enseñándote a depurar (corregir) tu lógica.

Consejos para empezar:
- Observa el mapa: Identifica posiciones iniciales, obstáculos (🧱 paredes) y metas.
- Cuenta pasos: ¿Cuántos "avanza" necesitas para llegar?
- Prueba y error: Ejecuta, ve qué falla, ajusta.
- Secuencia importa: Haz una cosa a la vez, en orden lógico.

¡Empecemos con misiones simples para construir tu intuición!
      `
    },
    {
      type: 'logic-simulation-2d',
      title: "Ejercicio 1: El Colectivo",
      content: `
**Misión:** MiniBot quiere irse a casa en colectivo, pero no puede subir sin su tarjeta SUBE (💳). Debes guiarlo paso a paso.

Escenario: MiniBot empieza en una posición inicial. La tarjeta está en un punto específico del mapa. La parada de colectivo (🚌) es la meta.

Pasos lógicos a considerar:
1. Dirígete a la ubicación de la tarjeta (puede requerir avances y giros para evitar obstáculos).
2. Usa "agarra" exactamente cuando estés frente a ella.
3. Luego, ve a la parada de colectivo, sosteniendo la tarjeta.
4. Si sueltas la tarjeta antes, fallarás.

Piensa: ¿Qué pasa si intentas agarrar sin estar cerca? ¿O si vas directo al bus sin la tarjeta? Eso simula errores semánticos de lección 1.

Hints: Cuenta las casillas del grid (si es grid-based). Usa giros para cambiar dirección.
      `,
      scenarioId: 'robot-bus'
    },
    {
      type: 'theory',
      title: "Lecciones del Ejercicio 1",
      content: `
¡Bien hecho si lo lograste! Aquí aprendiste sobre **dependencias secuenciales**: Algunas acciones dependen de otras previas (no puedes subir al bus sin tarjeta, como no puedes imprimir una variable sin definirla primero en código).

En programación real: Esto es como inicializar variables antes de usarlas. Ejemplo en MiniQB: Debes hacer \`LET edad = 10\` antes de \`PRINT edad\`, o obtendrás un error.

Comunes errores: Olvidar giros, miscount pasos (off-by-one error, muy común en loops). Depura pensando: "¿Qué acción falló y por qué?"
      `
    },
    {
      type: 'logic-simulation-2d',
      title: "Ejercicio 2: El Lavadero",
      content: `
**Misión:** Dale a MiniBot un baño completo. En la vida real, no te secas antes de mojarte – el orden es crucial. MiniBot debe pasar por las zonas en este orden estricto para que cuente como válido:
1. Zona de Jabón 🧼 (para enjabonarse).
2. Zona de Agua 🚿 (para enjuagarse).
3. Zona de Secado 💨 (para secarse).

Escenario: Las zonas están dispersas en el mapa con posibles obstáculos. Debes navegar secuencialmente sin saltarte ninguna.

Piensa: ¿Qué ruta óptima evita repeticiones innecesarias? ¿Qué pasa si tocas agua antes de jabón? La simulación te marcará como inválido, enseñando validación de orden.

Hints: Planifica la ruta completa antes de codificar. Usa comandos precisos para posicionarte en cada zona.
      `,
      scenarioId: 'robot-shower'
    },
    {
      type: 'theory',
      title: "Lecciones del Ejercicio 2",
      content: `
Este ejercicio resalta la **importancia del orden en algoritmos**. En programación, el flujo secuencial significa que el código se ejecuta de arriba abajo, y cambiar el orden cambia el resultado.

Ejemplo real: En una receta de código para calcular interés bancario, debes leer el monto principal antes de multiplicar por la tasa, o tendrás basura.

También introduce **condiciones de validación**: La misión solo "gana" si sigues el orden, similar a checks en código (if statements, que veremos pronto).

Si fallaste, analiza: ¿Fue por mal orden o por colisión? Ajusta y reintenta – eso es iteración en desarrollo.
      `
    },
    {
      type: 'logic-simulation-2d',
      title: "Ejercicio 3: Estacionar",
      content: `
**Misión:** Estaciona MiniBot en la zona designada 🅿️. El espacio entre las paredes 🧱 es muy estrecho, así que no puedes entrar directo – probablemente chocarás si lo intentas.

Debes pensar en una secuencia de maniobras: quizás avanzar un poco, girar para alinearte, retroceder si es posible (si el sim lo permite), y luego entrar con precisión.

Escenario: Un parking angosto con barreras. Requiere planificación espacial.

Piensa: Visualiza el camino como un pathfinding simple. ¿Necesitas giros de 90 grados? ¿Cuántos avances entre giros?

Hints: Divide en sub-pasos: Acércate al entrada, alinea, entra. Evita comandos extras que causen choques.
      `,
      scenarioId: 'robot-parking'
    },
    {
      type: 'theory',
      title: "Lecciones del Ejercicio 3",
      content: `
Aquí practicaste **planificación espacial y precisión**, que traduce a manejo de loops y condicionales en código (ej: repetir "avanza" X veces).

En programación: Similar a bucles for (repetir acciones) o while (hasta condición). Errores comunes: Over-shooting (avanzar demasiado), como índices fuera de rango en arrays.

Este puzzle enseña resiliencia: Probablemente fallarás varias veces, pero cada intento mejora tu lógica.
      `
    },
    {
      type: 'logic-simulation-2d',
      title: "Misión Final: Operación Café",
      content: `
¡Graduación de Lógica! Lleva la taza ☕ a la mesa (zona verde). Sé preciso con la distancia para no derramar, y maneja la fuerza de la pinza para agarrar/soltar sin romper.

Escenario: Cocina con obstáculos, taza inicial, mesa meta.

Pasos clave:
1. Navega a la taza.
2. Agarra con cuidado.
3. Transporta evitando bumps.
4. Suelta en la zona verde.

Piensa: Integra todo: Secuencia, orden, precisión. ¿Qué pasa si sueltas temprano?

Hints: Usa comandos finos si disponibles (ej: avanza lento). Testea sub-secuencias.
      `,
      scenarioId: 'coffee-run'
    },
    {
      type: 'theory',
      title: "¿Qué aprendimos?",
      content: `
Para que MiniBot completara sus misiones, usaste **Pensamiento Algorítmico**:
- Dividir problemas grandes ("viajar en bus", "bañarse", "estacionar") en pasos pequeñitos y ordenados.
- Considerar dependencias (acciones previas requeridas).
- Depurar errores lógicos (choques = bugs).
- Planificar antes de ejecutar.

¡Eso es el corazón de programar! En lecciones futuras, traduciremos estas secuencias a código real con bucles y condicionales.

Key takeaways:
* Secuencialidad: Orden lo es todo.
* Precisión: Cuenta pasos, anticipa obstáculos.
* Iteración: Prueba, falla, mejora.
* Aplicación real: Algoritmos en apps (ej: GPS rutas), juegos (IA enemigos), etc.

¿Listo para aplicar esto en código? ¡Siguiente lección!
      `
    }
  ]
};