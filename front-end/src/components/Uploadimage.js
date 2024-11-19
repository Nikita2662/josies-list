import React, { useState } from 'react';
import imgUrl from './emptyupload.png'; // Placeholder image if no file is selected

function UploadImage({w, h}) {
    // State to store the image URL (or placeholder initially)
    const [image, setImage] = useState(imgUrl);
    const [imageDimensions, setImageDimensions] = useState({ width: w, height: h });

  const handleImageLoad = (event) => {
    const imgElement = event.target;
    const naturalWidth = imgElement.naturalWidth;
    const naturalHeight = imgElement.naturalHeight;

    // Check if the image is smaller than or equal to the provided width and height
    if (naturalWidth <= w && naturalHeight <= h) {
      setImageDimensions({ width: naturalWidth, height: naturalHeight });
    } else {
      setImageDimensions({ width: w, height: h });
    }
  };
    

    return (
        <div>
           
            <img src={image} alt="Uploaded" width={imageDimensions.width}
        height={imageDimensions.height}
         style={{
                    borderRadius: '10px',
                    marginBottom: '200px',
                    objectFit: 'cover'
                    
                
                }}
            onClick={() => document.getElementById('invoke').click() }
            />
  
            <input 
                type="file"
                id="invoke" 
                style={{ display: 'none' }} 
                onChange={(event) => {
        if (event.target.files[0]) {
          
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }} // Trigger openImg when the user selects a file
            />
        </div>
    );
}

export default UploadImage;
