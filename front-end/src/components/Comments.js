import React, { useState, useEffect } from 'react';
import CommentBox from './CommentBox';
import "./Comments.css"

const Comment= ({ productId }) => {
  


    return(
    <div className='flexComment'>
   <div> <h1>Comment</h1></div>
    
        <div> <CommentBox  label="Author Name"
        placeholder="Type your comment here..."  className="text-box" /></div>


      
    </div>);
}

export default Comment;