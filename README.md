# 🎨 Componex

[![npm version](https://badge.fury.io/js/componex.svg)](https://badge.fury.io/js/componex)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/min/componex)](https://bundlephobia.com/package/componex)

> A powerful, type-safe component styling library for React that combines the best of CSS-in-JS, utility-first CSS, and component composition.

## ✨ Features

- 🎯 **Type-Safe**: Full TypeScript support with excellent type inference
- 🎨 **Flexible Styling**: Seamless integration with Tailwind CSS and other utility-first frameworks
- 🔄 **Component Composition**: Create complex components through simple composition
- 🎭 **Variant Support**: Built-in support for component variants using class-variance-authority
- 🧩 **Polymorphic Components**: Render components as different HTML elements using the `as` prop
- 🚀 **Performance Optimized**: Minimal runtime overhead with smart prop handling
- 🎮 **Developer Experience**: Excellent IDE support with autocompletion

## 📦 Installation

```bash
# Using npm
npm install componex

# Using yarn
yarn add componex

# Using pnpm
pnpm add componex

# Using bun
bun add componex
```

## 🚀 Quick Start

```tsx
import componex from 'componex';

// Create a basic button component
const Button = componex('button', {
  className: 'base-button',
});

// Use the component
<Button>Click me</Button>
```

## 📚 Core Concepts

### Basic Component Creation

```tsx
const Button = componex('button', {
  className: 'px-4 py-2 rounded-md',
});
```

### Component Composition

```tsx
// Create a base button
const BaseButton = componex('button', {
  className: 'base-button',
});

// Create a primary button variant
const PrimaryButton = componex(BaseButton, {
  className: 'bg-blue-500 text-white',
});

// Create a secondary button variant
const SecondaryButton = componex(BaseButton, {
  className: 'bg-gray-500 text-white',
});
```

### Variant Support

```tsx
const Button = componex('button', {
  className: 'base-button',
  cva: {
    variants: {
      intent: {
        primary: 'bg-blue-500 text-white',
        secondary: 'bg-gray-500 text-white',
      },
      size: {
        small: 'text-sm px-2 py-1',
        large: 'text-lg px-4 py-2',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'small',
    },
  },
});

// Use with variants
<Button intent="primary" size="large">Click me</Button>
```

### Polymorphic Components

```tsx
const StyledComponent = componex('div', {
  className: 'styled-component',
});

// Render as different elements
<StyledComponent as="button">Click me</StyledComponent>
<StyledComponent as="a" href="#">Link</StyledComponent>
```

### Complex Components

```tsx
type ComplexProps = {
  data?: { id: number; name: string };
  onAction?: (id: number) => void;
  renderItem?: (item: { id: number; name: string }) => React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

const ComplexComponent = componex(({ data, onAction, renderItem, className, children }: ComplexProps) => {
  React.useEffect(() => {
    if (data && onAction) {
      onAction(data.id);
    }
  }, [data, onAction]);

  return (
    <div className={className}>
      {data && renderItem ? renderItem(data) : children}
    </div>
  );
}, {
  className: 'complex-component',
});
```

## 🎯 Advanced Usage

### Compound Variants

```tsx
const Button = componex('button', {
  cva: {
    variants: {
      intent: {
        primary: 'bg-blue-500',
        secondary: 'bg-gray-500',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: 'cursor-pointer',
      },
    },
    compoundVariants: [
      {
        intent: 'primary',
        disabled: true,
        className: 'bg-blue-300',
      },
    ],
  },
});
```

### Custom Component Integration

```tsx
const CustomComponent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const StyledCustom = componex(CustomComponent, {
  className: 'custom-base',
});
```

### Performance Optimization

```tsx
const Button = componex('button', {
  className: 'base-button',
});

const TestComponent = () => {
  const [count, setCount] = useState(0);
  
  return (
    <Button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </Button>
  );
};
```

## 🔧 API Reference

### `componex(component, options)`

Creates a styled component with the specified options.

#### Parameters

- `component`: The base component or HTML element to style
- `options`: Configuration object
  - `className`: Base class name(s)
  - `cva`: Class Variance Authority configuration
    - `variants`: Component variants
    - `defaultVariants`: Default variant values
    - `compoundVariants`: Compound variant configurations

#### Returns

A styled component with the following features:
- Type-safe props
- Variant support
- Polymorphic rendering
- Ref forwarding
- Prop forwarding

## 🎨 Styling Best Practices

1. **Use Semantic Class Names**
```tsx
const Button = componex('button', {
  className: 'button-base',
});
```

2. **Leverage Utility Classes**
```tsx
const Card = componex('div', {
  className: 'p-4 rounded-lg shadow-md',
});
```

3. **Create Reusable Variants**
```tsx
const Button = componex('button', {
  cva: {
    variants: {
      variant: {
        primary: 'bg-primary text-white',
        secondary: 'bg-secondary text-white',
      },
    },
  },
});
```

## 🧪 Testing

Componex components are fully testable using standard React testing libraries:

```tsx
import { render, screen } from '@testing-library/react';

test('renders button with correct styles', () => {
  const Button = componex('button', {
    className: 'test-button',
  });
  
  render(<Button>Click me</Button>);
  const button = screen.getByText('Click me');
  expect(button).toHaveClass('test-button');
});
```

## 📚 TypeScript Support

Componex provides excellent TypeScript support out of the box:

```tsx
// Type-safe variants
const Button = componex('button', {
  cva: {
    variants: {
      intent: {
        primary: 'bg-blue-500',
        secondary: 'bg-gray-500',
      },
    },
  },
} as const);

// TypeScript will enforce valid variant values
<Button intent="primary" /> // ✅ Valid
<Button intent="invalid" /> // ❌ Type error
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Your Name]

---

Made with ❤️ by [Your Name/Organization]
