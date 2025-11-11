
export interface LessonStep {
  type: 'theory' | 'exercise' | 'code' | 'logic-simulation' | 'logic-simulation-2d';
  title: string;
  content: string; // Markdown-like or HTML string
  exercise?: {
    prompt: string;
    initialCode?: string;
    solutionCues?: string[]; // Keywords to look for in code to loosely validate
    expectedOutput?: string;
  };
  scenarioId?: string; // For logic-simulation steps
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  steps: LessonStep[];
}

export type InterpreterTokenType = 'keyword' | 'string' | 'number' | 'variable' | 'operator' | 'comment' | 'unknown';

export interface Token {
  type: InterpreterTokenType;
  value: string;
  start: number;
  end: number;
}

export interface ExecutionResult {
  output: string[];
  error?: string;
  isWaitingForInput?: boolean;
  inputVariableName?: string;
}

// Logic Simulator Types (Text Based - Legacy but kept for flexibility)
export type GameStateValue = string | boolean | number;
export type GameState = Record<string, GameStateValue>;

export interface LogicAction {
  id: string;
  label: string;
  check: (state: GameState) => true | string;
  apply: (state: GameState) => GameState;
}

export interface LogicScenario {
  id: string;
  title: string;
  description: string;
  initialState: GameState;
  goal: (state: GameState) => boolean;
  actions: LogicAction[];
  stateDescriptions: Record<string, (val: GameStateValue) => string>;
}

// --- NEW 2D ROBOT SIMULATOR TYPES ---
export type RobotInstructionType = 'MOVE' | 'ROTATE' | 'GRIP_OPEN' | 'GRIP_CLOSE' | 'WAIT';

export interface RobotInstruction {
    id: string;
    type: RobotInstructionType;
    label: string;
    param?: number; // Distance for MOVE, degrees for ROTATE, strength for GRIP
}

export interface InteractiveObject2D {
    id: string;
    emoji: string;
    x: number;
    y: number;
    width: number;
    height: number;
    isGrabbable: boolean;
    breakForce?: number; // If grip strength > this, it breaks
    minGripForce?: number; // Need at least this to pick up
    isBroken?: boolean;
}

export interface Robot2DState {
    x: number;
    y: number;
    angle: number; // degrees, 0 facing EAST (right)
    gripperOpen: boolean;
    holdingObjectId: string | null;
    crashed: boolean;
}

export interface WorldState2D {
    robot: Robot2DState;
    objects: InteractiveObject2D[];
    zones: { id: string, x: number, y: number, width: number, height: number, label: string }[];
    log: string[];
    status: 'running' | 'success' | 'failed';
}

export interface Scenario2D {
    id: string;
    title: string;
    description: string;
    initialWorld: WorldState2D;
    availableInstructions: RobotInstruction[];
    goalCheck: (world: WorldState2D) => { complete: boolean, error?: string };
}
