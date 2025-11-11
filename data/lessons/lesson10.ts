import { Lesson } from '../../types';

export const lesson10: Lesson = {
  id: 10,
  title: "Misión Final: Odisea Estelar",
  description: "Toma el mando de una nave estelar. Gestiona la energía, enfréntate a peligros y completa tu misión.",
  steps: [
    {
      type: 'theory',
      title: "Al Mando, Capitán",
      content: `
¡Bienvenido al puente de la M.E.S. (Mini-Emprendedor Sonda) Coder-1!
Has sido elegido para una misión crítica: navegar a través de 5 sectores peligrosos para entregar suministros vitales en el Sector 5.

Este proyecto final no es solo un ejercicio, es un sistema completo. Gestionarás los recursos de tu nave, te enfrentarás a peligros y tomarás decisiones que determinarán el éxito de tu misión.

**¡Buena suerte, Capitán!**
      `
    },
    {
      type: 'theory',
      title: "¡Nuevo Comando en el Radar!",
      content: `
Para que el universo se sienta impredecible, hemos instalado una nueva función en la computadora de la nave: **RND()**.

\`RND(maximo)\` te da un número aleatorio entre 1 y el \`maximo\` que le indiques.
*   \`RND(6)\` simula un dado.
*   \`RND(100)\` te da un porcentaje.

Usaremos \`RND()\` para decidir si te encuentras con una nave Klingon después de un salto espacial. ¡Hace que cada partida sea diferente!
      `
    },
    {
      type: 'theory',
      title: "El Corazón de la Nave (El Código)",
      content: `
El código que estás a punto de ver es el más complejo hasta ahora, pero no te asustes. Está organizado como un verdadero juego:

1.  **Inicialización:** Se definen las variables de la nave (energía, escudos, ubicación).
2.  **Bucle Principal (\`DO WHILE\`):** El juego se repite turno tras turno mientras la misión esté activa.
3.  **Reporte de Estado:** Al inicio de cada turno, te informa sobre tu situación.
4.  **Procesador de Comandos:** Lee tu \`INPUT\` y usa un gran bloque \`IF/ELSEIF\` para decidir qué hacer.
5.  **Eventos del Universo:** Después de tu acción, el universo (los Klingons) puede que actúe también.
6.  **Chequeo de Fin de Juego:** Comprueba si has ganado o perdido.
`
    },
    {
      type: 'code',
      title: "Simulador de Mando Estelar",
      content: `
Aquí tienes el software completo de la Coder-1.
**Tu misión:** Llega al Sector 5. Usa tus comandos sabiamente.

**Comandos disponibles:**
*   **AYUDA:** Muestra esta lista de comandos.
*   **WARP:** Viaja al siguiente sector. (Cuesta energía)
*   **ESCUDOS:** Activa o desactiva los escudos. (Cuesta energía mantenerlos)
*   **FASERS:** Dispara armas de energía. (Cuesta energía)
*   **TORPEDO:** Lanza un torpedo fotónico. (Munición limitada, pero potente)
*   **REPORTE:** Muestra el estado actual de la nave.
      `,
      exercise: {
        prompt: "Tu nave es muy débil para esta misión. Modifica los valores iniciales para que la nave comience con 200 de energía y 5 torpedos. ¡Ahora tendrás más oportunidades!",
        // FIX: Added closing backtick to initialCode template literal.
        initialCode: `REM --- INICIALIZACIÓN DE LA NAVE ---
PRINT "=== MISIÓN: ODISEA ESTELAR ==="
mision_activa = 1
sector_actual = 1
energia = 100
escudos_activos = 0
torpedos = 3

klingon_presente = 0
klingon_escudos = 0

DO WHILE mision_activa = 1
    PRINT ""
    PRINT "--- PUENTE DE MANDO ---"
    
    ' --- REPORTE DE ESTADO ---
    IF klingon_presente = 1 THEN
        PRINT "¡ALERTA ROJA! Nave Klingon en el sector."
        PRINT "Escudos Klingon: " + klingon_escudos + "%"
    ELSE
        PRINT "Sector " + sector_actual + ". Todo tranquilo."
    END IF
    
    INPUT "> ", comando$
    
    ' --- PROCESADOR DE COMANDOS ---
    IF comando$ = "AYUDA" THEN
        PRINT "--- MANUAL DE COMANDOS ---"
        PRINT "AYUDA   - Muestra esta lista."
        PRINT "REPORTE - Estado de la nave."
        PRINT "WARP    - Viaja al siguiente sector."
        PRINT "ESCUDOS - Activa/desactiva los escudos."
        PRINT "FASERS  - Dispara armas de energía."
        PRINT "TORPEDO - Lanza un torpedo potente."
    ELSEIF comando$ = "REPORTE" THEN
        PRINT "--- REPORTE DE LA NAVE ---"
        PRINT "Energía: " + energia + "%"
        PRINT "Torpedos restantes: " + torpedos
        IF escudos_activos = 1 THEN
            PRINT "Escudos: ACTIVOS"
        ELSE
            PRINT "Escudos: INACTIVOS"
        END IF

    ELSEIF comando$ = "WARP" THEN
        IF klingon_presente = 1 THEN
            PRINT "¡No podemos saltar a warp durante un combate!"
        ELSE
            PRINT "Iniciando salto warp..."
            energia = energia - 20
            sector_actual = sector_actual + 1
            PRINT "Has llegado al Sector " + sector_actual + "."
            
            ' Evento aleatorio de encuentro
            IF RND(2) = 1 THEN
                PRINT "¡Se ha detectado una nave hostil!"
                klingon_presente = 1
                klingon_escudos = 100
            END IF
        END IF

    ELSEIF comando$ = "ESCUDOS" THEN
        IF escudos_activos = 0 THEN
            PRINT "Subiendo escudos."
            escudos_activos = 1
            energia = energia - 15
        ELSE
            PRINT "Bajando escudos para conservar energía."
            escudos_activos = 0
        END IF

    ELSEIF comando$ = "FASERS" THEN
        IF klingon_presente = 0 THEN
            PRINT "No hay a qué disparar."
        ELSE
            PRINT "Disparando fasers..."
            energia = energia - 10
            danio = RND(25)
            klingon_escudos = klingon_escudos - danio
            PRINT "¡Impacto! Los escudos enemigos bajan a " + klingon_escudos + "%"
        END IF

    ELSEIF comando$ = "TORPEDO" THEN
        IF klingon_presente = 0 THEN
            PRINT "No hay a qué disparar."
        ELSEIF torpedos > 0 THEN
            PRINT "¡Lanzando torpedo fotónico!"
            torpedos = torpedos - 1
            klingon_escudos = klingon_escudos - 75 ' Los torpedos son muy efectivos
            PRINT "¡Impacto masivo! Escudos enemigos críticamente bajos."
        ELSE
            PRINT "¡No quedan más torpedos!"
        END IF
    ELSE
        PRINT "Comando no reconocido, Capitán."
    END IF
    
    ' --- TURNO DEL KLINGON ---
    IF klingon_presente = 1 THEN
        IF klingon_escudos <= 0 THEN
            PRINT "¡Enemigo destruido! El sector es seguro."
            klingon_presente = 0
        ELSE
            PRINT "La nave Klingon devuelve el fuego."
            IF escudos_activos = 1 THEN
                PRINT "Nuestros escudos absorben el daño."
                energia = energia - 5 ' Mantener escudos cuesta energía
            ELSE
                PRINT "¡Impacto directo en el casco!"
                energia = energia - 25
            END IF
        END IF
    END IF
    
    ' --- CHEQUEO DE FIN DE JUEGO ---
    IF energia <= 0 THEN
        PRINT "¡La energía de la nave ha llegado a cero!"
        PRINT "--- MISIÓN FALLIDA ---"
        mision_activa = 0
    ELSEIF sector_actual >= 5 THEN
        PRINT "¡Hemos llegado al Sector 5! Los suministros han sido entregados."
        PRINT "--- ¡MISIÓN CUMPLIDA! ---"
        mision_activa = 0
    END IF
LOOP
`,
        solutionCues: ['RND', 'DO WHILE']
      }
    },
    {
      type: 'theory',
      title: "El Viaje Continúa...",
      content: `
¡Felicidades, Comandante! Has dominado los fundamentos de la programación.
Has pasado de escribir "Hola Mundo" a comandar una nave estelar.

El viaje de un programador nunca termina. Este es solo el primer paso. Ahora tienes las herramientas para crear tus propios mundos, tus propias reglas y tus propias aventuras en el **Sandbox**.

¿Qué construirás ahora?
      `
    }
  ]
};