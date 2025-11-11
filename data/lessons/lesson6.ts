import { Lesson } from '../../types';

export const lesson6: Lesson = {
  id: 6,
  title: "Decisiones (IF)",
  description: "Enseña a tu programa a tomar caminos diferentes según la situación, creando ramas lógicas complejas. Aprende a usar condicionales para hacer que tu código responda dinámicamente a inputs y datos.",
  steps: [
    {
      type: 'theory',
      title: "El Poder del IF",
      content: `
En la vida real, tomas decisiones constantemente: "SI llueve, ENTONCES llevo paraguas; si no, llevo gafas de sol". Estas decisiones hacen que tu comportamiento sea adaptable.

En programación, la estructura **IF ... THEN** es el cerebro de nuestro código, permitiendo que el programa tome decisiones basadas en condiciones. Sin IF, tus programas serían lineales y predecibles; con ellos, se vuelven inteligentes y reactivos.

Sintaxis básica:
\`\`\`basic
IF condicion THEN
   ' Código que se ejecuta si la condición es verdadera
END IF
\`\`\`

Ejemplo:
\`\`\`basic
IF edad >= 18 THEN
   PRINT "Puedes votar"
END IF
\`\`\`

¿Recuerdas la Lección 3 sobre Lógica Booleana? La \`condicion\` dentro de un \`IF\` es simplemente una expresión que se evalúa a \`1\` (Verdadero) o \`0\` (Falso), usando comparadores como >, =, etc. Si el resultado es \`1\`, el código dentro del bloque se ejecuta. Si es \`0\`, se lo salta por completo y continúa con el resto del programa.

Importante: El bloque IF puede tener múltiples líneas de código. Siempre cierra con END IF para que la máquina sepa dónde termina la rama.

¿Por qué es poderoso? Permite personalización: En un juego, "SI vida <= 0, ENTONCES game over". En apps, "SI usuario es premium, ENTONCES muestra features extras".
      `
    },
    {
      type: 'code',
      title: "Práctica: IF Simple",
      content: `
Prueba un IF básico. Pide una edad y chequea si es mayor de 18.
      `,
      exercise: {
          prompt: "Completa para que imprima 'Adulto' si edad >=18.",
          initialCode: `INPUT "Edad: ", edad
IF edad >= 18 THEN
    PRINT "Adulto"
END IF`,
          expectedOutput: "Adulto"  // Asumiendo input 20
      }
    },
    {
      type: 'theory',
      title: "El Plan B: ELSE",
      content: `
¿Qué pasa si la condición no se cumple? Sin un "plan B", el programa simplemente ignora el bloque y sigue. Para manejar el caso falso, usa **ELSE** (Si no... o De lo contrario), que provee un camino alternativo.

Sintaxis:
\`\`\`basic
IF condicion THEN
   ' Camino verdadero
ELSE
   ' Camino falso
END IF
\`\`\`

Ejemplo:
\`\`\`basic
IF tienes_llave = 1 THEN
   PRINT "Abres la puerta."
ELSE
   PRINT "Está cerrada. Necesitas la llave."
END IF
\`\`\`

La computadora SIEMPRE ejecutará exactamente uno de los dos caminos, pero nunca ambos. Es como una bifurcación en el camino del programa: o vas por TRUE o por FALSE.

Consejo: ELSE es opcional, pero úsalo cuando quieras cubrir todos los casos (evita "agujeros" lógicos). En programación real, esto previene bugs como "qué pasa si el usuario ingresa algo inesperado".
      `
    },
    {
      // FIX: Corrected a typo in the 'type' property by removing a leading space. The value was "' theory'" and has been changed to "'theory'".
      type: 'theory',
      title: "Múltiples Caminos: ELSEIF",
      content: `
A veces no solo hay dos opciones; hay múltiples escenarios. ¿Y si quieres comprobar varias condiciones en cadena? Para eso usamos **ELSEIF** (o ELSE IF), que permite agregar más condiciones intermedias.

Sintaxis:
\`\`\`basic
IF condicion1 THEN
    ' Si condicion1 verdadera
ELSEIF condicion2 THEN
    ' Si no, pero condicion2 verdadera
ELSEIF condicion3 THEN
    ' Y así...
ELSE
    ' Si ninguna anterior
END IF
\`\`\`

Ejemplo:
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

La computadora revisa las condiciones en orden, de arriba abajo. En cuanto una es verdadera, ejecuta su bloque y salta directamente al END IF, ignorando el resto. Esto es eficiente, pero ordena condiciones de más específicas a generales.

Tip: Puedes tener tantos ELSEIF como quieras, pero si son muchos (más de 5-10), considera SWITCH/CASE en lenguajes avanzados para claridad.
      `
    },
    {
      type: 'code',
      title: "Práctica: Calificador de Notas",
      content: `
Crea un calificador con ELSEIF para rangos de notas.
      `,
      exercise: {
          prompt: "Agrega ELSEIF para nota >=4 (Suspenso) y ELSE (Reprobado).",
          initialCode: `INPUT "Nota: ", nota
IF nota >= 9 THEN
    PRINT "Excelente"
ELSEIF nota >= 7 THEN
    PRINT "Bueno"
ELSE
    PRINT "Mejora"
END IF`,
          solutionCues: ['ELSEIF', '>=', 'ELSE']
      }
    },
    {
      type: 'theory',
      title: "Decisiones dentro de Decisiones (IFs Anidados)",
      content: `
Un concepto poderoso es poner un \`IF\` dentro de otro. Esto se llama **anidación** o nesting, creando árboles de decisiones complejas.

Imagina la entrada a un parque de diversiones:
1.  Primero, comprueban si eres lo suficientemente alto (condición externa).
2.  **SI** lo eres, ENTONCES comprueban si tienes entrada (condición interna).

Sintaxis:
\`\`\`basic
IF condicion_externa THEN
    ' Código
    IF condicion_interna THEN
        ' Código más profundo
    ELSE
        ' Alternativa interna
    END IF
ELSE
    ' Alternativa externa
END IF
\`\`\`

Ejemplo:
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

El segundo \`IF\` (el de la entrada) solo se revisa si el primero (el de la altura) fue verdadero. Esto simula lógica jerárquica.

Consejos: Indenta el código para visualizar niveles (usa espacios o tabs). Limita anidación a 3-4 niveles max para evitar "spaghetti code" (código confuso). Si es muy profundo, refactoriza en funciones (lecciones futuras).

Historia: Condicionales como IF datan de los 50s en Fortran, revolucionando la programación al permitir no-linealidad.
      `
    },
    {
      type: 'code',
      title: "Desafío: La Puerta del Castillo",
      content: "Vamos a crear un sistema de seguridad para un castillo. Debe pedir una clave. Si la clave es correcta, DEBE preguntar si eres amigo o enemigo para decidir si abrir la puerta o llamar a los guardias. Usa anidación.",
      exercise: {
        prompt: "Completa el código. Necesitarás un IF principal para la clave y un IF anidado para el tipo de visitante. Agrega un ELSEIF si la clave está cerca pero no exacta.",
        initialCode: `clave_secreta$ = "abracadabra"

PRINT "Te acercas a la puerta del castillo."
INPUT "El guardia te pide la clave: ", intento$

IF intento$ = clave_secreta$ THEN
    PRINT "La clave es correcta."
    ' --- TU CÓDIGO ANIDADO VA AQUÍ ---
    ' 1. INPUT "¿Amigo o enemigo? ", tipo$
    ' 2. IF tipo$ = "amigo" THEN PRINT "¡Adelante!"
    ' 3. ELSE PRINT "¡Guardias! ¡Un intruso!"
    ' END IF
    
ELSE
    PRINT "Clave incorrecta. El guardia te echa."
END IF
`,
        solutionCues: ['IF', 'THEN', 'INPUT', 'ELSE', 'END IF']
      }
    },
    {
      type: 'theory',
      title: "Resumen",
      content: `
*   **IF THEN:** Ejecuta código si condición verdadera (booleana 1).
*   **ELSE:** Camino alternativo si falsa.
*   **ELSEIF:** Múltiples condiciones en cadena; se chequean secuencialmente.
*   **Anidación:** IFs dentro de IFs para lógica compleja y jerárquica.
*   Tips: Indenta para claridad, ordena condiciones lógicamente, evita exceso de nesting.
*   Aplicaciones: Validación de inputs, juegos (decisiones jugador), apps (roles usuario).

¡Con IF, tus programas deciden! En la siguiente lección, exploraremos loops para repetir acciones y hacer código eficiente.
      `
    }
  ]
};
