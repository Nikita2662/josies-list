import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ListedItem.css";

function ListedItem({ className = "listed-photo", src, itemName, price, _id }) {
  const navigate = useNavigate();

  const goToProduct = () => {
    navigate(`/products/${_id}`);
  };

  return (
    <div className="listed-item">
      <img 
        className={className} 
        src={src} 
        alt="Listed product" 
        onClick={() => goToProduct(_id)} 
        style="cursor: pointer;" />
      <h2 
        className="listing-text">{itemName}
      </h2>
      <h2 
        className="price-text">${price}
      </h2>
    </div>
  );
}

export default ListedItem;
