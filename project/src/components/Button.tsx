import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',
  className,
  ...props 
}) => {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-lg font-medium transition-all duration-200',
        {
          'bg-gradient-to-r from-orange-500 to-violet-500 hover:opacity-90 text-white': variant === 'primary',
          'bg-gray-200 hover:bg-gray-300 text-gray-800': variant === 'secondary',
          'bg-red-600 hover:bg-red-700 text-white': variant === 'danger',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};