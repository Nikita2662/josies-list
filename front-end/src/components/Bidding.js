import React, { useState } from 'react';
import "./Comments.css";
import { UserContext } from "../App.js";
import { useLocation, Navigate } from "react-router-dom";

const BiddingBox = ({ label, placeholder, className="text-box-comment" , isBidding, userEmail}) => {

    const [authorName, setAuthorName] = useState('Submit Your Offer?');
    const [commentText, setCommentText] = useState('');
    const [isPressed, setIsPressed] = useState(false);
    const [text, setText] = useState('');
    const [textareaheight, setTextareaheight] = useState(1);
    const [comments, setComments] = useState([]);

    const { user } = React.useContext(UserContext);

    if (!user) {
      return <Navigate to="/sign-in" />;
    }

    const handleKeyDown = (e) => {
      
        if (e.key === 'Enter') {
            e.preventDefault(); 
            setIsPressed(true);
            if (text.trim() !== '') {  // Make sure the comment isn't empty

                const existingComment = comments.findIndex(comment=>comment.text);

                if (existingComment !== -1) {
                    const updatedComments = [...comments];
                    if (Number(text)>=0){
                    updatedComments[existingComment].text = text;
                    } else{
                      alert("Please add a valid number");
                    }
                    
                    setComments(updatedComments);
                  
                } else {
                  if (Number(text)>=0){
                    setComments([...comments, { authorName, text }]);
                  }else{
                    alert("Please add a valid number");
                  }
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


    async function createBid() {
      if (text.trim()) {
        try {
          const url = `http://localhost:5038/products/${isBidding}/bid`;
          const headers = { "Content-Type": "application/json" };
          if (Number(comments[0].text)>=0 && userEmail !== user._id){
          const body = JSON.stringify({
            bid: Number(comments[0].text),
            bidder_email: user._id
          });
          
          console.log("user email", userEmail);

          const response = await fetch(url, { method: "PUT", headers, body });
         
          const result = await response.json();
       

          if (!response.ok) {
          alert(result.message);
        
          }
  
        }
        else{
          alert("You seem to be original creator, or the email for this product is undefined");
         
        }

         
        } catch (err) {
          alert("Failed to submit bid", err);
          
        }
      }
    }



    return (
      <div >
    <div className="text-box-comment">
      {label && <label>{label}</label>} {/* Render label if provided */}
      <textarea 
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}  
        placeholder={placeholder}
        style={{ color: "#ff1f58" }}
      />
    </div>

    <div>
   
  {comments.map((comment, index) => (
   
     <button className={className}
      onClick={createBid}>
      {comment.authorName}:<br /> ${comment.text}
    </button>
    
  ))}
 
</div>

</div>

    );
};

export default BiddingBox;
