

import { ExecutionResult, OutputLine } from '../types';

// MiniQB Interpreter Engine
// A line-by-line interpreter inspired by Microsoft QuickBASIC 4.5

// --- Web Audio API Setup ---
let audioContext: AudioContext | null = null;
const getAudioContext = (): AudioContext => {
    if (!audioContext) {
        // Fallback for older browsers.
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    // In some browsers, the AudioContext starts in a suspended state and must be resumed by a user gesture.
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    return audioContext;
};

// --- Execution Control ---
let stopRequested = false;
let activeOscillators: Set<OscillatorNode> = new Set();

const stopAllSounds = () => {
    if (audioContext) {
        activeOscillators.forEach(osc => {
            try {
                // Oscillator might have already stopped, so this can throw.
                osc.stop();
            } catch (e) {
                // Ignore errors.
            }
        });
        activeOscillators.clear();
    }
};

export const requestStop = () => {
    stopRequested = true;
    stopAllSounds();
};

const interruptibleWait = async (duration: number) => {
    const interval = 50; // Check for stop request every 50ms
    let elapsed = 0;
    while(elapsed < duration) {
        if (stopRequested) {
            break;
        }
        const waitTime = Math.min(interval, duration - elapsed);
        await new Promise(r => setTimeout(r, waitTime));
        elapsed += waitTime;
    }
};

// Async helper to play a single tone and wait for it to finish
const playTone = (frequency: number, duration: number, mode: 'MN' | 'ML' | 'MS' = 'MN'): Promise<void> => {
    return new Promise(async (resolve) => {
        if (stopRequested) {
            return resolve();
        }

        const context = getAudioContext();
        if (frequency <= 0 || duration <= 0) {
            // It's a pause or invalid note, just wait for the duration interruptibly.
            await interruptibleWait(duration);
            return resolve();
        }

        const oscillator = context.createOscillator();
        const gainNode = context.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(context.destination);

        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        
        let playDurationFactor = 7 / 8; // MN default
        if (mode === 'ML') playDurationFactor = 1.0; // Legato
        if (mode === 'MS') playDurationFactor = 0.75; // Staccato

        const playDuration = (duration / 1000) * playDurationFactor;
        
        // A simple volume envelope to prevent harsh "clicks" at the start and end of the sound.
        gainNode.gain.setValueAtTime(0, context.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, context.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + playDuration);
        
        activeOscillators.add(oscillator);
        oscillator.onended = () => {
            activeOscillators.delete(oscillator);
        };
        
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + playDuration);
        
        // The total time waited should be the full note duration, but interruptibly.
        await interruptibleWait(duration);
        activeOscillators.delete(oscillator); // Ensure it's removed
        resolve();
    });
};

// Note names to semitone index relative to C
const noteSemitoneMap: Record<string, number> = {
    'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11
};

// Note number (0-84) to frequency table
const noteNumFrequencies: number[] = [
    0, // Pause
    16.35, 17.32, 18.35, 19.45, 20.6, 21.83, 23.12, 24.5, 25.96, 27.5, 29.14, 30.87, // Octave 0
    32.7, 34.65, 36.71, 38.89, 41.2, 43.65, 46.25, 49, 51.91, 55, 58.27, 61.74,       // Octave 1
    65.41, 69.3, 73.42, 77.78, 82.41, 87.31, 92.5, 98, 103.8, 110, 116.5, 123.5,     // Octave 2
    130.8, 138.6, 146.8, 155.6, 164.8, 174.6, 185, 196, 207.7, 220, 233.1, 246.9,    // Octave 3
    261.6, 277.2, 293.7, 311.1, 329.6, 349.2, 370, 392, 415.3, 440, 466.2, 493.9,    // Octave 4
    523.3, 554.4, 587.3, 622.3, 659.3, 698.5, 740, 784, 830.6, 880, 932.3, 987.8,    // Octave 5
    1047, 1109, 1175, 1245, 1319, 1397, 1480, 1568, 1661, 1760, 1865, 1976,           // Octave 6
    2093, 2217, 2349, 2489, 2637, 2794, 2960, 3136, 3322, 3520, 3729, 3951            // Octave 7 (first C)
];
// --- End Web Audio API Setup ---


type Variables = Record<string, any>;

type BlockType = 'IF' | 'DO' | 'FOR';

interface Block {
  type: BlockType;
  line: number; // Start line of the block
  meta?: any;   // Extra info (e.g., FOR loop variable, end value, step)
}

interface InterpreterState {
  variables: Variables;
  output: OutputLine[];
  waitingForInput: boolean;
  inputTargetVariable: string | null;
  currentLineIndex: number;
  blockStack: Block[];
  operationsCount: number;
  playState: {
    octave: number;
    tempo: number;
    length: number;
    mode: 'MN' | 'ML' | 'MS';
  };
}

