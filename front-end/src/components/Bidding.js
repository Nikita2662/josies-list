import React, { useState } from 'react';
import "./CommentBox.css";

const BiddingBox = ({ label, placeholder, className="text-box" , isBidding, userEmail}) => {

    const [authorName, setAuthorName] = useState('Submit Your Offer?');
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
                const existingComment = comments.findIndex(comment=>comment.text);

                if (existingComment !== -1) {
                    const updatedComments = [...comments];
                    updatedComments[existingComment].text = text;
                    
                    setComments(updatedComments);
                } else {
                    setComments([...comments, { authorName, text }]);
                }

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
        className={className}
      />
    </div>

    <div>
   
  {comments.map((comment, index) => (
   
     <button className={className}
      >
      {comment.authorName}:<br /> ${comment.text}
    </button>
    
  ))}
 
</div>

</div>

    );
};

export default BiddingBox;