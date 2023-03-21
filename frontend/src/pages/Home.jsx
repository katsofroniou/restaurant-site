import React, { useState } from "react";
import "../styling/Home.css";
import image from '../Images/homepage_image2.png'
import image2 from '../Images/seating.jpeg'
import image3 from '../Images/food.jpeg'
import image4 from '../Images/table.jpeg'
import axios from 'axios';


function Home () {
  const [orderId, setOrderId] = useState('');
  const [orderInfo, setOrderInfo] = useState(null);

  const handleInputChange = (e) => {
      setOrderId(e.target.value);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response = await axios.get(`http://127.0.0.1:8000/orders/api/${orderId}`);
          setOrderInfo(response.data);
      } catch (error) {
          console.error(error);
          setOrderInfo(null);
      }
  };

  return (
        <>
            <img background-size= "background" src={image}></img> 
            <div className="infoBoxContainer">
              <div className="infoBox">
                <img style={{ width: 300, height: 250,}} src={image2}></img> 
                <h3 className="title">WELCOME</h3>
                <p className="description"> Oaxaca collides the buzz of the Mexican market with all the coolness 
                of a modern day restaraunt in a explosion of colour and texture. Not to mention the 
                integrity in the flavours and the sourcing of the products. Join us for lunch or dinner. </p>
                <button className="button" type="submit">MORE</button>
              </div>
              <div className="infoBox">
                <img style={{ width: 300, height: 250 }} src={image3}></img> 
                <h3 className="title2">ABOUT</h3>
                <p className="description"> we’ve worked hard to match the flavours of Mexico with ingredients that we can 
                get hold of to create a constantly evolving, seasonal menu with ingredients sourced as locally as possibly, 
                or grown and transported with care for the environment.</p>
                <button className="button2" type="submit">MORE</button>
              </div>
              <div className="infoBox">
                <img style={{ width: 300, height: 250 }} src={image4}></img> 
                <h3 className="title3">HISTORY</h3>
                <p className="description"> Not so long ago, cheap tequila shots, mind numbing spices and greasy tortilla chips were what sprang to mind when 
                thinking about treating your stomach to ‘Mexican’. At Oaxaca we shook things up and started doing things a little differently.</p>
                <button className="button3" type="submit">MORE</button>
              </div>
            </div>
            <div className="orderInput">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={orderId}
                            onChange={handleInputChange}
                            placeholder="Enter Your Order ID"
                            className="orderInputField"
                        />
                        <button type="submit" className="button4">Check Order Status</button>
                    </form>
                </div>
                {orderInfo && (
                  <div className="infoBoxContainer2">
                    <div className="orderStatus">
                        <p>Confirmed: {orderInfo.confirmed ? "Yes" : "No"}</p>
                        <p>Order Ready: {orderInfo.orderReady ? "Yes" : "No"}</p>
                        <p>Order Complete: {orderInfo.OrderComplete ? "Yes" : "No"}</p>
                        <p>Order Delivered: {orderInfo.orderDelivered ? "Yes" : "No"}</p>
                    </div>
                    </div>
                )}
        </>
  );
}

export default Home;