let currentState: InterpreterState = {
  variables: {},
  output: [],
  waitingForInput: false,
  inputTargetVariable: null,
  currentLineIndex: 0,
  blockStack: [],
  operationsCount: 0,
  playState: {
    octave: 4,
    tempo: 120,
    length: 4,
    mode: 'MN',
  }
};

export const KEYWORDS = [
    'PRINT', 'INPUT', 'LET', 'DIM', 'IF', 'THEN', 'ELSE', 'ELSEIF', 'END', 'FOR', 'TO', 'STEP', 'NEXT', 'DO', 'WHILE', 'UNTIL', 'LOOP', 'REM', 'CLS', 'RND',
    'BEEP', 'SOUND', 'PLAY'
];

export const KEYWORD_HELP: Record<string, string> = {
  'PRINT': 'Muestra texto o números en la pantalla. Ejemplo: PRINT "Hola mundo"',
  'INPUT': 'Pide al usuario que escriba algo. Ejemplo: INPUT "Tu nombre: ", nombre$',
  'IF': 'Inicia una decisión. Si la condición es verdadera, ejecuta el código siguiente. Ejemplo: IF edad > 18 THEN',
  'THEN': 'Va después de una condición IF. Indica qué hacer si es verdadera.',
  'ELSE': 'Parte opcional de un IF. Indica qué hacer si la condición NO fue verdadera.',
  'END': 'Termina un bloque (END IF) o el programa (END).',
  'FOR': 'Inicia un bucle que cuenta desde un número hasta otro. Ejemplo: FOR i = 1 TO 10',
  'TO': 'Define el final de un bucle FOR.',
  'NEXT': 'Cierra un bucle FOR y avanza al siguiente número.',
  'DO': 'Inicia un bucle que se repite mientras una condición sea cierta. Ejemplo: DO WHILE puntos < 100',
  'WHILE': 'Usado en DO loops para repetir MIENTRAS algo sea verdadero.',
  'LOOP': 'Marca el final de un bucle DO y vuelve al principio.',
  'REM': 'Marca una línea como comentario (ignorado por la computadora). También puedes usar \'.',
  'CLS': 'Limpia la pantalla de salida.',
  'RND': 'Genera un número aleatorio. Ejemplo: dado = RND(6) te da un número del 1 al 6.',
  'BEEP': 'Produce un sonido corto y simple. Como el pitido de una computadora vieja. Ejemplo: BEEP',
  'SOUND': 'Toca una nota con una frecuencia (Hz) y duración (ticks) específicas. Aprox. 18.2 ticks por segundo. Ejemplo: SOUND 440, 9 (toca La por ~medio segundo)',
  'PLAY': 'Toca una melodía compleja escrita como texto. Ejemplo: PLAY "T180 O5 L8 C G E G"',
  'DIM': 'Declara un arreglo (una lista de variables) con un tamaño fijo. Ejemplo: DIM mi_lista(10)',
};

export const resetState = () => {
  currentState = {
    variables: {},
    output: [],
    waitingForInput: false,
    inputTargetVariable: null,
    currentLineIndex: 0,
    blockStack: [],
    operationsCount: 0,
    playState: {
        octave: 4,
        tempo: 120,
        length: 4,
        mode: 'MN',
    }
  };
  stopRequested = false;
  stopAllSounds();
};

// Helper to escape regex characters in variable names (like $)
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
}

