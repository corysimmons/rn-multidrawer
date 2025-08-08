# Custom Syntax Highlighter

A lightweight JavaScript syntax highlighter built from scratch with support for multiple output formats and themes.

## Features

- 🚀 Fast tokenization and highlighting
- 🎨 Dark and light theme support
- 📱 HTML and console output formats
- 🔧 Customizable styling
- 📝 Support for JavaScript/TypeScript syntax
- 💡 Easy to extend and modify

## Files

- `tokenizer.js` - Core tokenization engine
- `highlighter.js` - Main highlighting logic
- `styles.css` - CSS themes (dark/light)
- `demo.html` - Interactive web demo
- `demo.js` - Node.js console demo

## Usage

### Node.js
```javascript
const SyntaxHighlighter = require('./highlighter');
const highlighter = new SyntaxHighlighter();

// HTML output
const html = highlighter.highlight(code, { format: 'html' });

// Console output (with ANSI colors)
const console = highlighter.highlight(code, { format: 'console' });
```

### Browser
```html
<link rel="stylesheet" href="styles.css">
<script src="tokenizer.js"></script>
<script src="highlighter.js"></script>

<script>
const highlighter = new SyntaxHighlighter();
document.getElementById('output').innerHTML = highlighter.highlight(code);
</script>
```

## Demo

- Open `demo.html` in a browser for interactive demo
- Run `node demo.js` for console output example

## Supported Tokens

- Keywords (`const`, `let`, `function`, etc.)
- Strings (single, double, template literals)
- Numbers
- Comments (single-line `//` and multi-line `/* */`)
- Operators
- Punctuation
- Identifiers

## Customization

Modify `tokenizer.js` to add new keywords or token types. Update `styles.css` to customize colors and themes.