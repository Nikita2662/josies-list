import React, { useState } from 'react';
import imgUrl from './emptyupload.png'; // Placeholder image if no file is selected

function UploadImage({w=200, h=200}) {
    // State to store the image URL (or placeholder initially)
    const [image, setImage] = useState(imgUrl);

    // Handler for file selection
    

    return (
        <div>
           
            <img src={image} alt="Uploaded" width={w} height={h}  style={{
                    borderRadius: '10px'
                
                }}
            onClick={() => document.getElementById('invoke').click() }
            />
  
            <input 
                type="file"
                id="invoke" 
                style={{ display: 'none' }} 
                onChange={(event) => {
        if (event.target.files[0]) {
            // Create a temporary URL for the selected file
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }} // Trigger openImg when the user selects a file
            />
        </div>
    );
}

export default UploadImage;
