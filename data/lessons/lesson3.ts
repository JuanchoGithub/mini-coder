
import { Lesson } from '../../types';

export const lesson3: Lesson = {
  id: 3,
  title: "Lógica II: Disección de un Problema",
  description: "Analizando hasta el último detalle de una acción cotidiana. Introducción a los 'bugs'.",
  steps: [
    {
      type: 'theory',
      title: "Contexto Cero",
      content: `
En la clase anterior viste que una computadora necesita instrucciones precisas. Decir "la taza está en la mesa" no es suficiente; podría estar a 1000 metros de altura sobre ella.

**La computadora no tiene intuición ni contexto.**

Tú, como programador, eres quien debe proveer ese contexto. Debes saber MUY BIEN dónde empiezas y a dónde vas.
      `
    },
    {
      type: 'theory',
      title: "La Trampa de lo Simple",
      content: `
Volvamos al ejercicio del café.
**Precondiciones:** Estás sentado frente a la mesa, a 15cm. Taza con café apoyada enfrente.
**Tarea:** Tomar café.

¿Cómo lo haría un humano?
> *"Agarras el café y tomás, punto."*

Parece correcto, ¿no? Tu cerebro humano completa automáticamente los miles de micro-pasos necesarios. Pero si le das esa instrucción a un robot, quizás intente agarrar el líquido directamente (y quemarse), porque dijiste "agarra el café", no "la taza".
      `
    },
    {
      type: 'theory',
      title: "Disección 1: Agarrar",
      content: `
Intentemos dar instrucciones más precisas para agarrar la taza:

1. Levanto el brazo.
2. Extiendo el brazo hacia la taza.
3. Abro la mano.
4. Cierro la mano sobre la taza.

**¡ESPERA! Hay un BUG (error de lógica).**
Si extiendes el brazo con el puño cerrado (porque no dijiste que lo abriera antes) hacia la taza, ¡la golpearás y la tirarás antes de poder abrir la mano!

**Secuencia Correcta:**
1. Levanto el brazo.
2. **Abro la mano.** (Importante hacerlo antes de acercarse)
3. Extiendo el brazo hasta que la palma toque la taza.
4. Cierro la mano.
      `
    },
    {
      type: 'theory',
      title: "Disección 2: Beber",
      content: `
Si "agarrar" era difícil, "beber" es peor. ¿Cómo sabe la computadora cuándo parar?

No basta con decir "toma hasta que se acabe". Tienes que definir qué significa "que se acabe".

Podríamos decir: *"Sigue inclinando la taza mientras por lo menos el 30% de tu labio inferior sienta café"*.
      `
    },
    {
      type: 'theory',
      title: "Introducción a los 'Bugs'",
      content: `
Un **Bug** es un error en tu lógica que produce resultados inesperados en situaciones específicas.

**El Bug del "Rebote":**
Si definimos que "terminamos" cuando menos del 30% del labio siente café, ¿qué pasa si el líquido se mueve y "rebota" dentro de la taza?
Por un milisegundo, el café deja de tocar tu labio. La computadora pensará "¡Listo, se acabó!" y dejará de beber, aunque todavía quede media taza.

**Solución (parche al bug):**
Agregar condiciones extra. Ej: "Debe haber menos del 30% de contacto POR MÁS DE 2 SEGUNDOS" o "La taza debe estar inclinada MÁS DE 90 GRADOS".
      `
    },
    {
      type: 'logic-simulation',
      title: "Ejercicio: El Bug Invisible",
      content: `
Vamos a probar si entendiste el concepto de **"detalle invisible"**.

Tienes que cambiar la batería de un dispositivo. Parece fácil: abrir, cambiar, cerrar.
Pero hay un "bug" esperando si no prestas atención al estado interno del aparato (el capacitor ⚡).

**Objetivo:** Batería NUEVA, panel CERRADO, y el técnico VIVO.
      `,
      scenarioId: 'battery-fix'
    }
  ]
};
