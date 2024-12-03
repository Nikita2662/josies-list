import React from "react";
import Header from "../components/Header";
import SafeArea from "../components/SafeArea";
import Flag from "../components/Flag";
import ListedItem from "../components/ListedItem";
import "./ProfileView.css";
import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function ProfileView() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [ploading, setPLoading] = React.useState(true);
  const [localUser, setLocalUser] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();

  const userId = location.state?.userId;

  useEffect(() => {
  
    const fetchData = async () => {
    
      try {
        const [userResponse, productsResponse] = await Promise.all([
          fetch(`http://localhost:5038/users/${userId}`),
          fetch(`http://localhost:5038/products/user/${userId}`),
        ]);

        if (!userResponse.ok || !productsResponse.ok) {
          setError("Error fetching data");
          return;
        }
        
        const userData = await userResponse.json();
        const productsData = await productsResponse.json();
        
        console.log(userData);
        
        let local = {
          _id: userData._id,
          bio: userData.bio,
          username: userData.username,
          picture: userData.picture,
        };
        setLocalUser(local);
        setProducts(productsData)

      } catch (err) {
          setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
      
    };
      
    fetchData();
    

  }, [userId]); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  function displaySearchResults(data) {
    if (typeof data === "object" && data.message) {
      return <h1>{data.message}</h1>;
    }

    return data.map((item, index) => (
      <ListedItem
        key={index}
        className="listed-photo"
        src={item.image}
        itemName={item.itemName}
        price={item.price}
        _id={item._id}
      />
    ));
  }

  return (
    <div>
      <Header />
      <SafeArea>
        <div className="grid-container">
          <div className="grid-item">
            <img
              className="profile-photo"
              src={localUser.picture}
              alt="User profile"
            />
          </div>
          <div className="grid-item">
            <h1 className="small-text">{localUser.username}</h1>
            <h2 className="bio-text">{localUser.bio}</h2>
          </div>
        </div>
        <div>
          <Flag text="Listed Items" svgclass="flag" textclass="flag-text" />
        </div>
        <div className="product-container">
          {displaySearchResults(products)}
        </div>
      </SafeArea>
    </div>
  );
}

export default ProfileView;
