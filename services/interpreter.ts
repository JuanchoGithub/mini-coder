import { ExecutionResult } from '../types';

// MiniQB Interpreter Engine
// A line-by-line interpreter inspired by Microsoft QuickBASIC 4.5

type Variables = Record<string, any>;

type BlockType = 'IF' | 'DO' | 'FOR';

interface Block {
  type: BlockType;
  line: number; // Start line of the block
  meta?: any;   // Extra info (e.g., FOR loop variable, end value, step)
}

interface InterpreterState {
  variables: Variables;
  output: string[];
  waitingForInput: boolean;
  inputTargetVariable: string | null;
  currentLineIndex: number;
  blockStack: Block[];
  operationsCount: number;
}

let currentState: InterpreterState = {
  variables: {},
  output: [],
  waitingForInput: false,
  inputTargetVariable: null,
  currentLineIndex: 0,
  blockStack: [],
  operationsCount: 0,
};

export const KEYWORDS = [
    'PRINT', 'INPUT', 'LET', 'DIM', 'IF', 'THEN', 'ELSE', 'ELSEIF', 'END', 'FOR', 'TO', 'STEP', 'NEXT', 'DO', 'WHILE', 'UNTIL', 'LOOP', 'REM', 'CLS', 'RND'
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
  'RND': 'Genera un número aleatorio. Ejemplo: dado = RND(6) te da un número del 1 al 6.'
};

const resetState = () => {
  currentState = {
    variables: {},
    output: [],
    waitingForInput: false,
    inputTargetVariable: null,
    currentLineIndex: 0,
    blockStack: [],
    operationsCount: 0
  };
};

// Helper to escape regex characters in variable names (like $)
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
}

