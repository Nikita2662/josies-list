import Header from "../components/Header";
import SafeArea from "../components/SafeArea";
import "./Listings.css";
import React, { useState, useEffect } from 'react';
import Comment from "../components/Comments.js"
import Image from "../components/Uploadimage.js"
import BiddingBox from "../components/Bidding.js"

function Listings({ productId }){
    const [product, setProduct] = useState(null); 
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    
    const fetchProduct = async () => {
        const response = await fetch(`http://localhost:5038/products/${productId}`);
        if (!response.ok) {
            setError('Product not found');
            return; 
          }
        const data = await response.json();


        setProduct(data); 
        setLoading(false);

      }

      useEffect(() => {
        
        if (productId) {
          fetchProduct(); 
        
        }
        else{
            setLoading(true)
        }
      }, [productId]); 
      // uncomment this when we have backend working again
      //if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>; 
    
      /*<h2> Item Name: {product?.itemName}</h2>
    <p>Description: {product?.description}</p>
    <p>Price: ${product?.price}</p>
    <p>Seller: {product?.seller}</p>
    
    */ 
    return (
        <div>
            <Header/>
         <SafeArea>
    <div class="flex-container">
    <div class="flex1">
    <div > <Image w={470} h={270} style={{objectFit: 'cover'}}/></div>
    <div class="flex2">
    <div> 

     <h2 class="productName">  {product?.itemName}</h2>
    <p class="productSeller"> Posted By:   &nbsp; <span style={{ color: '#42CAFD' }}> {product?.seller}</span></p>
    <p class="productDescription"> {product?.description}</p>
    <p class="productPrice"> Current Selling Price: ${product?.price}</p>
    <BiddingBox placeholder="Enter Your Bidding Price" class="bidding"/>

    
    </div>
    </div>
    </div>
    </div>

    <Comment  productID = {productId}/>
    </SafeArea>
    </div>
    );
   

}

export default Listings;