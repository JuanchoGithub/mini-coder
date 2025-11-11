import { Lesson } from '../../types';

export const lesson6: Lesson = {
  id: 6,
  title: "Decisiones (IF)",
  description: "Enseña a tu programa a tomar caminos diferentes según la situación, creando ramas lógicas complejas.",
  steps: [
    {
      type: 'theory',
      title: "El Poder del IF",
      content: `
En la vida real, tomas decisiones constantemente: "SI llueve, ENTONCES llevo paraguas".
En programación, la estructura **IF ... THEN** es el cerebro de nuestro código.

\`\`\`basic
IF edad >= 18 THEN
   PRINT "Puedes votar"
END IF
\`\`\`
¿Recuerdas la Lección 3 sobre Lógica Booleana? La \`condición\` dentro de un \`IF\` es simplemente una expresión que se evalúa a \`1\` (Verdadero) o \`0\` (Falso). Si el resultado es \`1\`, el código dentro del bloque se ejecuta. Si es \`0\`, se lo salta por completo.
      `
    },
    {
      type: 'theory',
      title: "El Plan B: ELSE",
      content: `
¿Qué pasa si la condición no se cumple? Para eso existe **ELSE** (Si no...). Provee un camino alternativo.

\`\`\`basic
IF tienes_llave = 1 THEN
   PRINT "Abres la puerta."
ELSE
   PRINT "Está cerrada. Necesitas la llave."
END IF
\`\`\`
La computadora SIEMPRE ejecutará uno de los dos caminos, pero nunca ambos. Es una bifurcación en el camino del programa.
      `
    },
    {
      type: 'theory',
      title: "Múltiples Caminos: ELSEIF",
      content: `
A veces no solo hay dos opciones. ¿Y si quieres comprobar varias condiciones en cadena? Para eso usamos **ELSEIF**.

\`\`\`basic
INPUT "Tu nota (1-10): ", nota
IF nota >= 9 THEN
    PRINT "¡Sobresaliente! 🏆"
ELSEIF nota >= 7 THEN
    PRINT "¡Muy bien! 👍"
ELSEIF nota >= 5 THEN
    PRINT "Aprobado."
ELSE
    PRINT "Necesitas estudiar más. 📚"
END IF
\`\`\`
La computadora revisa las condiciones en orden. En cuanto una es verdadera, ejecuta su bloque y se salta el resto del \`END IF\`.
      `
    },
    {
      type: 'theory',
      title: "Decisiones dentro de Decisiones (IFs Anidados)",
      content: `
Un concepto poderoso es poner un \`IF\` dentro de otro. Esto se llama **anidación**.

Imagina la entrada a un parque de diversiones:
1.  Primero, comprueban si eres lo suficientemente alto.
2.  **SI** lo eres, ENTONCES comprueban si tienes entrada.

\`\`\`basic
IF altura > 1.40 THEN
    PRINT "Altura correcta."
    IF tienes_entrada = 1 THEN
        PRINT "¡Bienvenido, puedes pasar!"
    ELSE
        PRINT "Necesitas comprar una entrada."
    END IF
ELSE
    PRINT "Lo siento, no tienes la altura mínima."
END IF
\`\`\`
El segundo \`IF\` (el de la entrada) solo se revisa si el primero (el de la altura) fue verdadero.
`
    },
    {
      type: 'code',
      title: "Desafío: La Puerta del Castillo",
      content: "Vamos a crear un sistema de seguridad para un castillo. Debe pedir una clave. Si la clave es correcta, DEBE preguntar si eres amigo o enemigo para decidir si abrir la puerta o llamar a los guardias.",
      exercise: {
        prompt: "Completa el código. Necesitarás un IF principal para la clave y un IF anidado para el tipo de visitante.",
        initialCode: `clave_secreta$ = "abracadabra"

PRINT "Te acercas a la puerta del castillo."
INPUT "El guardia te pide la clave: ", intento$

IF intento$ = clave_secreta$ THEN
    PRINT "La clave es correcta."
    ' --- TU CÓDIGO ANIDADO VA AQUÍ ---
    ' 1. Pregunta (INPUT) si eres "amigo" o "enemigo"
    ' 2. Si eres "amigo", imprime "¡Adelante!"
    ' 3. Si no (ELSE), imprime "¡Guardias! ¡Un intruso!"
    
ELSE
    PRINT "Clave incorrecta. El guardia te echa."
END IF
`,
        solutionCues: ['IF', 'THEN', 'INPUT', 'ELSE']
      }
    }
  ]
};
