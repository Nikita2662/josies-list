import React, { useState } from "react";
import "../screens/Sell.css";

const SubmissionBox = ({ label, placeholder, className, onTextSubmit }) => {
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    if (onTextSubmit) {
      onTextSubmit(event.target.value);
    }
  };

  return (
    <div>
      {label && <label>{label}</label>} {/* Render label if provided */}
      <textarea
        className={className}
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <div></div>
    </div>
  );
};

export default SubmissionBox;
