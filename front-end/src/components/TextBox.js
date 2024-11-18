import React, { useState } from 'react';
import "./TextBox.css";

const TextBox = ({ label, placeholder, className}) => {

    const [authorName, setAuthorName] = useState('User Wrote');
    const [commentText, setCommentText] = useState('');
    const [isPressed, setIsPressed] = useState(false);
    const [text, setText] = useState('');
    const [textareaheight, setTextareaheight] = useState(1);
    const [comments, setComments] = useState([]);

  

    const handleChange = (event) => {
        setText(event.target.value); 
      const textarea=event.target;
      textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    


    };


    return (
      <div >
    <div className={className}>
      {label && <label>{label}</label>} {/* Render label if provided */}
      <textarea
        value={text}
        onChange={handleChange}
        
        placeholder={placeholder}
        className="text-box"
      />
    </div>

    <div>
   
 
 
</div>

</div>

    );
};

export default TextBox;