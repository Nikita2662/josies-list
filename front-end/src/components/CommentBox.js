import React, { useState, useEffect } from 'react';
import "./CommentBox.css";

const CommentBox = ({ productId, label, placeholder, className = "text-box", isBidding, userEmail }) => {
    const [authorName, setAuthorName] = useState('User Wrote');
    const [isPressed, setIsPressed] = useState(false);
    const [text, setText] = useState('');
    const [comments, setComments] = useState([]); 
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);  // Set loading to true initially

    // Handle Enter key press
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setIsPressed(true);
            if (text.trim() !== '') {
                setComments([...comments, { authorName, text }]);
                setText('');
            }
        }
    };

    // Handle textarea changes (auto-resizing)
    const handleChange = (event) => {
        setText(event.target.value);
        const textarea = event.target;
        textarea.style.height = 'auto'; // Reset height to auto to calculate scrollHeight
        textarea.style.height = `${textarea.scrollHeight}px`; // Adjust the height based on content
    };

    // Fetch comments for the product
    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://localhost:5038/comments/all/${productId}`);
            if (!response.ok) {
                setError('Product not found');
                setLoading(false); // Stop loading if there's an error
                return;
            }

            const data = await response.json();
            setComments(data);  // Directly set fetched data into comments state
            setLoading(false);   // Stop loading when data is fetched
        } catch (error) {
            setError('Failed to fetch comments');
            setLoading(false); // Stop loading if there was an error
        }
    };

    // Fetch comments when the component mounts or productId changes
    useEffect(() => {
        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    // If loading, show a loading message
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>; 

    return (
        <div>
            <div className={className}>
                {label && <label>{label}</label>}
                <textarea
                    value={text}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className={className}
                />
            </div>

            <div>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className={className}>
                            <strong>{comment.user}:</strong> <br />
                            {comment.content}
                        </div>
                    ))
                ) : (
                    <div>No comments yet.</div>
                )}
            </div>
        </div>
    );
};

export default CommentBox;
