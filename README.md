# React Library Boilerplate

A lightweight, type-safe React component library boilerplate with TypeScript support.

## Features

- 🚀 TypeScript support
- 📦 Built with tsup for optimal bundle size
- 🧪 Jest and React Testing Library for testing
- 📚 Storybook for component documentation
- 🎨 CSS-in-JS support
- 📝 ESLint and TypeScript for code quality
- 🏷️ Type definitions included

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
# Start Storybook
npm run storybook

# Run tests
npm test

# Build the library
npm run build
```

### Usage

```tsx
import { Button } from 'react-library-boilerplate';

function App() {
  return (
    <Button variant="primary" size="large">
      Click me
    </Button>
  );
}
```

## Project Structure

```
src/
  ├── components/     # React components
  ├── index.tsx      # Main entry point
  └── types.ts       # Type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
