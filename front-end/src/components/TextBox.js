import React, { useState } from "react";
import "./TextBox.css";

const TextBox = ({ label, placeholder, className, ...props }) => {
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className={className}>
      {label && <label>{label}</label>} {/* Render label if provided */}
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        className="text-box"
        {...props}
      />
    </div>
  );
};

export default TextBox;
