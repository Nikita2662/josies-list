import Header from "../components/Header";
import SafeArea from "../components/SafeArea";
import "./Sell.css";
import React, { useState } from "react";
import TextBox from "../components/SubmissionBox";
import UploadImage from "../components/Uploadimage";

function Sell() {
  const [tags, setTags] = useState(null);
  const [description, setDescription] = useState(null);
  const [productName, setProductName] = useState(null);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(null);

  // This function will be used to handle text submission from child
  const submittedText = (fieldName, newText) => {
    // Update the state based on fieldName dynamically
    if (fieldName === "tag") {
      const validTags = ["Clothing", "Dorm", "TextBook"];
      if (validTags.includes(newText)) {
        setTags(newText);
      }
    } else if (fieldName === "productName") {
      setProductName(newText);
    } else if (fieldName === "descripted") {
      setDescription(newText);
    } else if (fieldName === "price") {
      if (!isNaN(newText)) {
        setPrice(newText);
      } else {
        // Optionally show an error message that the price is invalid
        console.error("Invalid price value");
      }
    }
  };

  async function createProduct() {
    console.log("THIS IS THE SELL IMAGE URL" + image);

    if (!tags || !description || !productName || !price || !image) {
      throw new Error(
        "All fields are required" +
          description +
          " " +
          price +
          " " +
          productName +
          " " +
          tags +
          " " +
          image
      );
      return; // Optionally display a message to the user or return early
    }
    if (tags && description && productName && price) {
      try {
        const url = "http://localhost:5000/products";
        const headers = { "Content-Type": "application/json" };
        const body = JSON.stringify({
          itemName: productName,
          description: description,
          price: price,
          image: image,
          //tags:tags
          seller:
            "Test Seller Name (Update Sell.js to grab actuall seller name)",
        });
        const response = await fetch(url, { method: "POST", headers, body });
      } catch (err) {
        throw new Error("Failed to add product, refresh again");
      }
    } else {
      //throw new Error('Failed to add everything, refresh again');
    }
  }

  return (
    <div>
      <Header />
      <SafeArea />

      <TextBox
        placeholder="Product Tags*"
        className={"product-type"}
        onTextSubmit={(newText) => submittedText("tag", newText)}
      />

      <TextBox
        className={"product-name"}
        placeholder="Product Name*"
        onTextSubmit={(newText) => submittedText("productName", newText)}
      />

      <UploadImage
        w={400}
        h={400}
        c={"image"}
        m={40}
        onImageChange={(newImage) => setImage(newImage)}
      />

      <div className="flex-container">
        <TextBox
          placeholder="Description*"
          className={"description"}
          onTextSubmit={(newText) => submittedText("descripted", newText)}
        />

        <TextBox
          placeholder="Add a Price For Your Product*"
          className={"price"}
          onTextSubmit={(newText) => submittedText("price", newText)}
        />
      </div>

      <button className="submitButton" onClick={() => createProduct()}>
        Submit!
      </button>
    </div>
  );
}

export default Sell;
