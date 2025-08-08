const Tokenizer = require('./tokenizer');

class SyntaxHighlighter {
  constructor() {
    this.tokenizer = new Tokenizer();
  }

  highlight(code, options = {}) {
    const format = options.format || 'html';
    const tokens = this.tokenizer.tokenize(code);
    
    if (format === 'html') {
      return this.toHTML(tokens, options);
    } else if (format === 'console') {
      return this.toConsole(tokens);
    }
    
    return tokens;
  }

  toHTML(tokens, options = {}) {
    const className = options.className || 'syntax-highlight';
    let html = `<pre class="${className}"><code>`;
    
    for (const token of tokens) {
      const escapedValue = this.escapeHTML(token.value);
      html += `<span class="${token.type}">${escapedValue}</span>`;
    }
    
    html += '</code></pre>';
    return html;
  }

  toConsole(tokens) {
    const colors = {
      keyword: '\x1b[35m',    // Magenta
      string: '\x1b[32m',     // Green
      number: '\x1b[33m',     // Yellow
      comment: '\x1b[90m',    // Gray
      operator: '\x1b[36m',   // Cyan
      identifier: '\x1b[37m', // White
      punctuation: '\x1b[37m',// White
      whitespace: '\x1b[0m',  // Reset
      unknown: '\x1b[31m'     // Red
    };
    
    const reset = '\x1b[0m';
    let output = '';
    
    for (const token of tokens) {
      const color = colors[token.type] || colors.unknown;
      output += color + token.value + reset;
    }
    
    return output;
  }

  escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Method to generate CSS styles
  getDefaultCSS() {
    return `
.syntax-highlight {
  background-color: #1e1e1e;
  color: #d4d4d4;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.4;
  padding: 16px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 0;
}

.syntax-highlight code {
  display: block;
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
}

.keyword {
  color: #569cd6;
  font-weight: bold;
}

.string {
  color: #ce9178;
}

.number {
  color: #b5cea8;
}

.comment {
  color: #6a9955;
  font-style: italic;
}

.operator {
  color: #d4d4d4;
}

.identifier {
  color: #9cdcfe;
}

.punctuation {
  color: #d4d4d4;
}

.whitespace {
  color: inherit;
}

.unknown {
  color: #f44747;
  background-color: #5a1d1d;
}`;
  }
}

module.exports = SyntaxHighlighter;