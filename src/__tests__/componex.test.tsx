import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import componex from '../componex';

describe('Componex Library', () => {
  describe('Basic Component Styling', () => {
    it('should create a styled component with base className', () => {
      const Button = componex('button', {
        className: 'base-button',
      });
      
      render(<Button>Click me</Button>);
      const button = screen.getByText('Click me');
      expect(button).toHaveClass('base-button');
    });

    it('should merge base classNames from parent component', () => {
      const BaseButton = componex('button', {
        className: 'base-button',
      });

      const PrimaryButton = componex(BaseButton, {
        className: 'primary-button',
      });

      render(<PrimaryButton>Click me</PrimaryButton>);
      const button = screen.getByText('Click me');
      expect(button).toHaveClass('base-button', 'primary-button');
    });
  });

  describe('CVA Integration', () => {
    it('should apply variant styles using CVA', () => {
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

      render(<Button intent="secondary" size="large">Click me</Button>);
      const button = screen.getByText('Click me');
      expect(button).toHaveClass('bg-gray-500', 'text-lg', 'px-4', 'py-2');
    });

    it('should handle multiple variants correctly', () => {
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

      render(<Button intent="primary" disabled>Click me</Button>);
      const button = screen.getByText('Click me');
      expect(button).toHaveClass('bg-blue-300', 'opacity-50', 'cursor-not-allowed');
    });
  });

  describe('Component Polymorphism', () => {
    it('should render as different HTML elements using "as" prop', () => {
      const StyledComponent = componex('div', {
        className: 'styled-component',
      });

      render(<StyledComponent as="button">Click me</StyledComponent>);
      const element = screen.getByText('Click me');
      expect(element.tagName.toLowerCase()).toBe('button');
      expect(element).toHaveClass('styled-component');
    });

    it('should maintain styles when changing element type', () => {
      const StyledComponent = componex('div', {
        className: 'base-styles',
        cva: {
          variants: {
            variant: {
              primary: 'bg-blue-500',
              secondary: 'bg-gray-500',
            },
          },
        },
      });

      render(<StyledComponent as="span" variant="primary">Content</StyledComponent>);
      const element = screen.getByText('Content');
      expect(element.tagName.toLowerCase()).toBe('span');
      expect(element).toHaveClass('base-styles', 'bg-blue-500');
    });
  });

  describe('Props Handling', () => {
    it('should forward all props to the underlying component', () => {
      const Button = componex('button', {
        className: 'base-button',
      });

      const handleClick = () => {};

      render(
        <Button 
          data-testid="test-button"
          onClick={handleClick}
          disabled
          aria-label="Test Button"
        >
          Click me
        </Button>,
      );

      const button = screen.getByTestId('test-button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-label', 'Test Button');
    });

    it('should merge default props with passed props', () => {
      const Button = componex('button', {
        className: 'base-button',
        type: 'submit',
      });

      render(<Button className="custom-class">Click me</Button>);
      const button = screen.getByText('Click me');
      expect(button).toHaveClass('base-button', 'custom-class');
      expect(button).toHaveAttribute('type', 'submit');
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward refs correctly', () => {
      const Button = componex('button', {
        className: 'base-button',
      });

      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Click me</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty className gracefully', () => {
      const Button = componex('button');
      render(<Button>Click me</Button>);
      const button = screen.getByText('Click me');
      expect(button).toBeInTheDocument();
    });

    it('should handle undefined variants gracefully', () => {
      const Button = componex('button', {
        cva: {
          variants: {
            intent: {
              primary: 'bg-blue-500',
            },
          },
        },
      });

      render(<Button>Click me</Button>);
      const button = screen.getByText('Click me');
      expect(button).toBeInTheDocument();
    });

    it('should handle custom components correctly', () => {
      const CustomComponent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
        <div className={className}>{children}</div>
      );

      const StyledCustom = componex(CustomComponent, {
        className: 'custom-base',
      });

      render(<StyledCustom>Custom Content</StyledCustom>);
      const element = screen.getByText('Custom Content');
      expect(element).toHaveClass('custom-base');
    });
  });
}); 