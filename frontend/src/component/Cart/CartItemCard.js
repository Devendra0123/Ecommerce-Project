import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link style={{fontSize:"16px"}} to={`/product/${item.product}`}>{item.name}</Link>
        <span style={{fontSize:"12px",fontWeight:"400"}}>{`Price: $${item.price}`}</span>
        <p style={{fontSize:"15px",fontWeight:"600"}} onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;