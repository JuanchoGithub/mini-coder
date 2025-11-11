
import { Lesson } from '../../types';

export const lesson1: Lesson = {
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
};
