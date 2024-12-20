import Header from "../components/Header";
import SafeArea from "../components/SafeArea";
import "./Listings.css";
import React, { useState,useEffect } from "react";
import Comment from "../components/Comments.js";
import BiddingBox from "../components/Bidding.js";
import { UserContext } from "../App.js";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../components/Button.js"

function Listings() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bid, setBid] = useState(null);
  const [prompt, setPrompt]=useState("");
  const [showSold, setShowSold]=useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = React.useContext(UserContext);
  


  const productId = location.state?.productId;

  // set an item as sold: fetch product edit function based on product id, change name and sold boolean
  // after, navigate to profile
  const setToSold = async () => {

    const updatedProductData = {
      ...product,
      itemName: product?.itemName + " - SOLD", 
      sold: "true",
    };
      
    const nameResponse = await fetch(`http://localhost:5038/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProductData),
    });
    
    if (!nameResponse.ok) {
      throw new Error("Failed to set item as sold.");
    }
    
    navigate("/profile");

  }
    
  // fetch the product from backend based on id for listing page information
  const fetchProduct = async () =>{
    if (!user) {
      return <Navigate to="/sign-in" />;
   }
    console.log("fetch product");
    try{
    const response = await fetch(`http://localhost:5038/products/${productId}`);
    if (!response.ok) {
      setError("Product not found");
     
    }
    const data = await response.json();

    setProduct(data);
  } catch (error) {
    alert("Product not found");
  }

  };

  // fetch the highest bid for the product based on productId
  async function fetchBid(){
    if (!user) {
      return <Navigate to="/sign-in" />;
   }
   
    console.log("fetch bid");

    try {
      const response = await fetch(
        `http://localhost:5038/products/${productId}/viewbid`
      );
    
      // if the product was not sold, set boolean for frontend showing sold button
      if (!product?.sold && user._id===product?.seller_email) {
        setShowSold(true);
      }

      const data = await response.json();
     

      if (!response.ok) {
        setBid(null);
        //setError("");
        // Stop loading if there's an error
        //alert(data.message);
      } else{
        setBid(data); 
       
      }
      
      // set appropriate bid message based on bid state -- if user is seller, show bidder email
      if ( bid===null ||bid.highest_bid===-1){
        setPrompt("No bidding created yet")

      }else{
        setPrompt(`The current bid is $ ${bid.highest_bid}`);

        if ( bid!==null && user._id===product?.seller_email){
          setPrompt(prevPrompt => prevPrompt + `, made by ${bid.highest_bidder}`);
        }

      }

    } catch (error) {
    
      setBid(null);
      //alert(error.message ,"could be that this product was created before bidding feature was implemented");
      setLoading(false); // Stop loading if there was an error
    }
  };

  // when productID and user change, fetch bid and product
  useEffect(() => {
   
    fetchProduct();
    fetchBid();
   // fetchBid();
    setLoading(false);
  
  }, [user,productId]);

useEffect(() => {
    if (product) {
      fetchBid();
    }
  }, [product]);

  if (!user) {
    return <Navigate to="/sign-in" />;
 }

 
  //Bidding function goes here where Listings calls child class Bidding.js, Bidding.js sends text on an event,
  // Bidding calls bidding backend routes to check if acceptable number, and if yes, then we send in a new bid and display 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // frontend for listing: show image, name, description, seller price, 
  // seller with link to profile, bidder, current bid, sold button if user is seller
  // if product has been sold, take away bidding and selling features
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
                  <Link to={`/profileview/`} state={{ userId: product?.seller_email }}>
                    <span style={{ color: "#42CAFD" }}>
                      {" "}
                      {product?.seller_name}
                    </span>
                  </Link>
                </p>
                <p className="productDescription"> {product?.description}</p>
                <p className="productPrice">
                  Current Selling Price: ${product?.price}
                </p>
                { !product?.sold && (
                  <BiddingBox
                  placeholder="Enter Your Bidding Price"
                  className="bidding"
                  isBidding={productId}
                  userEmail={product?.seller_email}
                  onBidUpdate={fetchBid}
                />
                )}
                
                <p className="productSeller">{ prompt } </p>
                
                
                { showSold && (
                  <Button onClick={setToSold} className="sold-button">
                    Mark as SOLD
                  </Button>
                )}
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
