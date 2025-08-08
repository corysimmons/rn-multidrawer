class Tokenizer {
  constructor() {
    this.keywords = new Set([
      'const', 'let', 'var', 'function', 'class', 'if', 'else', 'for', 'while',
      'return', 'import', 'export', 'from', 'as', 'default', 'async', 'await',
      'try', 'catch', 'finally', 'throw', 'new', 'this', 'super', 'extends',
      'static', 'public', 'private', 'protected', 'interface', 'type', 'enum'
    ]);

    this.operators = new Set([
      '+', '-', '*', '/', '%', '=', '==', '===', '!=', '!==', '<', '>', '<=', '>=',
      '&&', '||', '!', '?', ':', '=>', '...', '++', '--', '+=', '-=', '*=', '/='
    ]);

    this.punctuation = new Set([
      '(', ')', '[', ']', '{', '}', ';', ',', '.', ':', '?', '!', '@', '#'
    ]);
  }

  tokenize(code) {
    const tokens = [];
    let current = 0;

    while (current < code.length) {
      let char = code[current];

      // Skip whitespace
      if (/\s/.test(char)) {
        tokens.push({ type: 'whitespace', value: char });
        current++;
        continue;
      }

      // Comments
      if (char === '/' && code[current + 1] === '/') {
        let value = '';
        while (current < code.length && code[current] !== '\n') {
          value += code[current];
          current++;
        }
        tokens.push({ type: 'comment', value });
        continue;
      }

      if (char === '/' && code[current + 1] === '*') {
        let value = '';
        while (current < code.length - 1) {
          value += code[current];
          if (code[current] === '*' && code[current + 1] === '/') {
            value += code[current + 1];
            current += 2;
            break;
          }
          current++;
        }
        tokens.push({ type: 'comment', value });
        continue;
      }

      // Strings
      if (char === '"' || char === "'" || char === '`') {
        const quote = char;
        let value = char;
        current++;
        
        while (current < code.length && code[current] !== quote) {
          if (code[current] === '\\') {
            value += code[current];
            current++;
            if (current < code.length) {
              value += code[current];
              current++;
            }
          } else {
            value += code[current];
            current++;
          }
        }
        
        if (current < code.length) {
          value += code[current];
          current++;
        }
        
        tokens.push({ type: 'string', value });
        continue;
      }

      // Numbers
      if (/\d/.test(char)) {
        let value = '';
        while (current < code.length && /[\d.]/.test(code[current])) {
          value += code[current];
          current++;
        }
        tokens.push({ type: 'number', value });
        continue;
      }

      // Operators (multi-character first)
      const twoChar = code.slice(current, current + 2);
      const threeChar = code.slice(current, current + 3);
      
      if (this.operators.has(threeChar)) {
        tokens.push({ type: 'operator', value: threeChar });
        current += 3;
        continue;
      }
      
      if (this.operators.has(twoChar)) {
        tokens.push({ type: 'operator', value: twoChar });
        current += 2;
        continue;
      }
      
      if (this.operators.has(char)) {
        tokens.push({ type: 'operator', value: char });
        current++;
        continue;
      }

      // Punctuation
      if (this.punctuation.has(char)) {
        tokens.push({ type: 'punctuation', value: char });
        current++;
        continue;
      }

      // Identifiers and keywords
      if (/[a-zA-Z_$]/.test(char)) {
        let value = '';
        while (current < code.length && /[a-zA-Z0-9_$]/.test(code[current])) {
          value += code[current];
          current++;
        }
        
        const type = this.keywords.has(value) ? 'keyword' : 'identifier';
        tokens.push({ type, value });
        continue;
      }

      // Fallback for any other character
      tokens.push({ type: 'unknown', value: char });
      current++;
    }

    return tokens;
  }
}

module.exports = Tokenizer;