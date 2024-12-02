import Header from "../components/Header";
import SafeArea from "../components/SafeArea";
import "./Listings.css";
import React, { useState,useEffect } from "react";
import Comment from "../components/Comments.js";
import BiddingBox from "../components/Bidding.js";
import { UserContext } from "../App.js";
import { useLocation, Navigate } from "react-router-dom";

function Listings() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bid, setBid] = useState(null);

  const location = useLocation();

  const { user } = React.useContext(UserContext);

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  const productId = location.state.productId;

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


  async function fetchBid(){
    try {
      const response = await fetch(
        `http://localhost:5038/products/${productId}/viewbid`
      );
    


      const data = await response.json();
     

      if (!response.ok) {
        setBid(null);
        //setError("");
        setLoading(false); // Stop loading if there's an error
        //alert(data.message);
      } else{
        setBid(data); 
        setLoading(false);
      }

      
    } catch (error) {
    
      setBid(null);
      //alert(error.message ,"could be that this product was created before bidding feature was implemented");
      setLoading(false); // Stop loading if there was an error
    }
  };


      fetchProduct();
      fetchBid();
   

 
  //Bidding function goes here where Listings calls child class Bidding.js, Bidding.js sends text on an event,
  // Bidding calls bidding backend routes to check if acceptable number, and if yes, then we send in a new bid and display 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Header />
      <SafeArea>
        <div className="flex-container">
          <div className="flex1">
            <img src={product?.image} alt="product" className="productImage" />
            <div className="flex2">
              <div>
                <h2 className="productName"> {product?.itemName}</h2>
                <p className="productSeller">
                  Posted By: &nbsp;
                  <span style={{ color: "#42CAFD" }}>
                    {" "}
                    {product?.seller_name}
                  </span>
                </p>
                <p className="productDescription"> {product?.description}</p>
                <p className="productPrice">
                  Current Selling Price: ${product?.price}
                </p>
                <BiddingBox
                  placeholder="Enter Your Bidding Price"
                  className="bidding"
                  isBidding={productId}
                  userEmail={product?.seller_email}
                />
                <p className="productSeller">{ bid!==null ?
                 `The current bid is ${bid.highest_bid}, made by ${bid.highest_bidder}` : 
                 "No bidding for this product, this product may have been created before the bidding feature was implemented" }
                </p>
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
