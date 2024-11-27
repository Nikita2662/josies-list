import React from "react";
import Header from "../components/Header";
import SafeArea from "../components/SafeArea";
import Button from "../components/Button.js";
import profilepic from "../profilepic.png";
import Star from "../components/Star";
import Flag from "../components/Flag";
import ListedItem from "../components/ListedItem";
import { UserContext } from "../App.js";
import "./Profile.css";

function Profile() {
  const { user } = React.useContext(UserContext);
  const [products, setProducts] = React.useState([]);

  function displaySearchResults(data) {
    return data.map((item, index) => (
      <ListedItem
        key={index}
        className="listed-photo"
        src="https://placehold.co/265"
        itemName={item.itemName}
        price={item.price}
        _id={item._id}
      />
    ));
  }

  async function getUserProducts() {
    let products = await fetch(
      `http://localhost:5038/products/user/${user._id}`
    );
    let data = await products.json();
    return data;
  }

  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div>
      <Header />
      <SafeArea>
        <div className="grid-container">
          <div className="grid-item">
            <img
              className="profile-photo"
              src={profilepic}
              alt="User profile"
            />
          </div>
          <div className="grid-item">
            <h1 className="small-text">{user.name}</h1>
            <h2 className="bio-text">{user.bio}</h2>
            <div>
              <Star className="star" fill="#FF1F58" />
              <Star className="star" />
              <Star className="star" />
              <Star className="star" />
              <Star className="star" />
            </div>
          </div>
        </div>
        <div>
          <Flag text="Listed Items" svgclass="flag" textclass="flag-text" />
        </div>
        <div className="product-container">
          <div className="product-item">{displaySearchResults(products)}</div>
          {/*<div className="product-item">
            <Button onClick={handleClick} className="listing-button">
              +
            </Button>
            <h2 className="listing-text">Item Name</h2>
            <h2 className="price-text">$##</h2>
          </div>*/}
        </div>
      </SafeArea>
    </div>
  );
}

export default Profile;
