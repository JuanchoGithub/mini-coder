
import { LogicScenario, GameState } from '../types';

export const logicScenarios: LogicScenario[] = [
  {
    id: 'robot-cafe',
    title: 'El Robot Camarero',
    description: 'Tu misión: Lograr que el robot sirva una taza de café caliente en la mesa. ¡Cuidado con el orden de las instrucciones!',
    initialState: {
        robot_loc: 'COCINA',
        taza_loc: 'ALACENA',
        taza_llena: false,
        robot_mano: 'NADA'
    },
    stateDescriptions: {
        robot_loc: (val) => `🤖 Robot está en: ${val}`,
        taza_loc: (val) => `☕ La Taza está en: ${val}`,
        taza_llena: (val) => val ? `💧 La Taza tiene café` : `💨 La Taza está vacía`,
        robot_mano: (val) => `✋ El Robot tiene: ${val}`
    },
    goal: (state: GameState) => 
        state.taza_loc === 'MESA' && state.taza_llena === true && state.robot_mano === 'NADA',
    actions: [
        {
            id: 'ir_cocina',
            label: 'IR A COCINA',
            check: (s) => s.robot_loc !== 'COCINA' || "Ya estás en la cocina.",
            apply: (s) => ({ ...s, robot_loc: 'COCINA' })
        },
        {
            id: 'ir_mesa',
            label: 'IR A MESA',
            check: (s) => s.robot_loc !== 'MESA' || "Ya estás en la mesa.",
            apply: (s) => ({ ...s, robot_loc: 'MESA' })
        },
        {
            id: 'agarrar_taza',
            label: 'AGARRAR TAZA',
            check: (s) => {
                if (s.robot_mano !== 'NADA') return "¡Ya tienes algo en la mano!";
                if (s.robot_loc !== s.taza_loc) return "No veo la taza aquí.";
                return true;
            },
            apply: (s) => ({ ...s, robot_mano: 'TAZA', taza_loc: 'ROBOT' })
        },
        {
            id: 'servir_cafe',
            label: 'SERVIR CAFÉ',
            check: (s) => {
                if (s.robot_loc !== 'COCINA') return "La cafetera está en la cocina.";
                if (s.robot_mano !== 'TAZA') return "¿Dónde sirvo? No tienes la taza en la mano.";
                if (s.taza_llena) return "¡Ya está llena! Se va a desbordar.";
                return true;
            },
            apply: (s) => ({ ...s, taza_llena: true })
        },
        {
            id: 'dejar_taza',
            label: 'DEJAR TAZA',
            check: (s) => s.robot_mano === 'TAZA' || "No tienes ninguna taza para dejar.",
            apply: (s) => ({ ...s, robot_mano: 'NADA', taza_loc: s.robot_loc })
        }
    ]
  },
  // EJERCICIO 1: COLECTIVO
  {
    id: 'catching-bus',
    title: 'Tomar el Colectivo',
    description: 'Estás en la calle y ves venir tu colectivo. Tienes que lograr subirte.',
    initialState: {
        tu_ubicacion: 'CALLE_LEJOS',
        colectivo: 'VINIENDO'
    },
    stateDescriptions: {
        tu_ubicacion: (val) => `📍 Estás en: ${val}`,
        colectivo: (val) => `🚌 El colectivo está: ${val}`
    },
    goal: (state) => state.tu_ubicacion === 'ARRIBA_DEL_COLECTIVO',
    actions: [
        {
            id: 'ir_parada',
            label: 'IR A LA PARADA',
            check: (s) => s.tu_ubicacion !== 'PARADA' || "Ya estás en la parada.",
            apply: (s) => ({ ...s, tu_ubicacion: 'PARADA' })
        },
        {
            id: 'hacer_senas',
            label: 'HACER SEÑAS',
            check: (s) => {
                if (s.tu_ubicacion !== 'PARADA') return "El chofer no te ve si no estás en la parada.";
                if (s.colectivo === 'PASO') return "¡Demasiado tarde! Ya pasó.";
                return true;
            },
            apply: (s) => ({ ...s, colectivo: 'DETENIDO' })
        },
        {
            id: 'subir',
            label: 'SUBIR AL COLECTIVO',
            check: (s) => {
                 if (s.tu_ubicacion !== 'PARADA') return "Debes estar en la parada para subir.";
                 if (s.colectivo === 'VINIENDO') return "¡Espera a que frene! Te vas a lastimar.";
                 if (s.colectivo === 'PASO') return "Ya se fue...";
                 return true;
            },
            apply: (s) => ({ ...s, tu_ubicacion: 'ARRIBA_DEL_COLECTIVO' })
        },
        {
            id: 'esperar',
            label: 'ESPERAR SIN HACER NADA',
            check: () => true,
            apply: (s) => ({ ...s, colectivo: 'PASO' }) // Si esperas sin hacer señas, pasa de largo
        }
    ]
  },
  // EJERCICIO 2: BAÑARSE
  {
    id: 'showering',
    title: 'Hora del Baño',
    description: 'Te estás bañando. Tu objetivo es salir limpio de la ducha.',
    initialState: {
        pelo: 'SUCIO',
        ubicacion: 'DUCHA'
    },
    stateDescriptions: {
        pelo: (val) => `💆 Estado del pelo: ${val}`,
        ubicacion: (val) => `🚿 Estás en: ${val}`
    },
    goal: (state) => state.pelo === 'LIMPIO' && state.ubicacion === 'AFUERA',
    actions: [
        {
            id: 'shampoo',
            label: 'PONER SHAMPOO',
            check: (s) => {
                if (s.ubicacion !== 'DUCHA') return "¡Saliste de la ducha! Moja todo si usas shampoo afuera.";
                if (s.pelo !== 'SUCIO') return "Ya te pusiste shampoo.";
                return true;
            },
            apply: (s) => ({ ...s, pelo: 'JABONOSO' })
        },
        {
            id: 'enjuagar',
            label: 'ENJUAGAR',
            check: (s) => {
                 if (s.pelo === 'SUCIO') return "No tiene sentido enjuagar si no pusiste shampoo.";
                 if (s.pelo === 'LIMPIO') return "Ya está limpio, no gastes agua.";
                 return true;
            },
            apply: (s) => ({ ...s, pelo: 'LIMPIO' })
        },
        {
            id: 'salir',
            label: 'SALIR DE LA DUCHA',
            check: (s) => {
                if (s.pelo === 'JABONOSO') return "¡Todavía tienes shampoo en la cabeza!";
                return true;
            },
            apply: (s) => ({ ...s, ubicacion: 'AFUERA' })
        }
    ]
  },
   // EJERCICIO 3: ESTACIONAR
  {
    id: 'parking',
    title: 'Estacionar el Auto',
    description: 'Vienes manejando y ves un lugar vacío. Tienes que dejar el auto estacionado y apagado.',
    initialState: {
        estado_auto: 'ANDANDO',
        marcha: 'DRIVE (D)',
        ubicacion: 'CALLE'
    },
    stateDescriptions: {
        estado_auto: (val) => `🚗 Motor: ${val}`,
        marcha: (val) => `⚙️ Marcha: ${val}`,
        ubicacion: (val) => `📍 Ubicación: ${val}`
    },
    goal: (state) => state.ubicacion === 'ESTACIONADO' && state.estado_auto === 'APAGADO',
    actions: [
        {
            id: 'frenar',
            label: 'FRENAR A CERO',
            check: (s) => s.estado_auto === 'ANDANDO' || "El auto ya está detenido.",
            apply: (s) => ({ ...s, estado_auto: 'DETENIDO' })
        },
        {
            id: 'reversa',
            label: 'PONER REVERSA (R)',
            check: (s) => {
                if (s.estado_auto === 'ANDANDO') return "¡Cuidado! No puedes poner reversa si el auto se mueve hacia adelante.";
                return true;
            },
            apply: (s) => ({ ...s, marcha: 'REVERSA (R)' })
        },
        {
            id: 'maniobrar',
            label: 'MANIOBRAR AL LUGAR',
            check: (s) => {
                 if (s.marcha !== 'REVERSA (R)') return "Necesitas poner reversa para entrar en ese lugar.";
                 if (s.ubicacion === 'ESTACIONADO') return "Ya estás en el lugar.";
                 return true;
            },
            apply: (s) => ({ ...s, ubicacion: 'ESTACIONADO' })
        },
        {
            id: 'apagar',
            label: 'APAGAR MOTOR',
            check: (s) => {
                if (s.ubicacion !== 'ESTACIONADO') return "¡No apagues el motor en medio de la calle!";
                return true;
            },
            apply: (s) => ({ ...s, estado_auto: 'APAGADO' })
        }
    ]
  }
];
