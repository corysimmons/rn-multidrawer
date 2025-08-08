const SyntaxHighlighter = require('./highlighter');

const highlighter = new SyntaxHighlighter();

const sampleCode = `const greeting = "Hello, World!";
function sayHello(name) {
    // This function returns a greeting
    return \`\${greeting} My name is \${name}\`;
}

class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.isActive = true;
    }
    
    async save() {
        try {
            await database.save(this);
        } catch (error) {
            throw new Error('Failed to save user');
        }
    }
}

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);

export default User;`;

console.log('=== Console Output ===');
console.log(highlighter.highlight(sampleCode, { format: 'console' }));

console.log('\n\n=== HTML Output ===');
console.log(highlighter.highlight(sampleCode, { format: 'html' }));

console.log('\n\n=== Default CSS ===');
console.log(highlighter.getDefaultCSS());