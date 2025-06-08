import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import componex from './componex';
import React, { useState, useCallback } from 'react';

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
            test: {
              true: 'test-true',
              false: 'test-false',
            },
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
            test: true,
            intent: 'secondary',
            size: 'small',
          },
        },
      } as const);

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

      render(
        <Button 
          data-testid="test-button"
          onClick={() => {}}
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

      const ref = jest.fn();
      render(<Button ref={ref}>Click me</Button>);
      expect(ref).toHaveBeenCalled();
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

  describe('Advanced Type Handling', () => {
    it('should handle complex prop types correctly', () => {
      type ComplexProps = {
        data?: { id: number; name: string };
        onAction?: (id: number) => void;
        renderItem?: (item: { id: number; name: string }) => React.ReactNode;
        className?: string;
        children?: React.ReactNode;
      };

      const BaseComponent: React.FC<ComplexProps> = ({ data, onAction, renderItem, className, children }) => {
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
      };

      const ComplexComponent = componex(BaseComponent, {
        className: 'complex-component',
      });

      const mockOnAction = jest.fn();
      const mockRenderItem = jest.fn((item) => <span>{item.name}</span>);

      render(
        <ComplexComponent
          data={{ id: 1, name: 'Test' }}
          onAction={mockOnAction}
          renderItem={mockRenderItem}
        >
          Content
        </ComplexComponent>,
      );

      expect(mockOnAction).toHaveBeenCalledWith(1);
      expect(mockRenderItem).toHaveBeenCalledWith({ id: 1, name: 'Test' });
    });

    it('should handle generic component types', () => {
      type GenericProps = {
        value: string;
        className?: string;
      };

      const GenericComponent = (props: GenericProps) => (
        <div className={props.className}>{props.value}</div>
      );

      const StyledGeneric = componex(GenericComponent, {
        className: 'generic-styled',
      });

      render(<StyledGeneric value="test" />);
      expect(screen.getByText('test')).toHaveClass('generic-styled');
    });
  });

  describe('Error Handling and Validation', () => {
    it('should handle invalid variant values gracefully', () => {
      const Button = componex('button', {
        cva: {
          variants: {
            intent: {
              primary: 'bg-blue-500',
              secondary: 'bg-gray-500',
            },
          },
        },
      });

      // @ts-expect-error - Testing invalid variant
      render(<Button intent="invalid">Click me</Button>);
      const button = screen.getByText('Click me');
      expect(button).toBeInTheDocument();
    });

    it('should handle null or undefined props safely', () => {
      const Component = componex('div', {
        className: 'base-class',
      });

      render(<Component className={undefined}>Content</Component>);
      expect(screen.getByText('Content')).toHaveClass('base-class');
    });
  });

  describe('Component Composition', () => {
    it('should compose multiple styled components correctly', () => {
      const Base = componex('div', { className: 'base' });
      const Middle = componex(Base, { className: 'middle' });
      const Top = componex(Middle, { className: 'top' });

      render(<Top>Content</Top>);
      const element = screen.getByText('Content');
      expect(element).toHaveClass('base', 'middle', 'top');
    });

    it('should handle nested component variants', () => {
      const Base = componex('div', {
        cva: {
          variants: {
            theme: {
              light: 'bg-white',
              dark: 'bg-black',
            },
          },
        },
      });

      const Extended = componex(Base, {
        cva: {
          variants: {
            size: {
              small: 'text-sm',
              large: 'text-lg',
            },
          },
        },
      });

      render(<Extended theme="dark" size="large">Content</Extended>);
      const element = screen.getByText('Content');
      expect(element).toHaveClass('bg-black', 'text-lg');
    });
  });

  describe('Performance and Memoization', () => {
    it('should not re-render unnecessarily', () => {
      const renderCount = jest.fn();
      
      const Button = componex('button', {
        className: 'base-button',
      });

      const TestComponent = () => {
        const [count, setCount] = useState(0);
        renderCount();

        return (
          <div>
            <Button onClick={() => setCount((c) => c + 1)}>
              Count: {count}
            </Button>
          </div>
        );
      };

      render(<TestComponent />);
      fireEvent.click(screen.getByText(/Count: 0/));
      
      expect(renderCount).toHaveBeenCalledTimes(2); // Initial render + one update
    });

    it('should handle callback props efficiently', () => {
      const callback = jest.fn();
      const Button = componex('button', {
        className: 'base-button',
      });

      const TestComponent = () => {
        const memoizedCallback = useCallback(callback, []);
        return <Button onClick={memoizedCallback}>Click me</Button>;
      };

      render(<TestComponent />);
      fireEvent.click(screen.getByText('Click me'));
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('should preserve ARIA attributes', () => {
      const Button = componex('button', {
        className: 'base-button',
        'aria-label': 'Base Button',
      });

      render(
        <Button
          aria-label="Custom Button"
          aria-describedby="description"
          role="menuitem"
        >
          Click me
        </Button>,
      );

      const button = screen.getByText('Click me');
      expect(button).toHaveAttribute('aria-label', 'Custom Button');
      expect(button).toHaveAttribute('aria-describedby', 'description');
      expect(button).toHaveAttribute('role', 'menuitem');
    });

    it('should handle focus management', () => {
      const Button = componex('button', {
        className: 'base-button',
      });

      render(<Button tabIndex={0}>Click me</Button>);
      const button = screen.getByText('Click me');
      button.focus();
      expect(button).toHaveFocus();
    });
  });

  describe('Integration with React Features', () => {
    it('should work with React.memo', () => {
      type MemoProps = {
        children: React.ReactNode;
        className?: string;
      };

      const MemoizedComponent = React.memo(({ children, className }: MemoProps) => (
        <div className={className}>{children}</div>
      ));

      const StyledMemo = componex(MemoizedComponent, {
        className: 'memo-styled',
      });

      render(<StyledMemo>Memo Content</StyledMemo>);
      expect(screen.getByText('Memo Content')).toHaveClass('memo-styled');
    });

    it('should handle context consumers', () => {
      const TestContext = React.createContext('default');
      
      type ConsumerProps = {
        className?: string;
      };

      const ContextConsumer = ({ className }: ConsumerProps) => {
        const value = React.useContext(TestContext);
        return <div className={className}>{value}</div>;
      };

      const StyledConsumer = componex(ContextConsumer, {
        className: 'context-styled',
      });

      render(
        <TestContext.Provider value="test value">
          <StyledConsumer />
        </TestContext.Provider>,
      );

      expect(screen.getByText('test value')).toHaveClass('context-styled');
    });
  });
});
