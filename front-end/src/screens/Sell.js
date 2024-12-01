import Header from "../components/Header";
import SafeArea from "../components/SafeArea";
import "./Sell.css";
import React, { useState, useContext } from "react";
import { UserContext } from "../App";
import TextBox from "../components/SubmissionBox";
import UploadImage from "../components/Uploadimage";
import { useNavigate, Navigate } from "react-router-dom";

function Sell() {
  const [tags, setTags] = useState(null);
  const [description, setDescription] = useState(null);
  const [productName, setProductName] = useState(null);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(null);

  let { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  async function createProduct() {

    let isFormComplete =
      description &&
      productName &&
      Number(price) >= 0  &&
      image &&
      (tags === "dorm" || tags === "textbook" || tags === "clothing");

    if (!isFormComplete) {
      alert("All fields required to create a product");
      return;
    }

    const url = "http://localhost:5038/products";
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({
      itemName: productName,
      description: description,
      price: Number(price),
      image: image,
      tags: tags.split(" "),
      seller_name: user.username,
      seller_email: user._id,
    });

    let response = await fetch(url, { method: "POST", headers, body });
    if (response.ok) {
      alert("Product created successfully");
      navigate("/");
    } else {
      alert("Error creating product, please try again");
    }
  }

  return (
    <div>
      <Header />
      <SafeArea>
        <select
          placeholder="Product Tags*"
          className="product-type"
          onChange={(event) => setTags(event.target.value)}
        >
          <option value="none">Set a Product Tag*</option>
          <option value="clothing">Clothing</option>
          <option value="dorm">Dorm</option>
          <option value="tech">Textbook</option>
          console.log(tags);
        </select>

        <TextBox
          className={"product-name"}
          placeholder="Product Name*"
          onTextSubmit={(newText) => setProductName(newText)}
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
            onTextSubmit={(newText) => setDescription(newText)}
          />

          <TextBox
            placeholder="Add a Price For Your Product*"
            className={"price"}
            onTextSubmit={(newText) => setPrice(newText)}
          />
        </div>

        <button className="submitButton" onClick={() => createProduct()}>
          Submit!
        </button>
      </SafeArea>
    </div>
  );
}

export default Sell;
