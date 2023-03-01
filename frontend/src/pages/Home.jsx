import React from "react";
import "../styling/Home.css";
import image from '../Images/homepage_image2.png'


function Home () {
    return(
        <>
            <img style={{ width: 1440, height: 860 }} src={image}></img> 
        </>
    );
}

export default Home;