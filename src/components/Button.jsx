import React from 'react';

export function Button({ children, className = '', variant = 'primary', ...props }) {
  const baseStyle = "w-full flex justify-center items-center py-2.5 px-4 rounded-md text-sm font-semibold focus:outline-none transition-colors duration-200 mt-2";
  
  const variants = {
    primary: "bg-[#013b82] text-white hover:bg-brand-dark shadow-sm",
    secondary: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 shadow-sm",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
