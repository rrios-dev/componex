import React from 'react';

export interface ButtonProps {
  /**
   * Button contents
   */
  children: React.ReactNode;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary';
  /**
   * Button size
   */
  size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
}) => {
  return (
    <button
      onClick={onClick}
      className={`button button--${variant} button--${size}`}
    >
      {children}
    </button>
  );
};

export default Button;
