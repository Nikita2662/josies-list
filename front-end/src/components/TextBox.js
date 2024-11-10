import React, { useState } from 'react';
import "./TextBox.css";

const TextBox = ({ label, placeholder, className }) => {
    const [text, setText] = useState('');
    const [textareaheight, setTextareaheight] = useState(1);

    const handleChange = (event) => {
        setText(event.target.value); 
        
      const textarea=event.target;
      textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    };

    


    return (
        
    <div className={className}>
      {label && <label>{label}</label>} {/* Render label if provided */}
      <textarea
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        className="text-box"

        
      />

    </div>
    );
};

export default TextBox;