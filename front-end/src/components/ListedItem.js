import React from "react";
import "./ListedItem.css";

function ListedItem({ className = "listed-photo", src, itemName, price }) {
  return (
    <div className="listed-item">
      <img className={className} src={src} alt="Listed product" />
      <h2 className="listing-text">{itemName}</h2>
      <h2 className="price-text">${price}</h2>
    </div>
  );
}

export default ListedItem;