// Core expression evaluator that handles QB operators and variables
const evaluateExpression = (expr: string, vars: Variables): any => {
    let evalStr = expr.trim();
    if (evalStr === '') return '';

    // 0. Handle RND() function first before variable substitution
    evalStr = evalStr.replace(/\bRND\s*\(\s*([^)]+)\s*\)/gi, (match, p1) => {
        const max = parseInt(evaluateExpression(p1, vars));
        // FIX: The callback for String.prototype.replace must return a string.
        if (isNaN(max) || max <= 0) return '1';
        return String(Math.floor(Math.random() * max) + 1);
    });

    // 1. Protect string literals temporarily
    const stringLiterals: string[] = [];
    evalStr = evalStr.replace(/"([^"]*)"/g, (match, p1) => {
        stringLiterals.push(p1);
        return `__STR_${stringLiterals.length - 1}__`;
    });

    // 2. Substitute variables
    // Sort keys by length desc to avoid partial matches (e.g., replacing 'a' in 'apple')
    const varNames = Object.keys(vars).sort((a, b) => b.length - a.length);
    for (const varName of varNames) {
        const val = vars[varName];
        let safeVal;
        if (typeof val === 'string') {
             safeVal = `"${val.replace(/"/g, '\\"')}"`;
        } else {
             safeVal = val;
        }
        
        // More precise variable replacement to avoid replacing substrings in keywords or other vars incorrectly
        // if it has a special suffix, we might not get word boundaries standardly, so we handle it.
        if (/[\$%\!#]$/.test(varName)) {
             const regexSigil = new RegExp(escapeRegExp(varName), 'gi');
             evalStr = evalStr.replace(regexSigil, String(safeVal));
        } else {
             const regex = new RegExp(`\\b${escapeRegExp(varName)}\\b`, 'gi');
             evalStr = evalStr.replace(regex, String(safeVal));
        }
    }

    // 3. Restore string literals
    evalStr = evalStr.replace(/__STR_(\d+)__/g, (match, p1) => {
        return `"${stringLiterals[parseInt(p1)].replace(/"/g, '\\"')}"`;
    });

    // 4. Transpile QB operators to JS operators
    // IMPORTANT: Order matters to avoid breaking <= >= into < ===
    evalStr = evalStr.replace(/<>/g, '!==')
                     .replace(/<=/g, '__LTE__')
                     .replace(/>=/g, '__GTE__')
                     // Replace single = with === for comparison (assignment is handled before this func in LET)
                     .replace(/=/g, '===') 
                     .replace(/__LTE__/g, '<=')
                     .replace(/__GTE__/g, '>=')
                     .replace(/\bAND\b/gi, '&&')
                     .replace(/\bOR\b/gi, '||')
                     .replace(/\bNOT\b/gi, '!')
                     .replace(/\bMOD\b/gi, '%');

    try {
        // Very dangerous in real apps, acceptable for this constrained sandbox educational tool.
        // eslint-disable-next-line no-new-func
        const result = Function(`"use strict"; return (${evalStr})`)();
        
        // QB behavior: True is often -1, False is 0.
        // For simplicity in teaching, we'll map JS true/false to 1/0 as per lessons.
        if (typeof result === 'boolean') {
            return result ? 1 : 0;
        }
        return result;
    } catch (e) {
        // If eval fails, it might be a bare string without quotes that the user intended to print.
        // In a real BASIC this might be an error, but here we can be forgiving or just return raw.
        return expr; 
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

export const executeCode = (code: string, inputVal?: string): ExecutionResult => {
  if (!currentState.waitingForInput) {
    resetState();
  } else if (inputVal !== undefined && currentState.inputTargetVariable) {
    // Handle Input
    let val: any = inputVal;
    // If standard numeric variable, try to cast
    if (!currentState.inputTargetVariable.endsWith('$') && !isNaN(Number(inputVal)) && inputVal.trim() !== '') {
        val = Number(inputVal);
    }
    currentState.variables[currentState.inputTargetVariable] = val;
    currentState.waitingForInput = false;
    currentState.inputTargetVariable = null;
    currentState.currentLineIndex++;
  }

  const lines = code.split('\n');
  const MAX_OPERATIONS = 100000; // Increased safety limit

  while (currentState.currentLineIndex < lines.length) {
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
             currentState.output.push("");
        } else {
             // Handle simple ";" or "," for formatting if we wanted (ignoring for basic V1)
             const val = evaluateExpression(expr, currentState.variables);
             currentState.output.push(String(val));
        }

      // --- INPUT ---
      } else if (upperLine.startsWith('INPUT ')) {
        // FORMATS: INPUT var   OR   INPUT "Prompt", var   OR   INPUT "Prompt"; var
        let varName = '';
        let prompt = '';
        
        const firstQuote = rawLine.indexOf('"');
        const lastQuote = rawLine.lastIndexOf('"');
        
        if (firstQuote > -1 && lastQuote > firstQuote) {
             prompt = rawLine.substring(firstQuote + 1, lastQuote);
             // Find variable after the prompt
             const rest = rawLine.substring(lastQuote + 1).trim();
             // remove potential ; or , separators
             varName = rest.replace(/^[;,]\s*/, '').trim();
             currentState.output.push(prompt); // Print prompt immediately
        } else {
             varName = rawLine.substring(6).trim();
             currentState.output.push("? "); // Standard QB generic prompt
        }

        currentState.waitingForInput = true;
        currentState.inputTargetVariable = varName;
        return { output: currentState.output, isWaitingForInput: true, inputVariableName: varName };

      // --- LET (assignment) or Implicit Assignment ---
      } else if (upperLine.startsWith('LET ') || (rawLine.includes('=') && !upperLine.startsWith('IF ') && !upperLine.startsWith('FOR ') && !upperLine.startsWith('DO '))) {
          let assignStr = rawLine;
          if (upperLine.startsWith('LET ')) {
              assignStr = rawLine.substring(4).trim();
          }
          const equalPos = assignStr.indexOf('=');
          if (equalPos === -1) throw new Error("Asignación inválida");
          
          const varName = assignStr.substring(0, equalPos).trim();
          const expr = assignStr.substring(equalPos + 1).trim();
          
          currentState.variables[varName] = evaluateExpression(expr, currentState.variables);

      // --- IF ... THEN ... ---
      } else if (upperLine.startsWith('IF ')) {
          const thenIndex = upperLine.indexOf(' THEN');
          if (thenIndex === -1) throw new Error("Se esperaba THEN");
          
          const conditionStr = rawLine.substring(3, thenIndex).trim();
          const condition = evaluateCondition(conditionStr, currentState.variables);
          
          if (condition) {
              currentState.blockStack.push({ type: 'IF', line: i });
              // Continue to next line
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
                       currentState.blockStack.push({ type: 'IF', line: jumpTo }); // Treat as new IF block
                       currentState.currentLineIndex = jumpTo;
                       break; 
                   } else {
                       jumpTo = findElseOrEndIf(lines, jumpTo);
                   }
              }

              currentState.currentLineIndex = jumpTo;
               // If we landed on ELSE, we need to enter it
              if (lines[jumpTo]?.trim().toUpperCase() === 'ELSE') {
                  currentState.blockStack.push({ type: 'IF', line: i });
              }
              // If we broke out of the while loop because we found a true ELSEIF, we want to execute the line AFTER it.
              // But if we exited because we hit an ELSE or END IF, we want to execute the line AFTER that.
              // The logic is tricky. Let's adjust. If we break, we've already set the line index. The main loop will increment it.
              if (lines[jumpTo]?.trim().toUpperCase().startsWith('ELSEIF')) {
                  // We broke from the loop, meaning we found a true one.
                  // The line index is set to the ELSEIF. The main loop will increment it, and we'll start executing its body.
                  // This is correct.
              } else {
                  // We finished the chain, landing on an ELSE or END IF.
                  // The line index is set to that line. The main loop will increment it.
                  // This is also correct.
              }
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
          const conditionStr = rawLine.substring(9).trim();
          const condition = evaluateCondition(conditionStr, currentState.variables);
          
          if (condition) {
              currentState.blockStack.push({ type: 'DO', line: i, meta: conditionStr });
          } else {
              const loopEnd = findMatchingEnd(lines, i, 'DO');
              currentState.currentLineIndex = loopEnd;
              continue;
          }

      // --- LOOP ---
      } else if (upperLine === 'LOOP') {
          const block = currentState.blockStack[currentState.blockStack.length - 1];
          if (block && block.type === 'DO') {
              // Re-evaluate condition
               const condition = evaluateCondition(block.meta, currentState.variables);
               if (condition) {
                   currentState.currentLineIndex = block.line; // Jump back to DO
                   // We don't increment at the bottom of the loop
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

      } else if (upperLine.startsWith('END')) {
          if (upperLine === 'END') {
              return { output: currentState.output, isWaitingForInput: false };
          }
          // Ignore END IF, END SUB, etc. if they appear unexpectedly, or handle above.
          // END IF handled above.

      } else if (upperLine.startsWith('DIM ')) {
           // Ignore DIM for now in this simple interpreter, variables are auto-created.
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