// Core expression evaluator that handles QB operators and variables
const evaluateExpression = (expr: string, vars: Variables): any => {
    let evalStr = expr.trim();
    if (evalStr === '') return '';

    // --- FIX: Isolate string literals to prevent variable substitution within them ---
    const stringLiterals: string[] = [];
    // The regex captures strings, handling escaped quotes.
    evalStr = evalStr.replace(/"(?:[^"\\]|\\.)*"/g, (match) => {
        const placeholder = `__STRING_LITERAL_${stringLiterals.length}__`;
        stringLiterals.push(match);
        return placeholder;
    });

    // 1. Handle RND() function first before any other substitution
    evalStr = evalStr.replace(/\bRND\s*\(\s*([^)]+)\s*\)/gi, (match, p1) => {
        const max = parseInt(evaluateExpression(p1, vars));
        if (isNaN(max) || max <= 0) return '1';
        return String(Math.floor(Math.random() * max) + 1);
    });
    
    // 2. Substitute variables (including array access) with their values.
    // This is done BEFORE transpiling operators.
    const varNames = Object.keys(vars).sort((a, b) => b.length - a.length);

    for (const varName of varNames) {
        const varValue = vars[varName];
        const escapedVarName = escapeRegExp(varName);

        // A. Handle array access first: var(index)
        if (Array.isArray(varValue)) {
            // FIX: Use word boundary only if varName does not end in a sigil.
            const arrayAccessRegex = /[\$%\!#]$/.test(varName)
                ? new RegExp(`${escapedVarName}\\s*\\(([^)]+)\\)`, 'gi')
                : new RegExp(`\\b${escapedVarName}\\s*\\(([^)]+)\\)`, 'gi');

            evalStr = evalStr.replace(arrayAccessRegex, (match, indexExpr) => {
                try {
                    const index = Math.floor(Number(evaluateExpression(indexExpr, vars)));
                    if (isNaN(index)) throw new Error(`Índice inválido para el arreglo "${varName}".`);
                    if (index < 1 || index >= varValue.length) throw new Error(`Índice fuera de rango: ${index} para el arreglo "${varName}".`);
                    
                    const value = varValue[index];
                    // If the value from the array is a string, wrap it in quotes to make it a JS literal
                    if (typeof value === 'string') {
                        return `"${String(value).replace(/"/g, '\\"')}"`;
                    }
                    return String(value);
                } catch (e: any) {
                    if (e.message.startsWith('Índice')) throw e;
                    // If index evaluation fails, it might be a different function. Leave it untouched.
                    return match;
                }
            });
        }
        // B. Handle simple variable substitution: var
        else {
            const regex = /[\$%\!#]$/.test(varName)
                ? new RegExp(escapedVarName, 'gi') // Sigil variables don't need word boundaries
                : new RegExp(`\\b${escapedVarName}\\b`, 'gi');

            // Use a replacer function to prevent special replacement patterns (like $&, $', etc.)
            // in the variable's value from being interpreted by the replace method. This is safer.
            evalStr = evalStr.replace(regex, () => {
                 if (typeof varValue === 'string') {
                    // Convert the variable's string content into a valid JS string literal
                    return `"${String(varValue).replace(/"/g, '\\"')}"`;
                }
                return String(varValue);
            });
        }
    }

    // --- FIX: Restore the string literals after variable substitution ---
    for (let i = 0; i < stringLiterals.length; i++) {
        const placeholder = `__STRING_LITERAL_${i}__`;
        // Use a function in replace to avoid issues if a string literal contains '$'
        evalStr = evalStr.replace(placeholder, () => stringLiterals[i]);
    }

    // 3. Transpile QB operators to JS operators
    // Use placeholders for multi-character operators to avoid corruption by the single '=' replacement.
    evalStr = evalStr.replace(/<=/g, '__LTE__')
                     .replace(/>=/g, '__GTE__')
                     .replace(/<>/g, '__NEQ__')
                     // Replace single = with === for comparison (assignment is handled before this func in LET)
                     .replace(/=/g, '===')
                     // Restore placeholder operators to their JS equivalents
                     .replace(/__LTE__/g, '<=')
                     .replace(/__GTE__/g, '>=')
                     .replace(/__NEQ__/g, '!==')
                     .replace(/\bAND\b/gi, '&&')
                     .replace(/\bOR\b/gi, '||')
                     .replace(/\bNOT\b/gi, '!')
                     .replace(/\bMOD\b/gi, '%');

    try {
        // Very dangerous in real apps, acceptable for this constrained sandbox educational tool.
        // eslint-disable-next-line no-new-func
        const result = Function(`"use strict"; return (${evalStr})`)();

        if (typeof result === 'number' && isNaN(result)) {
            throw new Error(`Error de tipo: No se puede realizar una operación matemática con texto.`);
        }
        
        // QB behavior: True is often -1, False is 0.
        // For simplicity in teaching, we'll map JS true/false to 1/0 as per lessons.
        if (typeof result === 'boolean') {
            return result ? 1 : 0;
        }
        return result;
    } catch (e: any) {
        // If it's our custom error, let it pass through.
        if (e.message.startsWith('Error de tipo') || e.message.startsWith('Índice')) {
            throw e;
        }
        // Otherwise, it's a real syntax error from the Function() constructor.
        throw new Error(`Error de sintaxis en la expresión: "${expr}"`);
    }
};

const evaluateCondition = (expr: string, vars: Variables): boolean => {
    const result = evaluateExpression(expr, vars);
    // In QB, 0 is false, anything else is true.
    return result !== 0 && result !== false && result !== null && result !== '';
};

const findMatchingEnd = (lines: string[], startIndex: number, blockType: string): number => {
    let depth = 0;
    for (let i = startIndex + 1; i < lines.length; i++) {
        const line = lines[i].trim().toUpperCase();
        const words = line.split(/\s+/);
        const firstWord = words[0];

        if (blockType === 'IF') {
            if (firstWord === 'IF' && words.includes('THEN') && !words.includes('END')) depth++;
            if (line === 'END IF' || (firstWord === 'END' && words[1] === 'IF')) {
                if (depth === 0) return i;
                depth--;
            }
        } else if (blockType === 'DO') {
            if (firstWord === 'DO') depth++;
            if (firstWord === 'LOOP') {
                if (depth === 0) return i;
                depth--;
            }
        } else if (blockType === 'FOR') {
             if (firstWord === 'FOR') depth++;
             if (firstWord === 'NEXT') {
                 if (depth === 0) return i;
                 depth--;
             }
        }
    }
    return lines.length;
};

const findElseOrEndIf = (lines: string[], startIndex: number): number => {
    let depth = 0;
    for (let i = startIndex + 1; i < lines.length; i++) {
        const line = lines[i].trim().toUpperCase();
        const words = line.split(/\s+/);
        const firstWord = words[0];

        if (firstWord === 'IF' && words.includes('THEN') && !words.includes('END')) {
            depth++;
        } else if (line === 'END IF' || (firstWord === 'END' && words[1] === 'IF')) {
            if (depth === 0) return i;
            depth--;
        } else if (firstWord === 'ELSE' && depth === 0) {
            return i;
        } else if (firstWord === 'ELSEIF' && depth === 0) {
             // Treat ELSEIF as a potential jump target for the initial IF failure
             return i;
        }
    }
    return lines.length;
};

export const executeCode = async (
    code: string,
    inputVal?: string,
    onOutputUpdate?: (output: OutputLine[]) => void
): Promise<ExecutionResult> => {
  // A new run (not from an INPUT prompt) must reset the entire state.
  if (inputVal === undefined) {
    resetState();
  } else if (inputVal !== undefined && currentState.inputTargetVariable) {
    // Handle Input
    const targetVar = currentState.inputTargetVariable;
    const arrayAccessMatch = targetVar.match(/^([a-zA-Z_][\w]*[$%#&!]?)\s*\((.+)\)$/);

    if (arrayAccessMatch) {
      // It's an array access
      const arrayName = arrayAccessMatch[1];
      const indexExpr = arrayAccessMatch[2];
      const index = Math.floor(Number(evaluateExpression(indexExpr, currentState.variables)));

      if (isNaN(index)) throw new Error(`Índice inválido para el arreglo "${arrayName}".`);
      
      if (!Array.isArray(currentState.variables[arrayName])) {
        throw new Error(`La variable "${arrayName}" no es un arreglo. Usa DIM para declararla.`);
      }
      if (index < 1 || index >= currentState.variables[arrayName].length) {
        throw new Error(`Índice fuera de rango: ${index} para el arreglo "${arrayName}".`);
      }
      
      let val: any = inputVal;
      // Check array type based on its name to correctly cast input.
      if (!arrayName.endsWith('$') && !isNaN(Number(inputVal)) && inputVal.trim() !== '') {
        val = Number(inputVal);
      }
      currentState.variables[arrayName][index] = val;
    } else {
      // It's a simple variable
      let val: any = inputVal;
      if (!targetVar.endsWith('$') && !isNaN(Number(inputVal)) && inputVal.trim() !== '') {
        val = Number(inputVal);
      }
      currentState.variables[targetVar] = val;
    }

    currentState.waitingForInput = false;
    currentState.inputTargetVariable = null;
    currentState.currentLineIndex++;
  }

  const lines = code.split('\n');
  const MAX_OPERATIONS = 100000; // Increased safety limit

  while (currentState.currentLineIndex < lines.length) {
    if (stopRequested) {
        return { output: currentState.output, error: "Ejecución detenida por el usuario." };
    }
      
    if (currentState.operationsCount++ > MAX_OPERATIONS) {
        return { output: currentState.output, error: "Tiempo de ejecución excedido. ¿Posible bucle infinito?" };
    }

    let i = currentState.currentLineIndex;
    let rawLine = lines[i].trim();
    
    // Handle comments
    if (rawLine.length === 0 || rawLine.startsWith('\'') || rawLine.toUpperCase().startsWith('REM ')) {
        currentState.currentLineIndex++;
        continue;
    }
    // Strip inline comments
    const commentIndex = rawLine.indexOf('\'');
    if (commentIndex > -1) {
        // BEWARE: quotes might contain ' character. A proper parser handles this.
        // Simple heuristic: if ' is after ", it might be inside string.
        // For this simple engine, we assume ' outside of strings for comments mostly.
        // Let's do a slightly better check: is it outside quotes?
        let isInsideString = false;
        let actualCommentIndex = -1;
        for (let j = 0; j < rawLine.length; j++) {
            if (rawLine[j] === '"') isInsideString = !isInsideString;
            if (rawLine[j] === '\'' && !isInsideString) {
                actualCommentIndex = j;
                break;
            }
        }
        if (actualCommentIndex > -1) {
            rawLine = rawLine.substring(0, actualCommentIndex).trim();
        }
    }

    try {
      const upperLine = rawLine.toUpperCase();

      // --- PRINT ---
      if (upperLine.startsWith('PRINT ') || upperLine === 'PRINT') {
        const expr = rawLine.substring(5).trim();
        if (expr === '') {
             currentState.output.push({ type: 'print', value: "" });
        } else {
             // Handle simple ";" or "," for formatting if we wanted (ignoring for basic V1)
             const val = evaluateExpression(expr, currentState.variables);
             currentState.output.push({ type: 'print', value: String(val) });
        }
        onOutputUpdate?.(currentState.output);

      // --- INPUT ---
      } else if (upperLine.startsWith('INPUT ')) {
        // FORMATS: INPUT var   OR   INPUT promptExpr, var
        let varName: string;
        let promptExpr: string | null = null;
        
        // Find the last comma or semicolon to separate the prompt from the variable.
        const lastComma = rawLine.lastIndexOf(',');
        const lastSemicolon = rawLine.lastIndexOf(';');
        const separatorPos = Math.max(lastComma, lastSemicolon);

        // A separator must exist after the INPUT keyword to indicate a prompt is present.
        if (separatorPos > 5) {
             promptExpr = rawLine.substring(5, separatorPos).trim();
             varName = rawLine.substring(separatorPos + 1).trim();
        } else {
             // No prompt, just the variable.
             varName = rawLine.substring(5).trim();
        }

        if (!varName) {
            throw new Error("Sintaxis de INPUT inválida. Falta la variable.");
        }
        
        // If there's a prompt expression, evaluate it. Otherwise, use the default prompt.
        if (promptExpr) {
             const promptValue = evaluateExpression(promptExpr, currentState.variables);
             currentState.output.push({ type: 'prompt', value: String(promptValue) });
        } else {
             currentState.output.push({ type: 'prompt', value: "? " }); // Standard QB generic prompt
        }
        onOutputUpdate?.(currentState.output);

        currentState.waitingForInput = true;
        currentState.inputTargetVariable = varName;
        return { output: currentState.output, isWaitingForInput: true, inputVariableName: varName };

      // --- LET (assignment) or Implicit Assignment ---
      } else if (upperLine.startsWith('LET ') || (rawLine.includes('=') && !upperLine.startsWith('IF ') && !upperLine.startsWith('ELSEIF ') && !upperLine.startsWith('FOR ') && !upperLine.startsWith('DO '))) {
          let assignStr = rawLine;
          if (upperLine.startsWith('LET ')) {
              assignStr = rawLine.substring(4).trim();
          }
          const equalPos = assignStr.indexOf('=');
          if (equalPos === -1) throw new Error("Asignación inválida");
          
          const leftSide = assignStr.substring(0, equalPos).trim();
          const rightSideExpr = assignStr.substring(equalPos + 1).trim();
          const value = evaluateExpression(rightSideExpr, currentState.variables);

          const arrayAccessMatch = leftSide.match(/^([a-zA-Z_][\w]*[$%#&!]?)\s*\((.+)\)$/);
          
          if (arrayAccessMatch) {
              const arrayName = arrayAccessMatch[1];
              const indexExpr = arrayAccessMatch[2];
              const index = Math.floor(Number(evaluateExpression(indexExpr, currentState.variables)));
              
              if (isNaN(index)) throw new Error(`Índice inválido para el arreglo "${arrayName}".`);
              
              if (!Array.isArray(currentState.variables[arrayName])) {
                  throw new Error(`La variable "${arrayName}" no es un arreglo. Usa DIM para declararla.`);
              }
              if (index < 1 || index >= currentState.variables[arrayName].length) {
                  throw new Error(`Índice fuera de rango: ${index} para el arreglo "${arrayName}".`);
              }
              currentState.variables[arrayName][index] = value;
          } else {
              const varName = leftSide;
              currentState.variables[varName] = value;
          }

      // --- IF ... THEN ... ---
      } else if (upperLine.startsWith('IF ')) {
          const thenIndex = upperLine.indexOf(' THEN');
          if (thenIndex === -1) throw new Error("Se esperaba THEN");

          const statementAfterThen = rawLine.substring(thenIndex + 5).trim();
          const conditionStr = rawLine.substring(3, thenIndex).trim();
          
          if (statementAfterThen === '') {
              // --- MULTI-LINE (BLOCK) IF ---
              const condition = evaluateCondition(conditionStr, currentState.variables);
              if (condition) {
                  currentState.blockStack.push({ type: 'IF', line: i });
                  // Continue to next line to execute the block
              } else {
                  // Jump to ELSE, ELSEIF or END IF
                  let jumpTo = findElseOrEndIf(lines, i);
                  
                  // Handle chaining ELSEIFs if we landed on one
                  while (lines[jumpTo]?.trim().toUpperCase().startsWith('ELSEIF')) {
                       const elseIfLine = lines[jumpTo].trim();
                       const elseIfUpper = elseIfLine.toUpperCase();
                       const thenIdx = elseIfUpper.indexOf(' THEN');
                       if (thenIdx === -1) throw new Error("ELSEIF sin THEN");
                       
                       const condStr = elseIfLine.substring(6, thenIdx).trim();
                       if (evaluateCondition(condStr, currentState.variables)) {
                           currentState.blockStack.push({ type: 'IF', line: jumpTo });
                           currentState.currentLineIndex = jumpTo;
                           break; 
                       } else {
                           jumpTo = findElseOrEndIf(lines, jumpTo);
                       }
                  }

                  currentState.currentLineIndex = jumpTo;
                  if (lines[jumpTo]?.trim().toUpperCase() === 'ELSE') {
                      currentState.blockStack.push({ type: 'IF', line: i });
                  }
                  if (lines[jumpTo]?.trim().toUpperCase().startsWith('ELSEIF')) {
                      // Handled in while loop, just need to re-process that line
                  } else {
                      // Jumped to ELSE or END IF, we need to skip it.
                      // No, the loop will increment and execute the line AFTER. Correct.
                  }
              }
          } else {
              // --- SINGLE-LINE IF ---
              if (statementAfterThen.toUpperCase().includes('END IF')) {
                  throw new Error("Error de sintaxis: END IF no es necesario para un IF de una sola línea. Use un bloque de varias líneas si necesita un END IF.");
              }
              
              const condition = evaluateCondition(conditionStr, currentState.variables);
              let statementToExecute = '';
              const elseIndex = statementAfterThen.toUpperCase().lastIndexOf(' ELSE ');

              if (elseIndex > -1) {
                  if (condition) {
                      statementToExecute = statementAfterThen.substring(0, elseIndex).trim();
                  } else {
                      statementToExecute = statementAfterThen.substring(elseIndex + 6).trim();
                  }
              } else {
                  if (condition) {
                      statementToExecute = statementAfterThen;
                  }
              }

              if (statementToExecute) {
                  // Inject the statement to execute into the code lines and rewind the interpreter
                  lines.splice(i + 1, 0, statementToExecute);
              }
              
              // Comment out the original line so it's not re-processed on error/rewind
              lines[i] = `' ${rawLine}`;

              // No change to currentLineIndex. The loop will increment it to i+1,
              // which is where the new statement was injected (or just the next line if none was).
          }


      // --- ELSEIF ---
      // If we hit an ELSEIF during normal execution, it means we just finished a TRUE IF block.
      // We must skip to END IF.
      } else if (upperLine.startsWith('ELSEIF ')) {
           const endIfLine = findMatchingEnd(lines, i, 'IF');
           currentState.currentLineIndex = endIfLine;
           continue;

      // --- ELSE ---
      } else if (upperLine === 'ELSE') {
          // We only hit ELSE if we just finished executing the TRUE branch of an IF.
          const endIfLine = findMatchingEnd(lines, i, 'IF');
          currentState.currentLineIndex = endIfLine;
          continue;

      // --- END IF ---
      } else if (upperLine === 'END IF') {
          const block = currentState.blockStack[currentState.blockStack.length - 1];
          if (block && block.type === 'IF') {
              currentState.blockStack.pop(); // Done with IF block
          }
          // If top is not IF, we assume it's from a skipped block, so we do nothing.
          
      // --- DO WHILE ... ---
      } else if (upperLine.startsWith('DO WHILE ')) {
          const currentBlock = currentState.blockStack[currentState.blockStack.length - 1];
          if (currentBlock && currentBlock.type === 'DO' && currentBlock.line === i) {
              // Re-entry from a LOOP statement, just continue into the body.
          } else {
            const conditionStr = rawLine.substring(9).trim();
            const condition = evaluateCondition(conditionStr, currentState.variables);
            
            if (condition) {
                currentState.blockStack.push({ type: 'DO', line: i, meta: conditionStr });
            } else {
                const loopEnd = findMatchingEnd(lines, i, 'DO');
                currentState.currentLineIndex = loopEnd;
                continue;
            }
          }

      // --- LOOP ---
      } else if (upperLine === 'LOOP') {
          const block = currentState.blockStack[currentState.blockStack.length - 1];
          if (block && block.type === 'DO') {
              // Re-evaluate condition
               const condition = evaluateCondition(block.meta, currentState.variables);
               if (condition) {
                   currentState.currentLineIndex = block.line; // Jump back to DO
                   continue;
               } else {
                   currentState.blockStack.pop(); // Loop finished
               }
          } else {
              throw new Error("LOOP sin DO");
          }

      // --- FOR var = start TO end STEP step ---
      } else if (upperLine.startsWith('FOR ')) {
          // Simple parsing: FOR i = 1 TO 10 [STEP 1]
          const toIndex = upperLine.indexOf(' TO ');
          const equalIndex = upperLine.indexOf('=');
          if (toIndex === -1 || equalIndex === -1) throw new Error("Error de sintaxis en FOR");

          const varName = rawLine.substring(4, equalIndex).trim();
          // If we are already IN this loop (jumped back from NEXT), don't re-init
          const currentBlock = currentState.blockStack[currentState.blockStack.length - 1];
          if (currentBlock && currentBlock.type === 'FOR' && currentBlock.line === i) {
               // We just jumped back here. Don't re-init. Just continue to body.
          } else {
              // New loop entry
              const startExpr = rawLine.substring(equalIndex + 1, toIndex).trim();
              let endExpr = '';
              let step = 1;

              const stepIndex = upperLine.indexOf(' STEP ');
              if (stepIndex > -1) {
                  endExpr = rawLine.substring(toIndex + 4, stepIndex).trim();
                  step = Number(evaluateExpression(rawLine.substring(stepIndex + 6).trim(), currentState.variables));
              } else {
                  endExpr = rawLine.substring(toIndex + 4).trim();
              }

              const startVal = Number(evaluateExpression(startExpr, currentState.variables));
              const endVal = Number(evaluateExpression(endExpr, currentState.variables));

              currentState.variables[varName] = startVal;
              currentState.blockStack.push({ 
                  type: 'FOR', 
                  line: i, 
                  meta: { varName, endVal, step } 
              });
              
              // Initial check: if loop shouldn't run at all
              if ((step > 0 && startVal > endVal) || (step < 0 && startVal < endVal)) {
                   currentState.blockStack.pop();
                   const nextLine = findMatchingEnd(lines, i, 'FOR');
                   currentState.currentLineIndex = nextLine;
                   continue;
              }
          }

      // --- NEXT [var] ---
      } else if (upperLine.startsWith('NEXT')) {
          const block = currentState.blockStack[currentState.blockStack.length - 1];
          if (block && block.type === 'FOR') {
              const { varName, endVal, step } = block.meta;
              currentState.variables[varName] += step;
              
              // Check if we should loop again
              // Standard QB FOR loop checks AFTER increment
              if ((step > 0 && currentState.variables[varName] <= endVal) ||
                  (step < 0 && currentState.variables[varName] >= endVal)) {
                  currentState.currentLineIndex = block.line; // Jump back to FOR line
                  continue;
              } else {
                   currentState.blockStack.pop(); // Loop done
              }
          } else {
              throw new Error("NEXT sin FOR");
          }

      } else if (upperLine === 'CLS') {
          currentState.output = [];
          onOutputUpdate?.(currentState.output);

      // --- BEEP ---
      } else if (upperLine === 'BEEP') {
        // BEEP is a quick sound, so we don't need to wait for it.
        // This is a "fire-and-forget" sound.
        playTone(880, 150).catch(console.error);
      
      // --- SOUND freq, duration ---
      } else if (upperLine.startsWith('SOUND ')) {
        const argsStr = rawLine.substring(6).trim();
        const args = argsStr.split(',');
        if (args.length !== 2) throw new Error("SOUND necesita dos argumentos: frecuencia, duración");
        
        const freq = evaluateExpression(args[0].trim(), currentState.variables);
        const durationInTicks = evaluateExpression(args[1].trim(), currentState.variables);

        if (typeof freq !== 'number' || typeof durationInTicks !== 'number') {
            throw new Error("Los argumentos de SOUND deben ser números.");
        }
        
        // Convert duration from clock ticks to milliseconds. 18.2 ticks per second.
        const durationInMs = durationInTicks * (1000 / 18.2);

        // Yield to event loop to allow UI render before blocking
        await new Promise(resolve => setTimeout(resolve, 0));
        await playTone(freq, durationInMs, 'MN');
      
      // --- PLAY "C D E" ---
      } else if (upperLine.startsWith('PLAY ')) {
        const melodyStr = evaluateExpression(rawLine.substring(5).trim(), currentState.variables);
        if (typeof melodyStr !== 'string') {
            throw new Error("El argumento de PLAY debe ser texto (entre comillas).");
        }
        
        // Use the persistent playState from currentState
        const { playState } = currentState;

        const tokens = melodyStr.toUpperCase().match(/(O\d+|<|>|L\d+\.*|T\d+|P\d+\.*|N\d+\.*|ML|MN|MS|[A-G][#\+\-]?\d*\.*)/gi) || [];

        for (const token of tokens) {
            if (stopRequested) break;

            const command = token[0];
            let valueStr = token.substring(1);

            // Yield to event loop before each sound to keep UI responsive
            const shouldPlaySound = ['P', 'N', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].includes(command);
            if (shouldPlaySound) {
                await new Promise(resolve => setTimeout(resolve, 0));
            }

            if (command === 'T') {
                const tempo = parseInt(valueStr);
                if (tempo >= 32 && tempo <= 255) playState.tempo = tempo;
            } else if (command === 'O') {
                const octave = parseInt(valueStr);
                if (octave >= 0 && octave <= 6) playState.octave = octave;
            } else if (command === '<') {
                playState.octave = Math.max(0, playState.octave - 1);
            } else if (command === '>') {
                playState.octave = Math.min(6, playState.octave + 1);
            } else if (command === 'L') {
                playState.length = parseInt(valueStr) || 4;
            } else if (command === 'M') {
                if (valueStr === 'N') playState.mode = 'MN';
                if (valueStr === 'L') playState.mode = 'ML';
                if (valueStr === 'S') playState.mode = 'MS';
            } else if (command === 'P') { // PAUSE
                let length = parseInt(valueStr) || playState.length;
                const quarterNoteDuration = 60000 / playState.tempo;
                let duration = (quarterNoteDuration * 4) / length;

                const dots = (valueStr.match(/\./g) || []).length;
                let tempDuration = duration;
                for (let d = 0; d < dots; d++) {
                    tempDuration /= 2;
                    duration += tempDuration;
                }
                
                await playTone(0, duration, playState.mode);

            } else if (command === 'N') { // NOTE NUMBER
                const noteNum = parseInt(valueStr);
                
                const quarterNoteDuration = 60000 / playState.tempo;
                let duration = (quarterNoteDuration * 4) / playState.length;

                const dots = (valueStr.match(/\./g) || []).length;
                let tempDuration = duration;
                for (let d = 0; d < dots; d++) {
                    tempDuration /= 2;
                    duration += tempDuration;
                }

                let freq = 0;
                if (noteNum > 0 && noteNum < noteNumFrequencies.length) {
                    freq = noteNumFrequencies[noteNum];
                }
                
                await playTone(freq, duration, playState.mode);

            } else if (command >= 'A' && command <= 'G') {
                const noteMatch = token.match(/([A-G])([#\+\-]?)(\d*)(\.*)/);
                if (!noteMatch) continue;

                let [, noteName, accidental, lengthStr, dotsStr] = noteMatch;
                
                let length = parseInt(lengthStr) || playState.length;
                if (length === 0) length = 4;

                let semitone = noteSemitoneMap[noteName];
                let currentOctave = playState.octave;

                if (accidental === '#' || accidental === '+') semitone++;
                if (accidental === '-') semitone--;

                if (semitone < 0) {
                    semitone += 12;
                    currentOctave--;
                }
                if (semitone > 11) {
                    semitone -= 12;
                    currentOctave++;
                }
                if (currentOctave < 0 || currentOctave > 6) continue;

                const noteNum = (currentOctave * 12) + semitone + 12; // MIDI note number approx
                const freq = noteNumFrequencies[noteNum + 1] || 0;
                
                const quarterNoteDuration = 60000 / playState.tempo;
                let duration = (quarterNoteDuration * 4) / length;

                const dots = dotsStr.length;
                let tempDuration = duration;
                for (let d = 0; d < dots; d++) {
                    tempDuration /= 2;
                    duration += tempDuration;
                }
                
                await playTone(freq, duration, playState.mode);
            }
        }

      } else if (upperLine.startsWith('END')) {
          if (upperLine === 'END') {
              return { output: currentState.output, isWaitingForInput: false };
          }
          // Ignore END IF, END SUB, etc. if they appear unexpectedly, or handle above.
          // END IF handled above.

      } else if (upperLine.startsWith('DIM ')) {
           const dimStr = rawLine.substring(4).trim();
           // Regex to capture varName(size)
           const match = dimStr.match(/^([a-zA-Z_][\w]*[$%#&!]?)\s*\(\s*(\d+)\s*\)$/);
           if (!match) throw new Error("Sintaxis de DIM incorrecta. Ejemplo: DIM mi_array(10)");
   
           const varName = match[1];
           const size = parseInt(match[2], 10);
           if (size <= 0) throw new Error("El tamaño del arreglo debe ser mayor que cero.");
           
           // BASIC is often 1-indexed, so we create size+1 and ignore index 0.
           const isStringArray = varName.endsWith('$');
           const defaultValue = isStringArray ? "" : 0;
           currentState.variables[varName] = new Array(size + 1).fill(defaultValue);

      } else {
           throw new Error(`Comando desconocido: "${rawLine.split(' ')[0]}"`);
      }

    } catch (e: any) {
      return { output: currentState.output, error: `Línea ${currentState.currentLineIndex + 1}: ${e.message}` };
    }

    currentState.currentLineIndex++;
  }

  return { output: currentState.output, isWaitingForInput: false };
};