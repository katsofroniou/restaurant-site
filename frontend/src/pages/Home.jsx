import React from "react";
import "../styling/Home.css";
import image2 from '../Images/seating.jpeg'
import image3 from '../Images/food.jpeg'
import image4 from '../Images/table.jpeg'
import "../styling/Home.css";
/**
 * @author Jubai-Khalil Owusu-Afriyie
 * @author Natalia Widmann
 * @author Katerina Sofroniou
 * @author Jonathan Lloyd
 * @file Home.jsx contains the home page.
 */

/**
 * @function Home
 * @returns {JSX.Element} Returns the home page.
 */
function Home () {
    return(
        <>
            <div className="infoBoxContainer">
              <div className="infoBox">
                <img style={{ width: 300, height: 250,}} src={image2}></img> 
                <h3 className="title">WELCOME</h3>
                <p className="description">Join us for lunch or dinner at Oaxaca, where the vibrancy of the Mexican market meets the contemporary coolness of a modern-day restaurant in an explosion of colors and textures. In addition, we pride ourselves on the integrity of our flavors and the sourcing of our products.</p>
                <button className="button" type="submit">MORE</button>
              </div>
              <div className="infoBox">
                <img style={{ width: 300, height: 250 }} src={image3}></img> 
                <h3 className="title2">ABOUT</h3>
                <p className="description">Our constantly evolving seasonal menu at Oaxaca is a result of our efforts to harmonize Mexican flavors with locally sourced ingredients that are grown and transported with environmental consciousness. We strive to procure ingredients that are readily available, ensuring that our menu is ever-changing.</p>
                <button className="button2" type="submit">MORE</button>
              </div>
              <div className="infoBox">
                <img style={{ width: 300, height: 250 }} src={image4}></img> 
                <h3 className="title3">HISTORY</h3>
                <p className="description">Gone are the days when cheap tequila shots, overpowering spices, and greasy tortilla chips were the only options that came to mind when craving Mexican food. At Oaxaca, we have revolutionized the dining experience by doing things a little differently.</p>
                <button className="button3" type="submit">MORE</button>
              </div>
            </div>
        </>
    );
}

export default Home;
