import React from "react";
import "../styling/Home.css";
import image from '../Images/homepage_image2.png'
import image2 from '../Images/seating.jpeg'
import "../styling/Home.css";


function Home () {
    return(
        <>
            <img style={{ width: 1440, height: 860 }} src={image}></img> 
            <div className="infoBoxContainer">
              <div className="infoBox">
                <img style={{ width: 300, height: 250,}} src={image2}></img> 
                <h3 className="title">WELCOME</h3>
              </div>
              <div className="infoBox">
                <img style={{ width: 300, height: 250 }} src={image2}></img> 
                <h3 className="title">ABOUT</h3>
              </div>
              <div className="infoBox">
                <img style={{ width: 300, height: 250 }} src={image2}></img> 
                <h3 className="title">WELCOME</h3>
              </div>
            </div>
        </>
    );
}

export default Home;
