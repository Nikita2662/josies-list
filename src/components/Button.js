import React from 'react';
import './Button.css';

const Button = ({ onClick, children, className, style}) => {
  return (
    <button 
      className={`photo-button ${className}`} 
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;

const BaseButton = ({ onClick, children, className, style }) => {
  return (
      <button 
          className={`base-button ${className}`} // Combine base and additional class
          onClick={onClick} 
          style={style} // Allow inline styles as well
      >
          {children}
      </button>
  );
};