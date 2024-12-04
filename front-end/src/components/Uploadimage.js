import React, { useState } from "react";
import imgUrl from "./emptyupload.png"; // Placeholder image if no file is selected
import "../screens/Sell.css";
import imageCompression from 'browser-image-compression';

function UploadImage({ w, h, c = "photo-button", m = 30, onImageChange }) {
  // State to store the image URL (or placeholder initially)
  const [image, setImage] = useState(imgUrl);
  const [imageDimensions, setImageDimensions] = useState({
    width: w,
    height: h,
  });

  const handleImageLoad = (event) => {
    const imgElement = image;
    const naturalWidth = imgElement.naturalWidth;
    const naturalHeight = imgElement.naturalHeight;

    // Check if the image is smaller than or equal to the provided width and height
    if (naturalWidth <= w && naturalHeight <= h) {
      setImageDimensions({ width: naturalWidth, height: naturalHeight });
    } else {
      setImageDimensions({ width: w, height: h });
    }
  };

  async function handleImageSelect(event) {
    const file = event.target.files[0];
    if (file) {
      // Image compression options
    const options = {
      maxSizeMB: 0.08,
      maxWidthOrHeight: 400,
      useWebWorker: true,
    }
    //Compress an image using imageCompression
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        onImageChange(e.target.result);
      };
      reader.readAsDataURL(compressedFile);
    }
  }

  return (
    <div>
      <img
        src={image}
        alt="Uploaded"
        width={imageDimensions.width}
        className={c}
        height={imageDimensions.height}
        style={{
          borderRadius: "10px",
          marginBottom: m,
          objectFit: "cover",
        }}
        onClick={() => document.getElementById("invoke").click()}
        onLoad={handleImageLoad}
      />

      <input
        type="file"
        id="invoke"
        style={{ display: "none" }}
        onChange={(event) => {
          handleImageSelect(event);
        }}
      />
    </div>
  );
}

export default UploadImage;
