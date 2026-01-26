import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "flex items-center justify-center font-bold rounded-2xl transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-opacity-50";
  
  const variants = {
    primary: "bg-[#B0C4DE] text-[#252836] hover:bg-[#9BB4D2] focus:ring-[#B0C4DE]",
    secondary: "bg-[#2E3244] text-[#FDF5E6] border-2 border-[#B0C4DE] hover:bg-[#3A3F55] focus:ring-[#2E3244]",
    success: "bg-[#9CAF88] text-white hover:bg-[#8B9F78] focus:ring-[#9CAF88]",
    ghost: "bg-transparent text-[#B0C4DE] hover:bg-[#2E3244] hover:text-white"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-xl",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
