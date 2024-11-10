import React, { useState } from 'react';
import "./TextBox.css";

const TextBox = ({ label, placeholder, className}) => {

    const [authorName, setAuthorName] = useState('User Wrote');
    const [commentText, setCommentText] = useState('');
    const [isPressed, setIsPressed] = useState(false);
    const [text, setText] = useState('');
    const [textareaheight, setTextareaheight] = useState(1);
    const [comments, setComments] = useState([]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            setIsPressed(true);
            if (text.trim() !== '') {  // Make sure the comment isn't empty
                setComments([...comments, { authorName, text }]);  // Append to comments array
                setText('');  // Clear the text input field after submission

              }

        }
    }

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
        onKeyDown={handleKeyDown}  
        placeholder={placeholder}
        className="text-box"
      />
    </div>

    <div>
   
  {comments.map((comment, index) => (
   
     <button className="text-button"
      >
      {comment.authorName}:<br /> {comment.text}
    </button>
    
  ))}
 
</div>

</div>

    );
};

export default TextBox;