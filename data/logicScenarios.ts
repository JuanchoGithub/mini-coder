
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
  }
];
