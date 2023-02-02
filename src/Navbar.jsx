import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./styling/Navbar.css";

function Navbar () {
    return (
        <nav class="navbar">
            <div class="navbar_container">
                <p id="navbar_logo">OAXACA</p>
            </div>
            <ul class="navbar_menu">
                <li class="navbar_item">
                    <Link to='/' class="navbar_links">Home</Link> 
                </li>
                <li class="navbar_item">
                    <Link to='/Menu' class="navbar_links">Menu</Link>
                </li>
                <li class="navbar_btn">
                        <Link to='/NotFound' class="navbar_button">Sign in</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;