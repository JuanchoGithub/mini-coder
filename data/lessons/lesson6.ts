import { Lesson } from '../../types';

export const lesson6: Lesson = {
  id: 6,
  title: "Decisiones (IF)",
  description: "Enseña a tu programa a tomar caminos diferentes según la situación, creando ramas lógicas complejas. Aprende a usar condicionales para hacer que tu código responda dinámicamente a inputs y datos, con ejemplos prácticos para superar la dificultad de las estructuras de control.",
  steps: [
    {
      type: 'theory',
      title: "El Poder del IF",
      content: `
En la vida real, tomas decisiones constantemente: "SI llueve, ENTONCES llevo paraguas; si no, llevo gafas de sol". Estas decisiones hacen que tu comportamiento sea adaptable y responda al entorno.

En programación, la estructura **IF ... THEN** es el cerebro de nuestro código, permitiendo que el programa tome decisiones basadas en condiciones. Sin IF, tus programas serían lineales, rígidos y predecibles, ejecutando siempre lo mismo independientemente de los datos. Con ellos, se vuelven inteligentes, reactivos y capaces de manejar escenarios variados.

Sintaxis básica en MiniQB:
\`\`\`basic
IF condicion THEN
   ' Código que se ejecuta si la condición es verdadera (puede ser una o más líneas)
END IF
\`\`\`

Ejemplo simple:
\`\`\`basic
IF edad >= 18 THEN
   PRINT "Puedes votar"
END IF
\`\`\`

Aquí, \`edad >= 18\` es la condición: una expresión booleana (de Lección 3) que evalúa a 1 (Verdadero) o 0 (Falso). Si es 1, se ejecuta el PRINT; si es 0, se salta el bloque entero y continúa el programa.

Analogía: Imagina un guardia en una puerta: "SI tienes invitación, ENTONCES pasa". La condición es la invitación; el bloque IF es entrar.

¿Por qué es poderoso? Permite personalización y validación: En un juego, "SI vida <= 0, ENTONCES muestra 'Game Over'". En apps, "SI usuario es premium, ENTONCES activa features extras". En cálculos, "SI número es par, ENTONCES haz algo especial".

Consejo para principiantes: Las estructuras de control como IF pueden parecer confusas al principio porque introducen no-linealidad (el código no siempre se ejecuta de arriba abajo). Siempre prueba con valores conocidos: ¿Qué pasa si edad=17? ¿Y si=18? Depura paso a paso.
      `
    },
    {
      type: 'code',
      title: "Práctica: IF Simple",
      content: `
Prueba un IF básico. Pide una edad con INPUT y chequea si es mayor o igual a 18. Observa qué pasa con diferentes inputs (ej: 16 vs 20).
      `,
      exercise: {
          prompt: "Completa el código para que, después de pedir una edad, imprima 'Adulto' si la edad es 18 o más.",
          // FIX: Added closing backtick to initialCode template literal.
          initialCode: `INPUT "Edad: ", edad
' Escribe aquí tu estructura IF...THEN...END IF
' Debe imprimir "Adulto" si la edad es 18 o más.

PRINT "Fin del chequeo"`,
          expectedOutput: "Adulto\nFin del chequeo"  // For edad 20
      }
    },
    {
      type: 'theory',
      title: "El Plan B: ELSE",
      content: `
¿Qué pasa si la condición no se cumple? Sin un "plan B", el programa simplemente ignora el bloque IF y sigue adelante, lo que podría dejar "agujeros" en la lógica (ej: no informar al usuario de un error). Para manejar explícitamente el caso falso, usa **ELSE** (Si no... o De lo contrario), que provee un camino alternativo.

Sintaxis extendida:
\`\`\`basic
IF condicion THEN
   ' Camino si verdadero
ELSE
   ' Camino si falso
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

La computadora SIEMPRE ejecutará exactamente uno de los dos caminos, pero nunca ambos. Es una bifurcación exclusiva en el flujo del programa: o vas por el camino TRUE o por FALSE.

Analogía: En un restaurante, "SI pides pizza, ENTONCES te sirvo pizza; ELSE te sirvo el plato del día". Cubre todos los casos.

Consejo: ELSE es opcional, pero úsalo cuando quieras cubrir exhaustivamente las posibilidades (evita sorpresas). En programación real, esto previene bugs como "qué pasa si el usuario ingresa algo inválido". Siempre piensa en los "casos edge" (extremos, como edad=0 o negativa).
      `
    },
    {
      type: 'code',
      title: "Práctica: IF con ELSE",
      content: `
Agrega ELSE a un chequeo de par/impar. Usa MOD 2 = 0 para par.
      `,
      exercise: {
          prompt: "Completa el código para que, después de pedir un número, imprima 'Par' si es par, o 'Impar' si no lo es.",
          // FIX: Added closing backtick to initialCode template literal.
          initialCode: `INPUT "Número: ", numero
' Escribe aquí tu estructura IF...ELSE...END IF
' Debe imprimir "Par" o "Impar" según el número.
' Pista: Usa el operador MOD'`,
          expectedOutput: "Par"  // For 4
      }
    },
    {
      type: 'theory',
      title: "Múltiples Caminos: ELSEIF",
      content: `
A veces no solo hay dos opciones binarias; hay múltiples escenarios posibles. ¿Y si quieres comprobar varias condiciones en cadena, como rangos de calificaciones? Para eso usamos **ELSEIF** (o ELSE IF), que permite agregar más condiciones intermedias sin anidar todo.

Sintaxis completa:
\`\`\`basic
IF condicion1 THEN
    ' Si condicion1 verdadera
ELSEIF condicion2 THEN
    ' Si no condicion1, pero sí condicion2
ELSEIF condicion3 THEN
    ' Y así sucesivamente...
ELSE
    ' Si ninguna de las anteriores
END IF
\`\`\`

Ejemplo práctico:
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

La computadora revisa las condiciones en orden estricto, de arriba abajo. En cuanto encuentra una verdadera, ejecuta su bloque y salta directamente al END IF, ignorando el resto (incluso si otras también serían verdaderas). Esto hace que sea eficiente, pero ordena las condiciones de más específicas/estrictos a más generales para evitar solapamientos.

Analogía: Como un menú de opciones: Primero chequea si quieres opción A, si no B, si no C, sino default.

Consejo para dificultad: Si te confundes con el flujo, dibuja un diagrama de flujo (flowchart) con flechas: Condición -> Sí/No -> Acción. Prueba con valores borderline (ej: nota=9, 8.9, 7, 4.9) para verificar que caiga en el rango correcto.
      `
    },
    {
      type: 'code',
      title: "Práctica: Calificador de Notas",
      content: `
Crea un calificador con múltiples ELSEIF para rangos de notas. Asegúrate de cubrir desde 0 a 10.
      `,
      exercise: {
          prompt: "Completa la lógica para que el programa maneje todas las notas. Añade una condición para 'Suspenso' (nota >= 4) y una final para 'Reprobado grave' para cualquier nota inferior.",
          // FIX: Added closing backtick to initialCode template literal.
          initialCode: `INPUT "Nota: ", nota
IF nota >= 9 THEN
    PRINT "Excelente"
ELSEIF nota >= 7 THEN
    PRINT "Bueno"
ELSEIF nota >= 5 THEN
    PRINT "Aprobado"
END IF
' ↓↓↓ Completa la lógica aquí abajo ↓↓↓
' Agrega un ELSEIF para las notas entre 4 y 5 (Suspenso)
' Agrega un ELSE final para todo lo demás (Reprobado grave)'`,
          expectedOutput: "Suspenso"
      }
    },
    {
      type: 'theory',
      title: "Decisiones dentro de Decisiones (IFs Anidados)",
      content: `
Para lógica más compleja, puedes poner un \`IF\` dentro de otro. Esto se llama **anidación** o nesting, creando árboles de decisiones jerárquicas donde una decisión depende de otra previa.

Imagina la entrada a un parque de diversiones:
1.  Primero, chequea si eres lo suficientemente alto (condición externa, principal).
2.  **SI** lo eres, ENTONCES chequea si tienes entrada (condición interna, dependiente).

Sintaxis anidada:
\`\`\`basic
IF condicion_externa THEN
    ' Código externo
    IF condicion_interna THEN
        ' Código si ambas verdaderas
    ELSE
        ' Alternativa si externa sí pero interna no
    END IF
ELSE
    ' Alternativa si externa no
END IF
\`\`\`

Ejemplo detallado:
\`\`\`basic
INPUT "Altura en metros: ", altura
INPUT "¿Tienes entrada? (1=si, 0=no): ", tienes_entrada
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

El IF interno solo se evalúa si el externo es verdadero, ahorrando procesamiento y modelando dependencias reales.

Analogía: Como un árbol genealógico: Rama principal (¿Eres familiar?), rama secundaria (¿Eres hijo directo?).

Consejo para dificultad: La anidación puede volverse confusa (demasiados niveles llevan a "spaghetti code"). Indenta el código con espacios para visualizar la estructura (cada nivel más adentro). Limita a 3-4 niveles max; si es más, divide en funciones o usa ELSEIF donde posible. Depura imprimiendo mensajes en cada rama para rastrear el flujo.
      `
    },
    {
      type: 'theory',
      title: "Depuración de IFs: Consejos Prácticos",
      content: `
Las estructuras de control como IF son difíciles porque el código "salta" partes. Para entender y fixear:

1. **Usa PRINTs de debug:** Agrega PRINT "Entrando en IF externo" antes de cada bloque para ver el camino tomado.
2. **Prueba casos variados:** Inputs que activen cada rama (verdadero, falso, bordes como igualdad exacta).
3. **Chequea condiciones:** Asegúrate que la condición use comparadores correctos (ej: >= en vez de > para incluir límites).
4. **Evita solapamientos:** En ELSEIF, ordena de estricto a laxo (ej: chequea >=9 antes de >=7).
5. **Herramientas:** En editores reales, usa breakpoints para pausar en IFs.

Ejemplo de debug:
\`\`\`basic
PRINT "Chequeando edad: " + edad  ' Muestra valor actual
IF edad >= 18 THEN
    PRINT "DEBUG: Condición verdadera"
    ...
\`\`\`
Quita estos PRINTs una vez que funcione.
      `
    },
    {
      type: 'code',
      title: "Desafío: La Puerta del Castillo",
      content: "Vamos a crear un sistema de seguridad para un castillo. Debe pedir una clave. Si la clave es correcta, pregunta si eres amigo o enemigo para decidir si abrir la puerta o llamar a los guardias. Usa anidación y agrega un ELSEIF si la clave está cerca pero no exacta (ej: longitud similar).",
      exercise: {
        prompt: "Completa el código. Necesitarás un IF principal para la clave, un ELSEIF para claves similares, y un IF anidado para el tipo de visitante.",
        // FIX: Added closing backtick to initialCode template literal.
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
ELSEIF LEN(intento$) = LEN(clave_secreta$) THEN
    PRINT "Clave casi... pero no."
ELSE
    PRINT "Clave incorrecta. El guardia te echa."
END IF
`,
        solutionCues: ['IF', 'THEN', 'INPUT', 'ELSE', 'END IF', 'ELSEIF']
      }
    },
    {
      type: 'theory',
      title: "Resumen",
      content: `
*   **IF THEN:** Ejecuta código si condición booleana es verdadera (1); salta si falsa (0).
*   **ELSE:** Camino alternativo para el caso falso; asegura cobertura completa.
*   **ELSEIF:** Cadena de múltiples condiciones; evalúa secuencialmente hasta la primera verdadera.
*   **Anidación:** IFs internos para dependencias; indenta para claridad, limita profundidad.
*   **Dificultad:** Usa debug PRINTs, prueba edges, dibuja flowcharts. Con práctica, dominarás el flujo no-lineal.
*   Aplicaciones: Validación (inputs válidos), juegos (decisiones), apps (roles/permisos), IA (clasificaciones).

¡Con IF, tus programas deciden inteligentemente! En la siguiente lección, exploraremos loops para repetir acciones eficientemente y manejar listas de datos.
      `
    }
  ]
};