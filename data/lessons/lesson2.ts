
import { Lesson } from '../../types';

export const lesson2: Lesson = {
  id: 2,
  title: "Lógica I: Pensar como máquina",
  description: "La computadora no tiene sentido común. Entrena tu lógica secuencial con MiniBot.",
  steps: [
    {
      type: 'theory',
      title: "Sin sentido común",
      content: `
Si te digo "toma café", tu cerebro sabe que debes buscar la taza, ver si quema, agarrarla con cuidado...

**MiniBot** NO sabe nada de eso. Es literal. Si le dices "agarra" y está lejos, agarrará el aire. Si le dices "avanza" y hay una pared, chocará.

Vamos a entrenar tu cerebro para dar órdenes en la secuencia exacta.
      `
    },
    {
      type: 'logic-simulation-2d',
      title: "Ejercicio 1: El Colectivo",
      content: `
**Misión:** MiniBot quiere irse a casa en colectivo.
¡Pero espera! No puede subir sin su tarjeta SUBE (💳).
1. Ve a buscar la tarjeta.
2. Agárrala.
3. Ve a la parada de colectivo 🚌.
      `,
      scenarioId: 'robot-bus'
    },
    {
      type: 'logic-simulation-2d',
      title: "Ejercicio 2: El Lavadero",
      content: `
**Misión:** Baño completo.
En la vida real, no te secas antes de mojarte. MiniBot tampoco.
Debes pasar por las zonas en este orden estricto para que cuente como un baño válido:
1. Jabón 🧼
2. Agua 🚿
3. Secado 💨
      `,
      scenarioId: 'robot-shower'
    },
    {
      type: 'logic-simulation-2d',
      title: "Ejercicio 3: Estacionar",
      content: `
**Misión:** Estacionar en la zona 🅿️.
El lugar entre las paredes 🧱 es muy estrecho. Si intentas entrar directo, probablemente chocarás.
Vas a tener que pensar una secuencia de maniobras (¿quizás avanzar un poco, girar, y luego entrar?) para lograrlo sin rasguños.
      `,
      scenarioId: 'robot-parking'
    },
    {
      type: 'logic-simulation-2d',
      title: "Misión Final: Operación Café",
      content: `
¡Graduación de Lógica!
Llévale la taza ☕ a la mesa (zona verde). Sé preciso con la distancia y la fuerza de la pinza.
      `,
      scenarioId: 'coffee-run'
    },
    {
      type: 'theory',
      title: "¿Qué aprendimos?",
      content: `
Para que MiniBot completara sus misiones, tuviste que usar **Pensamiento Algorítmico**:
Dividir un problema grande ("viajar en bus", "bañarse") en pasos pequeñitos y ordenados.
¡Eso es programar!
      `
    }
  ]
};
