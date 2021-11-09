import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/Metadata";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import CheckoutSteps from "../Cart/CheckoutSteps";


const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cartReducer);
  const { user } = useSelector((state) => state.userReducer);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    history.push("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div style={{backgroundColor:"rgba(173, 169, 169, 0.384)"}} className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography style={{backgroundColor:"rgba(173, 169, 169, 0.384)"}}>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link style={{fontSize:"15px"}} to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span style={{fontSize:"15px"}}>
                      {item.quantity} X ${item.price} ={" "}
                      <b>${item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p style={{fontSize:"16px"}}>Subtotal:</p>
                <span style={{fontSize:"16px"}}>${subtotal}</span>
              </div>
              <div>
                <p style={{fontSize:"16px"}}>Shipping Charges:</p>
                <span style={{fontSize:"16px"}}>${shippingCharges}</span>
              </div>
              <div>
                <p style={{fontSize:"16px"}}>GST:</p>
                <span style={{fontSize:"16px"}}>${tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b style={{fontSize:"16px"}}>Total:</b>
              </p>
              <span style={{fontSize:"16px"}}>${totalPrice}</span>
            </div>

            <button style={{fontSize:"16px"}} onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;