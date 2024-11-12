import React, { useState } from 'react';
import imgUrl from './emptyupload.png'; // Placeholder image if no file is selected

function UploadImage() {
    // State to store the image URL (or placeholder initially)
    const [image, setImage] = useState(imgUrl);

    // Handler for file selection
    const openImg = (event) => {
        const file = event.target.files[0];  // Get the selected file
        if (file) {
            // Create a temporary URL for the selected file
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <div>
            {/* Display selected image or placeholder */}
            <img src={image} alt="Uploaded" width={120} height={120} />
            
            {/* Input field for file selection */}
            <input 
                type="file" 
                onChange={openImg} // Trigger openImg when the user selects a file
            />
        </div>
    );
}

export default UploadImage;
