import React, { useState, useEffect } from "react";
import CommentBox from "./CommentBox";
import "./Comments.css";

const Comment = ({ productID, userID }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [comments, setComments] = useState([]);

  return (
    <div className="flexComment">
      <div>
        {" "}
        <h1 className="commentheader">Comments</h1>
      </div>

      <div>
        {" "}
        <CommentBox
          productId={productID}
          userId={userID}
          
          placeholder="Type your comment here..."
          className="text-box"
        />
      </div>
    </div>
  );
};

export default Comment;
