import Header from "../components/Header";
import SafeArea from "../components/SafeArea";
import "./Listings.css";
import React, { useState, useEffect } from "react";
import Comment from "../components/Comments.js";
import Image from "../components/Uploadimage.js";
import BiddingBox from "../components/Bidding.js";
import { UserContext } from "../App.js";
import { useLocation } from "react-router-dom";

function Listings() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const productId = location.state.productId;
  const { user } = React.useContext(UserContext);

  const fetchProduct = async () => {
    if (!loading) return;

    const response = await fetch(`http://localhost:5038/products/${productId}`);
    if (!response.ok) {
      setError("Product not found");
      return;
    }
    const data = await response.json();

    setProduct(data);
    setLoading(false);
  };

  fetchProduct();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  /*<h2> Item Name: {product?.itemName}</h2>
    <p>Description: {product?.description}</p>
    <p>Price: ${product?.price}</p>
    <p>Seller: {product?.seller}</p>
    
    */

  return (
    <div>
      <Header />
      <SafeArea>
        <div className="flex-container">
          <div className="flex1">
            <div>
              {" "}
              <Image w={470} h={270} style={{ objectFit: "cover" }} />
            </div>
            <div className="flex2">
              <div>
                <h2 className="productName"> {product?.itemName}</h2>
                <p className="productSeller">
                  {" "}
                  Posted By: &nbsp;{" "}
                  <span style={{ color: "#42CAFD" }}> {product?.seller}</span>
                </p>
                <p className="productDescription"> {product?.description}</p>
                <p className="productPrice">
                  {" "}
                  Current Selling Price: ${product?.price}
                </p>
                <BiddingBox
                  placeholder="Enter Your Bidding Price"
                  className="bidding"
                />
              </div>
            </div>
          </div>
        </div>

        <Comment productID={productId} userID={user._id} />
      </SafeArea>
    </div>
  );
}

export default Listings;
