# React Native MultiDrawer Documentation

This directory contains the documentation website for React Native MultiDrawer built with Docusaurus.

## Development

To run the documentation locally:

```bash
# Install dependencies  
npm install

# Start development server
npm start
```

The site will be available at http://localhost:3000/react-native-multidrawer/

Alternatively, from the project root:

```bash
# Install dependencies
npm run docs:install

# Start development server
npm run docs:dev
```

## Building

To build the documentation for production:

```bash
# Build static site
npm run build

# Serve built site locally  
npm run serve
```

## Deployment

The documentation is automatically deployed to GitHub Pages when changes are pushed to the main branch via GitHub Actions.

You can also deploy manually:

```bash
# Deploy to GitHub Pages (requires GitHub CLI and proper permissions)
npm run deploy
```

## Structure

- `docs/` - Documentation content in Markdown
  - `api/` - API reference documentation
  - `guides/` - Usage guides and tutorials
  - `examples/` - Code examples and demos
- `src/` - Custom React components and pages
- `static/` - Static assets (images, files, etc.)
- `docusaurus.config.ts` - Docusaurus configuration
- `sidebars.ts` - Sidebar navigation configuration

## Writing Documentation

### Adding New Pages

1. Create a new `.md` file in the appropriate directory under `docs/`
2. Add frontmatter with `sidebar_position` if needed
3. Update `sidebars.ts` if creating a new section
4. Link to the new page from existing content

### Code Examples

Use language-specific code blocks:

````markdown
```tsx
import { DrawerProvider } from 'react-native-multidrawer';

export default function App() {
  return (
    <DrawerProvider>
      {/* Your content */}
    </DrawerProvider>
  );
}
```
````

## Configuration

Key configuration files:
- `docusaurus.config.ts` - Main site configuration  
- `sidebars.ts` - Navigation structure
- `src/css/custom.css` - Custom styling
