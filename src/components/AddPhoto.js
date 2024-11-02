import React from 'react';
import './AddPhoto.css';

const Button = ({ onClick, children, className }) => {
  return (
    <button className={`photo-button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;