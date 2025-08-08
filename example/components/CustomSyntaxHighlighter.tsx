import React from 'react';
import { Text, View } from 'react-native';

interface CustomSyntaxHighlighterProps {
  children: string;
  language?: string;
  fontSize?: number;
}

interface Token {
  type: string;
  value: string;
}

class Tokenizer {
  private keywords: Set<string>;
  private operators: Set<string>;
  private punctuation: Set<string>;

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

  tokenize(code: string): Token[] {
    const tokens: Token[] = [];
    let current = 0;

    while (current < code.length) {
      const char = code[current];

      if (/\s/.test(char)) {
        tokens.push({ type: 'whitespace', value: char });
        current++;
        continue;
      }

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

      if (/\d/.test(char)) {
        let value = '';
        while (current < code.length && /[\d.]/.test(code[current])) {
          value += code[current];
          current++;
        }
        tokens.push({ type: 'number', value });
        continue;
      }

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

      if (this.punctuation.has(char)) {
        tokens.push({ type: 'punctuation', value: char });
        current++;
        continue;
      }

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

      tokens.push({ type: 'unknown', value: char });
      current++;
    }

    return tokens;
  }
}

const tokenizer = new Tokenizer();

const getTokenStyle = (tokenType: string, fontSize: number) => {
  const baseStyle = {
    fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace',
    fontSize,
    lineHeight: fontSize * 1.4,
  };

  switch (tokenType) {
    case 'keyword':
      return { ...baseStyle, color: '#569cd6', fontWeight: 'bold' as const };
    case 'string':
      return { ...baseStyle, color: '#ce9178' };
    case 'number':
      return { ...baseStyle, color: '#b5cea8' };
    case 'comment':
      return { ...baseStyle, color: '#6a9955', fontStyle: 'italic' as const };
    case 'operator':
      return { ...baseStyle, color: '#d4d4d4' };
    case 'identifier':
      return { ...baseStyle, color: '#9cdcfe' };
    case 'punctuation':
      return { ...baseStyle, color: '#d4d4d4' };
    case 'whitespace':
      return { ...baseStyle, color: '#d4d4d4' };
    case 'unknown':
      return { ...baseStyle, color: '#f44747', backgroundColor: '#5a1d1d' };
    default:
      return { ...baseStyle, color: '#d4d4d4' };
  }
};

const CustomSyntaxHighlighter: React.FC<CustomSyntaxHighlighterProps> = ({
  children,
  fontSize = 12,
}) => {
  const tokens = tokenizer.tokenize(children);

  return (
    <View style={{
      backgroundColor: '#1e1e1e',
      padding: 0,
      margin: 0,
    }}>
      <Text style={{
        fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace',
        fontSize,
        lineHeight: fontSize * 1.4,
        color: '#d4d4d4',
        margin: 0,
      }}>
        {tokens.map((token, index) => (
          <Text key={index} style={getTokenStyle(token.type, fontSize)}>
            {token.value}
          </Text>
        ))}
      </Text>
    </View>
  );
};

export default CustomSyntaxHighlighter;