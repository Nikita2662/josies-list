import React from "react";
import { Link } from "react-router-dom";
import "./ListedItem.css";

function ListedItem({ src, itemName, price, _id }) {
  return (
    <div className="listed-item">
      <Link to={`/listing/`} state={{ productId: _id }}>
        <img className="listed-photo" src={src} alt="Listed product" />
      </Link>
      <h2 className="listing-text">{itemName}</h2>
      <h2 className="price-text">${price}</h2>
    </div>
  );
}

export default ListedItem;
