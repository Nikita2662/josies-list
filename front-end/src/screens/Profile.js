import React from "react";
import Header from "../components/Header";
import SafeArea from "../components/SafeArea";
import Flag from "../components/Flag";
import ListedItem from "../components/ListedItem";
import { UserContext } from "../App.js";
import "./Profile.css";
import { Navigate } from "react-router-dom";

function Profile() {
  const { user } = React.useContext(UserContext);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

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

  async function getUserProducts() {
    if (!loading) return;

    let products = await fetch(
      `http://localhost:5038/products/user/${user._id}`
    );
    let data = await products.json();
    setLoading(false);
    setProducts(data);
  }

  getUserProducts();

  return (
    <div>
      <Header />
      <SafeArea>
        <div className="grid-container">
          <div className="grid-item">
            <img
              className="profile-photo"
              src={user.picture}
              alt="User profile"
            />
          </div>
          <div className="grid-item">
            <h1 className="small-text">{user.username}</h1>
            <h2 className="bio-text">{user.bio}</h2>
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
