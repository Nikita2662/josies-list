import React from "react";
import Header from "../components/Header";
import SafeArea from "../components/SafeArea";
import Flag from "../components/Flag";
import ListedItem from "../components/ListedItem";
import { UserContext } from "../App.js";
import "./Profile.css";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../components/Button"

function Profile() {
  const { user } = React.useContext(UserContext);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  // if the user doesn't exist, go to sign in
  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  // display the users products in form from ListedItem component
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

  // fetch all user products from backend based on userID
  async function getUserProducts() {
    if (!loading) return;

    let products = await fetch(
      `http://localhost:5038/products/user/${user._id}`
    );
    let data = await products.json();
    setLoading(false);
    setProducts(data);
  }

  // get all user products
  getUserProducts();

  // go to create listing page when button clicked
  function goToProduct(user, navigate) {
    if (user == null) {
      navigate("/sign-in");
    } else {
      navigate("/sell");
    }
  }

  // create profile frontend: user info (pic, bio, name) and user products with create listing button
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
          <div className="product-item">
            <Button onClick={() => goToProduct(user, navigate)} className="listing-button">
              +
            </Button>
            <h2 className="listing-text">Add Listing</h2>
            <h2 className="price-text">$$</h2>
          </div>
          {displaySearchResults(products)}
        </div>
      </SafeArea>
    </div>
  );
}

export default Profile;
