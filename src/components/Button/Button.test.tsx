import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await userEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant class correctly', () => {
    render(<Button variant="secondary">Click me</Button>);
    expect(screen.getByText('Click me')).toHaveClass('button--secondary');
  });

  it('applies size class correctly', () => {
    render(<Button size="large">Click me</Button>);
    expect(screen.getByText('Click me')).toHaveClass('button--large');
  });
});
